(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const manifest = Array.isArray(window.SLIDE_SUMMARY_MANIFEST) ? window.SLIDE_SUMMARY_MANIFEST : [];
  const STORAGE_KEY = 'realtor-summary-progress-v1';

  const els = {
    subjectView: $('subjectView'), subjectGrid: $('subjectGrid'), viewerView: $('viewerView'),
    subjectBackBtn: $('subjectBackBtn'), viewerTitle: $('viewerTitle'), viewerKicker: $('viewerKicker'),
    viewerProgressFill: $('viewerProgressFill'), viewerCounter: $('viewerCounter'), slideStage: $('slideStage'),
    slideImage: $('slideImage'), prevOverlayBtn: $('prevOverlayBtn'), nextOverlayBtn: $('nextOverlayBtn'),
    prevBtn: $('prevBtn'), nextBtn: $('nextBtn'), pageInput: $('pageInput'), pageTotal: $('pageTotal'),
    fullscreenBtn: $('fullscreenBtn')
  };

  const state = { subject: null, page: 1, pointerX: null, pointerY: null };

  function readProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; }
    catch { return {}; }
  }
  function saveProgress() {
    if (!state.subject) return;
    const progress = readProgress();
    progress[state.subject.slug] = state.page;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch {}
  }
  function imagePath(subject, page) {
    return `slides/${subject.slug}/${String(page).padStart(3, '0')}.webp`;
  }
  function clampPage(page, subject = state.subject) {
    if (!subject) return 1;
    const n = Number(page) || 1;
    return Math.min(subject.count, Math.max(1, Math.round(n)));
  }
  function parseHash() {
    const raw = location.hash.replace(/^#/, '');
    if (!raw) return null;
    const [slug, pageRaw] = raw.split('/');
    const subject = manifest.find(item => item.slug === slug);
    if (!subject) return null;
    return { subject, page: clampPage(pageRaw || 1, subject) };
  }
  function setHash(subject, page, replace = false) {
    const next = `#${subject.slug}/${page}`;
    if (location.hash === next) return;
    if (replace) history.replaceState(null, '', next);
    else history.pushState(null, '', next);
  }

  function renderSubjects() {
    const progress = readProgress();
    els.subjectGrid.innerHTML = '';
    manifest.forEach((subject) => {
      const last = clampPage(progress[subject.slug] || 1, subject);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'summary-subject-card';
      btn.style.setProperty('--accent', subject.accent);
      btn.style.setProperty('--soft', subject.soft);
      const resume = last > 1 ? `<span><b>${last}쪽</b>부터 이어보기</span>` : '<span>처음부터 보기</span>';
      btn.innerHTML = `
        <span class="subject-card-top">
          <strong>${subject.name}</strong>
          <span class="subject-card-count">${subject.count}장</span>
        </span>
        <span class="subject-card-bottom">${resume}<span>→</span></span>`;
      btn.addEventListener('click', () => openSubject(subject, last));
      els.subjectGrid.appendChild(btn);
    });
  }

  function showSubjects(updateHash = true) {
    state.subject = null;
    els.viewerView.classList.add('hidden');
    els.subjectView.classList.remove('hidden');
    renderSubjects();
    if (updateHash) history.pushState(null, '', location.pathname + location.search);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openSubject(subject, page = 1, opts = {}) {
    state.subject = subject;
    state.page = clampPage(page, subject);
    els.subjectView.classList.add('hidden');
    els.viewerView.classList.remove('hidden');
    document.documentElement.style.setProperty('--accent', subject.accent);
    els.viewerTitle.textContent = subject.name;
    els.viewerKicker.textContent = '공인중개사 핵심요약';
    renderSlide();
    if (!opts.fromHash) setHash(subject, state.page, Boolean(opts.replace));
    window.scrollTo({ top: 0, behavior: opts.instant ? 'auto' : 'smooth' });
    setTimeout(() => els.slideStage.focus({ preventScroll: true }), 0);
  }

  function renderSlide() {
    const subject = state.subject;
    if (!subject) return;
    const page = clampPage(state.page, subject);
    state.page = page;
    els.slideImage.src = imagePath(subject, page);
    els.slideImage.alt = `${subject.name} 핵심요약 ${page}쪽`;
    els.viewerCounter.textContent = `${page} / ${subject.count}`;
    els.viewerProgressFill.style.width = `${(page / subject.count) * 100}%`;
    els.pageInput.max = String(subject.count);
    els.pageInput.value = String(page);
    els.pageTotal.textContent = `/ ${subject.count}`;
    const atFirst = page <= 1;
    const atLast = page >= subject.count;
    els.prevBtn.disabled = atFirst;
    els.prevOverlayBtn.disabled = atFirst;
    els.nextBtn.disabled = atLast;
    els.nextOverlayBtn.disabled = atLast;
    saveProgress();
    preload(page - 1);
    preload(page + 1);
  }

  function preload(page) {
    if (!state.subject || page < 1 || page > state.subject.count) return;
    const img = new Image();
    img.src = imagePath(state.subject, page);
  }

  function goTo(page, opts = {}) {
    if (!state.subject) return;
    const next = clampPage(page);
    if (next === state.page) return;
    state.page = next;
    renderSlide();
    if (!opts.fromHash) setHash(state.subject, state.page, Boolean(opts.replace));
  }
  const prev = () => goTo(state.page - 1);
  const next = () => goTo(state.page + 1);

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) await els.slideStage.requestFullscreen();
      else await document.exitFullscreen();
    } catch {}
  }

  els.subjectBackBtn.addEventListener('click', () => showSubjects());
  els.prevBtn.addEventListener('click', prev);
  els.nextBtn.addEventListener('click', next);
  els.prevOverlayBtn.addEventListener('click', prev);
  els.nextOverlayBtn.addEventListener('click', next);
  els.fullscreenBtn.addEventListener('click', toggleFullscreen);
  els.slideStage.addEventListener('dblclick', toggleFullscreen);
  els.pageInput.addEventListener('change', () => goTo(els.pageInput.value));
  els.pageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { event.preventDefault(); goTo(els.pageInput.value); els.slideStage.focus(); }
  });
  els.slideImage.addEventListener('error', () => {
    els.slideImage.alt = '슬라이드 이미지를 불러오지 못했어.';
  });

  els.slideStage.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') return;
    state.pointerX = event.clientX;
    state.pointerY = event.clientY;
  });
  els.slideStage.addEventListener('pointerup', (event) => {
    if (state.pointerX == null || state.pointerY == null) return;
    const dx = event.clientX - state.pointerX;
    const dy = event.clientY - state.pointerY;
    state.pointerX = state.pointerY = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      if (dx < 0) next(); else prev();
    }
  });
  els.slideStage.addEventListener('pointercancel', () => { state.pointerX = state.pointerY = null; });

  document.addEventListener('keydown', (event) => {
    if (!state.subject || event.target === els.pageInput) return;
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); prev(); }
    if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') { event.preventDefault(); next(); }
    if (event.key === 'Home') { event.preventDefault(); goTo(1); }
    if (event.key === 'End') { event.preventDefault(); goTo(state.subject.count); }
    if (event.key === 'Escape' && !document.fullscreenElement) showSubjects();
  });

  window.addEventListener('popstate', () => {
    const parsed = parseHash();
    if (parsed) openSubject(parsed.subject, parsed.page, { fromHash: true, instant: true });
    else showSubjects(false);
  });

  renderSubjects();
  const initial = parseHash();
  if (initial) {
    openSubject(initial.subject, initial.page, { fromHash: true, instant: true });
  } else {
    const requestedSlug = new URLSearchParams(location.search).get('subject');
    const requestedSubject = manifest.find(item => item.slug === requestedSlug);
    if (requestedSubject) {
      const progress = readProgress();
      const last = clampPage(progress[requestedSubject.slug] || 1, requestedSubject);
      openSubject(requestedSubject, last, { replace: true, instant: true });
    }
  }
})();
