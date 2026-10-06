const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {TARGETS,ROOT,validate,readBank}=require('./validate.cjs');

const ctx={window:{}};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT,'word-quiz/blank-bank-validator.js'),'utf8'),ctx);

let checks=0;
for(const subject of Object.keys(TARGETS)) {
  const bank=readBank(subject);

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
    b=>b.questions[0].originQuestionId='UNKNOWN-CORE-ID'
  ]) {
    const broken=structuredClone(bank);
    mutate(broken);
    assert.ok(validate(broken,subject).length);
    if(!validate(broken,subject).length) throw new Error('Broken bank unexpectedly passed: '+subject);
    checks+=1;
  }
}

const html=fs.readFileSync(path.join(ROOT,'word-quiz/index.html'),'utf8');
assert.ok(!html.includes('blank-bank-builder.js'));
assert.ok(!html.includes('../summary/'));
assert.ok(html.includes('20261006-core-v2'));
assert.ok(html.includes('20261006-audit-v1'));
checks+=4;

console.log(`${checks} checks passed (all six subjects; release approval, corruption, core drift, no runtime PDF generation).`);
