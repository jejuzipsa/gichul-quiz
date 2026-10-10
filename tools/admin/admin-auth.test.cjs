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
  assert.ok(frontend.includes('?mode=verify'));
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
