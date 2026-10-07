const fs=require('node:fs');
const {parse,MANIFEST}=require('./compile.cjs');
const errors=[];
const need=(ok,msg)=>{if(!ok)errors.push(msg);};
const bank=parse();
const cards=bank.cards;
const validTypes=new Set(['term','concept','theory','graph','formula']);
const visualWhitelist=new Set([
  'none','cobweb_overview','cobweb_converge','cobweb_diverge','cobweb_cycle',
  'concentric_city','concentric_zones','sector_city','multi_nuclei',
  'demand_down','supply_up','demand_move','demand_shift','supply_move','supply_shift',
  'elasticity_formula','elastic_demand','inelastic_demand','unit_elastic_demand',
  'perfect_elastic_demand','perfect_inelastic_demand','cashflow_sequence'
]);

need(MANIFEST.subject==='real_estate_intro','manifest subject mismatch');
need(MANIFEST.total===100,'manifest total must be 100');
need(cards.length===100,'approved card count must be 100');

const ids=new Set(),orders=new Set();
for(const c of cards){
  need(/^rei-card-\d{3}$/.test(c.id),c.id+': invalid id');
  need(!ids.has(c.id),c.id+': duplicate id'); ids.add(c.id);
  need(Number.isInteger(c.order)&&c.order>=1&&c.order<=100,c.id+': invalid order');
  need(!orders.has(c.order),c.id+': duplicate order'); orders.add(c.order);
  need(validTypes.has(c.type),c.id+': invalid type '+c.type);
  need(!!c.category,c.id+': missing category');
  need(!!c.title,c.id+': missing title');
  need(c.title.length<=40,c.id+': title too long');
  need(c.subtitle.length<=90,c.id+': subtitle too long');
  need(Array.isArray(c.bullets)&&c.bullets.length>=1&&c.bullets.length<=5,c.id+': bullets must be 1..5');
  need(c.bullets.every(x=>x.length<=110),c.id+': bullet too long');
  need(c.formula.length<=160,c.id+': formula too long');
  need(visualWhitelist.has(c.visual),c.id+': unknown visual '+c.visual);
  need(Number.isInteger(c.sourcePage)&&c.sourcePage>=1&&c.sourcePage<=25,c.id+': invalid source page');
  need(!!c.sourceSection,c.id+': missing source section');
}
for(let i=1;i<=100;i++) need(orders.has(i),'missing order '+i);

const titles=cards.map(c=>c.title);
need(new Set(titles).size===titles.length,'duplicate title');
need(!titles.includes('나지'),'나지는 원문 독립 정의 부재로 보류해야 함');
need(!titles.includes('맹지'),'맹지는 원문 독립 정의 부재로 보류해야 함');
need(!titles.some(x=>x.includes('원리금체증식')),'GPM은 원문 오류 의심으로 제외해야 함');
const multi=cards.find(c=>c.title==='다핵심이론');
need(!!multi,'다핵심이론 card missing');
need(multi?.subtitle.includes('해리스')&&multi?.subtitle.includes('울만'),'다핵심이론 학자 교정 누락');
need(!multi?.title.includes('멕켄지')&&!multi?.subtitle.includes('멕켄지')&&!multi?.bullets.some(x=>x.includes('멕켄지')),'다핵심이론 카드 본문에 교정 전 학자 표기가 남아 있음');

const graphStart=cards.findIndex(c=>c.type==='graph');
const formulaStart=cards.findIndex(c=>c.type==='formula');
need(graphStart>40,'graph cards should be behind simple cards');
need(formulaStart>graphStart,'formula cards should follow graph/theory cards');

console.log('Core word card TXT validation');
console.log('Cards: '+cards.length);
console.log('Types: '+[...validTypes].map(t=>t+'='+cards.filter(c=>c.type===t).length).join(', '));
console.log('Errors: '+errors.length);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
