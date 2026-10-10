# 공인중개사 법령 검색

- 홈페이지 최하단 검색창에서 \`law-search/\`로 이동
- 조문 검색: 국가법령정보센터 OPEN API \`target=aiSearch&search=0\`
- 법령명 검색: \`target=law&search=1\`
- Vercel API: \`/api/law-search?q=검색어&mode=articles|laws&page=1\`
- 검색 결과 클릭 시 국가법령정보센터의 한글 법령·조문 주소로 이동
- 원문은 국가법령정보센터에서 조회하며, 이 사이트가 법령 DB를 복제/관리하지 않음

## 최초 연결 필수

1. https://open.law.go.kr/ 에서 **OPEN API 신청** 후 본인 OC 인증값 발급/승인 확인
2. Vercel **gichul-law-api** 프로젝트 > Settings > Environment Variables 에 \`LAW_API_OC\` 등록
3. 대상 환경 Production, Preview 설정 후 **Redeploy** (환경변수는 생성된 배포에 소급 적용되지 않음)
4. https://gichul-law-api.vercel.app/api/law-search?q=공인중개사법&mode=laws 에서 JSON 반환 확인
5. GitHub Pages 웹사이트의 법령 검색 화면에서 조문 및 법령 검색 확인

OC는 **코드, README, 브라우저, URL에 기록하지 않는다**. 서버 환경변수에서만 읽는다.
OC 미설정 시 API는 \`503 SETUP_REQUIRED\`로 반환하고 검색 화면은 공식 검색 링크를 보여준다.
API 호출 실패는 시간 초과/네트워크/HTTP/JSON 파싱/상위 API 거부/응답 구조 오류로 분리한다. `UPSTREAM_API_REJECTED`나 `UPSTREAM_FORMAT`에는 인증값과 원문 내용 대신 알려진 필드명·자료형만 담은 `diagnostic`이 포함된다. 실제 운영 응답을 검증하기 전에는 인증 미승인 또는 코드 오류라고 단정하지 않는다.

주의: 한글주소의 조문은 국가법령정보센터가 보여주는 현재 적용본으로 연결될 수 있으므로,
검색결과에 표시된 시행일자와 해당 페이지의 시행시점을 다시 확인한다.

검수: \`node --test tools/law-search/test.cjs\`
공식 문서: https://open.law.go.kr/LSO/openApi/guideResult.do?htmlName=aiSearchGuide
공식 문서: https://open.law.go.kr/LSO/openApi/guideResult.do?htmlName=lsNwListGuide

## 오류 JSON의 안전한 확인

실제 검색 URL에서 `error`와 `diagnostic`을 확인한다. `diagnostic.knownFields`는 허용된 필드 이름만, `envelopeType`은 응답 형식만 표시하고 API 인증값이나 법령 원문을 노출하지 않는다.

- `UPSTREAM_API_REJECTED`: 상위 API가 오류 문구/코드를 JSON으로 보냈음. [API인증키관리](https://open.law.go.kr/)에서 승인·OC·신청 범위를 확인한다.
- `UPSTREAM_FORMAT`: 예상한 `LawSearch` 또는 `aiSearch` JSON 규격을 찾지 못했고 명확한 거부 신호도 없음. `diagnostic`만 비교해 원인을 찾는다.
- `UPSTREAM_NON_JSON`: 응답이 HTML이거나 JSON 파싱 불가.

테스트: `node --test tools/law-search/test.cjs`. Vercel Runtime Logs 접근에 실패하면 **실제 성공을 확인한 것으로 표시하지 않는다**.

## 원인 미확정 JSON에 대한 안전 진단 (추가)
양쪽 검색에서 `UPSTREAM_FORMAT`이고 `knownFields=[]`인 경우, 실제 서버가 반환한 최상위 필드의 **이름과 타입**만 `diagnostic.rootFields`에 표시한다. 객체인 경우 한 단계의 하위 필드 이름/타입도 포함한다. 검색어, 원문 오류메시지, OC 인증값, 요청 URL, 실제 필드 값은 출력하지 않는다. 필드 이름이 길거나 민감한 문자열과 일치할 가능성이 있으면 `[redacted]`로 치환한다. 이 정보로 응답 구조를 확인하기 전에는 인증 문제나 외부 API 구조 변경이라고 단정하지 말 것.

## 실제 운영 응답: result / msg
2026-10-10 운영 API의 두 모드가 모두 `{ result: string, msg: string }` 형태의 JSON을 반환하는 것을 확인했다. 이는 표준 검색 결과 `LawSearch`/`aiSearch`가 아니므로 `UPSTREAM_API_REJECTED`로 분류한다. 본문의 `msg` 값은 인증값이나 서버 정보가 포함될 수 있어 그대로 표시하지 않는다. `reason`은 사유를 판단하는 **단서**이며 승인·IP 제한 원인을 확정한 것은 아니다. 법제처 공식 신청 양식은 도메인 주소와 서버 IP 주소 항목을 제공하므로 실제 서버 IP 등록과 승인 상태를 확인해야 한다.

## 운영 실증(2026-10-10)
- 등록된 서비스 도메인을 발신 요청 `Referer`에 지정한 후 Production 실검사에서 **법령명 '민법' 검색 200 응답, 9건**을 반환함. 이 비교 실험의 성공만 확인됐으며, Referer의 공식 필수 여부는 확인되지 않음.
- **지능형 조문 검색(aiSearch)은 아직 502 UPSTREAM_NON_JSON**. API가 반환한 HTML 응답과 JSON 파싱 실패는 `reason=HTML_RESPONSE` 또는 `JSON_PARSE_FAILED`로 구분. 실제 오류 내용은 노출하지 않음.
- aiSearch의 실제 서비스 권한은 별도 자가진단을 통해 같은 OC로 확인해야 함. 현재 응답을 정상 결과로 조작하거나 법령명 검색 결과를 조문 검색 결과로 위장하지 않음.
