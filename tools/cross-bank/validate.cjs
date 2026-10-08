const assert=require('node:assert/strict');
const {ROOT,MANIFEST,compileSubject}=require('../core-bank/compile.cjs');
const {TARGETS,readBank}=require('../blank-bank/validate.cjs');
const subjects=Object.keys(MANIFEST.subjects);
const normalize=x=>String(x??'').normalize('NFKC').replace(/\s/g,'');
let coreTotal=0,blankTotal=0,sharedTrueDistractors=0,matchedContexts=0,reviewCandidates=[];
const specialCore={
  REK076:'부동산투자회사(REITs)',
  BRK030:'중개의뢰인'
};
for(const subject of subjects){
  const core=compileSubject(subject);
  const blank=readBank(subject);
  assert.equal(blank.questions.length,TARGETS[subject],subject+': V2 count');
  const map=new Map(core.questions.map(q=>[q.id,q]));
  const allCoreAnswers=new Set(core.questions.map(q=>normalize(q.choices[q.answer])));
  const ids=new Set(),prompts=new Set();
  for(const q of core.questions){
    assert.equal(q.choices.length,4,q.id+': four choices');
    assert.ok(q.answer>=0&&q.answer<4,q.id+': valid key');
    assert.equal(new Set(q.choices.map(normalize)).size,4,q.id+': unique alternatives');
    const distractorIsTrueElsewhere=q.choices.some((x,i)=>i!==q.answer&&allCoreAnswers.has(normalize(x)));
    if(distractorIsTrueElsewhere){
      sharedTrueDistractors++;
      assert.ok(!q.question.endsWith('에 대한 설명으로 옳은 것은?'),
        q.id+': multiple factually true distractors require explicit concept matching, not pure truth test');
    }
    coreTotal++;
  }
  const matched=new Set();
  for(const q of blank.questions){
    assert.ok(map.has(q.originQuestionId),q.id+': missing source concept');
    const origin=map.get(q.originQuestionId);
    matched.add(q.originQuestionId);
    assert.ok(!ids.has(q.id),q.id+': duplicate ID');ids.add(q.id);
    const p=normalize(q.prompt);
    assert.ok(!prompts.has(p),q.id+': duplicate question');prompts.add(p);
    assert.equal(q.choices.filter(x=>x===q.answer).length,1,q.id+': exactly one keyed answer');
    const answerParts=q.blankValues?Object.values(q.blankValues[q.answer]||{}):[q.answer];
    const basis=normalize([origin.question,origin.choices[origin.answer],origin.explanation,origin.term].join(' '));
    if(answerParts.some(part=>part.length>=3&&!basis.includes(normalize(part))))
      reviewCandidates.push({id:q.id,origin:q.originQuestionId,subject});
    blankTotal++;
  }
  assert.equal(matched.size,core.questions.length,subject+': 100% core-origin coverage');
}
assert.equal(coreTotal,485,'expected core 485');
assert.equal(blankTotal,1600,'expected blanks 1600');
{
  const re=readBank('real_estate_intro').questions.find(q=>q.id==='BLANK-01-076');
  assert.equal(re.originQuestionId,'REK076');
  assert.equal(re.answer,'부동산투자회사(REITs)');
  assert.ok(!re.choices.includes('부동산투자신탁(REITs)'));
}
{
  const b=readBank('brokerage_law').questions;
  const q=b.find(x=>x.id==='BLANK-03-030');
  const person=b.find(x=>x.id==='BLANK-03-180');
  assert.equal(q.originQuestionId,'BRK030');
  assert.equal(person.originQuestionId,'BRK030');
  assert.equal(q.answer,'중개의뢰인 신분확인');
  assert.ok(q.prompt.includes('중개의뢰인'));
  assert.equal(person.answer,'중개의뢰인');
  assert.equal(person.choices.filter(c=>c===person.answer).length,1);
  assert.ok(!person.choices.includes('거래당사자'));
}
// v1.95 statute-specific distractor regression: these seven are truth tests, not terminology matching.
{
  const civil=compileSubject('civil_law').questions;
  const byId=new Map(civil.map(q=>[q.id,q]));
  const allTrue=new Set(civil.map(q=>normalize(q.choices[q.answer])));
  const expected=new Map([
    ['CVK001',{answer:0,article:'제103조'}],
    ['CVK002',{answer:3,article:'제104조'}],
    ['CVK003',{answer:0,article:'제107조'}],
    ['CVK004',{answer:3,article:'제108조'}],
    ['CVK005',{answer:0,article:'제109조'}],
    ['CVK006',{answer:0,article:'제110조'}],
    ['CVK007',{answer:1,article:'제111조'}]
  ]);
  for(const [id,spec] of expected){
    const q=byId.get(id);
    assert.ok(q,id+': must survive source compilation');
    assert.equal(q.answer,spec.answer,id+': preserve canonical answer index');
    assert.equal(q.sourceLaw,'민법',id+': source law');
    assert.equal(q.sourceArticle,spec.article,id+': verified statute');
    assert.match(q.question,/에 관한 설명으로 옳은 것은\\?$/,id+': same-topic true/false form');
    assert.ok(q.explanation.includes('민법 '+spec.article),id+': grounded explanation');
    assert.equal(q.verifiedAt,'2026-10-09',id+': individual legal review date');
    for(let i=0;i<q.choices.length;i++){
      if(i!==q.answer) assert.ok(!allTrue.has(normalize(q.choices[i])),id+': do not recycle another card correct statement');
    }
  }
}
console.log('core/blank cross-audit OK: '+coreTotal+' core + '+blankTotal+' derived; '+sharedTrueDistractors+' core questions reuse a true statement for another concept.');
console.log('Potential extended-source semantic review: '+reviewCandidates.length+' derived blanks use words not stated verbatim in original prompt/correct/explanation; not automatically errors.');
if(process.argv.includes('--details'))console.log(JSON.stringify(reviewCandidates,null,2));
