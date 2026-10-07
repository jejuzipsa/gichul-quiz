const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const ROOT=path.resolve(__dirname,'../..');
const DATA=path.join(ROOT,'data');
const KEY_PATH=path.join(ROOT,'review/past-exams-audit/official-answer-keys.json');

const SUBJECTS={
  real_estate_intro:{name:'부동산학개론',count:200,perYear:40},
  civil_law:{name:'민법 및 민사특별법',count:200,perYear:40},
  brokerage_law:{name:'공인중개사법령 및 중개실무',count:200,perYear:40},
  public_law:{name:'부동산공법',count:200,perYear:40},
  registration_law:{name:'부동산공시법',count:120,perYear:24},
  tax_law:{name:'부동산세법',count:80,perYear:16}
};
const YEARS=[2021,2022,2023,2024,2025];
const PAPERS={'1차 1교시':80,'2차 1교시':80,'2차 2교시':40};
const CIRCLED={'①':1,'②':2,'③':3,'④':4,'⑤':5};

function stable(x){
  if(Array.isArray(x)) return x.map(stable);
  if(x&&typeof x==='object') return Object.fromEntries(Object.keys(x).sort().map(k=>[k,stable(x[k])]));
  return x;
}
function eq(a,b){return JSON.stringify(stable(a))===JSON.stringify(stable(b));}
function answerArray(v){return (Array.isArray(v)?v:[v]).map(Number).sort((a,b)=>a-b);}
function explanationAnswers(text){
  const m=String(text||'').match(/^([①②③④⑤](?:\s*,\s*[①②③④⑤])*)/);
  if(!m) return null;
  return m[1].split(',').map(x=>CIRCLED[x.trim()]).sort((a,b)=>a-b);
}
function readMirror(code,name){
  const ctx={window:{}};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(DATA,code+'.js'),'utf8'),ctx);
  return JSON.parse(JSON.stringify(ctx.window.SUBJECT_DATA?.[name]));
}

const key=JSON.parse(fs.readFileSync(KEY_PATH,'utf8'));
let errors=[],all=[],markerChecked=0;

for(const [code,cfg] of Object.entries(SUBJECTS)){
  const json=JSON.parse(fs.readFileSync(path.join(DATA,code+'.json'),'utf8'));
  if(!Array.isArray(json)) errors.push(code+': JSON root must be array');
  if(json.length!==cfg.count) errors.push(code+': count '+json.length+' != '+cfg.count);
  const mirror=readMirror(code,cfg.name);
  if(!eq(json,mirror)) errors.push(code+': JS mirror differs from JSON Source of Truth');
  for(const y of YEARS){
    const n=json.filter(q=>q.year===y).length;
    if(n!==cfg.perYear) errors.push(code+': '+y+' count '+n+' != '+cfg.perYear);
  }
  for(const q of json){
    all.push(q);
    for(const field of ['id','subject','year','exam','paper','question_number','question','choices','answer','explanation']){
      if(q[field]===undefined||q[field]===null||q[field]==='') errors.push((q.id||code)+': missing '+field);
    }
    if(q.subject!==cfg.name) errors.push(q.id+': subject mismatch');
    if(!YEARS.includes(Number(q.year))) errors.push(q.id+': invalid year');
    if(!Object.hasOwn(PAPERS,q.paper)) errors.push(q.id+': invalid paper');
    if(!Number.isInteger(q.question_number)||q.question_number<1||q.question_number>PAPERS[q.paper]) errors.push(q.id+': invalid question_number');
    if(!Array.isArray(q.choices)||q.choices.length!==5||q.choices.some(x=>typeof x!=='string'||!x.trim())) errors.push(q.id+': choices must contain 5 nonempty strings');
    else if(new Set(q.choices.map(x=>x.normalize('NFKC').replace(/\s/g,''))).size!==5) errors.push(q.id+': duplicate choice');
    const aa=answerArray(q.answer);
    if(!aa.length||aa.some(x=>!Number.isInteger(x)||x<1||x>5)||new Set(aa).size!==aa.length) errors.push(q.id+': invalid answer');
    if(typeof q.explanation!=='string'||!q.explanation.trim()) errors.push(q.id+': empty explanation');
    const ea=explanationAnswers(q.explanation);
    if(!ea) errors.push(q.id+': explanation has no leading answer marker');
    else {
      markerChecked++;
      if(!eq(ea,aa)) errors.push(q.id+': explanation answer marker mismatch');
    }
  }
}

if(all.length!==1000) errors.push('total count '+all.length+' != 1000');
for(const y of YEARS){
  const n=all.filter(q=>q.year===y).length;
  if(n!==200) errors.push(y+': year total '+n+' != 200');
}
const ids=new Set(), slots=new Set(), full=new Set();
for(const q of all){
  if(ids.has(q.id)) errors.push(q.id+': duplicate ID'); ids.add(q.id);
  const slot=q.year+'|'+q.paper+'|'+q.question_number;
  if(slots.has(slot)) errors.push(slot+': duplicate exam slot'); slots.add(slot);
  const sig=(q.question+'||'+q.choices.join('||')).normalize('NFKC').replace(/\s+/g,' ').trim();
  if(full.has(sig)) errors.push(q.id+': exact question+choices duplicate'); full.add(sig);
}

let officialChecked=0;
for(const [session,meta] of Object.entries(key.sessions||{})){
  const expected=meta.answers||[];
  const qs=all.filter(q=>q.year===meta.year&&q.paper===meta.paper).sort((a,b)=>a.question_number-b.question_number);
  if(qs.length!==meta.count||expected.length!==meta.count) errors.push(session+': official key count mismatch');
  for(let i=0;i<Math.min(qs.length,expected.length);i++){
    officialChecked++;
    if(!eq(answerArray(qs[i].answer),answerArray(expected[i]))) {
      errors.push(qs[i].id+': answer differs from frozen official final answer');
    }
  }
}
if(officialChecked!==1000) errors.push('official answer comparison count '+officialChecked+' != 1000');

console.log('Past-exam validation');
console.log('Questions: '+all.length);
console.log('Official answers checked: '+officialChecked);
console.log('Explanation markers checked: '+markerChecked);
console.log('Errors: '+errors.length);
if(errors.length){
  console.error(errors.join('\n'));
  process.exitCode=1;
}
