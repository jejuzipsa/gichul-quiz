공인중개사 기출문제 사이트

현재 버전
- v1.46
- 기출문제 총 1000문항
- 2021년 제32회 ~ 2025년 제36회
- PC / 모바일 반응형

주요 기능
1. 과목별 10문제 / 20문제 랜덤 풀이
2. 전체 문제 보기
3. 실전 시험 보기
   - 1차 80문제 / 100분
   - 2차 1교시 80문제 / 100분
   - 2차 2교시 40문제 / 50분
4. 풀이 결과 / 오답 다시 풀기
5. 핵심 개념 퀴즈
   - 현재 부동산학개론 100문제
   - 100문제 중 랜덤 30문제
   - 나머지 5과목은 준비 중
6. 핵심요약
   - 현재 슬라이드형 뷰어 사용
   - 디자인 개편은 보류 상태

기출문제 데이터
- data/real_estate_intro.json
- data/civil_law.json
- data/brokerage_law.json
- data/public_law.json
- data/registration_law.json
- data/tax_law.json

중요
- data/*.json 이 원본(Source of Truth)
- data/*.js 는 index.html을 file://로 직접 실행할 때를 위한 로컬 미러
- JSON 수정 뒤 로컬 미러 갱신:
  python tools/rebuild_local_mirrors.py

핵심 개념 퀴즈
- word-quiz/index.html
- word-quiz/quiz.js
- word-quiz/quiz.css
- word-quiz/entry.css
- word-quiz/data/

핵심요약
- summary/slides_design_v1.html
- summary/slides_design_v1.css
- summary/slides_design_v1.js
- summary/slides_design_v1_manifest.js
- summary/slides/
- summary/real_estate_intro_slides_v142.html : 현재 학개론 진입 리다이렉트
- summary/slides_v143.html : 현재 나머지 5과목 진입 리다이렉트

유지 중인 텍스트 요약 데이터
- summary/*_law.json / *.js
- 이후 핵심요약을 실제 텍스트 기반 디자인으로 다시 만들 때 원본/롤백 자료로 사용할 수 있어 당분간 유지

저장소 정리 원칙
- 실행과 무관한 작업 보고서 파일은 저장소에 두지 않음
- __pycache__, *.pyc, .DS_Store, Thumbs.db는 Git 추적 제외
- 과거 슬라이드 deck 생성물은 현재 뷰어에서 참조하지 않으면 제거
