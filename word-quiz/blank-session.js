(() => {
  'use strict';
  // One quiz session contains at most one variation of each reviewed core question.
  window.pickBlankQuizSession=(questions,count,random=Math.random)=>{
    const pool=[...(questions||[])];
    for(let i=pool.length-1;i>0;i--){
      const r=Math.max(0,Math.min(0.999999999,Number(random())));
      const j=Math.floor(r*(i+1));
      [pool[i],pool[j]]=[pool[j],pool[i]];
    }
    const picked=[],seenOrigins=new Set(),usedIds=new Set();
    const limit=Math.max(0,Math.floor(Number(count)||0));
    for(const q of pool){
      const origin=q.originQuestionId||q.id;
      if(seenOrigins.has(origin)) continue;
      seenOrigins.add(origin);
      usedIds.add(q.id);
      picked.push(q);
      if(picked.length===limit) return picked;
    }
    // Graceful fallback only when a bank contains fewer unique origins than requested.
    for(const q of pool){
      if(usedIds.has(q.id)) continue;
      picked.push(q);
      if(picked.length===limit) break;
    }
    return picked;
  };
})();
