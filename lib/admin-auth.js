'use strict';
// Single-account authentication: secret hashes and Redis credentials never leave Vercel.
const crypto = require('node:crypto');

const ORIGIN = 'https://jejuzipsa.github.io';
const ALLOWED_ORIGINS = new Set([ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:3000']);
const PASSWORD_KEY = 'gichul:admin:password:v1';
const PASSWORD_MIN_LENGTH = 12;
const MAX_PASSWORD_LENGTH = 128;
// Signed-token ceiling is a backstop, not the inactivity timeout.
const SESSION_SECONDS = 24 * 60 * 60;
const SESSION_IDLE_SECONDS = 10 * 60;
const SESSION_GRACE_SECONDS = 30;
const SESSION_IDLE_MS = SESSION_IDLE_SECONDS * 1000;
const SESSION_GRACE_MS = SESSION_GRACE_SECONDS * 1000;

function config(env = process.env) {
  const totpKey = String(env.GICHUL_ADMIN_TOTP_ENCRYPTION_KEY || '');
  const sessionSecret = String(env.GICHUL_ADMIN_SESSION_SECRET || '');
  const redisUrl = String(env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL || '').replace(/\/+$/, '');
  const redisToken = String(env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN || '');
  const keyBytes = /^[A-Za-z0-9_-]{43}$/.test(totpKey)?Buffer.from(totpKey,'base64url'):Buffer.alloc(0);
  const configured = keyBytes.length===32 && sessionSecret.length >= 32 &&
    /^https:\/\//.test(redisUrl) && !!redisToken;
  return {totpKey:keyBytes, sessionSecret, redisUrl, redisToken, configured};
}

function noStore(res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
}
function cors(req,res) {
  res.setHeader('Vary','Origin');
  const origin = String(req.headers?.origin || '');
  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  }
  return origin;
}
function respond(res,code,data) {
  noStore(res);
  res.statusCode=code;
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}
function requireOrigin(req,res) {
  const origin = String(req.headers?.origin || '');
  if (!ALLOWED_ORIGINS.has(origin)) {
    respond(res,403,{error:'ORIGIN_NOT_ALLOWED'});
    return false;
  }
  return true;
}
function readBody(req) {
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body) ||
      JSON.stringify(body).length > 1500) throw new Error('BAD_BODY');
  return body;
}
function createPasswordHash(password, salt = crypto.randomBytes(16)) {
  if (typeof password !== 'string' || password.length < PASSWORD_MIN_LENGTH ||
      password.length > MAX_PASSWORD_LENGTH) throw new Error('BAD_PASSWORD_LENGTH');
  const hash = crypto.scryptSync(password,salt,32,{N:16384,r:8,p:1});
  return 'scrypt$'+salt.toString('base64url')+'$'+hash.toString('base64url');
}
function verifyPassword(password, stored) {
  if (typeof password !== 'string' || password.length > MAX_PASSWORD_LENGTH ||
      typeof stored !== 'string') return false;
  const fields=stored.split('$');
  if (fields.length!==3 || fields[0]!=='scrypt') return false;
  try {
    const salt=Buffer.from(fields[1],'base64url');
    const actual=Buffer.from(fields[2],'base64url');
    if (salt.length!==16 || actual.length!==32) return false;
    const derived=crypto.scryptSync(password,salt,32,{N:16384,r:8,p:1});
    return crypto.timingSafeEqual(derived,actual);
  } catch { return false; }
}
function hmac(value,secret) {
  return crypto.createHmac('sha256',secret).update(value).digest('base64url');
}
function fingerprint(hash) {
  return crypto.createHash('sha256').update(hash).digest('base64url').slice(0,32);
}
function createSession(hash,secret,now=Math.floor(Date.now()/1000)) {
  const payload=Buffer.from(JSON.stringify({iss:'gichul-admin',sub:'admin',
    v:fingerprint(hash),mfa:true,jti:crypto.randomBytes(16).toString('hex'),iat:now,exp:now+SESSION_SECONDS})).toString('base64url');
  return payload+'.'+hmac(payload,secret);
}
function verifySession(token,hash,secret,now=Math.floor(Date.now()/1000)) {
  if (typeof token!=='string' || token.length>1600) return false;
  const parts=token.split('.');
  if (parts.length!==2 || !parts.every(v=>/^[A-Za-z0-9_-]+$/.test(v)))return false;
  const expected=Buffer.from(hmac(parts[0],secret));
  const actual=Buffer.from(parts[1]);
  if (expected.length!==actual.length || !crypto.timingSafeEqual(expected,actual))return false;
  try {
    const p=JSON.parse(Buffer.from(parts[0],'base64url').toString('utf8'));
    return p.iss==='gichul-admin' && p.sub==='admin' &&
      p.v===fingerprint(hash) && p.mfa===true && /^[a-f0-9]{32}$/.test(p.jti) &&
      Number.isSafeInteger(p.iat) && Number.isSafeInteger(p.exp) &&
      p.iat<=now+60 && p.exp>now && p.exp-p.iat===SESSION_SECONDS;
  }catch{return false}
}
function bearer(req) {
  const auth=String(req.headers?.authorization||'');
  return /^Bearer ([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)$/.exec(auth)?.[1]||'';
}
async function redis(config, args) {
  const res=await fetch(config.redisUrl, {
    method:'POST',
    headers:{Authorization:'Bearer '+config.redisToken,'Content-Type':'application/json'},
    body:JSON.stringify(args),
    signal:AbortSignal.timeout(6500)
  });
  if(!res.ok)throw new Error('STORE_UNAVAILABLE');
  const data=await res.json();
  if(data.error)throw new Error('STORE_UNAVAILABLE');
  return data.result;
}
async function currentHash(c) {
  const stored=await redis(c,['GET',PASSWORD_KEY]);
  // Fail closed: never revive the previously published bootstrap password.
  if (stored === null || stored === undefined) throw new Error('ADMIN_PASSWORD_MISSING');
  if (typeof stored!=='string'||!/^scrypt\$/.test(stored))throw new Error('INVALID_STORED_HASH');
  return stored;
}
function sessionKey(token){
  return 'gichul:admin:sessions:'+crypto.createHash('sha256').update(token).digest('hex');
}
function parseSessionState(raw) {
  if(typeof raw!=='string')return null;
  try{
    const o=JSON.parse(raw);
    if(!o||!Number.isSafeInteger(o.b)||!Number.isSafeInteger(o.a)||
      o.b<0||o.b>SESSION_IDLE_MS||o.a<0)return null;
    return o;
  }catch{return null}
}
function sessionClock(raw,now=Date.now()){
  const state=typeof raw==='string'?parseSessionState(raw):raw;
  if(!state)return null;
  const elapsed=Math.max(0,now-state.a);
  const remainingMs=Math.max(0,state.b-Math.max(0,elapsed-SESSION_GRACE_MS));
  if(remainingMs<=0)return null;
  return {remainingMs,bankMs:state.b,ageMs:elapsed,graceMs:SESSION_GRACE_MS};
}
// Atomic across tabs. A normal activity never refills the budget.
// The explicit reset button is the only path to a fresh ten minutes.
const SESSION_LUA="local v=redis.call('GET',KEYS[1])\nif not v then return {0,0} end\nlocal ok,s=pcall(cjson.decode,v)\nif not ok or type(s)~='table' or type(s.b)~='number' or type(s.a)~='number' then return {0,0} end\nlocal now=tonumber(ARGV[1])\nlocal grace=tonumber(ARGV[2])\nlocal full=tonumber(ARGV[3])\nlocal spent=math.max(0,now-s.a-grace)\nlocal left=math.max(0,s.b-spent)\nif left<=0 then redis.call('DEL',KEYS[1]);return {0,0} end\nif ARGV[4]=='reset' then left=full end\ns.b=left\ns.a=now\nredis.call('SET',KEYS[1],cjson.encode(s),'PX',left+grace)\nreturn {1,math.floor(left)}";
async function issueSession(hash,c){
  const token=createSession(hash,c.sessionSecret);
  const state=JSON.stringify({b:SESSION_IDLE_MS,a:Date.now()});
  await redis(c,['SET',sessionKey(token),state,'PX',String(SESSION_IDLE_MS+SESSION_GRACE_MS)]);
  return token;
}
async function revokeSession(token,c){
  if(token)await redis(c,['DEL',sessionKey(token)]);
}
async function sessionInfo(token,hash,c,now=Date.now()){
  if(!verifySession(token,hash,c.sessionSecret))return null;
  const raw=await redis(c,['GET',sessionKey(token)]);
  return sessionClock(raw,now);
}
async function sessionAction(token,hash,c,mode='activity',now=Date.now()){
  if(!verifySession(token,hash,c.sessionSecret))return null;
  if(mode!=='activity'&&mode!=='reset')return null;
  const result=await redis(c,['EVAL',SESSION_LUA,'1',sessionKey(token),
    String(now),String(SESSION_GRACE_MS),String(SESSION_IDLE_MS),mode]);
  if(!Array.isArray(result)||Number(result[0])!==1)return null;
  return {remainingMs:Number(result[1]),bankMs:Number(result[1]),ageMs:0,graceMs:SESSION_GRACE_MS};
}
async function authenticatedAdmin(req,c){
  if(!c.configured)return false;
  const hash=await currentHash(c);
  const token=bearer(req);
  return !!(await sessionInfo(token,hash,c));
}
async function requireAdmin(req,res,c) {
  if (!c.configured) {respond(res,503,{error:'ADMIN_NOT_CONFIGURED'});return null}
  try {
    const hash=await currentHash(c);
    if(!(await authenticatedAdmin(req,c))) {
      respond(res,401,{error:'AUTH_REQUIRED'});return null;
    }
    return hash;
  }catch {
    respond(res,503,{error:'STORE_UNAVAILABLE'});return null;
  }
}
function rateKey(req,c) {
  // Only a short HMAC digest is stored: never store the visitor's raw IP.
  const ip=String(req.headers?.['x-vercel-forwarded-for']||req.headers?.['x-real-ip']||'unknown').split(',')[0].trim();
  return 'gichul:admin:login-attempts:'+hmac(ip,c.sessionSecret).slice(0,24);
}
async function checkRateLimit(req,c) {
  const key=rateKey(req,c);
  const count=Number(await redis(c,['INCR',key]));
  if(count===1)await redis(c,['EXPIRE',key,'900']);
  return count<=10;
}
module.exports={
  ORIGIN,PASSWORD_KEY,SESSION_SECONDS,SESSION_IDLE_SECONDS,SESSION_GRACE_SECONDS,SESSION_IDLE_MS,SESSION_GRACE_MS,config,noStore,cors,respond,requireOrigin,readBody,
  createPasswordHash,verifyPassword,createSession,verifySession,bearer,redis,currentHash,
  sessionKey,issueSession,revokeSession,sessionInfo,sessionAction,sessionClock,parseSessionState,authenticatedAdmin,requireAdmin,checkRateLimit
};
