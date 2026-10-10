(() => {
  'use strict';
  // A single daily entry for the same IP/browser is enforced on the server.
  // No URL, search term, question, choice or navigation path is transmitted.
  const endpoint='https://gichul-law-api.vercel.app/api/visit';
  const headers={};
  try{
    const token=sessionStorage.getItem('gichulAdminSession');
    if(token && /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token)){
      headers.Authorization='Bearer '+token;
    }
  }catch(_){}
  try{
    fetch(endpoint,{method:'POST',mode:'cors',headers,cache:'no-store',
      credentials:'omit',keepalive:true}).catch(()=>{});
  }catch(_){}
})();
