공인중개사 기출문제 사이트

현재 버전
- v1.79
- 기출문제 총 1000문항
- 2021년 제32회 ~ 2025년 제36회
- PC / 모바일 반응형

주요 기능
0-1. 핵심 단어 카드
   - 부동산학개론 170장
   - 민법 및 민사특별법 247장
   - 공인중개사법령 및 중개실무 204장
   - 부동산공법 234장
   - 부동산공시법 199장
   - 부동산세법 187장
   - 총 1,241장
   - 원본: review/core-cards-v1/01_real_estate_intro.txt, 02_civil_law.txt, 03_brokerage_law.txt, 04_public_law.txt, 05_registration_law.txt, 06_tax_law.txt
   - 카드 선정 우선순위: 기출 등장 > 핵심요약 등장 > 과목 필수 기본어
   - 6과목 모두 2021~2025 기출 등장 횟수와 중요도 메타데이터 자동 계산
   - 새 기출 추가 시 tools/core-cards/reindex.cjs 로 빈도/중요도 갱신
   - 모바일/좁은 화면 1장, 넓은 PC 화면 최대 3장
   - 중요/외움 상태 저장, 검색/과목 선택 지원
   - 카드 하단 출처 오른쪽에 기출 중요도 1~5를 노란색 윤곽 별로 표시 (개인 '중요' 지정과 별개)
   - 카드 하단 오른쪽에 현재 과목의 ☆ 중요 카드 수 | ✓ 외움 카드 수 | 전체 카드 수를 표시 (실시간 갱신)
   - 세법 187장 v1.77 1차 내용 감사: 현행 공식 근거 17장 대조, 5장 교정. 상세 검수 진행기록은 review/core-cards-v1/06_tax_law_review_v173.txt
0. 라이트 / 다크모드
   - 시스템 테마 자동 인식
   - 상단 테마 버튼으로 수동 전환
   - 선택한 테마를 브라우저에 저장
1. 과목별 10문제 / 20문제 랜덤 풀이
2. 전체 문제 보기
3. 실전 시험 보기
   - 1차 80문제 / 100분
   - 2차 1교시 80문제 / 100분
   - 2차 2교시 40문제 / 50분
4. 풀이 결과 / 오답 다시 풀기
5. 핵심 개념 퀴즈
   - 6과목 총 485문항
   - 과목별 랜덤 풀이
   - 별도 괄호문제 1,600문항
6. 핵심요약
   - 현재 슬라이드형 뷰어 사용
   - 디자인 개편은 보류 상태

기출문제 데이터
- 원본(Source of Truth): review/past-exams-v1/*.txt
- 생성물: data/*.json, data/*.js, data/manifest.js
- 공식 최종정답 고정키: review/past-exams-audit/official-answer-keys.json

중요
- 기출문제는 review/past-exams-v1/*.txt 만 직접 수정
- data/*.json / data/*.js / data/manifest.js 는 직접 수정하지 않음
- TXT 수정 뒤 전체 생성/검증:
  node tools/past-exams/build.cjs
- 기존 명령 호환:
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

- 세법 카드 2차 현행법 대조(v1.74): 신고·납부·면세점·세액공제 등 18장 교정, 누적 핵심 주장 35/187장 확인. 미대조 152장.
- 상세 파일: review/core-cards-v1/06_tax_law_review_v174.txt

세법 법령 검수 최신 현황 (v1.75, 2026-10-08)
- 세법 187장 중 현행 법령 핵심 주장 누적 대조 59장, 미대조 128장.
- v1.75: 조세총론/취득세 24장 추가 교정, 이전 v1.73 17장·v1.74 18장과 중복 없이 합산.
- 원본 수정: review/core-cards-v1/06_tax_law.txt, 생성 데이터: core-cards/data-tax.js.
- 상세 근거·개별 카드 상태: review/core-cards-v1/06_tax_law_review_v175.txt.
- 전체 법령·판례 예외 전수 정확성 인증은 아직 완료되지 않음.

단어 카드 표시 v1.77
- 카드 하단은 기존 기출 중요도 별 1~5개만 유지. 개인 집계 ☆ 중요 / ✓ 외움 / 총 개수를 카드 하단에서 제거하고 과목 드롭다운 각 과목명 옆으로 이동.
- 여섯 과목 각각의 수치를 표시하며, 저장 상태 변경 시 모든 과목의 집계가 즉시 새로고침됨.
- 모바일에서 드롭다운을 넓히고 메뉴 행이 줄바꿈되도록 대응.


세법 현행법 검수 최신 기록 (v1.78, 2026-10-08)
- 4차 검수에서 조세우선권·불복절차·취득가격·등록면허세 21장 조문 및 설명 보완.
- 세법 카드 187장 중 공식 법령 핵심 주장 누적 대조 80장, 미대조 107장.
- 상세 근거 링크·카드별 검토 상태: review/core-cards-v1/06_tax_law_review_v178.txt.
- 기존 카드/버튼/개인 집계·과목 드롭다운 UI 변동 없음.
- 핵심 주장 대조는 법령의 모든 예외·판례 법률검증 완료를 뜻하지 않음.


세법 현행법 주요 주장 전 과목 1차 대조 현황 (v1.79, 2026-10-08)
- 기존 검수 80장 + 이번 107장 = 세법 187장 모두 주요 주장·법령 조문 1차 대조 및 출처 기록.
- 법령·판례의 모든 예외 및 경과규정까지 정밀검수 완료한 것은 아님. 차후 고위험 내용 별도 교차감사 권장.
- 2026 주택임대 간주임대료 변경: 고가주택 2주택/보증금 합계 12억원 초과도 과세대상 (신규 보완).
- 상세: review/core-cards-v1/06_tax_law_review_v179.txt (187장별 근거 조문과 상태).
- 수정 원본: review/core-cards-v1/06_tax_law.txt; 출력 데이터: core-cards/data-tax.js.
- 핵심 단어 전체 6과목 1,241장, 드롭다운 과목별 ☆/✓/총 표시 유지.
