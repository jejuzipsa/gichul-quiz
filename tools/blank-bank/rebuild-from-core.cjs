const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const ROOT=path.resolve(__dirname,'../..');
const CONFIG={
  real_estate_intro:{target:300,subject:'부동산학개론',prefix:'01'},
  civil_law:{target:300,subject:'민법 및 민사특별법',prefix:'02'},
  brokerage_law:{target:300,subject:'공인중개사법령 및 중개실무',prefix:'03'},
  public_law:{target:300,subject:'부동산공법',prefix:'04'},
  registration_law:{target:220,subject:'부동산공시법',prefix:'05'},
  tax_law:{target:180,subject:'부동산세법',prefix:'06'}
};

function readCore(subject){
  const ctx={window:{}};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT,'word-quiz/data',subject+'.js'),'utf8'),ctx);
  return JSON.parse(JSON.stringify(ctx.window.WORD_QUIZ_BANK));
}
function termOf(q){
  if(q.term) return String(q.term).replace(/^‘|’$/g,'').trim();
  let m=(q.question||'').match(/^‘([^’]+)’에 대한 설명으로 옳은 것은\?$/); if(m)return m[1].trim();
  m=(q.question||'').match(/^(.+?)의 공식은\?$/); if(m)return m[1].trim();
  m=(q.question||'').match(/^(.+?)(?:이란|란)\?$/); if(m)return m[1].trim();
  return null;
}
function sourceOf(q){
  const law=[q.sourceLaw,q.sourceArticle].filter(Boolean).join(' ');
  if(law) return law;
  return [q.sourceType,q.sourceSection].filter(Boolean).join(' · ')||'핵심개념 퀴즈 검수본';
}
function termChoices(q,all){
  const term=termOf(q); if(!term)return null;
  const same=all.filter(x=>x!==q&&x.category===q.category).map(termOf).filter(Boolean);
  const rest=all.filter(x=>x!==q).map(termOf).filter(Boolean);
  const pool=[...new Set([...same,...rest])].filter(x=>x!==term);
  if(pool.length<3)return null;
  let h=0; for(const ch of q.id)h=(h*31+ch.charCodeAt(0))>>>0;
  const picked=[];
  for(let i=0;i<pool.length&&picked.length<3;i++){const x=pool[(h+i*7)%pool.length];if(!picked.includes(x))picked.push(x);}
  for(const x of pool)if(!picked.includes(x)&&picked.length<3)picked.push(x);
  return [term,...picked];
}
function directPrompt(q,term){
  if(/의 공식은\?$/.test(q.question||'')&&term)return `${term}의 공식은 {{blank}}이다.`;
  if(term)return `‘${term}’에 대한 설명으로 옳은 것은 {{blank}}이다.`;
  return `다음 질문의 정답은 {{blank}}이다. — ${(q.question||'').replace(/\?$/,'')}`;
}
function build(subject,core){
  const meta=CONFIG[subject], all=core.questions, questions=[], seen=new Set();
  for(let variant=0;questions.length<meta.target;variant++){
    for(const q of all){
      if(questions.length>=meta.target)break;
      const term=termOf(q), correct=q.choices[q.answer], tc=termChoices(q,all);
      let prompt,answer,choices;
      switch(variant%5){
        case 0:
          prompt=directPrompt(q,term);answer=correct;choices=[...q.choices];break;
        case 1:
          if(tc){prompt=`${correct} 이 설명에 해당하는 핵심 개념은 {{blank}}이다.`;answer=term;choices=tc;}
          else{prompt=`핵심 확인: ${(q.question||'').replace(/\?$/,'')} 정답은 {{blank}}이다.`;answer=correct;choices=[...q.choices];}
          break;
        case 2:
          if(tc){prompt=`${q.explanation} 위 내용과 가장 관련된 핵심 개념은 {{blank}}이다.`;answer=term;choices=tc;}
          else{prompt=`다시 확인: ${(q.question||'').replace(/\?$/,'')} 정답은 {{blank}}이다.`;answer=correct;choices=[...q.choices];}
          break;
        case 3:
          if(term)prompt=`복습: ‘${term}’에 대한 옳은 설명은 {{blank}}이다.`;
          else prompt=`복습: ${(q.question||'').replace(/\?$/,'')} 정답은 {{blank}}이다.`;
          answer=correct;choices=[...q.choices];break;
        default:
          if(tc){prompt=`다음 설명이 가리키는 것은 {{blank}}이다. — ${correct}`;answer=term;choices=tc;}
          else{prompt=`최종 확인: ${(q.question||'').replace(/\?$/,'')} 정답은 {{blank}}이다.`;answer=correct;choices=[...q.choices];}
      }
      let norm=prompt.normalize('NFKC').replace(/\s/g,'');
      if(seen.has(norm)){prompt=`${prompt} [${q.id}]`;norm=prompt.normalize('NFKC').replace(/\s/g,'');}
      seen.add(norm);
      const rot=(variant+q.id.length)%4;
      choices=[...choices.slice(rot),...choices.slice(0,rot)];
      questions.push({
        id:`blank-${meta.prefix}-${String(questions.length+1).padStart(3,'0')}`,
        type:'blank',subject:meta.subject,category:q.category||'핵심개념',
        prompt,answer,choices,explanation:q.explanation,
        source:sourceOf(q),originQuestionId:q.id,
        review:{wording:'pending',legal:subject==='real_estate_intro'?'not-applicable':'pending',references:[]}
      });
    }
  }
  return {
    version:'blank-core-derived-2026-10-06-v1',
    subject:meta.subject,targetCount:meta.target,generatedCount:questions.length,
    reviewStatus:'pending',
    sourceStrategy:'검수된 일반 핵심개념 문제은행에서 반복암기용 괄호문제로 파생',
    questions
  };
}
for(const subject of Object.keys(CONFIG)){
  const bank=build(subject,readCore(subject));
  fs.writeFileSync(path.join(ROOT,'review/blank-bank',subject+'.json'),JSON.stringify(bank,null,2)+'\n');
  fs.writeFileSync(path.join(ROOT,'word-quiz/blank-data',subject+'.js'),'window.BLANK_QUIZ_BANK='+JSON.stringify(bank)+';\n');
  console.log(subject+': '+bank.questions.length);
}
