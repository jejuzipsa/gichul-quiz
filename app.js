const SITE_BUILD_VERSION='1.45';
(() => {
  const $ = (id) => document.getElementById(id);
  const READING_SIZE_KEY = 'gichulQuizReadingSize';
  const READING_SIZES = new Set(['small','normal','large']);

  const state = {
    subject: null,
    bank: [],
    subjectCache: new Map(),
    subjectOverrides: new Map(),
    session: [],
    sessionKind: 'practice',
    practiceSize: 20,
    index: 0,
    reviewMode: false,
    reviewTargetIndex: null,
    browseSubject: null,
    browseBank: [],
    browsePage: 1,
    summaryCode: null,
    summaryData: null,
    summaryCache: new Map(),
    exam: {
      type: null,
      year: null,
      items: [],
      index: 0,
      endTime: 0,
      timerId: null,
      finished: false,
      result: null,
      finishReason: null
    }
  };

  const manifest = Array.isArray(window.SUBJECT_MANIFEST) ? window.SUBJECT_MANIFEST : [];
  const summaryManifest = Array.isArray(window.SUMMARY_MANIFEST) ? window.SUMMARY_MANIFEST : [];

  const EXAM_CONFIGS = {
    first: {
      key: 'first', label: '1차', paper: '1차 1교시', duration: 100 * 60, total: 80,
      subjects: ['부동산학개론', '민법 및 민사특별법'],
      subjectCounts: {'부동산학개론': 40, '민법 및 민사특별법': 40},
      scoreGroups: [
        {label: '부동산학개론', subjects: ['부동산학개론']},
        {label: '민법 및 민사특별법', subjects: ['민법 및 민사특별법']}
      ],
      resultScope: '1차'
    },
    second1: {
      key: 'second1', label: '2차 1교시', paper: '2차 1교시', duration: 100 * 60, total: 80,
      subjects: ['공인중개사법령 및 중개실무', '부동산공법'],
      subjectCounts: {'공인중개사법령 및 중개실무': 40, '부동산공법': 40},
      scoreGroups: [
        {label: '공인중개사법령 및 중개실무', subjects: ['공인중개사법령 및 중개실무']},
        {label: '부동산공법', subjects: ['부동산공법']}
      ],
      resultScope: '2차 1교시'
    },
    second2: {
      key: 'second2', label: '2차 2교시', paper: '2차 2교시', duration: 50 * 60, total: 40,
      subjects: ['부동산공시법', '부동산세법'],
      subjectCounts: {'부동산공시법': 24, '부동산세법': 16},
      scoreGroups: [
        {label: '부동산공시법령 및 부동산 관련 세법', subjects: ['부동산공시법', '부동산세법']}
      ],
      resultScope: '2차 2교시'
    }
  };

  const views = {
    home: $('homeView'), summary: $('summaryView'), bank: $('bankView'), quiz: $('quizView'), result: $('resultView'),
    examSetup: $('examSetupView'), examQuiz: $('examQuizView'), examResult: $('examResultView')
  };

  const els = {
    headerTitle: $('headerTitle'), homeBtn: $('homeBtn'), subjectGrid: $('subjectGrid'), examEntryBtn: $('examEntryBtn'),
    summarySubjectGrid: $('summarySubjectGrid'), summaryTitle: $('summaryTitle'), summaryMeta: $('summaryMeta'), summarySearch: $('summarySearch'), summarySubjectTabs: $('summarySubjectTabs'), summaryToc: $('summaryToc'), summaryTocSelect: $('summaryTocSelect'), summaryContent: $('summaryContent'), summarySearchStatus: $('summarySearchStatus'), summaryFloatActions: $('summaryFloatActions'), summaryFloatHomeBtn: $('summaryFloatHomeBtn'), summaryFloatTopBtn: $('summaryFloatTopBtn'),
    bankBrowserSubject: $('bankBrowserSubject'), bankBrowserSummary: $('bankBrowserSummary'), bankQuestionList: $('bankQuestionList'), bankPagination: $('bankPagination'), bankStartQuizBtn: $('bankStartQuizBtn'), bankFloatActions: $('bankFloatActions'), bankFloatQuizBtn: $('bankFloatQuizBtn'), bankFloatHomeBtn: $('bankFloatHomeBtn'), bankFloatTopBtn: $('bankFloatTopBtn'),
    quizSubject: $('quizSubject'), quizProgress: $('quizProgress'), sourceMeta: $('sourceMeta'), progressFill: $('progressFill'), questionCard: $('questionCard'), questionNumber: $('questionNumber'), questionText: $('questionText'), answerForm: $('answerForm'), feedback: $('feedback'), nextBtn: $('nextBtn'), backToResultBtn: $('backToResultBtn'),
    resultSubject: $('resultSubject'), resultScore: $('resultScore'), resultGrid: $('resultGrid'), resultHint: $('resultHint'), practiceFullReviewBtn: $('practiceFullReviewBtn'), practiceFullReview: $('practiceFullReview'), practiceFullReviewList: $('practiceFullReviewList'), practiceResultActions: $('practiceResultActions'), practiceStickyCloseBtn: $('practiceStickyCloseBtn'), practiceScrollTopBtn: $('practiceScrollTopBtn'), restartBtn: $('restartBtn'), changeSubjectBtn: $('changeSubjectBtn'),
    examYearSelect: $('examYearSelect'), examTypeGrid: $('examTypeGrid'), examHistoryList: $('examHistoryList'), clearExamHistoryBtn: $('clearExamHistoryBtn'), examRunningTitle: $('examRunningTitle'), examRunningProgress: $('examRunningProgress'), examTimer: $('examTimer'), examProgressFill: $('examProgressFill'), examQuestionNumber: $('examQuestionNumber'), examQuestionText: $('examQuestionText'), examAnswerForm: $('examAnswerForm'), examNextBtn: $('examNextBtn'), examQuestionIndex: $('examQuestionIndex'),
    examResultMeta: $('examResultMeta'), examResultHeadline: $('examResultHeadline'), examResultScore: $('examResultScore'), examScoreCards: $('examScoreCards'), examFullReviewBtn: $('examFullReviewBtn'), examResultGrid: $('examResultGrid'), examResultNote: $('examResultNote'), examFullReview: $('examFullReview'), examFullReviewList: $('examFullReviewList'), examResultActions: $('examResultActions'), examWrongReviewBtn: $('examWrongReviewBtn'), examAgainBtn: $('examAgainBtn'), examStickyCloseBtn: $('examStickyCloseBtn'), examHomeBtn: $('examHomeBtn'), examScrollTopBtn: $('examScrollTopBtn')
  };

  const readingSizeButtons = [...document.querySelectorAll('.reading-size-btn')];

  function loadReadingSize(){
    try {
      const saved = localStorage.getItem(READING_SIZE_KEY);
      return READING_SIZES.has(saved) ? saved : 'normal';
    } catch {
      return 'normal';
    }
  }

  function applyReadingSize(size, persist=true){
    const next = READING_SIZES.has(size) ? size : 'normal';
    document.body.dataset.readingSize = next;
    readingSizeButtons.forEach(btn => {
      const active = btn.dataset.readingSize === next;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    if(persist){
      try { localStorage.setItem(READING_SIZE_KEY, next); } catch {}
    }
  }

  function showView(name) {
    Object.entries(views).forEach(([key, el]) => el.classList.toggle('hidden', key !== name));
    els.homeBtn.classList.toggle('hidden', name === 'home');
    els.bankFloatActions?.classList.add('hidden');
    els.summaryFloatActions?.classList.add('hidden');
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  function updateBankFloatActions(){
    if(!els.bankFloatActions)return;
    const bankVisible=!views.bank.classList.contains('hidden');
    els.bankFloatActions.classList.toggle('hidden', !bankVisible || window.scrollY < 260);
  }

  function shuffle(array) {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function choiceLabel(n) { return ['①','②','③','④','⑤'][n - 1] || `${n}.`; }
  function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }
  function subjectCount(entry) { return state.subjectOverrides.has(entry.name) ? state.subjectOverrides.get(entry.name).length : (Number(entry.count) || 0); }
  function totalQuestionCount() { return manifest.reduce((sum, entry) => sum + subjectCount(entry), 0); }

  function renderHome() {
    const total = totalQuestionCount();
    els.headerTitle.textContent = `공인중개사 기출문제(${total}문항)`;
    els.subjectGrid.innerHTML = '';
    renderSummaryHome();
    for (const entry of manifest) {
      const count = subjectCount(entry);
      const card = document.createElement('div');
      card.className = 'subject-card';

      const info = document.createElement('div');
      info.className = 'subject-info';
      const years = Array.isArray(entry.years) && entry.years.length ? ` · ${entry.years.join('·')}` : '';
      info.innerHTML = `<strong>${escapeHtml(entry.name)}</strong><span>${count}문제${years}</span>`;

      const actions = document.createElement('div');
      actions.className = 'subject-actions';

      const quick = document.createElement('div');
      quick.className = 'subject-quick-actions';

      const makeQuizBtn = (questionCount) => {
        const quizBtn = document.createElement('button');
        quizBtn.type = 'button';
        quizBtn.className = 'subject-quiz-count-btn';
        quizBtn.textContent = `${questionCount}문제`;
        quizBtn.addEventListener('click', async () => {
          const buttons = actions.querySelectorAll('button');
          buttons.forEach(button => button.disabled = true);
          const original = quizBtn.textContent;
          quizBtn.textContent = '불러오는 중';
          try {
            await startSubject(entry.name, questionCount);
          } catch (err) {
            alert(`과목 문제를 불러오지 못했어.\n\n${err.message}`);
            buttons.forEach(button => button.disabled = false);
            quizBtn.textContent = original;
          }
        });
        return quizBtn;
      };

      quick.append(makeQuizBtn(10), makeQuizBtn(20));

      const browseBtn = document.createElement('button');
      browseBtn.type = 'button';
      browseBtn.className = 'subject-browse-btn';
      browseBtn.textContent = '전체 문제 보기';
      browseBtn.addEventListener('click', async () => {
        const buttons = actions.querySelectorAll('button');
        buttons.forEach(button => button.disabled = true);
        const t = browseBtn.textContent;
        browseBtn.textContent = '불러오는 중';
        try {
          await openSubjectBrowser(entry.name);
        } catch (err) {
          alert(`전체 문제를 불러오지 못했어.\n\n${err.message}`);
          buttons.forEach(button => button.disabled = false);
          browseBtn.textContent = t;
        }
      });

      actions.append(quick, browseBtn);
      card.append(info, actions);
      els.subjectGrid.appendChild(card);
    }
  }


  function renderSummaryHome(){
    if(!els.summarySubjectGrid)return;
    els.summarySubjectGrid.innerHTML='';
    for(const entry of summaryManifest){
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='summary-subject-home-btn';
      btn.innerHTML=`<strong>${escapeHtml(entry.short_name||entry.name)}</strong><span>슬라이드형 · 새 탭</span>`;
      btn.addEventListener('click',async()=>{
        if(entry.code==='real_estate_intro'){
          window.open('summary/real_estate_intro_slides_v142.html?v=1.45','_blank','noopener');
          return;
        }
        if(['civil_law','brokerage_law','public_law','registration_law','tax_law'].includes(entry.code)){
          window.open(`summary/slides_v143.html?subject=${encodeURIComponent(entry.code)}&v=1.45`,'_blank','noopener');
          return;
        }
        btn.disabled=true;
        const original=btn.innerHTML;
        btn.innerHTML=`<strong>${escapeHtml(entry.short_name||entry.name)}</strong><span>불러오는 중...</span>`;
        try{await openSummary(entry.code);}
        catch(err){
          alert(`핵심요약을 불러오지 못했어.\n\n${err.message}`);
          btn.disabled=false;
          btn.innerHTML=original;
        }
      });
      els.summarySubjectGrid.appendChild(btn);
    }
  }

  function loadSummaryScriptOnce(src,code){
    return new Promise((resolve,reject)=>{
      if(window.SUMMARY_DATA&&window.SUMMARY_DATA[code])return resolve(window.SUMMARY_DATA[code]);
      const script=document.createElement('script');
      script.src=src;
      script.async=true;
      script.onload=()=>{
        const data=window.SUMMARY_DATA&&window.SUMMARY_DATA[code];
        if(!data)reject(new Error(`${src}에서 핵심요약 데이터를 찾지 못했어.`));
        else resolve(data);
      };
      script.onerror=()=>reject(new Error(`${src} 파일을 읽지 못했어.`));
      document.head.appendChild(script);
    });
  }

  async function loadSummaryData(code){
    if(state.summaryCache.has(code))return state.summaryCache.get(code);
    const entry=summaryManifest.find(item=>item.code===code);
    if(!entry)throw new Error(`핵심요약 설정을 찾을 수 없어: ${code}`);
    let data;
    if(location.protocol!=='file:'){
      try{
        const response=await fetch(entry.json,{cache:'no-store'});
        if(!response.ok)throw new Error(`HTTP ${response.status}`);
        data=await response.json();
      }catch{
        data=await loadSummaryScriptOnce(entry.script,code);
      }
    }else{
      data=await loadSummaryScriptOnce(entry.script,code);
    }
    if(!data||!Array.isArray(data.sections))throw new Error('핵심요약 데이터 형식이 잘못됐어.');
    state.summaryCache.set(code,data);
    return data;
  }

  async function openSummary(code){
    const data=await loadSummaryData(code);
    state.summaryCode=code;
    state.summaryData=data;
    els.headerTitle.textContent='공인중개사 핵심요약';
    if(els.summarySearch)els.summarySearch.value='';
    renderSummaryTabs();
    renderSummaryReader();
    showView('summary');
  }

  function renderSummaryTabs(){
    if(!els.summarySubjectTabs)return;
    els.summarySubjectTabs.innerHTML='';
    for(const entry of summaryManifest){
      const btn=document.createElement('button');
      btn.type='button';
      btn.className=`summary-tab${entry.code===state.summaryCode?' active':''}`;
      btn.textContent=entry.short_name||entry.name;
      btn.addEventListener('click',()=>openSummary(entry.code));
      els.summarySubjectTabs.appendChild(btn);
    }
  }

  function summaryPageLabel(section){
    return section.page_start===section.page_end
      ? `PDF ${section.page_start}쪽`
      : `PDF ${section.page_start}~${section.page_end}쪽`;
  }

  function renderSummaryMobileBody(container,content){
    container.innerHTML='';
    const lines=String(content||'').replace(/\r/g,'').split('\n');
    let previousBlank=false;
    for(const raw of lines){
      const normalized=raw
        .replace(/\t+/g,' ')
        .replace(/[ ]{2,}/g,' ')
        .trim();

      if(!normalized){
        if(!previousBlank){
          const spacer=document.createElement('div');
          spacer.className='summary-mobile-spacer';
          container.appendChild(spacer);
        }
        previousBlank=true;
        continue;
      }

      previousBlank=false;
      const line=document.createElement('div');
      line.className='summary-mobile-line';
      if(/^※/.test(normalized))line.classList.add('note');
      else if(/^[○●◎]/.test(normalized))line.classList.add('bullet');
      else if(/^[-–—ㆍ·]/.test(normalized))line.classList.add('dash');
      else if(/^\(?\d+\)?[.)]/.test(normalized)||/^\(\d+\)/.test(normalized))line.classList.add('numbered');
      line.textContent=normalized;
      container.appendChild(line);
    }
  }

  function renderSummaryReader(){
    const data=state.summaryData;
    if(!data)return;
    els.summaryTitle.textContent=data.name;
    els.summaryMeta.textContent=`${data.page_count}페이지 · ${data.section_count}개 항목 · 업로드한 요약 PDF 기준`;
    els.summaryToc.innerHTML='';
    if(els.summaryTocSelect){
      els.summaryTocSelect.innerHTML='<option value="">목차에서 이동</option>';
      els.summaryTocSelect.value='';
    }
    els.summaryContent.innerHTML='';

    const compactMobile=window.matchMedia('(max-width: 820px)').matches;
    let currentGroup='';
    for(const [idx,section] of data.sections.entries()){
      if(section.group!==currentGroup){
        currentGroup=section.group;
        const group=document.createElement('div');
        group.className='summary-group-heading';
        group.dataset.summaryGroup=currentGroup;
        group.textContent=currentGroup;
        els.summaryContent.appendChild(group);

        const tocGroup=document.createElement('div');
        tocGroup.className='summary-toc-group';
        tocGroup.textContent=currentGroup;
        els.summaryToc.appendChild(tocGroup);
      }

      const details=document.createElement('details');
      details.className='summary-section';
      details.id=section.id;
      details.open=!compactMobile||idx===0;
      details.dataset.searchText=`${section.group} ${section.title} ${section.content}`.toLowerCase();

      const head=document.createElement('summary');
      head.className='summary-section-head';
      const title=document.createElement('span');
      title.className='summary-section-title';
      title.textContent=section.title;
      const page=document.createElement('span');
      page.className='summary-section-page';
      page.textContent=summaryPageLabel(section);
      head.append(title,page);

      const bodyWrap=document.createElement('div');
      bodyWrap.className='summary-section-body-wrap';

      const desktopBody=document.createElement('pre');
      desktopBody.className='summary-section-body summary-desktop-body';
      desktopBody.textContent=section.content;

      const mobileBody=document.createElement('div');
      mobileBody.className='summary-mobile-body';
      renderSummaryMobileBody(mobileBody,section.content);

      bodyWrap.append(desktopBody,mobileBody);

      details.append(head,bodyWrap);
      els.summaryContent.appendChild(details);

      const tocBtn=document.createElement('button');
      tocBtn.type='button';
      tocBtn.className='summary-toc-btn';
      tocBtn.textContent=section.title;
      tocBtn.dataset.target=section.id;
      tocBtn.dataset.searchText=`${section.group} ${section.title} ${section.content}`.toLowerCase();
      tocBtn.addEventListener('click',()=>{
        details.open=true;
        details.scrollIntoView({behavior:'smooth',block:'start'});
      });
      els.summaryToc.appendChild(tocBtn);

      if(els.summaryTocSelect){
        const option=document.createElement('option');
        option.value=section.id;
        option.textContent=section.group===section.title
          ? section.title
          : `${section.group} · ${section.title}`;
        els.summaryTocSelect.appendChild(option);
      }
    }
    applySummarySearch('');
  }

  function applySummarySearch(rawQuery){
    const query=String(rawQuery||'').trim().toLowerCase();
    const sections=[...els.summaryContent.querySelectorAll('.summary-section')];
    const tocButtons=[...els.summaryToc.querySelectorAll('.summary-toc-btn')];

    let matches=0;
    sections.forEach(section=>{
      const visible=!query||section.dataset.searchText.includes(query);
      section.classList.toggle('hidden',!visible);
      if(visible){
        matches++;
        if(query)section.open=true;
      }
    });

    tocButtons.forEach(btn=>{
      btn.classList.toggle('hidden',!!query&&!btn.dataset.searchText.includes(query));
    });

    [...els.summaryContent.querySelectorAll('.summary-group-heading')].forEach(group=>{
      let next=group.nextElementSibling;
      let hasVisible=false;
      while(next&&!next.classList.contains('summary-group-heading')){
        if(next.classList.contains('summary-section')&&!next.classList.contains('hidden')){
          hasVisible=true;break;
        }
        next=next.nextElementSibling;
      }
      group.classList.toggle('hidden',!hasVisible);
    });

    [...els.summaryToc.querySelectorAll('.summary-toc-group')].forEach(group=>{
      let next=group.nextElementSibling;
      let hasVisible=false;
      while(next&&!next.classList.contains('summary-toc-group')){
        if(next.classList.contains('summary-toc-btn')&&!next.classList.contains('hidden')){
          hasVisible=true;break;
        }
        next=next.nextElementSibling;
      }
      group.classList.toggle('hidden',!hasVisible);
    });

    if(query){
      els.summarySearchStatus.classList.remove('hidden');
      els.summarySearchStatus.textContent=matches
        ? `“${rawQuery.trim()}” 검색 결과 ${matches}개 항목`
        : `“${rawQuery.trim()}” 검색 결과가 없어.`;
    }else{
      els.summarySearchStatus.classList.add('hidden');
      els.summarySearchStatus.textContent='';
    }
  }

  function updateSummaryFloatActions(){
    if(!els.summaryFloatActions)return;
    const visible=!views.summary.classList.contains('hidden')&&window.scrollY>=280;
    els.summaryFloatActions.classList.toggle('hidden',!visible);
  }

  function validateBank(data, expectedSubject = null) {
    if (!Array.isArray(data)) throw new Error('JSON 최상위 형식은 배열이어야 해.');
    if (!data.length) throw new Error('문제가 하나도 없어.');
    const ids = new Set();
    return data.map((q, idx) => {
      if (!q || typeof q !== 'object') throw new Error(`${idx + 1}번째 문제 형식이 잘못됐어.`);
      for (const key of ['id','subject','answer']) if (!(key in q)) throw new Error(`${idx + 1}번째 문제에 '${key}'가 없어.`);
      const subject = String(q.subject).trim();
      if (expectedSubject && subject !== expectedSubject) throw new Error(`${q.id}: 과목 태그가 '${subject}'로 되어 있어.`);
      if (ids.has(String(q.id))) throw new Error(`중복 id가 있어: ${q.id}`); ids.add(String(q.id));
      const textChoices = Array.isArray(q.choices) ? q.choices.map(v => String(v ?? '')) : [];
      const imageChoices = Array.isArray(q.choice_images) ? q.choice_images.map(v => String(v ?? '')) : [];
      const choiceCount = Math.max(textChoices.length, imageChoices.length);
      if (choiceCount < 2 || choiceCount > 5) throw new Error(`${q.id}: 보기는 2~5개여야 해.`);
      while (textChoices.length < choiceCount) textChoices.push('');
      while (imageChoices.length < choiceCount) imageChoices.push('');
      const question = q.question == null ? '' : String(q.question);
      const questionImage = q.question_image == null ? '' : String(q.question_image);
      if (!question.trim() && !questionImage.trim()) throw new Error(`${q.id}: 문제 내용이 없어.`);
      const rawAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];
      const answers = [...new Set(rawAnswers.map(Number))];
      if (!answers.length || answers.some(a => !Number.isInteger(a) || a < 1 || a > choiceCount)) throw new Error(`${q.id}: answer 값이 잘못됐어.`);
      return {
        id: String(q.id), subject, year: Number(q.year) || 0, exam: Number(q.exam) || 0,
        paper: q.paper ? String(q.paper) : '', question_number: Number(q.question_number) || idx + 1,
        question, question_image: questionImage, choices: textChoices, choice_images: imageChoices,
        answer: answers.length === 1 ? answers[0] : answers, explanation: q.explanation ? String(q.explanation) : ''
      };
    });
  }

  function loadScriptOnce(src, subjectName) {
    return new Promise((resolve, reject) => {
      if (window.SUBJECT_DATA && Array.isArray(window.SUBJECT_DATA[subjectName])) return resolve(window.SUBJECT_DATA[subjectName]);
      const script = document.createElement('script'); script.src = src; script.async = true;
      script.onload = () => {
        const data = window.SUBJECT_DATA && window.SUBJECT_DATA[subjectName];
        if (!Array.isArray(data)) reject(new Error(`${src}에서 문제 배열을 찾지 못했어.`)); else resolve(data);
      };
      script.onerror = () => reject(new Error(`${src} 파일을 읽지 못했어.`));
      document.head.appendChild(script);
    });
  }

  async function loadSubjectBank(subjectName) {
    if (state.subjectOverrides.has(subjectName)) return state.subjectOverrides.get(subjectName);
    if (state.subjectCache.has(subjectName)) return state.subjectCache.get(subjectName);
    const entry = manifest.find(item => item.name === subjectName);
    if (!entry) throw new Error(`과목 설정을 찾을 수 없어: ${subjectName}`);
    let raw;
    if (location.protocol !== 'file:') {
      try { const response = await fetch(entry.json, {cache:'no-store'}); if (!response.ok) throw new Error(`HTTP ${response.status}`); raw = await response.json(); }
      catch { raw = await loadScriptOnce(entry.script, subjectName); }
    } else raw = await loadScriptOnce(entry.script, subjectName);
    const validated = validateBank(raw, subjectName); state.subjectCache.set(subjectName, validated); return validated;
  }

  const BROWSE_PAGE_SIZE = 20;
  async function openSubjectBrowser(subject) {
    const pool = await loadSubjectBank(subject);
    state.browseSubject = subject;
    state.browseBank = [...pool].sort((a,b) => (b.year-a.year) || (b.exam-a.exam) || (a.question_number-b.question_number));
    state.browsePage = 1; showView('bank'); renderSubjectBrowser();
  }

  function renderSubjectBrowser() {
    const total = state.browseBank.length; const totalPages = Math.max(1, Math.ceil(total / BROWSE_PAGE_SIZE));
    state.browsePage = Math.min(Math.max(1, state.browsePage), totalPages);
    const start = (state.browsePage - 1) * BROWSE_PAGE_SIZE; const pageItems = state.browseBank.slice(start, start+BROWSE_PAGE_SIZE);
    els.bankBrowserSubject.textContent = state.browseSubject || '';
    els.bankBrowserSummary.textContent = `등록 ${total}문제 · ${state.browsePage} / ${totalPages} 페이지 · 페이지당 ${BROWSE_PAGE_SIZE}문제`;
    els.bankQuestionList.innerHTML = '';
    pageItems.forEach(q => {
      const card = document.createElement('article'); card.className='bank-question-card';
      const meta=[]; if(q.year)meta.push(`${q.year}년`); if(q.exam)meta.push(`제${q.exam}회`); if(q.paper)meta.push(q.paper); if(q.question_number)meta.push(`원문 ${q.question_number}번`);
      const metaEl=document.createElement('div'); metaEl.className='bank-question-meta'; metaEl.textContent=meta.join(' · ');
      const title=document.createElement('h3'); title.className='bank-question-title'; title.textContent=q.question || '(문제 내용 없음)';
      const choices=document.createElement('div'); choices.className='bank-choice-list';
      const correct=Array.isArray(q.answer)?q.answer.map(Number):[Number(q.answer)];
      q.choices.forEach((choice,idx)=>{const row=document.createElement('div');row.className=`bank-choice-row${correct.includes(idx+1)?' correct':''}`;const l=document.createElement('span');l.className='bank-choice-label';l.textContent=choiceLabel(idx+1);const t=document.createElement('span');t.textContent=choice;row.append(l,t);choices.appendChild(row);});
      card.append(metaEl,title,choices);els.bankQuestionList.appendChild(card);
    });
    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    els.bankPagination.innerHTML='';
    const add=(label,page,className='',disabled=false,active=false)=>{const btn=document.createElement('button');btn.type='button';btn.className=`page-btn ${className}${active?' active':''}`.trim();btn.textContent=label;btn.disabled=disabled;btn.addEventListener('click',()=>{state.browsePage=page;renderSubjectBrowser();window.scrollTo({top:0,behavior:'smooth'});});els.bankPagination.appendChild(btn);};
    add('처음', 1, 'nav first', state.browsePage <= 1);
    add('이전', Math.max(1, state.browsePage - 1), 'nav prev', state.browsePage <= 1);
    const groupSize = 5;
    const first = Math.floor((state.browsePage - 1) / groupSize) * groupSize + 1;
    const last = Math.min(totalPages, first + groupSize - 1);
    for (let p = first; p <= last; p++) add(String(p), p, '', false, p === state.browsePage);
    add('다음', Math.min(totalPages, state.browsePage + 1), 'nav next', state.browsePage >= totalPages);
    add('끝', totalPages, 'nav last', state.browsePage >= totalPages);
  }

  function buildSessionItem(q) {
    const count=Math.max(q.choices?.length||0,q.choice_images?.length||0);
    const tagged=Array.from({length:count},(_,i)=>({text:q.choices?.[i]||'',image:q.choice_images?.[i]||'',originalIndex:i+1}));
    const shuffledChoices=shuffle(tagged); const originalAnswers=Array.isArray(q.answer)?q.answer:[q.answer];
    const correctDisplayIndices=shuffledChoices.map((c,idx)=>originalAnswers.includes(c.originalIndex)?idx+1:null).filter(Boolean);
    return {q,shuffledChoices,correctDisplayIndices,attempts:0,hadWrong:false,completed:false,selected:null,answerHistory:[]};
  }

  async function startSubject(subject, questionCount=20) {
    stopExamTimer();
    const pool=await loadSubjectBank(subject); if(!pool.length)return;
    const requestedCount=questionCount===10?10:20;
    state.practiceSize=requestedCount;
    state.subject=subject;
    state.bank=pool;
    state.session=shuffle(pool).slice(0,Math.min(requestedCount,pool.length)).map(buildSessionItem);
    state.sessionKind='practice';
    state.index=0;
    state.reviewMode=false;
    state.reviewTargetIndex=null;
    showView('quiz');
    renderQuestion();
  }
  function scrollQuestionToTop(){
    window.scrollTo({top:0,left:0,behavior:'auto'});
  }
  function currentItem(){return state.session[state.index];}
  function resetQuestionVisuals(){els.questionCard.classList.remove('correct','wrong');els.feedback.className='feedback hidden';els.feedback.textContent='';els.nextBtn.classList.add('hidden');els.backToResultBtn.classList.add('hidden');}
  function renderQuestionContentTo(container,q){container.innerHTML='';if(q.question_image){const img=document.createElement('img');img.className='question-image';img.src=q.question_image;img.alt='문제 자료';container.appendChild(img);}if(q.question){const text=document.createElement('div');text.className='question-text-content';text.textContent=q.question;container.appendChild(text);}}
  function renderQuestion(){const item=currentItem();if(!item)return showResult();resetQuestionVisuals();els.quizSubject.textContent=state.subject;const no=state.index+1;els.quizProgress.textContent=state.reviewMode?`오답 다시 풀기 · ${no}번`:`${no} / ${state.session.length}`;els.progressFill.style.width=`${state.reviewMode?100:(no/state.session.length)*100}%`;const meta=[];if(item.q.year)meta.push(`${item.q.year}년`);if(item.q.exam)meta.push(`제${item.q.exam}회`);if(item.q.paper)meta.push(item.q.paper);if(item.q.question_number)meta.push(`원문 ${item.q.question_number}번`);els.sourceMeta.textContent=meta.join(' · ');els.questionNumber.textContent=state.reviewMode?`오답 문제 ${no}`:`문제 ${no}`;renderQuestionContentTo(els.questionText,item.q);els.answerForm.innerHTML='';item.selected=null;item.attempts=0;item.completed=false;item.shuffledChoices.forEach((choice,idx)=>{const label=document.createElement('label');label.className=`choice${choice.image?' has-image':''}`;const input=document.createElement('input');input.type='radio';input.name='answer';input.value=String(idx+1);input.addEventListener('change',()=>{item.selected=idx+1;gradeSelection();});const index=document.createElement('span');index.className='choice-index';index.textContent=choiceLabel(idx+1);const content=document.createElement('span');content.className='choice-content';if(choice.image){const img=document.createElement('img');img.className='choice-image';img.src=choice.image;content.appendChild(img);}if(choice.text){const text=document.createElement('span');text.className='choice-text';text.textContent=choice.text;content.appendChild(text);}label.append(input,index,content);els.answerForm.appendChild(label);});scrollQuestionToTop();}
  function setChoicesLocked(locked){els.answerForm.querySelectorAll('input').forEach(i=>i.disabled=locked);els.answerForm.querySelectorAll('.choice').forEach(c=>c.classList.toggle('locked',locked));}
  function showFeedback(kind,html){els.feedback.className=`feedback ${kind}`;els.feedback.innerHTML=html;}
  function showWrongAnswer(item){els.feedback.className='feedback bad';els.feedback.innerHTML='';const title=document.createElement('div');title.textContent='오답입니다.';els.feedback.appendChild(title);[...item.correctDisplayIndices].sort((a,b)=>a-b).forEach(displayIndex=>{const choice=item.shuffledChoices[displayIndex-1];const line=document.createElement('div');line.className='answer-line';const prefix=document.createElement('strong');prefix.textContent=`정답: ${choiceLabel(displayIndex)}`;line.appendChild(prefix);if(choice.text){const text=document.createElement('span');text.className='answer-choice-text';text.textContent=` ${choice.text}`;line.appendChild(text);}els.feedback.appendChild(line);});}
  function gradeSelection(){const item=currentItem();if(!item||!item.selected||item.completed)return;item.attempts++;item.answerHistory=item.answerHistory||[];item.answerHistory.push(Number(item.selected));const correct=item.correctDisplayIndices.includes(item.selected);if(correct){setChoicesLocked(true);els.questionCard.classList.remove('wrong');els.questionCard.classList.add('correct');showFeedback('good','정답입니다.');item.completed=true;if(state.reviewMode)els.backToResultBtn.classList.remove('hidden');else els.nextBtn.classList.remove('hidden');return;}item.hadWrong=true;els.questionCard.classList.remove('correct');els.questionCard.classList.add('wrong');if(item.attempts<2){showFeedback('bad','오답입니다. 다시 선택해.');return;}setChoicesLocked(true);showWrongAnswer(item);item.completed=true;if(state.reviewMode)els.backToResultBtn.classList.remove('hidden');else els.nextBtn.classList.remove('hidden');}
  function nextQuestion(){if(state.index>=state.session.length-1)return showResult();state.index++;renderQuestion();}

  function renderPracticeFullReview(){
    if(!els.practiceFullReviewList)return;
    els.practiceFullReviewList.innerHTML='';
    state.session.forEach((item,idx)=>{
      const status=item.hadWrong?'wrong':'correct';
      const card=document.createElement('article');
      card.className=`exam-review-card ${status}`;
      card.id=`practice-review-${idx+1}`;

      const top=document.createElement('div');
      top.className='exam-review-meta';
      const meta=document.createElement('span');
      const metaParts=[`${idx+1}번`];
      if(item.q.year)metaParts.push(`${item.q.year}년`);
      if(item.q.paper)metaParts.push(item.q.paper);
      if(item.q.question_number)metaParts.push(`원문 ${item.q.question_number}번`);
      meta.textContent=metaParts.join(' · ');

      const badge=document.createElement('strong');
      badge.className=`exam-review-status ${status}`;
      badge.textContent=status==='correct'?'정답':'오답';
      top.append(meta,badge);

      const question=document.createElement('div');
      question.className='exam-review-question';
      renderQuestionContentTo(question,item.q);

      const list=document.createElement('div');
      list.className='exam-review-choices';

      const attempts=Array.isArray(item.answerHistory)&&item.answerHistory.length
        ? item.answerHistory.map(Number)
        : (item.selected==null?[]:[Number(item.selected)]);

      item.shuffledChoices.forEach((choice,cidx)=>{
        const n=cidx+1;
        const isAnswer=item.correctDisplayIndices.includes(n);
        const wasChosen=attempts.includes(n);
        const wasWrongChosen=wasChosen&&!isAnswer;

        const row=document.createElement('div');
        row.className='exam-review-choice';
        if(isAnswer)row.classList.add('correct-answer');
        if(wasWrongChosen)row.classList.add('my-wrong-answer');

        const num=document.createElement('span');
        num.className='exam-review-choice-number';
        num.textContent=choiceLabel(n);

        const content=document.createElement('span');
        content.className='exam-review-choice-text';
        if(choice.image){
          const img=document.createElement('img');
          img.className='choice-image practice-review-choice-image';
          img.src=choice.image;
          img.alt='';
          content.appendChild(img);
        }
        if(choice.text){
          const text=document.createElement('span');
          text.textContent=choice.text;
          content.appendChild(text);
        }

        const marks=document.createElement('span');
        marks.className='exam-review-choice-marks';
        if(wasWrongChosen){
          const mine=document.createElement('em');
          mine.textContent='내 오답';
          mine.className='mark-wrong';
          marks.appendChild(mine);
        }
        if(isAnswer){
          const answer=document.createElement('em');
          answer.textContent=wasChosen?'내 답 · 정답':'정답';
          answer.className='mark-answer';
          marks.appendChild(answer);
        }

        row.append(num,content,marks);
        list.appendChild(row);
      });

      card.append(top,question,list);

      if(item.q.explanation){
        const explanation=document.createElement('div');
        explanation.className='exam-review-explanation';
        explanation.textContent=item.q.explanation;
        card.appendChild(explanation);
      }

      els.practiceFullReviewList.appendChild(card);
    });
  }

  function setPracticeFullReview(open){
    if(!els.practiceFullReview||!els.practiceFullReviewBtn)return;
    if(open&&els.practiceFullReviewList&&!els.practiceFullReviewList.children.length)renderPracticeFullReview();
    els.practiceFullReview.classList.toggle('hidden',!open);
    els.practiceFullReviewBtn.textContent=open?'결과닫기':'결과보기';
    els.practiceResultActions?.classList.toggle('practice-review-sticky',open);

    if(open){
      els.restartBtn.textContent=state.sessionKind==='examReview'?'오답다시풀기':'다시풀기';
      els.changeSubjectBtn.textContent=state.sessionKind==='examReview'?'메인':'과목바꾸기';
    }else if(state.sessionKind==='examReview'){
      els.restartBtn.textContent='시험 오답 다시 풀기';
      els.changeSubjectBtn.textContent='메인으로';
    }else{
      els.restartBtn.textContent='같은 과목 다시 풀기';
      els.changeSubjectBtn.textContent='과목 바꾸기';
    }
  }

  function togglePracticeFullReview(){
    setPracticeFullReview(els.practiceFullReview.classList.contains('hidden'));
  }

  function showResult(){state.reviewMode=false;showView('result');if(els.practiceFullReviewList)els.practiceFullReviewList.innerHTML='';setPracticeFullReview(false);const correctCount=state.session.filter(i=>!i.hadWrong).length;const wrongCount=state.session.length-correctCount;els.resultSubject.textContent=state.subject||'';els.resultScore.textContent=`정답 ${correctCount} / ${state.session.length}`;els.resultGrid.innerHTML='';state.session.forEach((item,idx)=>{const btn=document.createElement('button');btn.type='button';btn.className=`result-number ${item.hadWrong?'wrong':'correct'}`;btn.textContent=String(idx+1);if(item.hadWrong)btn.addEventListener('click',()=>startReview(idx));else btn.disabled=true;els.resultGrid.appendChild(btn);});els.resultHint.textContent=wrongCount?'빨간 문제 번호를 누르면 그 문제를 다시 풀 수 있어.':'전부 정답이야.';if(state.sessionKind==='examReview'){els.restartBtn.textContent='시험 오답 다시 풀기';els.changeSubjectBtn.textContent='메인으로';}else{els.restartBtn.textContent='같은 과목 다시 풀기';els.changeSubjectBtn.textContent='과목 바꾸기';}}
  function startReview(index){state.reviewMode=true;state.reviewTargetIndex=index;state.index=index;const old=state.session[index];const fresh=buildSessionItem(old.q);fresh.hadWrong=true;state.session[index]=fresh;showView('quiz');renderQuestion();}

  const EXAM_HISTORY_KEY = 'gichulQuizExamHistoryV1';

  function loadExamHistory(){
    try {
      const raw=localStorage.getItem(EXAM_HISTORY_KEY);
      const parsed=raw?JSON.parse(raw):[];
      return Array.isArray(parsed)?parsed:[];
    } catch { return []; }
  }

  function saveExamHistoryRecords(records){
    try { localStorage.setItem(EXAM_HISTORY_KEY,JSON.stringify(records)); return true; }
    catch { return false; }
  }

  function saveCurrentExamHistory(){
    const config=EXAM_CONFIGS[state.exam.type],r=state.exam.result;
    if(!config||!r)return;
    const record={
      schemaVersion:2,
      id:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
      timestamp:new Date().toISOString(),
      year:state.exam.year,
      type:state.exam.type,
      label:config.label,
      total:config.total,
      correct:r.correct,
      unanswered:r.unanswered,
      average:Number(r.average.toFixed(1)),
      groups:r.groups.map(g=>({label:g.label,score:Number(g.score.toFixed(1)),correct:g.correct,total:g.total})),
      finishReason:state.exam.finishReason,
      items:state.exam.items.map(item=>({
        q:JSON.parse(JSON.stringify(item.q)),
        selected:item.selected==null?null:Number(item.selected),
        shuffledChoices:(item.shuffledChoices||[]).map(choice=>({
          text:choice.text||'',
          image:choice.image||'',
          originalIndex:Number(choice.originalIndex)
        })),
        correctDisplayIndices:(item.correctDisplayIndices||[]).map(Number)
      }))
    };
    const records=loadExamHistory();
    records.unshift(record);
    if(!saveExamHistoryRecords(records)){
      alert('시험 결과는 표시했지만 상세 시험기록을 저장하지 못했어. 브라우저 저장공간을 확인해줘.');
    }
  }

  function formatExamHistoryDate(value){
    const d=new Date(value);
    if(Number.isNaN(d.getTime()))return '';
    return d.toLocaleString('ko-KR',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});
  }

  function openSavedExamResult(record){
    if(!record||Number(record.schemaVersion)<2||!Array.isArray(record.items)||!record.items.length){
      alert('이 기록은 이전 버전에서 저장돼서 문제별 상세 결과가 없어.');
      return;
    }
    const config=EXAM_CONFIGS[record.type];
    if(!config){
      alert('이 시험 유형을 현재 버전에서 찾지 못했어.');
      return;
    }
    stopExamTimer();
    const restoredItems=record.items.map(saved=>({
      q:JSON.parse(JSON.stringify(saved.q||{})),
      selected:saved.selected==null?null:Number(saved.selected),
      shuffledChoices:(Array.isArray(saved.shuffledChoices)?saved.shuffledChoices:[]).map(choice=>({
        text:choice.text||'',
        image:choice.image||'',
        originalIndex:Number(choice.originalIndex)
      })),
      correctDisplayIndices:(Array.isArray(saved.correctDisplayIndices)?saved.correctDisplayIndices:[]).map(Number)
    }));
    if(restoredItems.some(item=>!item.q||!item.q.subject||!item.shuffledChoices.length)){
      alert('이 시험기록의 상세 데이터가 손상돼 있어.');
      return;
    }
    state.exam={
      type:record.type,
      year:Number(record.year),
      items:restoredItems,
      index:0,
      endTime:0,
      timerId:null,
      finished:true,
      result:null,
      finishReason:record.finishReason||'submitted',
      restoredFromHistory:true,
      historyRecordId:record.id
    };
    state.exam.result=calculateExamResult();
    renderExamResult();
    showView('examResult');
  }

  function renderExamHistory(){
    if(!els.examHistoryList||!els.clearExamHistoryBtn)return;
    const records=loadExamHistory();
    els.examHistoryList.innerHTML='';
    els.clearExamHistoryBtn.disabled=records.length===0;
    if(!records.length){
      const empty=document.createElement('div');
      empty.className='exam-history-empty';
      empty.textContent='아직 저장된 시험기록이 없어.';
      els.examHistoryList.appendChild(empty);
      return;
    }
    records.forEach(record=>{
      const row=document.createElement('button');
      row.type='button';
      row.className='exam-history-row';
      row.title=Number(record.schemaVersion)>=2?'이 시험 결과 보기':'이전 버전 기록';
      const when=document.createElement('div');
      when.className='exam-history-date';
      when.textContent=formatExamHistoryDate(record.timestamp);
      const exam=document.createElement('div');
      exam.className='exam-history-exam';
      const examTitle=document.createElement('strong');
      examTitle.textContent=`${record.year}년 · ${record.label||'시험'}`;
      const examMeta=document.createElement('span');
      examMeta.textContent=`${Number(record.correct)||0} / ${Number(record.total)||0} 정답${Number(record.unanswered)?` · 미응답 ${Number(record.unanswered)}`:''}`;
      exam.append(examTitle,examMeta);
      const scores=document.createElement('div');
      scores.className='exam-history-scores';
      (Array.isArray(record.groups)?record.groups:[]).forEach(g=>{
        const score=document.createElement('span');
        score.textContent=`${g.label} ${Number(g.score).toFixed(1)}점`;
        scores.appendChild(score);
      });
      const avg=document.createElement('strong');
      avg.className='exam-history-average';
      avg.textContent=`평균 ${Number(record.average||0).toFixed(1)}점`;
      scores.appendChild(avg);
      row.append(when,exam,scores);
      row.addEventListener('click',()=>openSavedExamResult(record));
      els.examHistoryList.appendChild(row);
    });
  }

  function clearExamHistory(){
    if(!loadExamHistory().length)return;
    if(!confirm('저장된 시험기록을 전부 삭제할까?\n삭제한 기록은 복구할 수 없어.'))return;
    try { localStorage.removeItem(EXAM_HISTORY_KEY); } catch {}
    renderExamHistory();
  }

  function getExamYears(config){
    let common=null;
    for(const subject of config.subjects){const entry=manifest.find(x=>x.name===subject);const years=new Set((entry?.years||[]).map(Number));common=common===null?years:new Set([...common].filter(y=>years.has(y)));}
    return [...(common||[])].sort((a,b)=>b-a);
  }
  function openExamSetup(){stopExamTimer();renderExamSetup();showView('examSetup');}
  function renderExamSetup(){
    const allYears=[...new Set(Object.values(EXAM_CONFIGS).flatMap(getExamYears))].sort((a,b)=>b-a);
    els.examYearSelect.innerHTML='<option value="random">랜덤</option>'+allYears.map(y=>`<option value="${y}">${y}년</option>`).join('');
    els.examTypeGrid.innerHTML='';
    Object.values(EXAM_CONFIGS).forEach(config=>{const btn=document.createElement('button');btn.type='button';btn.className='exam-type-card';btn.innerHTML=`<strong>${config.label}</strong><span>${config.total}문제 · ${Math.round(config.duration/60)}분</span><small>${config.subjects.join(' + ')}</small>`;btn.addEventListener('click',async()=>{btn.disabled=true;const old=btn.innerHTML;btn.innerHTML='<strong>불러오는 중...</strong>';try{await startExam(config.key,els.examYearSelect.value);}catch(err){alert(`시험을 시작하지 못했어.\n\n${err.message}`);btn.disabled=false;btn.innerHTML=old;}});els.examTypeGrid.appendChild(btn);});
    renderExamHistory();
  }

  function buildExamItem(q){
    const count=Math.max(q.choices?.length||0,q.choice_images?.length||0);
    const tagged=Array.from({length:count},(_,i)=>({
      text:q.choices?.[i]||'',
      image:q.choice_images?.[i]||'',
      originalIndex:i+1
    }));
    const shuffledChoices=shuffle(tagged);
    const originalAnswers=(Array.isArray(q.answer)?q.answer:[q.answer]).map(Number);
    const correctDisplayIndices=shuffledChoices
      .map((choice,idx)=>originalAnswers.includes(choice.originalIndex)?idx+1:null)
      .filter(Boolean);
    return {q,selected:null,shuffledChoices,correctDisplayIndices};
  }

  async function startExam(type,yearValue='random'){
    stopExamTimer(); const config=EXAM_CONFIGS[type]; if(!config)throw new Error('시험 설정을 찾지 못했어.');
    const years=getExamYears(config); if(!years.length)throw new Error('공통 기출 연도가 없어.');
    const year=yearValue==='random'?years[Math.floor(Math.random()*years.length)]:Number(yearValue); if(!years.includes(year))throw new Error(`${year}년 시험 데이터가 완전하지 않아.`);
    const banks=await Promise.all(config.subjects.map(loadSubjectBank));
    const items=[];
    for(let i=0;i<config.subjects.length;i++){
      const subject=config.subjects[i], expected=config.subjectCounts[subject];
      const qs=banks[i].filter(q=>q.year===year&&q.paper===config.paper).sort((a,b)=>a.question_number-b.question_number);
      if(qs.length!==expected)throw new Error(`${year}년 ${subject}: ${expected}문제가 필요하지만 ${qs.length}문제만 있어.`);
      qs.forEach(q=>items.push(buildExamItem(q)));
    }
    const randomizedItems=shuffle(items);
    state.exam={type,year,items:randomizedItems,index:0,endTime:Date.now()+config.duration*1000,timerId:null,finished:false,result:null,finishReason:null};
    showView('examQuiz');renderExamQuestion();startExamTimer();
  }

  function renderExamQuestionIndex(){
    if(!els.examQuestionIndex)return;
    els.examQuestionIndex.innerHTML='';
    state.exam.items.forEach((examItem,idx)=>{
      const btn=document.createElement('button');
      btn.type='button';
      const answered=examItem.selected!=null;
      const current=idx===state.exam.index;
      btn.className=`exam-index-btn ${answered?'answered':'unanswered'}${current?' current':''}`;
      btn.textContent=String(idx+1);
      btn.setAttribute('aria-label',`${idx+1}번 문제${answered?' 답변 완료':' 미응답'}${current?' 현재 문제':''}`);
      if(current)btn.setAttribute('aria-current','true');
      btn.addEventListener('click',()=>{state.exam.index=idx;renderExamQuestion();});
      els.examQuestionIndex.appendChild(btn);
    });
  }

  function renderExamQuestion(){
    const config=EXAM_CONFIGS[state.exam.type], item=state.exam.items[state.exam.index]; if(!config||!item)return;
    const no=state.exam.index+1;
    els.examRunningTitle.textContent=`${state.exam.year}년 · ${config.label}`; els.examRunningProgress.textContent=`${no} / ${state.exam.items.length}`; els.examProgressFill.style.width=`${(no/state.exam.items.length)*100}%`;
    els.examQuestionNumber.textContent=`문제 ${no} · 원문 ${item.q.question_number}번`;
    renderQuestionContentTo(els.examQuestionText,item.q); els.examAnswerForm.innerHTML='';
    item.shuffledChoices.forEach((choice,idx)=>{const label=document.createElement('label');label.className=`choice${choice.image?' has-image':''}`;const input=document.createElement('input');input.type='radio';input.name='examAnswer';input.value=String(idx+1);input.checked=item.selected===idx+1;input.addEventListener('change',()=>{item.selected=idx+1;renderExamQuestionIndex();});const index=document.createElement('span');index.className='choice-index';index.textContent=choiceLabel(idx+1);const content=document.createElement('span');content.className='choice-content';if(choice.image){const img=document.createElement('img');img.className='choice-image';img.src=choice.image;content.appendChild(img);}if(choice.text){const text=document.createElement('span');text.className='choice-text';text.textContent=choice.text;content.appendChild(text);}label.append(input,index,content);els.examAnswerForm.appendChild(label);});
    els.examNextBtn.textContent=state.exam.index===state.exam.items.length-1?'시험 제출':'다음 문제';
    renderExamQuestionIndex();
    scrollQuestionToTop();
  }
  function goExamNext(){
    if(state.exam.index<state.exam.items.length-1){state.exam.index++;renderExamQuestion();return;}
    const unanswered=state.exam.items.filter(x=>x.selected==null).length;
    if(unanswered>0&&!confirm(`미응답 ${unanswered}문제가 있어. 이대로 제출할까?\n미응답은 오답 처리돼.`))return;
    finishExam(false);
  }
  function formatTime(seconds){seconds=Math.max(0,Math.ceil(seconds));const h=Math.floor(seconds/3600),m=Math.floor((seconds%3600)/60),s=seconds%60;return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}
  function updateExamTimer(){if(!state.exam.endTime)return;const left=(state.exam.endTime-Date.now())/1000;els.examTimer.textContent=formatTime(left);els.examTimer.classList.toggle('danger',left<=300);if(left<=0)finishExam(true);}
  function startExamTimer(){stopExamTimer();updateExamTimer();state.exam.timerId=setInterval(updateExamTimer,250);}
  function stopExamTimer(){if(state.exam?.timerId){clearInterval(state.exam.timerId);state.exam.timerId=null;}}
  function isCorrectExamItem(item){
    if(item.selected==null)return false;
    return item.correctDisplayIndices.includes(Number(item.selected));
  }

  function examCorrectAnswers(item){
    return [...item.correctDisplayIndices];
  }

  function renderExamFullReview(){
    if(!els.examFullReviewList)return;
    els.examFullReviewList.innerHTML='';
    state.exam.items.forEach((item,idx)=>{
      const correctAnswers=examCorrectAnswers(item);
      const status=item.selected==null?'unanswered':(isCorrectExamItem(item)?'correct':'wrong');
      const card=document.createElement('article');
      card.className=`exam-review-card ${status}`;
      card.id=`exam-review-${idx+1}`;

      const top=document.createElement('div');
      top.className='exam-review-meta';
      const meta=document.createElement('span');
      meta.textContent=`${idx+1}번 · 원문 ${item.q.question_number}번 · ${item.q.subject}`;
      const badge=document.createElement('strong');
      badge.className=`exam-review-status ${status}`;
      badge.textContent=status==='correct'?'정답':(status==='wrong'?'오답':'미응답');
      top.append(meta,badge);

      const title=document.createElement('h3');
      title.className='exam-review-question';
      title.textContent=item.q.question;

      const list=document.createElement('div');
      list.className='exam-review-choices';
      item.shuffledChoices.forEach((choice,cidx)=>{
        const n=cidx+1;
        const isAnswer=correctAnswers.includes(n);
        const isMine=item.selected===n;
        const row=document.createElement('div');
        row.className='exam-review-choice';
        if(isAnswer)row.classList.add('correct-answer');
        if(isMine&&!isAnswer)row.classList.add('my-wrong-answer');
        if(isMine&&isAnswer)row.classList.add('my-correct-answer');

        const num=document.createElement('span');
        num.className='exam-review-choice-number';
        num.textContent=choiceLabel(n);
        const text=document.createElement('span');
        text.className='exam-review-choice-text';
        text.textContent=choice.text;
        const marks=document.createElement('span');
        marks.className='exam-review-choice-marks';
        if(isMine){const mine=document.createElement('em');mine.textContent='내 답';mine.className=isAnswer?'mark-correct':'mark-wrong';marks.appendChild(mine);}
        if(isAnswer){const answer=document.createElement('em');answer.textContent='정답';answer.className='mark-answer';marks.appendChild(answer);}
        row.append(num,text,marks);
        list.appendChild(row);
      });

      if(item.selected==null){
        const note=document.createElement('p');
        note.className='exam-review-unanswered-note';
        note.textContent='이 문제는 답을 선택하지 않았어.';
        card.append(top,title,list,note);
      }else card.append(top,title,list);

      if(item.q.explanation){
        const explanation=document.createElement('div');
        explanation.className='exam-review-explanation';
        explanation.textContent=item.q.explanation;
        card.appendChild(explanation);
      }
      els.examFullReviewList.appendChild(card);
    });
  }

  function setExamFullReview(open,scrollIndex=null){
    if(!els.examFullReview||!els.examFullReviewBtn)return;
    if(open&&els.examFullReviewList&&!els.examFullReviewList.children.length)renderExamFullReview();
    els.examFullReview.classList.toggle('hidden',!open);
    els.examFullReviewBtn.textContent=open?'전체 결과 닫기':'전체 결과 보기';
    els.examResultActions?.classList.toggle('exam-review-sticky',open);
    if(open&&scrollIndex!=null){
      requestAnimationFrame(()=>document.getElementById(`exam-review-${scrollIndex+1}`)?.scrollIntoView({behavior:'smooth',block:'start'}));
    }
  }

  function toggleExamFullReview(){setExamFullReview(els.examFullReview.classList.contains('hidden'));}

  function calculateExamResult(){
    const config=EXAM_CONFIGS[state.exam.type]; const items=state.exam.items;
    const correct=items.filter(isCorrectExamItem).length, unanswered=items.filter(x=>x.selected==null).length, wrong=items.length-correct;
    const groups=config.scoreGroups.map(group=>{const groupItems=items.filter(x=>group.subjects.includes(x.q.subject));const c=groupItems.filter(isCorrectExamItem).length;return {label:group.label,total:groupItems.length,correct:c,score:groupItems.length?(c/groupItems.length*100):0};});
    const average=groups.reduce((s,g)=>s+g.score,0)/groups.length;
    const passBySession=groups.every(g=>g.score>=40)&&average>=60;
    return {correct,wrong,unanswered,groups,average,passBySession,wrongItems:items.filter(x=>!isCorrectExamItem(x))};
  }

  function finishExam(timeout=false){
    if(state.exam.finished)return;state.exam.finished=true;state.exam.finishReason=timeout?'timeout':'submitted';stopExamTimer();state.exam.result=calculateExamResult();saveCurrentExamHistory();renderExamResult();showView('examResult');
  }

  function renderExamResult(){
    const config=EXAM_CONFIGS[state.exam.type],r=state.exam.result;if(!config||!r)return;
    els.examResultMeta.textContent=`${state.exam.year}년 · ${config.label}`;
    els.examResultHeadline.textContent=state.exam.finishReason==='timeout'?'시간 종료':'시험 결과';
    els.examResultScore.textContent=`정답 ${r.correct} / ${config.total} · 미응답 ${r.unanswered} · 평균 ${r.average.toFixed(1)}점`;
    els.examScoreCards.innerHTML='';
    r.groups.forEach(g=>{const passed=g.score>=40;const card=document.createElement('div');card.className=`exam-score-card ${passed?'safe':'fail'}`;card.innerHTML=`<span>${escapeHtml(g.label)}</span><div class="exam-score-value-row"><strong>${g.score.toFixed(1)}점</strong><b class="exam-score-status ${passed?'pass':'fail'}">${passed?'합격':'과락'}</b></div><small>${g.correct} / ${g.total} 정답 · 문항당 ${(100/g.total).toFixed(1)}점 · 합격점수 40점</small>`;els.examScoreCards.appendChild(card);});
    if(els.examFullReviewList)els.examFullReviewList.innerHTML='';
    setExamFullReview(false);
    els.examResultGrid.innerHTML='';
    state.exam.items.forEach((item,idx)=>{const btn=document.createElement('button');btn.type='button';const status=item.selected==null?'unanswered':(isCorrectExamItem(item)?'correct':'wrong');btn.className=`result-number ${status}`;btn.textContent=String(idx+1);btn.setAttribute('aria-label',`${idx+1}번 ${status==='correct'?'정답':status==='wrong'?'오답':'미응답'} · 결과 보기`);btn.addEventListener('click',()=>setExamFullReview(true,idx));els.examResultGrid.appendChild(btn);});
    els.examResultNote.textContent='';
    els.examResultNote.classList.add('hidden');
    els.examWrongReviewBtn.disabled=r.wrongItems.length===0;els.examWrongReviewBtn.textContent=r.wrongItems.length?`틀린문제풀기 (${r.wrongItems.length})`:'틀린 문제 없음';
  }

  function startExamWrongReview(){
    const r=state.exam.result;if(!r||!r.wrongItems.length)return;
    state.subject=`${state.exam.year}년 ${EXAM_CONFIGS[state.exam.type].label} 오답 복습`;
    state.session=r.wrongItems.map(x=>buildSessionItem(x.q));state.sessionKind='examReview';state.index=0;state.reviewMode=false;showView('quiz');renderQuestion();
  }
  function restartPractice(){if(state.sessionKind==='examReview'){startExamWrongReview();return;}if(state.subject)startSubject(state.subject,state.practiceSize||20);}
  function resetToHome(){stopExamTimer();state.subject=null;state.bank=[];state.session=[];state.sessionKind='practice';state.browseSubject=null;state.browseBank=[];state.summaryCode=null;state.summaryData=null;renderHome();showView('home');}
  function handleHome(){if(!views.examQuiz.classList.contains('hidden')&&!state.exam.finished){if(!confirm('진행 중인 시험을 종료하고 메인으로 갈까?'))return;}resetToHome();}

  els.bankStartQuizBtn.addEventListener('click',()=>{if(state.browseSubject)startSubject(state.browseSubject,20);});
  els.bankFloatQuizBtn?.addEventListener('click',()=>{if(state.browseSubject)startSubject(state.browseSubject,20);});
  els.bankFloatHomeBtn?.addEventListener('click',resetToHome);
  els.bankFloatTopBtn?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  window.addEventListener('scroll',updateBankFloatActions,{passive:true});
  els.nextBtn.addEventListener('click',nextQuestion); els.backToResultBtn.addEventListener('click',showResult); els.practiceFullReviewBtn?.addEventListener('click',togglePracticeFullReview); els.practiceStickyCloseBtn?.addEventListener('click',()=>setPracticeFullReview(false)); els.practiceScrollTopBtn?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'})); els.restartBtn.addEventListener('click',restartPractice); els.changeSubjectBtn.addEventListener('click',resetToHome); els.homeBtn.addEventListener('click',handleHome);
  els.summarySearch?.addEventListener('input',()=>applySummarySearch(els.summarySearch.value));
  els.summaryTocSelect?.addEventListener('change',()=>{
    const id=els.summaryTocSelect.value;
    if(!id)return;
    const target=document.getElementById(id);
    if(target){
      target.classList.remove('hidden');
      target.open=true;
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
    els.summaryTocSelect.value='';
  });
  els.summaryFloatHomeBtn?.addEventListener('click',resetToHome);
  els.summaryFloatTopBtn?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  window.addEventListener('scroll',updateSummaryFloatActions,{passive:true});
  els.examEntryBtn.addEventListener('click',openExamSetup); els.examNextBtn.addEventListener('click',goExamNext); els.examFullReviewBtn.addEventListener('click',toggleExamFullReview); els.examWrongReviewBtn.addEventListener('click',startExamWrongReview); els.examAgainBtn.addEventListener('click',()=>startExam(state.exam.type,String(state.exam.year))); els.examStickyCloseBtn?.addEventListener('click',()=>setExamFullReview(false)); els.examHomeBtn.addEventListener('click',openExamSetup); els.examScrollTopBtn?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'})); els.clearExamHistoryBtn?.addEventListener('click',clearExamHistory);

  readingSizeButtons.forEach(btn => {
    btn.addEventListener('click', () => applyReadingSize(btn.dataset.readingSize));
  });
  applyReadingSize(loadReadingSize(), false);

  if(!manifest.length){alert('과목 manifest를 읽지 못했어. data/manifest.js 파일을 확인해줘.');return;}
  renderHome();showView('home');
})();
