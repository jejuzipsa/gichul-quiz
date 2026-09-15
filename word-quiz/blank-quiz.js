(() => {
  const $ = id => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  const bank = window.BLANK_QUIZ_BANK;

  if (!bank || !Array.isArray(bank.questions) || bank.questions.length === 0) {
    document.body.innerHTML = '<main class="quiz-shell"><article class="result-card"><h1>괄호문제 데이터를 불러오지 못했습니다.</h1><a class="secondary-btn" href="../index.html">홈으로</a></article></main>';
    return;
  }

  const QUIZ_COUNT = 10;
  const state = {
    phase: 'main',
    session: [],
    index: 0,
    locked: false,
    current: null,
    firstAnswers: [],
    reviewQueue: [],
    initialWrongCount: 0
  };

  const els = {
    playView: $('playView'), resultView: $('resultView'), subjectTitle: $('subjectTitle'),
    progressText: $('progressText'), categoryText: $('categoryText'), progressFill: $('progressFill'),
    questionNumber: $('questionNumber'), questionText: $('questionText'), choices: $('choices'),
    feedback: $('feedback'), nextBtn: $('nextBtn'), resultHeadline: $('resultHeadline'),
    resultScore: $('resultScore'), resultBar: $('resultBar'), retryWrongBtn: $('retryWrongBtn'),
    newSetBtn: $('newSetBtn'), newSetTopBtn: $('newSetTopBtn'), wrongSection: $('wrongSection'),
    wrongCount: $('wrongCount'), wrongList: $('wrongList')
  };

  document.body.classList.add('blank-quiz-mode');
  const eyebrow = document.querySelector('.quiz-topbar .eyebrow');
  if (eyebrow) eyebrow.textContent = '핵심 개념 퀴즈 · 괄호문제';
  els.subjectTitle.textContent = bank.subject || '괄호문제';
  els.newSetTopBtn.textContent = '새 10문제';
  els.newSetBtn.textContent = '새로운 10문제';

  const answerOverlay = document.createElement('div');
  answerOverlay.id = 'answerOverlay';
  answerOverlay.className = 'answer-overlay hidden';
  answerOverlay.setAttribute('role', 'dialog');
  answerOverlay.setAttribute('aria-modal', 'true');
  answerOverlay.setAttribute('aria-labelledby', 'answerModalTitle');
  answerOverlay.innerHTML = `
    <div class="answer-modal">
      <div id="answerModalBadge" class="answer-modal-badge">정답</div>
      <h2 id="answerModalTitle" class="answer-modal-title"></h2>
      <p id="answerModalCorrect" class="answer-modal-correct hidden"></p>
      <p id="answerModalExplain" class="answer-modal-explain"></p>
      <button id="answerModalNext" class="answer-modal-next" type="button">다음 문제</button>
    </div>`;
  document.body.appendChild(answerOverlay);

  const modalEls = {
    overlay: answerOverlay,
    badge: document.getElementById('answerModalBadge'),
    title: document.getElementById('answerModalTitle'),
    correct: document.getElementById('answerModalCorrect'),
    explain: document.getElementById('answerModalExplain'),
    next: document.getElementById('answerModalNext')
  };

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function prepareQuestion(q) {
    const choices = shuffle((q.choices || []).map(label => ({ label, correct: label === q.answer })));
    return { ...q, displayChoices: choices };
  }

  function hideAnswerModal() {
    modalEls.overlay.classList.add('hidden');
    document.body.classList.remove('answer-modal-open');
  }

  function showAnswerModal(q, isCorrect) {
    modalEls.overlay.classList.remove('is-good', 'is-bad');
    modalEls.overlay.classList.add(isCorrect ? 'is-good' : 'is-bad');
    modalEls.badge.textContent = isCorrect ? '정답' : '오답';
    modalEls.title.textContent = isCorrect ? '정답.' : '오답.';

    if (isCorrect) {
      modalEls.correct.classList.add('hidden');
      modalEls.correct.textContent = '';
    } else {
      modalEls.correct.classList.remove('hidden');
      modalEls.correct.textContent = `정답: ${q.answer}`;
    }

    modalEls.explain.textContent = q.explanation || '';
    if (state.phase === 'main' && state.index === state.session.length - 1) {
      modalEls.next.textContent = state.reviewQueue.length ? '오답 복습 시작' : '결과 보기';
    } else if (state.phase === 'review' && state.reviewQueue.length === 0) {
      modalEls.next.textContent = '완료';
    } else {
      modalEls.next.textContent = '다음 문제';
    }
    modalEls.overlay.classList.remove('hidden');
    document.body.classList.add('answer-modal-open');
    requestAnimationFrame(() => modalEls.next.focus());
  }

  function startNewSet() {
    hideAnswerModal();
    state.phase = 'main';
    state.session = shuffle(bank.questions).slice(0, Math.min(QUIZ_COUNT, bank.questions.length)).map(prepareQuestion);
    state.index = 0;
    state.locked = false;
    state.current = null;
    state.firstAnswers = [];
    state.reviewQueue = [];
    state.initialWrongCount = 0;
    showPlay();
  }

  function showPlay() {
    els.resultView.classList.add('hidden');
    els.playView.classList.remove('hidden');
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function getCurrentQuestion() {
    if (state.phase === 'main') return state.session[state.index] || null;
    if (!state.reviewQueue.length) return null;
    if (!state.current || state.current.id !== state.reviewQueue[0].id) state.current = prepareQuestion(state.reviewQueue[0]);
    return state.current;
  }

  function renderPrompt(q) {
    els.questionText.textContent = '';
    const raw = String(q.prompt || '');
    const marker = '{{blank}}';
    const markerIndex = raw.indexOf(marker);
    if (markerIndex < 0) {
      els.questionText.textContent = raw;
      return;
    }
    els.questionText.appendChild(document.createTextNode(raw.slice(0, markerIndex)));
    els.questionText.appendChild(document.createTextNode('('));
    const slot = document.createElement('span');
    slot.id = 'blankSlot';
    slot.className = 'blank-slot';
    slot.textContent = '빈칸';
    slot.setAttribute('aria-label', '정답을 넣을 빈칸');
    els.questionText.appendChild(slot);
    els.questionText.appendChild(document.createTextNode(')'));
    els.questionText.appendChild(document.createTextNode(raw.slice(markerIndex + marker.length)));
  }

  function renderQuestion() {
    const q = getCurrentQuestion();
    if (!q) return renderResult();

    state.locked = false;
    els.feedback.className = 'feedback hidden';
    els.feedback.innerHTML = '';
    els.nextBtn.classList.add('hidden');
    els.choices.innerHTML = '';

    if (state.phase === 'main') {
      els.progressText.textContent = `${state.index + 1} / ${state.session.length}`;
      els.categoryText.textContent = '괄호문제 · 10문제 고정';
      els.progressFill.style.width = `${((state.index + 1) / state.session.length) * 100}%`;
      els.questionNumber.textContent = `문제 ${state.index + 1}`;
    } else {
      const resolved = state.initialWrongCount - state.reviewQueue.length;
      const rate = state.initialWrongCount ? resolved / state.initialWrongCount * 100 : 100;
      els.progressText.textContent = '오답 복습';
      els.categoryText.textContent = `남은 오답 ${state.reviewQueue.length}문제`;
      els.progressFill.style.width = `${Math.max(0, Math.min(100, rate))}%`;
      els.questionNumber.textContent = `오답 복습 · 남은 ${state.reviewQueue.length}문제`;
    }

    renderPrompt(q);
    q.displayChoices.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice blank-choice';
      btn.innerHTML = `<span class="choice-index">${idx + 1}</span><span class="choice-text"></span>`;
      btn.querySelector('.choice-text').textContent = opt.label;
      btn.addEventListener('click', () => answer(idx));
      els.choices.appendChild(btn);
    });
  }

  function answer(selectedIndex) {
    if (state.locked) return;
    const q = getCurrentQuestion();
    const selected = q?.displayChoices[selectedIndex];
    if (!selected) return;
    state.locked = true;

    [...els.choices.querySelectorAll('.choice')].forEach((btn, idx) => {
      btn.disabled = true;
      const opt = q.displayChoices[idx];
      if (opt.correct) btn.classList.add('correct');
      else if (idx === selectedIndex) btn.classList.add('wrong');
      else btn.classList.add('dimmed');
    });

    const blankSlot = document.getElementById('blankSlot');
    if (blankSlot) {
      blankSlot.textContent = selected.label;
      blankSlot.classList.add(selected.correct ? 'is-correct' : 'is-wrong');
    }

    if (state.phase === 'main') {
      state.firstAnswers.push({ question: q, selected: selected.label, correct: selected.correct, correctLabel: q.answer });
      if (!selected.correct && !state.reviewQueue.some(item => item.id === q.id)) state.reviewQueue.push(q);
      if (state.index === state.session.length - 1) state.initialWrongCount = state.reviewQueue.length;
    } else {
      const currentBase = state.reviewQueue[0];
      state.reviewQueue.shift();
      if (!selected.correct) state.reviewQueue.push(currentBase);
      state.current = null;
    }
    showAnswerModal(q, selected.correct);
  }

  function next() {
    if (!state.locked) return;
    hideAnswerModal();
    if (state.phase === 'main') {
      state.index += 1;
      if (state.index < state.session.length) renderQuestion();
      else if (state.reviewQueue.length) {
        state.phase = 'review';
        state.current = null;
        renderQuestion();
      } else renderResult();
    } else if (state.reviewQueue.length) renderQuestion();
    else renderResult();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderResult() {
    hideAnswerModal();
    els.playView.classList.add('hidden');
    els.resultView.classList.remove('hidden');
    const total = state.firstAnswers.length;
    const correct = state.firstAnswers.filter(a => a.correct).length;
    const wrong = total - correct;
    const rate = total ? Math.round(correct / total * 100) : 0;
    els.resultHeadline.textContent = wrong ? '오답 복습까지 완료' : '10문제 전부 정답';
    els.resultScore.textContent = wrong ? `최초 정답 ${correct} / ${total} · 오답 ${wrong}문제 복습 완료` : `최초 정답 ${correct} / ${total} · 정답률 100%`;
    els.resultBar.querySelector('span').style.width = `${rate}%`;
    els.retryWrongBtn.classList.add('hidden');
    els.wrongSection.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  modalEls.next.addEventListener('click', next);
  els.nextBtn.addEventListener('click', next);
  els.newSetBtn.addEventListener('click', startNewSet);
  els.newSetTopBtn.addEventListener('click', () => {
    if (confirm('새 10문제를 시작하시겠습니까?')) startNewSet();
  });

  startNewSet();
})();
