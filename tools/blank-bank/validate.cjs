const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ROOT = path.resolve(__dirname, '../..');
const TARGETS = {real_estate_intro:300,civil_law:300,brokerage_law:300,public_law:300,registration_law:220,tax_law:180};
const norm = s => String(s ?? '').normalize('NFKC').replace(/\s/g, '');
function fingerprint(q) {
  return crypto.createHash('sha256').update(JSON.stringify([q.id,q.prompt,q.answer,q.choices,q.explanation,q.source])).digest('hex');
}
function validate(bank, subject, release=false) {
  const errors=[];
  const fail=s=>errors.push(`${subject}: ${s}`);
  if (!Object.hasOwn(TARGETS,subject)) return ['Unknown subject'];
  if (!bank || !Array.isArray(bank.questions)) return [`${subject}: missing bank`];
  if (bank.questions.length!==TARGETS[subject] || bank.targetCount!==TARGETS[subject] || bank.generatedCount!==bank.questions.length) fail('count mismatch');
  const ids=new Set(), prompts=new Set();
  for (const q of bank.questions) {
    for (const key of ['id','subject','prompt','answer','explanation','source']) if(typeof q[key]!=='string'||!q[key].trim()) fail(`${q.id}: empty ${key}`);
    if(q.type!=='blank') fail(`${q.id}: invalid type`);
    if((String(q.prompt).match(/\{\{blank\}\}/g)||[]).length!==1) fail(`${q.id}: blank count`);
    for(const [set,value,label] of [[ids,q.id,'ID'],[prompts,norm(q.prompt),'prompt']]) {
      if(set.has(value)) fail(`${q.id}: duplicate ${label}`);
      set.add(value);
    }
    if(!Array.isArray(q.choices)||q.choices.length!==4||q.choices.some(x=>typeof x!=='string'||!x.trim())||new Set(q.choices.map(norm)).size!==4||q.choices.filter(x=>x===q.answer).length!==1) fail(`${q.id}: invalid choices/answer`);
    if(release) {
      const r=q.review||{};
      if(r.wording!=='approved'||r.contentHash!==fingerprint(q)) fail(`${q.id}: wording review missing/stale`);
      if(subject!=='real_estate_intro' && (r.legal!=='approved'||!/^\d{4}-\d{2}-\d{2}$/.test(r.asOf||'')||!Array.isArray(r.references)||!r.references.length)) fail(`${q.id}: legal review missing`);
      if(r.references?.some(x=>!x.url?.startsWith('https://')||!x.article||!x.effectiveDate)) fail(`${q.id}: incomplete reference`);
    }
  }
  if(release && bank.reviewStatus!=='approved') fail('bank review pending');
  return errors;
}
function readBank(subject) { return JSON.parse(fs.readFileSync(path.join(ROOT,'review/blank-bank',subject+'.json'),'utf8')); }
if(require.main===module) {
  const release=process.argv.includes('--release');
  let errors=[], total=0;
  for(const subject of Object.keys(TARGETS)) {
    const bank=readBank(subject);errors.push(...validate(bank,subject,release));total+=bank.questions.length;
    const ctx={window:{}};vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(path.join(ROOT,'word-quiz/blank-data',subject+'.js'),'utf8'),ctx);
    if(JSON.stringify(ctx.window.BLANK_QUIZ_BANK)!==JSON.stringify(bank)) errors.push(subject+': static mirror differs');
    console.log(`${subject}: ${bank.questions.length}/${TARGETS[subject]}, wording approved ${bank.questions.filter(q=>q.review?.wording==='approved').length}, legal approved ${bank.questions.filter(q=>q.review?.legal==='approved').length}`);
  }
  console.log(`Total: ${total}/1600; ${release?'release':'structure'} errors: ${errors.length}`);
  if(errors.length){console.error(errors.slice(0,25).join('\n'));process.exitCode=1;}
}
module.exports={TARGETS,ROOT,fingerprint,validate,readBank};
