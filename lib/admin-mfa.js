'use strict';
// Server-only TOTP secrets and one-use recovery codes for the single admin account.
// RFC 6238 (SHA-1 / 30 seconds / 6 digits), compatible with Microsoft Authenticator.
const crypto=require('node:crypto');
const {redis}=require('./admin-auth.js');
const MFA_KEY='gichul:admin:mfa:secret:v1';
const RECOVERY_KEY='gichul:admin:mfa:recovery:v1';
const CHALLENGE_PREFIX='gichul:admin:mfa:challenge:v1:';
const PENDING_PREFIX='gichul:admin:mfa:pending:v1:';
const STEP_SECONDS=30;
const CHALLENGE_SECONDS=300;
const ENROLL_SECONDS=600;
const B32='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function base32(buf){
  let output='',value=0,bits=0;
  for(const byte of buf){
    value=(value<<8)|byte;
    bits+=8;
    while(bits>=5){output+=B32[(value>>>(bits-=5))&31];}
  }
  if(bits)output+=B32[(value<<(5-bits))&31];
  return output;
}
function unbase32(s){
  if(typeof s!=='string'||!/^[A-Z2-7]{32}$/.test(s))throw Error('INVALID_TOTP_SECRET');
  let value=0,bits=0;const out=[];
  for(const letter of s){
    value=(value<<5)|B32.indexOf(letter);bits+=5;
    if(bits>=8){out.push((value>>>(bits-=8))&255);}
  }
  return Buffer.from(out);
}
function generateSecret(){return base32(crypto.randomBytes(20));}
function encryptSecret(secret,c){
  const iv=crypto.randomBytes(12);
  const cipher=crypto.createCipheriv('aes-256-gcm',c.totpKey,iv);
  const encrypted=Buffer.concat([cipher.update(secret,'utf8'),cipher.final()]);
  return ['v1',iv.toString('base64url'),cipher.getAuthTag().toString('base64url'),encrypted.toString('base64url')].join('.');
}
function decryptSecret(value,c){
  if(typeof value!=='string')throw Error('INVALID_TOTP_SECRET');
  const parts=value.split('.');
  if(parts.length!==4||parts[0]!=='v1')throw Error('INVALID_TOTP_SECRET');
  const decipher=crypto.createDecipheriv('aes-256-gcm',c.totpKey,Buffer.from(parts[1],'base64url'));
  decipher.setAuthTag(Buffer.from(parts[2],'base64url'));
  const secret=Buffer.concat([decipher.update(Buffer.from(parts[3],'base64url')),decipher.final()]).toString('utf8');
  unbase32(secret);
  return secret;
}
function otpAt(secret,step){
  const counter=Buffer.alloc(8);
  counter.writeBigUInt64BE(BigInt(step));
  const digest=crypto.createHmac('sha1',unbase32(secret)).update(counter).digest();
  const offset=digest[digest.length-1]&15;
  const n=(digest.readUInt32BE(offset)&0x7fffffff)%1000000;
  return String(n).padStart(6,'0');
}
function validTotp(secret,code,now=Date.now()){
  if(typeof code!=='string'||!/^\d{6}$/.test(code))return null;
  const slot=Math.floor(now/1000/STEP_SECONDS);
  for(const skew of [-1,0,1]){
    const step=slot+skew;
    if(step<0)continue;
    const expected=Buffer.from(otpAt(secret,step));
    if(crypto.timingSafeEqual(expected,Buffer.from(code)))return step;
  }
  return null;
}
function recoveryDigest(code,c){
  if(typeof code!=='string')return '';
  const canonical=code.replace(/[\s-]/g,'').toUpperCase();
  if(!/^[A-F0-9]{32}$/.test(canonical))return '';
  return crypto.createHmac('sha256',c.totpKey).update('recovery:'+canonical).digest('hex');
}
function recoveryCodes(c,count=8){
  return Array.from({length:count},()=>{
    const raw=crypto.randomBytes(16).toString('hex').toUpperCase();
    return {plain:raw.match(/.{1,8}/g).join('-'),hash:recoveryDigest(raw,c)};
  });
}
function challengeKey(raw){
  if(typeof raw!=='string'||!/^[a-f0-9]{64}$/.test(raw))return '';
  return CHALLENGE_PREFIX+crypto.createHash('sha256').update(raw).digest('hex');
}
function pendingKey(raw){return PENDING_PREFIX+crypto.createHash('sha256').update(raw).digest('hex')}
function passwordTag(hash){
  return crypto.createHash('sha256').update(hash).digest('hex').slice(0,32);
}
async function createChallenge(c,hash,deviceId,kind){
  if(!['setup','verify'].includes(kind))throw Error('BAD_CHALLENGE_KIND');
  const token=crypto.randomBytes(32).toString('hex');
  const expires=kind==='setup'?ENROLL_SECONDS:CHALLENGE_SECONDS;
  const obj={kind,passwordTag:passwordTag(hash),
    deviceId:typeof deviceId==='string'&&/^[a-f0-9-]{32,64}$/i.test(deviceId)?deviceId:''};
  await redis(c,['SET',challengeKey(token),JSON.stringify(obj),'EX',String(expires)]);
  return token;
}
async function requireChallenge(c,token,hash,kind){
  const key=challengeKey(token);
  if(!key) return null;
  const raw=await redis(c,['GET',key]);
  if(typeof raw!=='string')return null;
  const obj=JSON.parse(raw);
  if(obj.kind!==kind||obj.passwordTag!==passwordTag(hash))return null;
  return obj;
}
async function checkChallengeRate(c,token){
  const key=challengeKey(token);
  if(!key)return false;
  const count=Number(await redis(c,['INCR',key+':attempts']));
  if(count===1)await redis(c,['EXPIRE',key+':attempts',String(ENROLL_SECONDS)]);
  return count<=5;
}
async function getState(c){return await redis(c,['GET',MFA_KEY]);}
async function setupStart(c,token,hash){
  if(!(await requireChallenge(c,token,hash,'setup')))return null;
  if(await getState(c))return null;
  const secret=generateSecret();
  await redis(c,['SET',pendingKey(token),encryptSecret(secret,c),'EX',String(ENROLL_SECONDS)]);
  return {secret,uri:'otpauth://totp/'+encodeURIComponent('Gichul Quiz:admin')+
    '?secret='+encodeURIComponent(secret)+'&issuer='+encodeURIComponent('Gichul Quiz')+
    '&algorithm=SHA1&digits=6&period=30'};
}
async function setupConfirm(c,token,hash,code,now=Date.now()){
  const challenge=await requireChallenge(c,token,hash,'setup');
  if(!challenge)return null;
  if(!(await checkChallengeRate(c,token)))return {error:'MFA_TOO_MANY_ATTEMPTS'};
  if(await getState(c))return {error:'MFA_ALREADY_ENABLED'};
  const raw=await redis(c,['GET',pendingKey(token)]);
  if(!raw)return {error:'MFA_SETUP_EXPIRED'};
  const secret=decryptSecret(raw,c);
  if(validTotp(secret,code,now)===null)return {error:'INVALID_MFA_CODE'};
  const codes=recoveryCodes(c);
  // Persist recovery hashes before the enabled marker. Never return the codes
  // if Redis has not durably accepted the final enrollment.
  await redis(c,['DEL',RECOVERY_KEY]);
  await redis(c,['SADD',RECOVERY_KEY,...codes.map(x=>x.hash)]);
  await redis(c,['SET',MFA_KEY,raw]);
  await redis(c,['DEL',pendingKey(token)]);
  await redis(c,['DEL',challengeKey(token)]);
  return {codes:codes.map(x=>x.plain),deviceId:challenge.deviceId};
}
async function verifyFactor(c,token,hash,code,now=Date.now()){
  const challenge=await requireChallenge(c,token,hash,'verify');
  if(!challenge)return {error:'MFA_CHALLENGE_EXPIRED'};
  if(!(await checkChallengeRate(c,token)))return {error:'MFA_TOO_MANY_ATTEMPTS'};
  const state=await getState(c);
  if(!state)return {error:'MFA_NOT_CONFIGURED'};
  const secret=decryptSecret(state,c);
  const step=validTotp(secret,code,now);
  let usedRecovery=false;
  if(step!==null){
    const once=await redis(c,['SET','gichul:admin:mfa:step:'+step,'1','EX','120','NX']);
    if(once!=='OK')return {error:'MFA_CODE_USED'};
  }else{
    const digest=recoveryDigest(code,c);
    if(!digest)return {error:'INVALID_MFA_CODE'};
    const removed=Number(await redis(c,['SREM',RECOVERY_KEY,digest]));
    if(removed!==1)return {error:'INVALID_MFA_CODE'};
    usedRecovery=true;
  }
  const consumed=await redis(c,['GETDEL',challengeKey(token)]);
  if(!consumed)return {error:'MFA_CHALLENGE_EXPIRED'};
  return {deviceId:challenge.deviceId,usedRecovery};
}
module.exports={
  MFA_KEY,RECOVERY_KEY,base32,unbase32,generateSecret,encryptSecret,decryptSecret,
  otpAt,validTotp,recoveryDigest,recoveryCodes,createChallenge,requireChallenge,
  checkChallengeRate,getState,setupStart,setupConfirm,verifyFactor
};
