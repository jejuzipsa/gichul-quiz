(() => {
  const $=id=>document.getElementById(id);
  const bank=window.WORD_QUIZ_BANK;
  if(!bank || !Array.isArray(bank.questions)){
    document.body.innerHTML='<main class="quiz-shell"><article class="result-card"><h1>문제 데이터를 불러오지 못했어.</h1><a class="secondary-btn" href="../index.html">홈으로</a></article></main>';
    return;
  }

  const state={session:[],index:0,answers:[],mode:'random'};
  const els={
    playView:$('playView'),resultView:$('resultView'),subjectTitle:$('subjectTitle'),progressText:$('progressText'),
    categoryText:$('categoryText'),progressFill:$('progressFill'),questionNumber:$('questionNumber'),
    questionText:$('questionText'),choices:$('choices'),feedback:$('feedback'),nextBtn:$('nextBtn'),
    resultHeadline:$('resultHeadline'),resultScore:$('resultScore'),resultBar:$('resultBar'),retryWrongBtn:$('retryWrongBtn'),
    newSetBtn:$('newSetBtn'),newSetTopBtn:$('newSetTopBtn'),wrongSection:$('wrongSection'),wrongCount:$('wrongCount'),wrongList:$('wrongList')
  };
  els.subjectTitle.textContent=bank.subject||'핵심 개념';

  function shuffle(arr){
    const a=[...arr];
    for(let i=a.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }

  function prepareQuestion(q){
    const opts=q.choices.map((label,index)=>({label,correct:index===q.answer}));
    return {...q,displayChoices:shuffle(opts)};
  }

  function startRandom(){
    const n=Math.min(Number(bank.randomPickDefault)||30,bank.questions.length);
    state.session=shuffle(bank.questions).slice(0,n).map(prepareQuestion);
    state.index=0; state.answers=[]; state.mode='random';
    showPlay();
  }

  function startWrong(){
    const wrong=state.answers.filter(a=>!a.correct).map(a=>a.question);
    if(!wrong.length) return;
    state.session=shuffle(wrong).map(prepareQuestion);
    state.index=0; state.answers=[]; state.mode='wrong';
    showPlay();
  }

  function showPlay(){
    els.resultView.classList.add('hidden');
    els.playView.classList.remove('hidden');
    renderQuestion();
    window.scrollTo({top:0,behavior:'instant'});
  }

  function renderQuestion(){
    const q=state.session[state.index];
    if(!q){renderResult();return;}
    els.progressText.textContent=`${state.index+1} / ${state.session.length}`;
    els.categoryText.textContent=[q.category,q.difficulty].filter(Boolean).join(' · ');
    els.progressFill.style.width=`${((state.index+1)/state.session.length)*100}%`;
    els.questionNumber.textContent=`문제 ${state.index+1}`;
    els.questionText.textContent=q.question;
    els.feedback.className='feedback hidden';
    els.feedback.innerHTML='';
    els.nextBtn.classList.add('hidden');
    els.choices.innerHTML='';

    q.displayChoices.forEach((opt,idx)=>{
      const btn=document.createElement('button');
      btn.type='button'; btn.className='choice';
      btn.innerHTML=`<span class="choice-index">${idx+1}</span><span class="choice-text"></span>`;
      btn.querySelector('.choice-text').textContent=opt.label;
      btn.addEventListener('click',()=>answer(idx));
      els.choices.appendChild(btn);
    });
  }

  function answer(selectedIndex){
    const q=state.session[state.index];
    const selected=q.displayChoices[selectedIndex];
    if(!selected || state.answers.length>state.index) return;

    const buttons=[...els.choices.querySelectorAll('.choice')];
    buttons.forEach((btn,idx)=>{
      btn.disabled=true;
      const opt=q.displayChoices[idx];
      if(opt.correct) btn.classList.add('correct');
      else if(idx===selectedIndex) btn.classList.add('wrong');
      else btn.classList.add('dimmed');
    });

    const record={question:q,selected:selected.label,correct:selected.correct,correctLabel:q.displayChoices.find(x=>x.correct)?.label||''};
    state.answers.push(record);

    els.feedback.className=`feedback ${selected.correct?'good':'bad'}`;
    const title=selected.correct?'정답이야.':'오답이야.';
    els.feedback.innerHTML=`<strong>${title}</strong><p></p>`;
    els.feedback.querySelector('p').textContent=q.explanation||'';
    els.nextBtn.textContent=state.index===state.session.length-1?'결과 보기':'다음 문제';
    els.nextBtn.classList.remove('hidden');
  }

  function next(){
    if(state.answers.length<=state.index) return;
    state.index++;
    if(state.index>=state.session.length) renderResult();
    else {
      renderQuestion();
      window.scrollTo({top:0,behavior:'smooth'});
    }
  }

  function renderResult(){
    els.playView.classList.add('hidden');
    els.resultView.classList.remove('hidden');
    const total=state.answers.length;
    const correct=state.answers.filter(a=>a.correct).length;
    const wrong=state.answers.filter(a=>!a.correct);
    const rate=total?Math.round(correct/total*100):0;

    els.resultHeadline.textContent=state.mode==='wrong'?`${total}문제 재풀이 완료`:`${total}문제 완료`;
    els.resultScore.textContent=`${correct} / ${total} 정답 · 정답률 ${rate}%`;
    els.resultBar.querySelector('span').style.width=`${rate}%`;
    els.retryWrongBtn.classList.toggle('hidden',wrong.length===0);
    els.wrongCount.textContent=wrong.length?`${wrong.length}문제`:'0문제';
    els.wrongList.innerHTML='';

    if(!wrong.length){
      const empty=document.createElement('div');
      empty.className='empty-wrong';
      empty.textContent='틀린 문제가 없어. 전부 맞았어.';
      els.wrongList.appendChild(empty);
    } else {
      wrong.forEach((item,idx)=>{
        const card=document.createElement('article');
        card.className='wrong-card';
        const no=document.createElement('div');no.className='wrong-no';no.textContent=`오답 ${idx+1}`;
        const h=document.createElement('h3');h.textContent=item.question.question;
        const ans=document.createElement('p');ans.className='wrong-answer';ans.textContent=`정답: ${item.correctLabel}`;
        const exp=document.createElement('p');exp.className='wrong-explain';exp.textContent=item.question.explanation||'';
        card.append(no,h,ans,exp); els.wrongList.appendChild(card);
      });
    }
    window.scrollTo({top:0,behavior:'smooth'});
  }

  els.nextBtn.addEventListener('click',next);
  els.retryWrongBtn.addEventListener('click',startWrong);
  els.newSetBtn.addEventListener('click',startRandom);
  els.newSetTopBtn.addEventListener('click',()=>{
    if(confirm('현재 풀이를 끝내고 새로운 30문제를 시작할까?')) startRandom();
  });

  startRandom();
})();