'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const auth=require('../../lib/admin-auth.js');
const mfa=require('../../lib/admin-mfa.js');
const audit=require('../../lib/visit-logs.js');
const authApi=require('../../api/admin-auth.js');
const mfaApi=require('../../api/admin-mfa.js');
const visitApi=require('../../api/visit.js');
const logsApi=require('../../api/admin-logs.js');
const ORIGIN='https://jejuzipsa.github.io';
const INITIAL='InitialStrongPass-123';
const UPDATED='AnotherNewPassword-321';
const SEED=auth.createPasswordHash(INITIAL);
const SECRET='x'.repeat(64);
const TOTP_KEY=Buffer.alloc(32,12).toString('base64url');
const IP='203.0.113.87';
const UA='Mozilla/5.0 (Windows NT 10.0) Chrome/154.0.0.0';
const DEVICE='f8954498-5fc0-43a5-a986-fcc1966c8ff3';
function res(){return {statusCode:200,headers:{},setHeader(k,v){this.headers[k.toLowerCase()]=v},end(body){this.body=body?JSON.parse(body):undefined}}}
function req(method,query={},body={},headers={}){return {method,query,body,headers:{origin:ORIGIN,'x-vercel-forwarded-for':IP,'user-agent':UA,...headers}}}
function withEnv(t){
  const keys=['GICHUL_ADMIN_INITIAL_PASSWORD_HASH','GICHUL_ADMIN_TOTP_ENCRYPTION_KEY',
    'GICHUL_ADMIN_SESSION_SECRET','UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN',
    'KV_REST_API_URL','KV_REST_API_TOKEN'];
  const originals=keys.map(k=>process.env[k]);
  process.env.GICHUL_ADMIN_INITIAL_PASSWORD_HASH=SEED;
  process.env.GICHUL_ADMIN_TOTP_ENCRYPTION_KEY=TOTP_KEY;
  process.env.GICHUL_ADMIN_SESSION_SECRET=SECRET;
  process.env.UPSTASH_REDIS_REST_URL='https://fake-redis.upstash.io';
  process.env.UPSTASH_REDIS_REST_TOKEN='fake-token';
  t.after(()=>keys.forEach((k,i)=>originals[i]===undefined?delete process.env[k]:process.env[k]=originals[i]));
}
function redisMock(t){
  const original=global.fetch,kv=new Map([[auth.PASSWORD_KEY,SEED]]),zsets=new Map(),sets=new Map();
  global.fetch=async(url,options)=>{
    assert.equal(url,'https://fake-redis.upstash.io');
    assert.equal(options.headers.Authorization,'Bearer fake-token');
    const [cmd,key,...args]=JSON.parse(options.body);
    let result=null;
    switch(cmd){
      case 'EVAL':{
        const [,sessionKey,nowMs,graceMs,budgetMs,mode]=args;
        const raw=kv.get(sessionKey);
        if(!raw){result=[0,0];break}
        let state;
        try{state=JSON.parse(raw)}catch{result=[0,0];break}
        const left=Math.max(0,Number(state.b)-Math.max(0,Number(nowMs)-Number(state.a)-Number(graceMs)));
        if(left<=0){kv.delete(sessionKey);result=[0,0];break}
        state.b=mode==='reset'?Number(budgetMs):left;
        state.a=Number(nowMs)-(mode==='leave'?Number(graceMs):0);
        kv.set(sessionKey,JSON.stringify(state));
        result=[1,Math.floor(state.b)];
        break;
      }
      case 'GET':result=kv.has(key)?kv.get(key):null;break;
      case 'GETDEL':result=kv.has(key)?kv.get(key):null;kv.delete(key);break;
      case 'SET':{
        if(args.includes('NX')&&kv.has(key))result=null;
        else{kv.set(key,args[0]);result='OK'}
        break;
      }
      case 'DEL':{result=Number(kv.delete(key));sets.delete(key);break}
      case 'INCR':{result=Number(kv.get(key)||0)+1;kv.set(key,String(result));break}
      case 'EXPIRE':{result=1;break}
      case 'MGET':{result=[key,...args].map(k=>kv.has(k)?kv.get(k):null);break}
      case 'SADD':{
        const s=sets.get(key)||new Set();
        let added=0;for(const v of args){if(!s.has(v)){s.add(v);added++}}
        sets.set(key,s);result=added;break;
      }
      case 'SREM':{
        const s=sets.get(key)||new Set();result=Number(s.delete(args[0]));break;
      }
      case 'ZADD':{
        const s=zsets.get(key)||new Map();s.set(args[1],Number(args[0]));zsets.set(key,s);result=1;break;
      }
      case 'ZREMRANGEBYSCORE':{
        const s=zsets.get(key)||new Map();
        for(const [member,score] of s)if(score<=Number(args[1]))s.delete(member);
        result=1;break;
      }
      case 'ZREMRANGEBYRANK':{
        const s=zsets.get(key)||new Map(),num=Math.abs(Number(args[1]))-1;
        for(const [member] of [...s].sort((a,b)=>a[1]-b[1]).slice(0,Math.max(0,s.size-num)))s.delete(member);
        result=1;break;
      }
      case 'ZREVRANGE':{
        const s=zsets.get(key)||new Map();
        result=[...s].sort((a,b)=>b[1]-a[1]).map(([member])=>member).slice(Number(args[0]),Number(args[1])+1);break;
      }
      default:throw Error('UNMOCKED_COMMAND: '+cmd);
    }
    return {ok:true,json:async()=>({result})};
  };
  t.after(()=>{global.fetch=original});
  return {kv,sets,zsets};
}
async function invoke(handler,request){const response=res();await handler(request,response);return response;}
async function startPasswordLogin(pass=INITIAL,device=DEVICE){
  return invoke(authApi,req('POST',{mode:'login'},{username:'admin',password:pass,deviceId:device}));
}
async function enroll(){
  const login=await startPasswordLogin();
  assert.equal(login.statusCode,200);
  assert.equal(login.body.mfaMode,'setup');
  assert.equal(login.body.session,undefined);
  const challenge=login.body.challenge;
  let x=await invoke(mfaApi,req('POST',{mode:'start'},{challenge}));
  assert.equal(x.statusCode,200);
  const secret=x.body.secret;
  const code=mfa.otpAt(secret,Math.floor(Date.now()/30000));
  x=await invoke(mfaApi,req('POST',{mode:'confirm'},{challenge,code}));
  assert.equal(x.statusCode,200);
  assert.equal(x.body.recoveryCodes.length,8);
  return {secret,codes:x.body.recoveryCodes,session:x.body.session};
}

