# 일반 핵심개념 TXT Source of Truth

일반 핵심개념 문제은행은 이제 `review/core-bank-v1/*.txt`를 원본(Source of Truth)으로 사용한다.
사이트가 직접 읽는 `word-quiz/data/*.js`는 생성물이며 직접 수정하지 않는다.

## 파일

- 01_real_estate_intro.txt — 부동산학개론
- 02_civil_law.txt — 민법 및 민사특별법
- 03_brokerage_law.txt — 공인중개사법령 및 중개실무
- 04_public_law.txt — 부동산공법
- 05_registration_law.txt — 부동산공시법
- 06_tax_law.txt — 부동산세법

현재 기준 총 485문항이다.

## 문항 블록 형식

각 문제는 `================================================================================` 구분선 사이의 독립 블록이다.

ID: REK001
STATUS: APPROVED
CATEGORY: 기본원리·토지용어
DIFFICULTY: 기초
SOURCE_TYPE: 요약자료
LEGACY_ID: RE001
CURATION: 시험핵심선별
REVIEWED_AT: 2026-10-07

[문제]
문제 문장

[보기]
1. 보기 1
2. 보기 2
3. 보기 3
4. 보기 4

[정답]
1

[해설]
해설

법령 과목은 필요에 따라 `SOURCE_LAW`, `SOURCE_ARTICLE`, `VERIFIED_AT`을 함께 적는다.
학개론은 `SOURCE_SECTION`을 사용할 수 있고, 기존 일부 문항의 `TERM`도 보존한다.
`conceptId`는 항상 `ID`와 동일하므로 컴파일러가 자동으로 생성한다.

## 문제 수정

1. 해당 과목 TXT만 수정한다.
2. 보기 번호는 반드시 1~4를 사용한다.
3. [정답]에는 1~4 중 하나를 적는다.
4. 검토가 끝난 문항은 `STATUS: APPROVED` 상태로 둔다.
5. 아래 명령으로 생성물과 검증을 한 번에 갱신한다.

```
node tools/core-bank/build.cjs
```

이 명령은 일반 핵심개념 JS를 재생성하고, 핵심개념 구조/릴리스 검증을 수행하며,
핵심개념 버전 변경으로 영향을 받는 괄호문제 은행의 coreVersion/coreAuditDate 미러도 다시 맞춘다.

## 문제 추가

기존 블록 하나를 복사해 새 ID로 추가하면 된다.
문항 수는 블록 개수에서 자동 계산하므로 COUNT 숫자를 따로 수정할 필요가 없다.
ID는 과목별 접두사(REK/CVK/BRK/PLK/RGK/TXK)를 유지하고 기존 ID와 중복되면 안 된다.

manifest의 `baselineCount`는 실수로 기존 문항이 삭제되는 것을 막기 위한 최소 개수다.
새 문제를 추가할 때는 baselineCount를 수정할 필요가 없다.
의도적으로 기존 문제를 삭제하여 기준 개수보다 줄이는 경우에만 manifest를 함께 조정한다.

## 검증 규칙

- 문제 ID 중복 금지
- 문제문장 완전중복 금지
- 보기 정확히 4개
- 동일 보기 중복 금지
- 정답 1~4
- 문제/해설/출처/검토일 필수
- 법령 과목은 법령명·조문·검증일 필수
- TXT와 사이트용 JS가 다르면 CI 실패
- 일반 핵심개념이 바뀌어 괄호문제 은행의 coreVersion/coreAuditDate가 어긋나도 CI 실패

따라서 앞으로는 TXT를 검수하고 빌드한 뒤 생성된 JS를 함께 커밋하면 된다.
