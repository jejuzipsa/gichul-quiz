핵심 단어 카드 TXT Source of Truth v1
====================================

현재 완성 과목
- 부동산학개론: 170장
- 민법 및 민사특별법: 247장
- 공인중개사법령 및 중개실무: 204장
- 부동산공법: 234장
- 총 855장

원본
- review/core-cards-v1/01_real_estate_intro.txt
- review/core-cards-v1/02_civil_law.txt
- review/core-cards-v1/03_brokerage_law.txt
- review/core-cards-v1/04_public_law.txt

카드 선정 우선순위
1. 기출문제에 실제 등장한 단어·개념
2. 과목 핵심요약 PDF에 등장한 단어·개념
3. 과목 공부에 필요한 필수 기본어

기출 중요도
- EXAM_HIT_COUNT: 2021~2025 공식 기출 200문제의 문제+보기에서 제목/검색별칭이 나온 문제 수
- IMPORTANCE 5: 기출 10회 이상
- IMPORTANCE 4: 기출 5~9회
- IMPORTANCE 3: 기출 1~4회
- IMPORTANCE 2: 기출 미등장 + 핵심요약 수록
- IMPORTANCE 1: 기출·요약 미등장 + 필수 기본어
- 새 기출 추가 후 node tools/core-cards/reindex.cjs --write 로 reindexExam=true 과목의 빈도 메타데이터를 갱신한다.

문항 블록
- ID / STATUS / ORDER / TYPE / CATEGORY
- BASIS
- EXAM_HIT_COUNT / EXAM_YEARS / EXAM_SAMPLE_REFS / IMPORTANCE
- SOURCE_KIND / SOURCE_PAGE / SOURCE_SECTION / SOURCE_REF
- [제목] / [부제] / [검색어] / [핵심] / [수식] / [시각화] / [검수메모]

런타임 생성물
- core-cards/data.js: 부동산학개론·민법·중개사법 기본 묶음
- core-cards/data-public.js: 부동산공법 234장 런타임 샤드

빌드/검증
- node tools/core-cards/build.cjs
- reindex → TXT compile → validator 순서로 실행
- CI는 reindex --check로 새 기출 반영 누락도 검사

편집 규칙
1. 카드 내용은 과목별 TXT만 직접 수정한다.
2. 기출 > 핵심요약 > 필수 기본어 순으로 후보를 선정한다.
3. 기출 횟수는 문제 수 기준이며 한 문제 안 반복은 1회로 센다.
4. 긴 판례 문장·긴 표를 그대로 카드화하지 않는다.
5. 개정이 잦은 금액·연령·공시일자·보증금 기준 등 시점 민감 숫자는 원칙적으로 제외한다.
6. 특별법 내용이 요약집과 현행법이 다르면 현행 국가법령정보센터를 우선하고 감사파일에 기록한다.
7. [검색어]는 별칭·약칭용이며 검색과 기출 빈도 보조키로 사용한다.
