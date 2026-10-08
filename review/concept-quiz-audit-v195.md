# v1.95 — 민법 핵심개념 같은 주제 오답 보기 정밀교정 (1차, 2026-10-09)

## 범위와 한계

- 기준: v1.94 main `ba5ccf75f2c566910e1be0a1d8318d016935651c`.
- 일반 핵심 개념 **CVK001~CVK007의 7문항만** 4개 보기 전체를 현행 민법 조문과 대조하고, 다른 주제의 참인 설명을 오답 보기로 쓰던 방식을 **동일 조문에 대한 거짓 문장 3개**로 대체했다.
- 질문 형식은 `‘개념’에 관한 설명으로 옳은 것은?`. 각 문항의 기존 ID·정답 인덱스·정답 보기 본문은 유지했다. 오답 지문과 해설만 정밀 수정하고 문항별 `VERIFIED_AT`·`REVIEWED_AT`를 갱신했다.
- 원본 `review/core-bank-v1/02_civil_law.txt`와 파생물 `word-quiz/data/civil_law.js`를 동시 수정. 그 외 핵심 개념 및 괄호문제의 기존 문항·정답·연결 ID는 건드리지 않는다.
- **485문항 전체의 법률적 의미 검증이나 1,600 괄호문제 전수 실체법 검증으로 표시하지 않는다.** 2026-10-09 기준으로 내용까지 직접 확인한 신규 범위는 아래 7문항뿐이다. 기존 v1.94 감사에서 판정 유보한 44개 파생 문항과 다른 카드의 법률 예외 검토는 남아 있다.

## 각 문항별 실체 내용 점검

| ID | 현행 법률 | 선택지의 주요 구별점과 해설 보강 |
|---|---|---|
| CVK001 | 민법 제103조 | 사회질서 위반 법률행위의 당연무효 / 취소·추인·상대방 인식 조건 오인 구별 |
| CVK002 | 민법 제104조 | 궁박·경솔·무경험과 현저한 불균형의 결합, 상대방의 이용 의사에 관한 판례 요건 / 단순 고가·취소 혼동 구별 |
| CVK003 | 민법 제107조 제1·2항 | 비진의 의사표시의 원칙적 유효, 상대방 인식 시 무효, 선의 제3자 보호 |
| CVK004 | 민법 제108조 제1·2항 | 상대방과의 통정 필요, 당연무효, 선의 제3자에게 대항 불가 |
| CVK005 | 민법 제109조 제1·2항 | 내용 중요부분의 착오, 중대한 과실 제한, 선의 제3자에 대한 대항 불가 |
| CVK006 | 민법 제110조 제1~3항 | 사기·강박은 취소 사유, 제3자 사기·강박의 상대방 인식 조건, 선의 제3자 보호 |
| CVK007 | 민법 제111조 제1·2항 | 도달주의와 발신·내심·열람 구별, 발송 후 사망·제한능력자 효과 |

## 실제 확인한 공식 출처

현행 민법: **2026-03-17 시행, 법률 제21454호**.
- https://law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0103&lsiSeq=284415&urlMode=lsScJoRltInfoR
- https://law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0104&lsiSeq=284415&urlMode=lsScJoRltInfoR
- https://law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0107&lsiSeq=284415&urlMode=lsScJoRltInfoR
- https://law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0108&lsiSeq=284415&urlMode=lsScJoRltInfoR
- https://law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0109&lsiSeq=284415&urlMode=lsScJoRltInfoR
- https://law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0110&lsiSeq=284415&urlMode=lsScJoRltInfoR
- https://law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0111&lsiSeq=284415&urlMode=lsScJoRltInfoR
- CVK002 대법원 2002-10-22 선고 **2002다38927** 판결(현저한 불균형 + 피해자 사정 + 상대방의 폭리행위 악의): https://www.law.go.kr/LSW/precInfoP.do?precSeq=82026

## 재검사와 별개로 남는 일

- `tools/cross-bank/validate.cjs`에 7문항의 정답 인덱스·출처·질문 유형·정답 보기 재활용 방지 회귀검사 추가. 나머지 485/1,600 구조·원본 연결 검사는 기존 CI 유지.
- 동일 유형인 다른 과목의 참인 보기 재활용 문항들은 아직 단일 개념의 거짓 오답 문장으로 고치지 않았다. 과목별 공식 조문·판례를 대조한 후 단계별 교정해야 한다.
- 자동검사는 거짓 문장의 법적 타당성을 스스로 보증하지 않으므로 위 7건에서만 사람에 의한 조문 대조를 기록한다.