test('RFC6238 6-digit vectors and authenticated encrypted secret',()=>{
  const c={totpKey:Buffer.from(TOTP_KEY,'base64url')};
  const seed=mfa.base32(Buffer.from('12345678901234567890'));
  assert.equal(mfa.otpAt(seed,1),'287082');
  assert.equal(mfa.otpAt(seed,37037036),'081804');
  assert.equal(mfa.validTotp(seed,'287082',59000),1);
  assert.equal(mfa.validTotp(seed,'000000',59000),null);
  assert.equal(mfa.unbase32(seed).toString(),'12345678901234567890');
  const encrypted=mfa.encryptSecret(seed,c);
  assert.ok(!encrypted.includes(seed));
  assert.equal(mfa.decryptSecret(encrypted,c),seed);
  assert.throws(()=>mfa.decryptSecret(encrypted,{totpKey:Buffer.alloc(32,99)}));
  assert.equal(mfa.recoveryCodes(c).length,8);
});
test('password-only token never grants dashboard, and bootstrap password cannot revive',async t=>{
  withEnv(t);const db=redisMock(t);
  const r=await startPasswordLogin();
  assert.equal(r.statusCode,200);
  assert.equal(r.body.mfaRequired,true);
  assert.equal(r.body.mfaMode,'setup');
  assert.equal(r.body.session,undefined);
  const denied=await invoke(logsApi,req('GET'));
  assert.equal(denied.statusCode,401);
  const forged=await invoke(authApi,req('GET',{},null,{authorization:'Bearer '+r.body.challenge}));
  assert.equal(forged.statusCode,401);
  db.kv.delete(auth.PASSWORD_KEY);
  const oldSeed=await startPasswordLogin();
  assert.equal(oldSeed.statusCode,503,'missing Redis password MUST NOT fall back to bootstrap hash');
  assert.equal(auth.config().seed,undefined);
});
test('2FA setup is OTP-gated and rescue codes shown once; admin audited only after OTP',async t=>{
  withEnv(t);const db=redisMock(t);
  const login=await startPasswordLogin();
  const challenge=login.body.challenge;
  let r=await invoke(mfaApi,req('POST',{mode:'start'},{challenge}));
  const secret=r.body.secret;
  r=await invoke(mfaApi,req('POST',{mode:'confirm'},{challenge,code:'123456'}));
  if(r.statusCode===200){
    // Extremely unlikely accidental random match (1 in a million).
    assert.equal(r.body.recoveryCodes.length,8);return;
  }
  assert.equal(r.statusCode,400);
  assert.equal(r.body.error,'INVALID_MFA_CODE');
  const good=mfa.otpAt(secret,Math.floor(Date.now()/30000));
  r=await invoke(mfaApi,req('POST',{mode:'confirm'},{challenge,code:good}));
  assert.equal(r.statusCode,200);
  assert.equal(r.body.recoveryCodes.length,8);
  assert.equal(new Set(r.body.recoveryCodes).size,8);
  assert.ok(r.body.recoveryCodes.every(c=>/^[A-F0-9]{8}(-[A-F0-9]{8}){3}$/.test(c)));
  assert.ok(!JSON.stringify(db.kv).includes(secret));
  assert.ok(db.kv.has(mfa.MFA_KEY));
  const admin=await invoke(logsApi,req('GET',{},null,{authorization:'Bearer '+r.body.session}));
  assert.equal(admin.statusCode,200);
  assert.equal(admin.body.admin.filter(e=>e.kind==='login_success').length,1);
  const oldMfaChallenge=await invoke(mfaApi,req('POST',{mode:'confirm'},{challenge,code:good}));
  assert.notEqual(oldMfaChallenge.statusCode,200);
});
test('MFA refuses wrong OTP, replayed code, reused challenge and unauthenticated access',async t=>{
  withEnv(t);redisMock(t);
  const {secret,session}=await enroll();
  let r=await startPasswordLogin();
  assert.equal(r.body.mfaMode,'verify');
  const challenge=r.body.challenge;
  r=await invoke(mfaApi,req('POST',{mode:'verify'},{challenge,code:'abcdef'}));
  assert.equal(r.statusCode,401);
  assert.equal(r.body.error,'INVALID_MFA_CODE');
  const code=mfa.otpAt(secret,Math.floor(Date.now()/30000));
  r=await invoke(mfaApi,req('POST',{mode:'verify'},{challenge,code}));
  assert.equal(r.statusCode,200);
  assert.ok(r.body.session);
  const second=await invoke(mfaApi,req('POST',{mode:'verify'},{challenge,code}));
  assert.equal(second.statusCode,401);
  const nextLogin=await startPasswordLogin();
  const replay=await invoke(mfaApi,req('POST',{mode:'verify'},{challenge:nextLogin.body.challenge,code}));
  assert.equal(replay.statusCode,401);
  assert.equal(replay.body.error,'MFA_CODE_USED');
  const attack=await invoke(mfaApi,req('POST',{mode:'regenerate'},{password:INITIAL}));
  assert.equal(attack.statusCode,401);
  const valid=await invoke(authApi,req('GET',{},null,{authorization:'Bearer '+session}));
  assert.equal(valid.statusCode,200);
});
test('one-time recovery codes and authenticated regeneration with password',async t=>{
  withEnv(t);redisMock(t);
  const initial=await enroll();
  let r=await startPasswordLogin();
  let challenge=r.body.challenge;
  const first=initial.codes[0];
  r=await invoke(mfaApi,req('POST',{mode:'verify'},{challenge,code:first}));
  assert.equal(r.statusCode,200);
  assert.equal(r.body.recoveryUsed,true);
  const token=r.body.session;
  r=await startPasswordLogin();
  challenge=r.body.challenge;
  r=await invoke(mfaApi,req('POST',{mode:'verify'},{challenge,code:first}));
  assert.equal(r.statusCode,401);
  assert.equal(r.body.error,'INVALID_MFA_CODE');
  const wrong=await invoke(mfaApi,req('POST',{mode:'regenerate'},{password:'bad'},{authorization:'Bearer '+token}));
  assert.equal(wrong.statusCode,401);
  const regen=await invoke(mfaApi,req('POST',{mode:'regenerate'},{password:INITIAL},{authorization:'Bearer '+token}));
  assert.equal(regen.statusCode,200);
  assert.equal(regen.body.recoveryCodes.length,8);
  const second=await startPasswordLogin();
  const old=await invoke(mfaApi,req('POST',{mode:'verify'},{challenge:second.body.challenge,code:initial.codes[1]}));
  assert.equal(old.statusCode,401);
  const updated=await invoke(mfaApi,req('POST',{mode:'verify'},{challenge:second.body.challenge,code:regen.body.recoveryCodes[0]}));
  assert.equal(updated.statusCode,200);
  const events=await invoke(logsApi,req('GET',{},null,{authorization:'Bearer '+token}));
  assert.ok(events.body.admin.some(e=>e.kind==='recovery_used'));
  assert.ok(events.body.admin.some(e=>e.kind==='recovery_regenerated'));
});
test('rotating password revokes all old sessions; logout revokes one server session',async t=>{
  withEnv(t);redisMock(t);
  const initial=await enroll();
  let r=await invoke(authApi,req('POST',{mode:'change-password'},{currentPassword:INITIAL,newPassword:UPDATED},
    {authorization:'Bearer '+initial.session}));
  assert.equal(r.statusCode,200);
  const updated=r.body.session;
  r=await invoke(authApi,req('GET',{},null,{authorization:'Bearer '+initial.session}));
  assert.equal(r.statusCode,401);
  r=await invoke(authApi,req('GET',{},null,{authorization:'Bearer '+updated}));
  assert.equal(r.statusCode,200);
  r=await startPasswordLogin(INITIAL);
  assert.equal(r.statusCode,401);
  const fresh=await startPasswordLogin(UPDATED);
  assert.equal(fresh.body.mfaMode,'verify');
  const loggedOut=await invoke(authApi,req('POST',{mode:'logout'},{},{authorization:'Bearer '+updated}));
  assert.equal(loggedOut.statusCode,200);
  r=await invoke(authApi,req('GET',{},null,{authorization:'Bearer '+updated}));
  assert.equal(r.statusCode,401);
});
test('CORS restricted, missing config fails closed and static frontend has no secrets',async t=>{
  withEnv(t);redisMock(t);
  let r=await invoke(authApi,req('POST',{mode:'login'},{username:'admin',password:INITIAL},{origin:'https://evil.example'}));
  assert.equal(r.statusCode,403);
  r=await invoke(mfaApi,req('POST',{mode:'verify'},{},{origin:'https://evil.example'}));
  assert.equal(r.statusCode,403);
  const frontend=fs.readFileSync(path.join(__dirname,'../../admin/admin.js'),'utf8');
  const html=fs.readFileSync(path.join(__dirname,'../../admin/index.html'),'utf8');
  assert.ok(html.includes('id="adminMfaForm"'));
  assert.ok(html.includes('id="adminRecoveryCodes"'));
  assert.ok(frontend.includes("mfaMode==='setup'?'confirm':'verify'"));
  assert.ok(!frontend.includes('GICHUL_ADMIN_TOTP_ENCRYPTION_KEY'));
  assert.ok(!html.includes('GICHUL_ADMIN_TOTP_ENCRYPTION_KEY'));
  const vars=['GICHUL_ADMIN_TOTP_ENCRYPTION_KEY','UPSTASH_REDIS_REST_URL','KV_REST_API_URL'];
  const original=vars.map(k=>process.env[k]);
  vars.forEach(k=>delete process.env[k]);
  r=await invoke(authApi,req('POST',{mode:'login'},{username:'admin',password:INITIAL}));
  assert.equal(r.statusCode,503);
  vars.forEach((k,i)=>original[i]===undefined?delete process.env[k]:process.env[k]=original[i]);
});
test('visitor dedup and separate admin log still work after TOTP enrollment',async t=>{
  withEnv(t);redisMock(t);
  const {session}=await enroll();
  let r=await invoke(visitApi,req('POST'));assert.equal(r.statusCode,204);
  r=await invoke(visitApi,req('POST'));assert.equal(r.statusCode,204);
  r=await invoke(visitApi,req('POST',{}, {},{authorization:'Bearer '+session}));assert.equal(r.statusCode,204);
  const stats=await invoke(logsApi,req('GET',{},null,{authorization:'Bearer '+session}));
  assert.equal(stats.statusCode,200);
  assert.equal(stats.body.today,1);
  assert.ok(stats.body.admin.some(e=>e.kind==='mfa_enabled'));
});


