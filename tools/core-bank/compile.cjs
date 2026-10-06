const fs=require('node:fs');
const path=require('node:path');

const ROOT=path.resolve(__dirname,'../..');
const REVIEW_DIR=path.join(ROOT,'review/core-bank-v1');
const MANIFEST=JSON.parse(fs.readFileSync(path.join(REVIEW_DIR,'manifest.json'),'utf8'));
const SEP='================================================================================';
const norm=s=>String(s??'').normalize('NFKC').replace(/\s/g,'');

function headerMeta(text){
  const head=text.split(SEP,1)[0];
  if(!/^CORE_BANK_V1\s*$/m.test(head)) throw new Error('missing CORE_BANK_V1 header');
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

function parseBlock(block){
  const meta=name=>(block.match(new RegExp('^'+name+':\\s*(.*)$','m'))||[])[1]?.trim()||'';
  const choiceLines=section(block,'[보기]',['[정답]']).split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
  const choices=choiceLines.map((line,i)=>{
    const m=line.match(/^(\d+)\.\s*(.*)$/);
    if(!m||Number(m[1])!==i+1) throw new Error((meta('ID')||'?')+': malformed choice '+line);
    return m[2].trim();
  });
  const answerNo=Number(section(block,'[정답]',['[해설]']));
  return {
    id:meta('ID'),
    status:meta('STATUS'),
    category:meta('CATEGORY'),
    difficulty:meta('DIFFICULTY'),
    term:meta('TERM'),
    sourceSection:meta('SOURCE_SECTION'),
    sourceType:meta('SOURCE_TYPE'),
    sourceLaw:meta('SOURCE_LAW'),
    sourceArticle:meta('SOURCE_ARTICLE'),
    legacyId:meta('LEGACY_ID'),
    curation:meta('CURATION'),
    verifiedAt:meta('VERIFIED_AT'),
    reviewedAt:meta('REVIEWED_AT'),
    question:section(block,'[문제]',['[보기]']),
    choices,
    answerNo,
    explanation:section(block,'[해설]',[])
  };
}

function compileQuestion(row){
  if(row.status!=='APPROVED') throw new Error(row.id+': STATUS must be APPROVED');
  if(!row.id) throw new Error('missing ID');
  if(row.choices.length!==4) throw new Error(row.id+': expected 4 choices');
  if(!Number.isInteger(row.answerNo)||row.answerNo<1||row.answerNo>4) throw new Error(row.id+': invalid answer');
  const q={
    id:row.id,
    conceptId:row.id,
    category:row.category,
    difficulty:row.difficulty
  };
  if(row.term) q.term=row.term;
  q.question=row.question;
  q.choices=row.choices;
  q.answer=row.answerNo-1;
  q.explanation=row.explanation;
  if(row.sourceSection) q.sourceSection=row.sourceSection;
  q.sourceType=row.sourceType;
  if(row.verifiedAt) q.verifiedAt=row.verifiedAt;
  if(row.sourceLaw) q.sourceLaw=row.sourceLaw;
  if(row.sourceArticle) q.sourceArticle=row.sourceArticle;
  q.legacyId=row.legacyId||null;
  if(row.curation) q.curation=row.curation;
  q.reviewedAt=row.reviewedAt;
  return q;
}

function compileSubject(subject){
  const cfg=MANIFEST.subjects[subject];
  if(!cfg) throw new Error('unknown subject '+subject);
  const text=fs.readFileSync(path.join(REVIEW_DIR,cfg.file),'utf8');
  const h=headerMeta(text);
  if(h.SUBJECT_KEY!==subject) throw new Error(subject+': SUBJECT_KEY mismatch');
  if(h.SUBJECT!==cfg.label) throw new Error(subject+': SUBJECT mismatch');
  const rows=parseBlocks(text).map(parseBlock);
  if(rows.length<cfg.baselineCount) throw new Error(subject+': source count '+rows.length+' below baseline '+cfg.baselineCount);
  const ids=new Set(),questions=new Set();
  const compiled=rows.map(row=>{
    if(ids.has(row.id)) throw new Error(subject+': duplicate ID '+row.id);
    ids.add(row.id);
    if(!row.id.startsWith(cfg.idPrefix)) throw new Error(row.id+': invalid ID prefix');
    const q=compileQuestion(row);
    const key=norm(q.question);
    if(questions.has(key)) throw new Error(subject+': duplicate question '+q.id);
    questions.add(key);
    return q;
  });
  const bank={
    version:h.VERSION,
    subject:h.SUBJECT,
    count:compiled.length,
    conceptCount:compiled.length,
    randomPickDefault:Number(h.RANDOM_PICK_DEFAULT||30),
    format:h.FORMAT||'single_choice',
    style:h.STYLE
  };
  if(h.LAW_BASIS_DATE) bank.lawBasisDate=h.LAW_BASIS_DATE;
  bank.sourceNote=h.SOURCE_NOTE;
  bank.questions=compiled;
  bank.auditDate=h.AUDIT_DATE;
  bank.auditStatus=h.AUDIT_STATUS;
  bank.auditNote=h.AUDIT_NOTE;
  return bank;
}

function staticText(bank){
  return 'window.WORD_QUIZ_BANK = '+JSON.stringify(bank,null,2)+';\n';
}

function run(){
  const write=process.argv.includes('--write');
  const check=process.argv.includes('--check')||!write;
  let total=0;
  const errors=[];
  for(const subject of Object.keys(MANIFEST.subjects)){
    try{
      const bank=compileSubject(subject);
      total+=bank.questions.length;
      const out=path.join(ROOT,'word-quiz/data',subject+'.js');
      const text=staticText(bank);
      if(write) fs.writeFileSync(out,text);
      if(check && (!fs.existsSync(out)||fs.readFileSync(out,'utf8')!==text)) {
        errors.push(subject+': generated JS differs from TXT source');
      }
      console.log(subject+': '+bank.questions.length+' questions');
    }catch(err){
      errors.push(subject+': '+err.message);
    }
  }
  console.log('Total: '+total+'; errors: '+errors.length);
  if(errors.length){
    console.error(errors.join('\n'));
    process.exitCode=1;
  }
}

if(require.main===module) run();
module.exports={ROOT,REVIEW_DIR,MANIFEST,headerMeta,parseBlocks,parseBlock,compileQuestion,compileSubject,staticText,norm};
