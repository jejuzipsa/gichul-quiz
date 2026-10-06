const {spawnSync}=require('node:child_process');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'../..');

function run(script,args=[]){
  const r=spawnSync(process.execPath,[path.join(ROOT,script),...args],{stdio:'inherit'});
  if(r.status!==0) process.exit(r.status||1);
}

run('tools/core-bank/compile.cjs',['--write']);
run('tools/core-bank/validate.cjs',['--release']);

// 괄호문제 은행은 coreVersion/coreAuditDate를 메타데이터로 보관하므로
// 핵심개념이 바뀔 때 함께 재생성하여 두 은행의 버전을 동기화한다.
run('tools/blank-bank/compile-v2.cjs',['--write']);
run('tools/blank-bank/validate.cjs',['--release']);
run('tools/blank-bank/test.cjs');

console.log('Core TXT build complete.');
