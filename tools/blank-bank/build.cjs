// This serializes edited questions only. It never mines summary text or fills quotas.
const fs=require('node:fs');
const path=require('node:path');
const {TARGETS,ROOT,validate,readBank}=require('./validate.cjs');
const draft=process.argv.includes('--draft');
const banks=Object.entries(TARGETS).map(([subject])=>[subject,readBank(subject)]);
const errors=banks.flatMap(([subject,bank])=>validate(bank,subject,!draft));
if(errors.length){console.error(errors.slice(0,25).join('\n'));process.exit(1);}
for(const [subject,bank] of banks) fs.writeFileSync(path.join(ROOT,'word-quiz/blank-data',subject+'.js'),'window.BLANK_QUIZ_BANK='+JSON.stringify(bank)+';\n');
console.log(draft?'Draft snapshots written; NOT approved for release.':'Approved snapshots written.');
