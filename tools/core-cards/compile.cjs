const fs=require('node:fs');
const path=require('node:path');

const ROOT=path.resolve(__dirname,'../..');
const REVIEW_DIR=path.join(ROOT,'review/core-cards-v1');
const SOURCE_PATH=path.join(REVIEW_DIR,'01_real_estate_intro.txt');
const OUT_PATH=path.join(ROOT,'core-cards/data.js');
const MANIFEST=JSON.parse(fs.readFileSync(path.join(REVIEW_DIR,'manifest.json'),'utf8'));
const SEP='================================================================================';

function meta(block,name){
  const m=block.match(new RegExp('^'+name+':\\s*(.*)$','m'));
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
function parse(){
  const text=fs.readFileSync(SOURCE_PATH,'utf8');
  if(!/^CORE_WORD_CARDS_V1\s*$/m.test(text.split(SEP,1)[0])) throw new Error('missing CORE_WORD_CARDS_V1 header');
  const blocks=text.split(SEP).map(x=>x.trim()).filter(x=>/^ID:\s*/m.test(x));
  const cards=blocks.map(block=>{
    const id=meta(block,'ID');
    return {
      id,
      status:meta(block,'STATUS'),
      order:Number(meta(block,'ORDER')),
      type:meta(block,'TYPE'),
      category:meta(block,'CATEGORY'),
      sourceKind:meta(block,'SOURCE_KIND')||'summary',
      sourcePage:Number(meta(block,'SOURCE_PAGE')),
      sourceSection:meta(block,'SOURCE_SECTION'),
      sourceRef:meta(block,'SOURCE_REF'),
      title:section(block,'[제목]',['[부제]']),
      subtitle:section(block,'[부제]',['[검색어]']),
      aliases:section(block,'[검색어]',['[핵심]']).split('|').map(x=>x.trim()).filter(Boolean),
      bullets:parseBullets(section(block,'[핵심]',['[수식]'])),
      formula:section(block,'[수식]',['[시각화]']),
      visual:section(block,'[시각화]',['[검수메모]'])||'none',
      sourceNote:section(block,'[검수메모]',[])
    };
  }).filter(card=>card.status==='APPROVED').sort((a,b)=>a.order-b.order);

  return {
    version:MANIFEST.version,
    source:MANIFEST.sourcePdf,
    subjects:[
      {code:'real_estate_intro',name:'부동산학개론'},
      {code:'civil_law',name:'민법 및 민사특별법',disabled:true},
      {code:'brokerage_law',name:'공인중개사법령 및 중개실무',disabled:true},
      {code:'public_law',name:'부동산공법',disabled:true},
      {code:'registration_law',name:'부동산공시법',disabled:true},
      {code:'tax_law',name:'부동산세법',disabled:true}
    ],
    cards:cards.map(card=>({
      id:card.id,
      subject:'real_estate_intro',
      order:card.order,
      type:card.type,
      category:card.category,
      title:card.title,
      subtitle:card.subtitle,
      bullets:card.bullets,
      formula:card.formula||'',
      visual:card.visual||'none',
      aliases:card.aliases||[],
      sourceKind:card.sourceKind||'summary',
      sourcePage:card.sourcePage,
      sourceSection:card.sourceSection,
      sourceRef:card.sourceRef||'',
      sourceNote:card.sourceNote||'',
      sourceLabel:card.sourceKind==='summary'
        ? '부동산학개론 요약집 p'+card.sourcePage+' · '+card.sourceSection
        : (card.sourceRef||card.sourceSection)
    }))
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
module.exports={ROOT,REVIEW_DIR,SOURCE_PATH,OUT_PATH,MANIFEST,parse,output};
