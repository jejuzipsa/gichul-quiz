const {parse,subjectConfigs}=require('./compile.cjs');
const bank=parse(), cards=bank.cards, configs=subjectConfigs();
const titleMap=new Map(), rows=[], errors=[];
for(const card of cards){
  const title=card.title.trim();
  if(!titleMap.has(title)) titleMap.set(title,[]);
  titleMap.get(title).push(card);
  if(!title||!card.subtitle.trim()||!card.bullets.length) errors.push(card.id+': missing learning content');
  if(card.examHitCount>=10 && title.length<=3) rows.push([card.id,card.subject,title,card.examHitCount,'COMMON_TERM_REVIEW']);
  if(/(?:\\d+[,.]?\\d*\\s*(?:%|퍼센트|억원|만원|일|개월|년|시간))/.test(card.bullets.join(' ')) &&
     ['tax_law','brokerage_law','public_law','registration_law'].includes(card.subject)){
    rows.push([card.id,card.subject,title,card.examHitCount,'LEGAL_NUMBER_REVIEW']);
  }
}
const overlaps=[...titleMap.entries()].filter(([,v])=>new Set(v.map(x=>x.subject)).size>1);
for(const [title,group] of overlaps) rows.push([group.map(c=>c.id).join('|'),group.map(c=>c.subject).join('|'),title,'','CROSS_SUBJECT_REVIEW']);
for(const config of configs){
  const subject=cards.filter(c=>c.subject===config.subject);
  if(subject.length!==config.total) errors.push(config.subject+': expected '+config.total+' got '+subject.length);
}
if(process.argv.includes('--json')){
  console.log(JSON.stringify({total:cards.length,overlaps:overlaps.length,manualReview:rows.map(([id,subject,title,hits,reason])=>({id,subject,title,hits,reason})),errors},null,2));
}else{
  console.log('Core cards: '+cards.length);
  console.log('Cross-subject same titles: '+overlaps.length);
  console.log('Manual-review flags: '+rows.length);
  console.log('Structural errors: '+errors.length);
  rows.forEach(r=>console.log(r.join(' / ')));
}
if(errors.length) process.exitCode=1;
