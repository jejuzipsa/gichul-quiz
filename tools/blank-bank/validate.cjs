const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '../..');
const TARGETS = {real_estate_intro:300,civil_law:300,brokerage_law:300,public_law:300,registration_law:220,tax_law:180};
const norm = s => String(s ?? '').normalize('NFKC').replace(/\s/g, '');
const markerRe = /\{\{blank(?::([A-Z]))?\}\}/g;
function markerKeys(prompt) {
  const matches=[...String(prompt??'').matchAll(markerRe)];
  if(matches.length===1 && !matches[0][1]) return ['A'];
  return matches.map(m=>m[1]||'');
}
function validateBlankShape(q, fail) {
  const keys=markerKeys(q.prompt);
  if(keys.length<1||keys.length>3) { fail(`${q.id}: blank count`); return; }
  if(keys.length>1 && (keys.some(k=>!k)||new Set(keys).size!==keys.length||keys.join('')!=='ABC'.slice(0,keys.length))) {
    fail(`${q.id}: invalid named blanks`); return;
  }

  const withoutMarkers=String(q.prompt||'').replace(markerRe,'');
  const expectedValues=keys.length===1?[q.answer]:keys.map(key=>q.blankValues?.[q.answer]?.[key]);
  if(expectedValues.some(value=>typeof value==='string'&&value.length>=2&&withoutMarkers.includes(value))) fail(`${q.id}: answer is visible outside blank markers`);
  if(String(q.prompt).length>150) fail(`${q.id}: prompt too long`);
  if((q.choices||[]).some(x=>String(x).length>55)) fail(`${q.id}: choice too long`);
  if(keys.length===1) {
    if(q.blankValues!=null) fail(`${q.id}: unexpected blankValues`);
    if(String(q.answer||'').length>35) fail(`${q.id}: blank answer too long`);
    return;
  }
  if(!q.blankValues||typeof q.blankValues!=='object'||Array.isArray(q.blankValues)) { fail(`${q.id}: missing blankValues`); return; }
  for(const choice of q.choices||[]) {
    const values=q.blankValues[choice];
    if(!values||typeof values!=='object') { fail(`${q.id}: blankValues missing choice`); continue; }
    const parts=[];
    for(const key of keys) {
      const value=values[key];
      if(typeof value!=='string'||!value.trim()) fail(`${q.id}: empty blankValues ${key}`);
      if(String(value||'').length>35) fail(`${q.id}: blank value too long ${key}`);
      parts.push(value);
    }
    if(Object.keys(values).sort().join('')!==keys.slice().sort().join('')) fail(`${q.id}: blankValues keys mismatch`);
    if(parts.join(' / ')!==choice) fail(`${q.id}: blankValues do not match choice`);
  }
}

function readBank(subject) {
  return JSON.parse(fs.readFileSync(path.join(ROOT,'review/blank-bank',subject+'.json'),'utf8'));
}
function readCore(subject) {
  const ctx={window:{}};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT,'word-quiz/data',subject+'.js'),'utf8'),ctx);
  return JSON.parse(JSON.stringify(ctx.window.WORD_QUIZ_BANK));
}
function validate(bank, subject, release=false) {
  const errors=[];
  const fail=s=>errors.push(`${subject}: ${s}`);
  if (!Object.hasOwn(TARGETS,subject)) return ['Unknown subject'];
  if (!bank || !Array.isArray(bank.questions)) return [`${subject}: missing bank`];
  if (bank.questions.length!==TARGETS[subject] || bank.targetCount!==TARGETS[subject] || bank.generatedCount!==bank.questions.length) fail('count mismatch');

  const core=readCore(subject);
  const coreIds=new Set(core.questions.map(q=>q.id));
  const ids=new Set(), prompts=new Set();

  for (const q of bank.questions) {
    for (const key of ['id','subject','prompt','answer','explanation','source','originQuestionId']) {
      if(typeof q[key]!=='string'||!q[key].trim()) fail(`${q.id}: empty ${key}`);
    }
    if(q.type!=='blank') fail(`${q.id}: invalid type`);
    validateBlankShape(q,fail);
    for(const [set,value,label] of [[ids,q.id,'ID'],[prompts,norm(q.prompt),'prompt']]) {
      if(set.has(value)) fail(`${q.id}: duplicate ${label}`);
      set.add(value);
    }
    if(!Array.isArray(q.choices)||q.choices.length!==4||q.choices.some(x=>typeof x!=='string'||!x.trim())||new Set(q.choices.map(norm)).size!==4||q.choices.filter(x=>x===q.answer).length!==1) fail(`${q.id}: invalid choices/answer`);
    if(!coreIds.has(q.originQuestionId)) fail(`${q.id}: unknown core origin ${q.originQuestionId}`);

    if(release) {
      const rv=q.review||{};
      if(rv.wording!=='approved') fail(`${q.id}: wording review missing`);
      if(subject!=='real_estate_intro' && rv.legal!=='approved') fail(`${q.id}: legal review missing`);
      if(subject!=='real_estate_intro' && !/^\d{4}-\d{2}-\d{2}$/.test(rv.asOf||'')) fail(`${q.id}: legal review date missing`);
    }
  }

  if(bank.coreVersion!==core.version) fail(`core version mismatch: ${bank.coreVersion||'none'} != ${core.version}`);
  if(bank.coreAuditDate!==core.auditDate) fail(`core audit date mismatch: ${bank.coreAuditDate||'none'} != ${core.auditDate||'none'}`);
  if(release && core.auditStatus!=='approved') fail('core bank audit not approved');
  if(release && bank.reviewStatus!=='approved') fail('bank review pending');
  return errors;
}

if(require.main===module) {
  const release=process.argv.includes('--release');
  let errors=[], total=0;
  for(const subject of Object.keys(TARGETS)) {
    const bank=readBank(subject);
    errors.push(...validate(bank,subject,release));
    total+=bank.questions.length;
    const ctx={window:{}};
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(path.join(ROOT,'word-quiz/blank-data',subject+'.js'),'utf8'),ctx);
    if(JSON.stringify(ctx.window.BLANK_QUIZ_BANK)!==JSON.stringify(bank)) errors.push(subject+': static mirror differs');
    console.log(`${subject}: ${bank.questions.length}/${TARGETS[subject]}, review ${bank.reviewStatus||'pending'}, core ${bank.coreVersion||'none'}`);
  }
  console.log(`Total: ${total}/1600; ${release?'release':'structure'} errors: ${errors.length}`);
  if(errors.length){console.error(errors.slice(0,40).join('\n'));process.exitCode=1;}
}
module.exports={TARGETS,ROOT,validate,readBank,readCore};
