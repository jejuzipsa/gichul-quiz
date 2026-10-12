/* Shared, testable client-side display clock. Redis is the authority for login validity. */
(function(root){
  'use strict';
  const DEFAULT_GRACE_MS=30000;
  const FULL_BUDGET_MS=600000;
  class SessionClock {
    constructor(){this.clear()}
    clear(){this.bankMs=0;this.lastActivityAt=0;this.graceMs=DEFAULT_GRACE_MS;this.ready=false}
    sync(payload,now=Date.now()){
      if(!payload||!Number.isFinite(payload.bankMs)||!Number.isFinite(payload.ageMs))return false;
      this.bankMs=Math.min(FULL_BUDGET_MS,Math.max(0,payload.bankMs));
      this.lastActivityAt=now-Math.max(0,payload.ageMs);
      this.graceMs=Math.max(0,Number(payload.graceMs)||DEFAULT_GRACE_MS);
      this.ready=true;
      return true;
    }
    remaining(now=Date.now()){
      if(!this.ready)return 0;
      return Math.max(0,this.bankMs-Math.max(0,now-this.lastActivityAt-this.graceMs));
    }
    isCounting(now=Date.now()){
      return this.ready&&now-this.lastActivityAt>=this.graceMs&&this.remaining(now)>0;
    }
    activity(now=Date.now()){
      if(!this.ready)return 0;
      // Consume only the accumulated idle part, then pause. Never refill.
      this.bankMs=this.remaining(now);
      this.lastActivityAt=now;
      return this.bankMs;
    }
    reset(now=Date.now()){
      this.bankMs=FULL_BUDGET_MS;
      this.lastActivityAt=now;
      this.ready=true;
      return this.bankMs;
    }
    format(now=Date.now()){
      if(!this.ready)return '--:--';
      const secs=Math.ceil(this.remaining(now)/1000);
      return String(Math.floor(secs/60)).padStart(2,'0')+':'+String(secs%60).padStart(2,'0');
    }
  }
  const exports={SessionClock,DEFAULT_GRACE_MS,FULL_BUDGET_MS};
  if(typeof module!=='undefined'&&module.exports)module.exports=exports;
  if(root)root.AdminSessionClock=exports;
})(typeof window==='undefined'?null:window);
