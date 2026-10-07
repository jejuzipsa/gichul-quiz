const fs=require('node:fs');
const path=require('node:path');

const ROOT=path.resolve(__dirname,'../..');
const REVIEW_DIR=path.join(ROOT,'review/core-cards-v1');
const MANIFEST=JSON.parse(fs.readFileSync(path.join(REVIEW_DIR,'manifest.json'),'utf8'));
const OUT_PATH=path.join(ROOT,MANIFEST.generatedOutput||'core-cards/data.js');
const SEP='================================================================================';

function meta(block,name){
  const m=block.match(new RegExp('^'+name+':[ \t]*(.*)$','m'));
  return m?m[1].trim():'';
}
function section(block,label,nextLabels=[]){
  const start=block.indexOf(label);
  if(start<0) return '';
  const from=start+label.length;
  let end=block.length;
  for(const next of nextLabels){
    const p=block.indexOf(next,from);
    if(p>=0&&p<end) end=p;
  }
  return block.slice(from,end).trim();
}
function parseBullets(raw){
  return raw.split(/\r?\n/).map(x=>x.trim()).filter(Boolean).map(line=>{
    if(!line.startsWith('- ')) throw new Error('malformed bullet: '+line);
    return line.slice(2).trim();
  });
}
function parseList(raw){
  return String(raw||'').split('|').map(x=>x.trim()).filter(Boolean);
}
function subjectConfigs(){
  if(Array.isArray(MANIFEST.subjects)) return MANIFEST.subjects;
  return [MANIFEST];
}
function parseExamQuestions(config){
  if(!config.examSourceFile) return [];
  const p=path.join(ROOT,config.examSourceFile);
  if(!fs.existsSync(p)) return [];
  const text=fs.readFileSync(p,'utf8');
  return text.split(SEP).filter(b=>/^ID:\s*/m.test(b)).map(b=>({
    id:meta(b,'ID'),
    year:Number(meta(b,'YEAR')),
    text:(section(b,'[문제]',['[보기]'])+'\n'+section(b,'[보기]',['[정답]'])).replace(/\s+/g,' ')
  }));
}
function fallbackBasis(card){
  const stored=card.basisStored.filter(x=>x!=='exam');
  if(stored.length) return stored[0];
  return card.sourceKind==='summary'||card.sourceKind==='summary+official' ? 'summary' : 'essential';
}
function computeImportance(hit,base){
  if(hit>=10) return 5;
  if(hit>=5) return 4;
  if(hit>=1) return 3;
  return base==='summary'?2:1;
}
function computeExamStats(card,questions){
  const keys=[card.title,...card.aliases,...card.examKeywords].filter(Boolean);
  const matched=questions.filter(q=>keys.some(k=>q.text.includes(k)));
  const years=[...new Set(matched.map(q=>q.year).filter(Boolean))].sort((a,b)=>a-b);
  const base=fallbackBasis(card);
  return {
    examHitCount:matched.length,
    examYears:years,
    examSampleRefs:matched.slice(0,10).map(q=>q.id),
    basis:matched.length?[...new Set(['exam',base])]:[base],
    importance:computeImportance(matched.length,base)
  };
}
function parseSource(config){
  const sourcePath=path.join(ROOT,config.sourceFile);
  const text=fs.readFileSync(sourcePath,'utf8');
  if(!/^CORE_WORD_CARDS_V1\s*$/m.test(text.split(SEP,1)[0])) throw new Error('missing CORE_WORD_CARDS_V1 header: '+config.sourceFile);
  const questions=parseExamQuestions(config);
  const blocks=text.split(SEP).map(x=>x.trim()).filter(x=>/^ID:\s*/m.test(x));
  return blocks.map(block=>{
    const card={
      id:meta(block,'ID'),
      status:meta(block,'STATUS'),
      order:Number(meta(block,'ORDER')),
      type:meta(block,'TYPE'),
      category:meta(block,'CATEGORY'),
      basisStored:parseList(meta(block,'BASIS')),
      examHitCountStored:Number(meta(block,'EXAM_HIT_COUNT')||0),
      examYearsStored:parseList(meta(block,'EXAM_YEARS')).map(Number).filter(Boolean),
      examSampleRefsStored:String(meta(block,'EXAM_SAMPLE_REFS')||'').split('|').map(x=>x.trim()).filter(Boolean),
      importanceStored:Number(meta(block,'IMPORTANCE')||0),
      sourceKind:meta(block,'SOURCE_KIND')||'summary',
      sourcePage:Number(meta(block,'SOURCE_PAGE')),
      sourceSection:meta(block,'SOURCE_SECTION'),
      sourceRef:meta(block,'SOURCE_REF'),
      title:section(block,'[제목]',['[부제]']),
      subtitle:section(block,'[부제]',['[검색어]']),
      aliases:parseList(section(block,'[검색어]',['[핵심]'])),
      examKeywords:parseList(meta(block,'EXAM_KEYWORDS')),
      bullets:parseBullets(section(block,'[핵심]',['[수식]'])),
      formula:section(block,'[수식]',['[시각화]']),
      visual:section(block,'[시각화]',['[검수메모]'])||'none',
      sourceNote:section(block,'[검수메모]',[]),
      subject:config.subject
    };
    Object.assign(card,computeExamStats(card,questions));
    return card;
  }).filter(card=>card.status==='APPROVED').sort((a,b)=>a.order-b.order);
}
function parse(){
  const configs=subjectConfigs();
  const cards=configs.flatMap(parseSource);
  const catalog=[
    ['real_estate_intro','부동산학개론'],
    ['civil_law','민법 및 민사특별법'],
    ['brokerage_law','공인중개사법령 및 중개실무'],
    ['public_law','부동산공법'],
    ['registration_law','부동산공시법'],
    ['tax_law','부동산세법']
  ];
  const enabled=new Set(configs.filter(x=>x.status==='complete').map(x=>x.subject));
  return {
    version:MANIFEST.version,
    sources:configs.map(x=>x.sourcePdf),
    subjects:catalog.map(([code,name])=>({code,name,disabled:!enabled.has(code)})),
    cards:cards.map(card=>{
      const config=configs.find(x=>x.subject===card.subject);
      return {
        id:card.id,subject:card.subject,order:card.order,type:card.type,category:card.category,
        title:card.title,subtitle:card.subtitle,bullets:card.bullets,formula:card.formula||'',
        visual:card.visual||'none',aliases:card.aliases||[],sourceKind:card.sourceKind||'summary',
        sourcePage:card.sourcePage,sourceSection:card.sourceSection,sourceRef:card.sourceRef||'',
        sourceNote:card.sourceNote||'',basis:card.basis,examHitCount:card.examHitCount,
        examYears:card.examYears,examSampleRefs:card.examSampleRefs,importance:card.importance,
        sourceLabel:card.sourceKind==='summary'
          ? config.label+' 요약집 p'+card.sourcePage+' · '+card.sourceSection
          : (card.sourceRef||card.sourceSection)
      };
    })
  };
}
function output(bank){
  return 'window.CORE_WORD_CARD_BANK = '+JSON.stringify(bank,null,2)+';\n';
}
function run(){
  const bank=parse();
  const text=output(bank);
  if(process.argv.includes('--write')) fs.writeFileSync(OUT_PATH,text);
  if(process.argv.includes('--check')||!process.argv.includes('--write')){
    if(!fs.existsSync(OUT_PATH)||fs.readFileSync(OUT_PATH,'utf8')!==text){
      console.error('core-cards/data.js differs from TXT Source of Truth');
      process.exitCode=1;
      return;
    }
  }
  console.log('Core word cards compiled: '+bank.cards.length);
}
if(require.main===module) run();
module.exports={ROOT,REVIEW_DIR,OUT_PATH,MANIFEST,SEP,meta,section,parseList,subjectConfigs,parseExamQuestions,fallbackBasis,computeImportance,computeExamStats,parseSource,parse,output};
