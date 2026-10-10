'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const auth=require('../../lib/admin-auth.js');
const logs=require('../../lib/visit-logs.js');
const authApi=require('../../api/admin-auth.js');
const visitApi=require('../../api/visit.js');
const logsApi=require('../../api/admin-logs.js');

const ORIGIN='https://jejuzipsa.github.io';
const INITIAL='InitialStrongPass-123';
const UPDATED='AnotherNewPassword-321';
const SEED=auth.createPasswordHash(INITIAL);
const SECRET='x'.repeat(64);
const IP='203.0.113.87';
const UA='Mozilla/5.0 (Windows NT 10.0) Chrome/154.0.0.0';
function res(){
  return {statusCode:200,headers:{},setHeader(k,v){this.headers[k.toLowerCase()]=v},
    end(body){this.body=body?JSON.parse(body):undefined}};
}
function req(method,query={},body={},headers={}){
  return {method,query,body,headers:{origin:ORIGIN,
    'x-vercel-forwarded-for':IP,'user-agent':UA,...headers}};
}
function withEnv(t){
  const keys=['GICHUL_ADMIN_INITIAL_PASSWORD_HASH','GICHUL_ADMIN_SESSION_SECRET',
    'UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN',
    'KV_REST_API_URL','KV_REST_API_TOKEN'];
  const previous=keys.map(k=>process.env[k]);
  process.env.GICHUL_ADMIN_INITIAL_PASSWORD_HASH=SEED;
  process.env.GICHUL_ADMIN_SESSION_SECRET=SECRET;
  process.env.UPSTASH_REDIS_REST_URL='https://fake-redis.upstash.io';
  process.env.UPSTASH_REDIS_REST_TOKEN='fake-token';
  t.after(()=>keys.forEach((key,i)=>{
    if(previous[i]===undefined)delete process.env[key];
    else process.env[key]=previous[i];
  }));
}
function redisMock(t){
  const prev=global.fetch;
  const kv=new Map();
  const zsets=new Map();
  global.fetch=async (url,options)=>{
    assert.equal(url,'https://fake-redis.upstash.io');
    assert.equal(options.headers.Authorization,'Bearer fake-token');
    const [command,key,...args]=JSON.parse(options.body);
    let result=null;
    switch(command){
      case 'GET': result=kv.has(key)?kv.get(key):null;break;
      case 'SET':
        if(args.includes('NX')&&kv.has(key))result=null;
        else{kv.set(key,args[0]);result='OK'}
        break;
      case 'DEL': result=kv.delete(key)?1:0;break;
      case 'INCR':
        result=Number(kv.get(key)||0)+1;
        kv.set(key,String(result));
        break;
      case 'EXPIRE': result=1;break;
      case 'MGET': result=[key,...args].map(k=>kv.has(k)?kv.get(k):null);break;
      case 'ZADD':{
        const set=zsets.get(key)||new Map();
        set.set(args[1],Number(args[0]));
        zsets.set(key,set);
        result=1;break;
      }
      case 'ZREMRANGEBYSCORE':{
        const set=zsets.get(key)||new Map();
        const ceiling=Number(args[1]);
        for(const [member,score] of set)if(score<=ceiling)set.delete(member);
        result=1;break;
      }
      case 'ZREMRANGEBYRANK':{
        const set=zsets.get(key)||new Map();
        const keep=Math.abs(Number(args[1]))-1;
        const sorted=[...set.entries()].sort((a,b)=>a[1]-b[1]);
        for(const [member] of sorted.slice(0,Math.max(0,sorted.length-keep)))set.delete(member);
        result=1;break;
      }
      case 'ZREVRANGE':{
        const set=zsets.get(key)||new Map();
        result=[...set.entries()].sort((a,b)=>b[1]-a[1]).map(([member])=>member)
          .slice(Number(args[0]),Number(args[1])+1);
        break;
      }
      default:throw new Error('UNSUPPORTED_REDIS_COMMAND '+command);
    }
    return {ok:true,json:async()=>({result})};
  };
  t.after(()=>{global.fetch=prev});
  return {kv,zsets};
}
async function invoke(handler,request){const response=res();await handler(request,response);return response}

