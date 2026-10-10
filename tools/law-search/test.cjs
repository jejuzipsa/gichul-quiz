'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const handler = require('../../api/law-search.js');
const { officialLink, normalizeArticles, normalizeLaws, formatDate } = handler._test;

function mockResponse() {
  return {
    statusCode: 200,
    headers: {},
    setHeader(key, value) { this.headers[key.toLowerCase()] = value; },
    end(value) { this.body = value ? JSON.parse(value) : undefined; }
  };
}
async function invoke(query, method = 'GET', origin = 'https://jejuzipsa.github.io') {
  const res = mockResponse();
  await handler({ method, query, headers: { origin } }, res);
  return res;
}

test('article link uses the official Korean address and the exact article number', () => {
  assert.equal(officialLink('공인중개사법', '0025', '00'), 'https://www.law.go.kr/법령/%EA%B3%B5%EC%9D%B8%EC%A4%91%EA%B0%9C%EC%82%AC%EB%B2%95/%EC%A0%9C25%EC%A1%B0');
  assert.ok(officialLink('특정범죄 가중처벌 등에 관한 법률', '0005', '03').endsWith('%EC%A0%9C5%EC%A1%B0%EC%9D%983'));
  assert.ok(officialLink('민법').includes('/%EB%AF%BC%EB%B2%95'));
  assert.equal(formatDate('20260402120400'), '2026.04.02');
});
test('normalizes a single article and does not expose arbitrary upstream links', () => {
  const result = normalizeArticles({ aiSearch: { 검색결과개수: '1', 법령조문: {
    법령명: '공인중개사법', 법령종류명: '법률', 조문번호: '0025', 조문가지번호: '00',
    조문제목: '중개대상물의 확인ㆍ설명', 조문내용: '내용', 시행일자: '20260901'
  } } });
  assert.equal(result.total, 1);
  assert.equal(result.items[0].article, '제25조');
  assert.equal(result.items[0].url.startsWith('https://www.law.go.kr/법령/'), true);
  assert.equal(result.items[0].effectiveDate, '2026.09.01');
});
test('normalizes the law-list result', () => {
  const result = normalizeLaws({ LawSearch: { totalCnt: '1', law: { 법령명한글: '민법', 법령구분명: '법률', 시행일자: '20260101' } } });
  assert.equal(result.items[0].lawName, '민법');
  assert.equal(result.items[0].url, officialLink('민법'));
});
test('rejects missing OC clearly, without silently making sample-key calls', async () => {
  const saved = process.env.LAW_API_OC;
  delete process.env.LAW_API_OC;
  try {
    const res = await invoke({ q: '중개대상물', mode: 'articles', page: '1' });
    assert.equal(res.statusCode, 503);
    assert.equal(res.body.error, 'SETUP_REQUIRED');
    assert.equal(res.headers['access-control-allow-origin'], 'https://jejuzipsa.github.io');
  } finally { if (saved !== undefined) process.env.LAW_API_OC = saved; }
});
test('validates query, page, mode, and method', async () => {
  for (const query of [{ q: 'a' }, { q: 'a'.repeat(81) }, { q: '민법', page: '0' }, { q: '민법', page: '1e3' }, { q: '민법', mode: 'other' }]) {
    const res = await invoke(query);
    assert.equal(res.statusCode, 400);
  }
  assert.equal((await invoke({ q: '민법' }, 'POST')).statusCode, 405);
  const res = await invoke({ q: '민법' }, 'OPTIONS');
  assert.equal(res.statusCode, 204);
});
test('search response, pagination and origin restriction with stubbed upstream', async () => {
  const previous = process.env.LAW_API_OC;
  const previousFetch = global.fetch;
  const urls = [];
  process.env.LAW_API_OC = 'secret-test';
  global.fetch = async url => {
    urls.push(String(url));
    return {
      ok: true,
      json: async () => ({ aiSearch: { 검색결과개수: '20', 법령조문: [{
        법령명: '민법', 조문번호: '0103', 조문가지번호: '00', 조문제목: '반사회질서의 법률행위', 조문내용: '테스트'
      }] } })
    };
  };
  try {
    const res = await invoke({ q: '반사회질서', page: '2' }, 'GET', 'https://untrusted.example');
    assert.equal(res.statusCode, 200);
    assert.equal(res.headers['access-control-allow-origin'], undefined);
    assert.equal(res.body.items[0].article, '제103조');
    assert.equal(res.body.page, 2);
    const url = new URL(urls[0]);
    assert.equal(url.searchParams.get('OC'), 'secret-test');
    assert.equal(url.searchParams.get('target'), 'aiSearch');
    assert.equal(url.searchParams.get('query'), '반사회질서');
    assert.equal(url.searchParams.get('page'), '2');
  } finally {
    global.fetch = previousFetch;
    if (previous === undefined) delete process.env.LAW_API_OC;
    else process.env.LAW_API_OC = previous;
  }
});


