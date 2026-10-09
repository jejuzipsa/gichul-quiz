# v2.02 — 공인중개사법 개설등록·고용 등 BRK011~020 감사 (2026-10-09)

## 검토 범위와 한계

v2.01 main `b6e8f8cd93ebd171b699a85e417022f13141f555`에서 **BRK011~020 10문항**을 현행 공인중개사법·시행령·시행규칙에 맞춰 질문·정답·오답 보기·해설을 검토했다. 다른 법률개념에서 참인 서술이던 오답 30개를 현재 문항의 규정과 관련된 거짓 보기로 교체했다. 문항 ID, 정답 보기, 정답 번호, 중요도 정보는 보존했다.

## 법령 기준

현행 공인중개사법 [시행 2026-08-28, 법률 제21409호], 같은 법 시행령 [시행 2026-08-28, 대통령령 제36590호], 시행규칙 [시행 2026-08-28, 국토교통부령 제1611호]. 각 근거는 국가법령정보센터에서 확인했다.

| 문항 | 검토 조문 및 의미 | 공식 링크 |
|---|---|---|
| BRK011 | 법 제9조: 개설등록 신청 의무, 등록관청 소재지 및 신청자격 | https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1032085125 |
| BRK012 | 시행규칙 제4조: 관할 시장·군수·구청장에게 신청 | https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lspttninfSeq=106738 |
| BRK013 | 시행령 제13조 및 법 제34조: 실무교육 기준과 법정 교육 면제 | https://law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lspttninfSeq=106720 |
| BRK014 | 시행령 제13조: 건축물대장 기재 사무소 확보 기준 | https://law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lspttninfSeq=106720 |
| BRK015 | 법 제13조 제1·3·6항: 원칙 1개 사무소, 법인 분사무소·공동사용 예외 | https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1031157149 |
| BRK016 | 법 제13조 제2항: 이동식 천막 등의 임시 중개시설물 금지 | https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1031157149 |
| BRK017 | 법 제15조, 시행규칙 제8조 제1항: 교육 후 업무개시 전 고용 신고 | https://law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lspttninfSeq=106738 |
| BRK018 | 법 제15조, 시행규칙 제8조 제4항: 종료 후 10일 이내 신고 | https://law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lspttninfSeq=106738 |
| BRK019 | 법 제15조 제3항: 개업+소속공인중개사 인원 합계의 5배 이내 | https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1032085431 |
| BRK020 | 법 제18조의4: 현장안내 등 보조 전에 중개의뢰인에게 신분 고지 | https://law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1020820721 |

BRK018은 원래 SOURCE_ARTICLE이 '고용관계 신고 규정'이므로, 해당 메타데이터를 임의 변경하지 않고 해설에서 구체적인 시행규칙 제8조 제4항을 명시한다.

## 교차 데이터 감사

- BRK011~020을 originQuestionId로 연결하는 괄호문제 **50문항**을 확인했다.
- `review/blank-bank-v2/03_brokerage_law_final.txt`의 보관된 원본 질문 제목 **50개**를 신규 제목에 동기화했다.
- 연결 괄호문제의 원본 정답 참조문 충돌은 0개였다. 실제 괄호 문제·보기·정답·해설·ID·연결 ID 및 파생 JSON/JS를 변경하지 않았다.
- 일반 원본 TXT와 `word-quiz/data/brokerage_law.js`의 데이터 동기화, 전체 일반 485·괄호 1,600문항 수와 회귀검사 유지.
- `tools/cross-bank/validate.cjs`에 이번 10문항의 정답 위치, 출처, 유일 보기, 원본 참조 50건의 일치 검증 추가.

## 범위 제한

중개사법 일반 60문항 중 **BRK001~020 20문항**의 선택지를 v2.01~v2.02에서 개별 교정했다. 남은 BRK021~060 40문항, 중개사법 파생 괄호 300개의 법적 정확성 및 타 과목은 실체법 전수검증 미완료 상태다. 자동 구조검사가 모든 문항의 법률·판례 정확성을 보장하지 않는다.
