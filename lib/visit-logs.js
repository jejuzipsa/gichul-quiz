'use strict';
const crypto=require('node:crypto');
const net=require('node:net');
const {redis}=require('./admin-auth.js');

const VISITS='gichul:log:visits:v1';
const ADMIN='gichul:log:admin:v1';
const DAY_SECONDS=86400;
const RETAIN_SECONDS=31*DAY_SECONDS;
const VISITOR_LIMIT=250;
const ADMIN_LIMIT=500;

function getIp(req){
  const headers=req.headers||{};
  const input=String(headers['x-vercel-forwarded-for']||headers['x-real-ip']||headers['x-forwarded-for']||'');
  const candidate=input.split(',')[0].trim();
  return net.isIP(candidate)?candidate:'';
}
function maskIp(ip){
  const ver=net.isIP(ip);
  if(ver===4){
    const pieces=ip.split('.');
    return pieces.slice(0,3).join('.')+'.xxx';
  }
  if(ver===6){
    const parts=ip.split(':').filter(Boolean);
    return parts.slice(0,3).join(':')+':…';
  }
  return '알 수 없음';
}
function deviceLabel(req){
  const ua=String(req.headers?.['user-agent']||'').slice(0,350);
  const browser=/Edg\//.test(ua)?'Edge':/Firefox\//.test(ua)?'Firefox':/Chrome\//.test(ua)?'Chrome':/Safari\//.test(ua)?'Safari':'기타';
  const os=/iPhone|iPad|iPod/.test(ua)?'iOS':/Android/.test(ua)?'Android':/Windows/.test(ua)?'Windows':/Mac OS X|Macintosh/.test(ua)?'macOS':/Linux/.test(ua)?'Linux':'기타';
  return {browser,os};
}
function fingerprint(secret,...parts){
  return crypto.createHmac('sha256',secret).update(parts.join('\x00')).digest('hex').slice(0,32);
}
function kstDate(now=Date.now()){
  return new Date(now+9*60*60*1000).toISOString().slice(0,10);
}
function timestamp(now=Date.now()){return new Date(now).toISOString();}
async function recordEvent(c,key,event,limit=250,now=Date.now()){
  const json=JSON.stringify({...event,time:timestamp(now),id:crypto.randomBytes(6).toString('hex')});
  await redis(c,['ZADD',key,String(now),json]);
  await redis(c,['ZREMRANGEBYSCORE',key,'-inf',String(now-30*DAY_SECONDS*1000)]);
  await redis(c,['ZREMRANGEBYRANK',key,'0',String(-(limit+1))]);
  await redis(c,['EXPIRE',key,String(RETAIN_SECONDS)]);
}
async function recordVisit(c,req,now=Date.now()){
  const ip=getIp(req);
  if(!ip)return {recorded:false,reason:'no-ip'};
  const device=deviceLabel(req);
  const day=kstDate(now);
  const fp=fingerprint(c.sessionSecret,ip,device.browser,device.os);
  const distinct='gichul:visits:unique:'+day+':'+fp;
  const inserted=await redis(c,['SET',distinct,'1','EX','172800','NX']);
  if(inserted!=='OK')return {recorded:false,reason:'duplicate'};
  const countKey='gichul:visits:count:'+day;
  await redis(c,['INCR',countKey]);
  await redis(c,['EXPIRE',countKey,String(RETAIN_SECONDS)]);
  await recordEvent(c,VISITS,{
    kind:'visitor',ip:maskIp(ip),browser:device.browser,os:device.os,day
  },VISITOR_LIMIT,now);
  return {recorded:true};
}
async function recordAdminLogin(c,req,deviceId,now=Date.now()){
  const ip=getIp(req);
  const agent=deviceLabel(req);
  const valid=typeof deviceId==='string'&&/^[a-f0-9-]{32,64}$/i.test(deviceId);
  const device=valid?fingerprint(c.sessionSecret,'device',deviceId):'unknown';
  const ipCode=ip?fingerprint(c.sessionSecret,'admin-ip',ip):'unknown';
  const knownDevice=valid?await redis(c,['SET','gichul:admin:known-device:'+device,'1','EX','7776000','NX']):'OK';
  const knownIp=ip?await redis(c,['SET','gichul:admin:known-ip:'+ipCode,'1','EX','7776000','NX']):'OK';
  const flags={newDevice:knownDevice==='OK',newIp:knownIp==='OK'};
  await recordEvent(c,ADMIN,{
    kind:'login_success',ip:maskIp(ip),browser:agent.browser,os:agent.os,...flags
  },ADMIN_LIMIT,now);
  return flags;
}
async function recordAdminFailure(c,req,kind='login_failed',now=Date.now()){
  const ip=getIp(req);
  const agent=deviceLabel(req);
  await recordEvent(c,ADMIN,{kind,ip:maskIp(ip),browser:agent.browser,os:agent.os},ADMIN_LIMIT,now);
}
async function recordAdminAction(c,req,kind,now=Date.now()){
  const ip=getIp(req);
  const agent=deviceLabel(req);
  await recordEvent(c,ADMIN,{kind,ip:maskIp(ip),browser:agent.browser,os:agent.os},ADMIN_LIMIT,now);
}
function decodeLogs(raw){
  if(!Array.isArray(raw))return [];
  return raw.flatMap(x=>{
    try{
      const v=JSON.parse(x);
      if(!v||typeof v!=='object')return [];
      return [{kind:v.kind,time:v.time,ip:v.ip,browser:v.browser,os:v.os,
        ...(v.kind==='login_success'?{newDevice:!!v.newDevice,newIp:!!v.newIp}:{})}];
    }catch{return []}
  });
}
async function readDashboard(c,now=Date.now()){
  const keys=[];
  const base=new Date(now+9*60*60*1000);
  for(let i=0;i<30;i++){
    const day=new Date(base.getTime()-i*DAY_SECONDS*1000).toISOString().slice(0,10);
    keys.push('gichul:visits:count:'+day);
  }
  const [counts,visits,admin]=await Promise.all([
    redis(c,['MGET',...keys]),redis(c,['ZREVRANGE',VISITS,'0','99']),
    redis(c,['ZREVRANGE',ADMIN,'0','149'])
  ]);
  const daily=(Array.isArray(counts)?counts:[]).map((v,i)=>({
    date:keys[i]?.slice(-10),count:Number(v)||0
  }));
  return {
    today:daily[0]?.count||0,
    week:daily.slice(0,7).reduce((n,x)=>n+x.count,0),
    month:daily.reduce((n,x)=>n+x.count,0),
    daily,
    visitors:decodeLogs(visits),
    admin:decodeLogs(admin)
  };
}
module.exports={
  VISITS,ADMIN,getIp,maskIp,deviceLabel,kstDate,fingerprint,
  recordVisit,recordAdminLogin,recordAdminFailure,recordAdminAction,readDashboard,decodeLogs
};
