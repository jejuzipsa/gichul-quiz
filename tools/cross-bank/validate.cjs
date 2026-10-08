const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {ROOT,MANIFEST,compileSubject}=require('../core-bank/compile.cjs');
const {TARGETS,readBank}=require('../blank-bank/validate.cjs');
const subjects=Object.keys(MANIFEST.subjects);
const normalize=x=>String(x??'').normalize('NFKC').replace(/\s/g,'');
let coreTotal=0,blankTotal=0,sharedTrueDistractors=0,matchedContexts=0,reviewCandidates=[];
const specialCore={
  REK076:'부동산투자회사(REITs)',
  BRK030:'중개의뢰인'
};
for(const subject of subjects){
  const core=compileSubject(subject);
  const blank=readBank(subject);
  assert.equal(blank.questions.length,TARGETS[subject],subject+': V2 count');
  const map=new Map(core.questions.map(q=>[q.id,q]));
  const allCoreAnswers=new Set(core.questions.map(q=>normalize(q.choices[q.answer])));
  const ids=new Set(),prompts=new Set();
  for(const q of core.questions){
    assert.equal(q.choices.length,4,q.id+': four choices');
    assert.ok(q.answer>=0&&q.answer<4,q.id+': valid key');
    assert.equal(new Set(q.choices.map(normalize)).size,4,q.id+': unique alternatives');
    const distractorIsTrueElsewhere=q.choices.some((x,i)=>i!==q.answer&&allCoreAnswers.has(normalize(x)));
    if(distractorIsTrueElsewhere){
      sharedTrueDistractors++;
      assert.ok(!q.question.endsWith('에 대한 설명으로 옳은 것은?'),
        q.id+': multiple factually true distractors require explicit concept matching, not pure truth test');
    }
    coreTotal++;
  }
  const matched=new Set();
  for(const q of blank.questions){
    assert.ok(map.has(q.originQuestionId),q.id+': missing source concept');
    const origin=map.get(q.originQuestionId);
    matched.add(q.originQuestionId);
    assert.ok(!ids.has(q.id),q.id+': duplicate ID');ids.add(q.id);
    const p=normalize(q.prompt);
    assert.ok(!prompts.has(p),q.id+': duplicate question');prompts.add(p);
    assert.equal(q.choices.filter(x=>x===q.answer).length,1,q.id+': exactly one keyed answer');
    const answerParts=q.blankValues?Object.values(q.blankValues[q.answer]||{}):[q.answer];
    const basis=normalize([origin.question,origin.choices[origin.answer],origin.explanation,origin.term].join(' '));
    if(answerParts.some(part=>part.length>=3&&!basis.includes(normalize(part))))
      reviewCandidates.push({id:q.id,origin:q.originQuestionId,subject});
    blankTotal++;
  }
  assert.equal(matched.size,core.questions.length,subject+': 100% core-origin coverage');
}
assert.equal(coreTotal,485,'expected core 485');
assert.equal(blankTotal,1600,'expected blanks 1600');
{
  const re=readBank('real_estate_intro').questions.find(q=>q.id==='BLANK-01-076');
  assert.equal(re.originQuestionId,'REK076');
  assert.equal(re.answer,'부동산투자회사(REITs)');
  assert.ok(!re.choices.includes('부동산투자신탁(REITs)'));
}
{
  const b=readBank('brokerage_law').questions;
  const q=b.find(x=>x.id==='BLANK-03-030');
  const person=b.find(x=>x.id==='BLANK-03-180');
  assert.equal(q.originQuestionId,'BRK030');
  assert.equal(person.originQuestionId,'BRK030');
  assert.equal(q.answer,'중개의뢰인 신분확인');
  assert.ok(q.prompt.includes('중개의뢰인'));
  assert.equal(person.answer,'중개의뢰인');
  assert.equal(person.choices.filter(c=>c===person.answer).length,1);
  assert.ok(!person.choices.includes('거래당사자'));
}
// v1.95 statute-specific distractor regression: these seven are truth tests, not terminology matching.
{
  const civil=compileSubject('civil_law').questions;
  const byId=new Map(civil.map(q=>[q.id,q]));
  const allTrue=new Set(civil.map(q=>normalize(q.choices[q.answer])));
  const expected=new Map([
    ['CVK001',{answer:0,article:'제103조'}],
    ['CVK002',{answer:3,article:'제104조'}],
    ['CVK003',{answer:0,article:'제107조'}],
    ['CVK004',{answer:3,article:'제108조'}],
    ['CVK005',{answer:0,article:'제109조'}],
    ['CVK006',{answer:0,article:'제110조'}],
    ['CVK007',{answer:1,article:'제111조'}]
  ]);
  for(const [id,spec] of expected){
    const q=byId.get(id);
    assert.ok(q,id+': must survive source compilation');
    assert.equal(q.answer,spec.answer,id+': preserve canonical answer index');
    assert.equal(q.sourceLaw,'민법',id+': source law');
    assert.equal(q.sourceArticle,spec.article,id+': verified statute');
    assert.match(q.question,/에 관한 설명으로 옳은 것은\?$/,id+': same-topic true/false form');
    assert.ok(q.explanation.includes('민법 '+spec.article),id+': grounded explanation');
    assert.equal(q.verifiedAt,'2026-10-09',id+': individual legal review date');
    for(let i=0;i<q.choices.length;i++){
      if(i!==q.answer) assert.ok(!allTrue.has(normalize(q.choices[i])),id+': do not recycle another card correct statement');
    }
  }
}
// v1.97: thirteen civil agency/invalidity provisions require a single true answer
// on the same statutory topic; numeric answer position and base question ID are stable.
{
  const civil=compileSubject('civil_law').questions;
  const truth=new Set(civil.map(q=>normalize(q.choices[q.answer])));
  const expected=[
    ['CVK008','제114조',0],['CVK009','제115조',0],
    ['CVK010','제116조',3],['CVK011','제118조',1],
    ['CVK012','제125조',0],['CVK013','제126조',0],
    ['CVK014','제129조',2],['CVK015','제130조',0],
    ['CVK016','제131조',1],['CVK017','제133조',1],
    ['CVK018','제134조',2],['CVK019','제137조',3],
    ['CVK020','제146조',2]
  ];
  for(const [id,article,answerIndex] of expected){
    const q=civil.find(q=>q.id===id);
    assert.ok(q,id+': required civil law card');
    assert.equal(q.answer,answerIndex,id+': preserve original answer position');
    assert.equal(q.sourceLaw,'민법',id+': official statute');
    assert.equal(q.sourceArticle,article,id+': correct provision');
    assert.match(q.question,/에 관한 설명으로 옳은 것은\?$/,id+': same-topic truth test');
    assert.ok(q.explanation.includes('민법 '+article),id+': statute identified in explanation');
    assert.equal(q.verifiedAt,'2026-10-09',id+': verified date');
    assert.equal(q.reviewedAt,'2026-10-09',id+': reviewed date');
    assert.equal(new Set(q.choices.map(normalize)).size,4,id+': distinct answer choices');
    for(let i=0;i<4;i++) if(i!==q.answer){
      assert.ok(!truth.has(normalize(q.choices[i])),id+': no factual truth copied as incorrect option');
    }
  }
}
{
  const civilBlanks=readBank('civil_law').questions;
  const expected=new Map([
    ['BLANK-02-093',{answer:'도달주의',article:'제111조'}],
    ['BLANK-02-094',{answer:'영향이 없다',article:'제111조'}],
    ['BLANK-02-298',{answer:'제3자',article:'제548조'}]
  ]);
  for(const [id,spec] of expected){
    const q=civilBlanks.find(x=>x.id===id);
    assert.ok(q,id+': reviewed supplementary blank');
    assert.equal(q.answer,spec.answer,id+': unchanged correct choice');
    assert.equal(q.choices.filter(x=>x===q.answer).length,1,id+': exactly one correct choice');
    assert.ok(q.explanation.includes('민법 '+spec.article),id+': explanation addresses statutory basis');
  }
}
// v1.98: 민법 물권법 CVK021~038의 정답 위치 보존 및 참인 타개념 오답 재사용 방지.
{
  const civil=compileSubject('civil_law').questions;
  const byId=new Map(civil.map(q=>[q.id,q]));
  const truth=new Set(civil.map(q=>normalize(q.choices[q.answer])));
  const expected=[
    ['CVK021','제185조',2],['CVK022','제186조',1],
    ['CVK023','제187조',2],['CVK024','제192조',1],
    ['CVK025','제197조',1],['CVK026','제245조제1항',2],
    ['CVK027','제245조제2항',1],['CVK028','제262조',2],
    ['CVK029','제264조',3],['CVK030','제265조',1],
    ['CVK031','제279조',3],['CVK032','제291조',0],
    ['CVK033','제303조',0],['CVK034','제312조',1],
    ['CVK035','제320조',1],['CVK036','제321조',0],
    ['CVK037','제356조',3],['CVK038','제357조',0]
  ];
  const auditedIds=new Set(expected.map(x=>x[0]));
  for(const [id,article,answer] of expected){
    const q=byId.get(id);
    assert.ok(q,id+': missing reviewed civil property card');
    assert.equal(q.sourceLaw,'민법',id+': statute basis');
    assert.equal(q.sourceArticle,article,id+': provision');
    assert.equal(q.answer,answer,id+': preserved answer index');
    assert.match(q.question,/에 관한 설명으로 옳은 것은\?$/,id+': statute-specific truth question');
    assert.ok(q.explanation.includes('민법 '+article.replace('제245조제','제245조 제')),id+': explanatory provision');
    assert.equal(q.verifiedAt,'2026-10-09',id+': direct review date');
    assert.equal(q.reviewedAt,'2026-10-09',id+': wording review date');
    assert.equal(q.choices.length,4,id+': option count');
    assert.equal(new Set(q.choices.map(normalize)).size,4,id+': unique options');
    for(let i=0;i<4;i++){
      if(i!==answer) assert.ok(!truth.has(normalize(q.choices[i])),id+': cannot reuse a factual correct answer from elsewhere');
    }
  }

  // These archived source snapshots do not compile into the runtime question;
  // require them to stay in sync with the canonical source of truth.
  const source=fs.readFileSync(path.join(ROOT,'review/blank-bank-v2/02_civil_law_final.txt'),'utf8');
  const {parseBlocks,parseBlock}=require('../blank-bank/compile-v2.cjs');
  let count=0;
  for(const raw of parseBlocks(source)){
    const record=parseBlock(raw);
    if(!auditedIds.has(record.originQuestionId)) continue;
    const q=byId.get(record.originQuestionId);
    assert.equal(record.sourceQuestion,q.question,record.id+': original question snapshot drift');
    const k='[원본 정답]';
    assert.ok(raw.includes(k),record.id+': missing original answer snapshot');
    assert.equal(raw.slice(raw.indexOf(k)+k.length).trim(),q.choices[q.answer],record.id+': original answer snapshot drift');
    count++;
  }
  assert.equal(count,75,'all 75 property-origin derived quiz source snapshots audited');
}
// v1.99: contract-law questions are same-topic truth tests with immutable answer keys.
{
  const byId=new Map(compileSubject('civil_law').questions.map(q=>[q.id,q]));
  const trueAnswers=new Set([...byId.values()].map(q=>normalize(q.choices[q.answer])));
  const expected=[
    ['CVK039','제536조',0],['CVK040','제537조',1],
    ['CVK041','제539조',0],['CVK042','제544조',3],
    ['CVK043','제545조',2],['CVK044','제548조',2],
    ['CVK045','제550조',3],['CVK046','제565조',0],
    ['CVK047','제563조',1],['CVK048','제568조',3],
    ['CVK049','제618조',3],['CVK050','제623조',0],
    ['CVK051','제626조',1],['CVK052','제640조',2]
  ];
  const ids=new Set(expected.map(x=>x[0]));
  for(const [id,law,correct] of expected){
    const q=byId.get(id);
    assert.ok(q,id+': reviewed law question must exist');
    assert.equal(q.sourceLaw,'민법',id+': law source');
    assert.equal(q.sourceArticle,law,id+': article');
    assert.equal(q.answer,correct,id+': preserved answer position');
    assert.match(q.question,/에 관한 설명으로 옳은 것은\?$/,id+': same-topic question');
    assert.ok(q.explanation.includes('민법 '+law),id+': law cited in explanation');
    assert.equal(q.verifiedAt,'2026-10-09',id+': individual verification date');
    assert.equal(new Set(q.choices.map(normalize)).size,4,id+': distinct options');
    for(let i=0;i<4;i++)if(i!==correct)
      assert.ok(!trueAnswers.has(normalize(q.choices[i])),id+': incorrect choice cannot be another correct claim');
  }
  const {parseBlock,parseBlocks}=require('../blank-bank/compile-v2.cjs');
  const source=fs.readFileSync(path.join(ROOT,'review/blank-bank-v2/02_civil_law_final.txt'),'utf8');
  let count=0;
  for(const raw of parseBlocks(source)){
    const b=parseBlock(raw);
    if(!ids.has(b.originQuestionId))continue;
    const q=byId.get(b.originQuestionId);
    assert.equal(b.sourceQuestion,q.question,b.id+': source question should match');
    const label='[원본 정답]';
    assert.ok(raw.includes(label),b.id+': missing source answer');
    assert.equal(raw.slice(raw.indexOf(label)+label.length).trim(),q.choices[q.answer],b.id+': canonical answer snapshot');
    count++;
  }
  assert.equal(count,57,'contract law blank-bank source snapshots reviewed');
}
// v2.00: eight housing-lease decisions must be statute-specific truth tests;
 // preserve all 73 civil source IDs/keys, the 합유/총유 distinction, and 38 source snapshots.
{
  const bank=compileSubject('civil_law').questions;
  const byId=new Map(bank.map(q=>[q.id,q]));
  const trueStatements=new Set(bank.map(q=>normalize(q.choices[q.answer])));
  const expected=[
    ['CVK053','제3조',0],['CVK054','제3조',0],
    ['CVK055','제3조의2',3],['CVK056','제4조',1],
    ['CVK057','제6조',3],['CVK058','제6조제3항',1],
    ['CVK059','제6조의2',3],['CVK060','제6조의3',3]
  ];
  for(const [id,article,answerIndex] of expected){
    const q=byId.get(id);
    assert.ok(q,id+': must exist');
    assert.equal(q.sourceLaw,'주택임대차보호법',id+': exact law');
    assert.equal(q.sourceArticle,article,id+': law article');
    assert.equal(q.answer,answerIndex,id+': answer index preserved');
    assert.match(q.question,/에 관한 설명으로 옳은 것은\?$/,id+': same-topic truth form');
    assert.ok(q.explanation.includes('주택임대차보호법 '+article.replace('제6조제','제6조 제')),id+': law cited in explanation');
    assert.equal(q.reviewedAt,'2026-10-09',id+': reviewed date');
    assert.equal(q.verifiedAt,'2026-10-09',id+': legal verification date');
    for(let i=0;i<q.choices.length;i++)if(i!==q.answer)
      assert.ok(!trueStatements.has(normalize(q.choices[i])),id+': cannot reuse another correct statement');
  }
  const joint=byId.get('CVK065');
  assert.equal(joint.answer,0,'joint ownership correct index');
  assert.equal(joint.sourceArticle,'제271조');
  assert.ok(!joint.choices.some((c,i)=>i!==joint.answer&&c.includes('법인이 아닌 사단의 사원이 집합체')),'총유 true definition not distractor');
  assert.ok(joint.explanation.includes('민법 제271조'),'joint ownership distinction explained');
  assert.equal(joint.verifiedAt,'2026-10-09');

  const source=fs.readFileSync(path.join(ROOT,'review/blank-bank-v2/02_civil_law_final.txt'),'utf8');
  const {parseBlocks,parseBlock}=require('../blank-bank/compile-v2.cjs');
  const ids=new Set([...expected.map(x=>x[0]),'CVK065']);
  let count=0;
  for(const raw of parseBlocks(source)){
    const b=parseBlock(raw);
    if(!ids.has(b.originQuestionId))continue;
    const q=byId.get(b.originQuestionId);
    assert.equal(b.sourceQuestion,q.question,b.id+': stale copied source question');
    const tag='[원본 정답]';
    assert.ok(raw.includes(tag),b.id+': missing source answer');
    assert.equal(raw.slice(raw.indexOf(tag)+tag.length).trim(),q.choices[q.answer],b.id+': stale copied source answer');
    count++;
  }
  assert.equal(count,38,'all 38 linked housing/joint ownership source snapshots');
  const untouched=['CVK061','CVK062','CVK063','CVK064','CVK066','CVK067','CVK068','CVK069','CVK070','CVK071','CVK072','CVK073'];
  for(const id of untouched){
    const q=byId.get(id);
    assert.ok(q&&q.choices.length===4&&q.answer>=0&&q.answer<4,id+': valid reviewed unchanged card');
    assert.equal(new Set(q.choices.map(normalize)).size,4,id+': no duplicate choices');
  }
}
// v1.96: parent/child actor terms must not form two factually true alternatives.
{
  const brokerage=readBank('brokerage_law').questions;
  for(const [id,answer,index] of [['BLANK-03-132','개업공인중개사',2],['BLANK-03-184','개업공인중개사',0]]){
    const q=brokerage.find(item=>item.id===id);
    assert.ok(q,id+': verified choice conflict regression');
    assert.equal(q.answer,answer,id+': preserve correct answer');
    assert.equal(q.choices.indexOf(answer),index,id+': preserve answer index');
    assert.ok(!q.choices.includes('법인인 개업공인중개사'),id+': subtype is not an incorrect alternative');
    assert.equal(new Set(q.choices.map(normalize)).size,4,id+': four distinct alternatives');
    assert.ok(q.explanation.includes('개업공인중개사'),id+': identify legal obligor');
  }
}
console.log('core/blank cross-audit OK: '+coreTotal+' core + '+blankTotal+' derived; '+sharedTrueDistractors+' core questions reuse a true statement for another concept.');
console.log('Potential extended-source semantic review: '+reviewCandidates.length+' derived blanks use words not stated verbatim in original prompt/correct/explanation; not automatically errors.');
if(process.argv.includes('--details'))console.log(JSON.stringify(reviewCandidates,null,2));
