const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {TARGETS,ROOT,validate,readBank}=require('./validate.cjs');
const {compileSubject}=require('./compile-v2.cjs');

const ctx={window:{}};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT,'word-quiz/blank-bank-validator.js'),'utf8'),ctx);

let checks=0;
let multiCount=0;
for(const subject of Object.keys(TARGETS)) {
  const bank=readBank(subject);

  // Checked-in runtime data must be exactly reproducible from the reviewed V2 TXT source.
  assert.deepEqual(bank,compileSubject(subject));
  checks+=1;

  // Current reviewed banks must pass both structure and release validation.
  assert.deepEqual(validate(bank,subject),[]);
  assert.deepEqual(validate(bank,subject,true),[]);
  assert.equal(ctx.window.validateBlankBank(bank,subject),true);
  checks+=3;

  // Removing release approval must make release validation fail.
  const unreviewed=structuredClone(bank);
  unreviewed.reviewStatus='pending';
  unreviewed.questions[0].review.wording='pending';
  if(subject!=='real_estate_intro') unreviewed.questions[0].review.legal='pending';
  assert.ok(validate(unreviewed,subject,true).length,'Unreviewed bank must fail release');
  checks+=1;

  // Core-version drift must fail even if the bank itself is structurally valid.
  const stale=structuredClone(bank);
  stale.coreVersion='stale-core-version';
  assert.ok(validate(stale,subject,true).some(x=>x.includes('core version mismatch')));
  checks+=1;

  for(const mutate of [
    b=>b.questions.pop(),
    b=>b.questions[0].answer='',
    b=>b.questions[0].choices[1]=b.questions[0].choices[0],
    b=>b.questions[0].choices=['a','b','c','d'],
    b=>b.questions[1].id=b.questions[0].id,
    b=>b.questions[1].prompt=b.questions[0].prompt,
    b=>b.questions[0].prompt+=' {{blank}}',
    b=>b.questions[0].explanation='',
    b=>b.questions[0].originQuestionId='UNKNOWN-CORE-ID',
    b=>{const q=b.questions.find(x=>!x.blankValues);q.prompt=q.prompt+' '+q.answer;}
  ]) {
    const broken=structuredClone(bank);
    mutate(broken);
    assert.ok(validate(broken,subject).length);
    checks+=1;
  }

  const multiIndex=bank.questions.findIndex(q=>q.blankValues);
  if(multiIndex>=0){
    multiCount++;
    const broken=structuredClone(bank);
    const q=broken.questions[multiIndex];
    const firstChoice=q.choices[0];
    const firstKey=Object.keys(q.blankValues[firstChoice])[0];
    delete q.blankValues[firstChoice][firstKey];
    assert.ok(validate(broken,subject).length);
    assert.equal(ctx.window.validateBlankBank(broken,subject),false);
    checks+=2;
  }
}

// The signed answer must never be readable in the question outside blank slots.
const sessionContext={window:{}};
vm.createContext(sessionContext);
vm.runInContext(fs.readFileSync(path.join(ROOT,'word-quiz/blank-session.js'),'utf8'),sessionContext);
assert.equal(typeof sessionContext.window.pickBlankQuizSession,'function');
checks+=1;
for(const subject of Object.keys(TARGETS)){
  const bank=readBank(subject);
  for(const randomValue of [0,0.15,0.5,0.97]){
    const picked=sessionContext.window.pickBlankQuizSession(bank.questions,10,()=>randomValue);
    assert.equal(picked.length,10,subject+': must draw 10 questions');
    assert.equal(new Set(picked.map(x=>x.originQuestionId)).size,10,subject+': no repeated origin in 10-question session');
    checks+=2;
  }
}
{
 const small=[{id:'a',originQuestionId:'A'},{id:'b',originQuestionId:'A'},{id:'c',originQuestionId:'B'}];
 const result=sessionContext.window.pickBlankQuizSession(small,3,()=>0.4);
 assert.equal(result.length,3);
 assert.equal(new Set(result.map(x=>x.id)).size,3);
 checks+=2;
}

