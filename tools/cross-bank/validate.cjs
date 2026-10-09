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
// v2.01: brokerage definitions and authorizing provisions must have a single
// true statute-specific answer; derived archived originals remain canonical.
{
  const questions=compileSubject('brokerage_law').questions;
  const map=new Map(questions.map(q=>[q.id,q]));
  const allTrue=new Set(questions.map(q=>normalize(q.choices[q.answer])));
  const expected=[
    ['BRK001','제2조',0],['BRK002','제2조',3],
    ['BRK003','제2조',0],['BRK004','제2조',3],
    ['BRK005','제2조',0],['BRK006','제2조',0],
    ['BRK007','제3조',1],['BRK008','제4조',0],
    ['BRK009','제5조',0],['BRK010','제7조',3]
  ];
  const ids=new Set(expected.map(x=>x[0]));
  for(const [id,article,index] of expected){
    const q=map.get(id);
    assert.ok(q,id+': required brokerage card');
    assert.equal(q.sourceLaw,'공인중개사법',id+': official act');
    assert.equal(q.sourceArticle,article,id+': article');
    assert.equal(q.answer,index,id+': original correct index retained');
    assert.match(q.question,/(옳은 것은\?|법적 정의로 옳은 것은\?)$/,id+': truth test heading');
    assert.ok(q.explanation.includes('공인중개사법 '+article),id+': statute in explanation');
    assert.equal(q.verifiedAt,'2026-10-09',id+': legal review');
    assert.equal(q.reviewedAt,'2026-10-09',id+': wording review');
    for(let i=0;i<4;i++)if(i!==q.answer)
      assert.ok(!allTrue.has(normalize(q.choices[i])),id+': do not reuse another true definition as false');
  }
  const source=fs.readFileSync(path.join(ROOT,'review/blank-bank-v2/03_brokerage_law_final.txt'),'utf8');
  const {parseBlocks,parseBlock}=require('../blank-bank/compile-v2.cjs');
  let cnt=0;
  for(const raw of parseBlocks(source)){
    const q=parseBlock(raw);
    if(!ids.has(q.originQuestionId))continue;
    const original=map.get(q.originQuestionId);
    assert.equal(q.sourceQuestion,original.question,q.id+': stale origin question');
    const label='[원본 정답]';
    assert.ok(raw.includes(label),q.id+': missing origin answer');
    assert.equal(raw.slice(raw.indexOf(label)+label.length).trim(),original.choices[original.answer],q.id+': stale origin answer');
    cnt++;
  }
  assert.equal(cnt,50,'brokerage statute definitions should link 50 source snapshots');
}
// v2.02: registration and employment claims (BRK011~020), and 50 archive links.
{
  const questions=compileSubject('brokerage_law').questions;
  const byId=new Map(questions.map(q=>[q.id,q]));
  const trueTexts=new Set(questions.map(q=>normalize(q.choices[q.answer])));
  const entries=[
    ['BRK011','공인중개사법','제9조',1],
    ['BRK012','공인중개사법 시행규칙','제4조',0],
    ['BRK013','공인중개사법 시행령','제13조',0],
    ['BRK014','공인중개사법 시행령','제13조',2],
    ['BRK015','공인중개사법','제13조',0],
    ['BRK016','공인중개사법','제13조',1],
    ['BRK017','공인중개사법','제15조',1],
    ['BRK018','공인중개사법 시행규칙','고용관계 신고 규정',2],
    ['BRK019','공인중개사법','제15조',3],
    ['BRK020','공인중개사법','제18조의4',2]
  ];
  const ids=new Set(entries.map(e=>e[0]));
  for(const [id,law,article,index] of entries){
    const q=byId.get(id);
    assert.ok(q,id+': missing card');
    assert.equal(q.sourceLaw,law,id+': source law unchanged');
    assert.equal(q.sourceArticle,article,id+': source article unchanged');
    assert.equal(q.answer,index,id+': original correct choice');
    assert.match(q.question,/에 관한 설명으로 옳은 것은\?$/,id+': single-topic truth test');
    assert.equal(q.verifiedAt,'2026-10-09',id+': individual review date');
    assert.equal(q.reviewedAt,'2026-10-09',id+': editorial review date');
    assert.equal(q.choices.length,4,id+': four choices');
    assert.equal(new Set(q.choices.map(normalize)).size,4,id+': unique choices');
    for(let i=0;i<4;i++)if(i!==q.answer)
      assert.ok(!trueTexts.has(normalize(q.choices[i])),id+': not an alternative truth copied from another key');
  }
  const {parseBlocks,parseBlock}=require('../blank-bank/compile-v2.cjs');
  const src=fs.readFileSync(path.join(ROOT,'review/blank-bank-v2/03_brokerage_law_final.txt'),'utf8');
  let count=0;
  for(const raw of parseBlocks(src)){
    const row=parseBlock(raw);
    if(!ids.has(row.originQuestionId))continue;
    const source=byId.get(row.originQuestionId),label='[원본 정답]';
    assert.equal(row.sourceQuestion,source.question,row.id+': source prompt snapshot');
    assert.ok(raw.includes(label),row.id+': answer snapshot exists');
    assert.equal(raw.slice(raw.indexOf(label)+label.length).trim(),source.choices[source.answer],row.id+': source answer snapshot');
    count++;
  }
  assert.equal(count,50,'registration/employment 50 blank links');
}
// v2.03: BRK021-030 correct indices and all 50 derived reference snapshots.
{
  const questions=compileSubject('brokerage_law').questions,byId=new Map(questions.map(q=>[q.id,q]));
  const allTrue=new Set(questions.map(q=>normalize(q.choices[q.answer])));
  const keys=[
    ['BRK021','제17조',2],['BRK022','제18조',1],
    ['BRK023','제18조',2],['BRK024','제18조의2',1],
    ['BRK025','제18조의2',1],['BRK026','제23조',2],
    ['BRK027','제24조',1],['BRK028','제25조',0],
    ['BRK029','제25조',3],['BRK030','제25조의2',0]
  ];
  const ids=new Set(keys.map(k=>k[0]));
  for(const [id,article,key] of keys){
    const q=byId.get(id);
    assert.ok(q,id+': required core question');
    assert.equal(q.sourceLaw,'공인중개사법',id+': statute');
    assert.equal(q.sourceArticle,article,id+': article');
    assert.equal(q.answer,key,id+': preserve original answer index');
    assert.match(q.question,/에 관한 설명으로 옳은 것은\?$/,id+': same-topic question');
    assert.ok(q.explanation.includes('공인중개사법 '+article),id+': explanatory law');
    assert.equal(q.verifiedAt,'2026-10-09',id+': legally reviewed date');
    assert.equal(q.reviewedAt,'2026-10-09',id+': question review date');
    assert.equal(new Set(q.choices.map(normalize)).size,4,id+': distinct choices');
    for(let i=0;i<4;i++)if(i!==q.answer)assert.ok(!allTrue.has(normalize(q.choices[i])),id+': no another-concept true answer reused');
  }
  const src=fs.readFileSync(path.join(ROOT,'review/blank-bank-v2/03_brokerage_law_final.txt'),'utf8');
  const {parseBlocks,parseBlock}=require('../blank-bank/compile-v2.cjs');
  let count=0;
  for(const raw of parseBlocks(src)){
    const row=parseBlock(raw),origin=byId.get(row.originQuestionId);
    if(!ids.has(row.originQuestionId))continue;
    assert.equal(row.sourceQuestion,origin.question,row.id+': current source question');
    const marker='[원본 정답]';
    assert.ok(raw.includes(marker),row.id+': archived answer present');
    assert.equal(raw.slice(raw.indexOf(marker)+marker.length).trim(),origin.choices[origin.answer],row.id+': current source answer');
    count++;
  }
  assert.equal(count,50,'BRK021-030 exactly 50 derived source references');
}
// v2.04 brokerage confirmation, contracts, duties and prohibitions.
{
  const bank=compileSubject('brokerage_law').questions;
  const byId=new Map(bank.map(q=>[q.id,q]));
  const trueAnswers=new Set(bank.map(q=>normalize(q.choices[q.answer])));
  const expected=[
    ['BRK031','공인중개사법','제25조의3',0],
    ['BRK032','공인중개사법 시행령','제21조',0],
    ['BRK033','공인중개사법','제26조',0],
    ['BRK034','공인중개사법 시행령','제22조',1],
    ['BRK035','공인중개사법','제26조',1],
    ['BRK036','공인중개사법','제26조',0],
    ['BRK037','공인중개사법','제29조',3],
    ['BRK038','공인중개사법','제29조',1],
    ['BRK039','공인중개사법','제33조',0],
    ['BRK040','공인중개사법','제33조',1]
  ];
  const ids=new Set(expected.map(x=>x[0]));
  for(const [id,law,article,index] of expected){
    const q=byId.get(id);
    assert.ok(q,id+': required reviewed question');
    assert.equal(q.sourceLaw,law,id+': law');
    assert.equal(q.sourceArticle,article,id+': article');
    assert.equal(q.answer,index,id+': original answer index');
    assert.match(q.question,/에 관한 설명으로 옳은 것은\?$/,id+': truth-test question');
    assert.equal(q.verifiedAt,'2026-10-09',id+': individual review');
    assert.equal(q.reviewedAt,'2026-10-09',id+': edited date');
    assert.equal(new Set(q.choices.map(normalize)).size,4,id+': distinct alternatives');
    for(let i=0;i<4;i++)if(i!==index)
      assert.ok(!trueAnswers.has(normalize(q.choices[i])),id+': cannot copy another true answer as an incorrect choice');
  }
  const {parseBlocks,parseBlock}=require('../blank-bank/compile-v2.cjs');
  const source=fs.readFileSync(path.join(ROOT,'review/blank-bank-v2/03_brokerage_law_final.txt'),'utf8');
  let count=0;
  for(const raw of parseBlocks(source)){
    const q=parseBlock(raw);
    if(!ids.has(q.originQuestionId))continue;
    const core=byId.get(q.originQuestionId);
    assert.equal(q.sourceQuestion,core.question,q.id+': canonical source question');
    const tag='[원본 정답]';
    assert.ok(raw.includes(tag),q.id+': source answer snapshot');
    assert.equal(raw.slice(raw.indexOf(tag)+tag.length).trim(),core.choices[core.answer],q.id+': canonical correct statement');
    count++;
  }
  assert.equal(count,50,'all 50 related blank questions have consistent source snapshots');
}
// v2.05: brokerage guarantees, statutory training and association, plus 50 linked source copies.
{
  const bank=compileSubject('brokerage_law').questions,byId=new Map(bank.map(q=>[q.id,q]));
  const truth=new Set(bank.map(q=>normalize(q.choices[q.answer])));
  const expected=[
    ['BRK041','공인중개사법 시행령','제27조의2',0],
    ['BRK042','공인중개사법','제30조',3],
    ['BRK043','공인중개사법 시행령','제24조',2],
    ['BRK044','공인중개사법 시행령','제24조',2],
    ['BRK045','공인중개사법 시행령','제24조',3],
    ['BRK046','공인중개사법 시행령','제28조',0],
    ['BRK047','공인중개사법 시행령','제28조',1],
    ['BRK048','공인중개사법 시행령','제28조',3],
    ['BRK049','공인중개사법 시행령','제28조',3],
    ['BRK050','공인중개사법','제41조',0]
  ];
  const ids=new Set(expected.map(x=>x[0]));
  for(const [id,law,article,correct] of expected){
    const q=byId.get(id);
    assert.ok(q,id+': missing reviewed question');
    assert.equal(q.sourceLaw,law,id+': unchanged source law');
    assert.equal(q.sourceArticle,article,id+': source provision');
    assert.equal(q.answer,correct,id+': original answer');
    assert.match(q.question,/에 관한 설명으로 옳은 것은\?$/,id+': truth question');
    assert.equal(q.verifiedAt,'2026-10-09',id+': reviewed statute');
    assert.equal(q.reviewedAt,'2026-10-09',id+': revised wording');
    assert.equal(q.choices.length,4,id+': choice count');
    assert.equal(new Set(q.choices.map(normalize)).size,4,id+': unique choices');
    for(let i=0;i<4;i++)if(i!==correct)
      assert.ok(!truth.has(normalize(q.choices[i])),id+': copied true answer must not be distractor');
  }
  const source=fs.readFileSync(path.join(ROOT,'review/blank-bank-v2/03_brokerage_law_final.txt'),'utf8');
  const {parseBlocks,parseBlock}=require('../blank-bank/compile-v2.cjs');
  let linked=0;
  for(const raw of parseBlocks(source)){
    const q=parseBlock(raw);
    if(!ids.has(q.originQuestionId))continue;
    const parent=byId.get(q.originQuestionId),mark='[원본 정답]';
    assert.equal(q.sourceQuestion,parent.question,q.id+': source question drift');
    assert.ok(raw.includes(mark),q.id+': source answer missing');
    assert.equal(raw.slice(raw.indexOf(mark)+mark.length).trim(),parent.choices[parent.answer],q.id+': source answer drift');
    linked++;
  }
  assert.equal(linked,50,'BRK041-050 exact fifty linked source copies');
}
// v2.06: final 10 brokerage concepts, their 50 source references and the revised land-permit deadline.
{
  const core=compileSubject('brokerage_law').questions,byId=new Map(core.map(q=>[q.id,q]));
  const trueAnswers=new Set(core.map(q=>normalize(q.choices[q.answer])));
  const expected=[
    ['BRK051','공인중개사법','제41조',1],
    ['BRK052','공인중개사법','제41조',2],
    ['BRK053','공인중개사법','제41조의2',0],
    ['BRK054','공인중개사법','제41조의3',0],
    ['BRK055','공인중개사법','제41조의4',3],
    ['BRK056','부동산 거래신고 등에 관한 법률','제3조',1],
    ['BRK057','부동산 거래신고 등에 관한 법률','제3조',3],
    ['BRK058','부동산 거래신고 등에 관한 법률 시행규칙','제2조',1],
    ['BRK059','부동산 거래신고 등에 관한 법률','제11조',3],
    ['BRK060','부동산 거래신고 등에 관한 법률 시행령','제14조',0]
  ];
  const ids=new Set(expected.map(v=>v[0]));
  for(const [id,law,article,key] of expected){
    const q=byId.get(id);
    assert.ok(q,id+': missing');
    assert.equal(q.sourceLaw,law,id+': wrong source law');
    assert.equal(q.sourceArticle,article,id+': wrong source article');
    assert.equal(q.answer,key,id+': answer location changed');
    assert.match(q.question,/에 관한 설명으로 옳은 것은\?$/,id+': question form');
    assert.equal(q.verifiedAt,'2026-10-09',id+': statute review date');
    assert.equal(q.reviewedAt,'2026-10-09',id+': edited review date');
    assert.equal(q.choices.length,4,id+': four choices');
    assert.equal(new Set(q.choices.map(normalize)).size,4,id+': duplicate choice');
    for(let i=0;i<4;i++)if(i!==key)
      assert.ok(!trueAnswers.has(normalize(q.choices[i])),id+': reused true statement');
  }
  const source=fs.readFileSync(path.join(ROOT,'review/blank-bank-v2/03_brokerage_law_final.txt'),'utf8');
  const {parseBlocks,parseBlock}=require('../blank-bank/compile-v2.cjs');
  let total=0;
  for(const b of parseBlocks(source)){
    const q=parseBlock(b),parent=byId.get(q.originQuestionId);
    if(!ids.has(q.originQuestionId))continue;
    assert.equal(q.sourceQuestion,parent.question,q.id+': source question mismatch');
    const marker='[원본 정답]';
    assert.ok(b.includes(marker),q.id+': missing source answer');
    assert.equal(b.slice(b.indexOf(marker)+marker.length).trim(),parent.choices[parent.answer],q.id+': source answer mismatch');
    total++;
  }
  assert.equal(total,50,'BRK051-060 fifty derived references');
  const derived=readBank('brokerage_law').questions;
  assert.equal(derived.length,300,'brokerage derived count');
  for(const id of ['BLANK-03-059','BLANK-03-293','BLANK-03-294','BLANK-03-295','BLANK-03-296']){
    const q=derived.find(x=>x.id===id);
    assert.ok(q,id+': linked blank missing');
    assert.ok(!/15일/.test(q.prompt+' '+q.explanation),id+': obsolete deadline');
    assert.equal(q.originQuestionId,'BRK059',id+': origin');
  }
  assert.equal(derived.find(x=>x.id==='BLANK-03-059').answer,'「민원 처리에 관한 법률」');
  assert.equal(derived.find(x=>x.id==='BLANK-03-293').answer,'「민원 처리에 관한 법률」');
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
