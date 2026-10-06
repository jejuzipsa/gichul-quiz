(() => {
  const targets={real_estate_intro:300,civil_law:300,brokerage_law:300,public_law:300,registration_law:220,tax_law:180};
  const norm=s=>String(s??'').normalize('NFKC').replace(/\s/g,'');
  const markerKeys=prompt=>{
    const matches=[...String(prompt??'').matchAll(/\{\{blank(?::([A-Z]))?\}\}/g)];
    if(matches.length===1&&!matches[0][1]) return ['A'];
    return matches.map(m=>m[1]||'');
  };
  const validBlankShape=q=>{
    const keys=markerKeys(q.prompt);
    if(keys.length<1||keys.length>3) return false;
    if(keys.length>1&&(keys.some(k=>!k)||new Set(keys).size!==keys.length||keys.join('')!=='ABC'.slice(0,keys.length))) return false;
    if(String(q.prompt).length>150||(q.choices||[]).some(x=>String(x).length>55)) return false;
    if(keys.length===1) return q.blankValues==null&&String(q.answer||'').length<=35;
    if(!q.blankValues||typeof q.blankValues!=='object'||Array.isArray(q.blankValues)) return false;
    return (q.choices||[]).every(choice=>{
      const values=q.blankValues[choice];
      if(!values||typeof values!=='object') return false;
      if(Object.keys(values).sort().join('')!==keys.slice().sort().join('')) return false;
      const parts=[];
      for(const key of keys){
        const value=values[key];
        if(typeof value!=='string'||!value.trim()||value.length>35) return false;
        parts.push(value);
      }
      return parts.join(' / ')===choice;
    });
  };
  window.validateBlankBank=(bank,key)=>{
    const target=targets[key];
    if(!target||!bank||!Array.isArray(bank.questions)||bank.questions.length!==target||bank.targetCount!==target||bank.generatedCount!==target) return false;
    const ids=new Set(),prompts=new Set();
    return bank.questions.every(q=>{
      if(!q||q.type!=='blank'||['id','prompt','answer','explanation','source','subject'].some(k=>typeof q[k]!=='string'||!q[k].trim())) return false;
      if(!validBlankShape(q)||ids.has(q.id)||prompts.has(norm(q.prompt))) return false;
      ids.add(q.id);prompts.add(norm(q.prompt));
      return Array.isArray(q.choices)&&q.choices.length===4&&q.choices.every(x=>typeof x==='string'&&x.trim())&&new Set(q.choices.map(norm)).size===4&&q.choices.filter(x=>x===q.answer).length===1;
    });
  };
})();
