const fs=require('node:fs');
const path=require('node:path');

const ROOT=path.resolve(__dirname,'../..');
const REVIEW_DIR=path.join(ROOT,'review/past-exams-v1');
const DATA_DIR=path.join(ROOT,'data');
const MANIFEST=JSON.parse(fs.readFileSync(path.join(REVIEW_DIR,'manifest.json'),'utf8'));
const SEP='================================================================================';

function headerMeta(text){
  const head=text.split(SEP,1)[0];
  if(!/^PAST_EXAMS_V1\s*$/m.test(head)) throw new Error('missing PAST_EXAMS_V1 header');
  const out={};
  for(const line of head.split(/\r?\n/)){
    const m=line.match(/^([A-Z_]+):\s*(.*)$/);
    if(m) out[m[1]]=m[2].trim();
  }
  return out;
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
  return text.split(SEP).map(x=>x.trim()).filter(x=>/^ID:\s*/m.test(x));
}

function parseChoices(block,id){
  const raw=section(block,'[보기]',['[정답]']);
  const lines=raw.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
  const choices=[];
  for(const line of lines){
    const m=line.match(/^([1-5])\.\s*(.*)$/);
    if(!m) throw new Error(id+': malformed choice line '+line);
    const n=Number(m[1]);
    if(n!==choices.length+1) throw new Error(id+': choice order error at '+line);
    choices.push(m[2].trim());
  }
  return choices;
}

function parseAnswer(raw,id){
  const parts=String(raw).split(',').map(x=>x.trim()).filter(Boolean);
  if(!parts.length) throw new Error(id+': empty answer');
  const nums=parts.map(Number);
  if(nums.some(x=>!Number.isInteger(x)||x<1||x>5)) throw new Error(id+': invalid answer '+raw);
  if(new Set(nums).size!==nums.length) throw new Error(id+': duplicate answer '+raw);
  return nums.length===1?nums[0]:nums;
}

function parseBlock(block,subject){
  const meta=name=>(block.match(new RegExp('^'+name+':\\s*(.*)$','m'))||[])[1]?.trim()||'';
  const id=meta('ID');
  return {
    id,
    status:meta('STATUS'),
    subject,
    year:Number(meta('YEAR')),
    exam:Number(meta('EXAM')),
    paper:meta('PAPER'),
    question_number:Number(meta('QUESTION_NUMBER')),
    question:section(block,'[문제]',['[보기]']),
    choices:parseChoices(block,id),
    answer:parseAnswer(section(block,'[정답]',['[해설]']),id),
    explanation:section(block,'[해설]',[])
  };
}

function compileSubject(subjectKey){
  const cfg=MANIFEST.subjects[subjectKey];
  if(!cfg) throw new Error('unknown subject '+subjectKey);
  const text=fs.readFileSync(path.join(REVIEW_DIR,cfg.file),'utf8');
  const h=headerMeta(text);
  if(h.SUBJECT_KEY!==subjectKey) throw new Error(subjectKey+': SUBJECT_KEY mismatch');
  if(h.SUBJECT!==cfg.label) throw new Error(subjectKey+': SUBJECT mismatch');
  if(Number(h.COUNT)!==cfg.count) throw new Error(subjectKey+': header COUNT mismatch');
  if(h.FORMAT!=='multiple_choice_5') throw new Error(subjectKey+': FORMAT mismatch');
  if(h.AUDIT_STATUS!=='approved') throw new Error(subjectKey+': AUDIT_STATUS must be approved');

  const rows=parseBlocks(text).map(block=>parseBlock(block,h.SUBJECT));
  if(rows.length!==cfg.count) throw new Error(subjectKey+': source count '+rows.length+' != '+cfg.count);

  const ids=new Set();
  return rows.map(row=>{
    if(row.status!=='APPROVED') throw new Error(row.id+': STATUS must be APPROVED');
    if(!row.id) throw new Error(subjectKey+': missing ID');
    if(ids.has(row.id)) throw new Error(subjectKey+': duplicate ID '+row.id);
    ids.add(row.id);
    const {status,...q}=row;
    return q;
  });
}

function jsonText(rows){
  return JSON.stringify(rows,null,2)+'\n';
}

function jsText(subjectLabel,rows){
  return 'window.SUBJECT_DATA = window.SUBJECT_DATA || {};\n'
    +'window.SUBJECT_DATA['+JSON.stringify(subjectLabel)+'] = '
    +JSON.stringify(rows,null,2)+';\n';
}

function manifestText(compiledBySubject){
  const years=MANIFEST.years.map(Number);
  const items=Object.entries(MANIFEST.subjects).map(([code,cfg])=>({
    code,
    name:cfg.label,
    count:compiledBySubject[code].length,
    years,
    json:'data/'+code+'.json',
    script:'data/'+code+'.js'
  }));
  const label=years.map(y=>y+'년 제'+(y-1989)+'회').join(' + ')+' · 과목별 분리';
  return 'window.SUBJECT_DATA = window.SUBJECT_DATA || {};\n'
    +'window.SUBJECT_MANIFEST = '+JSON.stringify(items,null,2)+';\n'
    +'window.BANK_TOTAL = '+items.reduce((n,x)=>n+x.count,0)+';\n'
    +"window.BANK_LABEL = '"+label.replace(/'/g,"\\'")+"';\n";
}

function run(){
  const write=process.argv.includes('--write');
  const check=process.argv.includes('--check')||!write;
  const errors=[];
  const compiled={};
  let total=0;

  for(const [subjectKey,cfg] of Object.entries(MANIFEST.subjects)){
    try{
      const rows=compileSubject(subjectKey);
      compiled[subjectKey]=rows;
      total+=rows.length;
      const jsonPath=path.join(DATA_DIR,subjectKey+'.json');
      const jsPath=path.join(DATA_DIR,subjectKey+'.js');
      const jt=jsonText(rows);
      const st=jsText(cfg.label,rows);
      if(write){
        fs.writeFileSync(jsonPath,jt);
        fs.writeFileSync(jsPath,st);
      }
      if(check){
        if(!fs.existsSync(jsonPath)||fs.readFileSync(jsonPath,'utf8')!==jt) errors.push(subjectKey+': generated JSON differs from TXT source');
        if(!fs.existsSync(jsPath)||fs.readFileSync(jsPath,'utf8')!==st) errors.push(subjectKey+': generated JS differs from TXT source');
      }
      console.log(subjectKey+': '+rows.length+' questions');
    }catch(err){
      errors.push(subjectKey+': '+err.message);
    }
  }

  if(Object.keys(compiled).length===Object.keys(MANIFEST.subjects).length){
    const mt=manifestText(compiled);
    const mp=path.join(DATA_DIR,'manifest.js');
    if(write) fs.writeFileSync(mp,mt);
    if(check&&(!fs.existsSync(mp)||fs.readFileSync(mp,'utf8')!==mt)) errors.push('manifest.js differs from TXT source');
  }

  if(total!==MANIFEST.total) errors.push('total '+total+' != '+MANIFEST.total);
  console.log('Total: '+total+'; errors: '+errors.length);
  if(errors.length){
    console.error(errors.join('\n'));
    process.exitCode=1;
  }
}

if(require.main===module) run();
module.exports={ROOT,REVIEW_DIR,DATA_DIR,MANIFEST,headerMeta,parseBlocks,parseBlock,compileSubject,jsonText,jsText,manifestText};
