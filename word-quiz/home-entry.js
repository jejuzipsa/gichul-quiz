(() => {
  const subjects = [
    {code:'real_estate_intro', name:'부동산학개론', count:100, ready:true},
    {code:'civil_law', name:'민법 및 민사특별법', count:0, ready:false},
    {code:'brokerage_law', name:'공인중개사법령 및 중개실무', count:0, ready:false},
    {code:'public_law', name:'부동산공법', count:0, ready:false},
    {code:'registration_law', name:'부동산공시법', count:0, ready:false},
    {code:'tax_law', name:'부동산세법', count:0, ready:false}
  ];

  function loadCss(){
    if(document.querySelector('link[data-word-quiz-entry-css]')) return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='word-quiz/entry.css?v=1.0';
    link.dataset.wordQuizEntryCss='1';
    document.head.appendChild(link);
  }

  function mount(){
    if(document.getElementById('wordQuizHomeSection')) return;
    const exam=document.getElementById('examEntryBtn');
    const summary=document.querySelector('.summary-home-section');
    if(!exam || !summary) return;

    loadCss();

    const section=document.createElement('section');
    section.id='wordQuizHomeSection';
    section.className='word-quiz-home-section';
    section.setAttribute('aria-labelledby','wordQuizHomeTitle');

    const head=document.createElement('div');
    head.className='word-quiz-home-head';
    head.innerHTML='<div><h2 id="wordQuizHomeTitle">핵심 개념 퀴즈</h2><p>짧게 묻고 바로 확인 · 과목별 랜덤 30문제</p></div>';

    const grid=document.createElement('div');
    grid.className='word-quiz-subject-grid';

    subjects.forEach(item=>{
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='word-quiz-subject-btn' + (item.ready ? '' : ' is-disabled');
      btn.disabled=!item.ready;

      const meta=item.ready ? `${item.count}문제 · 랜덤 30문제` : '문제 준비 중';
      const action=item.ready ? '<span class="word-quiz-start">시작</span>' : '<span class="word-quiz-wait">준비 중</span>';
      btn.innerHTML=`<span class="word-quiz-copy"><strong>${item.name}</strong><span>${meta}</span></span>${action}`;

      if(item.ready){
        btn.addEventListener('click',()=>{
          location.href=`word-quiz/index.html?subject=${encodeURIComponent(item.code)}`;
        });
      }
      grid.appendChild(btn);
    });

    section.append(head,grid);
    summary.before(section);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();