'use strict';
// Receives only entry pings: no page URL, click or navigation history.
const auth=require('../lib/admin-auth.js');
const logs=require('../lib/visit-logs.js');
module.exports=async function handler(req,res){
  auth.noStore(res);auth.cors(req,res);
  if(req.method==='OPTIONS'){
    if(!auth.requireOrigin(req,res))return;
    res.statusCode=204;return res.end();
  }
  if(req.method!=='POST')return auth.respond(res,405,{error:'METHOD_NOT_ALLOWED'});
  if(!auth.requireOrigin(req,res))return;
  const c=auth.config();
  if(!c.configured)return auth.respond(res,503,{error:'LOGS_NOT_CONFIGURED'});
  try{
    // Recognized administrator sessions never enter public visitor statistics.
    if(auth.bearer(req) && await auth.authenticatedAdmin(req,c)){
      res.statusCode=204;return res.end();
    }
    await logs.recordVisit(c,req);
    res.statusCode=204;res.end();
  }catch{
    auth.respond(res,503,{error:'STORE_UNAVAILABLE'});
  }
};
