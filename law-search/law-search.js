(() => {
  'use strict';
  const API_ENDPOINT = 'https://gichul-law-api.vercel.app/api/law-search';
  const $ = id => document.getElementById(id);
  const params = new URLSearchParams(window.location.search);
  const query = (params.get('q') || '').trim().slice(0, 80);
  const mode = params.get('mode') === 'laws' ? 'laws' : 'articles';
  const rawPage = Number(params.get('page') || 1);
  const page = Number.isSafeInteger(rawPage) && rawPage >= 1 && rawPage <= 100 ? rawPage : 1;
  const list = $('lawResultList');
  const status = $('lawStatus');
  const pager = $('lawPagination');
  const official = $('lawOfficialSearch');

  $('lawQuery').value = query;
  const radio = document.querySelector('input[name="mode"][value="' + mode + '"]');
  if (radio) radio.checked = true;

  const preferredTheme = () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  const themeButton = $('lawThemeToggle');
  function refreshThemeLabel() {
    themeButton.textContent = preferredTheme() === 'dark' ? '라이트 모드' : '다크 모드';
  }
  themeButton.addEventListener('click', () => {
    const next = preferredTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('gichulQuizTheme', next); } catch (_) {}
    refreshThemeLabel();
  });
  refreshThemeLabel();

  const officialSearchUrl = () => {
    const target = new URL('https://www.law.go.kr/lsSc.do');
    if (query) target.searchParams.set('query', query);
    return target.href;
  };
  official.href = officialSearchUrl();

  function message(text, showLink) {
    list.replaceChildren();
    pager.replaceChildren();
    const el = document.createElement('div');
    el.className = 'law-message';
    el.append(document.createTextNode(text));
    if (showLink) {
      el.append(document.createTextNode(' '));
      const a = document.createElement('a');
      a.href = officialSearchUrl();
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = '국가법령정보센터에서 직접 검색 ↗';
      el.append(a);
    }
    list.append(el);
  }
  function meta(parent, text) {
    if (!text) return;
    const span = document.createElement('span');
    span.textContent = text;
    parent.append(span);
  }
  function renderItem(item) {
    if (!item || !item.lawName || typeof item.url !== 'string') return;
    let destination;
    try { destination = new URL(item.url); } catch (_) { return; }
    if (destination.protocol !== 'https:' || !['www.law.go.kr', 'law.go.kr'].includes(destination.hostname)) return;
    const card = document.createElement('a');
    card.className = 'law-result-card';
    card.href = destination.href;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    const name = document.createElement('div');
    name.className = 'law-result-name';
    name.textContent = item.lawName + ' ↗';
    card.append(name);
    if (item.article || item.title) {
      const title = document.createElement('p');
      title.className = 'law-result-title';
      title.textContent = [item.article, item.title].filter(Boolean).join(' — ');
      card.append(title);
    }
    if (item.excerpt) {
      const desc = document.createElement('p');
      desc.className = 'law-result-excerpt';
      desc.textContent = item.excerpt;
      card.append(desc);
    }
    const details = document.createElement('div');
    details.className = 'law-result-meta';
    meta(details, item.category);
    meta(details, item.department);
    meta(details, item.effectiveDate ? '시행 ' + item.effectiveDate : '');
    card.append(details);
    list.append(card);
  }
  function pageLink(number, label) {
    const a = document.createElement('a');
    const url = new URL(location.href);
    url.searchParams.set('q', query);
    url.searchParams.set('mode', mode);
    url.searchParams.set('page', String(number));
    a.href = url.href;
    a.textContent = label;
    return a;
  }
  async function search() {
    if (!query || query.length < 2) {
      status.textContent = '2글자 이상 검색어를 입력해 줘.';
      return;
    }
    status.textContent = '검색 중…';
    message('국가법령정보센터에서 검색 결과를 불러오는 중이야.', false);
    try {
      const url = new URL(API_ENDPOINT);
      url.searchParams.set('q', query);
      url.searchParams.set('mode', mode);
      url.searchParams.set('page', String(page));
      const res = await fetch(url.href, { headers: { Accept: 'application/json' } });
      const data = await res.json();
      if (!res.ok) {
        status.textContent = res.status === 503 ? '검색 API 설정 필요' : '검색을 완료하지 못했어.';
        message(data.message || '검색 기능을 잠시 사용할 수 없어.', true);
        return;
      }
      const total = Number(data.total) || 0;
      status.textContent = '"' + query + '" · 총 ' + total.toLocaleString('ko-KR') + '건';
      list.replaceChildren();
      pager.replaceChildren();
      const items = Array.isArray(data.items) ? data.items : [];
      if (!items.length) { message('검색 결과가 없어. 다른 검색어로 다시 검색해 봐.', true); return; }
      items.forEach(renderItem);
      const pages = Math.min(100, Math.ceil(total / (Number(data.pageSize) || 20)));
      if (page > 1) pager.append(pageLink(page - 1, '← 이전'));
      const current = document.createElement('span');
      current.className = 'law-page-current';
      current.textContent = page + ' / ' + pages;
      pager.append(current);
      if (page < pages) pager.append(pageLink(page + 1, '다음 →'));
    } catch (_) {
      status.textContent = '네트워크 오류';
      message('서버 연결이 원활하지 않아. 잠시 후 다시 검색해 줘.', true);
    }
  }
  if (query) search();
})();
