# 관리자 시스템 사용량 모니터링 설계안 (후속 작업)

문서 상태: **설계만 완료 / 미구현**  
작성: 2026-10-11  
대상: `jejuzipsa/gichul-quiz` 관리 화면 (`/admin/`)  
전제: v2.28 방문 기록 서버 배포 확인 및 v2.29 관리자 OTP 정식 배포 후 작업.  
**main 병합 및 운영 배포는 별도 승인·검수 단계에서 진행.**

## 1. 목표와 범위

- 관리자만 서버 자원 소모와 무료 한도 대비 사용률을 확인한다.
- 모바일·PC 모두 정상 표시하고 다크모드를 유지한다.
- 외부 서비스의 **공식 집계값**과 애플리케이션의 **추정값**을 반드시 구분한다.
- 통계가 없는 경우 `— (연동 전)`이라고 표기하고 **0회 또는 사용률 0%라고 표시하지 않는다**.
- 로그인 개인정보, OTP/복구 코드, 방문자 원본 IP와 비밀 키는 사용량 대시보드로 전송하지 않는다.
- 공개 홈페이지 하단에는 사용량을 표시하지 않는다.

## 2. 관리자 화면 UX

위치: `/admin/` 로그인 후 **시스템 사용량** 섹션, 기존 방문 통계·보안 이력과 별도.

모바일은 카드 1열, 넓은 화면은 2열. 표시 순서:

### Upstash Redis

1. 이번 달 명령: `공식 사용량 / 500,000` (사용률 및 잔여량)
2. 저장 공간: `현재 실제 사용량 / 256 MB`
3. 이번 달 전송량: `공식 사용량 / 10 GB`
4. 최근 갱신 시각, 집계 기준 기간, 값 출처, 상태(공식/추정/연동 전).
5. `Upstash 사용량 확인` 링크: https://console.upstash.com/

### Vercel

1. Function 호출: `공식 사용량 / 1,000,000`
2. Active CPU: `공식 사용량 / 4 CPU-hours`
3. Provisioned Memory: `공식 사용량 / 360 GB-hours`
4. 배포 제한 발생 시: 최근 배포 오류 및 수동 재시도 안내. 서버가 반환한 실제 제한/재시도 값을 우선.
5. `Vercel Usage 확인` 링크: https://vercel.com/dashboard → 소속 프로젝트 선택 → Usage.

Vercel 기능별 요금제/집계 기간은 변화할 수 있으므로 문서의 한도는 **참고값**이며, 실제 화면은 운영 계획의 최신 설정 및 공식 출처를 사용한다.

### 선택적으로 추가할 내부 사이트 통계

- 오늘/7일/30일 중복 제외 방문 수 (기존 `lib/visit-logs.js` 사용).
- 관리자 로그인 성공/실패 횟수 (기존 보안 감사 이벤트 사용).
- 앱의 자체 측정 API 요청 수(후속 단계): 공급자 청구 기준 수치가 아니라는 표시 필수.
- 방문자 정보가 포함된 개별 로그를 사용량 화면에 중복 노출하지 않는다.

## 3. 데이터 연동: **공식 값과 추정 값 구별이 핵심**

### Upstash 사용량

공식 문서에 `GET https://api.upstash.com/v2/redis/stats/{id}`가 있다.
응답의 `total_monthly_requests`, `current_storage`, `total_monthly_bandwidth` 등은 **관리 API 인증이 가능한 경우에만** 활용한다.

**현재 제약:** 공식 Upstash Developer API 소개 문서에 따르면 Vercel/Fly.io 같은 **타사 플랫폼을 통해 생성한 계정은 Developer API 사용을 지원하지 않는다.** 우리 저장소는 Vercel Marketplace Upstash 연결을 사용 중이므로 위 API가 현재 연결에 작동한다고 가정해서는 안 된다.

- 1차 구현: 공식 대시보드 링크 제공, 상태는 `연동 전`, 내부 방문 수만 정확히 표시.
- 연결 가능성 확인 후 2차 구현: 지원되는 **공식 읽기 전용 데이터 인터페이스**가 확인될 때 서버 전용으로 연결. 제공되지 않는 저장량이나 총 명령 수는 `—`로 둔다.
- 앱 내부 `redis()` 호출 횟수를 세는 경우 공식 **청구 대상 명령 수가 아닌 추정값**. 앱 외부 사용량, 오류·재시도, 데이터 전송량이 포함되지 않을 수 있다.
- `redis()` 함수 호출마다 새로운 Redis `INCR`을 실행해 계측하는 것은 사용량을 불필요하게 늘리므로 금지.
- Upstash REST Redis 토큰(`KV_REST_API_TOKEN`)은 데이터 접근용이지 Developer API 계정 인증 키가 아니다. 혼용 금지.

### Vercel 사용량

