const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {TARGETS,ROOT,validate,readBank,fingerprint}=require('./validate.cjs');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT,'word-quiz/blank-bank-validator.js'),'utf8'),ctx);
let checks=0;
for(const subject of Object.keys(TARGETS)) {
  const bank=readBank(subject);
  assert.deepEqual(validate(bank,subject),[]);
  assert.equal(ctx.window.validateBlankBank(bank,subject),true);
  assert.ok(validate(bank,subject,true).length,'Unreviewed bank must fail release');
  checks+=3;
  for(const mutate of [b=>b.questions.pop(),b=>b.questions[0].answer='',b=>b.questions[0].choices[1]=b.questions[0].choices[0],b=>b.questions[0].choices=['a','b','c','d'],b=>b.questions[1].id=b.questions[0].id,b=>b.questions[1].prompt=b.questions[0].prompt,b=>b.questions[0].prompt+=' {{blank}}',b=>b.questions[0].explanation='']) {
    const broken=structuredClone(bank);mutate(broken);
    assert.ok(validate(broken,subject).length);
    assert.equal(ctx.window.validateBlankBank(broken,subject),false);
    checks+=2;
  }
}
const approved=readBank('real_estate_intro');approved.reviewStatus='approved';
approved.questions.forEach(q=>{q.review.wording='approved';q.review.contentHash=fingerprint(q);});
assert.deepEqual(validate(approved,'real_estate_intro',true),[]);
approved.questions[0].explanation+=' changed';
assert.ok(validate(approved,'real_estate_intro',true).some(x=>x.includes('stale')));checks+=2;
const html=fs.readFileSync(path.join(ROOT,'word-quiz/index.html'),'utf8');
assert.ok(!html.includes('blank-bank-builder.js'));
assert.ok(!html.includes('../summary/'));checks+=2;
console.log(`${checks} checks passed (all six subjects; corruption, stale reviews, no runtime generation).`);