test('server cumulative 10-minute inactivity budget pauses 30s and never silently resets',async t=>{
  withEnv(t);
  const db=redisMock(t);
  const {session}=await enroll();
  const cfg=auth.config(),hash=await auth.currentHash(cfg);
  const key=auth.sessionKey(session);
  const initial=JSON.parse(db.kv.get(key));
  assert.equal(initial.b,600000);
  assert.equal(auth.SESSION_IDLE_SECONDS,600);
  assert.equal(auth.SESSION_GRACE_MS,30000);
  assert.equal(auth.sessionClock(initial,initial.a+29999).remainingMs,600000);
  assert.equal(auth.sessionClock(initial,initial.a+45000).remainingMs,585000);
  assert.equal(auth.sessionClock(initial,initial.a+630000),null);
  // Time-consuming reading of the page: 90 seconds of silence => 60 seconds charged.
  const started=initial.a+90000;
  let snapshot=await auth.sessionAction(session,hash,cfg,'activity',started);
  assert.equal(snapshot.remainingMs,540000);
  // Any next action after 45 seconds only consumes 15 MORE idle seconds.
  snapshot=await auth.sessionAction(session,hash,cfg,'activity',started+45000);
  assert.equal(snapshot.remainingMs,525000);
  assert.equal(auth.sessionClock(db.kv.get(key),started+45001).remainingMs,525000);
  // Manual +10-minute button is the only budget refill.
  snapshot=await auth.sessionAction(session,hash,cfg,'reset',started+45010);
  assert.equal(snapshot.remainingMs,600000);
  // Expired time cannot be resurrected by a new activity OR by reset.
  assert.equal(await auth.sessionAction(session,hash,cfg,'activity',started+45010+630001),null);
  assert.equal(await auth.sessionAction(session,hash,cfg,'reset',started+45010+630002),null);
  const access=await invoke(authApi,req('GET',{},null,{authorization:'Bearer '+session}));
  assert.equal(access.statusCode,401);
});
test('session API reports remaining budget and rejects unauthenticated extension',async t=>{
  withEnv(t);redisMock(t);
  const {session}=await enroll();
  const unauthorized=await invoke(authApi,req('POST',{mode:'reset'},{}));
  assert.equal(unauthorized.statusCode,401);
  const check=await invoke(authApi,req('GET',{},null,{authorization:'Bearer '+session}));
  assert.equal(check.statusCode,200);
  assert.ok(check.body.sessionClock.remainingMs>0);
  assert.equal(check.body.sessionClock.graceMs,30000);
  const activity=await invoke(authApi,req('POST',{mode:'activity'},{},{authorization:'Bearer '+session}));
  assert.equal(activity.statusCode,200);
  assert.equal(activity.body.sessionClock.bankMs,600000);
  const reset=await invoke(authApi,req('POST',{mode:'reset'},{},{authorization:'Bearer '+session}));
  assert.equal(reset.statusCode,200);
  assert.equal(reset.body.sessionClock.remainingMs,600000);
});
test('browser clock pauses after input, resumes after 30s and resets only on explicit call',()=>{
  const {SessionClock}=require('../../admin/session-clock.js');
  const clock=new SessionClock();
  clock.sync({bankMs:600000,ageMs:0,graceMs:30000},1000000);
  assert.equal(clock.remaining(1029999),600000);
  assert.equal(clock.isCounting(1029999),false);
  assert.equal(clock.remaining(1031000),599000);
  assert.equal(clock.isCounting(1031000),true);
  assert.equal(clock.activity(1090000),540000);
  assert.equal(clock.isCounting(1091000),false);
  assert.equal(clock.remaining(1120000),540000);
  assert.equal(clock.remaining(1140000),520000);
  assert.equal(clock.activity(1140000),520000);
  assert.equal(clock.remaining(1160000),520000);
  assert.equal(clock.reset(1160000),600000);
  assert.equal(clock.format(1160000),'10:00');
});
test('admin topbar maintains timer → extension → theme → logout and reloadable state',()=>{
  const html=fs.readFileSync(path.join(__dirname,'../../admin/index.html'),'utf8');
  const js=fs.readFileSync(path.join(__dirname,'../../admin/admin.js'),'utf8');
  const css=fs.readFileSync(path.join(__dirname,'../../admin/admin.css'),'utf8');
  const clockSrc=fs.readFileSync(path.join(__dirname,'../../admin/session-clock.js'),'utf8');
  const ids=['adminSessionTimer','adminSessionReset','adminThemeToggle','adminLogout'];
  const starts=ids.map(id=>html.indexOf('id="'+id+'"'));
  assert.ok(starts.every(p=>p>=0));
  assert.deepEqual(starts,[...starts].sort((a,b)=>a-b));
  assert.ok(html.indexOf('session-clock.js?v=2.30')<html.indexOf('admin.js?v=2.30'));
  assert.ok(js.includes('clock.sync(result.sessionClock)'));
  assert.ok(js.includes("mode=activity"));
  assert.ok(js.includes("mode=reset"));
  assert.ok(js.includes('applyAdminTheme'));
  assert.ok(css.includes('.admin-top-actions'));
  assert.ok(clockSrc.includes('this.bankMs=this.remaining(now)'));
});


