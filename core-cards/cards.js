(() => {
  const bank=window.CORE_WORD_CARD_BANK;
  if(!bank || !Array.isArray(bank.cards)) return;

  const THEME_KEY='gichulQuizTheme';
  const IMPORTANT_KEY='gichulCoreWordImportant';
  const MEMORIZED_KEY='gichulCoreWordMemorized';
  const $=id=>document.getElementById(id);

  const els={
    subject:$('subjectSelect'), search:$('cardSearch'), status:$('statusFilter'), categories:$('categoryTabs'),
    grid:$('cardGrid'), prev:$('prevBtn'), next:$('nextBtn'), range:$('rangeText'), fill:$('progressFill'),
    dots:$('mobileDots'), heroCount:$('heroCount'), statusText:$('statusText'), theme:$('themeToggleBtn')
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
      const hay=[card.title,card.category].concat(card.aliases||[],card.bullets||[]).join(' ').toLocaleLowerCase('ko');
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
    tag.textContent='핵심카드';
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
    aliases.textContent=(card.aliases||[]).join(' · ');
    article.appendChild(aliases);

    addBulletList(article,card);

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
    els.heroCount.textContent=allSubjectCards.length;
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
  els.status.addEventListener('change',()=>{
    state.status=els.status.value;
    state.offset=0;
    render();
  });
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