test('diagnoses upstream failures separately without revealing an OC key', async () => {
  const saved = process.env.LAW_API_OC;
  const savedFetch = global.fetch;
  const savedError = console.error;
  process.env.LAW_API_OC = 'do-not-leak-secret';
  console.error = () => {};
  try {
    const cases = [
      [{ ok:false, status:403 }, 'UPSTREAM_HTTP', 403],
      [{ ok:true, headers:{ get:()=> 'text/html; charset=utf-8' }, json:async()=>({}) }, 'UPSTREAM_NON_JSON'],
      [{ ok:true, headers:{ get:()=> 'application/json' }, json:async()=>{throw new SyntaxError('Unexpected token');} }, 'UPSTREAM_NON_JSON'],
      [{ ok:true, headers:{ get:()=> 'application/json' }, json:async()=>({ other:[] }) }, 'UPSTREAM_FORMAT'],
      [{ ok:true, headers:{ get:()=> 'application/json' }, json:async()=>({ LawSearch:{ resultCode:'99', resultMsg:'Invalid API key' } }) }, 'UPSTREAM_API_REJECTED'],
      [{ ok:true, headers:{ get:()=> 'application/json' }, json:async()=>({ Law: 'OC 인증값 승인 필요' }) }, 'UPSTREAM_API_REJECTED'],
      [{ ok:true, headers:{ get:()=> 'application/json' }, json:async()=>({ error: 'invalid key' }) }, 'UPSTREAM_API_REJECTED'],
      [{ ok:true, headers:{ get:()=> 'application/json' }, json:async()=>({ LawSearch: 'API 접근 거부' }) }, 'UPSTREAM_API_REJECTED']
    ];
    for (const [response, expected, http] of cases) {
      global.fetch = async () => response;
      const res = await invoke({ q:'민법', mode:'laws' });
      assert.equal(res.statusCode,502);
      assert.equal(res.body.error,expected);
      if (http) assert.equal(res.body.upstreamStatus,http);
      assert.ok(!JSON.stringify(res.body).includes(process.env.LAW_API_OC));
      assert.ok(!JSON.stringify(res.body).includes('invalid key'));
      if (expected === 'UPSTREAM_FORMAT' || expected === 'UPSTREAM_API_REJECTED') {
        assert.equal(res.body.diagnostic.rootType, 'object');
        assert.equal(typeof res.body.diagnostic.fieldCount, 'number');
      }
    }
    global.fetch = async () => { const error = new Error('timeout'); error.name = 'TimeoutError'; throw error; };
    assert.equal((await invoke({ q:'민법', mode:'laws' })).body.error,'UPSTREAM_TIMEOUT');
    global.fetch = async () => { throw new TypeError('fetch failed'); };
    assert.equal((await invoke({ q:'민법', mode:'laws' })).body.error,'UPSTREAM_NETWORK');
  } finally {
    global.fetch = savedFetch;
    console.error = savedError;
    if (saved === undefined) delete process.env.LAW_API_OC;
    else process.env.LAW_API_OC = saved;
  }
});

test('diagnoses unexpected JSON with safe keys/types, never raw values', async () => {
  const previous = process.env.LAW_API_OC;
  const previousFetch = global.fetch;
  const previousError = console.error;
  process.env.LAW_API_OC = 'keep-this-oc-private';
  console.error = () => {};
  global.fetch = async () => ({
    ok: true, headers: { get: () => 'application/json' },
    json: async () => ({ privateField: 'keep-this-oc-private', LawSearch: null })
  });
  try {
    const res = await invoke({ q: '민법', mode: 'laws' });
    assert.equal(res.statusCode, 502);
    assert.equal(res.body.error, 'UPSTREAM_FORMAT');
    assert.deepEqual(res.body.diagnostic.knownFields, ['LawSearch']);
    assert.equal(res.body.diagnostic.envelopeType, 'undefined');
    assert.ok(!JSON.stringify(res.body).includes('keep-this-oc-private'));
    assert.ok(!JSON.stringify(res.body).includes('privateField'));
  } finally {
    global.fetch = previousFetch;
    console.error = previousError;
    if (previous === undefined) delete process.env.LAW_API_OC;
    else process.env.LAW_API_OC = previous;
  }
});

test('official zero-result envelopes are valid, not mistaken for failures', () => {
  assert.deepEqual(normalizeLaws({ LawSearch: { totalCnt:'0' } }), { total:0, items:[] });
  assert.deepEqual(normalizeArticles({ aiSearch: { 검색결과개수:'0' } }), { total:0, items:[] });
});
