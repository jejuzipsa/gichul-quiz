# 관리자 로그인 초기 설정 (v2.27)

관리자 아이디는 admin으로 고정되어 있어. 일반 방문자는 로그인하지 않아도 기존 문제풀이 기능을 그대로 이용할 수 있어.

## 처음 한 번만 설정하면 되는 항목

1. Vercel gichul-law-api 프로젝트에 비공개 저장소 Upstash Redis를 연결해. Vercel Marketplace → Upstash for Redis → 프로젝트 연결을 이용하면 편해.
2. 환경변수 UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN이 해당 Vercel 프로젝트 Production에 등록됐는지 확인해. Vercel이 KV_REST_API_URL, KV_REST_API_TOKEN 이름으로 설정해 줬다면 이 코드에서도 사용할 수 있어. 반드시 읽기 전용이 아닌 쓰기 가능한 Redis REST 토큰이어야 해.
3. 로컬에서 저장소 코드를 내려받아 터미널에서 다음 명령을 실행해. 스크립트는 비밀번호를 표시하지 않고 해시만 출력해.

   node tools/admin/hash-password.cjs

4. 출력된 해시를 Vercel → Project → Settings → Environment Variables의 Production Secret인 GICHUL_ADMIN_INITIAL_PASSWORD_HASH에 넣어.
5. 같은 Production Secret에 GICHUL_ADMIN_SESSION_SECRET을 등록해. 최소 32자 이상의 예측 불가능한 난수가 필요해. Node 환경에서 다음 명령으로 생성할 수 있어.

   node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"

6. 등록 후 Vercel Production을 재배포해. GitHub Pages는 별도 설정할 필요 없어.
7. https://jejuzipsa.github.io/gichul-quiz/ 아래의 관리자 버튼으로 로그인한 뒤 관리자 화면 → 비밀번호 변경에서 현재 비밀번호와 새 비밀번호를 입력하면 돼.

## 주의 사항

- 최초 비밀번호 원문, Redis REST 토큰, 세션 비밀값은 GitHub나 채팅에 보내지 마.
- GICHUL_ADMIN_INITIAL_PASSWORD_HASH는 첫 비밀번호의 서버 전용 해시야. 암호를 변경하면 Upstash의 gichul:admin:password:v1 키에 새 해시가 저장돼. 이후에는 Redis의 해시가 우선돼.
- Redis 저장소 데이터를 삭제하면 변경한 비밀번호도 소실되고 초기 해시 비밀번호로 되돌아갈 수 있어. 백업 없이 저장소를 삭제하지 마.
- 세션은 2시간 유효하고, 비밀번호를 변경하면 기존 로그인 세션은 즉시 무효가 돼.
- 로그인 시도 제한은 접속자별 15분 내 10회며 IP 원문은 Redis에 저장하지 않아.
- GitHub Pages의 HTML/CSS/문제은행/PATCH_NOTES 파일은 본래 공개 파일이야. 관리자 페이지는 관리자용 진입 동선을 분리하지만 공개 자료 자체를 비공개로 바꾸는 기능은 아니야. 방문자 접속 로그 같은 비공개 정보는 반드시 인증된 서버 API를 통해서만 읽도록 구현해야 해.
- 방문 IP 수집은 아직 미구현이며 사용자에게 별도 수집 안내/보관 기간을 정하기 전에는 시작하지 않아.