test('leaving admin immediately skips 30s grace, while return retains unused budget',async t=>{
  withEnv(t);const db=redisMock(t);
  const {session}=await enroll();
  const cfg=auth.config(),hash=await auth.currentHash(cfg);
  const key=auth.sessionKey(session);
  const initial=JSON.parse(db.kv.get(key));
  const departure=initial.a+20000;
  const left=await auth.sessionAction(session,hash,cfg,'leave',departure);
  assert.equal(left.remainingMs,600000,'leaving within grace does not spend time yet');
  assert.equal(left.ageMs,30000,'departure instantly exhausts the grace period');
  const leftState=JSON.parse(db.kv.get(key));
  assert.equal(leftState.a,departure-30000);
  assert.equal(auth.sessionClock(leftState,departure+1000).remainingMs,599000);
  assert.equal(auth.sessionClock(leftState,departure+90000).remainingMs,510000);
  const resumed=await auth.sessionAction(session,hash,cfg,'activity',departure+90000);
  assert.equal(resumed.remainingMs,510000,'ordinary return does not restore ten minutes');
  assert.equal(auth.sessionClock(db.kv.get(key),departure+91000).remainingMs,510000,
    '30-second grace applies again only after renewed admin activity');
  const nextLeave=await auth.sessionAction(session,hash,cfg,'leave',departure+91000);
  assert.equal(nextLeave.remainingMs,510000);
  assert.equal(auth.sessionClock(db.kv.get(key),departure+92000).remainingMs,509000);
});

test('admin home link awaits authenticated departure before navigating',()=>{
  const js=fs.readFileSync(path.join(__dirname,'../../admin/admin.js'),'utf8');
  const html=fs.readFileSync(path.join(__dirname,'../../admin/index.html'),'utf8');
  assert.match(js,/event\.target\?\.closest\?\.\('a\.admin-back'\)/);
  assert.match(js,/homeLink\.addEventListener\('click',async event=>/);
  assert.match(js,/event\.preventDefault\(\)/);
  assert.match(js,/await Promise\.race\(\[leaveAdmin\(\{keepalive:true\}\)/);
  assert.match(js,/window\.location\.assign\(homeLink\.href\)/);
  assert.match(js,/window\.addEventListener\('pagehide'/);
  assert.match(js,/document\.addEventListener\('visibilitychange'/);
  assert.match(js,/mode=leave/);
  assert.match(html,/admin\.js\?v=2\.30&leave=1/);
});
