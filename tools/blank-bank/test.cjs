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


// v2.15: first ten real-estate-introduction blanks independently reviewed.
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

// v2.15: first 100 intro blanks reviewed, key and source consistency fixed.
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
  assert.ok(rows[n-101].explanation.length>35,'formula explanation '+n);
 }
}

// v2.16: all 144 independently reviewed introduction blanks.
{
 const rows=readBank('real_estate_intro').questions.slice(156,300);
 assert.equal(rows.length,144);
 for(let i=0;i<rows.length;i++){
  const q=rows[i];
  assert.equal(q.id,'BLANK-01-'+String(i+157).padStart(3,'0'));
  assert.equal(q.choices.filter(x=>x===q.answer).length,1,q.id);
  assert.equal(new Set(q.choices).size,4,q.id);
  assert.ok(q.explanation.length>9,q.id);
 }
 assert.ok(rows[243-157].prompt.startsWith('손익분기비율(BER)'));
 assert.ok(readBank('real_estate_intro').questions[99].prompt.startsWith('손익분기비율(BER)'));
 assert.ok(rows[225-157].explanation.includes('중복계산'));
 assert.ok(!rows[298-157].choices.includes('종합자본환원율'));
 assert.ok(rows[296-157].prompt.includes('정액법'));
}

// v2.17 civil-law independent audit, all 300 questions.
{
 const bank=readBank('civil_law');
 assert.equal(bank.questions.length,300);
 for(let i=0;i<300;i++){
  const q=bank.questions[i];
  assert.equal(q.id,'BLANK-02-'+String(i+1).padStart(3,'0'));
  assert.equal(q.choices.length,4,q.id);
  assert.equal(q.choices.filter(x=>x===q.answer).length,1,q.id);
  assert.equal(new Set(q.choices).size,4,q.id);
  assert.ok(q.explanation.length>10,q.id);
 }
 assert.ok(bank.questions[7].choices.includes('대리행위의 하자'));
 assert.ok(bank.questions[28].explanation.includes('제264조'));
 assert.ok(bank.questions[51].explanation.includes('제640조'));
 assert.ok(bank.questions[69].explanation.includes('환산보증금'));
 assert.ok(bank.questions[204].explanation.includes('제3자'));
 assert.ok(!bank.questions[246].choices.includes('계약갱신요구권'));
 assert.ok(bank.questions[280].explanation.includes('환산보증금'));
}

// v2.18: independent audit of 300 brokerage-law blanks.
{
 const qs=readBank('brokerage_law').questions;
 assert.equal(qs.length,300);
 for(let n=1;n<=300;n++){
  const q=qs[n-1];
  assert.equal(q.id,'BLANK-03-'+String(n).padStart(3,'0'));
  assert.equal(q.choices.length,4,q.id);
  assert.equal(q.choices.filter(x=>x===q.answer).length,1,q.id);
  assert.equal(new Set(q.choices).size,4,q.id);
  assert.ok(q.explanation.length>=18,q.id);
 }
 assert.ok(qs[17].choices.includes('14일'));
 assert.ok(qs[45].explanation.includes('2026년 8월 28일'));
 assert.ok(qs[49].explanation.includes('제41조'));
 assert.ok(qs[58].explanation.includes('15일'));
 assert.ok(qs[59].explanation.includes('대체토지'));
 assert.ok(qs[171].choices.includes('중개의뢰인'));
 assert.ok(!qs[171].choices.includes('법인인 개업공인중개사'));
 assert.ok(!qs[190].choices.includes('법인인 개업공인중개사'));
 assert.ok(qs[259].explanation.includes('설립한다'));
 assert.ok(qs[296].explanation.includes('대체토지'));
 assert.ok(qs[299].explanation.includes('대체토지'));
}

