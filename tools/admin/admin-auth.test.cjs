'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const auth=require('../../lib/admin-auth.js');
const handler=require('../../api/admin-auth.js');
const fs=require('node:fs');
const path=require('node:path');

const ORIGIN='https://jejuzipsa.github.io';
const SEED=auth.createPasswordHash('InitialStrongPass-123');
const SECRET='x'.repeat(64);
function res(){
  return {statusCode:200,headers:{},setHeader(k,v){this.headers[k.toLowerCase()]=v},
    end(body){this.body=body?JSON.parse(body):undefined}};
}
function req(method,query={},body={},headers={}){
  return {method,query,body,headers:{origin:ORIGIN,...headers}};
}
function withEnv(t){
  const keys=['GICHUL_ADMIN_INITIAL_PASSWORD_HASH','GICHUL_ADMIN_SESSION_SECRET','UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN'];
  const original=keys.map(k=>process.env[k]);
  process.env.GICHUL_ADMIN_INITIAL_PASSWORD_HASH=SEED;
  process.env.GICHUL_ADMIN_SESSION_SECRET=SECRET;
  process.env.UPSTASH_REDIS_REST_URL='https://fake-redis.upstash.io';
  process.env.UPSTASH_REDIS_REST_TOKEN='fake-token';
  t.after(()=>keys.forEach((k,i)=>{if(original[i]===undefined)delete process.env[k];else process.env[k]=original[i]}));
}
function redisMock(t){
  const original=global.fetch;
  const store=new Map();
  global.fetch=async(url,options)=>{
    assert.equal(url,'https://fake-redis.upstash.io');
    assert.equal(options.headers.Authorization,'Bearer fake-token');
    const [command,key,value]=JSON.parse(options.body);
    let result=null;
    if(command==='GET')result=store.has(key)?store.get(key):null;
    else if(command==='SET'){store.set(key,value);result='OK'}
    else if(command==='INCR'){result=Number(store.get(key)||0)+1;store.set(key,String(result))}
    else if(command==='EXPIRE')result=1;
    else throw Error('Unknown command '+command);
    return {ok:true,json:async()=>({result})};
  };
  t.after(()=>{global.fetch=original});
}
test('passwords use salted scrypt hashes, never plaintext',()=>{
  const a=auth.createPasswordHash('InitialStrongPass-123');
  const b=auth.createPasswordHash('InitialStrongPass-123');
  assert.notEqual(a,b);
  assert.ok(auth.verifyPassword('InitialStrongPass-123',a));
  assert.equal(auth.verifyPassword('wrong',a),false);
  assert.equal(auth.verifyPassword('InitialStrongPass-123',a.replace('scrypt$','sha$')),false);
  assert.throws(()=>auth.createPasswordHash('short'));
});
test('sessions reject expiry, altered signatures and password rotation',()=>{
  const token=auth.createSession(SEED,SECRET,1000);
  assert.ok(auth.verifySession(token,SEED,SECRET,1100));
  assert.ok(!auth.verifySession(token,SEED,SECRET,1000+auth.SESSION_SECONDS));
  assert.ok(!auth.verifySession(token,SEED,'y'.repeat(64),1100));
  assert.ok(!auth.verifySession(token,auth.createPasswordHash('OtherStrongPass-123'),SECRET,1100));
});
test('login, authentication, password change and old session invalidation',async t=>{
  withEnv(t);redisMock(t);
  let r=res();
  await handler(req('POST',{mode:'login'},{username:'admin',password:'wrong'}),r);
  assert.equal(r.statusCode,401);
  assert.equal(r.body.error,'INVALID_CREDENTIALS');
  r=res();
  await handler(req('POST',{mode:'login'},{username:'admin',password:'InitialStrongPass-123'}),r);
  assert.equal(r.statusCode,200);
  const session=r.body.session;
  assert.ok(session&&!session.includes('InitialStrongPass-123'));
  r=res();
  await handler(req('GET',{},null,{authorization:'Bearer '+session}),r);
  assert.equal(r.statusCode,200);
  assert.equal(r.body.username,'admin');
  r=res();
  await handler(req('POST',{mode:'change-password'},{currentPassword:'wrong',newPassword:'AnotherNewPassword-321'},{authorization:'Bearer '+session}),r);
  assert.equal(r.statusCode,401);
  r=res();
  await handler(req('POST',{mode:'change-password'},{currentPassword:'InitialStrongPass-123',newPassword:'AnotherNewPassword-321'},{authorization:'Bearer '+session}),r);
  assert.equal(r.statusCode,200);
  const updatedSession=r.body.session;
  r=res();
  await handler(req('GET',{},null,{authorization:'Bearer '+session}),r);
  assert.equal(r.statusCode,401);
  r=res();
  await handler(req('GET',{},null,{authorization:'Bearer '+updatedSession}),r);
  assert.equal(r.statusCode,200);
  r=res();
  await handler(req('POST',{mode:'login'},{username:'admin',password:'InitialStrongPass-123'}),r);
  assert.equal(r.statusCode,401);
  r=res();
  await handler(req('POST',{mode:'login'},{username:'admin',password:'AnotherNewPassword-321'}),r);
  assert.equal(r.statusCode,200);
});
test('login rejects non-project origins and no server secrets are in frontend',async t=>{
  withEnv(t);redisMock(t);
  const r=res();
  await handler(req('POST',{mode:'login'},{username:'admin',password:'InitialStrongPass-123'},{origin:'https://evil.example'}),r);
  assert.equal(r.statusCode,403);
  const root=path.resolve(__dirname,'../..');
  const adminHtml=fs.readFileSync(path.join(root,'admin/index.html'),'utf8');
  const adminJs=fs.readFileSync(path.join(root,'admin/admin.js'),'utf8');
  const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
  assert.ok(index.includes('class="admin-entry-link"'));
  assert.ok(adminHtml.includes('id="adminLoginForm"'));
  assert.ok(adminHtml.includes('id="adminPasswordForm"'));
  assert.ok(!adminHtml.includes('github.com/login/oauth'));
  for(const secret of ['GICHUL_ADMIN_INITIAL_PASSWORD_HASH','UPSTASH_REDIS_REST_TOKEN','GICHUL_ADMIN_SESSION_SECRET'])
    assert.ok(!adminJs.includes(secret)&&!adminHtml.includes(secret),'server secret in frontend');
});
test('missing configuration fails closed',async t=>{
  const keys=['GICHUL_ADMIN_INITIAL_PASSWORD_HASH','GICHUL_ADMIN_SESSION_SECRET','UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN','KV_REST_API_URL','KV_REST_API_TOKEN'];
  const original=keys.map(k=>process.env[k]);
  keys.forEach(k=>delete process.env[k]);
  t.after(()=>keys.forEach((k,i)=>{if(original[i]===undefined)delete process.env[k];else process.env[k]=original[i]}));
  const r=res();await handler(req('POST',{mode:'login'},{username:'admin',password:'irrelevant'}),r);
  assert.equal(r.statusCode,503);
  assert.equal(r.body.error,'ADMIN_NOT_CONFIGURED');
});
