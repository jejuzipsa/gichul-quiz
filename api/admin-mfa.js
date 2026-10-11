'use strict';
const auth=require('../lib/admin-auth.js');
const mfa=require('../lib/admin-mfa.js');
const audit=require('../lib/visit-logs.js');
module.exports=async function handler(req,res){
  auth.noStore(res);
  auth.cors(req,res);
  if(req.method==='OPTIONS'){
    if(!auth.requireOrigin(req,res))return;
    res.statusCode=204;return res.end();
  }
  if(req.method!=='POST')return auth.respond(res,405,{error:'METHOD_NOT_ALLOWED'});
  if(!auth.requireOrigin(req,res))return;
  const c=auth.config();
  if(!c.configured)return auth.respond(res,503,{error:'ADMIN_NOT_CONFIGURED'});
  let body;
  try{body=auth.readBody(req)}catch{return auth.respond(res,400,{error:'BAD_REQUEST'})}
  const mode=String(req.query?.mode||'');
  if(!['start','confirm','verify','regenerate'].includes(mode))
    return auth.respond(res,400,{error:'BAD_MODE'});
  try{
    const hash=await auth.currentHash(c);
    if(mode==='regenerate'){
      if(!(await auth.requireAdmin(req,res,c)))return;
      if(!auth.verifyPassword(body.password,hash))
        return auth.respond(res,401,{error:'INVALID_CURRENT_PASSWORD'});
      if(!(await mfa.getState(c)))return auth.respond(res,409,{error:'MFA_NOT_CONFIGURED'});
      const codes=mfa.recoveryCodes(c);
      await auth.redis(c,['DEL',mfa.RECOVERY_KEY]);
      await auth.redis(c,['SADD',mfa.RECOVERY_KEY,...codes.map(x=>x.hash)]);
      await audit.recordAdminAction(c,req,'recovery_regenerated');
      return auth.respond(res,200,{recoveryCodes:codes.map(x=>x.plain)});
    }
    const token=body.challenge;
    if(mode==='start'){
      const setup=await mfa.setupStart(c,token,hash);
      if(!setup)return auth.respond(res,401,{error:'MFA_CHALLENGE_EXPIRED'});
      return auth.respond(res,200,setup);
    }
    if(mode==='confirm'){
      const done=await mfa.setupConfirm(c,token,hash,body.code);
      if(!done)return auth.respond(res,401,{error:'MFA_CHALLENGE_EXPIRED'});
      if(done.error)return auth.respond(res,400,{error:done.error});
      const flags=await audit.recordAdminLogin(c,req,done.deviceId);
      await audit.recordAdminAction(c,req,'mfa_enabled');
      const session=await auth.issueSession(hash,c);
      return auth.respond(res,200,{authenticated:true,username:'admin',
        session,expiresIn:auth.SESSION_SECONDS,security:flags,
        recoveryCodes:done.codes});
    }
    const verified=await mfa.verifyFactor(c,token,hash,body.code);
    if(verified.error){
      if(['INVALID_MFA_CODE','MFA_CODE_USED','MFA_TOO_MANY_ATTEMPTS'].includes(verified.error)){
        await audit.recordAdminFailure(c,req,'mfa_failed');
      }
      return auth.respond(res,verified.error==='MFA_TOO_MANY_ATTEMPTS'?429:401,{error:verified.error});
    }
    const flags=await audit.recordAdminLogin(c,req,verified.deviceId);
    if(verified.usedRecovery)await audit.recordAdminAction(c,req,'recovery_used');
    const session=await auth.issueSession(hash,c);
    return auth.respond(res,200,{authenticated:true,username:'admin',
      session,expiresIn:auth.SESSION_SECONDS,security:flags,
      recoveryUsed:verified.usedRecovery});
  }catch{
    return auth.respond(res,503,{error:'STORE_UNAVAILABLE'});
  }
};
