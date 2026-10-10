'use strict';
const auth=require('../lib/admin-auth.js');
const {config,cors,respond,requireOrigin,readBody,verifyPassword,
  createPasswordHash,createSession,redis,currentHash,requireAdmin,checkRateLimit,PASSWORD_KEY}=auth;

module.exports=async function handler(req,res) {
  auth.noStore(res);
  cors(req,res);
  if(req.method==='OPTIONS'){
    if(!requireOrigin(req,res))return;
    res.statusCode=204;return res.end();
  }
  const c=config();
  if(!c.configured)return respond(res,503,{error:'ADMIN_NOT_CONFIGURED'});
  if(!requireOrigin(req,res))return;
  if(req.method==='GET'){
    const oldHash=await requireAdmin(req,res,c);
    if(!oldHash)return;
    return respond(res,200,{authenticated:true,username:'admin'});
  }
  if(req.method!=='POST')return respond(res,405,{error:'METHOD_NOT_ALLOWED'});
  let body;
  try {body=readBody(req)}catch{return respond(res,400,{error:'BAD_REQUEST'})}
  const mode=String(req.query?.mode||'login');
  if(mode==='login'){
    try{
      const allowed=await checkRateLimit(req,c);
      if(!allowed)return respond(res,429,{error:'TOO_MANY_ATTEMPTS'});
      const hash=await currentHash(c);
      if(body.username!=='admin'||!verifyPassword(body.password,hash)){
        return respond(res,401,{error:'INVALID_CREDENTIALS'});
      }
      return respond(res,200,{
        authenticated:true,username:'admin',
        session:createSession(hash,c.sessionSecret),expiresIn:auth.SESSION_SECONDS
      });
    }catch{return respond(res,503,{error:'STORE_UNAVAILABLE'})}
  }
  if(mode==='change-password'){
    const current=await requireAdmin(req,res,c);
    if(!current)return;
    if(!verifyPassword(body.currentPassword,current))return respond(res,401,{error:'INVALID_CURRENT_PASSWORD'});
    if(body.newPassword===body.currentPassword)return respond(res,400,{error:'PASSWORD_UNCHANGED'});
    if(typeof body.newPassword!=='string'||body.newPassword.length<12||body.newPassword.length>128)
      return respond(res,400,{error:'PASSWORD_LENGTH'});
    try{
      const nextHash=createPasswordHash(body.newPassword);
      await redis(c,['SET',PASSWORD_KEY,nextHash]);
      return respond(res,200,{changed:true,session:createSession(nextHash,c.sessionSecret)});
    }catch{return respond(res,503,{error:'STORE_UNAVAILABLE'})}
  }
  return respond(res,400,{error:'BAD_MODE'});
};
