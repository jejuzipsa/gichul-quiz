(() => {
  const bank=window.CORE_WORD_CARD_BANK;
  if(!bank || !Array.isArray(bank.cards)) return;

  const THEME_KEY='gichulQuizTheme';
  const IMPORTANT_KEY='gichulCoreWordImportant';
  const MEMORIZED_KEY='gichulCoreWordMemorized';
  const $=id=>document.getElementById(id);

  const els={
    subject:$('subjectSelect'), search:$('cardSearch'), categories:$('categoryTabs'),
    grid:$('cardGrid'), prev:$('prevBtn'), next:$('nextBtn'), range:$('rangeText'), fill:$('progressFill'),
    dots:$('mobileDots'), heroCount:$('heroCount'), importantCount:$('importantCount'), memorizedCount:$('memorizedCount'),
    importantStatBtn:$('importantStatBtn'), memorizedStatBtn:$('memorizedStatBtn'), registeredStatBtn:$('registeredStatBtn'),
    statusText:$('statusText'), theme:$('themeToggleBtn')
  };

  const state={
    subject:'real_estate_intro', category:'all', query:'', status:'all', offset:0,
    important:new Set(), memorized:new Set()
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

  function visibleCount(){
    const w=window.innerWidth;
    if(w>=1280) return 3;
    if(w>=980) return 2;
    return 1;
  }

  function filtered(){
    const q=state.query.trim().toLocaleLowerCase('ko');
    return bank.cards.filter(card=>{
      if(card.subject!==state.subject) return false;
      if(state.category!=='all' && card.category!==state.category) return false;
      if(state.status==='important' && !state.important.has(card.id)) return false;
      if(state.status==='memorized' && !state.memorized.has(card.id)) return false;
      if(!q) return true;
      const hay=[card.title,card.subtitle,card.category,card.formula].concat(card.bullets||[]).join(' ').toLocaleLowerCase('ko');
      return hay.includes(q);
    });
  }

  function renderSubjects(){
    els.subject.innerHTML='';
    bank.subjects.forEach(item=>{
      const opt=document.createElement('option');
      opt.value=item.code;
      opt.textContent=item.disabled ? item.name+' · 준비 중' : item.name;
      opt.disabled=!!item.disabled;
      els.subject.appendChild(opt);
    });
    els.subject.value=state.subject;
  }

  function renderCategories(){
    const categories=['all'].concat([...new Set(bank.cards.filter(c=>c.subject===state.subject).map(c=>c.category))]);
    els.categories.innerHTML='';
    categories.forEach(category=>{
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='category-tab'+(category===state.category?' active':'');
      btn.textContent=category==='all'?'전체':category;
      btn.addEventListener('click',()=>{
        state.category=category;
        state.offset=0;
        renderCategories();
        render();
      });
      els.categories.appendChild(btn);
    });
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

  function visualMarkup(type){
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

    const source=document.createElement('p');
    source.className='card-source';
    source.textContent=card.sourceLabel||'';
    article.appendChild(source);

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

  function updateHeroStats(allSubjectCards){
    const importantCount=allSubjectCards.filter(card=>state.important.has(card.id)).length;
    const memorizedCount=allSubjectCards.filter(card=>state.memorized.has(card.id)).length;

    els.heroCount.textContent=allSubjectCards.length;
    els.importantCount.textContent=importantCount;
    els.memorizedCount.textContent=memorizedCount;

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

    const allSubjectCards=bank.cards.filter(c=>c.subject===state.subject);
    updateHeroStats(allSubjectCards);
    const subject=bank.subjects.find(s=>s.code===state.subject)?.name||'과목';
    els.statusText.textContent=subject+' · '+(state.category==='all'?'전체 단원':state.category);
    renderDots(list.length);
  }

  els.subject.addEventListener('change',()=>{
    state.subject=els.subject.value;
    state.category='all';
    state.offset=0;
    renderCategories();
    render();
  });
  els.search.addEventListener('input',()=>{
    state.query=els.search.value;
    state.offset=0;
    render();
  });
  els.importantStatBtn?.addEventListener('click',()=>setStatusFilter('important'));
  els.memorizedStatBtn?.addEventListener('click',()=>setStatusFilter('memorized'));
  els.registeredStatBtn?.addEventListener('click',()=>setStatusFilter('all'));
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
  renderCategories();
  render();
})();
