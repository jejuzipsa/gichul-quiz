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
  try {
    const upstream = await fetch(API_HOST + '?' + params, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(9000)
    });
    if (!upstream.ok) return reply(res, 502, { error: 'UPSTREAM_ERROR', message: '국가법령정보센터 응답을 받아오지 못했어.' });
    const data = await upstream.json();
    const normalized = mode === 'laws' ? normalizeLaws(data) : normalizeArticles(data);
    return reply(res, 200, { query: q, mode, page, pageSize: DISPLAY, ...normalized });
  } catch (error) {
    return reply(res, 502, { error: 'UPSTREAM_ERROR', message: '법령 검색 연결에 문제가 생겼어. 잠시 후 다시 시도해 줘.' });
  }
};
module.exports._test = { formatDate, officialLink, normalizeArticles, normalizeLaws };
