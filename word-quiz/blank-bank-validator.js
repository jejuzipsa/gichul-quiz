(() => {
  const targets={real_estate_intro:300,civil_law:300,brokerage_law:300,public_law:300,registration_law:220,tax_law:180};
  window.validateBlankBank=(bank,key)=>{
    const target=targets[key];
    if(!target||!bank||!Array.isArray(bank.questions)||bank.questions.length!==target||bank.targetCount!==target||bank.generatedCount!==target) return false;
    const ids=new Set(),prompts=new Set();
    const norm=s=>s.normalize('NFKC').replace(/\s/g,'');
    return bank.questions.every(q=>{
      if(!q||q.type!=='blank'||['id','prompt','answer','explanation','source','subject'].some(k=>typeof q[k]!=='string'||!q[k].trim())) return false;
      if((q.prompt.match(/\{\{blank\}\}/g)||[]).length!==1||ids.has(q.id)||prompts.has(norm(q.prompt))) return false;
      ids.add(q.id);prompts.add(norm(q.prompt));
      return Array.isArray(q.choices)&&q.choices.length===4&&q.choices.every(x=>typeof x==='string'&&x.trim())&&new Set(q.choices.map(norm)).size===4&&q.choices.filter(x=>x===q.answer).length===1;
    });
  };
})();
