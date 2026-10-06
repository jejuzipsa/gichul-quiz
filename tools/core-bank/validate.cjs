const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {ROOT,MANIFEST,compileSubject,norm}=require('./compile.cjs');

const dateRe=/^\d{4}-\d{2}-\d{2}$/;

function readRuntime(subject){
  const ctx={window:{}};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT,'word-quiz/data',subject+'.js'),'utf8'),ctx);
  return JSON.parse(JSON.stringify(ctx.window.WORD_QUIZ_BANK));
}

function validate(subject,release=false){
  const cfg=MANIFEST.subjects[subject];
  const bank=compileSubject(subject);
  const errors=[];
  const fail=s=>errors.push(subject+': '+s);

  if(bank.questions.length<cfg.baselineCount) fail('count below baseline');
  if(bank.count!==bank.questions.length||bank.conceptCount!==bank.questions.length) fail('count mismatch');
  if(!bank.version||!bank.subject||!bank.style||!bank.sourceNote) fail('missing bank metadata');
  if(!Number.isInteger(bank.randomPickDefault)||bank.randomPickDefault<1) fail('invalid randomPickDefault');
  if(bank.format!=='single_choice') fail('invalid format');

  const isLaw=subject!=='real_estate_intro';
  if(isLaw&&!dateRe.test(bank.lawBasisDate||'')) fail('lawBasisDate missing/invalid');
  if(!dateRe.test(bank.auditDate||'')) fail('auditDate missing/invalid');
  if(release&&bank.auditStatus!=='approved') fail('auditStatus must be approved');

  const ids=new Set(),questions=new Set();
  for(const q of bank.questions){
    for(const key of ['id','conceptId','category','difficulty','question','explanation','sourceType','reviewedAt']){
      if(typeof q[key]!=='string'||!q[key].trim()) fail((q.id||'?')+': empty '+key);
    }
    if(q.conceptId!==q.id) fail(q.id+': conceptId mismatch');
    if(!q.id.startsWith(cfg.idPrefix)) fail(q.id+': invalid prefix');
    if(ids.has(q.id)) fail(q.id+': duplicate ID'); ids.add(q.id);
    const qkey=norm(q.question);
    if(questions.has(qkey)) fail(q.id+': duplicate question'); questions.add(qkey);
    if(!Array.isArray(q.choices)||q.choices.length!==4||q.choices.some(x=>typeof x!=='string'||!x.trim())) fail(q.id+': invalid choices');
    else if(new Set(q.choices.map(norm)).size!==4) fail(q.id+': duplicate choice');
    if(!Number.isInteger(q.answer)||q.answer<0||q.answer>3) fail(q.id+': invalid answer');
    if(!dateRe.test(q.reviewedAt||'')) fail(q.id+': reviewedAt missing/invalid');
    if(isLaw){
      if(!q.sourceLaw||!q.sourceArticle) fail(q.id+': legal source missing');
      if(!dateRe.test(q.verifiedAt||'')) fail(q.id+': verifiedAt missing/invalid');
    }
  }

  const runtime=readRuntime(subject);
  if(JSON.stringify(runtime)!==JSON.stringify(bank)) fail('runtime JS semantic mismatch');
  return errors;
}

if(require.main===module){
  const release=process.argv.includes('--release');
  let errors=[],total=0;
  for(const subject of Object.keys(MANIFEST.subjects)){
    try{
      const bank=compileSubject(subject);
      total+=bank.questions.length;
      errors.push(...validate(subject,release));
      console.log(subject+': '+bank.questions.length+', '+(release?'release':'structure')+' validation');
    }catch(err){
      errors.push(subject+': '+err.message);
    }
  }
  const baseline=Object.values(MANIFEST.subjects).reduce((n,x)=>n+x.baselineCount,0);
  if(total<baseline) errors.push('total below baseline: '+total+' < '+baseline);
  console.log('Total: '+total+' (baseline '+baseline+'); errors: '+errors.length);
  if(errors.length){
    console.error(errors.join('\n'));
    process.exitCode=1;
  }
}
module.exports={readRuntime,validate};