assert.ok(multiCount>0,'At least one reviewed bank must exercise multi-blank rendering data');
checks+=1;


// v2.14: first ten real-estate-introduction blanks independently reviewed.
{
 const b=readBank('real_estate_intro');
 const reviewed=b.questions.filter(q=>/^BLANK-01-0(0[1-9]|10)$/.test(q.id));
 assert.equal(reviewed.length,10);
 const keys=['복합개념의 부동산','획지','맹지','나지','소지(素地)','공한지','후보지','이행지','빈지(濱地)','법지(法地)'];
 for(let i=0;i<10;i++){
  const q=reviewed[i];
  assert.equal(q.answer,keys[i],q.id);
  assert.equal(q.choices.filter(c=>c===q.answer).length,1,q.id);
  assert.ok(q.explanation.includes(keys[i].replace(/\(.+\)/,'').replace('복합개념의 부동산','부동산')),q.id);
 }
 assert.ok(reviewed[8].explanation.includes('해변'));
 assert.ok(reviewed[9].explanation.includes('경사진'));
}

// v2.14: first 100 intro blanks reviewed, key and source consistency fixed.
{
 const bank=readBank('real_estate_intro');
 for(let i=0;i<100;i++){
  const q=bank.questions[i];
  assert.equal(q.id,'BLANK-01-'+String(i+1).padStart(3,'0'));
  assert.equal(q.choices.filter(c=>c===q.answer).length,1,q.id);
  assert.ok(q.prompt.includes('{{blank}}')||q.prompt.includes('{{blank:A}}'),q.id);
  assert.ok(q.explanation.length>9,q.id);
 }
 const weak=bank.questions[28],semi=bank.questions[29],strong=bank.questions[30];
 assert.ok(weak.prompt.includes('가장 약한 유형'));
 assert.ok(semi.prompt.includes('미공개 내부정보'));
 assert.ok(strong.prompt.includes('미공개 내부정보'));
}

// v2.15: lock 101-156 independently reviewed real-estate blank questions.
{
 const rows=readBank('real_estate_intro').questions.slice(100,156);
 assert.equal(rows.length,56);
 for(let i=0;i<rows.length;i++){
  const q=rows[i];
  assert.equal(q.id,'BLANK-01-'+String(i+101).padStart(3,'0'));
  assert.equal(q.choices.filter(x=>x===q.answer).length,1,q.id);
  assert.ok(q.explanation.length>10,q.id);
 }
 for(const n of [105,106,107,114,115,155]){
  assert.ok(rows[n-101].explanation.length>75,'formula explanation '+n);
 }
}
const html=fs.readFileSync(path.join(ROOT,'word-quiz/index.html'),'utf8');
assert.ok(!html.includes('blank-bank-builder.js'));
assert.ok(!html.includes('../summary/'));
assert.match(html,/\?v=\d{8}-core-v\d+/);
assert.ok(html.includes('20261010-blank-v23'));
assert.ok(html.includes('blank-session.js?v=20261010-blank-v23'));
assert.ok(html.includes('answerSummarySection'));
assert.ok(html.includes('blank-quiz.js?v=20261010-blank-v23'));
checks+=6;

const quizJs=fs.readFileSync(path.join(ROOT,'word-quiz/blank-quiz.js'),'utf8');
assert.ok(quizJs.includes('blankValues'));
assert.ok(quizJs.includes('window.pickBlankQuizSession'));
assert.ok(quizJs.includes('data-blank-key')||quizJs.includes('dataset.blankKey'));
assert.ok(quizJs.includes('correctSentence'));
assert.ok(quizJs.includes('renderAnswerSummary'));
assert.ok(quizJs.includes('is-first-correct'));
assert.ok(quizJs.includes('is-first-wrong'));
checks+=6;

console.log(`${checks} checks passed (V2 TXT reproducibility, all six subjects, multi-blank data, release approval, corruption, core drift).`);