test('password hashes are salted, validated and never contain plaintext',()=>{
  const a=auth.createPasswordHash(INITIAL),b=auth.createPasswordHash(INITIAL);
  assert.notEqual(a,b);
  assert.ok(auth.verifyPassword(INITIAL,a));
  assert.equal(auth.verifyPassword('wrong',a),false);
  assert.throws(()=>auth.createPasswordHash('short'));
  assert.ok(!a.includes(INITIAL));
});
test('session token has unique ID, expiry, HMAC and password-fingerprint binding',()=>{
  const a=auth.createSession(SEED,SECRET,1000);
  const b=auth.createSession(SEED,SECRET,1000);
  assert.notEqual(a,b,'concurrent sign-ins must have distinct sessions');
  assert.ok(auth.verifySession(a,SEED,SECRET,1100));
  assert.ok(!auth.verifySession(a,SEED,SECRET,1000+auth.SESSION_SECONDS));
  assert.ok(!auth.verifySession(a,SEED,'z'.repeat(64),1100));
  assert.ok(!auth.verifySession(a,auth.createPasswordHash(UPDATED),SECRET,1100));
});
test('admin login/failure audit, new device flag, actual logout revocation and password rotation',async t=>{
  withEnv(t);redisMock(t);
  let r=await invoke(authApi,req('POST',{mode:'login'},{username:'admin',password:'wrong'}));
  assert.equal(r.statusCode,401);
  r=await invoke(authApi,req('POST',{mode:'login'},{username:'admin',password:INITIAL,
    deviceId:'f8954498-5fc0-43a5-a986-fcc1966c8ff3'}));
  assert.equal(r.statusCode,200);
  assert.equal(r.body.security.newDevice,true);
  assert.equal(r.body.security.newIp,true);
  const first=r.body.session;
  r=await invoke(authApi,req('GET',{},null,{authorization:'Bearer '+first}));
  assert.equal(r.statusCode,200);
  r=await invoke(authApi,req('POST',{mode:'login'},{username:'admin',password:INITIAL,
    deviceId:'f8954498-5fc0-43a5-a986-fcc1966c8ff3'}));
  assert.equal(r.statusCode,200);
  assert.equal(r.body.security.newDevice,false);
  assert.equal(r.body.security.newIp,false);
  const second=r.body.session;
  r=await invoke(authApi,req('POST',{mode:'logout'},{},{authorization:'Bearer '+first}));
  assert.equal(r.statusCode,200);
  r=await invoke(authApi,req('GET',{},null,{authorization:'Bearer '+first}));
  assert.equal(r.statusCode,401,'logout must revoke server-side session');
  r=await invoke(authApi,req('GET',{},null,{authorization:'Bearer '+second}));
  assert.equal(r.statusCode,200,'other active sessions survive normal logout');

  r=await invoke(authApi,req('POST',{mode:'change-password'},
    {currentPassword:INITIAL,newPassword:UPDATED},{authorization:'Bearer '+second}));
  assert.equal(r.statusCode,200);
  const third=r.body.session;
  r=await invoke(authApi,req('GET',{},null,{authorization:'Bearer '+second}));
  assert.equal(r.statusCode,401,'password change revokes all older signed sessions');
  r=await invoke(authApi,req('GET',{},null,{authorization:'Bearer '+third}));
  assert.equal(r.statusCode,200);

  r=await invoke(authApi,req('POST',{mode:'login'},{username:'admin',password:INITIAL}));
  assert.equal(r.statusCode,401,'old password is no longer valid');
  r=await invoke(authApi,req('POST',{mode:'login'},{username:'admin',password:UPDATED}));
  assert.equal(r.statusCode,200);
  const data=await invoke(logsApi,req('GET',{},null,{authorization:'Bearer '+third}));
  assert.equal(data.statusCode,200);
  const entries=data.body.admin;
  assert.equal(entries.filter(e=>e.kind==='login_success').length,3,'log every successful login, even duplicates');
  assert.equal(entries.filter(e=>e.kind==='login_failed').length,2);
  assert.equal(entries.filter(e=>e.kind==='password_changed').length,1);
  assert.equal(entries.filter(e=>e.kind==='logout').length,1);
  assert.ok(entries.every(e=>e.ip==='203.0.113.xxx'));
  assert.ok(entries.every(e=>!JSON.stringify(e).includes('session')));
  assert.ok(entries.every(e=>!JSON.stringify(e).includes(INITIAL)));
});
test('public entry log ignores page navigation and deduplicates same IP/browser once per Korea day',async t=>{
  withEnv(t);redisMock(t);
  let r=await invoke(visitApi,req('POST',{},{}));
  assert.equal(r.statusCode,204);
  r=await invoke(visitApi,req('POST',{},{}));
  assert.equal(r.statusCode,204);
  r=await invoke(visitApi,req('POST',{}, {},{'user-agent':'Mozilla/5.0 Firefox/153'}));
  assert.equal(r.statusCode,204);
  const adminLogin=await invoke(authApi,req('POST',{mode:'login'},{username:'admin',password:INITIAL}));
  const token=adminLogin.body.session;
  r=await invoke(visitApi,req('POST',{}, {},{authorization:'Bearer '+token}));
  assert.equal(r.statusCode,204,'admin visit ping not counted as anonymous');
  const data=await invoke(logsApi,req('GET',{},null,{authorization:'Bearer '+token}));
  assert.equal(data.statusCode,200);
  assert.equal(data.body.today,2);
  assert.equal(data.body.week,2);
  assert.equal(data.body.month,2);
  assert.equal(data.body.visitors.length,2);
  assert.ok(data.body.visitors.every(e=>e.kind==='visitor'&&e.ip==='203.0.113.xxx'));
  assert.ok(data.body.visitors.every(e=>!Object.hasOwn(e,'path')));
  const blocked=await invoke(logsApi,req('GET',{},null));
  assert.equal(blocked.statusCode,401,'audit data may not be read anonymously');
});
test('Korean midnight rotates daily visitor uniqueness, while old events are not returned',async t=>{
  withEnv(t);redisMock(t);
  const c=auth.config();
  const before=Date.UTC(2026,9,10,14,59);
  const after=Date.UTC(2026,9,10,15,1);
  assert.equal(logs.kstDate(before),'2026-10-10');
  assert.equal(logs.kstDate(after),'2026-10-11');
  assert.equal((await logs.recordVisit(c,req('POST'),before)).recorded,true);
  assert.equal((await logs.recordVisit(c,req('POST'),before)).recorded,false);
  assert.equal((await logs.recordVisit(c,req('POST'),after)).recorded,true);
  const data=await logs.readDashboard(c,after);
  assert.equal(data.today,1);
  assert.equal(data.week,2);
  assert.equal(data.visitors.length,2);
});
test('unknown origins and missing config fail closed; static pages include entry tracker',async t=>{
  withEnv(t);redisMock(t);
  let r=await invoke(authApi,req('POST',{mode:'login'},{username:'admin',password:INITIAL},
    {origin:'https://untrusted.example'}));
  assert.equal(r.statusCode,403);
  r=await invoke(visitApi,req('POST',{}, {},{origin:'https://untrusted.example'}));
  assert.equal(r.statusCode,403);
  const root=path.join(__dirname,'../..');
  const frontend=fs.readFileSync(path.join(root,'admin/admin.js'),'utf8');
  const adminHtml=fs.readFileSync(path.join(root,'admin/index.html'),'utf8');
  assert.ok(adminHtml.includes('id="adminLogRows"'));
  assert.ok(adminHtml.includes('id="visitorLogRows"'));
  assert.ok(frontend.includes('admin-logs'));
  for(const file of ['index.html','word-quiz/index.html','core-cards/index.html','law-search/index.html']){
    const html=fs.readFileSync(path.join(root,file),'utf8');
    assert.match(html,/visit\.js\?v=2\.28/);
  }
  const visitor=fs.readFileSync(path.join(root,'visit.js'),'utf8');
  assert.ok(!visitor.includes('location.pathname')&&!visitor.includes('location.href'));
  assert.ok(!visitor.includes('document.cookie'));
  for(const secret of ['GICHUL_ADMIN_INITIAL_PASSWORD_HASH','KV_REST_API_TOKEN','GICHUL_ADMIN_SESSION_SECRET']){
    assert.ok(!frontend.includes(secret)&&!adminHtml.includes(secret)&&!visitor.includes(secret));
  }
});
test('unconfigured backend does not expose administrator or visitor logging',async t=>{
  const keys=['GICHUL_ADMIN_INITIAL_PASSWORD_HASH','GICHUL_ADMIN_SESSION_SECRET',
    'UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN','KV_REST_API_URL','KV_REST_API_TOKEN'];
  const old=keys.map(k=>process.env[k]);
  keys.forEach(k=>delete process.env[k]);
  t.after(()=>keys.forEach((k,i)=>{if(old[i]===undefined)delete process.env[k];else process.env[k]=old[i]}));
  const a=await invoke(authApi,req('POST',{mode:'login'},{username:'admin',password:INITIAL}));
  const b=await invoke(visitApi,req('POST',{},{}));
  assert.equal(a.statusCode,503);
  assert.equal(b.statusCode,503);
});
