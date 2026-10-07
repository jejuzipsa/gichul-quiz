기출문제 TXT Source of Truth v1
================================

목적
- 2021~2025 제32~36회 공인중개사 기출 1,000문항을 사람이 직접 검토·수정하기 쉬운 TXT로 관리한다.
- review/past-exams-v1/*.txt 가 원본(Source of Truth)이다.
- data/*.json, data/*.js, data/manifest.js 는 생성물이며 직접 수정하지 않는다.

과목별 파일
- 01_real_estate_intro.txt: 부동산학개론 200
- 02_civil_law.txt: 민법 및 민사특별법 200
- 03_brokerage_law.txt: 공인중개사법령 및 중개실무 200
- 04_public_law.txt: 부동산공법 200
- 05_registration_law.txt: 부동산공시법 120
- 06_tax_law.txt: 부동산세법 80

문항 블록
- ID / STATUS / YEAR / EXAM / PAPER / QUESTION_NUMBER
- [문제]
- [보기] 1~5
- [정답] 단일답은 숫자 하나, 복수답은 쉼표로 구분
- [해설]

수정 절차
1. 해당 TXT 문항 블록만 수정한다.
2. node tools/past-exams/build.cjs 를 실행한다.
3. 생성된 data/*.json, data/*.js, data/manifest.js 를 함께 커밋한다.
4. PR에서 Past exams TXT review CI가 TXT 재현성과 공식 최종정답 고정키를 검증한다.

주의
- 기출 원문은 시험 당시 원문 보존이 원칙이다.
- 현행법과 다르다는 이유로 문제/보기를 현대화하지 않는다.
- 정답 변경은 반드시 Q-Net 공식 최종정답을 확인한다.
- 공식 복수정답/전원정답은 배열 의미가 보존되도록 쉼표 형식으로 기록한다.
- review/past-exams-audit/official-answer-keys.json 은 공식 최종정답 고정 검증키로 유지한다.
