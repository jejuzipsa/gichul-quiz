(() => {
  const bank=window.CORE_WORD_CARD_BANK;
  if(!bank) throw new Error('CORE_WORD_CARD_BANK base data missing');
  if(!bank.sources.includes("5.공인중개사요약_공법.pdf 64쪽 + Q-Net 2021~2025 제32~36회 + 국가법령정보센터 2026-10-08 현행 법령")) bank.sources.push("5.공인중개사요약_공법.pdf 64쪽 + Q-Net 2021~2025 제32~36회 + 국가법령정보센터 2026-10-08 현행 법령");
  const subject=bank.subjects.find(item=>item.code==="public_law");
  if(subject) subject.disabled=false;
  const ids=new Set(bank.cards.map(card=>card.id));
  const cards=[
  {
    "id": "pub-card-001",
    "subject": "public_law",
    "order": 1,
    "type": "term",
    "category": "국토계획법·계획체계",
    "title": "국토 이용·관리 기본원칙",
    "subtitle": "효율적 이용과 환경보전·균형발전을 함께 추구",
    "bullets": [
      "토지·시설의 효율적 이용, 환경·경관 보전, 삶의 질과 균형발전 등을 함께 추구"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "국토 이용 및 관리의 기본 원칙"
    ],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "국토계획법·계획체계",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p1 · 국토계획법·계획체계"
  },
  {
    "id": "pub-card-002",
    "subject": "public_law",
    "order": 2,
    "type": "term",
    "category": "국토계획법·광역계획",
    "title": "광역계획권",
    "subtitle": "둘 이상의 행정구역을 함께 관리하는 광역계획의 대상권역",
    "bullets": [
      "광역도시계획을 수립할 공간적 범위"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "국토계획법·광역계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2021,
      2022,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-041",
      "2022-33-second1-045",
      "2025-36-second1-041"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p1 · 국토계획법·광역계획"
  },
  {
    "id": "pub-card-003",
    "subject": "public_law",
    "order": 3,
    "type": "term",
    "category": "국토계획법·광역계획",
    "title": "광역도시계획",
    "subtitle": "광역계획권의 장기 발전방향을 제시하는 비구속적 계획",
    "bullets": [
      "도시·군기본계획의 상위 계획이며 공고되는 계획"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "국토계획법·광역계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 5,
    "examYears": [
      2021,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-041",
      "2021-32-second1-042",
      "2024-35-2-1-043",
      "2025-36-second1-041",
      "2025-36-second1-051"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p1 · 국토계획법·광역계획"
  },
  {
    "id": "pub-card-004",
    "subject": "public_law",
    "order": 4,
    "type": "term",
    "category": "국토계획법·기본계획",
    "title": "도시·군기본계획",
    "subtitle": "도시·군의 기본 공간구조와 장기 발전방향을 제시하는 종합계획",
    "bullets": [
      "도시·군관리계획의 지침이 되는 비구속적 계획"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "도시ㆍ군기본계획",
      "도시군기본계획"
    ],
    "sourceKind": "summary",
    "sourcePage": 2,
    "sourceSection": "국토계획법·기본계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 7,
    "examYears": [
      2021,
      2022,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-042",
      "2021-32-second1-049",
      "2022-33-second1-051",
      "2024-35-2-1-041",
      "2024-35-2-1-042",
      "2024-35-2-1-043",
      "2024-35-2-1-048"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p2 · 국토계획법·기본계획"
  },
  {
    "id": "pub-card-005",
    "subject": "public_law",
    "order": 5,
    "type": "term",
    "category": "국토계획법·관리계획",
    "title": "도시·군관리계획",
    "subtitle": "개발·정비·보전을 위해 수립하는 구속적 토지이용계획",
    "bullets": [
      "용도지역·지구, 기반시설, 도시개발·정비사업, 지구단위계획 등을 포함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "도시ㆍ군관리계획",
      "도시군관리계획"
    ],
    "sourceKind": "summary+official",
    "sourcePage": 3,
    "sourceSection": "국토계획법·관리계획",
    "sourceRef": "5.공인중개사요약_공법.pdf p3 + 국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제2조 제4호",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 18,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-044",
      "2021-32-second1-045",
      "2021-32-second1-050",
      "2022-33-second1-043",
      "2022-33-second1-048",
      "2022-33-second1-049",
      "2023-34-second1-045",
      "2023-34-second1-046",
      "2023-34-second1-050",
      "2023-34-second1-052"
    ],
    "importance": 5,
    "sourceLabel": "5.공인중개사요약_공법.pdf p3 + 국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제2조 제4호"
  },
  {
    "id": "pub-card-006",
    "subject": "public_law",
    "order": 6,
    "type": "term",
    "category": "국토계획법·관리계획",
    "title": "도시·군관리계획 입안권자",
    "subtitle": "시장·군수가 원칙이며 장관·도지사도 법정 경우에 입안 가능",
    "bullets": [
      "관할구역 원칙과 둘 이상 행정구역에 걸친 예외를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "입안권자"
    ],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "국토계획법·관리계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 6,
    "examYears": [
      2021,
      2023,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-044",
      "2021-32-second1-061",
      "2023-34-second1-045",
      "2024-35-2-1-042",
      "2024-35-2-1-043",
      "2024-35-2-1-060"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p3 · 국토계획법·관리계획"
  },
  {
    "id": "pub-card-007",
    "subject": "public_law",
    "order": 7,
    "type": "term",
    "category": "국토계획법·관리계획",
    "title": "도시·군관리계획 입안제안",
    "subtitle": "주민이 일정 계획사항의 입안을 제안하는 제도",
    "bullets": [
      "기반시설·지구단위계획구역 등 법정 사항을 주민이 제안 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "주민 입안제안",
      "입안의 제안"
    ],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "국토계획법·관리계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p3 · 국토계획법·관리계획"
  },
  {
    "id": "pub-card-008",
    "subject": "public_law",
    "order": 8,
    "type": "term",
    "category": "국토계획법·관리계획",
    "title": "관리계획 기초조사",
    "subtitle": "도시·군관리계획 입안 전에 현황을 조사하는 절차",
    "bullets": [
      "환경성 검토·토지적성평가·재해취약성 분석 등과 함께 검토하며 법정 예외에는 생략 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "기초조사"
    ],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "국토계획법·관리계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 5,
    "examYears": [
      2021,
      2022,
      2023,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-041",
      "2022-33-second1-050",
      "2022-33-second1-051",
      "2023-34-second1-049",
      "2025-36-second1-043"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p3 · 국토계획법·관리계획"
  },
  {
    "id": "pub-card-009",
    "subject": "public_law",
    "order": 9,
    "type": "term",
    "category": "국토계획법·관리계획",
    "title": "관리계획 결정권자",
    "subtitle": "도시·군관리계획을 최종 결정하는 행정청",
    "bullets": [
      "원칙적 결정권자와 국가계획·특정 용도구역의 예외를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "국토계획법·관리계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2022
    ],
    "examSampleRefs": [
      "2022-33-second1-046"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p3 · 국토계획법·관리계획"
  },
  {
    "id": "pub-card-010",
    "subject": "public_law",
    "order": 10,
    "type": "term",
    "category": "국토계획법·관리계획",
    "title": "지형도면 고시",
    "subtitle": "도시·군관리계획의 공간적 범위를 지형도에 표시해 고시",
    "bullets": [
      "도시·군관리계획은 지형도면 고시일부터 효력이 발생"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "지형도면"
    ],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "국토계획법·관리계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2021,
      2022,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-044",
      "2022-33-second1-042",
      "2024-35-2-1-044"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p4 · 국토계획법·관리계획"
  },
  {
    "id": "pub-card-011",
    "subject": "public_law",
    "order": 11,
    "type": "term",
    "category": "국토계획법·용도지역",
    "title": "용도지역",
    "subtitle": "토지이용·건축물 용도·건폐율·용적률 등을 제한하는 지역구분",
    "bullets": [
      "도시지역·관리지역·농림지역·자연환경보전지역으로 구분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "국토계획법·용도지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 16,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-045",
      "2021-32-second1-047",
      "2021-32-second1-052",
      "2021-32-second1-077",
      "2022-33-second1-041",
      "2022-33-second1-048",
      "2022-33-second1-052",
      "2023-34-second1-043",
      "2023-34-second1-049",
      "2024-35-2-1-048"
    ],
    "importance": 5,
    "sourceLabel": "부동산공법 요약집 p4 · 국토계획법·용도지역"
  },
  {
    "id": "pub-card-012",
    "subject": "public_law",
    "order": 12,
    "type": "term",
    "category": "국토계획법·용도지역",
    "title": "도시지역",
    "subtitle": "인구와 산업이 밀집되거나 밀집이 예상되어 체계적 개발이 필요한 지역",
    "bullets": [
      "주거·상업·공업·녹지지역으로 세분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "국토계획법·용도지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 7,
    "examYears": [
      2021,
      2022,
      2023,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-049",
      "2022-33-second1-041",
      "2022-33-second1-049",
      "2022-33-second1-078",
      "2023-34-second1-044",
      "2025-36-second1-046",
      "2025-36-second1-053"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p4 · 국토계획법·용도지역"
  },
  {
    "id": "pub-card-013",
    "subject": "public_law",
    "order": 13,
    "type": "term",
    "category": "국토계획법·용도지역",
    "title": "관리지역",
    "subtitle": "도시 편입 또는 농림·자연환경 보전을 위해 관리하는 지역",
    "bullets": [
      "계획관리·생산관리·보전관리지역으로 세분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "국토계획법·용도지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 10,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-048",
      "2021-32-second1-052",
      "2022-33-second1-043",
      "2022-33-second1-052",
      "2023-34-second1-043",
      "2023-34-second1-047",
      "2024-35-2-1-048",
      "2024-35-2-1-052",
      "2024-35-2-1-073",
      "2025-36-second1-050"
    ],
    "importance": 5,
    "sourceLabel": "부동산공법 요약집 p5 · 국토계획법·용도지역"
  },
  {
    "id": "pub-card-014",
    "subject": "public_law",
    "order": 14,
    "type": "term",
    "category": "국토계획법·용도지역",
    "title": "농림지역",
    "subtitle": "농림업 진흥과 산림 보전을 위해 필요한 지역",
    "bullets": [
      "농업진흥지역·보전산지 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "국토계획법·용도지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 8,
    "examYears": [
      2021,
      2022,
      2023,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-048",
      "2022-33-second1-052",
      "2023-34-second1-041",
      "2023-34-second1-044",
      "2024-35-2-1-042",
      "2024-35-2-1-048",
      "2024-35-2-1-051",
      "2024-35-2-1-052"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p5 · 국토계획법·용도지역"
  },
  {
    "id": "pub-card-015",
    "subject": "public_law",
    "order": 15,
    "type": "term",
    "category": "국토계획법·용도지역",
    "title": "자연환경보전지역",
    "subtitle": "자연환경·수자원·해안·생태계·문화재 등을 보전하기 위한 지역",
    "bullets": [
      "개발보다 보전 목적이 강한 용도지역"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "국토계획법·용도지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-048"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p5 · 국토계획법·용도지역"
  },
  {
    "id": "pub-card-016",
    "subject": "public_law",
    "order": 16,
    "type": "term",
    "category": "국토계획법·용도지역",
    "title": "전용주거지역",
    "subtitle": "양호한 주거환경 보호를 위해 주거기능을 강하게 보호하는 지역",
    "bullets": [
      "제1종·제2종 전용주거지역으로 세분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "국토계획법·용도지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p4 · 국토계획법·용도지역"
  },
  {
    "id": "pub-card-017",
    "subject": "public_law",
    "order": 17,
    "type": "term",
    "category": "국토계획법·용도지역",
    "title": "일반주거지역",
    "subtitle": "편리한 주거환경 조성을 위한 주거지역",
    "bullets": [
      "제1종·제2종·제3종 일반주거지역으로 세분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "국토계획법·용도지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2023-34-second1-078",
      "2024-35-2-1-061",
      "2025-36-second1-044"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p4 · 국토계획법·용도지역"
  },
  {
    "id": "pub-card-018",
    "subject": "public_law",
    "order": 18,
    "type": "term",
    "category": "국토계획법·용도지역",
    "title": "준주거지역",
    "subtitle": "주거기능을 주로 하되 상업·업무기능을 보완하는 지역",
    "bullets": [
      "주거지역 중 복합이용이 비교적 넓게 허용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "국토계획법·용도지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 4,
    "examYears": [
      2021,
      2023,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-052",
      "2023-34-second1-043",
      "2023-34-second1-078",
      "2025-36-second1-052"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p4 · 국토계획법·용도지역"
  },
  {
    "id": "pub-card-019",
    "subject": "public_law",
    "order": 19,
    "type": "term",
    "category": "국토계획법·용도지역",
    "title": "상업지역",
    "subtitle": "상업·업무기능을 중심으로 하는 도시지역",
    "bullets": [
      "중심·일반·근린·유통상업지역으로 세분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "국토계획법·용도지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 9,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-044",
      "2021-32-second1-052",
      "2022-33-second1-041",
      "2022-33-second1-075",
      "2023-34-second1-043",
      "2023-34-second1-078",
      "2024-35-2-1-048",
      "2025-36-second1-043",
      "2025-36-second1-044"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p5 · 국토계획법·용도지역"
  },
  {
    "id": "pub-card-020",
    "subject": "public_law",
    "order": 20,
    "type": "term",
    "category": "국토계획법·용도지역",
    "title": "공업지역",
    "subtitle": "공업기능을 중심으로 하는 도시지역",
    "bullets": [
      "전용·일반·준공업지역으로 세분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "국토계획법·용도지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 8,
    "examYears": [
      2021,
      2022,
      2023,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-052",
      "2022-33-second1-043",
      "2023-34-second1-043",
      "2023-34-second1-044",
      "2023-34-second1-048",
      "2023-34-second1-078",
      "2025-36-second1-050",
      "2025-36-second1-052"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p5 · 국토계획법·용도지역"
  },
  {
    "id": "pub-card-021",
    "subject": "public_law",
    "order": 21,
    "type": "term",
    "category": "국토계획법·용도지역",
    "title": "녹지지역",
    "subtitle": "도시 자연환경·경관·녹지 보호와 제한적 개발을 위한 지역",
    "bullets": [
      "보전·생산·자연녹지지역으로 세분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "국토계획법·용도지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 8,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-048",
      "2021-32-second1-052",
      "2022-33-second1-043",
      "2023-34-second1-078",
      "2024-35-2-1-052",
      "2024-35-2-1-073",
      "2025-36-second1-050",
      "2025-36-second1-052"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p5 · 국토계획법·용도지역"
  },
  {
    "id": "pub-card-022",
    "subject": "public_law",
    "order": 22,
    "type": "term",
    "category": "국토계획법·용도지역",
    "title": "계획관리지역",
    "subtitle": "제한적 이용·개발을 계획적·체계적으로 관리하는 지역",
    "bullets": [
      "관리지역 중 개발 수요를 계획적으로 수용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "국토계획법·용도지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 4,
    "examYears": [
      2021,
      2022,
      2023,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-052",
      "2022-33-second1-052",
      "2023-34-second1-043",
      "2025-36-second1-050"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p5 · 국토계획법·용도지역"
  },
  {
    "id": "pub-card-023",
    "subject": "public_law",
    "order": 23,
    "type": "term",
    "category": "국토계획법·용도지역",
    "title": "생산관리지역",
    "subtitle": "농림어업 생산을 위해 관리하되 농림지역 지정이 곤란한 지역",
    "bullets": [
      "생산기능 유지가 중심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "국토계획법·용도지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2024
    ],
    "examSampleRefs": [
      "2024-35-2-1-052"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p5 · 국토계획법·용도지역"
  },
  {
    "id": "pub-card-024",
    "subject": "public_law",
    "order": 24,
    "type": "term",
    "category": "국토계획법·용도지역",
    "title": "보전관리지역",
    "subtitle": "자연환경·산림·수질·생태계 보전을 위해 관리하는 지역",
    "bullets": [
      "보전이 필요하나 자연환경보전지역 지정이 곤란한 지역"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "국토계획법·용도지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2022
    ],
    "examSampleRefs": [
      "2022-33-second1-043"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p5 · 국토계획법·용도지역"
  },
  {
    "id": "pub-card-025",
    "subject": "public_law",
    "order": 25,
    "type": "term",
    "category": "국토계획법·용도지구",
    "title": "용도지구",
    "subtitle": "용도지역 제한을 강화·완화해 기능을 증진하거나 보호하는 지구",
    "bullets": [
      "경관·고도·방화·방재·보호·취락·개발진흥지구 등이 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "국토계획법·용도지구",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 5,
    "examYears": [
      2022,
      2023,
      2025
    ],
    "examSampleRefs": [
      "2022-33-second1-041",
      "2023-34-second1-043",
      "2023-34-second1-047",
      "2025-36-second1-043",
      "2025-36-second1-044"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p6 · 국토계획법·용도지구"
  },
  {
    "id": "pub-card-026",
    "subject": "public_law",
    "order": 26,
    "type": "term",
    "category": "국토계획법·용도지구",
    "title": "경관지구",
    "subtitle": "경관을 보호·형성하기 위해 지정하는 용도지구",
    "bullets": [
      "자연경관·시가지경관 등 경관 목적의 규제를 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "국토계획법·용도지구",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2025
    ],
    "examSampleRefs": [
      "2025-36-second1-044"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p6 · 국토계획법·용도지구"
  },
  {
    "id": "pub-card-027",
    "subject": "public_law",
    "order": 27,
    "type": "term",
    "category": "국토계획법·용도지구",
    "title": "고도지구",
    "subtitle": "쾌적한 환경과 경관보호를 위해 건축물 높이의 최고한도를 정하는 지구",
    "bullets": [
      "건축물 높이를 제한해 경관을 관리"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "국토계획법·용도지구",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p6 · 국토계획법·용도지구"
  },
  {
    "id": "pub-card-028",
    "subject": "public_law",
    "order": 28,
    "type": "term",
    "category": "국토계획법·용도지구",
    "title": "방화지구",
    "subtitle": "화재 위험을 예방하기 위해 지정하는 용도지구",
    "bullets": [
      "건축법의 방화 규제와 함께 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "국토계획법·용도지구",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p6 · 국토계획법·용도지구"
  },
  {
    "id": "pub-card-029",
    "subject": "public_law",
    "order": 29,
    "type": "term",
    "category": "국토계획법·용도지구",
    "title": "방재지구",
    "subtitle": "풍수해·산사태·지반붕괴 등 재해를 예방하기 위한 지구",
    "bullets": [
      "재해예방 목적의 용도지구"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "국토계획법·용도지구",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2025
    ],
    "examSampleRefs": [
      "2025-36-second1-044"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p6 · 국토계획법·용도지구"
  },
  {
    "id": "pub-card-030",
    "subject": "public_law",
    "order": 30,
    "type": "term",
    "category": "국토계획법·용도지구",
    "title": "보호지구",
    "subtitle": "문화재·중요시설·생태계 등을 보호하기 위한 용도지구",
    "bullets": [
      "보호대상 특성에 따라 세분 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "국토계획법·용도지구",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p6 · 국토계획법·용도지구"
  },
  {
    "id": "pub-card-031",
    "subject": "public_law",
    "order": 31,
    "type": "term",
    "category": "국토계획법·용도지구",
    "title": "취락지구",
    "subtitle": "녹지·관리·농림·자연환경보전지역의 취락을 정비하기 위한 지구",
    "bullets": [
      "자연취락지구·집단취락지구 등을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "국토계획법·용도지구",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2023,
      2025
    ],
    "examSampleRefs": [
      "2023-34-second1-047",
      "2025-36-second1-044"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p6 · 국토계획법·용도지구"
  },
  {
    "id": "pub-card-032",
    "subject": "public_law",
    "order": 32,
    "type": "term",
    "category": "국토계획법·용도지구",
    "title": "개발진흥지구",
    "subtitle": "주거·산업·유통물류·관광휴양 등 특정 기능을 집중 개발하는 지구",
    "bullets": [
      "기능별 개발진흥지구 유형을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "국토계획법·용도지구",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 7,
    "examYears": [
      2021,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-044",
      "2023-34-second1-044",
      "2023-34-second1-045",
      "2023-34-second1-047",
      "2024-35-2-1-048",
      "2024-35-2-1-050",
      "2025-36-second1-050"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p6 · 국토계획법·용도지구"
  },
  {
    "id": "pub-card-033",
    "subject": "public_law",
    "order": 33,
    "type": "term",
    "category": "국토계획법·용도구역",
    "title": "용도구역",
    "subtitle": "용도지역·지구와 별도로 시가지 확산·자연환경 등을 관리하는 구역",
    "bullets": [
      "개발제한·도시자연공원·시가화조정·수산자원보호구역 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 7,
    "sourceSection": "국토계획법·용도구역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2021,
      2022,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-049",
      "2022-33-second1-041",
      "2024-35-2-1-045"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p7 · 국토계획법·용도구역"
  },
  {
    "id": "pub-card-034",
    "subject": "public_law",
    "order": 34,
    "type": "term",
    "category": "국토계획법·용도구역",
    "title": "개발제한구역",
    "subtitle": "도시의 무질서한 확산 방지와 자연환경 보전을 위한 구역",
    "bullets": [
      "별도 법률에 따라 지정·관리"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 7,
    "sourceSection": "국토계획법·용도구역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2023
    ],
    "examSampleRefs": [
      "2023-34-second1-047"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p7 · 국토계획법·용도구역"
  },
  {
    "id": "pub-card-035",
    "subject": "public_law",
    "order": 35,
    "type": "term",
    "category": "국토계획법·용도구역",
    "title": "도시자연공원구역",
    "subtitle": "도시 자연환경·경관 보호와 시민 휴식공간 확보를 위한 구역",
    "bullets": [
      "도시공원 및 녹지 등에 관한 법률과 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 7,
    "sourceSection": "국토계획법·용도구역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2024
    ],
    "examSampleRefs": [
      "2024-35-2-1-045"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p7 · 국토계획법·용도구역"
  },
  {
    "id": "pub-card-036",
    "subject": "public_law",
    "order": 36,
    "type": "term",
    "category": "국토계획법·용도구역",
    "title": "시가화조정구역",
    "subtitle": "무질서한 시가화를 방지하기 위해 시가화를 일정 기간 유보하는 구역",
    "bullets": [
      "구역 안 행위는 원칙적으로 제한되고 법정 예외는 허가 대상"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 8,
    "sourceSection": "국토계획법·용도구역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 7,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-049",
      "2022-33-second1-047",
      "2022-33-second1-050",
      "2023-34-second1-045",
      "2024-35-2-1-044",
      "2024-35-2-1-045",
      "2025-36-second1-049"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p8 · 국토계획법·용도구역"
  },
  {
    "id": "pub-card-037",
    "subject": "public_law",
    "order": 37,
    "type": "term",
    "category": "국토계획법·용도구역",
    "title": "수산자원보호구역",
    "subtitle": "수산자원 보호·육성을 위해 지정하는 용도구역",
    "bullets": [
      "해양수산부장관의 결정권한이 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 8,
    "sourceSection": "국토계획법·용도구역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2025
    ],
    "examSampleRefs": [
      "2025-36-second1-050"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p8 · 국토계획법·용도구역"
  },
  {
    "id": "pub-card-038",
    "subject": "public_law",
    "order": 38,
    "type": "term",
    "category": "국토계획법·공간혁신",
    "title": "공간재구조화계획",
    "subtitle": "도시혁신·복합용도 등 유연한 공간계획을 위한 계획",
    "bullets": [
      "도시혁신구역·복합용도구역과 관련 계획을 수립하기 위한 현행 제도"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "공간재구조화"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "국토계획법·공간혁신",
    "sourceRef": "국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제35조의2",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 1,
    "examYears": [
      2024
    ],
    "examSampleRefs": [
      "2024-35-2-1-041"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제35조의2"
  },
  {
    "id": "pub-card-039",
    "subject": "public_law",
    "order": 39,
    "type": "term",
    "category": "국토계획법·공간혁신",
    "title": "도시혁신구역",
    "subtitle": "창의적·혁신적 도시공간 개발이 필요한 지역에 지정하는 용도구역",
    "bullets": [
      "도심·부도심·생활권 중심지 또는 주요 기반시설 연계 거점 등에 지정 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "도시혁신계획"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "국토계획법·공간혁신",
    "sourceRef": "국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제40조의3",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 2,
    "examYears": [
      2024,
      2025
    ],
    "examSampleRefs": [
      "2024-35-2-1-045",
      "2025-36-second1-048"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제40조의3"
  },
  {
    "id": "pub-card-040",
    "subject": "public_law",
    "order": 40,
    "type": "term",
    "category": "국토계획법·공간혁신",
    "title": "복합용도구역",
    "subtitle": "산업구조 변화·노후지역 등에 복합적 토지이용을 촉진하는 용도구역",
    "bullets": [
      "복합된 공간이용을 촉진하고 다양한 도시공간을 조성"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "복합용도계획"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "국토계획법·공간혁신",
    "sourceRef": "국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제40조의4",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 1,
    "examYears": [
      2024
    ],
    "examSampleRefs": [
      "2024-35-2-1-045"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제40조의4"
  },
  {
    "id": "pub-card-041",
    "subject": "public_law",
    "order": 41,
    "type": "term",
    "category": "국토계획법·공간혁신",
    "title": "도시·군계획시설입체복합구역",
    "subtitle": "도시·군계획시설과 다른 용도를 입체적으로 복합하는 구역",
    "bullets": [
      "시설부지의 입체적·복합적 활용을 위한 현행 제도"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "입체복합구역"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "국토계획법·공간혁신",
    "sourceRef": "국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제40조의5",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제40조의5"
  },
  {
    "id": "pub-card-042",
    "subject": "public_law",
    "order": 42,
    "type": "term",
    "category": "국토계획법·지구단위계획",
    "title": "지구단위계획구역",
    "subtitle": "일부 지역을 체계적·계획적으로 관리하기 위해 지정하는 구역",
    "bullets": [
      "토지이용 합리화·기능증진·미관개선 등을 위해 지정"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "지구단위계획 구역"
    ],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "국토계획법·지구단위계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 12,
    "examYears": [
      2021,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-044",
      "2021-32-second1-045",
      "2023-34-second1-041",
      "2023-34-second1-044",
      "2023-34-second1-045",
      "2024-35-2-1-041",
      "2024-35-2-1-047",
      "2024-35-2-1-073",
      "2025-36-second1-042",
      "2025-36-second1-043"
    ],
    "importance": 5,
    "sourceLabel": "부동산공법 요약집 p9 · 국토계획법·지구단위계획"
  },
  {
    "id": "pub-card-043",
    "subject": "public_law",
    "order": 43,
    "type": "term",
    "category": "국토계획법·지구단위계획",
    "title": "지구단위계획",
    "subtitle": "지구단위계획구역의 토지이용·건축물·기반시설을 구체화하는 계획",
    "bullets": [
      "용도·건폐율·용적률·건축물 배치·형태·교통처리 등을 정할 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "국토계획법·지구단위계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 16,
    "examYears": [
      2021,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-044",
      "2021-32-second1-045",
      "2023-34-second1-041",
      "2023-34-second1-042",
      "2023-34-second1-044",
      "2023-34-second1-045",
      "2023-34-second1-046",
      "2024-35-2-1-041",
      "2024-35-2-1-044",
      "2024-35-2-1-047"
    ],
    "importance": 5,
    "sourceLabel": "부동산공법 요약집 p9 · 국토계획법·지구단위계획"
  },
  {
    "id": "pub-card-044",
    "subject": "public_law",
    "order": 44,
    "type": "term",
    "category": "국토계획법·지구단위계획",
    "title": "공동위원회 심의",
    "subtitle": "건축·도시계획위원회가 지구단위계획의 건축 관련 사항을 함께 심의",
    "bullets": [
      "높이·배치·건축선·경관 등 법정 사항에서 공동심의"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "국토계획법·지구단위계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p9 · 국토계획법·지구단위계획"
  },
  {
    "id": "pub-card-045",
    "subject": "public_law",
    "order": 45,
    "type": "term",
    "category": "국토계획법·기반시설",
    "title": "기반시설",
    "subtitle": "도로·철도·공원·학교·공공청사 등 도시 기능에 필요한 시설",
    "bullets": [
      "교통·공간·공공문화체육·방재·환경기초시설 등"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 12,
    "sourceSection": "국토계획법·기반시설",
    "sourceRef": "5.공인중개사요약_공법.pdf p12 + 국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제2조 제6호",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 18,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-047",
      "2021-32-second1-050",
      "2021-32-second1-051",
      "2021-32-second1-059",
      "2022-33-second1-042",
      "2022-33-second1-048",
      "2022-33-second1-050",
      "2023-34-second1-041",
      "2023-34-second1-042",
      "2023-34-second1-045"
    ],
    "importance": 5,
    "sourceLabel": "5.공인중개사요약_공법.pdf p12 + 국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제2조 제6호"
  },
  {
    "id": "pub-card-046",
    "subject": "public_law",
    "order": 46,
    "type": "term",
    "category": "국토계획법·기반시설",
    "title": "도시·군계획시설",
    "subtitle": "기반시설 중 도시·군관리계획으로 결정된 시설",
    "bullets": [
      "모든 기반시설이 곧 도시·군계획시설인 것은 아님"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "도시ㆍ군계획시설"
    ],
    "sourceKind": "summary+official",
    "sourcePage": 12,
    "sourceSection": "국토계획법·기반시설",
    "sourceRef": "5.공인중개사요약_공법.pdf p12 + 국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제2조 제7호",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 13,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-043",
      "2021-32-second1-050",
      "2022-33-second1-041",
      "2022-33-second1-042",
      "2022-33-second1-046",
      "2022-33-second1-050",
      "2022-33-second1-064",
      "2023-34-second1-049",
      "2023-34-second1-051",
      "2023-34-second1-052"
    ],
    "importance": 5,
    "sourceLabel": "5.공인중개사요약_공법.pdf p12 + 국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제2조 제7호"
  },
  {
    "id": "pub-card-047",
    "subject": "public_law",
    "order": 47,
    "type": "term",
    "category": "국토계획법·기반시설",
    "title": "공동구",
    "subtitle": "전기·가스·수도·통신 등 시설을 지하에 공동 수용하는 시설",
    "bullets": [
      "의무수용 시설과 공동구협의회 심의를 거쳐 수용하는 시설을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 12,
    "sourceSection": "국토계획법·기반시설",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 5,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-043",
      "2022-33-second1-064",
      "2023-34-second1-062",
      "2024-35-2-1-046",
      "2025-36-second1-045"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p12 · 국토계획법·기반시설"
  },
  {
    "id": "pub-card-048",
    "subject": "public_law",
    "order": 48,
    "type": "term",
    "category": "국토계획법·기반시설",
    "title": "광역시설",
    "subtitle": "둘 이상의 시·군에 걸치거나 공동 이용하는 광역적 기반시설",
    "bullets": [
      "광역적인 정비체계가 필요한 시설"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 12,
    "sourceSection": "국토계획법·기반시설",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-043"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p12 · 국토계획법·기반시설"
  },
  {
    "id": "pub-card-049",
    "subject": "public_law",
    "order": 49,
    "type": "term",
    "category": "국토계획법·기반시설",
    "title": "장기미집행 도시·군계획시설",
    "subtitle": "결정 후 장기간 사업이 시행되지 않은 도시·군계획시설",
    "bullets": [
      "매수청구와 시설결정 실효제도와 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "장기미집행 시설"
    ],
    "sourceKind": "summary",
    "sourcePage": 12,
    "sourceSection": "국토계획법·기반시설",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p12 · 국토계획법·기반시설"
  },
  {
    "id": "pub-card-050",
    "subject": "public_law",
    "order": 50,
    "type": "term",
    "category": "국토계획법·기반시설",
    "title": "도시·군계획시설부지 매수청구",
    "subtitle": "장기미집행 시설부지 중 법정 토지에 대한 매수청구권",
    "bullets": [
      "장기간 미집행된 대지 소유자의 권리"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "매수청구권"
    ],
    "sourceKind": "summary",
    "sourcePage": 12,
    "sourceSection": "국토계획법·기반시설",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p12 · 국토계획법·기반시설"
  },
  {
    "id": "pub-card-051",
    "subject": "public_law",
    "order": 51,
    "type": "term",
    "category": "국토계획법·시설사업",
    "title": "도시·군계획시설사업",
    "subtitle": "도시·군계획시설을 설치·정비·개량하는 사업",
    "bullets": [
      "도시·군계획사업의 한 종류"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "도시ㆍ군계획시설사업"
    ],
    "sourceKind": "summary+official",
    "sourcePage": 13,
    "sourceSection": "국토계획법·시설사업",
    "sourceRef": "5.공인중개사요약_공법.pdf p13 + 국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제2조 제10호",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 6,
    "examYears": [
      2021,
      2022,
      2023,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-050",
      "2022-33-second1-050",
      "2023-34-second1-049",
      "2023-34-second1-051",
      "2023-34-second1-052",
      "2025-36-second1-051"
    ],
    "importance": 4,
    "sourceLabel": "5.공인중개사요약_공법.pdf p13 + 국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제2조 제10호"
  },
  {
    "id": "pub-card-052",
    "subject": "public_law",
    "order": 52,
    "type": "term",
    "category": "국토계획법·시설사업",
    "title": "도시·군계획시설사업 시행자",
    "subtitle": "시설사업을 실제 시행하는 행정청·민간 시행자",
    "bullets": [
      "시행자 지정과 실시계획 인가 절차를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 13,
    "sourceSection": "국토계획법·시설사업",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p13 · 국토계획법·시설사업"
  },
  {
    "id": "pub-card-053",
    "subject": "public_law",
    "order": 53,
    "type": "term",
    "category": "국토계획법·시설사업",
    "title": "시설사업 실시계획",
    "subtitle": "도시·군계획시설사업의 구체적 설계·사업시행 계획",
    "bullets": [
      "실시계획 작성·인가·고시 후 사업을 시행"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 13,
    "sourceSection": "국토계획법·시설사업",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-050"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p13 · 국토계획법·시설사업"
  },
  {
    "id": "pub-card-054",
    "subject": "public_law",
    "order": 54,
    "type": "term",
    "category": "국토계획법·개발행위",
    "title": "개발행위허가",
    "subtitle": "건축·공작물·형질변경·토석채취·토지분할·물건적치 등의 허가",
    "bullets": [
      "계획적 토지이용을 위해 일정 개발행위를 사전 통제"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "개발행위 허가"
    ],
    "sourceKind": "summary",
    "sourcePage": 10,
    "sourceSection": "국토계획법·개발행위",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 9,
    "examYears": [
      2021,
      2022,
      2023,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-046",
      "2022-33-second1-042",
      "2022-33-second1-044",
      "2022-33-second1-048",
      "2022-33-second1-078",
      "2023-34-second1-041",
      "2023-34-second1-042",
      "2024-35-2-1-047",
      "2024-35-2-1-049"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p10 · 국토계획법·개발행위"
  },
  {
    "id": "pub-card-055",
    "subject": "public_law",
    "order": 55,
    "type": "term",
    "category": "국토계획법·개발행위",
    "title": "개발행위허가 제외",
    "subtitle": "경미하거나 긴급한 행위 등 허가 없이 가능한 예외",
    "bullets": [
      "재해복구·재난수습 등 법정 예외와 경미한 행위를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 10,
    "sourceSection": "국토계획법·개발행위",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p10 · 국토계획법·개발행위"
  },
  {
    "id": "pub-card-056",
    "subject": "public_law",
    "order": 56,
    "type": "term",
    "category": "국토계획법·개발행위",
    "title": "개발행위허가 기준",
    "subtitle": "개발행위가 계획·환경·기반시설과 조화를 이루는지 판단하는 기준",
    "bullets": [
      "용도지역 특성, 주변 환경, 기반시설 확보 등을 종합 판단"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 10,
    "sourceSection": "국토계획법·개발행위",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p10 · 국토계획법·개발행위"
  },
  {
    "id": "pub-card-057",
    "subject": "public_law",
    "order": 57,
    "type": "term",
    "category": "국토계획법·개발행위",
    "title": "개발행위 공공시설 귀속",
    "subtitle": "개발행위로 새로 설치하거나 대체된 공공시설의 귀속",
    "bullets": [
      "개발행위자가 행정청인지 비행정청인지에 따라 무상귀속 구조를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "공공시설의 귀속"
    ],
    "sourceKind": "summary",
    "sourcePage": 10,
    "sourceSection": "국토계획법·개발행위",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2022
    ],
    "examSampleRefs": [
      "2022-33-second1-044"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p10 · 국토계획법·개발행위"
  },
  {
    "id": "pub-card-058",
    "subject": "public_law",
    "order": 58,
    "type": "term",
    "category": "국토계획법·개발밀도",
    "title": "개발밀도관리구역",
    "subtitle": "기반시설 부족이 예상되는 지역의 개발밀도를 낮추는 구역",
    "bullets": [
      "건폐율·용적률을 강화해 개발밀도를 관리"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 11,
    "sourceSection": "국토계획법·개발밀도",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 5,
    "examYears": [
      2021,
      2022,
      2023,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-047",
      "2022-33-second1-048",
      "2022-33-second1-050",
      "2023-34-second1-049",
      "2024-35-2-1-051"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p11 · 국토계획법·개발밀도"
  },
  {
    "id": "pub-card-059",
    "subject": "public_law",
    "order": 59,
    "type": "term",
    "category": "국토계획법·개발밀도",
    "title": "기반시설부담구역",
    "subtitle": "개발로 기반시설 수요가 증가하는 지역에 설치비용을 부담시키는 구역",
    "bullets": [
      "기반시설설치비용 부과와 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 11,
    "sourceSection": "국토계획법·개발밀도",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 9,
    "examYears": [
      2021,
      2022,
      2023,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-047",
      "2022-33-second1-042",
      "2022-33-second1-048",
      "2022-33-second1-050",
      "2023-34-second1-041",
      "2023-34-second1-049",
      "2024-35-2-1-041",
      "2024-35-2-1-049",
      "2024-35-2-1-051"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p11 · 국토계획법·개발밀도"
  },
  {
    "id": "pub-card-060",
    "subject": "public_law",
    "order": 60,
    "type": "term",
    "category": "국토계획법·성장관리",
    "title": "성장관리계획구역",
    "subtitle": "난개발 방지와 체계적 관리를 위해 지정하는 구역",
    "bullets": [
      "비시가화지역 등의 계획적 성장관리를 위한 현행 제도"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "성장관리계획구역 지정"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "국토계획법·성장관리",
    "sourceRef": "국가법령정보센터 「국토의 계획 및 이용에 관한 법률 시행령」 제70조의12~제70조의15",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 5,
    "examYears": [
      2021,
      2022,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-048",
      "2022-33-second1-043",
      "2022-33-second1-046",
      "2022-33-second1-050",
      "2024-35-2-1-041"
    ],
    "importance": 4,
    "sourceLabel": "국가법령정보센터 「국토의 계획 및 이용에 관한 법률 시행령」 제70조의12~제70조의15"
  },
  {
    "id": "pub-card-061",
    "subject": "public_law",
    "order": 61,
    "type": "term",
    "category": "국토계획법·성장관리",
    "title": "성장관리계획",
    "subtitle": "성장관리계획구역의 기반시설·건축물·환경·경관 등을 정하는 계획",
    "bullets": [
      "도로·공원, 건축물 용도·건폐율·용적률·배치 등을 정하고 5년마다 타당성을 재검토"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "국토계획법·성장관리",
    "sourceRef": "국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제75조의3",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 6,
    "examYears": [
      2021,
      2022,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-048",
      "2022-33-second1-043",
      "2022-33-second1-046",
      "2022-33-second1-050",
      "2024-35-2-1-041",
      "2024-35-2-1-052"
    ],
    "importance": 4,
    "sourceLabel": "국가법령정보센터 「국토의 계획 및 이용에 관한 법률」 제75조의3"
  },
  {
    "id": "pub-card-062",
    "subject": "public_law",
    "order": 62,
    "type": "term",
    "category": "국토계획법·위원회",
    "title": "도시계획위원회",
    "subtitle": "도시계획 관련 사항을 심의하는 중앙·지방 위원회",
    "bullets": [
      "중앙도시계획위원회와 지방도시계획위원회의 관할을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 18,
    "sourceSection": "국토계획법·위원회",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 15,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-047",
      "2021-32-second1-061",
      "2022-33-second1-042",
      "2022-33-second1-045",
      "2022-33-second1-046",
      "2022-33-second1-051",
      "2023-34-second1-041",
      "2023-34-second1-049",
      "2023-34-second1-073",
      "2024-35-2-1-043"
    ],
    "importance": 5,
    "sourceLabel": "부동산공법 요약집 p18 · 국토계획법·위원회"
  },
  {
    "id": "pub-card-063",
    "subject": "public_law",
    "order": 63,
    "type": "term",
    "category": "국토계획법·토지거래",
    "title": "토지거래허가구역",
    "subtitle": "투기적 거래 억제를 위해 토지거래를 허가제로 운영하는 구역",
    "bullets": [
      "지정권자·지정기간·효력발생·해제를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "토지거래계약 허가구역"
    ],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "국토계획법·토지거래",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p14 · 국토계획법·토지거래"
  },
  {
    "id": "pub-card-064",
    "subject": "public_law",
    "order": 64,
    "type": "term",
    "category": "국토계획법·토지거래",
    "title": "토지거래계약 허가",
    "subtitle": "허가구역의 일정 토지 권리이전·설정 계약에 필요한 허가",
    "bullets": [
      "소유권·지상권 등의 유상계약이 중심이며 증여·상속·경매 등과 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "토지거래허가"
    ],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "국토계획법·토지거래",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p15 · 국토계획법·토지거래"
  },
  {
    "id": "pub-card-065",
    "subject": "public_law",
    "order": 65,
    "type": "term",
    "category": "국토계획법·토지거래",
    "title": "토지거래허가 불허가",
    "subtitle": "이용목적·면적·가격 등 법정 기준에 맞지 않는 거래를 허가하지 않는 것",
    "bullets": [
      "불허가처분에 대한 이의와 매수청구 제도와 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "국토계획법·토지거래",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p15 · 국토계획법·토지거래"
  },
  {
    "id": "pub-card-066",
    "subject": "public_law",
    "order": 66,
    "type": "term",
    "category": "국토계획법·토지거래",
    "title": "허가토지 이용의무",
    "subtitle": "허가받아 취득한 토지를 허가목적대로 이용해야 하는 의무",
    "bullets": [
      "위반 시 이행명령·이행강제금이 문제됨"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 16,
    "sourceSection": "국토계획법·토지거래",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p16 · 국토계획법·토지거래"
  },
  {
    "id": "pub-card-067",
    "subject": "public_law",
    "order": 67,
    "type": "term",
    "category": "국토계획법·토지거래",
    "title": "토지매수청구",
    "subtitle": "토지거래 불허가 등의 경우 국가·지자체 등에 매수를 청구하는 제도",
    "bullets": [
      "수용과 달리 토지소유자가 법정 요건에서 매수를 요청"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "국토계획법·토지거래",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p17 · 국토계획법·토지거래"
  },
  {
    "id": "pub-card-068",
    "subject": "public_law",
    "order": 68,
    "type": "term",
    "category": "국토계획법·토지거래",
    "title": "토지이용 이행강제금",
    "subtitle": "허가토지 이용의무 불이행에 부과되는 금전적 이행수단",
    "bullets": [
      "이행명령 후 불이행 시 법정 범위에서 반복 부과 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "이행강제금"
    ],
    "sourceKind": "summary",
    "sourcePage": 16,
    "sourceSection": "국토계획법·토지거래",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p16 · 국토계획법·토지거래"
  },
  {
    "id": "pub-card-069",
    "subject": "public_law",
    "order": 69,
    "type": "term",
    "category": "도시개발법·구역",
    "title": "도시개발구역",
    "subtitle": "도시개발사업을 시행하기 위해 지정·고시된 구역",
    "bullets": [
      "도시개발법에 따른 지정·고시로 성립"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 19,
    "sourceSection": "도시개발법·구역",
    "sourceRef": "5.공인중개사요약_공법.pdf p19 + 국가법령정보센터 「도시개발법」 제2조",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 16,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-053",
      "2021-32-second1-054",
      "2021-32-second1-055",
      "2021-32-second1-057",
      "2021-32-second1-058",
      "2022-33-second1-054",
      "2022-33-second1-055",
      "2022-33-second1-056",
      "2023-34-second1-057",
      "2024-35-2-1-053"
    ],
    "importance": 5,
    "sourceLabel": "5.공인중개사요약_공법.pdf p19 + 국가법령정보센터 「도시개발법」 제2조"
  },
  {
    "id": "pub-card-070",
    "subject": "public_law",
    "order": 70,
    "type": "term",
    "category": "도시개발법·구역",
    "title": "도시개발사업",
    "subtitle": "도시개발구역에서 주거·상업·산업 등 기능의 단지·시가지를 조성하는 사업",
    "bullets": [
      "계획적·체계적 도시개발을 위한 사업"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 19,
    "sourceSection": "도시개발법·구역",
    "sourceRef": "5.공인중개사요약_공법.pdf p19 + 국가법령정보센터 「도시개발법」 제2조",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 22,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-054",
      "2021-32-second1-055",
      "2021-32-second1-056",
      "2022-33-second1-053",
      "2022-33-second1-054",
      "2022-33-second1-055",
      "2022-33-second1-056",
      "2022-33-second1-057",
      "2022-33-second1-058",
      "2023-34-second1-053"
    ],
    "importance": 5,
    "sourceLabel": "5.공인중개사요약_공법.pdf p19 + 국가법령정보센터 「도시개발법」 제2조"
  },
  {
    "id": "pub-card-071",
    "subject": "public_law",
    "order": 71,
    "type": "term",
    "category": "도시개발법·구역",
    "title": "도시개발구역 지정권자",
    "subtitle": "시도지사·대도시시장·국토교통부장관 등 법정 지정권자",
    "bullets": [
      "지역·사업 성격에 따라 지정권자를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 19,
    "sourceSection": "도시개발법·구역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-055",
      "2021-32-second1-058"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p19 · 도시개발법·구역"
  },
  {
    "id": "pub-card-072",
    "subject": "public_law",
    "order": 72,
    "type": "term",
    "category": "도시개발법·구역",
    "title": "도시개발구역 지정제안",
    "subtitle": "법정 시행예정자 등이 구역 지정을 제안하는 제도",
    "bullets": [
      "토지소유자·공공기관 등 법정 주체가 지정 제안 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "지정제안"
    ],
    "sourceKind": "summary",
    "sourcePage": 19,
    "sourceSection": "도시개발법·구역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p19 · 도시개발법·구역"
  },
  {
    "id": "pub-card-073",
    "subject": "public_law",
    "order": 73,
    "type": "term",
    "category": "도시개발법·구역",
    "title": "도시개발구역 지정규모",
    "subtitle": "용도지역·도시지역 여부에 따른 최소 지정면적 기준",
    "bullets": [
      "주거·상업·공업·녹지와 도시지역 외 최소면적을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 19,
    "sourceSection": "도시개발법·구역",
    "sourceRef": "5.공인중개사요약_공법.pdf p19 + 국가법령정보센터 「도시개발법 시행령」 제2조",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "5.공인중개사요약_공법.pdf p19 + 국가법령정보센터 「도시개발법 시행령」 제2조"
  },
  {
    "id": "pub-card-074",
    "subject": "public_law",
    "order": 74,
    "type": "term",
    "category": "도시개발법·구역",
    "title": "도시개발 주민의견청취",
    "subtitle": "구역 지정 또는 개발계획 수립 전 주민 의견을 듣는 절차",
    "bullets": [
      "공람·공고를 통한 의견청취와 경미한 변경 예외를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 20,
    "sourceSection": "도시개발법·구역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p20 · 도시개발법·구역"
  },
  {
    "id": "pub-card-075",
    "subject": "public_law",
    "order": 75,
    "type": "term",
    "category": "도시개발법·구역",
    "title": "도시개발 개발계획",
    "subtitle": "시행방식·토지이용·기반시설 등을 정하는 도시개발의 기본계획",
    "bullets": [
      "원칙적으로 구역 지정 전 수립하고 법정 예외에는 지정 후 수립 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 20,
    "sourceSection": "도시개발법·구역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p20 · 도시개발법·구역"
  },
  {
    "id": "pub-card-076",
    "subject": "public_law",
    "order": 76,
    "type": "term",
    "category": "도시개발법·구역",
    "title": "도시개발구역 행위허가",
    "subtitle": "구역 지정 후 건축·대수선·용도변경·형질변경 등에 필요한 허가",
    "bullets": [
      "법정 행위는 관할 행정청 허가 대상"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "행위허가"
    ],
    "sourceKind": "summary+official",
    "sourcePage": 20,
    "sourceSection": "도시개발법·구역",
    "sourceRef": "5.공인중개사요약_공법.pdf p20 + 국가법령정보센터 「도시개발법 시행령」 제16조",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 9,
    "examYears": [
      2021,
      2022,
      2023,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-046",
      "2022-33-second1-042",
      "2022-33-second1-044",
      "2022-33-second1-048",
      "2022-33-second1-078",
      "2023-34-second1-041",
      "2023-34-second1-042",
      "2024-35-2-1-047",
      "2024-35-2-1-049"
    ],
    "importance": 4,
    "sourceLabel": "5.공인중개사요약_공법.pdf p20 + 국가법령정보센터 「도시개발법 시행령」 제16조"
  },
  {
    "id": "pub-card-077",
    "subject": "public_law",
    "order": 77,
    "type": "term",
    "category": "도시개발법·시행자",
    "title": "도시개발사업 시행자",
    "subtitle": "국가·지자체·공공기관·토지소유자·조합 등 법정 시행주체",
    "bullets": [
      "시행방식에 따라 지정 가능한 자를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 21,
    "sourceSection": "도시개발법·시행자",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2022
    ],
    "examSampleRefs": [
      "2022-33-second1-057"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p21 · 도시개발법·시행자"
  },
  {
    "id": "pub-card-078",
    "subject": "public_law",
    "order": 78,
    "type": "term",
    "category": "도시개발법·시행자",
    "title": "도시개발 시행자 변경",
    "subtitle": "착수 지연·부도·인가취소 등에서 시행자를 변경하는 제도",
    "bullets": [
      "사업 목적 달성이 곤란한 법정 경우에 시행자 변경 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 21,
    "sourceSection": "도시개발법·시행자",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p21 · 도시개발법·시행자"
  },
  {
    "id": "pub-card-079",
    "subject": "public_law",
    "order": 79,
    "type": "term",
    "category": "도시개발법·조합",
    "title": "도시개발조합",
    "subtitle": "환지방식 사업을 위해 토지소유자들이 설립하는 법인",
    "bullets": [
      "토지소유자 7명 이상이 정관을 작성해 설립인가를 받음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "도시개발사업 조합"
    ],
    "sourceKind": "summary",
    "sourcePage": 21,
    "sourceSection": "도시개발법·조합",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 4,
    "examYears": [
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2022-33-second1-056",
      "2023-34-second1-055",
      "2024-35-2-1-057",
      "2025-36-second1-055"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p21 · 도시개발법·조합"
  },
  {
    "id": "pub-card-080",
    "subject": "public_law",
    "order": 80,
    "type": "term",
    "category": "도시개발법·조합",
    "title": "도시개발조합 설립인가",
    "subtitle": "도시개발조합 성립을 위한 지정권자의 인가",
    "bullets": [
      "토지면적과 토지소유자 수의 법정 동의요건을 충족"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 21,
    "sourceSection": "도시개발법·조합",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p21 · 도시개발법·조합"
  },
  {
    "id": "pub-card-081",
    "subject": "public_law",
    "order": 81,
    "type": "term",
    "category": "도시개발법·실시계획",
    "title": "도시개발 실시계획",
    "subtitle": "개발계획을 구체화한 사업시행 계획",
    "bullets": [
      "지정권자의 인가·고시를 거쳐 시행"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 21,
    "sourceSection": "도시개발법·실시계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p21 · 도시개발법·실시계획"
  },
  {
    "id": "pub-card-082",
    "subject": "public_law",
    "order": 82,
    "type": "term",
    "category": "도시개발법·시행방식",
    "title": "도시개발사업 시행방식",
    "subtitle": "수용·사용, 환지, 혼용 방식으로 사업을 시행",
    "bullets": [
      "사업특성에 따라 방식 선택·변경 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 22,
    "sourceSection": "도시개발법·시행방식",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p22 · 도시개발법·시행방식"
  },
  {
    "id": "pub-card-083",
    "subject": "public_law",
    "order": 83,
    "type": "term",
    "category": "도시개발법·수용방식",
    "title": "수용·사용방식",
    "subtitle": "토지를 수용·사용해 도시개발사업을 시행하는 방식",
    "bullets": [
      "공공성·시행자 자격과 수용권 행사요건이 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 22,
    "sourceSection": "도시개발법·수용방식",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p22 · 도시개발법·수용방식"
  },
  {
    "id": "pub-card-084",
    "subject": "public_law",
    "order": 84,
    "type": "term",
    "category": "도시개발법·수용방식",
    "title": "토지상환채권",
    "subtitle": "토지보상금 일부를 토지로 상환하기 위해 발행하는 채권",
    "bullets": [
      "발행자·발행계획 승인·상환방식을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 22,
    "sourceSection": "도시개발법·수용방식",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 4,
    "examYears": [
      2021,
      2022,
      2023,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-054",
      "2022-33-second1-053",
      "2023-34-second1-056",
      "2024-35-2-1-055"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p22 · 도시개발법·수용방식"
  },
  {
    "id": "pub-card-085",
    "subject": "public_law",
    "order": 85,
    "type": "term",
    "category": "도시개발법·수용방식",
    "title": "이주대책",
    "subtitle": "수용 등으로 생활근거를 잃는 자를 위한 이주 지원대책",
    "bullets": [
      "공익사업 보상법상 이주대책과 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 22,
    "sourceSection": "도시개발법·수용방식",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-071"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p22 · 도시개발법·수용방식"
  },
  {
    "id": "pub-card-086",
    "subject": "public_law",
    "order": 86,
    "type": "term",
    "category": "도시개발법·환지",
    "title": "환지방식",
    "subtitle": "토지의 교환·분합 등으로 사업 후 새 토지를 배분하는 방식",
    "bullets": [
      "토지 자체로 사업비와 권리를 조정"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 22,
    "sourceSection": "도시개발법·환지",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2022
    ],
    "examSampleRefs": [
      "2022-33-second1-058"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p22 · 도시개발법·환지"
  },
  {
    "id": "pub-card-087",
    "subject": "public_law",
    "order": 87,
    "type": "term",
    "category": "도시개발법·환지",
    "title": "환지계획",
    "subtitle": "환지 위치·면적·청산금·체비지 등을 정하는 계획",
    "bullets": [
      "환지방식 사업의 핵심 계획"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 22,
    "sourceSection": "도시개발법·환지",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p22 · 도시개발법·환지"
  },
  {
    "id": "pub-card-088",
    "subject": "public_law",
    "order": 88,
    "type": "term",
    "category": "도시개발법·환지",
    "title": "환지설계",
    "subtitle": "종전 토지와 환지의 위치·면적·가치 관계를 정하는 작업",
    "bullets": [
      "평가식·면적식 등 설계 기준과 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 22,
    "sourceSection": "도시개발법·환지",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p22 · 도시개발법·환지"
  },
  {
    "id": "pub-card-089",
    "subject": "public_law",
    "order": 89,
    "type": "term",
    "category": "도시개발법·환지",
    "title": "환지예정지",
    "subtitle": "환지처분 전 임시로 사용·수익할 토지를 지정하는 제도",
    "bullets": [
      "지정 후 종전 토지의 사용수익이 제한되고 예정지를 사용·수익"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 23,
    "sourceSection": "도시개발법·환지",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p23 · 도시개발법·환지"
  },
  {
    "id": "pub-card-090",
    "subject": "public_law",
    "order": 90,
    "type": "term",
    "category": "도시개발법·환지",
    "title": "체비지",
    "subtitle": "사업경비 충당 등을 위해 시행자가 취득·처분하도록 정한 토지",
    "bullets": [
      "환지계획에서 정하며 보류지의 한 유형"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 23,
    "sourceSection": "도시개발법·환지",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2025
    ],
    "examSampleRefs": [
      "2025-36-second1-056",
      "2025-36-second1-057"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p23 · 도시개발법·환지"
  },
  {
    "id": "pub-card-091",
    "subject": "public_law",
    "order": 91,
    "type": "term",
    "category": "도시개발법·환지",
    "title": "보류지",
    "subtitle": "공공시설·체비지 등 특정 목적을 위해 환지에서 보류하는 토지",
    "bullets": [
      "체비지를 포함하는 상위 개념"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 23,
    "sourceSection": "도시개발법·환지",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p23 · 도시개발법·환지"
  },
  {
    "id": "pub-card-092",
    "subject": "public_law",
    "order": 92,
    "type": "term",
    "category": "도시개발법·환지",
    "title": "환지처분",
    "subtitle": "공사 완료 후 환지계획대로 권리관계를 확정하는 처분",
    "bullets": [
      "공고 다음 날부터 환지의 권리변동 효과가 발생"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 23,
    "sourceSection": "도시개발법·환지",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 6,
    "examYears": [
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2022-33-second1-054",
      "2023-34-second1-058",
      "2024-35-2-1-056",
      "2025-36-second1-053",
      "2025-36-second1-056",
      "2025-36-second1-057"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p23 · 도시개발법·환지"
  },
  {
    "id": "pub-card-093",
    "subject": "public_law",
    "order": 93,
    "type": "term",
    "category": "도시개발법·환지",
    "title": "청산금",
    "subtitle": "종전 토지와 환지 가치 차이를 금전으로 정산하는 금액",
    "bullets": [
      "징수·교부와 소멸시효 등이 문제됨"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 23,
    "sourceSection": "도시개발법·환지",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2021,
      2023
    ],
    "examSampleRefs": [
      "2021-32-second1-064",
      "2023-34-second1-058",
      "2023-34-second1-061"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p23 · 도시개발법·환지"
  },
  {
    "id": "pub-card-094",
    "subject": "public_law",
    "order": 94,
    "type": "term",
    "category": "도시개발법·재원",
    "title": "도시개발채권",
    "subtitle": "도시개발사업 재원 마련을 위해 발행하는 채권",
    "bullets": [
      "채권 매입의무·발행·상환을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 23,
    "sourceSection": "도시개발법·재원",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2021,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-056",
      "2025-36-second1-058"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p23 · 도시개발법·재원"
  },
  {
    "id": "pub-card-095",
    "subject": "public_law",
    "order": 95,
    "type": "term",
    "category": "도시정비법·총칙",
    "title": "정비사업",
    "subtitle": "도시기능 회복과 노후·불량건축물 정비를 위한 법정 사업",
    "bullets": [
      "주거환경개선·재개발·재건축사업 등이 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 24,
    "sourceSection": "도시정비법·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 18,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-059",
      "2021-32-second1-060",
      "2021-32-second1-063",
      "2021-32-second1-064",
      "2022-33-second1-060",
      "2022-33-second1-062",
      "2022-33-second1-063",
      "2022-33-second1-064",
      "2023-34-second1-042",
      "2023-34-second1-048"
    ],
    "importance": 5,
    "sourceLabel": "부동산공법 요약집 p24 · 도시정비법·총칙"
  },
  {
    "id": "pub-card-096",
    "subject": "public_law",
    "order": 96,
    "type": "term",
    "category": "도시정비법·사업유형",
    "title": "주거환경개선사업",
    "subtitle": "저소득 주민 집단거주·정비기반시설 열악 지역 등을 개선하는 사업",
    "bullets": [
      "공공성이 강한 정비사업"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 24,
    "sourceSection": "도시정비법·사업유형",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 6,
    "examYears": [
      2021,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-059",
      "2021-32-second1-063",
      "2023-34-second1-059",
      "2024-35-2-1-059",
      "2024-35-2-1-061",
      "2025-36-second1-063"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p24 · 도시정비법·사업유형"
  },
  {
    "id": "pub-card-097",
    "subject": "public_law",
    "order": 97,
    "type": "term",
    "category": "도시정비법·사업유형",
    "title": "재개발사업",
    "subtitle": "정비기반시설이 열악하고 노후·불량건축물이 밀집한 지역을 개선하는 사업",
    "bullets": [
      "토지등소유자와 정비기반시설 상태가 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 24,
    "sourceSection": "도시정비법·사업유형",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 7,
    "examYears": [
      2021,
      2023,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-059",
      "2021-32-second1-061",
      "2021-32-second1-063",
      "2023-34-second1-060",
      "2024-35-2-1-059",
      "2024-35-2-1-061",
      "2024-35-2-1-062"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p24 · 도시정비법·사업유형"
  },
  {
    "id": "pub-card-098",
    "subject": "public_law",
    "order": 98,
    "type": "term",
    "category": "도시정비법·사업유형",
    "title": "재건축사업",
    "subtitle": "정비기반시설은 양호하나 노후·불량 공동주택 등을 재건축하는 사업",
    "bullets": [
      "조합설립·매도청구 등과 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 24,
    "sourceSection": "도시정비법·사업유형",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 5,
    "examYears": [
      2021,
      2022,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-059",
      "2021-32-second1-063",
      "2022-33-second1-062",
      "2024-35-2-1-059",
      "2024-35-2-1-061"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p24 · 도시정비법·사업유형"
  },
  {
    "id": "pub-card-099",
    "subject": "public_law",
    "order": 99,
    "type": "term",
    "category": "도시정비법·총칙",
    "title": "정비기반시설",
    "subtitle": "도로·상하수도·공원·공용주차장 등 정비사업의 기반시설",
    "bullets": [
      "정비사업에서 설치·정비하는 주요 공공시설"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 24,
    "sourceSection": "도시정비법·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2021,
      2023
    ],
    "examSampleRefs": [
      "2021-32-second1-059",
      "2023-34-second1-059"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p24 · 도시정비법·총칙"
  },
  {
    "id": "pub-card-100",
    "subject": "public_law",
    "order": 100,
    "type": "term",
    "category": "도시정비법·총칙",
    "title": "노후·불량건축물",
    "subtitle": "정비사업 대상 판단의 기초가 되는 노후·불량 상태의 건축물",
    "bullets": [
      "구조·기능·도시미관·주거환경 측면에서 판단"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 24,
    "sourceSection": "도시정비법·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p24 · 도시정비법·총칙"
  },
  {
    "id": "pub-card-101",
    "subject": "public_law",
    "order": 101,
    "type": "term",
    "category": "도시정비법·총칙",
    "title": "토지등소유자",
    "subtitle": "정비사업에서 토지·건축물 권리를 가진 법정 이해관계인",
    "bullets": [
      "사업유형별 토지등소유자 범위가 다름"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 24,
    "sourceSection": "도시정비법·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 12,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-063",
      "2022-33-second1-060",
      "2022-33-second1-061",
      "2022-33-second1-062",
      "2022-33-second1-063",
      "2023-34-second1-060",
      "2024-35-2-1-059",
      "2024-35-2-1-062",
      "2024-35-2-1-064",
      "2025-36-second1-060"
    ],
    "importance": 5,
    "sourceLabel": "부동산공법 요약집 p24 · 도시정비법·총칙"
  },
  {
    "id": "pub-card-102",
    "subject": "public_law",
    "order": 102,
    "type": "term",
    "category": "도시정비법·계획",
    "title": "도시·주거환경정비기본계획",
    "subtitle": "정비사업의 장기적 방향을 제시하는 기본계획",
    "bullets": [
      "정비계획 수립의 상위 지침"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "정비기본계획",
      "기본계획"
    ],
    "sourceKind": "summary",
    "sourcePage": 26,
    "sourceSection": "도시정비법·계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 9,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-042",
      "2021-32-second1-049",
      "2022-33-second1-051",
      "2023-34-second1-071",
      "2024-35-2-1-041",
      "2024-35-2-1-042",
      "2024-35-2-1-043",
      "2024-35-2-1-048",
      "2025-36-second1-059"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p26 · 도시정비법·계획"
  },
  {
    "id": "pub-card-103",
    "subject": "public_law",
    "order": 103,
    "type": "term",
    "category": "도시정비법·계획",
    "title": "정비계획",
    "subtitle": "정비구역 지정과 사업내용을 구체화하는 계획",
    "bullets": [
      "정비구역·용도지역·정비기반시설·건축계획 등을 포함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 26,
    "sourceSection": "도시정비법·계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 5,
    "examYears": [
      2021,
      2022,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-042",
      "2021-32-second1-061",
      "2022-33-second1-062",
      "2022-33-second1-064",
      "2024-35-2-1-060"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p26 · 도시정비법·계획"
  },
  {
    "id": "pub-card-104",
    "subject": "public_law",
    "order": 104,
    "type": "term",
    "category": "도시정비법·계획",
    "title": "정비구역",
    "subtitle": "정비사업을 계획적으로 시행하기 위해 지정·고시한 구역",
    "bullets": [
      "정비계획과 함께 지정"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 26,
    "sourceSection": "도시정비법·계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 11,
    "examYears": [
      2021,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-061",
      "2021-32-second1-062",
      "2021-32-second1-064",
      "2023-34-second1-059",
      "2023-34-second1-061",
      "2023-34-second1-064",
      "2024-35-2-1-059",
      "2024-35-2-1-061",
      "2025-36-second1-060",
      "2025-36-second1-063"
    ],
    "importance": 5,
    "sourceLabel": "부동산공법 요약집 p26 · 도시정비법·계획"
  },
  {
    "id": "pub-card-105",
    "subject": "public_law",
    "order": 105,
    "type": "term",
    "category": "도시정비법·계획",
    "title": "정비구역 해제",
    "subtitle": "사업 필요성이 사라지거나 장기간 추진되지 않는 정비구역을 해제하는 제도",
    "bullets": [
      "직권해제·일몰제·주민요청 등 법정 요건을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 26,
    "sourceSection": "도시정비법·계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p26 · 도시정비법·계획"
  },
  {
    "id": "pub-card-106",
    "subject": "public_law",
    "order": 106,
    "type": "term",
    "category": "도시정비법·공공정비",
    "title": "공공재개발사업",
    "subtitle": "공공기관 참여를 통해 공공성을 높인 재개발사업",
    "bullets": [
      "공공시행자 참여와 특례가 적용되는 재개발 유형"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "공공재개발"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "도시정비법·공공정비",
    "sourceRef": "국가법령정보센터 「도시 및 주거환경정비법」 공공재개발 관련 조문",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 2,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-059",
      "2021-32-second1-061"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「도시 및 주거환경정비법」 공공재개발 관련 조문"
  },
  {
    "id": "pub-card-107",
    "subject": "public_law",
    "order": 107,
    "type": "term",
    "category": "도시정비법·공공정비",
    "title": "공공재건축사업",
    "subtitle": "공공기관 참여를 통해 공공성을 높인 재건축사업",
    "bullets": [
      "공공시행자 참여와 법정 특례가 적용될 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "공공재건축"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "도시정비법·공공정비",
    "sourceRef": "국가법령정보센터 「도시 및 주거환경정비법」 공공재건축 관련 조문",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 1,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-059"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「도시 및 주거환경정비법」 공공재건축 관련 조문"
  },
  {
    "id": "pub-card-108",
    "subject": "public_law",
    "order": 108,
    "type": "term",
    "category": "도시정비법·조합",
    "title": "조합설립추진위원회",
    "subtitle": "조합설립 준비를 위해 토지등소유자 동의로 구성하는 기구",
    "bullets": [
      "시장·군수 승인을 받고 조합설립 업무를 추진"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "추진위원회"
    ],
    "sourceKind": "summary",
    "sourcePage": 28,
    "sourceSection": "도시정비법·조합",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2021,
      2022,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-063",
      "2022-33-second1-062",
      "2024-35-2-1-062"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p28 · 도시정비법·조합"
  },
  {
    "id": "pub-card-109",
    "subject": "public_law",
    "order": 109,
    "type": "term",
    "category": "도시정비법·조합",
    "title": "조합설립인가",
    "subtitle": "정비사업 조합을 성립시키는 시장·군수 등의 인가",
    "bullets": [
      "사업유형별 법정 동의요건을 충족"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 28,
    "sourceSection": "도시정비법·조합",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2021,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-063",
      "2024-35-2-1-062"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p28 · 도시정비법·조합"
  },
  {
    "id": "pub-card-110",
    "subject": "public_law",
    "order": 110,
    "type": "term",
    "category": "도시정비법·조합",
    "title": "정비사업조합",
    "subtitle": "조합설립인가와 등기로 성립하는 법인",
    "bullets": [
      "임원·총회·대의원회 체계로 운영"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "조합"
    ],
    "sourceKind": "summary",
    "sourcePage": 28,
    "sourceSection": "도시정비법·조합",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 25,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-060",
      "2021-32-second1-062",
      "2021-32-second1-063",
      "2021-32-second1-070",
      "2021-32-second1-071",
      "2022-33-second1-056",
      "2022-33-second1-060",
      "2022-33-second1-062",
      "2022-33-second1-068",
      "2022-33-second1-070"
    ],
    "importance": 5,
    "sourceLabel": "부동산공법 요약집 p28 · 도시정비법·조합"
  },
  {
    "id": "pub-card-111",
    "subject": "public_law",
    "order": 111,
    "type": "term",
    "category": "도시정비법·조합",
    "title": "조합임원",
    "subtitle": "조합장·이사·감사 등 조합의 집행기관",
    "bullets": [
      "선임·결격·직무·해임이 기출 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 28,
    "sourceSection": "도시정비법·조합",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 5,
    "examYears": [
      2021,
      2022,
      2023,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-060",
      "2022-33-second1-060",
      "2023-34-second1-063",
      "2025-36-second1-064",
      "2025-36-second1-068"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p28 · 도시정비법·조합"
  },
  {
    "id": "pub-card-112",
    "subject": "public_law",
    "order": 112,
    "type": "term",
    "category": "도시정비법·공공시행",
    "title": "주민대표회의",
    "subtitle": "공공시행 방식에서 토지등소유자의 의견을 대표하는 주민기구",
    "bullets": [
      "시장·군수 또는 공공기관 시행 시 일정 요건에서 구성"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 29,
    "sourceSection": "도시정비법·공공시행",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2021,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-063",
      "2025-36-second1-062"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p29 · 도시정비법·공공시행"
  },
  {
    "id": "pub-card-113",
    "subject": "public_law",
    "order": 113,
    "type": "term",
    "category": "도시정비법·사업시행",
    "title": "사업시행계획",
    "subtitle": "정비사업의 건축·정비기반시설·이주·철거 등을 구체화한 계획",
    "bullets": [
      "사업시행계획인가 후 실제 사업집행으로 이어짐"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 29,
    "sourceSection": "도시정비법·사업시행",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 4,
    "examYears": [
      2022,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2022-33-second1-062",
      "2024-35-2-1-062",
      "2024-35-2-1-063",
      "2025-36-second1-061"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p29 · 도시정비법·사업시행"
  },
  {
    "id": "pub-card-114",
    "subject": "public_law",
    "order": 114,
    "type": "term",
    "category": "도시정비법·사업시행",
    "title": "사업시행계획인가",
    "subtitle": "정비사업 사업시행계획에 대한 시장·군수 등의 인가",
    "bullets": [
      "인가고시 후 관계 인허가 의제와 분양절차로 이어짐"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 29,
    "sourceSection": "도시정비법·사업시행",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2024,
      2025
    ],
    "examSampleRefs": [
      "2024-35-2-1-062",
      "2025-36-second1-061"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p29 · 도시정비법·사업시행"
  },
  {
    "id": "pub-card-115",
    "subject": "public_law",
    "order": 115,
    "type": "term",
    "category": "도시정비법·사업시행",
    "title": "사업시행계획 통합심의",
    "subtitle": "건축·교통·환경 등 관련 심의를 통합해 처리하는 제도",
    "bullets": [
      "정비사업 인허가 기간 단축을 위한 현행 통합심의"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "통합심의"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "도시정비법·사업시행",
    "sourceRef": "국가법령정보센터 「도시 및 주거환경정비법」 사업시행계획 통합심의 관련 조문",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 1,
    "examYears": [
      2024
    ],
    "examSampleRefs": [
      "2024-35-2-1-063"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「도시 및 주거환경정비법」 사업시행계획 통합심의 관련 조문"
  },
  {
    "id": "pub-card-116",
    "subject": "public_law",
    "order": 116,
    "type": "term",
    "category": "도시정비법·관리처분",
    "title": "관리처분계획",
    "subtitle": "분양대상·권리가액·분담금·청산 등을 정하는 권리배분 계획",
    "bullets": [
      "종전 권리를 새 건축물에 배분하는 핵심 계획"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 30,
    "sourceSection": "도시정비법·관리처분",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 5,
    "examYears": [
      2021,
      2022,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-062",
      "2022-33-second1-061",
      "2024-35-2-1-061",
      "2024-35-2-1-064",
      "2025-36-second1-060"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p30 · 도시정비법·관리처분"
  },
  {
    "id": "pub-card-117",
    "subject": "public_law",
    "order": 117,
    "type": "term",
    "category": "도시정비법·관리처분",
    "title": "분양신청",
    "subtitle": "토지등소유자가 정비사업으로 공급되는 건축물 분양을 신청하는 절차",
    "bullets": [
      "사업시행인가 고시 후 법정 기간 내 신청"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 30,
    "sourceSection": "도시정비법·관리처분",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 4,
    "examYears": [
      2021,
      2022,
      2023,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-062",
      "2022-33-second1-061",
      "2023-34-second1-060",
      "2024-35-2-1-064"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p30 · 도시정비법·관리처분"
  },
  {
    "id": "pub-card-118",
    "subject": "public_law",
    "order": 118,
    "type": "term",
    "category": "도시정비법·관리처분",
    "title": "분양신청 미신청자 조치",
    "subtitle": "분양신청을 하지 않거나 철회·제외된 자에 대한 보상절차",
    "bullets": [
      "손실보상 협의 후 수용재결 또는 매도청구로 진행"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "현금청산"
    ],
    "sourceKind": "summary",
    "sourcePage": 30,
    "sourceSection": "도시정비법·관리처분",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p30 · 도시정비법·관리처분"
  },
  {
    "id": "pub-card-119",
    "subject": "public_law",
    "order": 119,
    "type": "term",
    "category": "도시정비법·사업시행",
    "title": "임시거주시설",
    "subtitle": "정비사업으로 철거되는 주택의 소유자·세입자에게 제공하는 임시 거주대책",
    "bullets": [
      "법정 정비사업에서 설치·알선"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 29,
    "sourceSection": "도시정비법·사업시행",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2025
    ],
    "examSampleRefs": [
      "2025-36-second1-063"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p29 · 도시정비법·사업시행"
  },
  {
    "id": "pub-card-120",
    "subject": "public_law",
    "order": 120,
    "type": "term",
    "category": "도시정비법·전문관리",
    "title": "정비사업전문관리업",
    "subtitle": "정비사업 업무를 지원·자문하는 등록업",
    "bullets": [
      "자본·기술인력 등 요건을 갖춰 시도지사에게 등록"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 31,
    "sourceSection": "도시정비법·전문관리",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2021,
      2022
    ],
    "examSampleRefs": [
      "2021-32-second1-060",
      "2022-33-second1-062"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p31 · 도시정비법·전문관리"
  },
  {
    "id": "pub-card-121",
    "subject": "public_law",
    "order": 121,
    "type": "term",
    "category": "건축법·총칙",
    "title": "건축물",
    "subtitle": "토지에 정착하는 공작물 중 지붕과 기둥 또는 벽이 있는 것 등",
    "bullets": [
      "부속시설과 지하·고가 공작물의 사무소·점포 등도 법정 범위에 포함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 32,
    "sourceSection": "건축법·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 63,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-045",
      "2021-32-second1-055",
      "2021-32-second1-057",
      "2021-32-second1-059",
      "2021-32-second1-062",
      "2021-32-second1-072",
      "2021-32-second1-073",
      "2021-32-second1-074",
      "2021-32-second1-075",
      "2021-32-second1-076"
    ],
    "importance": 5,
    "sourceLabel": "부동산공법 요약집 p32 · 건축법·총칙"
  },
  {
    "id": "pub-card-122",
    "subject": "public_law",
    "order": 122,
    "type": "term",
    "category": "건축법·총칙",
    "title": "대지",
    "subtitle": "건축물이 건축되거나 건축될 토지의 법정 단위",
    "bullets": [
      "원칙적으로 하나의 필지를 하나의 대지로 봄"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 32,
    "sourceSection": "건축법·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 21,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-072",
      "2021-32-second1-073",
      "2021-32-second1-076",
      "2022-33-second1-049",
      "2022-33-second1-073",
      "2022-33-second1-076",
      "2023-34-second1-072",
      "2023-34-second1-073",
      "2023-34-second1-077",
      "2023-34-second1-078"
    ],
    "importance": 5,
    "sourceLabel": "부동산공법 요약집 p32 · 건축법·총칙"
  },
  {
    "id": "pub-card-123",
    "subject": "public_law",
    "order": 123,
    "type": "term",
    "category": "건축법·총칙",
    "title": "건축설비",
    "subtitle": "건축물에 설치하는 전기·가스·급수·배수·환기·승강기 등 설비",
    "bullets": [
      "건축물 기능·안전을 지원하는 설비"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 32,
    "sourceSection": "건축법·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-067"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p32 · 건축법·총칙"
  },
  {
    "id": "pub-card-124",
    "subject": "public_law",
    "order": 124,
    "type": "term",
    "category": "건축법·행위",
    "title": "건축",
    "subtitle": "건축물을 신축·증축·개축·재축하거나 이전하는 것",
    "bullets": [
      "다섯 건축행위의 차이를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 32,
    "sourceSection": "건축법·행위",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 76,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-045",
      "2021-32-second1-047",
      "2021-32-second1-055",
      "2021-32-second1-057",
      "2021-32-second1-059",
      "2021-32-second1-062",
      "2021-32-second1-063",
      "2021-32-second1-067",
      "2021-32-second1-068",
      "2021-32-second1-072"
    ],
    "importance": 5,
    "sourceLabel": "부동산공법 요약집 p32 · 건축법·행위"
  },
  {
    "id": "pub-card-125",
    "subject": "public_law",
    "order": 125,
    "type": "term",
    "category": "건축법·행위",
    "title": "신축",
    "subtitle": "건축물이 없는 대지에 새로 건축물을 축조하는 것",
    "bullets": [
      "철거·멸실 후 새로 축조하는 경우 등 포함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 32,
    "sourceSection": "건축법·행위",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2024,
      2025
    ],
    "examSampleRefs": [
      "2024-35-2-1-049",
      "2025-36-second1-049"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p32 · 건축법·행위"
  },
  {
    "id": "pub-card-126",
    "subject": "public_law",
    "order": 126,
    "type": "term",
    "category": "건축법·행위",
    "title": "증축",
    "subtitle": "기존 건축물의 건축면적·연면적·층수 또는 높이를 늘리는 것",
    "bullets": [
      "기존 건축물이 있는 상태에서 규모가 증가"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 32,
    "sourceSection": "건축법·행위",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 6,
    "examYears": [
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2022-33-second1-047",
      "2023-34-second1-071",
      "2024-35-2-1-067",
      "2024-35-2-1-072",
      "2025-36-second1-049",
      "2025-36-second1-077"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p32 · 건축법·행위"
  },
  {
    "id": "pub-card-127",
    "subject": "public_law",
    "order": 127,
    "type": "term",
    "category": "건축법·행위",
    "title": "개축",
    "subtitle": "기존 건축물 전부·일부를 철거하고 종전 규모 범위에서 다시 축조",
    "bullets": [
      "자발적 철거 후 재축조라는 점이 재축과 다름"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 32,
    "sourceSection": "건축법·행위",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2024
    ],
    "examSampleRefs": [
      "2024-35-2-1-072"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p32 · 건축법·행위"
  },
  {
    "id": "pub-card-128",
    "subject": "public_law",
    "order": 128,
    "type": "term",
    "category": "건축법·행위",
    "title": "재축",
    "subtitle": "재해 등으로 멸실된 건축물을 종전 규모 범위에서 다시 축조",
    "bullets": [
      "자발적 철거가 아닌 멸실을 전제로 함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 32,
    "sourceSection": "건축법·행위",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2024
    ],
    "examSampleRefs": [
      "2024-35-2-1-072"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p32 · 건축법·행위"
  },
  {
    "id": "pub-card-129",
    "subject": "public_law",
    "order": 129,
    "type": "term",
    "category": "건축법·행위",
    "title": "이전",
    "subtitle": "주요구조부를 해체하지 않고 같은 대지의 다른 위치로 옮기는 것",
    "bullets": [
      "건축의 한 종류"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 32,
    "sourceSection": "건축법·행위",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 5,
    "examYears": [
      2021,
      2022,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-064",
      "2022-33-second1-053",
      "2024-35-2-1-057",
      "2025-36-second1-057",
      "2025-36-second1-060"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p32 · 건축법·행위"
  },
  {
    "id": "pub-card-130",
    "subject": "public_law",
    "order": 130,
    "type": "term",
    "category": "건축법·행위",
    "title": "대수선",
    "subtitle": "주요구조부·외부형태 등을 수선·변경하거나 증설하는 행위",
    "bullets": [
      "증축·개축·재축에 해당하지 않는 구조적 변경"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 32,
    "sourceSection": "건축법·행위",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 4,
    "examYears": [
      2021,
      2022,
      2023,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-075",
      "2022-33-second1-070",
      "2023-34-second1-071",
      "2024-35-2-1-072"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p32 · 건축법·행위"
  },
  {
    "id": "pub-card-131",
    "subject": "public_law",
    "order": 131,
    "type": "term",
    "category": "건축법·행위",
    "title": "용도변경",
    "subtitle": "건축물 용도를 다른 용도군으로 바꾸어 사용하는 것",
    "bullets": [
      "허가·신고·건축물대장 기재변경 여부를 용도군에 따라 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 32,
    "sourceSection": "건축법·행위",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2023
    ],
    "examSampleRefs": [
      "2023-34-second1-074"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p32 · 건축법·행위"
  },
  {
    "id": "pub-card-132",
    "subject": "public_law",
    "order": 132,
    "type": "term",
    "category": "건축법·용어",
    "title": "건축주",
    "subtitle": "건축물의 건축·대수선 등을 발주하거나 직접 시행하는 자",
    "bullets": [
      "건축허가·신고의 신청주체"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 34,
    "sourceSection": "건축법·용어",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 4,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-072",
      "2021-32-second1-073",
      "2021-32-second1-075",
      "2021-32-second1-078"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p34 · 건축법·용어"
  },
  {
    "id": "pub-card-133",
    "subject": "public_law",
    "order": 133,
    "type": "term",
    "category": "건축법·용어",
    "title": "건축사",
    "subtitle": "건축물 설계·공사감리 등을 수행하는 자격자",
    "bullets": [
      "일정 건축물의 설계는 건축사가 담당"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 34,
    "sourceSection": "건축법·용어",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 6,
    "examYears": [
      2021,
      2022,
      2023,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-059",
      "2021-32-second1-063",
      "2022-33-second1-062",
      "2023-34-second1-074",
      "2024-35-2-1-059",
      "2024-35-2-1-061"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p34 · 건축법·용어"
  },
  {
    "id": "pub-card-134",
    "subject": "public_law",
    "order": 134,
    "type": "term",
    "category": "건축법·용어",
    "title": "주요구조부",
    "subtitle": "내력벽·기둥·바닥·보·지붕틀·주계단 등 구조상 중요한 부분",
    "bullets": [
      "대수선과 구조안전 판단의 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 34,
    "sourceSection": "건축법·용어",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p34 · 건축법·용어"
  },
  {
    "id": "pub-card-135",
    "subject": "public_law",
    "order": 135,
    "type": "term",
    "category": "건축법·용어",
    "title": "거실",
    "subtitle": "거주·집무·작업·오락 등 생활을 위해 계속 사용하는 방",
    "bullets": [
      "피난·채광·환기 규정의 기준이 되는 공간"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 34,
    "sourceSection": "건축법·용어",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2025
    ],
    "examSampleRefs": [
      "2025-36-second1-075"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p34 · 건축법·용어"
  },
  {
    "id": "pub-card-136",
    "subject": "public_law",
    "order": 136,
    "type": "term",
    "category": "건축법·용어",
    "title": "고층건축물",
    "subtitle": "30층 이상이거나 높이 120m 이상인 건축물",
    "bullets": [
      "초고층건축물을 포함하는 상위 개념"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 34,
    "sourceSection": "건축법·용어",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2025
    ],
    "examSampleRefs": [
      "2025-36-second1-072"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p34 · 건축법·용어"
  },
  {
    "id": "pub-card-137",
    "subject": "public_law",
    "order": 137,
    "type": "term",
    "category": "건축법·용어",
    "title": "초고층건축물",
    "subtitle": "50층 이상이거나 높이 200m 이상인 건축물",
    "bullets": [
      "피난·안전 관련 강화기준이 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 34,
    "sourceSection": "건축법·용어",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p34 · 건축법·용어"
  },
  {
    "id": "pub-card-138",
    "subject": "public_law",
    "order": 138,
    "type": "term",
    "category": "건축법·용어",
    "title": "지하층",
    "subtitle": "바닥부터 지표면까지 평균높이가 해당 층 높이의 2분의 1 이상인 층",
    "bullets": [
      "층수 산정 등에서 별도 취급"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 34,
    "sourceSection": "건축법·용어",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2022
    ],
    "examSampleRefs": [
      "2022-33-second1-065",
      "2022-33-second1-077"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p34 · 건축법·용어"
  },
  {
    "id": "pub-card-139",
    "subject": "public_law",
    "order": 139,
    "type": "term",
    "category": "건축법·허가",
    "title": "건축허가",
    "subtitle": "법정 규모·지역의 건축·대수선을 위해 허가권자에게 받는 허가",
    "bullets": [
      "허가권자와 도지사 사전승인 대상을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 36,
    "sourceSection": "건축법·허가",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 14,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-047",
      "2021-32-second1-068",
      "2021-32-second1-072",
      "2021-32-second1-074",
      "2021-32-second1-075",
      "2021-32-second1-076",
      "2021-32-second1-078",
      "2022-33-second1-078",
      "2023-34-second1-075",
      "2024-35-2-1-075"
    ],
    "importance": 5,
    "sourceLabel": "부동산공법 요약집 p36 · 건축법·허가"
  },
  {
    "id": "pub-card-140",
    "subject": "public_law",
    "order": 140,
    "type": "term",
    "category": "건축법·허가",
    "title": "건축신고",
    "subtitle": "일정 소규모 건축·대수선 등에 허가 대신 적용하는 신고",
    "bullets": [
      "신고대상과 허가대상을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 36,
    "sourceSection": "건축법·허가",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-075",
      "2021-32-second1-076",
      "2021-32-second1-078"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p36 · 건축법·허가"
  },
  {
    "id": "pub-card-141",
    "subject": "public_law",
    "order": 141,
    "type": "term",
    "category": "건축법·허가",
    "title": "건축 입지·규모 사전결정",
    "subtitle": "건축허가 전에 입지와 규모 가능성을 미리 결정받는 제도",
    "bullets": [
      "관계 법령상 입지·규모 가능 여부를 사전 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "사전결정"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "건축법·허가",
    "sourceRef": "국가법령정보센터 「건축법」 제10조",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 2,
    "examYears": [
      2022,
      2025
    ],
    "examSampleRefs": [
      "2022-33-second1-078",
      "2025-36-second1-074"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「건축법」 제10조"
  },
  {
    "id": "pub-card-142",
    "subject": "public_law",
    "order": 142,
    "type": "term",
    "category": "건축법·허가",
    "title": "건축허가 제한",
    "subtitle": "국가계획·지역계획 등 특별한 필요가 있을 때 허가를 제한하는 제도",
    "bullets": [
      "제한권자·기간·보고절차를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 37,
    "sourceSection": "건축법·허가",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2021,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-074",
      "2024-35-2-1-076"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p37 · 건축법·허가"
  },
  {
    "id": "pub-card-143",
    "subject": "public_law",
    "order": 143,
    "type": "term",
    "category": "건축법·절차",
    "title": "착공신고",
    "subtitle": "건축허가·신고 후 공사를 시작하기 전에 하는 신고",
    "bullets": [
      "건축주는 실제 착공 전에 허가권자에게 신고"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 39,
    "sourceSection": "건축법·절차",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2021,
      2023
    ],
    "examSampleRefs": [
      "2021-32-second1-069",
      "2023-34-second1-075"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p39 · 건축법·절차"
  },
  {
    "id": "pub-card-144",
    "subject": "public_law",
    "order": 144,
    "type": "term",
    "category": "건축법·절차",
    "title": "사용승인",
    "subtitle": "공사완료 후 건축물을 사용하기 전에 받는 검사·승인",
    "bullets": [
      "사용승인 전 사용 제한과 임시사용승인을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 39,
    "sourceSection": "건축법·절차",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 8,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-047",
      "2021-32-second1-075",
      "2021-32-second1-076",
      "2022-33-second1-071",
      "2023-34-second1-066",
      "2023-34-second1-074",
      "2024-35-2-1-047",
      "2025-36-second1-070"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p39 · 건축법·절차"
  },
  {
    "id": "pub-card-145",
    "subject": "public_law",
    "order": 145,
    "type": "term",
    "category": "건축법·절차",
    "title": "건축물대장",
    "subtitle": "건축물·대지 현황과 구조내력 등을 기록·관리하는 공적 장부",
    "bullets": [
      "사용승인 등 법정 사유에서 작성·정비"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 40,
    "sourceSection": "건축법·절차",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2021,
      2023
    ],
    "examSampleRefs": [
      "2021-32-second1-076",
      "2023-34-second1-074"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p40 · 건축법·절차"
  },
  {
    "id": "pub-card-146",
    "subject": "public_law",
    "order": 146,
    "type": "term",
    "category": "건축법·절차",
    "title": "공사감리",
    "subtitle": "설계도서·관계 법령대로 공사되는지 확인·지도하는 업무",
    "bullets": [
      "일정 건축물은 법정 감리자 지정이 필요"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 39,
    "sourceSection": "건축법·절차",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-078"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p39 · 건축법·절차"
  },
  {
    "id": "pub-card-147",
    "subject": "public_law",
    "order": 147,
    "type": "term",
    "category": "건축법·가설건축물",
    "title": "가설건축물",
    "subtitle": "일시적 용도로 일정 기간 존치하는 건축물",
    "bullets": [
      "허가대상과 신고대상을 구별하며 존치기간 규제가 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 39,
    "sourceSection": "건축법·가설건축물",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2021,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-045",
      "2021-32-second1-076",
      "2024-35-2-1-073"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p39 · 건축법·가설건축물"
  },
  {
    "id": "pub-card-148",
    "subject": "public_law",
    "order": 148,
    "type": "term",
    "category": "건축법·대지도로",
    "title": "공개공지",
    "subtitle": "대형 건축물 대지에 일반인이 이용하도록 확보하는 공개 공간",
    "bullets": [
      "설치대상과 건축기준 완화 특례가 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "공개 공지",
      "공개공간"
    ],
    "sourceKind": "summary",
    "sourcePage": 41,
    "sourceSection": "건축법·대지도로",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2021,
      2023,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-073",
      "2023-34-second1-078",
      "2024-35-2-1-074"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p41 · 건축법·대지도로"
  },
  {
    "id": "pub-card-149",
    "subject": "public_law",
    "order": 149,
    "type": "term",
    "category": "건축법·대지도로",
    "title": "건축법상 도로",
    "subtitle": "보행·자동차 통행이 가능하고 법정 기준을 갖춘 도로",
    "bullets": [
      "도로 지정·공고와 막다른 도로 기준 등을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "도로"
    ],
    "sourceKind": "summary",
    "sourcePage": 41,
    "sourceSection": "건축법·대지도로",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 17,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-066",
      "2021-32-second1-070",
      "2021-32-second1-077",
      "2022-33-second1-073",
      "2022-33-second1-076",
      "2023-34-second1-070",
      "2023-34-second1-072",
      "2023-34-second1-074",
      "2023-34-second1-076",
      "2023-34-second1-078"
    ],
    "importance": 5,
    "sourceLabel": "부동산공법 요약집 p41 · 건축법·대지도로"
  },
  {
    "id": "pub-card-150",
    "subject": "public_law",
    "order": 150,
    "type": "term",
    "category": "건축법·대지도로",
    "title": "건축선",
    "subtitle": "도로와 대지의 경계 등 건축할 수 있는 한계를 정하는 선",
    "bullets": [
      "소요너비 미달 도로의 중심선 후퇴 등으로 결정"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 42,
    "sourceSection": "건축법·대지도로",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2023
    ],
    "examSampleRefs": [
      "2023-34-second1-072"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p42 · 건축법·대지도로"
  },
  {
    "id": "pub-card-151",
    "subject": "public_law",
    "order": 151,
    "type": "term",
    "category": "건축법·대지규제",
    "title": "대지 안의 공지",
    "subtitle": "건축선·인접대지경계선으로부터 일정 거리 띄우는 제도",
    "bullets": [
      "용도지역·건축물 용도·규모에 따라 조례로 거리 설정"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 43,
    "sourceSection": "건축법·대지규제",
    "sourceRef": "5.공인중개사요약_공법.pdf p43 + 국가법령정보센터 「건축법」 제58조",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2022
    ],
    "examSampleRefs": [
      "2022-33-second1-076"
    ],
    "importance": 3,
    "sourceLabel": "5.공인중개사요약_공법.pdf p43 + 국가법령정보센터 「건축법」 제58조"
  },
  {
    "id": "pub-card-152",
    "subject": "public_law",
    "order": 152,
    "type": "term",
    "category": "건축법·대지규제",
    "title": "건축법상 건폐율",
    "subtitle": "대지면적에 대한 건축면적 비율",
    "bullets": [
      "최대한도는 국토계획법의 용도지역별 기준을 따름"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "건폐율"
    ],
    "sourceKind": "summary+official",
    "sourcePage": 43,
    "sourceSection": "건축법·대지규제",
    "sourceRef": "5.공인중개사요약_공법.pdf p43 + 국가법령정보센터 「건축법」 제55조",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 7,
    "examYears": [
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2022-33-second1-043",
      "2023-34-second1-073",
      "2024-35-2-1-051",
      "2024-35-2-1-052",
      "2025-36-second1-047",
      "2025-36-second1-050",
      "2025-36-second1-059"
    ],
    "importance": 4,
    "sourceLabel": "5.공인중개사요약_공법.pdf p43 + 국가법령정보센터 「건축법」 제55조"
  },
  {
    "id": "pub-card-153",
    "subject": "public_law",
    "order": 153,
    "type": "term",
    "category": "건축법·대지규제",
    "title": "건축법상 용적률",
    "subtitle": "대지면적에 대한 연면적 비율",
    "bullets": [
      "최대한도는 국토계획법의 용도지역별 기준을 따름"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "용적률"
    ],
    "sourceKind": "summary+official",
    "sourcePage": 43,
    "sourceSection": "건축법·대지규제",
    "sourceRef": "5.공인중개사요약_공법.pdf p43 + 국가법령정보센터 「건축법」 제56조",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 12,
    "examYears": [
      2021,
      2022,
      2023,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-047",
      "2021-32-second1-052",
      "2022-33-second1-043",
      "2022-33-second1-048",
      "2022-33-second1-052",
      "2022-33-second1-077",
      "2023-34-second1-049",
      "2023-34-second1-054",
      "2023-34-second1-073",
      "2023-34-second1-077"
    ],
    "importance": 5,
    "sourceLabel": "5.공인중개사요약_공법.pdf p43 + 국가법령정보센터 「건축법」 제56조"
  },
  {
    "id": "pub-card-154",
    "subject": "public_law",
    "order": 154,
    "type": "term",
    "category": "건축법·높이",
    "title": "가로구역별 높이제한",
    "subtitle": "가로구역 단위로 건축물 높이를 지정·공고하는 제도",
    "bullets": [
      "허가권자가 도시관리·경관 등을 고려해 높이를 정함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "건축물 높이"
    ],
    "sourceKind": "summary",
    "sourcePage": 43,
    "sourceSection": "건축법·높이",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p43 · 건축법·높이"
  },
  {
    "id": "pub-card-155",
    "subject": "public_law",
    "order": 155,
    "type": "term",
    "category": "건축법·높이",
    "title": "일조 등의 확보",
    "subtitle": "주거지역 등에서 인접대지와 공동주택의 일조를 확보하는 높이제한",
    "bullets": [
      "정북방향·공동주택 채광 기준과 예외를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "일조권"
    ],
    "sourceKind": "summary",
    "sourcePage": 44,
    "sourceSection": "건축법·높이",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2023
    ],
    "examSampleRefs": [
      "2023-34-second1-073"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p44 · 건축법·높이"
  },
  {
    "id": "pub-card-156",
    "subject": "public_law",
    "order": 156,
    "type": "term",
    "category": "건축법·피난안전",
    "title": "직통계단",
    "subtitle": "거실에서 피난층 또는 지상으로 직접 통하는 계단",
    "bullets": [
      "용도·층·면적에 따라 2개소 이상 설치해야 하는 경우가 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "건축법·피난안전",
    "sourceRef": "국가법령정보센터 「건축법 시행령」 직통계단 관련 조문",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 1,
    "examYears": [
      2025
    ],
    "examSampleRefs": [
      "2025-36-second1-075"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「건축법 시행령」 직통계단 관련 조문"
  },
  {
    "id": "pub-card-157",
    "subject": "public_law",
    "order": 157,
    "type": "term",
    "category": "건축법·설비",
    "title": "승강기",
    "subtitle": "일정 층수·연면적 이상의 건축물에 설치하는 수직운송설비",
    "bullets": [
      "승용승강기 설치대상과 예외를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 44,
    "sourceSection": "건축법·설비",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2023,
      2025
    ],
    "examSampleRefs": [
      "2023-34-second1-076",
      "2025-36-second1-072"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p44 · 건축법·설비"
  },
  {
    "id": "pub-card-158",
    "subject": "public_law",
    "order": 158,
    "type": "term",
    "category": "건축법·설비",
    "title": "비상용승강기",
    "subtitle": "고층건축물의 소방·비상 대응을 위해 추가 설치하는 승강기",
    "bullets": [
      "승용승강기와 별도로 법정 높이 이상 건축물에 설치"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 44,
    "sourceSection": "건축법·설비",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2025
    ],
    "examSampleRefs": [
      "2025-36-second1-072"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p44 · 건축법·설비"
  },
  {
    "id": "pub-card-159",
    "subject": "public_law",
    "order": 159,
    "type": "term",
    "category": "건축법·설비",
    "title": "피난용승강기",
    "subtitle": "고층건축물에서 피난을 지원하도록 설치하는 승강기",
    "bullets": [
      "고층건축물은 승용승강기 중 법정 수를 피난용으로 설치"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "건축법·설비",
    "sourceRef": "국가법령정보센터 「건축법」 제64조",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 1,
    "examYears": [
      2025
    ],
    "examSampleRefs": [
      "2025-36-second1-072"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「건축법」 제64조"
  },
  {
    "id": "pub-card-160",
    "subject": "public_law",
    "order": 160,
    "type": "term",
    "category": "건축법·피난안전",
    "title": "건축물 안전영향평가",
    "subtitle": "초고층·대형 건축물 등이 주변과 구조안전에 미치는 영향을 평가",
    "bullets": [
      "건축허가 전 구조·지반·인접시설 영향 등을 검토"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "안전영향평가"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "건축법·피난안전",
    "sourceRef": "국가법령정보센터 「건축법」 건축물 안전영향평가 관련 조문",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 3,
    "examYears": [
      2021,
      2022,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-075",
      "2022-33-second1-072",
      "2024-35-2-1-075"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「건축법」 건축물 안전영향평가 관련 조문"
  },
  {
    "id": "pub-card-161",
    "subject": "public_law",
    "order": 161,
    "type": "term",
    "category": "건축법·특례",
    "title": "특별건축구역",
    "subtitle": "창의적 건축과 도시경관 조성을 위해 건축기준을 특례 적용하는 구역",
    "bullets": [
      "지정권자·지정제외지역·적용배제·완화 규정을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 45,
    "sourceSection": "건축법·특례",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2021,
      2022,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-077",
      "2022-33-second1-076",
      "2024-35-2-1-045"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p45 · 건축법·특례"
  },
  {
    "id": "pub-card-162",
    "subject": "public_law",
    "order": 162,
    "type": "term",
    "category": "건축법·특례",
    "title": "건축협정",
    "subtitle": "인접 토지·건축물 소유자 등이 건축·대수선·리모델링 사항을 협정하는 제도",
    "bullets": [
      "협정구역·전원합의·인가 절차가 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 45,
    "sourceSection": "건축법·특례",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2022,
      2023
    ],
    "examSampleRefs": [
      "2022-33-second1-075",
      "2023-34-second1-073"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p45 · 건축법·특례"
  },
  {
    "id": "pub-card-163",
    "subject": "public_law",
    "order": 163,
    "type": "term",
    "category": "건축법·특례",
    "title": "결합건축",
    "subtitle": "서로 떨어진 둘 이상의 대지를 결합해 용적률 등을 조정하는 제도",
    "bullets": [
      "법정 지역에서 건축주들이 협의해 건축규제를 결합 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "건축법·특례",
    "sourceRef": "국가법령정보센터 「건축법」 결합건축 관련 조문",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 1,
    "examYears": [
      2022
    ],
    "examSampleRefs": [
      "2022-33-second1-075"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「건축법」 결합건축 관련 조문"
  },
  {
    "id": "pub-card-164",
    "subject": "public_law",
    "order": 164,
    "type": "term",
    "category": "건축법·피난안전",
    "title": "내진능력 공개",
    "subtitle": "일정 건축물의 지진 대응 능력을 공개하는 제도",
    "bullets": [
      "법정 규모·용도의 건축물은 내진능력을 공개"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "건축법·피난안전",
    "sourceRef": "국가법령정보센터 「건축법」 내진능력 공개 관련 조문",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「건축법」 내진능력 공개 관련 조문"
  },
  {
    "id": "pub-card-165",
    "subject": "public_law",
    "order": 165,
    "type": "term",
    "category": "건축법·피난안전",
    "title": "건축물 마감재료",
    "subtitle": "화재확산·실내공기질 등을 고려한 마감재료 기준",
    "bullets": [
      "내부마감·외벽마감·창호 방화성능 등을 용도·규모별로 규율"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "마감재료"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "건축법·피난안전",
    "sourceRef": "국가법령정보센터 「건축법」 제52조",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 1,
    "examYears": [
      2024
    ],
    "examSampleRefs": [
      "2024-35-2-1-077"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「건축법」 제52조"
  },
  {
    "id": "pub-card-166",
    "subject": "public_law",
    "order": 166,
    "type": "term",
    "category": "건축법·구조안전",
    "title": "특수구조건축물",
    "subtitle": "특수한 구조형식·대공간 등으로 구조안전 검토가 강화되는 건축물",
    "bullets": [
      "구조심의·설계·감리 등의 특례가 적용될 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "건축법·구조안전",
    "sourceRef": "국가법령정보센터 「건축법」 특수구조건축물 관련 조문",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 1,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-072"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「건축법」 특수구조건축물 관련 조문"
  },
  {
    "id": "pub-card-167",
    "subject": "public_law",
    "order": 167,
    "type": "term",
    "category": "건축법·분쟁",
    "title": "건축분쟁전문위원회",
    "subtitle": "건축 관련 분쟁을 조정·재정하는 전문위원회",
    "bullets": [
      "건축관계자 사이의 법정 분쟁을 조정·재정"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "건축법·분쟁",
    "sourceRef": "국가법령정보센터 「건축법」 건축분쟁전문위원회 관련 조문",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 1,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-078"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「건축법」 건축분쟁전문위원회 관련 조문"
  },
  {
    "id": "pub-card-168",
    "subject": "public_law",
    "order": 168,
    "type": "term",
    "category": "주택법·용어",
    "title": "주택",
    "subtitle": "세대가 장기간 독립된 주거생활을 할 수 있는 구조의 건축물과 부속토지",
    "bullets": [
      "단독주택과 공동주택으로 구분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 46,
    "sourceSection": "주택법·용어",
    "sourceRef": "5.공인중개사요약_공법.pdf p46 + 국가법령정보센터 「주택법」 제2조",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 64,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-050",
      "2021-32-second1-053",
      "2021-32-second1-055",
      "2021-32-second1-059",
      "2021-32-second1-062",
      "2021-32-second1-063",
      "2021-32-second1-064",
      "2021-32-second1-065",
      "2021-32-second1-066",
      "2021-32-second1-067"
    ],
    "importance": 5,
    "sourceLabel": "5.공인중개사요약_공법.pdf p46 + 국가법령정보센터 「주택법」 제2조"
  },
  {
    "id": "pub-card-169",
    "subject": "public_law",
    "order": 169,
    "type": "term",
    "category": "주택법·용어",
    "title": "단독주택",
    "subtitle": "1세대가 하나의 건축물 안에서 독립된 주거생활을 할 수 있는 주택",
    "bullets": [
      "세부 종류는 건축법 시행령에서 정함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 46,
    "sourceSection": "주택법·용어",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 5,
    "examYears": [
      2021,
      2022,
      2023,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-055",
      "2021-32-second1-059",
      "2022-33-second1-073",
      "2023-34-second1-069",
      "2025-36-second1-069"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p46 · 주택법·용어"
  },
  {
    "id": "pub-card-170",
    "subject": "public_law",
    "order": 170,
    "type": "term",
    "category": "주택법·용어",
    "title": "공동주택",
    "subtitle": "여러 세대가 벽·복도·계단·설비 등을 공동 사용하는 주택",
    "bullets": [
      "각 세대가 독립된 주거생활이 가능한 구조"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 46,
    "sourceSection": "주택법·용어",
    "sourceRef": "5.공인중개사요약_공법.pdf p46 + 국가법령정보센터 「주택법」 제2조",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 9,
    "examYears": [
      2022,
      2023,
      2025
    ],
    "examSampleRefs": [
      "2022-33-second1-068",
      "2022-33-second1-070",
      "2022-33-second1-077",
      "2023-34-second1-068",
      "2023-34-second1-070",
      "2025-36-second1-065",
      "2025-36-second1-067",
      "2025-36-second1-070",
      "2025-36-second1-073"
    ],
    "importance": 4,
    "sourceLabel": "5.공인중개사요약_공법.pdf p46 + 국가법령정보센터 「주택법」 제2조"
  },
  {
    "id": "pub-card-171",
    "subject": "public_law",
    "order": 171,
    "type": "term",
    "category": "주택법·용어",
    "title": "국민주택",
    "subtitle": "국가·지자체·LH 등 또는 기금 지원으로 건설되는 국민주택규모 이하 주택",
    "bullets": [
      "건설주체·재원·규모를 함께 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 46,
    "sourceSection": "주택법·용어",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 6,
    "examYears": [
      2021,
      2022,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-067",
      "2021-32-second1-068",
      "2022-33-second1-059",
      "2024-35-2-1-060",
      "2024-35-2-1-068",
      "2024-35-2-1-070"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p46 · 주택법·용어"
  },
  {
    "id": "pub-card-172",
    "subject": "public_law",
    "order": 172,
    "type": "term",
    "category": "주택법·용어",
    "title": "국민주택규모",
    "subtitle": "1호 또는 1세대당 주거전용면적의 법정 규모기준",
    "bullets": [
      "원칙 85㎡ 이하, 수도권 제외 도시지역 아닌 읍·면은 100㎡ 이하"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 46,
    "sourceSection": "주택법·용어",
    "sourceRef": "5.공인중개사요약_공법.pdf p46 + 국가법령정보센터 「주택법」 제2조 제6호",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 5,
    "examYears": [
      2021,
      2022,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-067",
      "2021-32-second1-068",
      "2022-33-second1-059",
      "2024-35-2-1-060",
      "2024-35-2-1-068"
    ],
    "importance": 4,
    "sourceLabel": "5.공인중개사요약_공법.pdf p46 + 국가법령정보센터 「주택법」 제2조 제6호"
  },
  {
    "id": "pub-card-173",
    "subject": "public_law",
    "order": 173,
    "type": "term",
    "category": "주택법·용어",
    "title": "민영주택",
    "subtitle": "국민주택을 제외한 주택",
    "bullets": [
      "국민주택과 공급·청약제도가 다름"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 46,
    "sourceSection": "주택법·용어",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2021,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-067",
      "2024-35-2-1-070"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p46 · 주택법·용어"
  },
  {
    "id": "pub-card-174",
    "subject": "public_law",
    "order": 174,
    "type": "term",
    "category": "주택법·용어",
    "title": "준주택",
    "subtitle": "주택 외 건축물과 시설 중 주거시설로 이용 가능한 법정 시설",
    "bullets": [
      "오피스텔·기숙사 등 법정 범위를 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 46,
    "sourceSection": "주택법·용어",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2023
    ],
    "examSampleRefs": [
      "2023-34-second1-070"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p46 · 주택법·용어"
  },
  {
    "id": "pub-card-175",
    "subject": "public_law",
    "order": 175,
    "type": "term",
    "category": "주택법·용어",
    "title": "도시형 생활주택",
    "subtitle": "도시지역에 건설하는 소규모 공동주택",
    "bullets": [
      "소형주택 등 법정 유형·규모요건을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 46,
    "sourceSection": "주택법·용어",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 4,
    "examYears": [
      2021,
      2022,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-067",
      "2022-33-second1-065",
      "2022-33-second1-069",
      "2025-36-second1-069"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p46 · 주택법·용어"
  },
  {
    "id": "pub-card-176",
    "subject": "public_law",
    "order": 176,
    "type": "term",
    "category": "주택법·용어",
    "title": "주택단지",
    "subtitle": "사업계획승인을 받아 주택과 부대·복리시설을 건설하는 일단의 토지",
    "bullets": [
      "도로·철도 등 법정 시설로 분리되면 별개 단지로 보는 경우가 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 46,
    "sourceSection": "주택법·용어",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 7,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-066",
      "2021-32-second1-069",
      "2022-33-second1-070",
      "2023-34-second1-066",
      "2023-34-second1-070",
      "2024-35-2-1-066",
      "2025-36-second1-065"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p46 · 주택법·용어"
  },
  {
    "id": "pub-card-177",
    "subject": "public_law",
    "order": 177,
    "type": "term",
    "category": "주택법·용어",
    "title": "부대시설",
    "subtitle": "주차장·관리사무소 등 주택에 딸린 시설",
    "bullets": [
      "복리시설과 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 46,
    "sourceSection": "주택법·용어",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 4,
    "examYears": [
      2021,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-069",
      "2024-35-2-1-061",
      "2024-35-2-1-066",
      "2025-36-second1-049"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p46 · 주택법·용어"
  },
  {
    "id": "pub-card-178",
    "subject": "public_law",
    "order": 178,
    "type": "term",
    "category": "주택법·용어",
    "title": "복리시설",
    "subtitle": "어린이놀이터·근린생활시설 등 입주자 생활복리를 위한 시설",
    "bullets": [
      "부대시설과 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 46,
    "sourceSection": "주택법·용어",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 6,
    "examYears": [
      2021,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-067",
      "2021-32-second1-069",
      "2023-34-second1-070",
      "2024-35-2-1-061",
      "2024-35-2-1-066",
      "2025-36-second1-066"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p46 · 주택법·용어"
  },
  {
    "id": "pub-card-179",
    "subject": "public_law",
    "order": 179,
    "type": "term",
    "category": "주택법·용어",
    "title": "기간시설",
    "subtitle": "도로·상하수도·전기·통신·가스 등 주택단지 밖 기반시설",
    "bullets": [
      "대규모 주택건설사업의 설치비용·책임과 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "주택법·용어",
    "sourceRef": "국가법령정보센터 「주택법」 기간시설 관련 조문",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 2,
    "examYears": [
      2023,
      2024
    ],
    "examSampleRefs": [
      "2023-34-second1-070",
      "2024-35-2-1-065"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「주택법」 기간시설 관련 조문"
  },
  {
    "id": "pub-card-180",
    "subject": "public_law",
    "order": 180,
    "type": "term",
    "category": "주택법·사업주체",
    "title": "사업주체",
    "subtitle": "사업계획승인을 받아 주택건설·대지조성사업을 시행하는 자",
    "bullets": [
      "국가·지자체·LH·지방공사·주택조합·등록사업자 등이 해당"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 47,
    "sourceSection": "주택법·사업주체",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 8,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-069",
      "2022-33-second1-068",
      "2022-33-second1-069",
      "2023-34-second1-066",
      "2024-35-2-1-066",
      "2024-35-2-1-069",
      "2025-36-second1-067",
      "2025-36-second1-070"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p47 · 주택법·사업주체"
  },
  {
    "id": "pub-card-181",
    "subject": "public_law",
    "order": 181,
    "type": "term",
    "category": "주택법·사업주체",
    "title": "주택건설사업 등록",
    "subtitle": "일정 규모 이상 주택건설·대지조성사업을 하려는 자의 등록",
    "bullets": [
      "등록요건과 등록말소·영업정지를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 47,
    "sourceSection": "주택법·사업주체",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p47 · 주택법·사업주체"
  },
  {
    "id": "pub-card-182",
    "subject": "public_law",
    "order": 182,
    "type": "term",
    "category": "주택법·사업주체",
    "title": "등록사업자",
    "subtitle": "주택건설사업 또는 대지조성사업 등록을 한 사업자",
    "bullets": [
      "사업주체·공동사업주체와 역할을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 47,
    "sourceSection": "주택법·사업주체",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 5,
    "examYears": [
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2022-33-second1-066",
      "2023-34-second1-069",
      "2024-35-2-1-068",
      "2025-36-second1-069",
      "2025-36-second1-071"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p47 · 주택법·사업주체"
  },
  {
    "id": "pub-card-183",
    "subject": "public_law",
    "order": 183,
    "type": "term",
    "category": "주택법·주택조합",
    "title": "주택조합",
    "subtitle": "여러 사람이 주택을 마련하거나 리모델링하기 위해 설립하는 조합",
    "bullets": [
      "지역·직장·리모델링주택조합으로 구분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 48,
    "sourceSection": "주택법·주택조합",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 10,
    "examYears": [
      2021,
      2022,
      2023,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-070",
      "2022-33-second1-068",
      "2022-33-second1-070",
      "2023-34-second1-067",
      "2023-34-second1-069",
      "2023-34-second1-071",
      "2025-36-second1-060",
      "2025-36-second1-065",
      "2025-36-second1-068",
      "2025-36-second1-069"
    ],
    "importance": 5,
    "sourceLabel": "부동산공법 요약집 p48 · 주택법·주택조합"
  },
  {
    "id": "pub-card-184",
    "subject": "public_law",
    "order": 184,
    "type": "term",
    "category": "주택법·주택조합",
    "title": "지역주택조합",
    "subtitle": "같은 지역 거주자들이 주택 마련을 위해 설립하는 조합",
    "bullets": [
      "조합원 자격·토지확보·조합원 모집규제가 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 48,
    "sourceSection": "주택법·주택조합",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2023,
      2025
    ],
    "examSampleRefs": [
      "2023-34-second1-067",
      "2025-36-second1-060",
      "2025-36-second1-068"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p48 · 주택법·주택조합"
  },
  {
    "id": "pub-card-185",
    "subject": "public_law",
    "order": 185,
    "type": "term",
    "category": "주택법·주택조합",
    "title": "직장주택조합",
    "subtitle": "같은 직장 근로자들이 주택 마련을 위해 설립하는 조합",
    "bullets": [
      "직장·지역 요건과 설립인가를 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 48,
    "sourceSection": "주택법·주택조합",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p48 · 주택법·주택조합"
  },
  {
    "id": "pub-card-186",
    "subject": "public_law",
    "order": 186,
    "type": "term",
    "category": "주택법·주택조합",
    "title": "리모델링주택조합",
    "subtitle": "공동주택 소유자들이 리모델링을 위해 설립하는 조합",
    "bullets": [
      "단지 전체 또는 동별 리모델링 동의요건과 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 49,
    "sourceSection": "주택법·주택조합",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 5,
    "examYears": [
      2022,
      2023,
      2025
    ],
    "examSampleRefs": [
      "2022-33-second1-070",
      "2023-34-second1-069",
      "2023-34-second1-071",
      "2025-36-second1-065",
      "2025-36-second1-069"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p49 · 주택법·주택조합"
  },
  {
    "id": "pub-card-187",
    "subject": "public_law",
    "order": 187,
    "type": "term",
    "category": "주택법·주택조합",
    "title": "조합원 모집신고",
    "subtitle": "지역주택조합 등이 조합원을 모집하기 전 관할청에 하는 신고",
    "bullets": [
      "모집광고의 법정 표시사항과 가입계약 규제를 함께 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "조합원 모집"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "주택법·주택조합",
    "sourceRef": "국가법령정보센터 「주택법」 조합원 모집 관련 조문",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 2,
    "examYears": [
      2023,
      2025
    ],
    "examSampleRefs": [
      "2023-34-second1-067",
      "2025-36-second1-068"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「주택법」 조합원 모집 관련 조문"
  },
  {
    "id": "pub-card-188",
    "subject": "public_law",
    "order": 188,
    "type": "term",
    "category": "주택법·주택조합",
    "title": "주택조합 설립인가",
    "subtitle": "주택조합을 설립하기 위해 시장·군수·구청장 등의 인가를 받는 절차",
    "bullets": [
      "토지사용권원·조합원 수 등 법정 요건이 필요"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 48,
    "sourceSection": "주택법·주택조합",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p48 · 주택법·주택조합"
  },
  {
    "id": "pub-card-189",
    "subject": "public_law",
    "order": 189,
    "type": "term",
    "category": "주택법·사업계획",
    "title": "사업계획승인",
    "subtitle": "일정 규모 이상 주택건설·대지조성사업의 핵심 인허가",
    "bullets": [
      "승인대상 규모·승인권자·다른 인허가 의제를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 50,
    "sourceSection": "주택법·사업계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 5,
    "examYears": [
      2021,
      2022,
      2023,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-069",
      "2022-33-second1-071",
      "2023-34-second1-065",
      "2024-35-2-1-066",
      "2024-35-2-1-068"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p50 · 주택법·사업계획"
  },
  {
    "id": "pub-card-190",
    "subject": "public_law",
    "order": 190,
    "type": "term",
    "category": "주택법·사업계획",
    "title": "주택건설 착공신고",
    "subtitle": "사업계획승인 후 실제 공사를 시작하기 전 하는 신고",
    "bullets": [
      "승인 후 법정 기간 내 착공 의무와 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 50,
    "sourceSection": "주택법·사업계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p50 · 주택법·사업계획"
  },
  {
    "id": "pub-card-191",
    "subject": "public_law",
    "order": 191,
    "type": "term",
    "category": "주택법·사업계획",
    "title": "사용검사",
    "subtitle": "주택건설사업 완료 후 사업계획대로 시공됐는지 확인하는 검사",
    "bullets": [
      "검사권자와 임시사용승인을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 50,
    "sourceSection": "주택법·사업계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 6,
    "examYears": [
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2022-33-second1-068",
      "2022-33-second1-071",
      "2023-34-second1-066",
      "2024-35-2-1-069",
      "2025-36-second1-067",
      "2025-36-second1-070"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p50 · 주택법·사업계획"
  },
  {
    "id": "pub-card-192",
    "subject": "public_law",
    "order": 192,
    "type": "term",
    "category": "주택법·사업계획",
    "title": "주택건설 공사감리",
    "subtitle": "사업계획승인 주택의 공사가 설계·법령대로 되는지 감리하는 제도",
    "bullets": [
      "감리자 지정·업무·보고의무가 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 52,
    "sourceSection": "주택법·사업계획",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p52 · 주택법·사업계획"
  },
  {
    "id": "pub-card-193",
    "subject": "public_law",
    "order": 193,
    "type": "term",
    "category": "주택법·리모델링",
    "title": "리모델링",
    "subtitle": "노후 공동주택의 기능향상 등을 위해 증축·대수선하는 행위",
    "bullets": [
      "리모델링 허가·조합·동의요건을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 53,
    "sourceSection": "주택법·리모델링",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 7,
    "examYears": [
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2022-33-second1-070",
      "2022-33-second1-075",
      "2023-34-second1-069",
      "2023-34-second1-071",
      "2024-35-2-1-067",
      "2025-36-second1-065",
      "2025-36-second1-069"
    ],
    "importance": 4,
    "sourceLabel": "부동산공법 요약집 p53 · 주택법·리모델링"
  },
  {
    "id": "pub-card-194",
    "subject": "public_law",
    "order": 194,
    "type": "term",
    "category": "주택법·리모델링",
    "title": "수직증축형 리모델링",
    "subtitle": "기존 공동주택 층수를 위로 늘리는 리모델링",
    "bullets": [
      "기존 층수·안전진단·전문기관 검토 등 강화요건 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "주택법·리모델링",
    "sourceRef": "국가법령정보센터 「주택법」 수직증축형 리모델링 관련 조문",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 2,
    "examYears": [
      2023,
      2024
    ],
    "examSampleRefs": [
      "2023-34-second1-071",
      "2024-35-2-1-067"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「주택법」 수직증축형 리모델링 관련 조문"
  },
  {
    "id": "pub-card-195",
    "subject": "public_law",
    "order": 195,
    "type": "term",
    "category": "주택법·주택상환사채",
    "title": "주택상환사채",
    "subtitle": "주택건설자금을 조달하고 장래 주택으로 상환하는 사채",
    "bullets": [
      "발행자·발행승인·사용용도·상환기간이 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 53,
    "sourceSection": "주택법·주택상환사채",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2021,
      2022,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-070",
      "2022-33-second1-066",
      "2025-36-second1-071"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p53 · 주택법·주택상환사채"
  },
  {
    "id": "pub-card-196",
    "subject": "public_law",
    "order": 196,
    "type": "term",
    "category": "주택법·주택공급",
    "title": "분양가상한제",
    "subtitle": "일정 주택의 분양가격을 택지비·건축비 기준으로 제한하는 제도",
    "bullets": [
      "적용주택·분양가격 구성·공시사항을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 54,
    "sourceSection": "주택법·주택공급",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 4,
    "examYears": [
      2021,
      2022,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-065",
      "2022-33-second1-068",
      "2022-33-second1-069",
      "2025-36-second1-066"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p54 · 주택법·주택공급"
  },
  {
    "id": "pub-card-197",
    "subject": "public_law",
    "order": 197,
    "type": "term",
    "category": "주택법·주택공급",
    "title": "분양가격",
    "subtitle": "분양가상한제 적용주택의 택지비와 건축비 등으로 구성되는 가격",
    "bullets": [
      "공공택지·민간택지와 가산비 적용을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 54,
    "sourceSection": "주택법·주택공급",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 4,
    "examYears": [
      2021,
      2022,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-065",
      "2022-33-second1-069",
      "2024-35-2-1-071",
      "2025-36-second1-066"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p54 · 주택법·주택공급"
  },
  {
    "id": "pub-card-198",
    "subject": "public_law",
    "order": 198,
    "type": "term",
    "category": "주택법·주택공급",
    "title": "입주자저축",
    "subtitle": "주택을 공급받기 위해 가입하는 법정 저축제도",
    "bullets": [
      "청약자격·가입·양도·압류 등 규제가 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "주택법·주택공급",
    "sourceRef": "국가법령정보센터 「주택법」 입주자저축 관련 조문",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 2,
    "examYears": [
      2021,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-071",
      "2024-35-2-1-070"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「주택법」 입주자저축 관련 조문"
  },
  {
    "id": "pub-card-199",
    "subject": "public_law",
    "order": 199,
    "type": "term",
    "category": "주택법·주택공급",
    "title": "공급질서 교란행위",
    "subtitle": "주택 공급 관련 증서·지위의 불법 양도·알선 등 금지행위",
    "bullets": [
      "입주자저축증서·조합원지위·특별공급 지위 등의 불법 거래를 규제"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 55,
    "sourceSection": "주택법·주택공급",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-071"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p55 · 주택법·주택공급"
  },
  {
    "id": "pub-card-200",
    "subject": "public_law",
    "order": 200,
    "type": "term",
    "category": "주택법·주택공급",
    "title": "전매제한",
    "subtitle": "분양받은 주택·입주자로 선정된 지위를 일정 기간 전매하지 못하게 하는 제도",
    "bullets": [
      "지역·택지·분양가 등에 따라 기간이 달라질 수 있어 구조 위주로 학습"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 57,
    "sourceSection": "주택법·주택공급",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p57 · 주택법·주택공급"
  },
  {
    "id": "pub-card-201",
    "subject": "public_law",
    "order": 201,
    "type": "term",
    "category": "주택법·주택시장",
    "title": "투기과열지구",
    "subtitle": "주택가격 상승·청약과열 우려가 큰 지역을 지정하는 규제지역",
    "bullets": [
      "지정기준·절차·해제를 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 54,
    "sourceSection": "주택법·주택시장",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-068"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p54 · 주택법·주택시장"
  },
  {
    "id": "pub-card-202",
    "subject": "public_law",
    "order": 202,
    "type": "term",
    "category": "주택법·품질관리",
    "title": "사전방문",
    "subtitle": "사용검사 전 입주예정자가 주택 공사상태를 미리 점검하는 제도",
    "bullets": [
      "사업주체는 사용검사 전에 입주예정자의 사전방문 기회를 보장"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "주택법·품질관리",
    "sourceRef": "국가법령정보센터 「주택법」 제48조의2",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 1,
    "examYears": [
      2024
    ],
    "examSampleRefs": [
      "2024-35-2-1-069"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「주택법」 제48조의2"
  },
  {
    "id": "pub-card-203",
    "subject": "public_law",
    "order": 203,
    "type": "term",
    "category": "주택법·품질관리",
    "title": "공동주택 품질점검단",
    "subtitle": "전문가가 공동주택 시공품질을 점검하는 시도지사 설치·운영 제도",
    "bullets": [
      "사전방문 후 사용검사 신청 전 품질점검을 수행"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "품질점검단"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "주택법·품질관리",
    "sourceRef": "국가법령정보센터 「주택법」 제48조의3",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 2,
    "examYears": [
      2022,
      2025
    ],
    "examSampleRefs": [
      "2022-33-second1-068",
      "2025-36-second1-067"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「주택법」 제48조의3"
  },
  {
    "id": "pub-card-204",
    "subject": "public_law",
    "order": 204,
    "type": "term",
    "category": "주택법·주택공급",
    "title": "견본주택",
    "subtitle": "분양주택의 구조·마감 등을 미리 보여주는 모델하우스",
    "bullets": [
      "건축기준·전시품목·허위표시 금지 등을 규율"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 55,
    "sourceSection": "주택법·주택공급",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2024
    ],
    "examSampleRefs": [
      "2024-35-2-1-071"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p55 · 주택법·주택공급"
  },
  {
    "id": "pub-card-205",
    "subject": "public_law",
    "order": 205,
    "type": "term",
    "category": "주택법·주택공급",
    "title": "토지임대부 분양주택",
    "subtitle": "토지는 임대하고 건물만 분양하는 주택",
    "bullets": [
      "토지와 건물 소유관계를 분리하고 토지임대료·처분제한 등이 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "주택법·주택공급",
    "sourceRef": "국가법령정보센터 「주택법」 토지임대부 분양주택 관련 조문",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 6,
    "examYears": [
      2021,
      2022,
      2023,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-062",
      "2021-32-second1-064",
      "2022-33-second1-067",
      "2022-33-second1-069",
      "2023-34-second1-064",
      "2025-36-second1-066"
    ],
    "importance": 4,
    "sourceLabel": "국가법령정보센터 「주택법」 토지임대부 분양주택 관련 조문"
  },
  {
    "id": "pub-card-206",
    "subject": "public_law",
    "order": 206,
    "type": "term",
    "category": "농지법·총칙",
    "title": "농지",
    "subtitle": "전·답·과수원 등 실제 농작물 경작지와 법정 부속시설 부지",
    "bullets": [
      "지목보다 실제 이용현황과 법정 정의를 기준으로 판단"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 58,
    "sourceSection": "농지법·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 13,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-079",
      "2021-32-second1-080",
      "2022-33-second1-078",
      "2022-33-second1-079",
      "2022-33-second1-080",
      "2023-34-second1-079",
      "2023-34-second1-080",
      "2024-35-2-1-048",
      "2024-35-2-1-079",
      "2024-35-2-1-080"
    ],
    "importance": 5,
    "sourceLabel": "부동산공법 요약집 p58 · 농지법·총칙"
  },
  {
    "id": "pub-card-207",
    "subject": "public_law",
    "order": 207,
    "type": "term",
    "category": "농지법·총칙",
    "title": "농업인",
    "subtitle": "농업에 종사하는 개인으로 법정 요건을 갖춘 자",
    "bullets": [
      "농업경영·농지취득 제도에서 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 58,
    "sourceSection": "농지법·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2021,
      2023
    ],
    "examSampleRefs": [
      "2021-32-second1-080",
      "2023-34-second1-079",
      "2023-34-second1-080"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p58 · 농지법·총칙"
  },
  {
    "id": "pub-card-208",
    "subject": "public_law",
    "order": 208,
    "type": "term",
    "category": "농지법·총칙",
    "title": "농업경영",
    "subtitle": "자기 계산과 책임으로 농업을 영위하는 것",
    "bullets": [
      "농지 소유 원칙인 자기 농업경영과 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 58,
    "sourceSection": "농지법·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2022,
      2023
    ],
    "examSampleRefs": [
      "2022-33-second1-079",
      "2023-34-second1-079"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p58 · 농지법·총칙"
  },
  {
    "id": "pub-card-209",
    "subject": "public_law",
    "order": 209,
    "type": "term",
    "category": "농지법·총칙",
    "title": "농업법인",
    "subtitle": "영농조합법인·농업회사법인 등 법정 농업법인",
    "bullets": [
      "요건을 갖춘 농업법인은 농지 소유 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 58,
    "sourceSection": "농지법·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 4,
    "examYears": [
      2021,
      2023,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second1-079",
      "2021-32-second1-080",
      "2023-34-second1-080",
      "2025-36-second1-079"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p58 · 농지법·총칙"
  },
  {
    "id": "pub-card-210",
    "subject": "public_law",
    "order": 210,
    "type": "term",
    "category": "농지법·총칙",
    "title": "자경",
    "subtitle": "농업인이 자기 농지에서 농작물 경작·다년생식물 재배에 종사하는 것",
    "bullets": [
      "직접 경작 여부 판단의 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 58,
    "sourceSection": "농지법·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2023,
      2025
    ],
    "examSampleRefs": [
      "2023-34-second1-080",
      "2025-36-second1-079"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p58 · 농지법·총칙"
  },
  {
    "id": "pub-card-211",
    "subject": "public_law",
    "order": 211,
    "type": "term",
    "category": "농지법·소유",
    "title": "농지 소유 제한",
    "subtitle": "농지는 자기 농업경영에 이용할 자가 소유하는 것이 원칙",
    "bullets": [
      "경자유전 원칙의 구체화"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 59,
    "sourceSection": "농지법·소유",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p59 · 농지법·소유"
  },
  {
    "id": "pub-card-212",
    "subject": "public_law",
    "order": 212,
    "type": "term",
    "category": "농지법·소유",
    "title": "농지 소유 예외",
    "subtitle": "국가·지자체·상속·담보농지 등 자기농업경영 없이 소유 가능한 예외",
    "bullets": [
      "법정 예외에 해당하는지 기출에서 반복"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 59,
    "sourceSection": "농지법·소유",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p59 · 농지법·소유"
  },
  {
    "id": "pub-card-213",
    "subject": "public_law",
    "order": 213,
    "type": "term",
    "category": "농지법·소유",
    "title": "주말·체험영농",
    "subtitle": "주말이나 체험 목적으로 농작물을 경작하는 비전업 농업활동",
    "bullets": [
      "법정 면적 범위에서 농지 소유가 허용될 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 59,
    "sourceSection": "농지법·소유",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p59 · 농지법·소유"
  },
  {
    "id": "pub-card-214",
    "subject": "public_law",
    "order": 214,
    "type": "term",
    "category": "농지법·소유",
    "title": "상속농지",
    "subtitle": "상속으로 취득한 농지의 소유 특례",
    "bullets": [
      "자기 농업경영에 이용하지 않아도 법정 범위에서 계속 소유 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 59,
    "sourceSection": "농지법·소유",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p59 · 농지법·소유"
  },
  {
    "id": "pub-card-215",
    "subject": "public_law",
    "order": 215,
    "type": "term",
    "category": "농지법·소유",
    "title": "이농농지",
    "subtitle": "농업경영을 하던 자가 이농한 뒤 소유하는 농지",
    "bullets": [
      "법정 범위에서 소유 특례가 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 59,
    "sourceSection": "농지법·소유",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p59 · 농지법·소유"
  },
  {
    "id": "pub-card-216",
    "subject": "public_law",
    "order": 216,
    "type": "term",
    "category": "농지법·취득",
    "title": "농지취득자격증명",
    "subtitle": "농지를 취득하려는 자의 소유자격을 확인하는 증명",
    "bullets": [
      "원칙적으로 관할 행정청에서 발급하며 상속·국가취득 등 예외가 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "농취증"
    ],
    "sourceKind": "summary",
    "sourcePage": 60,
    "sourceSection": "농지법·취득",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-079"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p60 · 농지법·취득"
  },
  {
    "id": "pub-card-217",
    "subject": "public_law",
    "order": 217,
    "type": "term",
    "category": "농지법·취득",
    "title": "농업경영계획서",
    "subtitle": "농지취득자격증명 신청 시 농업경영 계획을 적는 서류",
    "bullets": [
      "취득면적·노동력·농기계·이용계획 등을 포함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 60,
    "sourceSection": "농지법·취득",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p60 · 농지법·취득"
  },
  {
    "id": "pub-card-218",
    "subject": "public_law",
    "order": 218,
    "type": "term",
    "category": "농지법·취득",
    "title": "농지위원회",
    "subtitle": "농지취득자격증명 등 농지 관련 사항을 심의하는 위원회",
    "bullets": [
      "투기 우려 농지 취득 등의 심의를 통해 농지관리 공공성을 강화"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "농지법·취득",
    "sourceRef": "국가법령정보센터 「농지법」 농지위원회 관련 조문",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「농지법」 농지위원회 관련 조문"
  },
  {
    "id": "pub-card-219",
    "subject": "public_law",
    "order": 219,
    "type": "term",
    "category": "농지법·처분",
    "title": "농지 처분의무",
    "subtitle": "소유 농지를 자기 농업경영에 이용하지 않으면 처분해야 하는 의무",
    "bullets": [
      "정당한 사유 없이 미이용하면 처분의무 통지"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 61,
    "sourceSection": "농지법·처분",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p61 · 농지법·처분"
  },
  {
    "id": "pub-card-220",
    "subject": "public_law",
    "order": 220,
    "type": "term",
    "category": "농지법·처분",
    "title": "농지 처분명령",
    "subtitle": "처분의무를 이행하지 않은 농지소유자에게 내리는 처분명령",
    "bullets": [
      "불이행 시 이행강제금과 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 61,
    "sourceSection": "농지법·처분",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p61 · 농지법·처분"
  },
  {
    "id": "pub-card-221",
    "subject": "public_law",
    "order": 221,
    "type": "term",
    "category": "농지법·이용",
    "title": "대리경작자 지정",
    "subtitle": "유휴농지를 대신 경작할 자를 시장·군수 등이 지정하는 제도",
    "bullets": [
      "농업경영에 이용되지 않는 농지의 생산적 활용을 촉진"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 61,
    "sourceSection": "농지법·이용",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second1-080"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p61 · 농지법·이용"
  },
  {
    "id": "pub-card-222",
    "subject": "public_law",
    "order": 222,
    "type": "term",
    "category": "농지법·이용",
    "title": "농지 임대차",
    "subtitle": "농지의 임대를 원칙적으로 제한하되 법정 예외에서 허용하는 제도",
    "bullets": [
      "상속·이농·질병·고령 등 법정 사유에서 임대 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 62,
    "sourceSection": "농지법·이용",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p62 · 농지법·이용"
  },
  {
    "id": "pub-card-223",
    "subject": "public_law",
    "order": 223,
    "type": "term",
    "category": "농지법·이용",
    "title": "농지 위탁경영",
    "subtitle": "농지소유자가 농작업 전부 또는 일부를 다른 자에게 맡겨 경영하는 것",
    "bullets": [
      "징집·질병 등 법정 사유에서 허용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "위탁경영"
    ],
    "sourceKind": "summary",
    "sourcePage": 62,
    "sourceSection": "농지법·이용",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2023,
      2025
    ],
    "examSampleRefs": [
      "2023-34-second1-080",
      "2025-36-second1-079"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p62 · 농지법·이용"
  },
  {
    "id": "pub-card-224",
    "subject": "public_law",
    "order": 224,
    "type": "term",
    "category": "농지법·농업진흥지역",
    "title": "농업진흥지역",
    "subtitle": "농지를 효율적으로 이용·보전하기 위해 지정하는 지역",
    "bullets": [
      "농업진흥구역과 농업보호구역으로 구분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 63,
    "sourceSection": "농지법·농업진흥지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2021,
      2022,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second1-079",
      "2022-33-second1-079",
      "2024-35-2-1-048"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p63 · 농지법·농업진흥지역"
  },
  {
    "id": "pub-card-225",
    "subject": "public_law",
    "order": 225,
    "type": "term",
    "category": "농지법·농업진흥지역",
    "title": "농업진흥구역",
    "subtitle": "농업생산에 이용하도록 특별히 보전하는 구역",
    "bullets": [
      "농업생산과 직접 관련된 행위 위주로 허용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 63,
    "sourceSection": "농지법·농업진흥지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p63 · 농지법·농업진흥지역"
  },
  {
    "id": "pub-card-226",
    "subject": "public_law",
    "order": 226,
    "type": "term",
    "category": "농지법·농업진흥지역",
    "title": "농업보호구역",
    "subtitle": "농업환경을 보호하기 위해 지정하는 농업진흥지역",
    "bullets": [
      "농업진흥구역 보호를 위한 주변지역 성격"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 63,
    "sourceSection": "농지법·농업진흥지역",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p63 · 농지법·농업진흥지역"
  },
  {
    "id": "pub-card-227",
    "subject": "public_law",
    "order": 227,
    "type": "term",
    "category": "농지법·전용",
    "title": "농지전용",
    "subtitle": "농지를 농작물 경작·다년생식물 재배 외 용도로 사용하는 것",
    "bullets": [
      "농지개량 등 법정 행위는 전용에서 제외될 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 63,
    "sourceSection": "농지법·전용",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2022,
      2025
    ],
    "examSampleRefs": [
      "2022-33-second1-078",
      "2025-36-second1-061"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p63 · 농지법·전용"
  },
  {
    "id": "pub-card-228",
    "subject": "public_law",
    "order": 228,
    "type": "term",
    "category": "농지법·전용",
    "title": "농지전용허가",
    "subtitle": "농지를 다른 용도로 사용하기 위해 받는 허가",
    "bullets": [
      "농업진흥지역 여부·전용목적에 따라 허가 가능성을 판단"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 63,
    "sourceSection": "농지법·전용",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2022,
      2025
    ],
    "examSampleRefs": [
      "2022-33-second1-078",
      "2025-36-second1-061"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p63 · 농지법·전용"
  },
  {
    "id": "pub-card-229",
    "subject": "public_law",
    "order": 229,
    "type": "term",
    "category": "농지법·전용",
    "title": "농지전용신고",
    "subtitle": "일정 전용행위를 허가 대신 신고로 처리하는 절차",
    "bullets": [
      "농업인주택·농축산업 시설 등 법정 대상과 요건을 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 63,
    "sourceSection": "농지법·전용",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p63 · 농지법·전용"
  },
  {
    "id": "pub-card-230",
    "subject": "public_law",
    "order": 230,
    "type": "term",
    "category": "농지법·전용",
    "title": "타용도 일시사용허가",
    "subtitle": "농지를 일정 기간 다른 용도로 사용 후 복구하는 허가",
    "bullets": [
      "영구 전용과 달리 기간 종료 후 농지로 복구"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 64,
    "sourceSection": "농지법·전용",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p64 · 농지법·전용"
  },
  {
    "id": "pub-card-231",
    "subject": "public_law",
    "order": 231,
    "type": "term",
    "category": "농지법·전용",
    "title": "타용도 일시사용신고",
    "subtitle": "경미한 임시 사용을 신고로 처리하는 제도",
    "bullets": [
      "법정 용도·기간 범위에서 허가 대신 신고"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "농지법·전용",
    "sourceRef": "국가법령정보센터 「농지법」 타용도 일시사용신고 관련 조문",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 1,
    "examYears": [
      2024
    ],
    "examSampleRefs": [
      "2024-35-2-1-079"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「농지법」 타용도 일시사용신고 관련 조문"
  },
  {
    "id": "pub-card-232",
    "subject": "public_law",
    "order": 232,
    "type": "term",
    "category": "농지법·전용",
    "title": "농지보전부담금",
    "subtitle": "농지전용으로 감소하는 농업생산기반을 보전하기 위한 부담금",
    "bullets": [
      "농지전용허가·신고 등과 연계해 부과"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 64,
    "sourceSection": "농지법·전용",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공법 요약집 p64 · 농지법·전용"
  },
  {
    "id": "pub-card-233",
    "subject": "public_law",
    "order": 233,
    "type": "term",
    "category": "농지법·농지개량",
    "title": "농지개량",
    "subtitle": "농지 생산성 향상을 위한 성토·절토·객토 등 개량행위",
    "bullets": [
      "적정한 농지개량은 농지전용과 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 64,
    "sourceSection": "농지법·농지개량",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2025
    ],
    "examSampleRefs": [
      "2025-36-second1-080"
    ],
    "importance": 3,
    "sourceLabel": "부동산공법 요약집 p64 · 농지법·농지개량"
  },
  {
    "id": "pub-card-234",
    "subject": "public_law",
    "order": 234,
    "type": "term",
    "category": "농지법·농지개량",
    "title": "농지개량행위 신고",
    "subtitle": "성토·절토 등 일정 농지개량행위를 사전에 신고하는 제도",
    "bullets": [
      "신고서와 사업계획서 등 법정 서류를 관할 행정청에 제출"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "농지법·농지개량",
    "sourceRef": "국가법령정보센터 「농지법」 제41조의3 및 시행규칙 제52조의3",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「농지법」 제41조의3 및 시행규칙 제52조의3"
  }
];
  cards.forEach(card=>{ if(!ids.has(card.id)){ bank.cards.push(card); ids.add(card.id); } });
})();
