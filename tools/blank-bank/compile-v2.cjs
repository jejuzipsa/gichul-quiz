const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const ROOT=path.resolve(__dirname,'../..');
const MANIFEST=JSON.parse(fs.readFileSync(path.join(ROOT,'review/blank-bank-v2/manifest.json'),'utf8'));

const SUBJECTS={
  real_estate_intro:{label:'부동산학개론',target:300,files:['01_real_estate_intro_final.txt']},
  civil_law:{label:'민법 및 민사특별법',target:300,files:['02_civil_law_final.txt']},
  brokerage_law:{label:'공인중개사법령 및 중개실무',target:300,files:['03_brokerage_law_final.txt']},
  public_law:{label:'부동산공법',target:300,files:['04_public_law_final.txt']},
  registration_law:{label:'부동산공시법',target:220,files:['05_registration_law_final.txt']},
  tax_law:{
    label:'부동산세법',target:180,
    files:['06_tax_law.txt','06_tax_law_expansion_part1.txt','06_tax_law_expansion_part2.txt','06_tax_law_expansion_part3.txt']
  }
};

const REVIEW_DIR=path.join(ROOT,'review/blank-bank-v2');
const OUTPUT_REVIEW=path.join(ROOT,'review/blank-bank');
const OUTPUT_STATIC=path.join(ROOT,'word-quiz/blank-data');
const norm=s=>String(s??'').normalize('NFKC').replace(/\s/g,'');

function readCore(subject){
  const ctx={window:{}};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT,'word-quiz/data',subject+'.js'),'utf8'),ctx);
  return JSON.parse(JSON.stringify(ctx.window.WORD_QUIZ_BANK));
}

function section(block,label,nextLabels){
  const start=block.indexOf(label);
  if(start<0) return '';
  const from=start+label.length;
  let end=block.length;
  for(const next of nextLabels){
    const pos=block.indexOf(next,from);
    if(pos>=0&&pos<end) end=pos;
  }
  return block.slice(from,end).trim();
}

function parseBlocks(text){
  return text.split('================================================================================')
    .map(x=>x.trim())
    .filter(x=>/^ID:/m.test(x));
}

function parseBlock(block){
  const meta=name=>(block.match(new RegExp('^'+name+':\\s*(.+)$','m'))||[])[1]?.trim()||'';
  const prompt=section(block,'[문제]',['[보기]']);
  const choiceLines=section(block,'[보기]',['[정답]']).split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
  const choices=choiceLines.map(x=>x.replace(/^\d+\.\s*/,'').trim());
  const answerNo=Number(section(block,'[정답]',['[빈칸 정답]']));
  const blankLines=section(block,'[빈칸 정답]',['[해설]']).split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
  const blanks={};
  for(const line of blankLines){
    const m=line.match(/^([A-Z])\s*=\s*(.+)$/);
    if(!m) throw new Error(meta('ID')+': malformed blank value '+line);
    blanks[m[1]]=m[2].trim();
  }
  return {
    id:meta('ID'),originQuestionId:meta('ORIGIN'),status:meta('STATUS'),
    type:meta('TYPE'),category:meta('CATEGORY'),prompt,choices,answerNo,blanks,
    explanation:section(block,'[해설]',['[원본 핵심개념 문제]']),
    sourceQuestion:section(block,'[원본 핵심개념 문제]',['[원본 정답]'])
  };
}

function compilePrompt(raw,keys){
  let count=0;
  const prompt=raw.replace(/\(\s*([A-Z])\s*\)/g,(_,key)=>{
    count++;
    if(keys.length===1) return '{{blank}}';
    return '{{blank:'+key+'}}';
  });
  if(count!==keys.length) throw new Error('blank marker mismatch: '+raw);
  return prompt;
}