- 공식 값은 Vercel 프로젝트/팀 `Usage`에서 확인 가능.
- 서버 자동 조회는 실제 사용 가능한 **공식 지원 API, 팀 권한 및 응답 스키마**를 검증한 뒤에만 설계·구현한다.
- 계정 전체 수치인지 특정 프로젝트 수치인지 반드시 구분.
- API 접근권이 없으면 `연동 전`으로 두고 대시보드 링크 사용.
- 배포 제한이 일/시간 창 기준인 경우 Function의 월간 지표와 다른 기간이므로 혼합 퍼센트를 만들지 않는다.

참고: Vercel Hobby 공식 문서는 사용량을 30일 기준으로 확인할 수 있다고 안내한다. Upstash는 월간 집계를 제공한다. **서로 다른 집계 기간을 자동 합산하지 않는다.**

## 4. 값 형식 (예시 스키마, 실제 수치 아님)

```json
{
  "provider": "upstash",
  "metric": "monthly_commands",
  "used": null,
  "limit": 500000,
  "unit": "commands",
  "period": "provider-month",
  "source": "unavailable",
  "asOf": null
}
```

`source`: `official`, `estimated`, `unavailable` 중 하나만 사용.

- `used === null`이면 사용률/잔여량/상태 색상을 계산하지 않는다.
- `source === estimated`이면 `추정`을 화면에 명시하고 공식 대비 초과 보장으로 해석하지 않는다.
- 갱신 시간 `asOf`와 기준 기간 `period`를 항상 표시한다.

## 5. 경고 규칙

공식 값이 확인된 항목에만 적용:

- 70% 미만: 일반 표시
- 70% 이상: `주의`
- 90% 이상: `한도 임박`
- 100% 이상: `한도 도달`

경고 기준은 임의의 UX 설정값이며 공급자 청구 규칙이 아니다. 같은 내용의 알림을 매 페이지 방문마다 반복 전송하지 않는다. 초기 버전은 **관리자 접속 시 화면 경고만** 표시하고 메일/푸시 알림은 차후 별도 승인으로 추가한다.

## 6. 보안 및 성능

- 새로운 서버 경로가 필요하면 `GET /api/admin-usage`로 계획하고 **매 요청마다 `requireAdmin` 검증**.
- 관리 API 키/토큰은 브라우저에 전달하지 않고 Vercel Server Environment Variables에서만 읽는다.
- 관리 API의 세부 응답 원본(계정명, 인증 메타데이터 등)을 브라우저에 그대로 반환하지 않고 수치·시각·상태만 반환.
- 새 관리 API 키 도입 시 최소 권한, 읽기 전용, 주기적 회전 원칙.
- 가능하다면 공식 통계 조회 결과는 일정 시간(예: 30~60분) 서버 캐시하되 **접속 수 자체를 증가시키는 폴링 금지**.
- API 조회 실패 시 기존 문제 풀이·로그인·OTP를 절대 막지 않는다. 관리자 화면에는 `정보를 가져오지 못했어` 표시.
- 로그·JSON·PATCH_NOTES·GitHub의 공개 파일에 개인 통계/토큰/비밀번호를 넣지 않는다.

## 7. 구현 순서 및 완료 조건

1. v2.28 Redis 방문 로그 운영 API와 v2.29 관리자 OTP API를 먼저 정상 배포·검증.
2. 공급자 대시보드 링크 및 사용량 섹션 추가 (공식 값이 연동되지 않으면 정확히 `연동 전` 표시).
3. 승인된 공식 사용량 API 접근 가능 여부 검증. Upstash Marketplace의 Developer API 제약 재확인.
4. 가능한 지표만 공식 수치로 연결. 불가능한 지표는 거짓 추정치 없이 `—`.
5. 70%/90%/100% 경고 및 각 자원별 새로고침 시각 표시.
6. 모바일 320/375/390/430px·데스크톱·다크모드 회귀검사, 관리자 인증 우회 불가 검사, 공급자 API 오류 시 풀이 기능 정상 테스트.
7. 구현 후에만 `PATCH_NOTES.txt`에 변경을 누적 기록하고 배포.

## 8. 공식 레퍼런스 (2026-10-11 확인)

- Upstash Free Redis(256MB / 500K commands per month / 10GB bandwidth): https://upstash.com/pricing/redis
- Upstash Developer API 소개와 타사 플랫폼 제약: https://upstash.com/docs/devops/developer-api/introduction
- Upstash 공식 DB Stats 엔드포인트: https://upstash.com/docs/devops/developer-api/redis/get_database_stats
- Upstash Console Usage/metrics: https://upstash.com/docs/redis/howto/metrics-and-charts
- Vercel Hobby 한도: https://vercel.com/docs/plans/hobby
- Vercel 공식 Usage 화면: https://vercel.com/docs/pricing/manage-and-optimize-usage

**이 문서는 구현 명세이며 실제 코드나 운영 환경을 변경하지 않는다.**
