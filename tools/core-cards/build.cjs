const {spawnSync}=require('node:child_process');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'../..');
function run(script,args=[]){
  const r=spawnSync(process.execPath,[path.join(ROOT,script),...args],{stdio:'inherit'});
  if(r.status!==0) process.exit(r.status||1);
}
run('tools/core-cards/reindex.cjs',['--write']);
run('tools/core-cards/compile.cjs',['--write']);
run('tools/core-cards/validate.cjs');
console.log('Core word cards TXT build complete.');
