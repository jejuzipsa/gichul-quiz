#!/usr/bin/env node
'use strict';
const {createPasswordHash}=require('../../lib/admin-auth.js');
if(!process.stdin.isTTY || !process.stdin.setRawMode){
  process.stderr.write('터미널에서 node tools/admin/hash-password.cjs 를 실행해 줘.\n');
  process.exit(1);
}
process.stdout.write('관리자 최초 비밀번호 (12~128자, 입력내용 숨김): ');
let password='';
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function onData(chunk){
  for(const char of chunk){
    if(char==='\u0003'){
      process.stdout.write('\n취소됐어.\n');process.exit(1);
    }
    if(char==='\r'||char==='\n'){
      process.stdin.setRawMode(false);process.stdin.pause();process.stdout.write('\n');
      try{
        const result=createPasswordHash(password);
        process.stdout.write('\nGICHUL_ADMIN_INITIAL_PASSWORD_HASH 값:\n'+result+'\n\n');
        process.stdout.write('해시만 Vercel Secret에 넣고 비밀번호 원문은 안전하게 별도로 보관해.\n');
      }catch{
        process.stderr.write('비밀번호는 12~128자여야 해.\n');process.exitCode=1;
      }
      password='';return;
    }
    if(char==='\u007f'||char==='\b'){
      if(password.length){password=password.slice(0,-1);process.stdout.write('\b \b')}
    }else if(char>=' '&&password.length<129){
      password+=char;process.stdout.write('*');
    }
  }
});
