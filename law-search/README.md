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
