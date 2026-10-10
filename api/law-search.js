'use strict';

const API_HOST = 'https://www.law.go.kr/DRF/lawSearch.do';
const ALLOWED_ORIGINS = new Set([
  'https://jejuzipsa.github.io',
  'https://gichul-law-api.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
]);
const DISPLAY = 20;

function text(value) {
  return value === undefined || value === null ? '' : String(value).trim();
}
function formatDate(value) {
  const digits = text(value).replace(/\D/g, '').slice(0, 8);
  return digits.length === 8
    ? digits.slice(0, 4) + '.' + digits.slice(4, 6) + '.' + digits.slice(6, 8)
    : '';
}
function officialLink(lawName, articleNo, branchNo) {
  const name = text(lawName);
  if (!name) return 'https://www.law.go.kr/lsSc.do';
  const base = 'https://www.law.go.kr/법령/' + encodeURIComponent(name);
  const number = Number(articleNo);
  if (!Number.isSafeInteger(number) || number <= 0) return base;
  const branch = Number(branchNo);
  const article = '제' + number + '조' +
    (Number.isSafeInteger(branch) && branch > 0 ? '의' + branch : '');
  return base + '/' + encodeURIComponent(article);
}
function toArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}
function normalizeArticles(payload) {
  const body = payload && (payload.aiSearch || payload.AiSearch);
  if (!body || typeof body !== 'object') throw new Error('INVALID_UPSTREAM');
  const entries = toArray(body['법령조문']);
  return {
    total: Math.max(0, Number(body['검색결과개수'] ?? entries.length) || 0),
    items: entries.map((item) => {
      const name = text(item['법령명']);
      return {
        lawName: name,
        category: text(item['법령종류명']),
        article: Number(item['조문번호']) > 0
          ? '제' + Number(item['조문번호']) + '조' +
            (Number(item['조문가지번호']) > 0 ? '의' + Number(item['조문가지번호']) : '')
          : '',
        title: text(item['조문제목']),
        excerpt: text(item['조문내용']).replace(/\s+/g, ' ').slice(0, 320),
        effectiveDate: formatDate(item['시행일자']),
        department: text(item['소관부처명']),
        url: officialLink(name, item['조문번호'], item['조문가지번호'])
      };
    }).filter(item => item.lawName)
  };
}
function normalizeLaws(payload) {
  const body = payload && (payload.LawSearch || payload.lawSearch);
  if (!body || typeof body !== 'object') throw new Error('INVALID_UPSTREAM');
  const entries = toArray(body.law);
  return {
    total: Math.max(0, Number(body.totalCnt ?? entries.length) || 0),
    items: entries.map(item => {
      const name = text(item['법령명한글']);
      return {
        lawName: name,
        category: text(item['법령구분명']),
        article: '',
        title: '',
        excerpt: '',
        effectiveDate: formatDate(item['시행일자']),
        department: text(item['소관부처명']),
        url: officialLink(name)
      };
    }).filter(item => item.lawName)
  };
}
// Never expose upstream field VALUES. Export key names only after conservative
// validation: keys can theoretically be influenced by untrusted upstream data.
function safeFieldName(key, oc) {
  if (typeof key !== 'string' || !/^[A-Za-z가-힣_][A-Za-z0-9가-힣_]{0,39}$/.test(key)) return '[redacted]';
  const lower = key.toLowerCase();
  if ((oc && lower.includes(oc.toLowerCase())) ||
      /password|secret|token|credential|auth|api_?key|cookie|^oc$/i.test(key)) {
    return '[redacted]';
  }
  return key;
}
// Describe field names and types only. Do not echo values, URLs or the OC.
function payloadShape(payload, mode, oc = '') {
  const known = new Set([
    'LawSearch', 'lawSearch', 'aiSearch', 'AiSearch', 'Law',
    'error', 'Error', 'ERROR', 'errorCode', 'resultCode',
    'resultMsg', 'message', 'Message', 'status', 'code'
  ]);
  const kind = value => value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { rootType: kind(payload), knownFields: [], fieldCount: 0 };
  }
  const keys = Object.keys(payload);
  const envelope = mode === 'laws'
    ? payload.LawSearch ?? payload.lawSearch
    : payload.aiSearch ?? payload.AiSearch;
  return {
    rootType: 'object',
    knownFields: keys.filter(key => known.has(key)).sort(),
    fieldCount: keys.length,
    envelopeType: kind(envelope),
    rootFields: keys.slice(0, 8).map(key => ({
      name: safeFieldName(key, oc),
      type: kind(payload[key]),
      ...(payload[key] && typeof payload[key] === 'object' && !Array.isArray(payload[key])
        ? { nestedFields: Object.keys(payload[key]).slice(0, 8).map(nested => ({
            name: safeFieldName(nested, oc),
            type: kind(payload[key][nested])
          })) }
        : {})
    }))
  };
}
// Classify common API rejection messages without disclosing their contents.
function upstreamFailureReason(payload) {
  const msg = typeof payload?.msg === 'string' ? payload.msg.slice(0, 1000) : '';
  if (/\\bIP\\b|아이피|도메인|서버\\s*주소|호스트|접속\\s*IP|허용\\s*주소/i.test(msg)) return 'SOURCE_RESTRICTION';
  if (/승인|미등록|인증|인증키|OC|API.?key|신청|사용자|권한|허가|유효하지/i.test(msg)) return 'AUTH_OR_APPROVAL';
  if (/초과|호출\\s*횟수|rate\\s*limit|quota|한도/i.test(msg)) return 'RATE_LIMIT';
  if (/파라미터|매개변수|필수\\s*항목|잘못된\\s*요청|invalid\\s*request/i.test(msg)) return 'INVALID_PARAMETERS';
  return 'UNCLASSIFIED';
}
function upstreamRejected(payload, body) {
  for (const item of [payload, body]) {
    if (typeof item === 'string' && item.trim()) return true;
    if (!item || typeof item !== 'object' || Array.isArray(item)) continue;
    // law.go.kr can return a { result: string, msg: string } rejection even with HTTP 200.
    if (typeof item.result === 'string' && typeof item.msg === 'string') return true;
    const code = text(item.resultCode ?? item.errorCode ?? item.code);
    if (code && code !== '00' && code !== '0' && code !== '200') return true;
    if (item.error != null || item.Error != null || item.ERROR != null || (typeof item.Law === 'string' && item.Law.trim())) return true;
    const message = text(item.resultMsg ?? item.message ?? item.Message);
    if (message && !/^(success|ok)$/i.test(message)) return true;
  }
  return false;
}
function reply(res, status, result) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', status === 200 ? 'public, s-maxage=120, stale-while-revalidate=300' : 'no-store');
  res.end(JSON.stringify(result));
}
module.exports = async function handler(req, res) {
  res.setHeader('Vary', 'Origin');
  const origin = text(req.headers && req.headers.origin);
  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') return reply(res, 204, {});
  if (req.method !== 'GET') return reply(res, 405, { error: 'METHOD_NOT_ALLOWED', message: 'GET 요청만 지원해.' });

  const q = typeof req.query?.q === 'string' ? req.query.q.trim() : '';
  const mode = req.query?.mode === 'laws' ? 'laws' : req.query?.mode === 'articles' || req.query?.mode === undefined ? 'articles' : '';
  const pageRaw = typeof req.query?.page === 'string' ? req.query.page : '1';
  const page = /^\d{1,3}$/.test(pageRaw) ? Number(pageRaw) : 0;

  if (q.length < 2 || q.length > 80 || /[\u0000-\u001f]/.test(q) || !mode || page < 1 || page > 100) {
    return reply(res, 400, { error: 'INVALID_QUERY', message: '검색어는 2~80자로 입력하고 검색 종류와 페이지를 확인해 줘.' });
  }
  const oc = text(process.env.LAW_API_OC);
  if (!oc) {
    return reply(res, 503, {
      error: 'SETUP_REQUIRED',
      message: '법령 검색 API 인증값이 아직 등록되지 않았어. 국가법령정보센터에서 직접 검색할 수 있어.'
    });
  }

  const params = new URLSearchParams({
    OC: oc,
    target: mode === 'laws' ? 'law' : 'aiSearch',
    type: 'JSON',
    query: q,
    display: String(DISPLAY),
    page: String(page),
    search: mode === 'laws' ? '1' : '0'
  });
  let upstream;
  try {
    upstream = await fetch(API_HOST + '?' + params, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(15000)
    });
  } catch (error) {
    const isTimeout = error?.name === 'TimeoutError' || error?.name === 'AbortError';
    const code = isTimeout ? 'UPSTREAM_TIMEOUT' : 'UPSTREAM_NETWORK';
    // Never log the request URL, OC key, or raw upstream response.
    console.error('[law-search]', code, 'target=' + (mode === 'laws' ? 'law' : 'aiSearch'));
    return reply(res, 502, {
      error: code,
      message: isTimeout
        ? '국가법령정보센터 응답 시간이 초과됐어. 잠시 후 다시 검색해 줘.'
        : 'Vercel에서 국가법령정보센터로 연결하지 못했어. 인증키 오류로 단정할 수 없어.'
    });
  }

  if (!upstream.ok) {
    console.error('[law-search] UPSTREAM_HTTP target=' + (mode === 'laws' ? 'law' : 'aiSearch') + ' status=' + upstream.status);
    return reply(res, 502, {
      error: 'UPSTREAM_HTTP',
      upstreamStatus: upstream.status,
      message: '국가법령정보센터에서 HTTP ' + upstream.status + ' 오류를 반환했어. API 승인 상태와 이용 권한을 확인해 줘.'
    });
  }

  const contentType = text(upstream.headers?.get?.('content-type'));
  if (/text\/html/i.test(contentType)) {
    console.error('[law-search] UPSTREAM_NON_JSON contentType=text/html');
    return reply(res, 502, {
      error: 'UPSTREAM_NON_JSON',
      message: '국가법령정보센터에서 JSON 대신 HTML을 반환했어. 인증 승인·접속 제한 또는 차단 여부를 확인해야 해.'
    });
  }

  let data;
  try {
    data = await upstream.json();
  } catch (_) {
    console.error('[law-search] UPSTREAM_NON_JSON parse failed');
    return reply(res, 502, {
      error: 'UPSTREAM_NON_JSON',
      message: '국가법령정보센터 응답을 JSON으로 읽을 수 없어. 접속 제한이나 API 인증 상태를 확인해야 해.'
    });
  }

  const body = mode === 'laws'
    ? data?.LawSearch || data?.lawSearch
    : data?.aiSearch || data?.AiSearch;
  const diagnostic = payloadShape(data, mode, oc);
  if (upstreamRejected(data, body)) {
    // Do not echo upstream messages or codes: they may contain credentials.
    console.error('[law-search] UPSTREAM_API_REJECTED target=' + (mode === 'laws' ? 'law' : 'aiSearch') + ' envelope=' + diagnostic.envelopeType);
    return reply(res, 502, {
      error: 'UPSTREAM_API_REJECTED',
      reason: upstreamFailureReason(data),
      message: '국가법령정보센터가 검색 결과 대신 오류 상태를 반환했어. OPEN API 승인·인증키와 허용된 서버 IP/도메인을 확인해 줘.',
      diagnostic
    });
  }

  let normalized;
  try {
    normalized = mode === 'laws' ? normalizeLaws(data) : normalizeArticles(data);
  } catch (_) {
    console.error('[law-search] UPSTREAM_FORMAT target=' + (mode === 'laws' ? 'law' : 'aiSearch'));
    return reply(res, 502, {
      error: 'UPSTREAM_FORMAT',
      message: '검색 API 응답 형식이 공식 규격과 일치하지 않아. 아래 진단 정보로 응답 유형을 확인해 줘.',
      diagnostic
    });
  }
  return reply(res, 200, { query: q, mode, page, pageSize: DISPLAY, ...normalized });
};
module.exports._test = { formatDate, officialLink, normalizeArticles, normalizeLaws, payloadShape, safeFieldName, upstreamRejected, upstreamFailureReason };
