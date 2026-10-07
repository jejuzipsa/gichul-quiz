const {parse,MANIFEST,subjectConfigs,parseSource}=require('./compile.cjs');
const errors=[];
const need=(ok,msg)=>{if(!ok)errors.push(msg);};
const bank=parse();
const cards=bank.cards;
const configs=subjectConfigs();
const validTypes=new Set(['term','concept','theory','graph','formula']);
const visualWhitelist=new Set([
  'none','cobweb_overview','cobweb_converge','cobweb_diverge','cobweb_cycle',
  'concentric_city','concentric_zones','sector_city','multi_nuclei',
  'demand_down','supply_up','demand_move','demand_shift','supply_move','supply_shift',
  'elasticity_formula','elastic_demand','inelastic_demand','unit_elastic_demand',
  'perfect_elastic_demand','perfect_inelastic_demand','cashflow_sequence'
]);
const expectedTotal=configs.reduce((n,x)=>n+x.total,0);
need(cards.length===expectedTotal,'approved card count must be '+expectedTotal);

const ids=new Set();
for(const config of configs){
  const list=cards.filter(c=>c.subject===config.subject);
  need(list.length===config.total,config.subject+': count must be '+config.total);
  const orders=new Set(),titles=new Set();
  for(const c of list){
    const prefix=config.subject==='real_estate_intro'?'rei':'civ';
    need(new RegExp('^'+prefix+'-card-\\d{3}$').test(c.id),c.id+': invalid id');
    need(!ids.has(c.id),c.id+': duplicate id'); ids.add(c.id);
    need(Number.isInteger(c.order)&&c.order>=1&&c.order<=config.total,c.id+': invalid order');
    need(!orders.has(c.order),c.id+': duplicate order'); orders.add(c.order);
    need(validTypes.has(c.type),c.id+': invalid type '+c.type);
    need(!!c.category,c.id+': missing category');
    need(!!c.title,c.id+': missing title');
    need(!titles.has(c.title),c.id+': duplicate title '+c.title); titles.add(c.title);
    need(c.title.length<=40,c.id+': title too long');
    need(c.subtitle.length<=90,c.id+': subtitle too long');
    need(Array.isArray(c.bullets)&&c.bullets.length>=1&&c.bullets.length<=5,c.id+': bullets must be 1..5');
    need(c.bullets.every(x=>x.length<=110),c.id+': bullet too long');
    need(c.formula.length<=160,c.id+': formula too long');
    need(visualWhitelist.has(c.visual),c.id+': unknown visual '+c.visual);
    need(['summary','official','summary+official','reference'].includes(c.sourceKind),c.id+': invalid source kind '+c.sourceKind);
    if(c.sourceKind==='summary'){
      need(Number.isInteger(c.sourcePage)&&c.sourcePage>=1&&c.sourcePage<=config.pageCount,c.id+': invalid summary source page');
    }else{
      need(Number.isInteger(c.sourcePage)&&c.sourcePage>=0&&c.sourcePage<=config.pageCount,c.id+': invalid external source page');
      need(!!c.sourceRef,c.id+': external/mixed card missing source ref');
    }
    need(!!c.sourceSection,c.id+': missing source section');
    need(Array.isArray(c.aliases),c.id+': aliases must be array');
    need(c.aliases.every(x=>x.length<=60),c.id+': alias too long');
    need(Number.isInteger(c.examHitCount)&&c.examHitCount>=0,c.id+': invalid exam hit count');
    need(Number.isInteger(c.importance)&&c.importance>=1&&c.importance<=5,c.id+': invalid importance');
  }
  for(let i=1;i<=config.total;i++) need(orders.has(i),config.subject+': missing order '+i);
}

const real=cards.filter(c=>c.subject==='real_estate_intro');
for(const title of ['택지','부지','대지','필지','나지','건부지','맹지','공지','휴한지','선하지','포락지','환지','체비지','일단지']) need(real.some(c=>c.title===title),'basic land card missing: '+title);
need(real.find(c=>c.title==='택지지역')?.aliases.includes('택지구역'),'택지구역 search alias missing');
need(!real.some(c=>c.title.includes('원리금체증식')),'GPM은 원문 오류 의심으로 제외해야 함');
const multi=real.find(c=>c.title==='다핵심이론');
need(!!multi,'다핵심이론 card missing');
need(multi?.subtitle.includes('해리스')&&multi?.subtitle.includes('울만'),'다핵심이론 학자 교정 누락');

const civil=cards.filter(c=>c.subject==='civil_law');
for(const title of ['법률행위','의사표시','통정허위표시','착오','무권대리','표현대리','무효','취소','물권','소유권','등기','점유','취득시효','지상권','전세권','유치권','저당권','계약','동시이행항변권','해제','매매','임대차','주택임대차보호법','상가건물 임대차보호법','가등기담보','구분소유권','명의신탁']) need(civil.some(c=>c.title===title),'civil required card missing: '+title);
need(civil[0]?.title==='법률사실','civil first card must be 법률사실');
need(civil[civil.length-1]?.title==='명의신탁 유형과 효력','civil last card must be 명의신탁 유형과 효력');
need(civil.filter(c=>c.examHitCount>0).length>=150,'civil exam-backed cards should be at least 150');
need(civil.some(c=>c.importance===5),'civil importance 5 cards missing');
need(civil.some(c=>c.importance===1),'civil essential-only cards missing');
need(civil.find(c=>c.title==='계약갱신요구권')?.sourceKind==='official','contract renewal card must use current official source');
need(!civil.find(c=>c.title==='계약갱신요구권')?.bullets.some(x=>/5년|없다/.test(x)),'outdated renewal rule leaked into card');
const civConfig=configs.find(x=>x.subject==='civil_law');
const rawCivil=parseSource(civConfig);
for(const c of rawCivil){
  need(c.basisStored.join('|')===c.basis.join('|'),c.id+': BASIS metadata stale');
  need(c.examHitCountStored===c.examHitCount,c.id+': EXAM_HIT_COUNT stale');
  need(c.examYearsStored.join('|')===c.examYears.join('|'),c.id+': EXAM_YEARS stale');
  need(c.examSampleRefsStored.join('|')===c.examSampleRefs.join('|'),c.id+': EXAM_SAMPLE_REFS stale');
  need(c.importanceStored===c.importance,c.id+': IMPORTANCE stale');
}

console.log('Core word card TXT validation');
console.log('Cards: '+cards.length);
for(const config of configs){
  const list=cards.filter(c=>c.subject===config.subject);
  console.log(config.label+': '+list.length+' / exam-backed '+list.filter(c=>c.examHitCount>0).length);
}
console.log('Errors: '+errors.length);
if(errors.length){console.error(errors.join('\\n'));process.exitCode=1;}