function compileQuestion(row,subject,label,asOf){
  if(row.status!=='APPROVED') throw new Error(row.id+': not approved');
  if(row.choices.length!==4) throw new Error(row.id+': expected 4 choices');
  if(!Number.isInteger(row.answerNo)||row.answerNo<1||row.answerNo>4) throw new Error(row.id+': invalid answer number');
  const keys=Object.keys(row.blanks);
  if(keys.length<1||keys.length>3) throw new Error(row.id+': expected 1-3 blanks');
  const expected=keys.map(k=>row.blanks[k]).join(' / ');
  const answer=row.choices[row.answerNo-1];
  if(answer!==expected) throw new Error(row.id+': answer does not match blank values');
  const prompt=compilePrompt(row.prompt,keys);
  const q={
    id:row.id,
    type:'blank',
    subject:label,
    category:row.category,
    prompt,
    answer,
    choices:row.choices,
    explanation:row.explanation,
    source:'V2 검수은행 · '+row.originQuestionId,
    originQuestionId:row.originQuestionId,
    review:{
      wording:'approved',
      legal:subject==='real_estate_intro'?'not-applicable':'approved',
      references:[]
    }
  };
  if(subject!=='real_estate_intro') q.review.asOf=asOf;
  if(keys.length>1){
    q.blankValues={};
    for(const choice of row.choices){
      const parts=choice.split(/\s*\/\s*/);
      if(parts.length!==keys.length) throw new Error(row.id+': choice does not map to all blanks: '+choice);
      q.blankValues[choice]={};
      keys.forEach((key,i)=>q.blankValues[choice][key]=parts[i]);
    }
  }
  return q;
}

function compileSubject(subject){
  const cfg=SUBJECTS[subject];
  if(!cfg) throw new Error('unknown subject '+subject);
  const rows=[];
  for(const file of cfg.files){
    const text=fs.readFileSync(path.join(REVIEW_DIR,file),'utf8');
    rows.push(...parseBlocks(text).map(parseBlock));
  }
  if(rows.length!==cfg.target) throw new Error(subject+': source count '+rows.length+' != '+cfg.target);
  const ids=new Set(),prompts=new Set();
  const core=readCore(subject);
  const subjectMeta=MANIFEST.subjects[subject]||{};
  const asOf=subjectMeta.review?.legalCheckpoint||MANIFEST.finalAudit?.date||'2026-10-07';
  const questions=rows.map(row=>{
    if(ids.has(row.id)) throw new Error(subject+': duplicate ID '+row.id);
    ids.add(row.id);
    const q=compileQuestion(row,subject,cfg.label,asOf);
    const key=norm(q.prompt);
    if(prompts.has(key)) throw new Error(subject+': duplicate prompt '+q.id);
    prompts.add(key);
    return q;
  });
  const coreIds=new Set(core.questions.map(q=>q.id));
  for(const q of questions) if(!coreIds.has(q.originQuestionId)) throw new Error(q.id+': unknown origin '+q.originQuestionId);
  return {
    version:'blank-v2-2026-10-07-v1',
    subject:cfg.label,
    targetCount:cfg.target,
    generatedCount:questions.length,
    reviewStatus:'approved',
    sourceStrategy:'검수용 TXT V2의 승인 문항을 사이트용 정적 문제은행으로 컴파일',
    questions,
    auditDate:MANIFEST.finalAudit?.date||'2026-10-07',
    coreVersion:core.version,
    coreAuditDate:core.auditDate
  };
}

function jsonText(bank){return JSON.stringify(bank,null,2)+'\n';}
function staticText(bank){return 'window.BLANK_QUIZ_BANK='+JSON.stringify(bank)+';\n';}

function run(){
  const write=process.argv.includes('--write');
  const check=process.argv.includes('--check')||!write;
  let total=0,errors=[];
  for(const subject of Object.keys(SUBJECTS)){
    try{
      const bank=compileSubject(subject);
      total+=bank.questions.length;
      const reviewPath=path.join(OUTPUT_REVIEW,subject+'.json');
      const staticPath=path.join(OUTPUT_STATIC,subject+'.js');
      if(write){
        fs.writeFileSync(reviewPath,jsonText(bank));
        fs.writeFileSync(staticPath,staticText(bank));
      }
      if(check){
        if(!fs.existsSync(reviewPath)||fs.readFileSync(reviewPath,'utf8')!==jsonText(bank)) errors.push(subject+': review JSON differs from V2 source');
        if(!fs.existsSync(staticPath)||fs.readFileSync(staticPath,'utf8')!==staticText(bank)) errors.push(subject+': static JS differs from V2 source');
      }
      console.log(subject+': '+bank.questions.length+'/'+SUBJECTS[subject].target);
    }catch(err){errors.push(subject+': '+err.message);}
  }
  console.log('Total: '+total+'/1600; errors: '+errors.length);
  if(errors.length){console.error(errors.slice(0,40).join('\n'));process.exitCode=1;}
}

if(require.main===module) run();
module.exports={SUBJECTS,compileSubject,parseBlock,parseBlocks};