// v2.19: all 300 public-law blanks, changed key ambiguous pairs.
{
 const qs=readBank('public_law').questions;
 assert.equal(qs.length,300);
 for(let n=1;n<=300;n++){
  const q=qs[n-1];
  assert.equal(q.id,'BLANK-04-'+String(n).padStart(3,'0'));
  assert.equal(q.choices.length,4,q.id);
  assert.equal(q.choices.filter(x=>x===q.answer).length,1,q.id);
  assert.equal(new Set(q.choices).size,4,q.id);
 }
 assert.ok(qs[87].choices.includes('계획관리지역'));
 assert.ok(!qs[88].choices.includes('상업지역'));
 assert.ok(!qs[122].choices.includes('도시개발조합'));
 assert.ok(!qs[123].choices.includes('도시개발조합'));
 assert.ok(!qs[127].choices.includes('환지방식'));
 assert.ok(!qs[136].choices.includes('환지방식'));
 assert.ok(!qs[146].choices.includes('공공기관'));
 assert.ok(!qs[228].choices.includes('건축설비'));
 assert.ok(!qs[229].choices.includes('관리사무소'));
 assert.ok(!qs[231].choices.includes('어린이놀이터'));
 assert.ok(qs[152].prompt.includes('통칭'));
 assert.ok(qs[164].prompt.includes('확충하는 유형'));
}

// v2.20: independently reviewed registration-law blanks with exact answer lock.
{
 const rows=readBank('registration_law').questions;
 assert.equal(rows.length,220);
 for(let n=1;n<=220;n++){
  const q=rows[n-1];
  assert.equal(q.id,'BLANK-05-'+String(n).padStart(3,'0'));
  assert.equal(q.choices.length,4,q.id);
  assert.equal(q.choices.filter(v=>v===q.answer).length,1,q.id);
  assert.equal(new Set(q.choices).size,4,q.id);
 }
 assert.ok(rows[54].explanation.includes('등기관'));
 assert.ok(!rows[105].choices.includes('전'));
 assert.ok(!rows[142].choices.includes('부동산가격'));
 assert.ok(!rows[150].choices.includes('등기 순서'));
 assert.ok(!rows[151].choices.includes('등기 순서'));
 assert.ok(!rows[177].choices.includes('상속'));
 assert.ok(!rows[190].choices.includes('최고액'));
 assert.ok(!rows[193].choices.includes('저당권'));
 assert.ok(!rows[200].choices.includes('지역권'));
 assert.ok(rows[200].explanation.includes('점유권'));
}

// v2.21: tax law 180-item independent audit, including one statutory answer correction.
{
 const tax=readBank('tax_law').questions;
 assert.equal(tax.length,180);
 for(let i=0;i<180;i++){
  const q=tax[i];
  assert.equal(q.choices.length,4,q.id);
  assert.equal(q.choices.filter(v=>v===q.answer).length,1,q.id);
  assert.equal(new Set(q.choices).size,4,q.id);
  assert.ok(q.explanation.length>15,q.id);
 }
 assert.equal(tax[113].id,'EXP-06-114');
 assert.equal(tax[113].answer,'등록을 하는 자');
 assert.equal(tax[113].choices.indexOf(tax[113].answer),1);
 assert.ok(tax[113].explanation.includes('제24조'));
 assert.ok(tax[62].prompt.includes('경마·경륜'));
 assert.ok(tax[63].prompt.includes('자동차의 소유'));
 assert.ok(tax[68].prompt.includes('자동차의 소유'));
 assert.ok(!tax[87].choices.includes('상속'));
 assert.ok(!tax[163].choices.includes('등록'));
 assert.ok(!tax[165].choices.includes('취득자'));
 assert.ok(!tax[171].choices.includes('과세표준'));
 assert.ok(tax[47].explanation.includes('60%'));
 assert.ok(tax[45].explanation.includes('12억원'));
}
const html=fs.readFileSync(path.join(ROOT,'word-quiz/index.html'),'utf8');
assert.ok(!html.includes('blank-bank-builder.js'));
assert.ok(!html.includes('../summary/'));
assert.match(html,/\?v=\d{8}-core-v\d+/);
assert.ok(html.includes('20261010-blank-v30'));
assert.ok(html.includes('blank-session.js?v=20261010-blank-v30'));
assert.ok(html.includes('answerSummarySection'));
assert.ok(html.includes('blank-quiz.js?v=20261010-blank-v30'));
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
