(() => {
  const bank=window.CORE_WORD_CARD_BANK;
  if(!bank || !Array.isArray(bank.cards)) return;

  const THEME_KEY='gichulQuizTheme';
  const IMPORTANT_KEY='gichulCoreWordImportant';
  const MEMORIZED_KEY='gichulCoreWordMemorized';
  const $=id=>document.getElementById(id);

  const els={
    subjectPicker:$('subjectPicker'), subjectButton:$('subjectButton'), subjectText:$('subjectButtonText'), subjectMenu:$('subjectMenu'),
    search:$('cardSearch'), searchField:$('searchField'), searchPanel:$('searchPanel'),
    searchCategorySection:$('searchCategorySection'), searchSuggestSection:$('searchSuggestSection'),
    searchCategoryList:$('searchCategoryList'), searchSuggestions:$('searchSuggestions'),
    grid:$('cardGrid'), prev:$('prevBtn'), next:$('nextBtn'), range:$('rangeText'), fill:$('progressFill'),
    dots:$('mobileDots'), heroCount:$('heroCount'), importantCount:$('importantCount'), memorizedCount:$('memorizedCount'),
    importantStatBtn:$('importantStatBtn'), memorizedStatBtn:$('memorizedStatBtn'), registeredStatBtn:$('registeredStatBtn'),
    randomOrderBtn:$('randomOrderBtn'), easyOrderBtn:$('easyOrderBtn'), hardOrderBtn:$('hardOrderBtn'),
    statusText:$('statusText'), theme:$('themeToggleBtn')
  };

  const state={
    subject:'real_estate_intro', category:'all', query:'', status:'all', orderMode:'easy', offset:0, suggestionIndex:-1,
    important:new Set(), memorized:new Set(), randomRanks:new Map()
  };

  function loadSet(key){
    try{
      const value=JSON.parse(localStorage.getItem(key)||'[]');
      return new Set(Array.isArray(value)?value:[]);
    }catch{return new Set()}
  }
  function saveSet(key,set){
    try{localStorage.setItem(key,JSON.stringify([...set]))}catch{}
  }
  state.important=loadSet(IMPORTANT_KEY);
  state.memorized=loadSet(MEMORIZED_KEY);

  function systemTheme(){
    return matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  }
  function loadTheme(){
    try{
      const t=localStorage.getItem(THEME_KEY);
      return t==='dark'||t==='light'?t:systemTheme();
    }catch{return systemTheme()}
  }
  function applyTheme(theme,persist=false){
    const next=theme==='dark'?'dark':'light';
    document.documentElement.dataset.theme=next;
    document.documentElement.style.colorScheme=next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',next==='dark'?'#080d18':'#f5f7fb');
    const dark=next==='dark';
    els.theme?.setAttribute('aria-pressed',dark?'true':'false');
    els.theme?.setAttribute('aria-label',dark?'라이트모드 켜기':'다크모드 켜기');
    if(els.theme) els.theme.title=dark?'라이트모드 켜기':'다크모드 켜기';
    if(persist){
      try{localStorage.setItem(THEME_KEY,next)}catch{}
    }
  }
  els.theme?.addEventListener('click',()=>{
    applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark',true);
  });
  applyTheme(loadTheme());
  try{
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change',e=>{
      if(!localStorage.getItem(THEME_KEY)) applyTheme(e.matches?'dark':'light');
    });
  }catch{}

  function reshuffleRandom(){
    const cards=bank.cards.filter(card=>card.subject===state.subject);
    const shuffled=[...cards];
    for(let i=shuffled.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
    }
    state.randomRanks=new Map(shuffled.map((card,index)=>[card.id,index]));
  }

  function setOrderMode(mode,{reshuffle=false}={}){
    if(!['random','easy','hard'].includes(mode)) return;
    state.orderMode=mode;
    if(mode==='random'&&(reshuffle||state.randomRanks.size===0)) reshuffleRandom();
    state.offset=0;
    updateOrderButtons();
    render();
  }

  function updateOrderButtons(){
    const pairs=[
      [els.randomOrderBtn,'random'],
      [els.easyOrderBtn,'easy'],
      [els.hardOrderBtn,'hard']
    ];
    pairs.forEach(([btn,mode])=>{
      if(!btn) return;
      const active=state.orderMode===mode;
      btn.classList.toggle('active',active);
      btn.setAttribute('aria-pressed',active?'true':'false');
    });
  }

  function visibleCount(){
    const w=window.innerWidth;
    if(w>=1280) return 3;
    if(w>=980) return 2;
    return 1;
  }

  function filtered(){
    const q=state.query.trim().toLocaleLowerCase('ko');
    const list=bank.cards.filter(card=>{
      if(card.subject!==state.subject) return false;
      if(state.category!=='all' && card.category!==state.category) return false;
      if(state.status==='important' && !state.important.has(card.id)) return false;
      if(state.status==='memorized' && !state.memorized.has(card.id)) return false;
      if(!q) return true;
      const hay=[card.title,card.subtitle,card.category,card.formula].concat(card.aliases||[],card.bullets||[]).join(' ').toLocaleLowerCase('ko');
      return hay.includes(q);
    });

    if(state.orderMode==='hard') return list.sort((a,b)=>b.order-a.order);
    if(state.orderMode==='random'){
      if(state.randomRanks.size===0) reshuffleRandom();
      return list.sort((a,b)=>(state.randomRanks.get(a.id)??Number.MAX_SAFE_INTEGER)-(state.randomRanks.get(b.id)??Number.MAX_SAFE_INTEGER));
    }
    return list.sort((a,b)=>a.order-b.order);
  }

  function currentSubject(){
    return bank.subjects.find(item=>item.code===state.subject)||bank.subjects.find(item=>!item.disabled)||bank.subjects[0];
  }

  function closeSubjectMenu({restoreFocus=false}={}){
    if(!els.subjectMenu || !els.subjectButton) return;
    els.subjectMenu.hidden=true;
    els.subjectButton.setAttribute('aria-expanded','false');
    els.subjectPicker?.classList.remove('open');
    if(restoreFocus) els.subjectButton.focus();
  }

  function openSubjectMenu({focusSelected=false}={}){
    if(!els.subjectMenu || !els.subjectButton) return;
    els.subjectMenu.hidden=false;
    els.subjectButton.setAttribute('aria-expanded','true');
    els.subjectPicker?.classList.add('open');
    if(focusSelected){
      const enabled=[...els.subjectMenu.querySelectorAll('.subject-option:not(.disabled)')];
      const selected=Math.max(0,enabled.findIndex(btn=>btn.dataset.code===state.subject));
      enabled[selected]?.focus();
    }
  }

  function setSubject(code){
    const item=bank.subjects.find(subject=>subject.code===code);
    if(!item || item.disabled || code===state.subject){
      closeSubjectMenu({restoreFocus:true});
      return;
    }
    state.subject=code;
    state.category='all';
    state.query='';
    state.offset=0;
    els.search.value='';
    if(state.orderMode==='random') reshuffleRandom();
    renderSubjects();
    renderSearchPicker();
    render();
    closeSubjectMenu({restoreFocus:true});
  }

  function subjectStatsFor(code){
    const allSubjectCards=bank.cards.filter(card=>card.subject===code);
    return {
      total:allSubjectCards.length,
      important:allSubjectCards.filter(card=>state.important.has(card.id)).length,
      memorized:allSubjectCards.filter(card=>state.memorized.has(card.id)).length
    };
  }

  function makeSubjectCountsLabel(stats){
    const summary=document.createElement('span');
    summary.className='subject-option-counts';
    summary.setAttribute('aria-label','중요 '+stats.important+'장, 외움 '+stats.memorized+'장, 전체 '+stats.total+'장');
    const add=(className,content)=>{
      const span=document.createElement('span');
      span.className=className;
      span.textContent=content;
      summary.appendChild(span);
    };
    add('subject-option-count-important','☆ '+stats.important+'장');
    add('subject-option-count-separator',' | ');
    add('subject-option-count-memorized','✓ '+stats.memorized+'장');
    add('subject-option-count-separator',' | ');
    add('subject-option-count-total','총 '+stats.total+'장');
    return summary;
  }

  function refreshSubjectMenuCounts(){
    if(!els.subjectMenu) return;
    els.subjectMenu.querySelectorAll('.subject-option').forEach(btn=>{
      const current=btn.querySelector('.subject-option-counts');
      if(!current) return;
      current.replaceWith(makeSubjectCountsLabel(subjectStatsFor(btn.dataset.code)));
    });
  }

  function renderSubjects(){
    els.subjectMenu.innerHTML='';
    bank.subjects.forEach(item=>{
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='subject-option'+(item.code===state.subject?' active':'')+(item.disabled?' disabled':'');
      btn.dataset.code=item.code;
      btn.setAttribute('role','option');
      btn.setAttribute('aria-selected',item.code===state.subject?'true':'false');
      btn.setAttribute('aria-disabled',item.disabled?'true':'false');

      const name=document.createElement('span');
      name.className='subject-option-name';
      name.textContent=item.name;
      btn.append(name,makeSubjectCountsLabel(subjectStatsFor(item.code)));

      if(item.disabled){
        const status=document.createElement('span');
        status.className='subject-option-status';
        status.textContent='준비 중';
        btn.appendChild(status);
      }

      btn.addEventListener('click',()=>{
        if(item.disabled) return;
        setSubject(item.code);
      });
      els.subjectMenu.appendChild(btn);
    });
    const item=currentSubject();
    els.subjectText.textContent=item?.name||'과목 선택';
  }

  function subjectCards(){
    return bank.cards.filter(card=>card.subject===state.subject);
  }

  function categoryNames(){
    return ['all'].concat([...new Set(subjectCards().map(card=>card.category))]);
  }

  function openSearchPanel(){
    els.searchPanel.hidden=false;
    els.search.setAttribute('aria-expanded','true');
    state.suggestionIndex=-1;
    renderSearchPicker();
  }

  function closeSearchPanel(){
    els.searchPanel.hidden=true;
    els.search.setAttribute('aria-expanded','false');
    state.suggestionIndex=-1;
  }

  function renderSearchCategories(){
    els.searchCategoryList.innerHTML='';
    categoryNames().forEach(category=>{
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='search-category-chip'+(category===state.category?' active':'');
      btn.textContent=category==='all'?'전체':category;
      btn.setAttribute('aria-pressed',category===state.category?'true':'false');
      btn.addEventListener('click',()=>{
        state.category=category;
        state.query='';
        state.offset=0;
        els.search.value='';
        renderSearchCategories();
        renderSearchSuggestions();
        render();
        closeSearchPanel();
      });
      els.searchCategoryList.appendChild(btn);
    });
  }

  function suggestionCards(){
    const q=state.query.trim().toLocaleLowerCase('ko');
    const cards=subjectCards();
    if(!q) return cards.slice(0,12);
    return cards
      .map(card=>{
        const title=card.title.toLocaleLowerCase('ko');
        const category=card.category.toLocaleLowerCase('ko');
        const subtitle=(card.subtitle||'').toLocaleLowerCase('ko');
        const aliases=(card.aliases||[]).join(' ').toLocaleLowerCase('ko');
        const body=(card.bullets||[]).join(' ').toLocaleLowerCase('ko');
        let score=99;
        if(title===q) score=0;
        else if(title.startsWith(q)) score=1;
        else if(title.includes(q)) score=2;
        else if(aliases.includes(q)) score=3;
        else if(category.includes(q)) score=4;
        else if(subtitle.includes(q)) score=5;
        else if(body.includes(q)) score=6;
        return {card,score};
      })
      .filter(item=>item.score<99)
      .sort((a,b)=>a.score-b.score||a.card.order-b.card.order)
      .slice(0,12)
      .map(item=>item.card);
  }

  function activateSuggestion(index){
    const buttons=[...els.searchSuggestions.querySelectorAll('.search-suggestion')];
    if(!buttons.length){state.suggestionIndex=-1;return}
    state.suggestionIndex=Math.max(0,Math.min(index,buttons.length-1));
    buttons.forEach((btn,i)=>{
      const active=i===state.suggestionIndex;
      btn.classList.toggle('active',active);
      btn.setAttribute('aria-selected',active?'true':'false');
    });
    buttons[state.suggestionIndex]?.scrollIntoView({block:'nearest'});
  }

  function chooseSuggestion(card){
    state.category='all';
    state.query=card.title;
    state.offset=0;
    els.search.value=card.title;
    renderSearchCategories();
    render();
    closeSearchPanel();
  }

  function renderSearchSuggestions(){
    const cards=suggestionCards();
    els.searchSuggestions.innerHTML='';
    state.suggestionIndex=-1;

    if(!cards.length){
      const empty=document.createElement('p');
      empty.className='search-suggestion-empty';
      empty.textContent='일치하는 카드가 없어.';
      els.searchSuggestions.appendChild(empty);
      return;
    }

    cards.forEach(card=>{
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='search-suggestion';
      btn.setAttribute('role','option');
      btn.setAttribute('aria-selected','false');

      const icon=document.createElement('span');
      icon.className='search-suggestion-icon';
      icon.textContent='⌕';

      const text=document.createElement('span');
      text.className='search-suggestion-text';
      const title=document.createElement('strong');
      title.textContent=card.title;
      const meta=document.createElement('small');
      meta.textContent=card.category+' · '+(TYPE_LABELS[card.type]||'카드');
      text.append(title,meta);

      btn.append(icon,text);
      btn.addEventListener('pointerdown',event=>event.preventDefault());
      btn.addEventListener('click',()=>chooseSuggestion(card));
      els.searchSuggestions.appendChild(btn);
    });
  }

  function renderSearchPicker(){
    const searching=!!state.query.trim();
    els.searchCategorySection.hidden=searching;
    els.searchSuggestSection.classList.toggle('searching',searching);
    renderSearchCategories();
    renderSearchSuggestions();
    if(searching) els.searchPanel.scrollTop=0;
  }

  function addBulletList(article,card){
    const list=document.createElement('ul');
    list.className='card-bullets';
    (card.bullets||[]).forEach(text=>{
      const li=document.createElement('li');
      const span=document.createElement('span');
      span.textContent=text;
      li.appendChild(span);
      list.appendChild(li);
    });
    article.appendChild(list);
  }

  const TYPE_LABELS={term:'단어',concept:'개념',theory:'이론',graph:'그래프',formula:'수식'};

  // Reusable, source-reviewed civil-law relationship diagrams. These are schematic, not factual case rulings.
  const CIVIL_DIAGRAMS={
    civil_agency_basic:['대리의 효과','본인','대리인','상대방','본인에게 효과 귀속'],
    civil_agency_disclosure:['현명: 본인을 위한 표시','본인','대리인','상대방','알았거나 알 수 있으면 예외'],
    civil_agency_sub:['복대리인도 본인의 대리인','본인','원대리인','복대리인','원대리인의 대리인 아님'],
    civil_agency_unauthorized:['대리권 없는 계약','본인','무권대리인','상대방','추인 없으면 본인에 무효력'],
    civil_agency_apparent:['법정 요건의 대리권 외관','본인','외관·표시','제3자','선의·무과실 등 요건'],
    civil_apparent_125:['제125조: 수여표시','본인 표시','대리권 외관','제3자','알았거나 알 수 있으면 제외'],
    civil_apparent_126:['제126조: 권한 초과','기본대리권','권한 초과','상대방','정당한 이유 필요'],
    civil_apparent_129:['제129조: 권한 소멸','기존 대리권','권한 소멸','제3자','선의·무과실 보호'],
    civil_unauthorized_rights:['무권대리 계약과 선택','무권대리인','본인 추인','상대방','최고·추인 전 철회 가능']
  };
  const CIVIL_POSSESSION={
    civil_possession_simple:['간이인도','양도인','양수인','동산','이미 양수인이 직접점유','합의로 인도 효과'],
    civil_possession_revision:['점유개정','양도인','양수인','동산','양도인이 계속 직접점유','양수인은 간접점유'],
    civil_possession_claim:['반환청구권 양도','양도인','양수인','동산','반환청구권은 양수인에게','제3자가 동산 직접점유'],
    civil_possession_indirect:['간접점유','간접점유자','직접점유자','동산','임대차 등 점유매개관계','물건은 직접점유자가 지배']
  };
  const civBox=(x,y,w,label)=>`<rect class="v-civil-box" x="${x}" y="${y}" width="${w}" height="37" rx="10"/><text class="v-civil-text" x="${x+w/2}" y="${y+23}" text-anchor="middle">${label}</text>`;
  const civSvg=body=>`<svg viewBox="0 0 240 140" aria-hidden="true"><path class="v-civil-guide" d="M0 0H0"/>${body}</svg>`;
  function civilDiagramMarkup(type){
    if(type==='civil_apparent_compare'){
      const rows=[['125조','수여표시'],['126조','권한 초과'],['129조','권한 소멸']];
      return civSvg(`<text class="v-civil-heading" x="120" y="17" text-anchor="middle">표현대리 발생 원인 비교</text>`+rows.map(([n,meaning],i)=>{
        const y=29+i*35;
        return `<rect class="v-civil-box" x="13" y="${y}" width="214" height="30" rx="8"/><text class="v-civil-title" x="51" y="${y+20}" text-anchor="middle">${n}</text><path class="v-civil-sep" d="M84 ${y+5}V${y+25}"/><text class="v-civil-text" x="155" y="${y+20}" text-anchor="middle">${meaning}</text>`;
      }).join(''));
    }
    // Distinguish the claim transfer from the third party's unchanged direct possession.
    if(type==='civil_possession_claim'){
      return civSvg('<text class="v-civil-heading" x="120" y="15" text-anchor="middle">목적물반환청구권 양도</text>'
        +'<text class="v-civil-caption" x="120" y="28" text-anchor="middle">반환청구권 이전</text>'
        +civBox(4,34,78,'양도인')+civBox(158,34,78,'양수인')
        +'<path class="v-civil-dashed" d="M82 52H156"/><path class="v-civil-arrowtip" d="m150 48 6 4-6 4"/>'
        +'<text class="v-civil-caption" x="120" y="81" text-anchor="middle">제3자 직접점유 유지</text>'
        +civBox(4,85,78,'제3자')
        +'<rect class="v-civil-object" x="158" y="90" width="78" height="27" rx="7"/>'
        +'<text class="v-civil-title" x="197" y="108" text-anchor="middle">동산</text>'
        +'<path class="v-civil-line" d="M82 104H157"/>'
        +'<text class="v-civil-caption" x="120" y="135" text-anchor="middle">동산의 현실점유는 바뀌지 않음</text>');
    }
    // An unauthorized representative has no authority flowing from the principal.
    if(type==='civil_agency_unauthorized'){
      return civSvg('<text class="v-civil-heading" x="120" y="22" text-anchor="middle">무권대리 계약</text>'
        +civBox(3,44,70,'본인')+civBox(85,44,70,'무권대리인')+civBox(167,44,70,'상대방')
        +'<path class="v-civil-dashed" d="M73 63H83"/>'
        +'<path class="v-civil-line" d="M155 63H165"/>'
        +'<path class="v-civil-arrowtip" d="m161 59 4 4-4 4"/>'
        +'<text class="v-civil-caption" x="78" y="104" text-anchor="middle">대리권 없음</text>'
        +'<text class="v-civil-caption" x="120" y="126" text-anchor="middle">추인 전 본인에게 계약 효력 없음</text>');
    }
    const possession=CIVIL_POSSESSION[type];
    if(possession){
      const [heading,left,right,object,top,bottom]=possession;
      // Solid = current direct possessor; dashed = mediated/claim relationship; omitted = no current possession.
      const lines={
        civil_possession_simple:['','v-civil-line'],
        civil_possession_revision:['v-civil-line','v-civil-dashed'],
        civil_possession_indirect:['v-civil-dashed','v-civil-line']
      }[type];
      return civSvg(`<text class="v-civil-heading" x="120" y="16" text-anchor="middle">${heading}</text>`
        +civBox(4,30,75,left)+civBox(161,30,75,right)
        +`<rect class="v-civil-object" x="88" y="76" width="64" height="26" rx="7"/><text class="v-civil-title" x="120" y="94" text-anchor="middle">${object}</text>`
        +(lines[0]?`<path class="${lines[0]}" d="M42 67L95 83"/>`:'')
        +(lines[1]?`<path class="${lines[1]}" d="M198 67L145 83"/>`:'')
        +`<text class="v-civil-caption" x="120" y="119" text-anchor="middle">${top}</text><text class="v-civil-caption" x="120" y="133" text-anchor="middle">${bottom}</text>`);
    }
    // Civil-law second batch: one statutorily grounded diagram for each shared concept group.
    if(type==='civil_surface_section'){
      return civSvg('<text class="v-civil-heading" x="120" y="17" text-anchor="middle">법정지상권: 경매 전후</text>'
        +'<text class="v-civil-caption" x="60" y="32" text-anchor="middle">요건 충족 전</text>'
        +'<text class="v-civil-caption" x="182" y="32" text-anchor="middle">경매로 소유자 분리</text>'
        +civBox(8,39,101,'건물 A')+civBox(8,83,101,'토지 A')
        +civBox(132,39,100,'건물 A')+civBox(132,83,100,'토지 B')
        +'<path class="v-civil-line" d="M109 77H129"/><path class="v-civil-arrowtip" d="m125 73 4 4-4 4"/>'
        +'<text class="v-civil-caption" x="120" y="139" text-anchor="middle">제366조 및 판례상 성립요건 확인</text>');
    }
    if(type==='civil_joint_mortgage'){
      return civSvg('<text class="v-civil-heading" x="120" y="17" text-anchor="middle">공동저당: 하나의 채권, 여러 부동산</text>'
        +civBox(8,29,99,'부동산 A')+civBox(133,29,99,'부동산 B')
        +'<path class="v-civil-line" d="M58 67L93 85M182 67L147 85"/>'
        +'<rect class="v-civil-object" x="61" y="83" width="118" height="26" rx="7"/>'
        +'<text class="v-civil-title" x="120" y="100" text-anchor="middle">같은 피담보채권</text>'
        +'<text class="v-civil-caption" x="120" y="123" text-anchor="middle">동시배당: 경매대가 비례 분담</text>'
        +'<text class="v-civil-caption" x="120" y="136" text-anchor="middle">이시배당: 차순위자 대위 가능</text>');
    }
    if(type==='civil_housing_timeline'){
      return civSvg('<text class="v-civil-heading" x="120" y="16" text-anchor="middle">주택임대차: 대항력과 우선변제</text>'
        +civBox(3,28,110,'인도·주민등록')+civBox(128,28,109,'다음 날 대항력')
        +'<path class="v-civil-line" d="M113 46H126"/><path class="v-civil-arrowtip" d="m122 42 4 4-4 4"/>'
        +civBox(3,81,110,'확정일자 추가')+civBox(128,81,109,'우선변제 요건')
        +'<path class="v-civil-line" d="M113 99H126"/><path class="v-civil-arrowtip" d="m122 95 4 4-4 4"/>'
        +'<text class="v-civil-caption" x="120" y="136" text-anchor="middle">배당순위: 요건 시점과 선순위 권리 고려</text>');
    }
    if(type==='civil_provisional_steps'){
      return civSvg('<text class="v-civil-heading" x="120" y="16" text-anchor="middle">가등기담보: 소유권 취득 방식 실행</text>'
        +civBox(3,29,109,'변제기 후 통지')+civBox(128,29,109,'통지 도달')
        +'<path class="v-civil-line" d="M112 47H126"/><path class="v-civil-arrowtip" d="m122 43 4 4-4 4"/>'
        +civBox(3,82,109,'2개월 경과')+civBox(128,82,109,'청산금·등기')
        +'<path class="v-civil-line" d="M112 100H126"/><path class="v-civil-arrowtip" d="m122 96 4 4-4 4"/>'
        +'<path class="v-civil-dashed" d="M182 66V77H57V80"/>'
        +'<text class="v-civil-caption" x="120" y="136" text-anchor="middle">가등기와 이전등기 선행 사례를 구분</text>');
    }
    if(type==='civil_condivision'){
      return civSvg('<text class="v-civil-heading" x="120" y="15" text-anchor="middle">집합건물: 전유·공용·대지사용권</text>'
        +'<rect class="v-civil-box" x="18" y="27" width="204" height="74" rx="3"/>'
        +'<path class="v-civil-line" d="M18 64H222M98 27V101M143 27V101"/>'
        +'<rect class="v-civil-common" x="99" y="28" width="43" height="72" rx="2"/>'
        +'<text class="v-civil-text" x="58" y="48" text-anchor="middle">전유</text>'
        +'<text class="v-civil-text" x="181" y="48" text-anchor="middle">전유</text>'
        +'<text class="v-civil-text" x="58" y="86" text-anchor="middle">전유</text>'
        +'<text class="v-civil-text" x="181" y="86" text-anchor="middle">전유</text>'
        +'<text class="v-civil-text" x="120" y="53" text-anchor="middle">공용</text>'
        +'<text class="v-civil-text" x="120" y="86" text-anchor="middle">공용</text>'
        +'<rect class="v-civil-object" x="18" y="110" width="204" height="24" rx="4"/>'
        +'<text class="v-civil-title" x="120" y="126" text-anchor="middle">대지: 전유부분 소유를 위한 대지사용권</text>');
    }
    // v1.83: general-provisions diagrams compare the statutory outcomes, not factual cases.
    if(type==='civil_intention_comparison'){
      const rows=[['비진의표시','원칙 유효'],['통정허위표시','무효'],['중요 착오','취소 가능'],['사기','취소 가능'],['강박','취소 가능']];
      return civSvg('<text class="v-civil-heading" x="120" y="14" text-anchor="middle">의사표시 하자 유형 비교</text>'
        +rows.map(([name,outcome],i)=>{
          const y=24+i*21;
          return '<rect class="v-civil-box" x="8" y="'+y+'" width="224" height="19" rx="5"/>'
            +'<path class="v-civil-sep" d="M113 '+(y+2)+'V'+(y+17)+'"/>'
            +'<text class="v-civil-text" x="60" y="'+(y+13)+'" text-anchor="middle">'+name+'</text>'
            +'<text class="v-civil-text" x="175" y="'+(y+13)+'" text-anchor="middle">'+outcome+'</text>';
        }).join('')
        +'<text class="v-civil-caption" x="120" y="138" text-anchor="middle">상대방 인식·선의 제3자 등 예외는 설명 참조</text>');
    }
    if(type==='civil_void_cancel_compare'){
      return civSvg('<text class="v-civil-heading" x="120" y="17" text-anchor="middle">무효와 취소의 법률효과</text>'
        +civBox(3,30,110,'무효')+civBox(127,30,110,'취소 가능')
        +'<text class="v-civil-caption" x="58" y="81" text-anchor="middle">처음부터 효력 없음</text>'
        +'<text class="v-civil-caption" x="182" y="81" text-anchor="middle">취소 전에는 유효</text>'
        +'<path class="v-civil-dashed" d="M182 86V97"/>'
        +'<text class="v-civil-caption" x="58" y="113" text-anchor="middle">추인해도 소급회복 X</text>'
        +'<text class="v-civil-caption" x="182" y="113" text-anchor="middle">취소하면 처음부터 무효</text>'
        +'<text class="v-civil-caption" x="120" y="138" text-anchor="middle">취소권: 추인 가능일 3년 / 행위일 10년</text>');
    }
    if(type==='civil_condition_compare'){
      return civSvg('<text class="v-civil-heading" x="120" y="16" text-anchor="middle">조건 성취에 따른 효력 변화</text>'
        +civBox(3,29,111,'정지조건')+civBox(126,29,111,'해제조건')
        +'<path class="v-civil-line" d="M58 67V84M181 67V84"/>'
        +'<path class="v-civil-arrowtip" d="m54 80 4 4 4-4m119 0 4 4 4-4"/>'
        +'<text class="v-civil-text" x="58" y="101" text-anchor="middle">성취시 효력 발생</text>'
        +'<text class="v-civil-text" x="182" y="101" text-anchor="middle">성취시 효력 소멸</text>'
        +'<text class="v-civil-caption" x="120" y="126" text-anchor="middle">원칙: 성취 시점부터</text>'
        +'<text class="v-civil-caption" x="120" y="139" text-anchor="middle">당사자의 소급 의사표시가 있으면 예외</text>');
    }
    const row=CIVIL_DIAGRAMS[type];
    if(row){
      const [heading,a,b,c,caption]=row;
      return civSvg(`<text class="v-civil-heading" x="120" y="22" text-anchor="middle">${heading}</text>`
        +civBox(3,44,70,a)+civBox(85,44,70,b)+civBox(167,44,70,c)
        +`<path class="v-civil-line" d="M73 63H83M155 63H165"/><path class="v-civil-arrowtip" d="m79 59 4 4-4 4m82-8 4 4-4 4"/>`
        +`<text class="v-civil-caption" x="120" y="119" text-anchor="middle">${caption}</text>`);
    }
    return '';
  }

  function visualMarkup(type){
    const civilMarkup=civilDiagramMarkup(type);
    if(civilMarkup) return civilMarkup;
    const common='viewBox="0 0 240 140" role="img" aria-hidden="true"';
    const axes='<path class="v-axis" d="M34 14V116H222"/><text class="v-label" x="18" y="20">P</text><text class="v-label" x="222" y="132">Q</text>';
    const map={
      demand_down:`<svg ${common}>${axes}<path class="v-main" d="M58 30L200 105"/><text class="v-text" x="182" y="95">D</text></svg>`,
      supply_up:`<svg ${common}>${axes}<path class="v-main" d="M58 104L200 30"/><text class="v-text" x="185" y="34">S</text></svg>`,
      demand_move:`<svg ${common}>${axes}<path class="v-main" d="M58 30L200 105"/><circle class="v-point" cx="92" cy="48" r="5"/><circle class="v-point" cx="166" cy="87" r="5"/><path class="v-arrow" d="M103 55L152 81"/><text class="v-text" x="182" y="95">D</text></svg>`,
      demand_shift:`<svg ${common}>${axes}<path class="v-alt" d="M52 28L184 98"/><path class="v-main" d="M72 38L204 108"/><path class="v-arrow" d="M112 54L137 67"/><text class="v-text" x="171" y="91">D₁</text><text class="v-text" x="193" y="103">D₂</text></svg>`,
      supply_move:`<svg ${common}>${axes}<path class="v-main" d="M58 104L200 30"/><circle class="v-point" cx="92" cy="86" r="5"/><circle class="v-point" cx="166" cy="48" r="5"/><path class="v-arrow" d="M104 79L153 55"/><text class="v-text" x="185" y="34">S</text></svg>`,
      supply_shift:`<svg ${common}>${axes}<path class="v-alt" d="M50 104L182 35"/><path class="v-main" d="M74 110L206 41"/><path class="v-arrow" d="M115 72L141 59"/><text class="v-text" x="169" y="39">S₁</text><text class="v-text" x="196" y="45">S₂</text></svg>`,
      elastic_demand:`<svg ${common}>${axes}<path class="v-main" d="M52 50L207 86"/><text class="v-text" x="185" y="80">D</text></svg>`,
      inelastic_demand:`<svg ${common}>${axes}<path class="v-main" d="M104 22L145 110"/><text class="v-text" x="139" y="101">D</text></svg>`,
      unit_elastic_demand:`<svg ${common}>${axes}<path class="v-main" d="M56 32C72 34 90 39 108 48C129 59 151 76 196 108"/><text class="v-text" x="181" y="101">D</text></svg>`,
      perfect_elastic_demand:`<svg ${common}>${axes}<path class="v-main" d="M48 70H207"/><text class="v-text" x="193" y="63">D</text><text class="v-note" x="92" y="52">E = ∞</text></svg>`,
      perfect_inelastic_demand:`<svg ${common}>${axes}<path class="v-main" d="M128 22V111"/><text class="v-text" x="136" y="35">D</text><text class="v-note" x="142" y="72">E = 0</text></svg>`,
      elasticity_formula:`<svg ${common}><rect class="v-box" x="26" y="31" width="188" height="78" rx="15"/><text class="v-title" x="120" y="61" text-anchor="middle">가격탄력성</text><text class="v-formula" x="120" y="89" text-anchor="middle">| ΔQ/Q ÷ ΔP/P |</text></svg>`,
      concentric_city:`<svg ${common}><circle class="v-zone z5" cx="120" cy="70" r="58"/><circle class="v-zone z4" cx="120" cy="70" r="47"/><circle class="v-zone z3" cx="120" cy="70" r="36"/><circle class="v-zone z2" cx="120" cy="70" r="25"/><circle class="v-zone z1" cx="120" cy="70" r="13"/><text class="v-title" x="120" y="74" text-anchor="middle">CBD</text></svg>`,
      concentric_zones:`<svg ${common}><circle class="v-zone z5" cx="120" cy="70" r="60"/><circle class="v-zone z4" cx="120" cy="70" r="49"/><circle class="v-zone z3" cx="120" cy="70" r="38"/><circle class="v-zone z2" cx="120" cy="70" r="27"/><circle class="v-zone z1" cx="120" cy="70" r="15"/><text class="v-mini" x="120" y="74" text-anchor="middle">1</text><text class="v-mini" x="120" y="50" text-anchor="middle">2</text><text class="v-mini" x="120" y="36" text-anchor="middle">3</text><text class="v-mini" x="120" y="23" text-anchor="middle">4</text><text class="v-mini" x="120" y="11" text-anchor="middle">5</text></svg>`,
      sector_city:`<svg ${common}><circle class="v-zone" cx="88" cy="74" r="54"/><path class="v-sector s1" d="M88 74L215 25A136 136 0 0 1 220 69Z"/><path class="v-sector s2" d="M88 74L218 82A136 136 0 0 1 190 129Z"/><path class="v-sector s3" d="M88 74L126 6A136 136 0 0 1 177 16Z"/><circle class="v-core" cx="88" cy="74" r="14"/><text class="v-title" x="88" y="78" text-anchor="middle">CBD</text></svg>`,
      multi_nuclei:`<svg ${common}><path class="v-boundary" d="M31 83C35 33 75 12 126 16C184 19 219 52 210 100C199 130 158 132 112 125C72 132 36 119 31 83Z"/><circle class="v-nucleus" cx="77" cy="55" r="14"/><circle class="v-nucleus" cx="147" cy="44" r="11"/><circle class="v-nucleus" cx="171" cy="91" r="15"/><circle class="v-nucleus" cx="92" cy="101" r="10"/><text class="v-note" x="120" y="133" text-anchor="middle">여러 개의 핵심</text></svg>`,
      cobweb_overview:`<svg ${common}>${axes}<path class="v-alt" d="M52 105L198 29"/><path class="v-main" d="M52 30L198 106"/><polyline class="v-web" points="125,68 125,43 173,43 173,93 77,93 77,55 150,55 150,81 101,81 101,65 132,65"/><text class="v-text" x="188" y="34">S</text><text class="v-text" x="187" y="101">D</text></svg>`,
      cobweb_converge:`<svg ${common}>${axes}<path class="v-alt" d="M48 110L196 28"/><path class="v-main" d="M55 30L198 103"/><polyline class="v-web" points="178,94 178,38 72,38 72,86 159,86 159,48 91,48 91,78 143,78 143,56 108,56 108,71 132,71"/><circle class="v-point" cx="124" cy="67" r="4"/></svg>`,
      cobweb_diverge:`<svg ${common}>${axes}<path class="v-alt" d="M75 110L166 27"/><path class="v-main" d="M48 37L207 94"/><polyline class="v-web" points="125,67 125,55 91,55 91,80 168,80 168,39 57,39 57,104 203,104"/><circle class="v-point" cx="125" cy="67" r="4"/></svg>`,
      cobweb_cycle:`<svg ${common}>${axes}<path class="v-alt" d="M55 108L196 31"/><path class="v-main" d="M55 31L196 108"/><polyline class="v-web" points="87,91 87,48 165,48 165,90 87,90 87,48"/><circle class="v-point" cx="125" cy="69" r="4"/></svg>`,
      cashflow_sequence:`<svg ${common}><rect class="v-box" x="12" y="49" width="38" height="36" rx="8"/><rect class="v-box" x="58" y="49" width="38" height="36" rx="8"/><rect class="v-box" x="104" y="49" width="38" height="36" rx="8"/><rect class="v-box" x="150" y="49" width="38" height="36" rx="8"/><rect class="v-box" x="196" y="49" width="38" height="36" rx="8"/><path class="v-arrow" d="M50 67H58M96 67H104M142 67H150M188 67H196"/><text class="v-mini" x="31" y="71" text-anchor="middle">PGI</text><text class="v-mini" x="77" y="71" text-anchor="middle">EGI</text><text class="v-mini" x="123" y="71" text-anchor="middle">NOI</text><text class="v-mini" x="169" y="71" text-anchor="middle">BTCF</text><text class="v-mini" x="215" y="71" text-anchor="middle">ATCF</text></svg>`
    };
    return map[type]||'';
  }

  function visualLegend(type){
    const P=['P','가격'], Q=['Q','수량'], D=['D','수요곡선'], S=['S','공급곡선'];
    const map={
      demand_down:[P,Q,D],
      supply_up:[P,Q,S],
      demand_move:[P,Q,D,['●','가격·수요량 조합'],['→','곡선 위 이동']],
      demand_shift:[P,Q,['D₁','이동 전 수요곡선'],['D₂','이동 후 수요곡선'],['→','수요곡선 이동']],
      supply_move:[P,Q,S,['●','가격·공급량 조합'],['→','곡선 위 이동']],
      supply_shift:[P,Q,['S₁','이동 전 공급곡선'],['S₂','이동 후 공급곡선'],['→','공급곡선 이동']],
      elastic_demand:[P,Q,D,['E','수요의 가격탄력성']],
      inelastic_demand:[P,Q,D,['E','수요의 가격탄력성']],
      unit_elastic_demand:[P,Q,D,['E','수요의 가격탄력성']],
      perfect_elastic_demand:[P,Q,D,['E','수요의 가격탄력성']],
      perfect_inelastic_demand:[P,Q,D,['E','수요의 가격탄력성']],
      elasticity_formula:[['Δ','변화량'],['P','가격'],['Q','수요량']],
      concentric_city:[['CBD','중심업무지구']],
      concentric_zones:[['1','중심업무지구'],['2','천이지대'],['3','근로자 주택지대'],['4','중산층 주택지대'],['5','통근자 지대']],
      sector_city:[['CBD','중심업무지구']],
      cobweb_overview:[P,Q,D,S,['노란선','가격·수량 조정경로']],
      cobweb_converge:[P,Q,D,S,['노란선','균형으로 수렴하는 조정경로']],
      cobweb_diverge:[P,Q,D,S,['노란선','균형에서 멀어지는 조정경로']],
      cobweb_cycle:[P,Q,D,S,['노란선','같은 범위를 반복하는 조정경로']],
      cashflow_sequence:[
        ['PGI','가능조소득'],
        ['EGI','유효조소득'],
        ['NOI','순영업소득'],
        ['BTCF','세전현금수지'],
        ['ATCF','세후현금수지']
      ]
    };
    return map[type]||[];
  }

  function addVisualLegend(wrap,type){
    const items=visualLegend(type);
    if(!items.length) return;
    const legend=document.createElement('div');
    legend.className='visual-legend';
    legend.setAttribute('aria-label','그래프 기호 설명');
    items.forEach(([symbol,meaning])=>{
      const item=document.createElement('span');
      item.className='visual-legend-item';
      const key=document.createElement('b');
      key.textContent=symbol;
      const value=document.createElement('em');
      value.textContent=meaning;
      item.append(key,value);
      legend.appendChild(item);
    });
    wrap.appendChild(legend);
  }

  function addFormula(article,card){
    if(!card.formula) return;
    const box=document.createElement('div');
    box.className='card-formula';
    const label=document.createElement('span');
    label.textContent='수식';
    const value=document.createElement('strong');
    value.textContent=card.formula;
    box.append(label,value);
    article.appendChild(box);
  }

  function addVisual(article,card){
    if(!card.visual||card.visual==='none') return;
    const markup=visualMarkup(card.visual);
    if(!markup) return;
    const wrap=document.createElement('div');
    wrap.className='card-visual';
    wrap.innerHTML=markup;
    if(card.visual.startsWith('civil_')){
      wrap.setAttribute('role','img');
      wrap.setAttribute('aria-label',card.title+' 관계도. '+(card.bullets||[]).join(' '));
    }
    addVisualLegend(wrap,card.visual);
    article.appendChild(wrap);
  }

  function makeAction(label,className,active,onClick){
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='card-action '+className+(active?' active':'');
    btn.textContent=label;
    btn.addEventListener('click',onClick);
    return btn;
  }

  function makeImportanceRating(card){
    const rating=document.createElement('div');
    rating.className='card-importance';
    rating.setAttribute('role','img');
    const importance=Number.isInteger(card.importance)?Math.max(0,Math.min(5,card.importance)):0;
    const description='기출 중요도 '+importance+'/5 (문제·보기의 검색어 등장 횟수 기준)';
    rating.setAttribute('aria-label',description);
    rating.title=description;
    for(let level=1;level<=5;level++){
      const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('viewBox','0 0 24 24');
      svg.setAttribute('aria-hidden','true');
      svg.classList.add('importance-star');
      svg.classList.add(level<=importance?'is-active':'is-inactive');
      const star=document.createElementNS('http://www.w3.org/2000/svg','path');
      star.setAttribute('d','m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z');
      svg.appendChild(star);
      rating.appendChild(svg);
    }
    return rating;
  }

  function cardElement(card,globalIndex,total){
    const article=document.createElement('article');
    article.className='core-card';

    const top=document.createElement('div');
    top.className='card-topline';
    const tag=document.createElement('span');
    tag.className='card-tag';
    tag.textContent=TYPE_LABELS[card.type]||'핵심카드';
    const index=document.createElement('span');
    index.className='card-index';
    index.textContent=(globalIndex+1)+' / '+total;
    top.append(tag,index);
    article.appendChild(top);

    const title=document.createElement('h2');
    title.textContent=card.title;
    article.appendChild(title);

    const aliases=document.createElement('p');
    aliases.className='card-aliases';
    aliases.textContent=card.subtitle||'';
    article.appendChild(aliases);

    addBulletList(article,card);
    addFormula(article,card);
    addVisual(article,card);

    if(card.image){
      const wrap=document.createElement('div');
      wrap.className='card-illustration';
      const img=document.createElement('img');
      img.src=card.image;
      img.alt=card.imageAlt||'개념 그림';
      wrap.appendChild(img);
      article.appendChild(wrap);
    }

    const spacer=document.createElement('div');
    spacer.className='card-spacer';
    article.appendChild(spacer);

    const metaRow=document.createElement('div');
    metaRow.className='card-meta-row';
    const source=document.createElement('p');
    source.className='card-source';
    source.textContent=card.sourceLabel||'';
    metaRow.append(source,makeImportanceRating(card));
    article.appendChild(metaRow);

    const actions=document.createElement('div');
    actions.className='card-actions';
    actions.append(
      makeAction('☆ 중요','important',state.important.has(card.id),()=>{
        state.important.has(card.id)?state.important.delete(card.id):state.important.add(card.id);
        saveSet(IMPORTANT_KEY,state.important);
        render();
      }),
      makeAction('✓ 외움','memorized',state.memorized.has(card.id),()=>{
        state.memorized.has(card.id)?state.memorized.delete(card.id):state.memorized.add(card.id);
        saveSet(MEMORIZED_KEY,state.memorized);
        render();
      })
    );
    article.appendChild(actions);
    return article;
  }

  function renderDots(total){
    els.dots.innerHTML='';
    if(visibleCount()!==1 || total<=1) return;
    const cap=Math.min(total,9);
    const start=Math.max(0,Math.min(state.offset-4,total-cap));
    for(let i=start;i<start+cap;i++){
      const dot=document.createElement('span');
      if(i===state.offset) dot.classList.add('active');
      els.dots.appendChild(dot);
    }
  }

  function setStatusFilter(status){
    state.status=status;
    state.offset=0;
    render();
  }

  function updateHeroStats(subjectStats){
    els.heroCount.textContent=subjectStats.total;
    els.importantCount.textContent=subjectStats.important;
    els.memorizedCount.textContent=subjectStats.memorized;

    const map=[
      [els.importantStatBtn,'important'],
      [els.memorizedStatBtn,'memorized'],
      [els.registeredStatBtn,'all']
    ];
    map.forEach(([btn,status])=>{
      if(!btn) return;
      const active=state.status===status;
      btn.classList.toggle('active',active);
      btn.setAttribute('aria-pressed',active?'true':'false');
    });
  }

  function render(){
    const list=filtered();
    const count=visibleCount();
    const maxOffset=Math.max(0,list.length-count);
    state.offset=Math.max(0,Math.min(state.offset,maxOffset));
    const page=list.slice(state.offset,state.offset+count);
    // Search/category/status filters must not affect the selected-subject counters.
    const subjectStats=subjectStatsFor(state.subject);
    refreshSubjectMenuCounts();

    els.grid.innerHTML='';
    if(!page.length){
      const empty=document.createElement('div');
      empty.className='empty-state';
      const box=document.createElement('div');
      const strong=document.createElement('strong');
      strong.textContent='표시할 카드가 없어.';
      const line=document.createElement('div');
      line.textContent='검색어 또는 필터를 바꿔봐.';
      box.append(strong,line);
      empty.appendChild(box);
      els.grid.appendChild(empty);
    }else{
      page.forEach(card=>{
        els.grid.appendChild(cardElement(card,list.indexOf(card),list.length));
      });
    }

    els.prev.disabled=state.offset<=0;
    els.next.disabled=state.offset+count>=list.length;

    const from=list.length?state.offset+1:0;
    const to=Math.min(state.offset+count,list.length);
    els.range.textContent=list.length ? from+'–'+to+' / '+list.length : '0 / 0';
    els.fill.style.width=list.length ? Math.min(100,to/list.length*100)+'%' : '0%';

    updateHeroStats(subjectStats);
    const subject=bank.subjects.find(s=>s.code===state.subject)?.name||'과목';
    els.statusText.textContent=subject+' · '+(state.category==='all'?'전체 단원':state.category);
    renderDots(list.length);
  }

  els.subjectButton?.addEventListener('click',()=>{
    els.subjectMenu.hidden ? openSubjectMenu() : closeSubjectMenu();
  });
  els.subjectButton?.addEventListener('keydown',event=>{
    if(event.key==='ArrowDown'||event.key==='ArrowUp'){
      event.preventDefault();
      openSubjectMenu({focusSelected:true});
    }else if(event.key==='Escape'){
      closeSubjectMenu();
    }
  });
  els.subjectMenu?.addEventListener('keydown',event=>{
    const enabled=[...els.subjectMenu.querySelectorAll('.subject-option:not(.disabled)')];
    if(!enabled.length) return;
    const current=enabled.indexOf(document.activeElement);
    if(event.key==='ArrowDown'){
      event.preventDefault();
      enabled[(current+1+enabled.length)%enabled.length].focus();
    }else if(event.key==='ArrowUp'){
      event.preventDefault();
      enabled[(current-1+enabled.length)%enabled.length].focus();
    }else if(event.key==='Home'){
      event.preventDefault();
      enabled[0].focus();
    }else if(event.key==='End'){
      event.preventDefault();
      enabled[enabled.length-1].focus();
    }else if(event.key==='Escape'){
      event.preventDefault();
      closeSubjectMenu({restoreFocus:true});
    }
  });

  els.search.addEventListener('focus',openSearchPanel);
  els.search.addEventListener('click',openSearchPanel);
  els.search.addEventListener('input',()=>{
    state.query=els.search.value;
    state.category='all';
    state.offset=0;
    renderSearchPicker();
    render();
  });
  els.search.addEventListener('keydown',event=>{
    const buttons=[...els.searchSuggestions.querySelectorAll('.search-suggestion')];
    if(event.key==='ArrowDown'){
      event.preventDefault();
      if(els.searchPanel.hidden) openSearchPanel();
      activateSuggestion(state.suggestionIndex<0?0:state.suggestionIndex+1);
    }else if(event.key==='ArrowUp'){
      event.preventDefault();
      if(els.searchPanel.hidden) openSearchPanel();
      activateSuggestion(state.suggestionIndex<0?buttons.length-1:state.suggestionIndex-1);
    }else if(event.key==='Enter'&&state.suggestionIndex>=0&&buttons[state.suggestionIndex]){
      event.preventDefault();
      buttons[state.suggestionIndex].click();
    }else if(event.key==='Escape'){
      event.preventDefault();
      closeSearchPanel();
      els.search.blur();
    }
  });
  document.addEventListener('pointerdown',event=>{
    if(!els.searchField.contains(event.target)) closeSearchPanel();
    if(els.subjectPicker && !els.subjectPicker.contains(event.target)) closeSubjectMenu();
  });
  els.importantStatBtn?.addEventListener('click',()=>setStatusFilter('important'));
  els.memorizedStatBtn?.addEventListener('click',()=>setStatusFilter('memorized'));
  els.registeredStatBtn?.addEventListener('click',()=>setStatusFilter('all'));
  els.randomOrderBtn?.addEventListener('click',()=>setOrderMode('random',{reshuffle:true}));
  els.easyOrderBtn?.addEventListener('click',()=>setOrderMode('easy'));
  els.hardOrderBtn?.addEventListener('click',()=>setOrderMode('hard'));

  els.prev.addEventListener('click',()=>{
    state.offset=Math.max(0,state.offset-visibleCount());
    render();
  });
  els.next.addEventListener('click',()=>{
    state.offset+=visibleCount();
    render();
  });
  window.addEventListener('resize',render,{passive:true});

  renderSubjects();
  renderSearchPicker();
  updateOrderButtons();
  render();
})();
