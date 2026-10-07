const fs=require('node:fs');
const path=require('node:path');
const {ROOT,SEP,meta,section,parseList,subjectConfigs,parseExamQuestions,computeExamStats}=require('./compile.cjs');

function setMeta(block,name,value){
  const re=new RegExp('^'+name+':.*$','m');
  const line=name+': '+value;
  if(re.test(block)) return block.replace(re,line);
  const anchor=/^CATEGORY:.*$/m;
  return anchor.test(block)?block.replace(anchor,m=>m+'\\n'+line):line+'\\n'+block;
}
function parseBlock(block,config){
  const card={
    title:section(block,'[제목]',['[부제]']),
    aliases:parseList(section(block,'[검색어]',['[핵심]'])),
    examKeywords:parseList(meta(block,'EXAM_KEYWORDS')),
    basisStored:parseList(meta(block,'BASIS')),
    sourceKind:meta(block,'SOURCE_KIND')||'summary'
  };
  return card;
}
function refreshed(config){
  const p=path.join(ROOT,config.sourceFile);
  const text=fs.readFileSync(p,'utf8');
  const parts=text.split(SEP);
  const questions=parseExamQuestions(config);
  for(let i=1;i<parts.length;i++){
    if(!/^\\s*ID:/m.test(parts[i])) continue;
    let block=parts[i];
    const card=parseBlock(block,config);
    const stats=computeExamStats(card,questions);
    block=setMeta(block,'BASIS',stats.basis.join('|'));
    block=setMeta(block,'EXAM_HIT_COUNT',String(stats.examHitCount));
    block=setMeta(block,'EXAM_YEARS',stats.examYears.join('|'));
    block=setMeta(block,'EXAM_SAMPLE_REFS',stats.examSampleRefs.join(' | '));
    block=setMeta(block,'IMPORTANCE',String(stats.importance));
    parts[i]=block;
  }
  return {path:p,current:text,next:parts.join(SEP)};
}
function run(){
  let mismatch=false;
  for(const config of subjectConfigs().filter(x=>x.reindexExam)){
    const r=refreshed(config);
    if(process.argv.includes('--write')) fs.writeFileSync(r.path,r.next);
    else if(r.current!==r.next){
      console.error(config.subject+': exam metadata is stale; run node tools/core-cards/reindex.cjs --write');
      mismatch=true;
    }
  }
  if(mismatch) process.exitCode=1;
  else console.log('Core word card exam metadata is current.');
}
if(require.main===module) run();
module.exports={refreshed};
