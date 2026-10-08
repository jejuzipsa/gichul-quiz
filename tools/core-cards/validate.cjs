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
  'perfect_elastic_demand','perfect_inelastic_demand','cashflow_sequence',
  'civil_agency_basic','civil_agency_disclosure','civil_agency_sub','civil_agency_unauthorized',
  'civil_agency_apparent','civil_apparent_125','civil_apparent_126','civil_apparent_129',
  'civil_possession_simple','civil_possession_revision','civil_possession_claim','civil_possession_indirect',
  'civil_apparent_compare','civil_unauthorized_rights'
]);
const expectedTotal=configs.reduce((n,x)=>n+x.total,0);
need(cards.length===expectedTotal,'approved card count must be '+expectedTotal);

const ids=new Set();
for(const config of configs){
  const list=cards.filter(c=>c.subject===config.subject);
  need(list.length===config.total,config.subject+': count must be '+config.total);
  const orders=new Set(),titles=new Set();
  for(const c of list){
    const prefix={real_estate_intro:'rei',civil_law:'civ',brokerage_law:'brk',public_law:'pub',registration_law:'reg',tax_law:'tax'}[config.subject];
    need(!!prefix,config.subject+': missing id prefix mapping');
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
// v1.81: agency and movable-possession explanations must match the approved statutory diagrams.
const civilVisualChecks={
  'civ-card-054':['civil_agency_basic',['직접 귀속','표시']],
  'civ-card-059':['civil_agency_disclosure',['본인을 위하여','알았거나']],
  'civ-card-063':['civil_agency_sub',['원대리인의 대리인이 아니라','승낙']],
  'civ-card-064':['civil_agency_unauthorized',['추인','제3자']],
  'civ-card-065':['civil_agency_apparent',['제125조','제126조','제129조']],
  'civ-card-066':['civil_apparent_125',['표시된 범위','알 수 있었던']],
  'civ-card-067':['civil_apparent_126',['기본대리권','정당한 이유']],
  'civ-card-068':['civil_apparent_129',['소멸','과실']],
  'civ-card-108':['civil_possession_simple',['이미','의사표시']],
  'civ-card-109':['civil_possession_revision',['직접점유','간접점유']],
  'civ-card-110':['civil_possession_claim',['제3자','반환청구권']],
  'civ-card-116':['civil_possession_indirect',['임대차','직접점유자']],
  'civ-card-232':['civil_apparent_compare',['제125조','제126조','제129조']],
  'civ-card-233':['civil_unauthorized_rights',['최고','철회','추인']]
};
for(const [id,[visual,terms]] of Object.entries(civilVisualChecks)){
  const card=civil.find(c=>c.id===id);
  need(card?.visual===visual,id+': wrong civil-law diagram type');
  need(card?.sourceKind==='summary+official'&&card?.sourceRef.includes('민법'),id+': missing reviewed official civil-law reference');
  const body=(card?.bullets||[]).join(' ');
  for(const term of terms) need(body.includes(term),id+': missing statute-checked phrase '+term);
}
need(civil.filter(c=>c.visual.startsWith('civil_')).length===14,'first civil diagrams rollout must have exactly 14 cards');

const brokerage=cards.filter(c=>c.subject==='brokerage_law');
for(const title of ['중개','중개대상물','개업공인중개사','소속공인중개사','중개보조원','중개사무소 개설등록','분사무소','전속중개계약','부동산거래정보망','중개대상물 확인·설명','거래계약서','직접거래 금지','업무보증','중개보수청구권','실무교육','한국공인중개사협회','등록취소','업무정지','부동산 거래신고','거래신고 30일','토지거래허가구역','등기사항증명서','분묘기지권','주택임대차보호법','상가건물 임대차보호법','경매','매수신청대리인 등록']) need(brokerage.some(c=>c.title===title),'brokerage required card missing: '+title);
need(brokerage[0]?.title==='중개','brokerage first card must be 중개');
need(brokerage[brokerage.length-1]?.title==='차순위 매수신고','brokerage last card must be 차순위 매수신고');
need(brokerage.filter(c=>c.examHitCount>0).length>=90,'brokerage exam-backed cards should be at least 90');
need(brokerage.find(c=>c.title==='한국공인중개사협회')?.sourceKind==='official','brokerage association card must use current official source');
need(brokerage.find(c=>c.title==='실무교육')?.bullets.some(x=>x.includes('45시간')),'brokerage practical training must use current 45-hour rule');
need(brokerage.find(c=>c.title==='거래신고 30일')?.bullets.some(x=>x.includes('30일')),'brokerage transaction report deadline must be current 30 days');
need(!brokerage.some(c=>[c.title,c.subtitle,...c.bullets].join(' ').match(/60일|28시간|32시간|300명|600명|금치산자|한정치산자/)),'outdated brokerage rule leaked into card body');
need(!brokerage.find(c=>c.title==='주택 계약갱신요구권')?.bullets.some(x=>/없다/.test(x)),'outdated housing renewal rule leaked into brokerage card');

const publicLaw=cards.filter(c=>c.subject==='public_law');
for(const title of ['광역도시계획','도시·군기본계획','도시·군관리계획','용도지역','지구단위계획','도시·군계획시설','개발행위허가','성장관리계획','도시혁신구역','토지거래허가구역','도시개발구역','환지방식','환지예정지','정비사업','재개발사업','재건축사업','관리처분계획','건축','대수선','건축허가','사용승인','특별건축구역','주택','주택조합','사업계획승인','분양가상한제','사전방문','공동주택 품질점검단','농지','농지취득자격증명','농지 위탁경영','농지전용','농지개량행위 신고']) need(publicLaw.some(c=>c.title===title),'public-law required card missing: '+title);
need(publicLaw[0]?.title==='국토 이용·관리 기본원칙','public-law first card must be 국토 이용·관리 기본원칙');
need(publicLaw[publicLaw.length-1]?.title==='농지개량행위 신고','public-law last card must be 농지개량행위 신고');
need(publicLaw.filter(c=>c.examHitCount>0).length>=170,'public-law exam-backed cards should be at least 170');
need(publicLaw.some(c=>c.importance===5),'public-law importance 5 cards missing');
need(publicLaw.some(c=>c.importance===1),'public-law essential-only cards missing');
for(const title of ['공간재구조화계획','도시혁신구역','복합용도구역','성장관리계획','사업시행계획 통합심의','사전방문','공동주택 품질점검단','농지개량행위 신고']) need(publicLaw.find(c=>c.title===title)?.sourceKind==='official','current public-law card must use official source: '+title);
need(!publicLaw.some(c=>[c.title,c.subtitle,...c.bullets].join(' ').match(/입지규제최소구역|미관지구|주거환경관리사업/)),'outdated public-law concept leaked into card body');

const registration=cards.filter(c=>c.subject==='registration_law');
for(const title of ['부동산 공시제도','지적제도','지적국정주의','필지','지번','지목','경계','지상경계점등록부','면적','지적공부','토지대장','임야대장','공유지연명부','대지권등록부','경계점좌표등록부','지적도','임야도','부동산종합공부','토지이동','신규등록','등록전환','분할','합병','축척변경','지적측량','경계복원측량','지적현황측량','지적측량 적부심사','등기부','등기기록','등기필정보','등기관','관련 사건 관할 특례','상속·유증 관할 특례','표제부','갑구','을구','공동신청주의','전자신청','등기신청 각하','소유권보존등기','소유권이전등기','지상권등기','지역권등기','전세권등기','임차권등기','저당권등기','근저당권등기','공동저당등기','가등기','신탁등기','관공서 촉탁등기','등기관 처분 이의신청']) need(registration.some(c=>c.title===title),'registration required card missing: '+title);
need(registration[0]?.title==='부동산 공시제도','registration first card must be 부동산 공시제도');
need(registration[registration.length-1]?.title==='기록명령','registration last card must be 기록명령');
need(registration.filter(c=>c.examHitCount>0).length>=95,'registration exam-backed cards should be at least 95');
need(registration.some(c=>c.importance===5),'registration importance 5 cards missing');
need(registration.some(c=>c.importance===1),'registration essential-only cards missing');
for(const title of ['관련 사건 관할 특례','상속·유증 관할 특례','전자신청','등기정보자료']) need(registration.find(c=>c.title===title)?.sourceKind==='official','current registration-law card must use official source: '+title);
need(registration.find(c=>c.title==='전자신청')?.bullets.some(x=>x.includes('이동통신단말장치')),'registration electronic application must include current mobile-app rule');
need(!registration.some(c=>[c.title,c.subtitle,...c.bullets].join(' ').includes('등기전산정보자료')),'outdated registration-law term leaked into card body');

const tax=cards.filter(c=>c.subject==='tax_law');
for(const title of ['국세','지방세','납세의무 성립','부과제척기간','징수권 소멸시효','연대납세의무','조세우선권','취득세','취득','과점주주 간주취득','취득당시가액','시가인정액','취득세 표준세율','등록면허세','재산세','재산세 과세기준일','재산세 공정시장가액비율','2026 1주택 공정비율','종합합산과세 토지','별도합산과세 토지','분리과세 토지','종합부동산세','주택분 종부세 기본공제','주택분 종부세 공정비율','종합합산 토지 종부세','별도합산 토지 종부세','소득세','거주자','부동산임대업 소득','양도소득세','양도소득세 과세대상','양도','양도·취득시기','양도소득 계산구조','필요경비','장기보유특별공제','양도소득과세표준','양도소득 기본세율','단기보유 세율','미등기양도자산','비사업용 토지','다주택자 중과','1세대 1주택 비과세','고가주택 12억원 기준','증여재산 이월과세','양도소득 예정신고']) need(tax.some(c=>c.title===title),'tax required card missing: '+title);
need(tax[0]?.title==='국세','tax first card must be 국세');
need(tax[tax.length-1]?.title==='국외자산 양도소득','tax last card must be 국외자산 양도소득');
need(tax.filter(c=>c.examHitCount>0).length>=50,'tax exam-backed cards should be at least 50');
need(tax.some(c=>c.importance===5),'tax importance 5 cards missing');
need(tax.some(c=>c.importance===1),'tax essential-only cards missing');
for(const title of ['2026 1주택 공정비율','주택분 종부세 기본공제','주택분 종부세 공정비율','양도소득 기본세율','단기보유 세율','비사업용 토지','다주택자 중과','고가주택 12억원 기준']) need(tax.find(c=>c.title===title)?.sourceKind==='official','current tax card must use official source: '+title);
need(tax.find(c=>c.title==='양도소득 기본세율')?.bullets.some(x=>x.includes('45%')),'current capital-gains basic rate must reach 45%');
need(tax.find(c=>c.title==='고가주택 12억원 기준')?.bullets.some(x=>x.includes('12억원')),'current high-priced one-home threshold must be 12억원');
need(tax.find(c=>c.title==='증여재산 이월과세')?.bullets.some(x=>x.includes('10년')),'current gift carryover period must be 10 years');
need(['43%','44%','45%'].every(v=>tax.find(c=>c.title==='2026 1주택 공정비율')?.bullets.some(x=>x.includes(v))),'2026 one-home property-tax FMV ratios must be 43/44/45');
need(['12억원','9억원'].every(v=>tax.find(c=>c.title==='주택분 종부세 기본공제')?.bullets.some(x=>x.includes(v))),'current comprehensive real-estate tax housing deductions must be 12/9억원');
need(tax.find(c=>c.title==='다주택자 중과')?.bullets.some(x=>x.includes('2026년 5월 9일')),'multi-home surtax suspension end date must be current');
need(tax.find(c=>c.id==='tax-card-006')?.title==='부가세(附加稅)','surtax classification must not be confused with VAT abbreviation');
need(tax.find(c=>c.id==='tax-card-006')?.bullets.some(x=>x.includes('부가가치세')),'附加稅 vs VAT terminology clarification missing');
need(tax.find(c=>c.id==='tax-card-028')?.bullets.some(x=>x.includes('양식업권')),'acquisition-tax taxable items missing aquaculture rights');
need(tax.find(c=>c.id==='tax-card-051')?.subtitle.includes('골프장')&&!tax.find(c=>c.id==='tax-card-051')?.subtitle.includes('별장'),'repealed villa acquisition surtax leaked into surcharge list');
need(tax.find(c=>c.id==='tax-card-051')?.bullets.some(x=>x.includes('2023년 3월 14일')),'villa acquisition surtax repeal date missing');
need(tax.find(c=>c.id==='tax-card-052')?.bullets.some(x=>x.includes('중과하지 않음')),'repealed villa surcharge must not be presented as current');
need(['50%','40%','70%','60%'].every(v=>tax.find(c=>c.id==='tax-card-168')?.bullets.some(x=>x.includes(v))),'short-term holding capital gains rate breakdown missing');
need(tax.find(c=>c.id==='tax-card-168')?.bullets.some(x=>x.includes('2년 이상')&&x.includes('60%')),'longer-held presale right 60-percent rate missing');

const taxBullet=id=>tax.find(c=>c.id===id)?.bullets.join(' ')||'';
for(const [id,terms] of [
  ['tax-card-059',['50만원','1년']],
  ['tax-card-060',['60일','3개월','6개월','9개월']],
  ['tax-card-072',['등기','전까지']],
  ['tax-card-073',['6천원','일률']],
  ['tax-card-090',['7월 16일','9월 16일','20만원']],
  ['tax-card-092',['250만원','500만원','3개월']],
  ['tax-card-093',['1천만원','관할구역']],
  ['tax-card-094',['2천원 미만','고지서']],
  ['tax-card-106',['60세','65세','70세','80%']],
  ['tax-card-107',['5년','10년','15년','80%']],
  ['tax-card-112',['12월 1일','15일']],
  ['tax-card-113',['12월 1일','15일','없었던']],
  ['tax-card-114',['12월 1일','12월 15일']],
  ['tax-card-115',['250만원','500만원','6개월','3개월']],
  ['tax-card-116',['20%','분납']],
  ['tax-card-165',['250만원','미등기']],
  ['tax-card-183',['2개월','3개월']],
  ['tax-card-184',['5월 1일','31일','예정신고']]
]){
  for(const term of terms) need(taxBullet(id).includes(term),id+': v1.74 official-law audit term missing '+term);
}
need(tax.filter(c=>c.id==='tax-card-092').every(c=>!c.bullets.some(x=>x.includes('6개월'))),'property tax installment period must not be mixed with comprehensive tax');
need(tax.find(c=>c.id==='tax-card-073')?.subtitle.includes('해당 종류'),'registration tax minimum is type-specific, not universal');

const taxTextById=id=>(tax.find(c=>c.id===id)?.bullets||[]).join(' ');
for(const [id,terms] of [
  ['tax-card-011',['과세기준일','확정']],
  ['tax-card-012',['신고','결정']],
  ['tax-card-013',['신고','결정']],
  ['tax-card-014',['재산세','종합부동산세']],
  ['tax-card-017',['5년','7년','10년','상속']],
  ['tax-card-018',['5천만원','10년','5년']],
  ['tax-card-027',['등기','간주취득']],
  ['tax-card-029',['상속','현물출자']],
  ['tax-card-030',['지목변경','과점주주']],
  ['tax-card-031',['법인 설립','제외','연대납세']],
  ['tax-card-032',['등기','사실상']],
  ['tax-card-033',['잔금지급일','60일','계약해제']],
  ['tax-card-034',['계약일','상속','등기']],
  ['tax-card-035',['상속개시일','신고납부기한']],
  ['tax-card-036',['임시사용승인일','사실상 사용일','매립']],
  ['tax-card-037',['연부금','지급','면세점']],
  ['tax-card-038',['등기','등록','취득일']],
  ['tax-card-048',['2.3%','2.8%','3%']],
  ['tax-card-049',['6억원','9억원','1%','3%']],
  ['tax-card-050',['대도시','골프장','별장']],
  ['tax-card-055',['대도시','중과','제외']],
  ['tax-card-056',['중과기준세율','과점주주']],
  ['tax-card-057',['공유물','합병','초과지분']],
  ['tax-card-058',['국가','외국정부','기부채납']]
]){
  for(const term of terms) need(taxTextById(id).includes(term),id+': v1.75 current-law distinction missing '+term);
}
need(tax.find(c=>c.id==='tax-card-031')?.sourceRef.includes('제7조제5항'),'tax-card-031 lacks current deemed shareholder acquisition source');
need(tax.find(c=>c.id==='tax-card-017')?.sourceRef.includes('지방세기본법'),'tax-card-017 limitation period primary law reference absent');
need(tax.find(c=>c.id==='tax-card-018')?.sourceRef.includes('지방세기본법'),'tax-card-018 collection prescription primary law reference absent');



const v178Checks={
  'tax-card-019':['20%','40%','10%'],
  'tax-card-020':['공유물','분할'],
  'tax-card-021':['법정기일','임차보증금'],
  'tax-card-022':['신고일','발송일'],
  'tax-card-023':['우편','전자송달','연대납세'],
  'tax-card-024':['90일','심판청구'],
  'tax-card-025':['90일','조세심판원'],
  'tax-card-026':['이의신청','심판청구','국세청장'],
  'tax-card-046':['농지보전부담금','중개보수','법인이 아닌'],
  'tax-card-047':['부가가치세','광고선전비','이주비'],
  'tax-card-061':['보통징수','80%'],
  'tax-card-062':['부동산 소재지','사용본거지'],
  'tax-card-063':['등록분','면허분'],
  'tax-card-064':['면허','종류마다'],
  'tax-card-065':['양식업권','원칙적으로 제외'],
  'tax-card-066':['외국정부','표시변경'],
  'tax-card-067':['등록 당시','시가표준액','채권금액'],
  'tax-card-068':['종가세','최저'],
  'tax-card-069':['건마다','정액세율'],
  'tax-card-070':['0.8%','2%','등록분 제외'],
  'tax-card-071':['대도시','예외']
};
for(const [id,terms] of Object.entries(v178Checks)){
  const card=tax.find(c=>c.id===id);
  need(!!card,id+': v1.78 audited tax card missing');
  const body=(card?.bullets||[]).join(' ');
  for(const term of terms) need(body.includes(term),id+': v1.78 reviewed distinction missing '+term);
  need(card?.sourceKind==='summary+official'&&card?.sourceRef.includes('국가법령정보센터'),id+': official law source attribution missing');
}
need(tax.find(c=>c.id==='tax-card-065')?.bullets.some(x=>x.includes('양식업권')),'acquisition-based registrations need law-defined exclusions and exceptions');
need(tax.find(c=>c.id==='tax-card-026')?.bullets.some(x=>x.includes('지방세 일반 불복')),'legacy local-tax administrative appeal must not be shown as a current procedure');

// v1.79: whole-subject source/importance checks and high-risk 2026 law regressions.
need(tax.length===187,'v1.79 tax card count must remain 187');
need(tax.every(c=>['summary+official','official'].includes(c.sourceKind)),'every reviewed tax card must identify an official source type');
need(tax.every(c=>c.sourceRef?.trim()&&c.bullets?.length),'reviewed tax card needs an explicit statutory source and learning text');
const checkedTaxTerms={
  'tax-card-074':['토지','선박','항공기'],
  'tax-card-075':['6월 1일','사실상 소유'],
  'tax-card-076':['지분권자','상속'],
  'tax-card-083':['종합합산','별도합산'],
  'tax-card-085':['0.07%','4%','0.2%'],
  'tax-card-086':['9억원','1세대 1주택'],
  'tax-card-087':['0.25%','0.5%','4%'],
  'tax-card-088':['0.14%','고시'],
  'tax-card-095':['20%','도시지역분'],
  'tax-card-101':['12억원','2026년 10월','요건'],
  'tax-card-119':['183일','거주자'],
  'tax-card-128':['12억원','2천만원'],
  'tax-card-129':['2026년부터','2주택','12억원','3주택','3억원'],
  'tax-card-134':['등기된 부동산임차권','지상권'],
  'tax-card-136':['조합원입주권','분양권'],
  'tax-card-142':['대금','청산','특례'],
  'tax-card-146':['사용승인서','사실상 사용'],
  'tax-card-158':['취득가액','자본적지출','양도비'],
  'tax-card-163':['3년','미등기'],
  'tax-card-171':['16~55%','기간','이용'],
  'tax-card-172':['5년','3년','20%'],
  'tax-card-174':['2년','조정대상지역'],
  'tax-card-175':['12억원','실지거래가액'],
  'tax-card-176':['양도가액 - 12억원','양도차익'],
  'tax-card-185':['1천만원','2개월'],
  'tax-card-187':['5년','250만원','장기보유특별공제']
};
for(const [id,terms] of Object.entries(checkedTaxTerms)){
  const card=tax.find(x=>x.id===id);
  const body=(card?.bullets||[]).join(' ');
  for(const term of terms) need(body.includes(term),id+': v1.79 statutory audit regression: '+term);
}

for(const config of configs.filter(x=>x.reindexExam)){
  const raw=parseSource(config);
  for(const c of raw){
    need(c.basisStored.join('|')===c.basis.join('|'),c.id+': BASIS metadata stale');
    need(c.examHitCountStored===c.examHitCount,c.id+': EXAM_HIT_COUNT stale');
    need(c.examYearsStored.join('|')===c.examYears.join('|'),c.id+': EXAM_YEARS stale');
    need(c.examSampleRefsStored.join('|')===c.examSampleRefs.join('|'),c.id+': EXAM_SAMPLE_REFS stale');
    need(c.importanceStored===c.importance,c.id+': IMPORTANCE stale');
  }
}

console.log('Core word card TXT validation');
console.log('Cards: '+cards.length);
for(const config of configs){
  const list=cards.filter(c=>c.subject===config.subject);
  console.log(config.label+': '+list.length+' / exam-backed '+list.filter(c=>c.examHitCount>0).length);
}
console.log('Errors: '+errors.length);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
