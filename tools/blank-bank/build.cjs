// Build approved runtime banks from the reviewed V2 TXT sources.
const {spawnSync}=require('node:child_process');
const path=require('node:path');

const ROOT=path.resolve(__dirname,'../..');
const compile=spawnSync(process.execPath,[path.join(__dirname,'compile-v2.cjs'),'--write'],{cwd:ROOT,stdio:'inherit'});
if(compile.status!==0) process.exit(compile.status||1);

const validate=spawnSync(process.execPath,[path.join(__dirname,'validate.cjs'),'--release'],{cwd:ROOT,stdio:'inherit'});
if(validate.status!==0) process.exit(validate.status||1);

console.log('Approved V2 TXT banks compiled and release validation passed.');
