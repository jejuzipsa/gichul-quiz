# v1.98 — 민법 물권법 핵심개념/괄호 원본 교차 감사 (2026-10-09)

## 실제 검증 범위 및 구분

- 기준 main: v1.97 `208f4b3f8490d891f13205bfcbddbe7267a27e12`.
- **민법 CVK021~CVK038 18문항**을 대상으로 원본 `review/core-bank-v1/02_civil_law.txt`, 네 선택지, 정답 인덱스, 해설을 민법의 해당 현행 조문과 대조했다. 법적 참·거짓이 아니라 '다른 개념에서는 참이지만 여기서는 오답'이었던 **54개 오답 보기**를 같은 조문 안에서 명백히 거짓인 보기로 대체했다. 기존 정답 보기 18개, 정답 번호, 문항 ID·과목 등은 보존했다.
- 확인 기준은 국가법령정보센터의 **민법 [시행 2026.3.17.] [법률 제21454호]** 조문이다. 일반적인 설명을 확장하여 판례 사실관계 전체까지 확인했다고 주장하지 않는다. 검증 날짜는 조문과 대조한 이 18문항의 `VERIFIED_AT`, `REVIEWED_AT`만 변경했다.
- 본 변경은 **54건의 기존 법적 정답 오류 확정**을 뜻하지 않고, 출제 구조를 '같은 조문의 참·거짓' 형식으로 개선한 조치다. 특히 CVK023은 단순 모든 판결과 제187조의 '판결'을 혼동하지 않도록 해설에 범위를 명시했다.

## 문항별 법률 대조

| 문항 ID | 법적 근거 | 검증 포인트 | 현행 조문 |
|---|---|---|---|
| CVK021 | 민법 제185조 | 물권법정주의: 법률·관습법에 의하지 않은 임의 창설 금지 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0185&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK022 | 민법 제186조 | 법률행위로 인한 부동산물권변동은 등기로 효력 발생 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0186&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK023 | 민법 제187조 | 상속·경매 등 법률상 취득과 등기 없는 처분 제한 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0187&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK024 | 민법 제192조 | 점유권 취득은 사실상 지배 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0192&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK025 | 민법 제197조 | 소유의 의사·선의·평온·공연 추정과 본권소송 패소 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0197&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK026 | 민법 제245조 제1항 | 제1항: 20년 자주·평온·공연 점유 및 등기 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0245&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK027 | 민법 제245조 제2항 | 제2항: 소유자등기·10년·선의·무과실 점유 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0245&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK028 | 민법 제262조 | 공유지분 균등은 법률상 추정 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0262&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK029 | 민법 제264조 | 공유물 전체 처분·변경과 다른 공유자의 동의 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0264&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK030 | 민법 제265조 | 관리 지분 과반수 / 보존 각자 가능 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0265&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK031 | 민법 제279조 | 타인의 토지에 건물·공작물·수목 소유 목적의 사용 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0279&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK032 | 민법 제291조 | 자기 토지 편익을 위한 타인 토지 이용 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0291&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK033 | 민법 제303조 | 전세금·사용수익·우선변제 및 농경지 제한 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0303&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK034 | 민법 제312조 | 최장 10년·건물 최소 1년·갱신기간 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0312&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK035 | 민법 제320조 | 피담보채권 변제기 도래·견련성·불법행위 점유 제외 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0320&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK036 | 민법 제321조 | 유치권의 불가분성 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0321&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK037 | 민법 제356조 | 점유 이전 없는 담보 제공·우선변제 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0356&lsiSeq=284415&urlMode=lsScJoRltInfoR) |
| CVK038 | 민법 제357조 | 채권최고액과 피담보채무 확정유보 | [국가법령정보센터](https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0357&lsiSeq=284415&urlMode=lsScJoRltInfoR) |

추가로 종전 학습 노트보다 법령이 우선하는 원칙을 유지한다. 예를 들어 전세권 존속기간은 원칙적으로 10년 상한이지만 건물 전세권 최소기간과 갱신규정이 따로 있어, 정답을 단순 수치 기억으로만 해설하지 않았다.

## 괄호문제 연결 데이터 감사

- 민법 V2 괄호문제 300개 중 **CVK021~CVK038에서 파생된 75개**의 `originQuestionId`와 원본 TXT 내 `[원본 핵심개념 문제]` 및 `[원본 정답]` 복사문을 현재 원본 핵심문제와 비교했다.
- 원본 문제문 참조 복사문 **75개**가 이전 질문형식을 유지하고 있었으므로 현재 원본 질문과 일치시키고, 원본 정답 참조 복사문 **5개**가 `CVK038`의 과거 정답을 담고 있던 문제도 현재 정답으로 수정했다.
- 원본 정답 참조문 수정 대상은 `BLANK-02-038`, `BLANK-02-185`, `BLANK-02-186`, `BLANK-02-187`, `BLANK-02-297`. 기존 선택지나 출제에 사용되는 정답 자체가 잘못된 것으로 확정한 것이 아니며, **V2 TXT에 보관된 원본 참조 복사문이 뒤처진 문제**다.
- 괄호 300개 및 전과목 괄호 1,600개의 출제 문장·정답·선택지·ID·해설·연결 ID는 변경하지 않았다. 따라서 `review/blank-bank/civil_law.json`과 `word-quiz/blank-data/civil_law.js`는 그대로 두는 것이 올바르며, V2 컴파일과 두 생성물 byte-level `--check` 검사를 수행한다.
- `tools/cross-bank/validate.cjs`에 18문항 보기·정답·근거와 75개 파생 참조 복사문 전수 동기화 보호 검사를 추가했다.

## 진행도와 한계

- v1.95 CVK001~007 (7개), v1.97 CVK008~020 (13개), v1.98 CVK021~038 (18개): 민법 73문항 중 **38문항**에 대해 같은 법조문 참·거짓형 보기를 개별 교정했다.
- **남은 CVK039~073 35문항**은 이번 18개 정밀검증에 포함되지 않았다. 사실관계와 근거조문 교차검증 없이 자동으로 '완료' 처리하지 않는다.
- 다른 5과목 핵심개념 및 1,600개 괄호 문제의 전체 법률상 최신성 검증도 완료가 아니며 v1.97 시점 잔여 38개 파생 의미감사 후보 수치를 유지한다. 이번에 개선한 75건은 해당 38개 후보와 동일한 분류가 아니다.
