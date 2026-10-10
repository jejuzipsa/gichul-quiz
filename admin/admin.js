(() => {
'use strict';
const API='https://gichul-law-api.vercel.app/api/admin-auth';
const SESSION_KEY='gichulAdminSession';
const DEVICE_KEY='gichulAdminDeviceId';
const LOG_API='https://gichul-law-api.vercel.app/api/admin-logs';
const $=id=>document.getElementById(id);
const codes=new Set(['real_estate_intro','civil_law','brokerage_law','public_law','registration_law','tax_law']);
const notice=$('adminNotice'),dashboard=$('adminDashboard'),logout=$('adminLogout'),status=$('authStatus');
let token='';
let recentLoginFlags=null;
function getDeviceId(){
  try{
    let id=localStorage.getItem(DEVICE_KEY);
    if(id && /^[a-f0-9-]{32,64}$/i.test(id))return id;
    id=crypto.randomUUID();
    localStorage.setItem(DEVICE_KEY,id);
    return id;
  }catch{return ''}
}
try{token=sessionStorage.getItem(SESSION_KEY)||''}catch(_){}
function saveSession(next){
  token=next;
  try{if(next)sessionStorage.setItem(SESSION_KEY,next);else sessionStorage.removeItem(SESSION_KEY)}catch(_){}
}
function showLogin(message,setup=false){
  dashboard.hidden=true;
  notice.hidden=false;
  logout.hidden=true;
  $('adminSetupHint').hidden=!setup;
  status.textContent=message||'';
}
function showDashboard(){
  notice.hidden=true;
  dashboard.hidden=false;
  logout.hidden=false;
}
function errorMessage(error){
  const messages={
    ADMIN_NOT_CONFIGURED:'관리자 인증이 아직 설정되지 않았어. 관리자에게 설정을 요청해 줘.',
    INVALID_CREDENTIALS:'아이디나 비밀번호가 일치하지 않아.',
    TOO_MANY_ATTEMPTS:'로그인 시도가 너무 많아. 약 15분 후 다시 시도해 줘.',
    INVALID_CURRENT_PASSWORD:'현재 비밀번호가 일치하지 않아.',
    PASSWORD_UNCHANGED:'새 비밀번호는 현재 비밀번호와 달라야 해.',
    PASSWORD_LENGTH:'비밀번호는 12~128자로 설정해 줘.',
    AUTH_REQUIRED:'로그인 시간이 만료됐어. 다시 로그인해 줘.',
    STORE_UNAVAILABLE:'관리자 인증 저장소에 연결할 수 없어. 잠시 뒤 다시 시도해 줘.',
    ORIGIN_NOT_ALLOWED:'허용되지 않은 관리자 접속 주소야.'
  };
  return messages[error]||'처리 중 오류가 발생했어. 잠시 뒤 다시 시도해 줘.';
}
async function request(url,options={}){
  const res=await fetch(url,{...options,cache:'no-store',headers:{'Content-Type':'application/json',...(options.headers||{})}});
  let body={};
  try{body=await res.json()}catch(_){}
  if(!res.ok){const e=new Error(body.error||'NETWORK_ERROR');e.status=res.status;throw e}
  return body;
}
$('adminLoginForm').addEventListener('submit',async event=>{
  event.preventDefault();
  const button=$('adminLoginBtn');
  const password=$('adminPassword').value;
  button.disabled=true;
  status.textContent='로그인 확인 중…';
  try{
    const result=await request(API+'?mode=login',{method:'POST',body:JSON.stringify({username:'admin',password,deviceId:getDeviceId()})});
    saveSession(result.session);
    recentLoginFlags=result.security||null;
    $('adminPassword').value='';
    await initializeDashboard();
  }catch(error){
    showLogin(errorMessage(error.message),error.message==='ADMIN_NOT_CONFIGURED');
  }finally{button.disabled=false}
});
logout.addEventListener('click',async()=>{
  const prior=token;
  saveSession('');
  recentLoginFlags=null;
  $('adminPasswordForm').reset();
  showLogin('관리자 계정에서 로그아웃했어.');
  if(prior){
    try{
      await request(API+'?mode=logout',{method:'POST',
        headers:{Authorization:'Bearer '+prior},body:'{}'});
    }catch{
      showLogin('로그아웃했지만 서버 세션 폐기에 실패했어. 보안이 걱정된다면 비밀번호를 변경해 줘.');
    }
  }
});
$('adminPasswordForm').addEventListener('submit',async event=>{
  event.preventDefault();
  const button=$('adminPasswordBtn');
  const status=$('adminPasswordStatus');
  const current=$('currentPassword').value;
  const next=$('newPassword').value;
  const confirm=$('newPasswordConfirm').value;
  if(next!==confirm){status.textContent='새 비밀번호와 확인 입력이 일치하지 않아.';return}
  button.disabled=true;
  status.textContent='비밀번호를 변경하는 중…';
  try{
    const response=await request(API+'?mode=change-password',{
      method:'POST',
      headers:{Authorization:'Bearer '+token},
      body:JSON.stringify({currentPassword:current,newPassword:next})
    });
    saveSession(response.session);
    $('adminPasswordForm').reset();
    status.textContent='비밀번호가 변경됐어. 기존 로그인 세션은 무효화됐어.';
  }catch(error){
    status.textContent=errorMessage(error.message);
    if(error.message==='AUTH_REQUIRED') {saveSession('');showLogin('세션이 만료됐어. 다시 로그인해 줘.')}
  }finally{button.disabled=false}
});
function loadScript(path){
  return new Promise((resolve,reject)=>{
    const tag=document.createElement('script');
    tag.src=path;
    tag.onload=()=>resolve();
    tag.onerror=()=>reject(new Error('SCRIPT_LOAD_FAILED'));
    document.head.appendChild(tag);
  });
}
async function bankCount(code,kind){
  const field=kind==='blank'?'BLANK_QUIZ_BANK':'WORD_QUIZ_BANK';
  const dir=kind==='blank'?'blank-data/':'data/';
  try{
    await loadScript('../word-quiz/'+dir+code+'.js');
    const data=window[field];
    return Array.isArray(data?.questions)?data.questions.length:null;
  }catch{return null}finally{delete window[field]}
}
function td(tr,value){
  const cell=document.createElement('td');
  cell.textContent=value===null||value===undefined?'—':String(value);
  tr.appendChild(cell);
}
function nice(n){return n===null?'—':n.toLocaleString('ko-KR')}
async function populateCounts(){
  const body=$('adminSubjectRows');
  try{
    await loadScript('../data/manifest.js');
    const entries=window.SUBJECT_MANIFEST;
    if(!Array.isArray(entries)||entries.length!==6)throw new Error('MANIFEST_MISSING');
    const res=await fetch('../review/core-cards-v1/manifest.json',{cache:'no-store'});
    if(!res.ok)throw new Error('CARDS_MISSING');
    const cardsData=await res.json();
    const cards=new Map((cardsData.subjects||[]).map(s=>[s.subject,Number(s.total)]));
    const totals=[0,0,0,0];
    const known=[true,true,true,true];
    const rows=[];
    for(const entry of entries){
      if(!codes.has(entry.code))continue;
      const counts=[
        Number(entry.count),
        await bankCount(entry.code,'concept'),
        await bankCount(entry.code,'blank'),
        cards.has(entry.code)?cards.get(entry.code):null
      ];
      const row=document.createElement('tr');
      td(row,entry.name);
      for(let i=0;i<4;i++){
        td(row,counts[i]==null?'—':nice(counts[i]));
        if(Number.isFinite(counts[i]))totals[i]+=counts[i];else known[i]=false;
      }
      rows.push(row);
    }
    const totalRow=document.createElement('tr');
    totalRow.className='admin-subject-totals';
    td(totalRow,'합계');
    totals.forEach((n,i)=>td(totalRow,known[i]?nice(n):'—'));
    rows.push(totalRow);
    body.replaceChildren(...rows);
    for(const [index,id] of ['totalPast','totalConcept','totalBlank','totalCards'].entries())
      $(id).textContent=known[index]?nice(totals[index]):'—';
    $('adminDataStatus').textContent=known.every(Boolean)?
      '기출·개념·괄호문제는 게시된 문제은행 기준, 단어 카드는 검수 목록 기준이야.':
      '일부 자료를 불러오지 못했어. 대시(—) 표시된 수는 확인이 필요해.';
  }catch{
    $('adminDataStatus').textContent='문제은행 정보를 불러오지 못했어. 새로고침 후 다시 확인해 줘.';
    body.replaceChildren();
  }
}
async function populatePatchNotes(){
  const container=$('adminPatchList');
  try{
    const r=await fetch('../PATCH_NOTES.txt',{cache:'no-store'});
    if(!r.ok)throw new Error('PATCH_NOTES_MISSING');
    const content=await r.text();
    const lines=content.split(/\r?\n/);
    const blocks=[];
    for(let i=1;i<lines.length-1;i++){
      if(/^-{10,}$/.test(lines[i-1])&&/^\d{1,3}\.\s+/.test(lines[i])&&/^-{10,}$/.test(lines[i+1])){
        blocks.push({heading:lines[i],start:i+2});
      }
    }
    const selected=blocks.slice(-7).reverse();
    const articles=selected.map(info=>{
      const idx=blocks.indexOf(info);
      const next=blocks[idx+1];
      const end=next?next.start-3:lines.length;
      const excerpt=lines.slice(info.start,end).filter(line=>line.trim()&&!/^-{10,}$/.test(line)).join('\n').trim().slice(0,900);
      const article=document.createElement('article');
      article.className='admin-patch';
      const h=document.createElement('h3');
      const text=document.createElement('p');
      h.textContent=info.heading;
      text.textContent=excerpt||'자세한 내용은 전체 패치노트를 확인해 줘.';
      article.append(h,text);
      return article;
    });
    if(!articles.length)throw new Error('NO_PATCHES');
    container.replaceChildren(...articles);
  }catch{container.textContent='패치 기록을 불러오지 못했어. 전체 패치노트를 확인해 줘.'}
}
async function populateVersion(){
  try{
    const r=await fetch('../version.json',{cache:'no-store'});
    if(!r.ok)return;
    const json=await r.json();
    if(typeof json.version==='string')$('adminVersion').textContent='v'+json.version;
  }catch(_){}
}

function tableRow(cells) {
  const row=document.createElement('tr');
  for(const c of cells){
    const td=document.createElement('td');
    td.textContent=c;
    row.appendChild(td);
  }
  return row;
}
function dateKst(stamp){
  const time=new Date(stamp);
  if(!Number.isFinite(time.valueOf()))return '—';
  return time.toLocaleString('ko-KR',{timeZone:'Asia/Seoul',
    year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'});
}
function eventName(event){
  switch(event.kind){
    case 'login_success':return '로그인 성공'+(event.newDevice?' · 새 기기':'')+(event.newIp?' · 새 IP':'');
    case 'login_failed':return '로그인 실패';
    case 'password_changed':return '비밀번호 변경';
    case 'logout':return '로그아웃';
    default:return '관리자 이벤트';
  }
}
async function populateLogs(){
  const status=$('adminLogStatus');
  status.textContent='접속 기록을 읽고 있어…';
  try{
    const data=await request(LOG_API,{headers:{Authorization:'Bearer '+token}});
    for(const [id,count] of [['visitorsToday',data.today],['visitorsWeek',data.week],['visitorsMonth',data.month]]){
      $(id).textContent=Number(count||0).toLocaleString('ko-KR');
    }
    const visitors=(Array.isArray(data.visitors)?data.visitors:[]).slice(0,50);
    const admin=(Array.isArray(data.admin)?data.admin:[]).slice(0,80);
    $('visitorLogRows').replaceChildren(...(
      visitors.length?visitors.map(e=>tableRow([dateKst(e.time),e.ip||'—',
        [e.os,e.browser].filter(Boolean).join(' / ')])):[tableRow(['아직 기록이 없어.','—','—'])]
    ));
    $('adminLogRows').replaceChildren(...(
      admin.length?admin.map(e=>tableRow([dateKst(e.time),eventName(e),e.ip||'—',
        [e.os,e.browser].filter(Boolean).join(' / ')])):[tableRow(['아직 기록이 없어.','—','—','—'])]
    ));
    const warning=$('adminSecurityWarning');
    const unknown=admin.filter(e=>e.kind==='login_success'&&(e.newDevice||e.newIp));
    if(recentLoginFlags?.newDevice||recentLoginFlags?.newIp){
      warning.textContent='이번 관리자 로그인은 '+[
        recentLoginFlags.newDevice?'처음 보는 브라우저':'',
        recentLoginFlags.newIp?'처음 보는 IP':''
      ].filter(Boolean).join('·')+'에서 확인됐어. 본인 접속인지 확인해 줘.';
      warning.hidden=false;
    }else if(unknown.length){
      warning.textContent='최근 관리자 로그인 중 신규 기기·IP 표시가 '+unknown.length+'건 있어. 아래 보안 기록을 확인해 줘.';
      warning.hidden=false;
    }else{warning.hidden=true}
    status.textContent='방문 로그는 같은 IP·브라우저 조합을 한국 날짜 기준 하루 한 번만 저장해. 기록은 약 30일 보관하며 페이지 이동은 추적하지 않아.';
  }catch(error){
    status.textContent='접속 기록을 불러오지 못했어. '+errorMessage(error.message);
  }
}
$('refreshVisitLogs').addEventListener('click',()=>populateLogs());

async function initializeDashboard(){
  const result=await request(API,{headers:{Authorization:'Bearer '+token}});
  showDashboard();
  $('adminIdentity').textContent='로그인 계정: '+result.username;
  await Promise.all([populateVersion(),populateCounts(),populatePatchNotes(),populateLogs()]);
}
async function bootstrap(){
  if(!token){showLogin('');return}
  try{await initializeDashboard()}
  catch(error){
    if(error.message==='AUTH_REQUIRED')saveSession('');
    showLogin(errorMessage(error.message),error.message==='ADMIN_NOT_CONFIGURED');
  }
}
bootstrap();
})();
