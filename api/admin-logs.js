'use strict';
const auth=require('../lib/admin-auth.js');
const logs=require('../lib/visit-logs.js');
module.exports=async function handler(req,res){
  auth.noStore(res);auth.cors(req,res);
  if(req.method==='OPTIONS'){
    if(!auth.requireOrigin(req,res))return;
    res.statusCode=204;return res.end();
  }
  if(req.method!=='GET')return auth.respond(res,405,{error:'METHOD_NOT_ALLOWED'});
  if(!auth.requireOrigin(req,res))return;
  const c=auth.config();
  const session=await auth.requireAdmin(req,res,c);
  if(!session)return;
  try{
    const data=await logs.readDashboard(c);
    return auth.respond(res,200,data);
  }catch{
    return auth.respond(res,503,{error:'STORE_UNAVAILABLE'});
  }
};
