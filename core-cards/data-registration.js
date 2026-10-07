(() => {
  const bank=window.CORE_WORD_CARD_BANK;
  if(!bank) throw new Error('CORE_WORD_CARD_BANK base data missing');
  if(!bank.sources.includes("4.공인중개사요약_공시법.pdf 33쪽 + Q-Net 2021~2025 제32~36회 + 국가법령정보센터 2026-10-08 현행 법령")) bank.sources.push("4.공인중개사요약_공시법.pdf 33쪽 + Q-Net 2021~2025 제32~36회 + 국가법령정보센터 2026-10-08 현행 법령");
  const subject=bank.subjects.find(item=>item.code==="registration_law");
  if(subject) subject.disabled=false;
  const ids=new Set(bank.cards.map(card=>card.id));
  const cards=[
  {
    "id": "reg-card-001",
    "subject": "registration_law",
    "order": 1,
    "type": "term",
    "category": "지적제도·공시제도",
    "title": "부동산 공시제도",
    "subtitle": "부동산의 사실관계와 권리관계를 외부에 알리는 제도",
    "bullets": [
      "토지의 사실관계는 지적제도, 권리관계는 등기제도가 중심",
      "지적·등기 모두 등재 내용의 진실성을 국가가 보증하는 공신력은 인정되지 않음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "지적제도·공시제도",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p1 · 지적제도·공시제도"
  },
  {
    "id": "reg-card-002",
    "subject": "registration_law",
    "order": 2,
    "type": "term",
    "category": "지적제도·공시제도",
    "title": "지적제도",
    "subtitle": "토지의 표시와 소유자 등을 지적공부에 등록·공시하는 제도",
    "bullets": [
      "공간정보관리법을 근거로 토지를 필지 단위로 공시"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "지적제도·공시제도",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p1 · 지적제도·공시제도"
  },
  {
    "id": "reg-card-003",
    "subject": "registration_law",
    "order": 3,
    "type": "term",
    "category": "지적제도·공시제도",
    "title": "등기제도",
    "subtitle": "토지·건물의 권리관계를 등기부에 공시하는 제도",
    "bullets": [
      "부동산등기법을 근거로 법원이 등기사무를 담당"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "지적제도·공시제도",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p1 · 지적제도·공시제도"
  },
  {
    "id": "reg-card-004",
    "subject": "registration_law",
    "order": 4,
    "type": "term",
    "category": "지적제도·총론",
    "title": "세지적",
    "subtitle": "과세를 목적으로 면적 중심으로 운영되는 지적",
    "bullets": [
      "과세지적이라고도 함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "과세지적"
    ],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "지적제도·총론",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p1 · 지적제도·총론"
  },
  {
    "id": "reg-card-005",
    "subject": "registration_law",
    "order": 5,
    "type": "term",
    "category": "지적제도·총론",
    "title": "법지적",
    "subtitle": "소유권 보호를 목적으로 위치·경계를 중시하는 지적",
    "bullets": [
      "소유지적이라고도 함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "소유지적"
    ],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "지적제도·총론",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p1 · 지적제도·총론"
  },
  {
    "id": "reg-card-006",
    "subject": "registration_law",
    "order": 6,
    "type": "term",
    "category": "지적제도·총론",
    "title": "다목적지적",
    "subtitle": "토지 관련 정보를 종합 등록·관리하는 지적",
    "bullets": [
      "경제지적·종합지적이라고도 함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "경제지적",
      "종합지적"
    ],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "지적제도·총론",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p1 · 지적제도·총론"
  },
  {
    "id": "reg-card-007",
    "subject": "registration_law",
    "order": 7,
    "type": "term",
    "category": "지적제도·총론",
    "title": "도해지적",
    "subtitle": "경계점을 도면에 표시하는 지적 방식",
    "bullets": [
      "지적도·임야도가 대표적인 도해지적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "지적제도·총론",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p1 · 지적제도·총론"
  },
  {
    "id": "reg-card-008",
    "subject": "registration_law",
    "order": 8,
    "type": "term",
    "category": "지적제도·총론",
    "title": "수치지적",
    "subtitle": "경계점을 좌표로 표시하는 지적 방식",
    "bullets": [
      "경계점좌표등록부가 대표적인 수치지적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "지적제도·총론",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p1 · 지적제도·총론"
  },
  {
    "id": "reg-card-009",
    "subject": "registration_law",
    "order": 9,
    "type": "term",
    "category": "지적제도·총론",
    "title": "2차원지적",
    "subtitle": "토지 경계를 수평면에 투영하여 등록하는 방식",
    "bullets": [
      "평면지적·수평지적이라고도 함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "평면지적",
      "수평지적"
    ],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "지적제도·총론",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p1 · 지적제도·총론"
  },
  {
    "id": "reg-card-010",
    "subject": "registration_law",
    "order": 10,
    "type": "term",
    "category": "지적제도·총론",
    "title": "연속지적도",
    "subtitle": "전산화된 지적도·임야도를 연결한 도면",
    "bullets": [
      "토지이용 관련 행정에 활용되지만 지적측량에는 직접 사용할 수 없음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 1,
    "sourceSection": "지적제도·총론",
    "sourceRef": "4.공인중개사요약_공시법.pdf p1 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 연속지적도 관련 조문",
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
      "2024-35-2-2-007",
      "2025-36-second2-006"
    ],
    "importance": 3,
    "sourceLabel": "4.공인중개사요약_공시법.pdf p1 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 연속지적도 관련 조문"
  },
  {
    "id": "reg-card-011",
    "subject": "registration_law",
    "order": 11,
    "type": "term",
    "category": "지적제도·총론",
    "title": "지적기준점",
    "subtitle": "지적측량의 기준이 되는 점",
    "bullets": [
      "지적삼각점·지적삼각보조점·지적도근점으로 구분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "지적제도·총론",
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
      "2021-32-second2-005",
      "2022-33-second2-008",
      "2022-33-second2-009",
      "2023-34-second2-010",
      "2024-35-2-2-010"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p1 · 지적제도·총론"
  },
  {
    "id": "reg-card-012",
    "subject": "registration_law",
    "order": 12,
    "type": "term",
    "category": "지적제도·기본원칙",
    "title": "지적국정주의",
    "subtitle": "토지의 표시사항을 국가가 결정하는 원칙",
    "bullets": [
      "지적등록의 통일성과 획일성을 확보"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 2,
    "sourceSection": "지적제도·기본원칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p2 · 지적제도·기본원칙"
  },
  {
    "id": "reg-card-013",
    "subject": "registration_law",
    "order": 13,
    "type": "term",
    "category": "지적제도·기본원칙",
    "title": "지적형식주의",
    "subtitle": "토지표시 변동은 지적공부 등록형식을 갖춰야 공시효과가 생기는 원칙",
    "bullets": [
      "등록주의라고도 함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "지적등록주의"
    ],
    "sourceKind": "summary",
    "sourcePage": 2,
    "sourceSection": "지적제도·기본원칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p2 · 지적제도·기본원칙"
  },
  {
    "id": "reg-card-014",
    "subject": "registration_law",
    "order": 14,
    "type": "term",
    "category": "지적제도·기본원칙",
    "title": "지적공개주의",
    "subtitle": "지적공부를 일반 국민이 열람·이용할 수 있도록 하는 원칙",
    "bullets": [
      "지적공부 열람·등본 발급과 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 2,
    "sourceSection": "지적제도·기본원칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p2 · 지적제도·기본원칙"
  },
  {
    "id": "reg-card-015",
    "subject": "registration_law",
    "order": 15,
    "type": "term",
    "category": "지적제도·기본원칙",
    "title": "실질적심사주의",
    "subtitle": "지적소관청이 토지이동의 사실과 적법성을 실질적으로 심사하는 원칙",
    "bullets": [
      "등기제도의 형식적 심사와 대비"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 2,
    "sourceSection": "지적제도·기본원칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p2 · 지적제도·기본원칙"
  },
  {
    "id": "reg-card-016",
    "subject": "registration_law",
    "order": 16,
    "type": "term",
    "category": "지적제도·기본원칙",
    "title": "적극적등록주의",
    "subtitle": "전 국토를 필지 단위로 국가가 적극 등록·공시하는 원칙",
    "bullets": [
      "신청이 없어도 필요한 경우 직권등록 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 2,
    "sourceSection": "지적제도·기본원칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p2 · 지적제도·기본원칙"
  },
  {
    "id": "reg-card-017",
    "subject": "registration_law",
    "order": 17,
    "type": "term",
    "category": "지적제도·토지표시",
    "title": "토지의 표시",
    "subtitle": "지적공부에 등록하는 소재·지번·지목·면적·경계 또는 좌표",
    "bullets": [
      "토지의 물리적 현황을 나타내는 핵심 등록사항"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 2,
    "sourceSection": "지적제도·토지표시",
    "sourceRef": "4.공인중개사요약_공시법.pdf p2 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제2조",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 4,
    "examYears": [
      2022,
      2023,
      2024
    ],
    "examSampleRefs": [
      "2022-33-second2-005",
      "2022-33-second2-013",
      "2023-34-second2-006",
      "2024-35-2-2-001"
    ],
    "importance": 3,
    "sourceLabel": "4.공인중개사요약_공시법.pdf p2 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제2조"
  },
  {
    "id": "reg-card-018",
    "subject": "registration_law",
    "order": 18,
    "type": "term",
    "category": "지적제도·토지표시",
    "title": "필지",
    "subtitle": "대통령령 기준에 따라 구획되는 토지의 등록단위",
    "bullets": [
      "지적공부상 토지를 구분하는 기본 단위"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 2,
    "sourceSection": "지적제도·토지표시",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 7,
    "examYears": [
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2023-34-second2-004",
      "2024-35-2-2-002",
      "2024-35-2-2-004",
      "2024-35-2-2-005",
      "2024-35-2-2-007",
      "2025-36-second2-004",
      "2025-36-second2-011"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p2 · 지적제도·토지표시"
  },
  {
    "id": "reg-card-019",
    "subject": "registration_law",
    "order": 19,
    "type": "term",
    "category": "지적제도·토지표시",
    "title": "양입지",
    "subtitle": "주된 토지에 편입되어 하나의 필지로 정리되는 종된 토지",
    "bullets": [
      "소유자·지반이 같고 주된 용도를 보조하는 좁은 토지가 대상"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 2,
    "sourceSection": "지적제도·토지표시",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p2 · 지적제도·토지표시"
  },
  {
    "id": "reg-card-020",
    "subject": "registration_law",
    "order": 20,
    "type": "term",
    "category": "지적제도·지번",
    "title": "지번",
    "subtitle": "필지에 부여해 지적공부에 등록하는 번호",
    "bullets": [
      "본번과 부번으로 구성할 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 2,
    "sourceSection": "지적제도·지번",
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
      "2021-32-second2-007",
      "2021-32-second2-008",
      "2021-32-second2-020",
      "2022-33-second2-001",
      "2022-33-second2-003",
      "2023-34-second2-005",
      "2023-34-second2-008",
      "2023-34-second2-011",
      "2024-35-2-2-001",
      "2024-35-2-2-003"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p2 · 지적제도·지번"
  },
  {
    "id": "reg-card-021",
    "subject": "registration_law",
    "order": 21,
    "type": "term",
    "category": "지적제도·지번",
    "title": "본번",
    "subtitle": "지번의 기본이 되는 번호",
    "bullets": [
      "부번과 함께 지번을 구성"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 2,
    "sourceSection": "지적제도·지번",
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
      "2024-35-2-2-004"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p2 · 지적제도·지번"
  },
  {
    "id": "reg-card-022",
    "subject": "registration_law",
    "order": 22,
    "type": "term",
    "category": "지적제도·지번",
    "title": "부번",
    "subtitle": "본번 뒤에 붙는 세부 지번",
    "bullets": [
      "본번과 부번 사이를 하이픈으로 표시"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 2,
    "sourceSection": "지적제도·지번",
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
      "2024-35-2-2-004"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p2 · 지적제도·지번"
  },
  {
    "id": "reg-card-023",
    "subject": "registration_law",
    "order": 23,
    "type": "term",
    "category": "지적제도·지번",
    "title": "지번부여지역",
    "subtitle": "지번을 부여하는 단위지역",
    "bullets": [
      "법정 행정구역 등을 기준으로 지번을 체계적으로 부여"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 2,
    "sourceSection": "지적제도·지번",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2024
    ],
    "examSampleRefs": [
      "2024-35-2-2-004",
      "2024-35-2-2-006"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p2 · 지적제도·지번"
  },
  {
    "id": "reg-card-024",
    "subject": "registration_law",
    "order": 24,
    "type": "term",
    "category": "지적제도·지번",
    "title": "토지이동별 지번부여",
    "subtitle": "신규등록·등록전환·분할·합병 등에 따라 지번을 정하는 방식",
    "bullets": [
      "신규등록·등록전환은 인접 본번의 부번이 원칙",
      "분할은 종전 지번 유지 필지와 새 부번, 합병은 선순위 지번이 원칙"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "지적제도·지번",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p3 · 지적제도·지번"
  },
  {
    "id": "reg-card-025",
    "subject": "registration_law",
    "order": 25,
    "type": "term",
    "category": "지적제도·지번",
    "title": "지번변경",
    "subtitle": "지번이 불합리한 경우 일정 지역의 지번을 새로 정리하는 절차",
    "bullets": [
      "법정 승인절차를 거쳐 지번을 변경"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "지적제도·지번",
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
      "2024-35-2-2-001"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p3 · 지적제도·지번"
  },
  {
    "id": "reg-card-026",
    "subject": "registration_law",
    "order": 26,
    "type": "term",
    "category": "지적제도·지번",
    "title": "결번",
    "subtitle": "지번 변경·합병 등으로 사용하지 않게 된 지번",
    "bullets": [
      "결번대장에 기록해 관리"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "지적제도·지번",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p3 · 지적제도·지번"
  },
  {
    "id": "reg-card-027",
    "subject": "registration_law",
    "order": 27,
    "type": "term",
    "category": "지적제도·지목",
    "title": "지목",
    "subtitle": "토지의 주된 용도에 따라 종류를 구분해 지적공부에 등록한 것",
    "bullets": [
      "전·답·대·도로·잡종지 등 28개 지목으로 구분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "지적제도·지목",
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
      "2021-32-second2-004",
      "2021-32-second2-007",
      "2022-33-second2-001",
      "2022-33-second2-003",
      "2022-33-second2-004",
      "2023-34-second2-003",
      "2023-34-second2-012",
      "2024-35-2-2-001",
      "2024-35-2-2-002",
      "2024-35-2-2-003"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p3 · 지적제도·지목"
  },
  {
    "id": "reg-card-028",
    "subject": "registration_law",
    "order": 28,
    "type": "term",
    "category": "지적제도·지목",
    "title": "1필1목 원칙",
    "subtitle": "한 필지에는 하나의 지목만 설정하는 원칙",
    "bullets": [
      "주지목추종 원칙과 함께 지목 설정의 기본"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "지적제도·지목",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p3 · 지적제도·지목"
  },
  {
    "id": "reg-card-029",
    "subject": "registration_law",
    "order": 29,
    "type": "term",
    "category": "지적제도·지목",
    "title": "주지목추종 원칙",
    "subtitle": "여러 용도로 쓰는 토지는 주된 용도에 따라 지목을 정하는 원칙",
    "bullets": [
      "부속 토지는 주된 토지의 지목을 따를 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "지적제도·지목",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p3 · 지적제도·지목"
  },
  {
    "id": "reg-card-030",
    "subject": "registration_law",
    "order": 30,
    "type": "term",
    "category": "지적제도·지목",
    "title": "지목 28종",
    "subtitle": "공간정보관리법상 토지의 용도를 28종으로 구분",
    "bullets": [
      "전·답·과수원·목장용지·임야·대·도로·잡종지 등이 포함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "지적제도·지목",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p3 · 지적제도·지목"
  },
  {
    "id": "reg-card-031",
    "subject": "registration_law",
    "order": 31,
    "type": "term",
    "category": "지적제도·지목",
    "title": "지목 '대'",
    "subtitle": "영구적 건축물과 그 부속시설 부지에 설정하는 지목",
    "bullets": [
      "주거·사무실·점포·문화시설 등의 부지가 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "대지목"
    ],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "지적제도·지목",
    "sourceRef": "4.공인중개사요약_공시법.pdf p3",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p3 · 지적제도·지목"
  },
  {
    "id": "reg-card-032",
    "subject": "registration_law",
    "order": 32,
    "type": "term",
    "category": "지적제도·지목",
    "title": "지목 도로",
    "subtitle": "일반 공중의 교통운수를 위해 이용되는 토지의 지목",
    "bullets": [
      "고속도로 휴게소 부지 등 법정 범위를 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "도로 지목"
    ],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "지적제도·지목",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p3 · 지적제도·지목"
  },
  {
    "id": "reg-card-033",
    "subject": "registration_law",
    "order": 33,
    "type": "term",
    "category": "지적제도·지목",
    "title": "지목 사적지",
    "subtitle": "문화재로 지정된 역사적 유적·고적 등을 보존하기 위한 토지의 지목",
    "bullets": [
      "다른 지목 토지 안의 문화재 보호구역과 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "사적지"
    ],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "지적제도·지목",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2022,
      2023,
      2025
    ],
    "examSampleRefs": [
      "2022-33-second2-004",
      "2023-34-second2-003",
      "2025-36-second2-002"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p3 · 지적제도·지목"
  },
  {
    "id": "reg-card-034",
    "subject": "registration_law",
    "order": 34,
    "type": "term",
    "category": "지적제도·지목",
    "title": "지목 잡종지",
    "subtitle": "다른 지목에 속하지 않는 용도의 토지에 설정하는 지목",
    "bullets": [
      "갈대밭·야외시장·돌을 캐는 곳 등 법정 예시를 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "잡종지"
    ],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "지적제도·지목",
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
      "2024-35-2-2-008"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p3 · 지적제도·지목"
  },
  {
    "id": "reg-card-035",
    "subject": "registration_law",
    "order": 35,
    "type": "term",
    "category": "지적제도·경계",
    "title": "경계",
    "subtitle": "필지의 경계점을 직선으로 연결해 지적도면에 등록한 선",
    "bullets": [
      "경계점좌표등록부에는 좌표를 등록하고 선 자체를 등록하지 않음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "지적제도·경계",
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
      "2021-32-second2-001",
      "2021-32-second2-002",
      "2021-32-second2-005",
      "2021-32-second2-006",
      "2021-32-second2-007",
      "2022-33-second2-003",
      "2022-33-second2-009",
      "2023-34-second2-005",
      "2023-34-second2-012",
      "2024-35-2-2-003"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p3 · 지적제도·경계"
  },
  {
    "id": "reg-card-036",
    "subject": "registration_law",
    "order": 36,
    "type": "term",
    "category": "지적제도·경계",
    "title": "경계점",
    "subtitle": "필지 경계의 굴곡점 등 경계를 결정하는 점",
    "bullets": [
      "지적측량과 경계복원의 기준"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "지적제도·경계",
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
      "2021-32-second2-005",
      "2022-33-second2-009",
      "2023-34-second2-005",
      "2023-34-second2-012",
      "2024-35-2-2-003",
      "2024-35-2-2-005",
      "2024-35-2-2-010",
      "2025-36-second2-008"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p3 · 지적제도·경계"
  },
  {
    "id": "reg-card-037",
    "subject": "registration_law",
    "order": 37,
    "type": "term",
    "category": "지적제도·경계",
    "title": "지상경계",
    "subtitle": "지표상 구조물·지형 등에 의해 확인되는 토지경계",
    "bullets": [
      "연접 토지 사이 구조물의 소유관계에 따라 결정기준이 달라질 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "지적제도·경계",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2021,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-001",
      "2024-35-2-2-003",
      "2025-36-second2-008"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p4 · 지적제도·경계"
  },
  {
    "id": "reg-card-038",
    "subject": "registration_law",
    "order": 38,
    "type": "term",
    "category": "지적제도·경계",
    "title": "지상경계 결정기준",
    "subtitle": "담장·축대·구거 등 구조물에 따라 지상경계를 정하는 기준",
    "bullets": [
      "구조물 소유자가 같은지 다른지에 따라 경계 위치를 판단"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "지적제도·경계",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p4 · 지적제도·경계"
  },
  {
    "id": "reg-card-039",
    "subject": "registration_law",
    "order": 39,
    "type": "term",
    "category": "지적제도·경계",
    "title": "지상경계점등록부",
    "subtitle": "새로 정한 지상경계점의 위치와 사진 등을 등록하는 장부",
    "bullets": [
      "토지이동으로 지상경계를 새로 정한 경우 지적소관청이 작성"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "지적제도·경계",
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
      "2024-35-2-2-003",
      "2025-36-second2-008"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p4 · 지적제도·경계"
  },
  {
    "id": "reg-card-040",
    "subject": "registration_law",
    "order": 40,
    "type": "term",
    "category": "지적제도·경계",
    "title": "경계 결정 원칙",
    "subtitle": "지적도면 경계를 정할 때 적용하는 일반원칙",
    "bullets": [
      "축척종대·경계불가분·경계직선·경계국정주의가 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "지적제도·경계",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p4 · 지적제도·경계"
  },
  {
    "id": "reg-card-041",
    "subject": "registration_law",
    "order": 41,
    "type": "term",
    "category": "지적제도·면적",
    "title": "면적",
    "subtitle": "지적공부에 등록하는 필지의 수평면상 넓이",
    "bullets": [
      "축척과 지역에 따라 등록 단위·끝수처리가 달라짐"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "지적제도·면적",
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
      "2021-32-second2-007",
      "2022-33-second2-003",
      "2022-33-second2-007",
      "2022-33-second2-013",
      "2023-34-second2-004",
      "2024-35-2-2-005",
      "2024-35-2-2-007",
      "2024-35-2-2-010",
      "2024-35-2-2-012",
      "2025-36-second2-004"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p4 · 지적제도·면적"
  },
  {
    "id": "reg-card-042",
    "subject": "registration_law",
    "order": 42,
    "type": "term",
    "category": "지적제도·면적",
    "title": "면적측정",
    "subtitle": "지적측량 성과를 바탕으로 필지 면적을 계산·결정하는 절차",
    "bullets": [
      "신규등록·등록전환·분할·축척변경 등에서 실시"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "지적제도·면적",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p4 · 지적제도·면적"
  },
  {
    "id": "reg-card-043",
    "subject": "registration_law",
    "order": 43,
    "type": "term",
    "category": "지적제도·면적",
    "title": "좌표면적계산법",
    "subtitle": "경계점 좌표를 이용해 필지 면적을 계산하는 방법",
    "bullets": [
      "경계점좌표등록부 지역의 세부측량과 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "지적제도·면적",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p4 · 지적제도·면적"
  },
  {
    "id": "reg-card-044",
    "subject": "registration_law",
    "order": 44,
    "type": "term",
    "category": "지적제도·지적공부",
    "title": "지적공부",
    "subtitle": "토지의 표시와 소유자 등을 등록하는 공적 장부",
    "bullets": [
      "토지대장·임야대장·공유지연명부·대지권등록부·지적도·임야도·경계점좌표등록부"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "지적제도·지적공부",
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
      "2021-32-second2-012",
      "2022-33-second2-005",
      "2022-33-second2-007",
      "2022-33-second2-009",
      "2022-33-second2-010",
      "2022-33-second2-012",
      "2023-34-second2-006",
      "2023-34-second2-011",
      "2024-35-2-2-003",
      "2024-35-2-2-007"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p5 · 지적제도·지적공부"
  },
  {
    "id": "reg-card-045",
    "subject": "registration_law",
    "order": 45,
    "type": "term",
    "category": "지적제도·지적공부",
    "title": "토지대장",
    "subtitle": "토지의 소재·지번·지목·면적·소유자 등을 등록하는 대장",
    "bullets": [
      "임야대장 대상이 아닌 토지를 중심으로 등록"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 5,
    "sourceSection": "지적제도·지적공부",
    "sourceRef": "4.공인중개사요약_공시법.pdf p5 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제71조",
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
      "2021-32-second2-012",
      "2023-34-second2-004",
      "2023-34-second2-011",
      "2023-34-second2-016",
      "2024-35-2-2-010",
      "2025-36-second2-004",
      "2025-36-second2-010"
    ],
    "importance": 4,
    "sourceLabel": "4.공인중개사요약_공시법.pdf p5 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제71조"
  },
  {
    "id": "reg-card-046",
    "subject": "registration_law",
    "order": 46,
    "type": "term",
    "category": "지적제도·지적공부",
    "title": "임야대장",
    "subtitle": "임야 등 법정 대상 토지의 표시·소유자 등을 등록하는 대장",
    "bullets": [
      "등록사항 체계는 토지대장과 유사"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "지적제도·지적공부",
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
      "2021-32-second2-012"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p5 · 지적제도·지적공부"
  },
  {
    "id": "reg-card-047",
    "subject": "registration_law",
    "order": 47,
    "type": "term",
    "category": "지적제도·지적공부",
    "title": "공유지연명부",
    "subtitle": "한 필지를 둘 이상이 공동소유할 때 지분·소유자 정보를 등록하는 장부",
    "bullets": [
      "토지의 소재·지번·지분·소유자 등이 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 5,
    "sourceSection": "지적제도·지적공부",
    "sourceRef": "4.공인중개사요약_공시법.pdf p5 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제71조 제2항",
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
      "2024-35-2-2-010",
      "2025-36-second2-010"
    ],
    "importance": 3,
    "sourceLabel": "4.공인중개사요약_공시법.pdf p5 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제71조 제2항"
  },
  {
    "id": "reg-card-048",
    "subject": "registration_law",
    "order": 48,
    "type": "term",
    "category": "지적제도·지적공부",
    "title": "대지권등록부",
    "subtitle": "집합건물 대지권에 관한 토지·비율·소유자 등을 등록하는 장부",
    "bullets": [
      "대지권 등기된 토지에 대해 작성"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 5,
    "sourceSection": "지적제도·지적공부",
    "sourceRef": "4.공인중개사요약_공시법.pdf p5 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제71조 제3항",
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
      "2021-32-second2-008",
      "2022-33-second2-001",
      "2024-35-2-2-010"
    ],
    "importance": 3,
    "sourceLabel": "4.공인중개사요약_공시법.pdf p5 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제71조 제3항"
  },
  {
    "id": "reg-card-049",
    "subject": "registration_law",
    "order": 49,
    "type": "term",
    "category": "지적제도·지적공부",
    "title": "경계점좌표등록부",
    "subtitle": "경계점 위치를 좌표로 등록하는 지적공부",
    "bullets": [
      "지적확정측량·축척변경 지역 등 수치지역에서 작성"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "지적제도·지적공부",
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
      "2021-32-second2-005",
      "2023-34-second2-005",
      "2024-35-2-2-003",
      "2024-35-2-2-005",
      "2024-35-2-2-010",
      "2025-36-second2-008"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p5 · 지적제도·지적공부"
  },
  {
    "id": "reg-card-050",
    "subject": "registration_law",
    "order": 50,
    "type": "term",
    "category": "지적제도·지적공부",
    "title": "지적도",
    "subtitle": "토지의 지번·지목·경계 등을 도면으로 등록하는 지적공부",
    "bullets": [
      "여러 축척을 사용하며 도해지적의 대표 장부"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "지적제도·지적공부",
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
      "2021-32-second2-002",
      "2021-32-second2-005",
      "2022-33-second2-008",
      "2023-34-second2-004",
      "2023-34-second2-005",
      "2023-34-second2-008",
      "2023-34-second2-012",
      "2024-35-2-2-006",
      "2024-35-2-2-007",
      "2024-35-2-2-009"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p5 · 지적제도·지적공부"
  },
  {
    "id": "reg-card-051",
    "subject": "registration_law",
    "order": 51,
    "type": "term",
    "category": "지적제도·지적공부",
    "title": "임야도",
    "subtitle": "임야 등의 지번·지목·경계를 도면으로 등록하는 지적공부",
    "bullets": [
      "법정 축척은 1/3000과 1/6000"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "지적제도·지적공부",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 7,
    "examYears": [
      2021,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-002",
      "2021-32-second2-003",
      "2021-32-second2-005",
      "2024-35-2-2-007",
      "2024-35-2-2-009",
      "2025-36-second2-006",
      "2025-36-second2-011"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p5 · 지적제도·지적공부"
  },
  {
    "id": "reg-card-052",
    "subject": "registration_law",
    "order": 52,
    "type": "term",
    "category": "지적제도·지적공부",
    "title": "부동산종합공부",
    "subtitle": "토지·건축물·이용규제·가격·권리정보를 종합한 공부",
    "bullets": [
      "지적소관청이 관리·운영하고 종합증명서를 발급"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 5,
    "sourceSection": "지적제도·지적공부",
    "sourceRef": "4.공인중개사요약_공시법.pdf p5 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제76조의2~제76조의5",
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
      "2021-32-second2-011",
      "2025-36-second2-003"
    ],
    "importance": 3,
    "sourceLabel": "4.공인중개사요약_공시법.pdf p5 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제76조의2~제76조의5"
  },
  {
    "id": "reg-card-053",
    "subject": "registration_law",
    "order": 53,
    "type": "term",
    "category": "지적제도·지적공부",
    "title": "일람도",
    "subtitle": "지적도·임야도의 배치와 접속관계를 보여주는 보조도면",
    "bullets": [
      "개별 필지의 면적·소유자를 등록하는 지적공부는 아님"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "지적제도·지적공부",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p5 · 지적제도·지적공부"
  },
  {
    "id": "reg-card-054",
    "subject": "registration_law",
    "order": 54,
    "type": "term",
    "category": "지적제도·지적공부",
    "title": "지적공부 복구",
    "subtitle": "멸실·훼손된 지적공부를 관계 자료에 따라 복구하는 절차",
    "bullets": [
      "지적소관청은 전부 또는 일부가 멸실·훼손되면 지체 없이 복구"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 6,
    "sourceSection": "지적제도·지적공부",
    "sourceRef": "4.공인중개사요약_공시법.pdf p6 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제74조",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "4.공인중개사요약_공시법.pdf p6 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제74조"
  },
  {
    "id": "reg-card-055",
    "subject": "registration_law",
    "order": 55,
    "type": "term",
    "category": "지적제도·지적공부",
    "title": "지적공부 열람·등본",
    "subtitle": "지적공부를 열람하거나 등본을 발급받는 제도",
    "bullets": [
      "원칙적으로 지적소관청에 신청하고 전산공부는 법정 기관에서도 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "지적공부 열람"
    ],
    "sourceKind": "summary+official",
    "sourcePage": 6,
    "sourceSection": "지적제도·지적공부",
    "sourceRef": "4.공인중개사요약_공시법.pdf p6 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제75조",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "4.공인중개사요약_공시법.pdf p6 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제75조"
  },
  {
    "id": "reg-card-056",
    "subject": "registration_law",
    "order": 56,
    "type": "term",
    "category": "지적제도·지적공부",
    "title": "지적전산자료",
    "subtitle": "지적공부에 관한 전산정보를 이용·활용하는 자료",
    "bullets": [
      "이용 범위에 따라 관계 기관의 심사·승인 절차가 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "지적제도·지적공부",
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
      "2022-33-second2-006"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p6 · 지적제도·지적공부"
  },
  {
    "id": "reg-card-057",
    "subject": "registration_law",
    "order": 57,
    "type": "term",
    "category": "지적제도·토지이동",
    "title": "토지이동",
    "subtitle": "토지의 표시가 새로 정해지거나 변경·말소되는 것",
    "bullets": [
      "신규등록·등록전환·분할·합병·지목변경·축척변경 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "지적제도·토지이동",
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
      "2021-32-second2-006",
      "2021-32-second2-007",
      "2022-33-second2-003",
      "2022-33-second2-007",
      "2022-33-second2-012",
      "2023-34-second2-001",
      "2023-34-second2-011",
      "2024-35-2-2-007",
      "2025-36-second2-011"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p6 · 지적제도·토지이동"
  },
  {
    "id": "reg-card-058",
    "subject": "registration_law",
    "order": 58,
    "type": "term",
    "category": "지적제도·토지이동",
    "title": "신규등록",
    "subtitle": "새로 생긴 토지 등 미등록 토지를 지적공부에 처음 등록하는 것",
    "bullets": [
      "새로운 필지의 지번·지목·면적·경계 등을 등록"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "지적제도·토지이동",
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
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-002",
      "2022-33-second2-010",
      "2023-34-second2-004",
      "2024-35-2-2-001",
      "2025-36-second2-001",
      "2025-36-second2-004"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p6 · 지적제도·토지이동"
  },
  {
    "id": "reg-card-059",
    "subject": "registration_law",
    "order": 59,
    "type": "term",
    "category": "지적제도·토지이동",
    "title": "등록전환",
    "subtitle": "임야대장·임야도 토지를 토지대장·지적도로 옮겨 등록하는 것",
    "bullets": [
      "보통 지목변경·형질변경 등과 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 7,
    "sourceSection": "지적제도·토지이동",
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
      "2021-32-second2-002",
      "2021-32-second2-009",
      "2022-33-second2-010",
      "2024-35-2-2-004",
      "2025-36-second2-001"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p7 · 지적제도·토지이동"
  },
  {
    "id": "reg-card-060",
    "subject": "registration_law",
    "order": 60,
    "type": "term",
    "category": "지적제도·토지이동",
    "title": "분할",
    "subtitle": "1필지를 둘 이상의 필지로 나누어 등록하는 것",
    "bullets": [
      "분할 후 새 지번·면적·경계를 정리"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 7,
    "sourceSection": "지적제도·토지이동",
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
      "2021-32-second2-002",
      "2021-32-second2-016",
      "2021-32-second2-017",
      "2022-33-second2-019",
      "2023-34-second2-016",
      "2024-35-2-2-005",
      "2024-35-2-2-018",
      "2025-36-second2-008",
      "2025-36-second2-017",
      "2025-36-second2-018"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p7 · 지적제도·토지이동"
  },
  {
    "id": "reg-card-061",
    "subject": "registration_law",
    "order": 61,
    "type": "term",
    "category": "지적제도·토지이동",
    "title": "합병",
    "subtitle": "둘 이상의 필지를 하나의 필지로 합하여 등록하는 것",
    "bullets": [
      "지번부여지역·지목·소유자·축척 등 합병제한을 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 7,
    "sourceSection": "지적제도·토지이동",
    "sourceRef": "4.공인중개사요약_공시법.pdf p7 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제80조",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 6,
    "examYears": [
      2024,
      2025
    ],
    "examSampleRefs": [
      "2024-35-2-2-001",
      "2024-35-2-2-006",
      "2024-35-2-2-014",
      "2025-36-second2-001",
      "2025-36-second2-014",
      "2025-36-second2-022"
    ],
    "importance": 4,
    "sourceLabel": "4.공인중개사요약_공시법.pdf p7 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제80조"
  },
  {
    "id": "reg-card-062",
    "subject": "registration_law",
    "order": 62,
    "type": "term",
    "category": "지적제도·토지이동",
    "title": "합병 제한",
    "subtitle": "법정 사유가 있으면 토지 합병을 신청할 수 없는 제한",
    "bullets": [
      "지번부여지역·지목·소유자·축척이 다르거나 일정 권리등기가 있으면 제한"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "합병 신청 제한"
    ],
    "sourceKind": "summary+official",
    "sourcePage": 7,
    "sourceSection": "지적제도·토지이동",
    "sourceRef": "4.공인중개사요약_공시법.pdf p7 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제80조 제3항",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "4.공인중개사요약_공시법.pdf p7 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제80조 제3항"
  },
  {
    "id": "reg-card-063",
    "subject": "registration_law",
    "order": 63,
    "type": "term",
    "category": "지적제도·토지이동",
    "title": "지목변경",
    "subtitle": "토지의 주된 용도가 바뀐 때 지목을 변경해 등록하는 것",
    "bullets": [
      "관계 법령상 공사완료·용도변경 사실과 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 7,
    "sourceSection": "지적제도·토지이동",
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
      "2024-35-2-2-001"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p7 · 지적제도·토지이동"
  },
  {
    "id": "reg-card-064",
    "subject": "registration_law",
    "order": 64,
    "type": "term",
    "category": "지적제도·축척변경",
    "title": "축척변경",
    "subtitle": "지적도 경계의 정밀도를 높이기 위해 더 큰 축척으로 바꾸는 것",
    "bullets": [
      "축척변경위원회·청산금·확정공고 절차와 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 7,
    "sourceSection": "지적제도·축척변경",
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
      "2021-32-second2-010",
      "2022-33-second2-002",
      "2022-33-second2-007",
      "2022-33-second2-010",
      "2022-33-second2-011",
      "2023-34-second2-008",
      "2023-34-second2-011",
      "2024-35-2-2-001",
      "2024-35-2-2-012",
      "2025-36-second2-007"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p7 · 지적제도·축척변경"
  },
  {
    "id": "reg-card-065",
    "subject": "registration_law",
    "order": 65,
    "type": "term",
    "category": "지적제도·축척변경",
    "title": "축척변경위원회",
    "subtitle": "축척변경의 청산·이의 등을 심의·의결하는 위원회",
    "bullets": [
      "토지소유자 대표와 전문가 등으로 구성"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 8,
    "sourceSection": "지적제도·축척변경",
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
      "2021-32-second2-010",
      "2022-33-second2-002",
      "2022-33-second2-007",
      "2024-35-2-2-012",
      "2025-36-second2-007"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p8 · 지적제도·축척변경"
  },
  {
    "id": "reg-card-066",
    "subject": "registration_law",
    "order": 66,
    "type": "term",
    "category": "지적제도·축척변경",
    "title": "축척변경 청산금",
    "subtitle": "축척변경으로 생긴 면적 증감의 가액을 정산하는 금액",
    "bullets": [
      "면적 증감에 따라 징수 또는 지급"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 8,
    "sourceSection": "지적제도·축척변경",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p8 · 지적제도·축척변경"
  },
  {
    "id": "reg-card-067",
    "subject": "registration_law",
    "order": 67,
    "type": "term",
    "category": "지적제도·정정",
    "title": "등록사항정정",
    "subtitle": "지적공부 등록사항의 오류를 바로잡는 절차",
    "bullets": [
      "토지소유자 신청 또는 지적소관청 직권으로 정정"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 8,
    "sourceSection": "지적제도·정정",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p8 · 지적제도·정정"
  },
  {
    "id": "reg-card-068",
    "subject": "registration_law",
    "order": 68,
    "type": "term",
    "category": "지적제도·정정",
    "title": "직권정정",
    "subtitle": "지적소관청이 법정 오류를 직접 조사·측량해 바로잡는 것",
    "bullets": [
      "토지이동정리 결의서와 다르게 정리된 경우 등이 대상"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 8,
    "sourceSection": "지적제도·정정",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p8 · 지적제도·정정"
  },
  {
    "id": "reg-card-069",
    "subject": "registration_law",
    "order": 69,
    "type": "term",
    "category": "지적제도·개발사업",
    "title": "토지개발사업 신고",
    "subtitle": "개발사업 시행자가 착수·변경·완료 사실을 지적소관청에 신고하는 절차",
    "bullets": [
      "도시개발·농어촌정비 등 지적확정측량 대상 사업과 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "지적제도·개발사업",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p9 · 지적제도·개발사업"
  },
  {
    "id": "reg-card-070",
    "subject": "registration_law",
    "order": 70,
    "type": "term",
    "category": "지적제도·개발사업",
    "title": "지적확정측량",
    "subtitle": "개발사업 완료 후 새 필지의 경계·좌표·면적을 확정하는 측량",
    "bullets": [
      "사업 완료에 따른 토지이동 정리의 기초"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "지적제도·개발사업",
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
      "2025-36-second2-008"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p9 · 지적제도·개발사업"
  },
  {
    "id": "reg-card-071",
    "subject": "registration_law",
    "order": 71,
    "type": "term",
    "category": "지적제도·지적측량",
    "title": "지적측량",
    "subtitle": "필지 경계·좌표·면적을 정해 등록하거나 경계를 지상에 복원하는 측량",
    "bullets": [
      "지적확정측량·지적재조사측량을 포함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 9,
    "sourceSection": "지적제도·지적측량",
    "sourceRef": "4.공인중개사요약_공시법.pdf p9 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제2조 제4호",
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
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-002",
      "2021-32-second2-006",
      "2021-32-second2-009",
      "2022-33-second2-008",
      "2022-33-second2-009",
      "2022-33-second2-012",
      "2023-34-second2-001",
      "2023-34-second2-010",
      "2025-36-second2-001",
      "2025-36-second2-008"
    ],
    "importance": 5,
    "sourceLabel": "4.공인중개사요약_공시법.pdf p9 + 국가법령정보센터 「공간정보의 구축 및 관리 등에 관한 법률」 제2조 제4호"
  },
  {
    "id": "reg-card-072",
    "subject": "registration_law",
    "order": 72,
    "type": "term",
    "category": "지적제도·지적측량",
    "title": "지적측량수행자",
    "subtitle": "지적측량을 수행하는 법정 자격·기관",
    "bullets": [
      "한국국토정보공사와 등록된 지적측량업자 등이 수행"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "지적제도·지적측량",
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
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-009",
      "2022-33-second2-008",
      "2023-34-second2-010",
      "2025-36-second2-001",
      "2025-36-second2-008",
      "2025-36-second2-012"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p9 · 지적제도·지적측량"
  },
  {
    "id": "reg-card-073",
    "subject": "registration_law",
    "order": 73,
    "type": "term",
    "category": "지적제도·지적측량",
    "title": "경계복원측량",
    "subtitle": "지적공부에 등록된 경계점을 지상에 복원하는 측량",
    "bullets": [
      "토지경계 확인을 위해 실시"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "지적제도·지적측량",
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
      "2021-32-second2-002"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p9 · 지적제도·지적측량"
  },
  {
    "id": "reg-card-074",
    "subject": "registration_law",
    "order": 74,
    "type": "term",
    "category": "지적제도·지적측량",
    "title": "지적현황측량",
    "subtitle": "지상 건축물·구조물 현황을 지적도 경계와 대비해 표시하는 측량",
    "bullets": [
      "건축물 위치 등 현황 파악에 이용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "지적제도·지적측량",
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
      "2021-32-second2-002"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p9 · 지적제도·지적측량"
  },
  {
    "id": "reg-card-075",
    "subject": "registration_law",
    "order": 75,
    "type": "term",
    "category": "지적제도·지적측량",
    "title": "분할측량",
    "subtitle": "토지를 분할하기 위해 새 경계점과 면적을 정하는 측량",
    "bullets": [
      "분할 토지이동 신청의 기초"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "지적제도·지적측량",
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
      "2021-32-second2-002"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p9 · 지적제도·지적측량"
  },
  {
    "id": "reg-card-076",
    "subject": "registration_law",
    "order": 76,
    "type": "term",
    "category": "지적제도·지적측량",
    "title": "등록전환측량",
    "subtitle": "임야대장 토지를 토지대장으로 옮기기 위해 실시하는 측량",
    "bullets": [
      "등록전환 토지의 경계·면적을 결정"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "지적제도·지적측량",
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
      "2021-32-second2-002"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p9 · 지적제도·지적측량"
  },
  {
    "id": "reg-card-077",
    "subject": "registration_law",
    "order": 77,
    "type": "term",
    "category": "지적제도·지적측량",
    "title": "지적기준점측량",
    "subtitle": "지적삼각점·보조점·도근점 등 기준점을 설치·측정하는 측량",
    "bullets": [
      "세부측량의 기준이 되는 점을 정함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 10,
    "sourceSection": "지적제도·지적측량",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p10 · 지적제도·지적측량"
  },
  {
    "id": "reg-card-078",
    "subject": "registration_law",
    "order": 78,
    "type": "term",
    "category": "지적제도·지적측량",
    "title": "지적삼각점",
    "subtitle": "광범위한 지적측량의 기준이 되는 상위 기준점",
    "bullets": [
      "시·도지사가 성과를 관리하는 기준점"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 10,
    "sourceSection": "지적제도·지적측량",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p10 · 지적제도·지적측량"
  },
  {
    "id": "reg-card-079",
    "subject": "registration_law",
    "order": 79,
    "type": "term",
    "category": "지적제도·지적측량",
    "title": "지적삼각보조점",
    "subtitle": "지적삼각점을 보완하는 지적기준점",
    "bullets": [
      "지적소관청이 성과를 관리"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 10,
    "sourceSection": "지적제도·지적측량",
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
      "2022-33-second2-008"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p10 · 지적제도·지적측량"
  },
  {
    "id": "reg-card-080",
    "subject": "registration_law",
    "order": 80,
    "type": "term",
    "category": "지적제도·지적측량",
    "title": "지적도근점",
    "subtitle": "세부 지적측량에 가까이 사용하는 기준점",
    "bullets": [
      "지적소관청이 성과를 관리"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 10,
    "sourceSection": "지적제도·지적측량",
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
      "2022-33-second2-008"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p10 · 지적제도·지적측량"
  },
  {
    "id": "reg-card-081",
    "subject": "registration_law",
    "order": 81,
    "type": "term",
    "category": "지적제도·지적측량",
    "title": "지적측량성과",
    "subtitle": "지적측량으로 결정된 경계·좌표·면적 등의 결과",
    "bullets": [
      "검사 대상 측량은 지적소관청의 성과검사를 거침"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 10,
    "sourceSection": "지적제도·지적측량",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 4,
    "examYears": [
      2021,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-009",
      "2025-36-second2-001",
      "2025-36-second2-011",
      "2025-36-second2-012"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p10 · 지적제도·지적측량"
  },
  {
    "id": "reg-card-082",
    "subject": "registration_law",
    "order": 82,
    "type": "term",
    "category": "지적제도·지적측량",
    "title": "지적측량 적부심사",
    "subtitle": "지적측량성과에 다툼이 있을 때 적정성을 심사하는 절차",
    "bullets": [
      "지방지적위원회 심의·의결과 재심사 절차로 이어질 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 10,
    "sourceSection": "지적제도·지적측량",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2021,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-006",
      "2025-36-second2-009",
      "2025-36-second2-012"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p10 · 지적제도·지적측량"
  },
  {
    "id": "reg-card-083",
    "subject": "registration_law",
    "order": 83,
    "type": "term",
    "category": "지적제도·지적위원회",
    "title": "지방지적위원회",
    "subtitle": "지적측량 적부심사 등을 심의·의결하는 시도 단위 위원회",
    "bullets": [
      "적부심사 청구의 1차 심의기관"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 10,
    "sourceSection": "지적제도·지적위원회",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2021,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-006",
      "2024-35-2-2-007",
      "2025-36-second2-009"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p10 · 지적제도·지적위원회"
  },
  {
    "id": "reg-card-084",
    "subject": "registration_law",
    "order": 84,
    "type": "term",
    "category": "지적제도·지적위원회",
    "title": "중앙지적위원회",
    "subtitle": "지적제도·측량 관련 중요사항과 재심사 등을 담당하는 중앙 위원회",
    "bullets": [
      "국토교통부에 두는 지적위원회"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 10,
    "sourceSection": "지적제도·지적위원회",
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
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-006",
      "2023-34-second2-009",
      "2024-35-2-2-007",
      "2025-36-second2-012"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p10 · 지적제도·지적위원회"
  },
  {
    "id": "reg-card-085",
    "subject": "registration_law",
    "order": 85,
    "type": "term",
    "category": "등기제도·총론",
    "title": "등기부",
    "subtitle": "전산정보처리조직에 입력·처리된 등기정보자료를 편성한 공적 장부",
    "bullets": [
      "토지등기부와 건물등기부로 구분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 11,
    "sourceSection": "등기제도·총론",
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
      "2022-33-second2-015"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p11 · 등기제도·총론"
  },
  {
    "id": "reg-card-086",
    "subject": "registration_law",
    "order": 86,
    "type": "term",
    "category": "등기제도·총론",
    "title": "등기기록",
    "subtitle": "1필의 토지 또는 1개의 건물에 관한 등기정보자료",
    "bullets": [
      "부동산별로 하나의 등기기록을 구성"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 11,
    "sourceSection": "등기제도·총론",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 11,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-013",
      "2021-32-second2-020",
      "2021-32-second2-023",
      "2022-33-second2-015",
      "2022-33-second2-017",
      "2023-34-second2-017",
      "2023-34-second2-018",
      "2023-34-second2-022",
      "2024-35-2-2-013",
      "2024-35-2-2-021"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p11 · 등기제도·총론"
  },
  {
    "id": "reg-card-087",
    "subject": "registration_law",
    "order": 87,
    "type": "term",
    "category": "등기제도·총론",
    "title": "등기필정보",
    "subtitle": "새로운 권리자를 확인하기 위해 등기관이 작성하는 정보",
    "bullets": [
      "등기의무자의 본인확인과 다음 등기신청에 활용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 11,
    "sourceSection": "등기제도·총론",
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
      "2022-33-second2-013",
      "2023-34-second2-024",
      "2024-35-2-2-015",
      "2025-36-second2-015"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p11 · 등기제도·총론"
  },
  {
    "id": "reg-card-088",
    "subject": "registration_law",
    "order": 88,
    "type": "concept",
    "category": "등기제도·총론",
    "title": "등기할 수 있는 권리",
    "subtitle": "부동산등기법상 등기대상이 되는 권리",
    "bullets": [
      "소유권·지상권·지역권·전세권·저당권·권리질권·채권담보권·임차권"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 11,
    "sourceSection": "등기제도·총론",
    "sourceRef": "4.공인중개사요약_공시법.pdf p11 + 국가법령정보센터 「부동산등기법」 제3조",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "4.공인중개사요약_공시법.pdf p11 + 국가법령정보센터 「부동산등기법」 제3조"
  },
  {
    "id": "reg-card-089",
    "subject": "registration_law",
    "order": 89,
    "type": "term",
    "category": "등기제도·총론",
    "title": "등기 순위",
    "subtitle": "같은 부동산에 등기된 권리의 우선순위를 정하는 기준",
    "bullets": [
      "같은 구는 순위번호, 다른 구는 접수번호",
      "부기등기는 원칙적으로 주등기의 순위를 따름"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 11,
    "sourceSection": "등기제도·총론",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p11 · 등기제도·총론"
  },
  {
    "id": "reg-card-090",
    "subject": "registration_law",
    "order": 90,
    "type": "term",
    "category": "등기제도·총론",
    "title": "등기 효력발생시기",
    "subtitle": "등기관이 등기를 마치면 접수한 때부터 효력이 발생",
    "bullets": [
      "등기완료시점과 효력발생시점을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 11,
    "sourceSection": "등기제도·총론",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p11 · 등기제도·총론"
  },
  {
    "id": "reg-card-091",
    "subject": "registration_law",
    "order": 91,
    "type": "term",
    "category": "등기제도·총론",
    "title": "등기의 기능",
    "subtitle": "등기가 부동산권리변동에서 수행하는 법적 기능",
    "bullets": [
      "법률행위에 의한 물권변동은 성립요건",
      "임차권 등은 대항요건, 상속·수용 취득권리는 처분 전 등기가 필요한 경우가 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 11,
    "sourceSection": "등기제도·총론",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p11 · 등기제도·총론"
  },
  {
    "id": "reg-card-092",
    "subject": "registration_law",
    "order": 92,
    "type": "term",
    "category": "등기제도·등기종류",
    "title": "기입등기",
    "subtitle": "새로운 등기원인으로 등기기록에 새 권리를 기재하는 등기",
    "bullets": [
      "소유권보존·이전·전세권설정 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 11,
    "sourceSection": "등기제도·등기종류",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p11 · 등기제도·등기종류"
  },
  {
    "id": "reg-card-093",
    "subject": "registration_law",
    "order": 93,
    "type": "term",
    "category": "등기제도·등기종류",
    "title": "변경등기",
    "subtitle": "등기 후 생긴 사유로 등기사항 일부가 실체관계와 달라져 고치는 등기",
    "bullets": [
      "후발적 불일치를 바로잡음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 11,
    "sourceSection": "등기제도·등기종류",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 19,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-014",
      "2021-32-second2-017",
      "2021-32-second2-018",
      "2021-32-second2-020",
      "2021-32-second2-022",
      "2021-32-second2-024",
      "2022-33-second2-019",
      "2022-33-second2-024",
      "2023-34-second2-006",
      "2023-34-second2-016"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p11 · 등기제도·등기종류"
  },
  {
    "id": "reg-card-094",
    "subject": "registration_law",
    "order": 94,
    "type": "term",
    "category": "등기제도·등기종류",
    "title": "경정등기",
    "subtitle": "등기 당시부터 존재한 착오·누락을 바로잡는 등기",
    "bullets": [
      "원시적 일부 불일치를 고침"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 11,
    "sourceSection": "등기제도·등기종류",
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
      "2024-35-2-2-014"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p11 · 등기제도·등기종류"
  },
  {
    "id": "reg-card-095",
    "subject": "registration_law",
    "order": 95,
    "type": "term",
    "category": "등기제도·등기종류",
    "title": "말소등기",
    "subtitle": "등기사항 전부가 실체관계와 불일치할 때 그 등기를 소멸시키는 등기",
    "bullets": [
      "원시적·후발적 사유 모두 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 12,
    "sourceSection": "등기제도·등기종류",
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
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-014",
      "2022-33-second2-014",
      "2022-33-second2-022",
      "2022-33-second2-024",
      "2024-35-2-2-014",
      "2024-35-2-2-017",
      "2025-36-second2-013",
      "2025-36-second2-024"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p12 · 등기제도·등기종류"
  },
  {
    "id": "reg-card-096",
    "subject": "registration_law",
    "order": 96,
    "type": "term",
    "category": "등기제도·등기종류",
    "title": "멸실등기",
    "subtitle": "등기된 부동산 자체가 물리적으로 없어졌을 때 하는 표시등기",
    "bullets": [
      "등기기록을 폐쇄하는 사실의 등기"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 12,
    "sourceSection": "등기제도·등기종류",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 3,
    "examYears": [
      2022,
      2024
    ],
    "examSampleRefs": [
      "2022-33-second2-016",
      "2022-33-second2-019",
      "2024-35-2-2-016"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p12 · 등기제도·등기종류"
  },
  {
    "id": "reg-card-097",
    "subject": "registration_law",
    "order": 97,
    "type": "term",
    "category": "등기제도·등기종류",
    "title": "말소회복등기",
    "subtitle": "부적법하게 말소된 등기를 말소 전 상태로 회복하는 등기",
    "bullets": [
      "전부 회복은 주등기, 일부 회복은 부기등기"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 12,
    "sourceSection": "등기제도·등기종류",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p12 · 등기제도·등기종류"
  },
  {
    "id": "reg-card-098",
    "subject": "registration_law",
    "order": 98,
    "type": "term",
    "category": "등기제도·등기종류",
    "title": "주등기",
    "subtitle": "독립된 순위번호·표시번호로 행하는 등기",
    "bullets": [
      "보존·이전·설정·말소 등 독립된 권리를 표시"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 12,
    "sourceSection": "등기제도·등기종류",
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
      "2021-32-second2-020",
      "2021-32-second2-024",
      "2023-34-second2-019",
      "2025-36-second2-017"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p12 · 등기제도·등기종류"
  },
  {
    "id": "reg-card-099",
    "subject": "registration_law",
    "order": 99,
    "type": "term",
    "category": "등기제도·등기종류",
    "title": "부기등기",
    "subtitle": "기존 주등기의 순위·효력을 유지하며 덧붙이는 등기",
    "bullets": [
      "소유권 외 권리의 이전·등기명의인표시변경 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 12,
    "sourceSection": "등기제도·등기종류",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 5,
    "examYears": [
      2021,
      2023,
      2024
    ],
    "examSampleRefs": [
      "2021-32-second2-020",
      "2023-34-second2-015",
      "2024-35-2-2-018",
      "2024-35-2-2-020",
      "2024-35-2-2-024"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p12 · 등기제도·등기종류"
  },
  {
    "id": "reg-card-100",
    "subject": "registration_law",
    "order": 100,
    "type": "term",
    "category": "등기제도·등기종류",
    "title": "종국등기",
    "subtitle": "권리변동을 최종적으로 공시하는 본등기",
    "bullets": [
      "가등기와 대비"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "본등기"
    ],
    "sourceKind": "summary",
    "sourcePage": 12,
    "sourceSection": "등기제도·등기종류",
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
      "2021-32-second2-022",
      "2021-32-second2-023",
      "2022-33-second2-016",
      "2022-33-second2-021",
      "2022-33-second2-023",
      "2023-34-second2-015",
      "2023-34-second2-019",
      "2024-35-2-2-022",
      "2024-35-2-2-024",
      "2025-36-second2-023"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p12 · 등기제도·등기종류"
  },
  {
    "id": "reg-card-101",
    "subject": "registration_law",
    "order": 101,
    "type": "term",
    "category": "등기제도·등기종류",
    "title": "가등기",
    "subtitle": "장래 본등기의 순위를 보전하기 위한 예비등기",
    "bullets": [
      "물권·임차권 변동을 목적으로 하는 청구권을 보전"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 12,
    "sourceSection": "등기제도·등기종류",
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
      "2021-32-second2-014",
      "2021-32-second2-022",
      "2021-32-second2-023",
      "2022-33-second2-016",
      "2022-33-second2-021",
      "2022-33-second2-023",
      "2022-33-second2-024",
      "2023-34-second2-015",
      "2023-34-second2-019",
      "2024-35-2-2-022"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p12 · 등기제도·등기종류"
  },
  {
    "id": "reg-card-102",
    "subject": "registration_law",
    "order": 102,
    "type": "term",
    "category": "등기제도·기관",
    "title": "등기소",
    "subtitle": "부동산 소재지에 따라 등기사무를 관할하는 법원기관",
    "bullets": [
      "원칙적으로 부동산 소재지 관할 등기소가 처리"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 13,
    "sourceSection": "등기제도·기관",
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
      "2021-32-second2-018",
      "2022-33-second2-013",
      "2022-33-second2-017",
      "2023-34-second2-024",
      "2024-35-2-2-015",
      "2024-35-2-2-021",
      "2024-35-2-2-023",
      "2025-36-second2-015",
      "2025-36-second2-024"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p13 · 등기제도·기관"
  },
  {
    "id": "reg-card-103",
    "subject": "registration_law",
    "order": 103,
    "type": "term",
    "category": "등기제도·기관",
    "title": "등기소 관할",
    "subtitle": "부동산 소재지에 따라 등기사무를 담당할 등기소를 정하는 원칙",
    "bullets": [
      "현행법에는 관련 사건과 상속·유증의 관할 특례가 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 13,
    "sourceSection": "등기제도·기관",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p13 · 등기제도·기관"
  },
  {
    "id": "reg-card-104",
    "subject": "registration_law",
    "order": 104,
    "type": "term",
    "category": "등기제도·기관",
    "title": "관련 사건 관할 특례",
    "subtitle": "관할이 다른 여러 부동산의 관련 등기를 한 등기소에서 처리할 수 있는 특례",
    "bullets": [
      "등기목적·원인이 같거나 규칙이 정하는 관련 신청에 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "관련 사건의 관할"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "등기제도·기관",
    "sourceRef": "국가법령정보센터 「부동산등기법」 제7조의2",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「부동산등기법」 제7조의2"
  },
  {
    "id": "reg-card-105",
    "subject": "registration_law",
    "order": 105,
    "type": "term",
    "category": "등기제도·기관",
    "title": "상속·유증 관할 특례",
    "subtitle": "상속·유증 관련 여러 부동산의 등기를 한 등기소에 신청할 수 있는 현행 특례",
    "bullets": [
      "2025년 시행 개정으로 여러 관할 부동산의 신청 편의를 확대"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "상속 유증 관할"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "등기제도·기관",
    "sourceRef": "국가법령정보센터 「부동산등기법」 제7조의3",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「부동산등기법」 제7조의3"
  },
  {
    "id": "reg-card-106",
    "subject": "registration_law",
    "order": 106,
    "type": "term",
    "category": "등기제도·기관",
    "title": "등기관",
    "subtitle": "지방법원장이 지정하여 등기사무를 처리하는 법원공무원",
    "bullets": [
      "등기신청의 접수·심사·실행을 담당"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 13,
    "sourceSection": "등기제도·기관",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 27,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-018",
      "2021-32-second2-019",
      "2021-32-second2-020",
      "2021-32-second2-022",
      "2021-32-second2-023",
      "2021-32-second2-024",
      "2022-33-second2-010",
      "2022-33-second2-015",
      "2022-33-second2-017",
      "2022-33-second2-018"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p13 · 등기제도·기관"
  },
  {
    "id": "reg-card-107",
    "subject": "registration_law",
    "order": 107,
    "type": "term",
    "category": "등기제도·등기부",
    "title": "표제부",
    "subtitle": "부동산의 표시를 기록하는 등기기록 부분",
    "bullets": [
      "토지는 소재·지번·지목·면적, 건물은 소재·구조·면적 등을 기록"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "등기제도·등기부",
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
      "2022-33-second2-019",
      "2023-34-second2-022"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p14 · 등기제도·등기부"
  },
  {
    "id": "reg-card-108",
    "subject": "registration_law",
    "order": 108,
    "type": "term",
    "category": "등기제도·등기부",
    "title": "갑구",
    "subtitle": "소유권에 관한 사항을 기록하는 등기기록 부분",
    "bullets": [
      "소유권보존·이전·압류·가처분 등 소유권 관련 등기"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "등기제도·등기부",
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
      "2022-33-second2-017"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p14 · 등기제도·등기부"
  },
  {
    "id": "reg-card-109",
    "subject": "registration_law",
    "order": 109,
    "type": "term",
    "category": "등기제도·등기부",
    "title": "을구",
    "subtitle": "소유권 외 권리에 관한 사항을 기록하는 등기기록 부분",
    "bullets": [
      "지상권·전세권·저당권·임차권 등을 기록"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "등기제도·등기부",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p14 · 등기제도·등기부"
  },
  {
    "id": "reg-card-110",
    "subject": "registration_law",
    "order": 110,
    "type": "term",
    "category": "등기제도·등기부",
    "title": "폐쇄등기부",
    "subtitle": "효력이 끝난 등기기록을 별도로 보존하는 장부",
    "bullets": [
      "멸실·합병 등으로 폐쇄된 등기기록을 보존"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "등기제도·등기부",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p14 · 등기제도·등기부"
  },
  {
    "id": "reg-card-111",
    "subject": "registration_law",
    "order": 111,
    "type": "term",
    "category": "등기제도·등기부",
    "title": "중복등기기록",
    "subtitle": "동일 부동산에 둘 이상의 등기기록이 존재하는 상태",
    "bullets": [
      "법정 절차에 따라 하나의 기록을 폐쇄하거나 정리"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "등기제도·등기부",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p14 · 등기제도·등기부"
  },
  {
    "id": "reg-card-112",
    "subject": "registration_law",
    "order": 112,
    "type": "term",
    "category": "등기제도·보조장부",
    "title": "공동담보목록",
    "subtitle": "여러 부동산이 하나의 채권을 공동으로 담보할 때 작성하는 목록",
    "bullets": [
      "공동저당 등기와 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "등기제도·보조장부",
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
      "2021-32-second2-019",
      "2024-35-2-2-021"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p14 · 등기제도·보조장부"
  },
  {
    "id": "reg-card-113",
    "subject": "registration_law",
    "order": 113,
    "type": "term",
    "category": "등기제도·보조장부",
    "title": "신탁원부",
    "subtitle": "신탁 목적·수익자 등 신탁사항을 기록하는 전자적 원부",
    "bullets": [
      "신탁등기의 일부로 보아 등기기록과 함께 공시"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "등기제도·보조장부",
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
      "2021-32-second2-024",
      "2022-33-second2-024",
      "2024-35-2-2-023",
      "2025-36-second2-022"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p14 · 등기제도·보조장부"
  },
  {
    "id": "reg-card-114",
    "subject": "registration_law",
    "order": 114,
    "type": "term",
    "category": "등기제도·등기부",
    "title": "등기사항증명서",
    "subtitle": "등기기록의 전부 또는 일부를 증명하는 문서",
    "bullets": [
      "법정 절차에 따라 발급·열람 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "등기제도·등기부",
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
      "2021-32-second2-020",
      "2022-33-second2-010",
      "2024-35-2-2-011"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p14 · 등기제도·등기부"
  },
  {
    "id": "reg-card-115",
    "subject": "registration_law",
    "order": 115,
    "type": "term",
    "category": "등기제도·등기부",
    "title": "등기정보자료",
    "subtitle": "등기부 등에서 추출·가공한 전산 등기정보자료",
    "bullets": [
      "현행 부동산등기법은 해당 전산자료 체계를 ‘등기정보자료’로 규정"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "등기제도·등기부",
    "sourceRef": "국가법령정보센터 「부동산등기법」 제109조의2",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「부동산등기법」 제109조의2"
  },
  {
    "id": "reg-card-116",
    "subject": "registration_law",
    "order": 116,
    "type": "term",
    "category": "등기제도·표시등기",
    "title": "토지 표시등기",
    "subtitle": "토지의 소재·지번·지목·면적 등 사실사항에 관한 등기",
    "bullets": [
      "표제부에 기록"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "등기제도·표시등기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p15 · 등기제도·표시등기"
  },
  {
    "id": "reg-card-117",
    "subject": "registration_law",
    "order": 117,
    "type": "term",
    "category": "등기제도·표시등기",
    "title": "토지 표시변경등기",
    "subtitle": "분할·합병·지목·면적 등 토지 표시가 바뀐 경우 하는 변경등기",
    "bullets": [
      "소유권 등기명의인이 법정 기간 내 신청"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "등기제도·표시등기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p15 · 등기제도·표시등기"
  },
  {
    "id": "reg-card-118",
    "subject": "registration_law",
    "order": 118,
    "type": "term",
    "category": "등기제도·표시등기",
    "title": "직권 표시변경등기",
    "subtitle": "지적소관청 통지 후 신청이 없을 때 등기관이 직권으로 하는 표시변경",
    "bullets": [
      "대장과 등기기록의 표시 일치를 위한 절차"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "등기제도·표시등기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p15 · 등기제도·표시등기"
  },
  {
    "id": "reg-card-119",
    "subject": "registration_law",
    "order": 119,
    "type": "term",
    "category": "등기제도·표시등기",
    "title": "합필등기",
    "subtitle": "토지합병 후 여러 등기기록을 하나로 합치는 등기",
    "bullets": [
      "일정 권리등기가 있으면 합필 제한"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "등기제도·표시등기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p15 · 등기제도·표시등기"
  },
  {
    "id": "reg-card-120",
    "subject": "registration_law",
    "order": 120,
    "type": "term",
    "category": "등기제도·표시등기",
    "title": "합필 제한",
    "subtitle": "일정 권리등기가 있는 토지는 합필등기를 할 수 없는 제한",
    "bullets": [
      "소유권·지상권·전세권·임차권 등 허용되는 등기와 금지되는 등기를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "등기제도·표시등기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p15 · 등기제도·표시등기"
  },
  {
    "id": "reg-card-121",
    "subject": "registration_law",
    "order": 121,
    "type": "term",
    "category": "등기제도·표시등기",
    "title": "합필 특례",
    "subtitle": "토지합병 후 합필 전 권리변동이 생긴 경우 승낙으로 합필하는 특례",
    "bullets": [
      "이해관계인의 승낙이 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "등기제도·표시등기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p15 · 등기제도·표시등기"
  },
  {
    "id": "reg-card-122",
    "subject": "registration_law",
    "order": 122,
    "type": "term",
    "category": "등기제도·표시등기",
    "title": "토지 멸실등기",
    "subtitle": "토지가 멸실된 경우 등기기록을 폐쇄하는 등기",
    "bullets": [
      "소유권 등기명의인이 신청"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "등기제도·표시등기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p15 · 등기제도·표시등기"
  },
  {
    "id": "reg-card-123",
    "subject": "registration_law",
    "order": 123,
    "type": "term",
    "category": "등기제도·표시등기",
    "title": "건물 표시등기",
    "subtitle": "건물 소재·지번·건물번호·종류·구조·면적 등을 기록하는 등기",
    "bullets": [
      "표제부에 기록"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "등기제도·표시등기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p15 · 등기제도·표시등기"
  },
  {
    "id": "reg-card-124",
    "subject": "registration_law",
    "order": 124,
    "type": "term",
    "category": "등기제도·표시등기",
    "title": "건물 표시변경등기",
    "subtitle": "건물 분할·구분·합병·구조·면적 등이 변경된 때 하는 등기",
    "bullets": [
      "소유권 등기명의인의 단독신청이 원칙"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 16,
    "sourceSection": "등기제도·표시등기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p16 · 등기제도·표시등기"
  },
  {
    "id": "reg-card-125",
    "subject": "registration_law",
    "order": 125,
    "type": "term",
    "category": "등기제도·표시등기",
    "title": "건물 멸실등기",
    "subtitle": "건물 전부가 멸실된 경우 하는 표시등기",
    "bullets": [
      "소유권 외 권리자가 있으면 통지·이의절차가 문제됨"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 16,
    "sourceSection": "등기제도·표시등기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p16 · 등기제도·표시등기"
  },
  {
    "id": "reg-card-126",
    "subject": "registration_law",
    "order": 126,
    "type": "term",
    "category": "등기제도·구분건물",
    "title": "구분건물 표시등기",
    "subtitle": "집합건물의 전유부분과 1동 건물을 구분해 표시하는 등기",
    "bullets": [
      "일부 전유부분 보존등기 시 나머지 구분건물 표시도 함께 정리"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 16,
    "sourceSection": "등기제도·구분건물",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p16 · 등기제도·구분건물"
  },
  {
    "id": "reg-card-127",
    "subject": "registration_law",
    "order": 127,
    "type": "term",
    "category": "등기제도·구분건물",
    "title": "규약상 공용부분 등기",
    "subtitle": "규약으로 공용부분이 된 건물에 공용부분이라는 뜻을 하는 등기",
    "bullets": [
      "소유권 등기명의인이 신청하며 이해관계인 승낙이 필요한 경우가 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 16,
    "sourceSection": "등기제도·구분건물",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p16 · 등기제도·구분건물"
  },
  {
    "id": "reg-card-128",
    "subject": "registration_law",
    "order": 128,
    "type": "term",
    "category": "등기제도·구분건물",
    "title": "대지권",
    "subtitle": "구분건물과 분리처분할 수 없는 대지사용권",
    "bullets": [
      "전유부분 표제부와 토지등기기록의 대지권 표시가 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 16,
    "sourceSection": "등기제도·구분건물",
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
      2024
    ],
    "examSampleRefs": [
      "2021-32-second2-008",
      "2022-33-second2-001",
      "2022-33-second2-022",
      "2023-34-second2-005",
      "2023-34-second2-015",
      "2023-34-second2-022",
      "2024-35-2-2-010"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p16 · 등기제도·구분건물"
  },
  {
    "id": "reg-card-129",
    "subject": "registration_law",
    "order": 129,
    "type": "term",
    "category": "등기제도·구분건물",
    "title": "대지권 등기",
    "subtitle": "구분건물의 대지사용권을 대지권으로 공시하는 등기",
    "bullets": [
      "건물과 토지의 분리처분 제한을 공시"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 16,
    "sourceSection": "등기제도·구분건물",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p16 · 등기제도·구분건물"
  },
  {
    "id": "reg-card-130",
    "subject": "registration_law",
    "order": 130,
    "type": "term",
    "category": "등기제도·신청인",
    "title": "등기신청능력",
    "subtitle": "자연인·법인 등 등기명의인이 될 수 있는 능력",
    "bullets": [
      "법인 아닌 사단·재단도 일정 요건에서 등기능력 인정"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "등기능력"
    ],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "등기제도·신청인",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p17 · 등기제도·신청인"
  },
  {
    "id": "reg-card-131",
    "subject": "registration_law",
    "order": 131,
    "type": "term",
    "category": "등기제도·신청인",
    "title": "등기권리자",
    "subtitle": "등기로 권리 또는 이익을 취득하는 자",
    "bullets": [
      "공동신청에서 등기의무자와 함께 신청"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "등기제도·신청인",
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
      "2021-32-second2-013",
      "2021-32-second2-019",
      "2021-32-second2-022",
      "2021-32-second2-023",
      "2022-33-second2-013",
      "2022-33-second2-021",
      "2023-34-second2-019",
      "2023-34-second2-024",
      "2024-35-2-2-014",
      "2025-36-second2-013"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p17 · 등기제도·신청인"
  },
  {
    "id": "reg-card-132",
    "subject": "registration_law",
    "order": 132,
    "type": "term",
    "category": "등기제도·신청인",
    "title": "등기의무자",
    "subtitle": "등기로 권리를 잃거나 불이익을 받는 자",
    "bullets": [
      "공동신청의 상대방"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "등기제도·신청인",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 11,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-013",
      "2021-32-second2-019",
      "2022-33-second2-016",
      "2022-33-second2-021",
      "2023-34-second2-016",
      "2023-34-second2-019",
      "2023-34-second2-024",
      "2024-35-2-2-014",
      "2024-35-2-2-015",
      "2025-36-second2-013"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p17 · 등기제도·신청인"
  },
  {
    "id": "reg-card-133",
    "subject": "registration_law",
    "order": 133,
    "type": "term",
    "category": "등기제도·신청인",
    "title": "공동신청주의",
    "subtitle": "권리등기는 등기권리자와 등기의무자가 공동신청하는 원칙",
    "bullets": [
      "진정성 확보를 위한 등기신청의 기본원칙"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "등기제도·신청인",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p17 · 등기제도·신청인"
  },
  {
    "id": "reg-card-134",
    "subject": "registration_law",
    "order": 134,
    "type": "term",
    "category": "등기제도·신청인",
    "title": "단독신청",
    "subtitle": "법률이 정한 경우 한쪽 당사자만으로 등기를 신청하는 방식",
    "bullets": [
      "보존·상속·판결·멸실 등 법정 예외"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "등기제도·신청인",
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
      "2025-36-second2-015"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p17 · 등기제도·신청인"
  },
  {
    "id": "reg-card-135",
    "subject": "registration_law",
    "order": 135,
    "type": "term",
    "category": "등기제도·신청인",
    "title": "판결에 의한 등기",
    "subtitle": "이행판결 등 집행권원으로 승소자가 단독 신청하는 등기",
    "bullets": [
      "공동신청 원칙의 대표적 예외"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "등기제도·신청인",
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
      "2025-36-second2-013"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p17 · 등기제도·신청인"
  },
  {
    "id": "reg-card-136",
    "subject": "registration_law",
    "order": 136,
    "type": "term",
    "category": "등기제도·신청인",
    "title": "상속등기",
    "subtitle": "상속으로 취득한 부동산 소유권을 상속인 명의로 하는 등기",
    "bullets": [
      "상속인이 단독으로 신청 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "등기제도·신청인",
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
      "2022-33-second2-016",
      "2023-34-second2-016",
      "2024-35-2-2-016",
      "2024-35-2-2-018",
      "2025-36-second2-016"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p17 · 등기제도·신청인"
  },
  {
    "id": "reg-card-137",
    "subject": "registration_law",
    "order": 137,
    "type": "term",
    "category": "등기제도·신청인",
    "title": "포괄승계인에 의한 등기",
    "subtitle": "등기원인 발생 후 당사자가 사망한 경우 상속인 등이 이어서 신청하는 등기",
    "bullets": [
      "피상속인 명의 상속등기를 생략하고 상대방에게 직접 등기할 수 있는 경우가 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "등기제도·신청인",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p17 · 등기제도·신청인"
  },
  {
    "id": "reg-card-138",
    "subject": "registration_law",
    "order": 138,
    "type": "term",
    "category": "등기제도·신청인",
    "title": "채권자대위등기",
    "subtitle": "채권자가 채무자를 대위하여 채무자 명의 등기를 신청하는 제도",
    "bullets": [
      "채권보전을 위해 법정 요건에서 대위신청"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "등기제도·신청인",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p17 · 등기제도·신청인"
  },
  {
    "id": "reg-card-139",
    "subject": "registration_law",
    "order": 139,
    "type": "term",
    "category": "등기제도·신청인",
    "title": "등기인수청구권",
    "subtitle": "등기권리자가 신청하지 않을 때 등기의무자가 등기인수를 청구하는 권리",
    "bullets": [
      "공동신청 구조에서 의무자의 부담을 해소"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "등기제도·신청인",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p17 · 등기제도·신청인"
  },
  {
    "id": "reg-card-140",
    "subject": "registration_law",
    "order": 140,
    "type": "term",
    "category": "등기제도·신청방법",
    "title": "방문신청",
    "subtitle": "신청인 또는 대리인이 등기소에 서면을 제출하는 신청방법",
    "bullets": [
      "현행법상 방문신청과 전자신청이 기본 신청방법"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "등기제도·신청방법",
    "sourceRef": "국가법령정보센터 「부동산등기법」 제24조",
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
      "2025-36-second2-021"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「부동산등기법」 제24조"
  },
  {
    "id": "reg-card-141",
    "subject": "registration_law",
    "order": 141,
    "type": "term",
    "category": "등기제도·신청방법",
    "title": "전자신청",
    "subtitle": "전산정보처리조직으로 신청정보·첨부정보를 보내는 신청방법",
    "bullets": [
      "현행법은 이동통신단말장치의 애플리케이션을 통한 전자신청도 포함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "온라인 등기신청",
      "모바일 등기신청"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "등기제도·신청방법",
    "sourceRef": "국가법령정보센터 「부동산등기법」 제24조",
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
      "2025-36-second2-021"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「부동산등기법」 제24조"
  },
  {
    "id": "reg-card-142",
    "subject": "registration_law",
    "order": 142,
    "type": "term",
    "category": "등기제도·신청방법",
    "title": "1건 1신청정보 원칙",
    "subtitle": "원칙적으로 1건당 1개 부동산의 신청정보를 제공하는 원칙",
    "bullets": [
      "관련 사건·상속유증 관할 특례 등 현행 법정 예외가 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "1건 1신청"
    ],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "등기제도·신청방법",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p17 · 등기제도·신청방법"
  },
  {
    "id": "reg-card-143",
    "subject": "registration_law",
    "order": 143,
    "type": "term",
    "category": "등기제도·신청정보",
    "title": "신청정보",
    "subtitle": "등기신청인이 제공하는 등기목적·원인·당사자·부동산 정보",
    "bullets": [
      "필요적 신청정보와 법정 약정사항을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "등기제도·신청정보",
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
      "2021-32-second2-017",
      "2021-32-second2-019",
      "2022-33-second2-013",
      "2022-33-second2-017",
      "2023-34-second2-018",
      "2024-35-2-2-015",
      "2024-35-2-2-017",
      "2024-35-2-2-021",
      "2025-36-second2-015"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p17 · 등기제도·신청정보"
  },
  {
    "id": "reg-card-144",
    "subject": "registration_law",
    "order": 144,
    "type": "term",
    "category": "등기제도·신청정보",
    "title": "첨부정보",
    "subtitle": "등기원인·본인확인·허가 등 신청을 뒷받침해 함께 제공하는 정보",
    "bullets": [
      "등기원인정보·등기필정보·인감증명정보 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "등기제도·신청정보",
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
      "2021-32-second2-017",
      "2021-32-second2-018",
      "2022-33-second2-017",
      "2022-33-second2-024",
      "2023-34-second2-016",
      "2024-35-2-2-015",
      "2025-36-second2-015",
      "2025-36-second2-024"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p17 · 등기제도·신청정보"
  },
  {
    "id": "reg-card-145",
    "subject": "registration_law",
    "order": 145,
    "type": "term",
    "category": "등기제도·신청정보",
    "title": "등기원인정보",
    "subtitle": "등기원인이 된 법률행위·사실을 증명하는 정보",
    "bullets": [
      "매매계약서·판결 등 등기원인을 증명"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "등기제도·신청정보",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p17 · 등기제도·신청정보"
  },
  {
    "id": "reg-card-146",
    "subject": "registration_law",
    "order": 146,
    "type": "term",
    "category": "등기제도·신청정보",
    "title": "인감증명정보",
    "subtitle": "등기의무자의 진정한 의사를 확인하기 위해 제공하는 첨부정보",
    "bullets": [
      "법정 경우에 인감증명 또는 이에 준하는 정보를 제공"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 18,
    "sourceSection": "등기제도·신청정보",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p18 · 등기제도·신청정보"
  },
  {
    "id": "reg-card-147",
    "subject": "registration_law",
    "order": 147,
    "type": "term",
    "category": "등기제도·신청정보",
    "title": "농지취득자격증명정보",
    "subtitle": "농지 소유권이전등기에서 법정 경우 제공하는 자격정보",
    "bullets": [
      "농지법상 취득자격 확인과 등기절차를 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 18,
    "sourceSection": "등기제도·신청정보",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p18 · 등기제도·신청정보"
  },
  {
    "id": "reg-card-148",
    "subject": "registration_law",
    "order": 148,
    "type": "term",
    "category": "등기제도·등기관처분",
    "title": "등기신청 접수",
    "subtitle": "신청정보가 접수되면 접수번호·연월일을 부여하는 절차",
    "bullets": [
      "등기신청 접수와 등기실행은 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 18,
    "sourceSection": "등기제도·등기관처분",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p18 · 등기제도·등기관처분"
  },
  {
    "id": "reg-card-149",
    "subject": "registration_law",
    "order": 149,
    "type": "term",
    "category": "등기제도·등기관처분",
    "title": "형식적 심사",
    "subtitle": "등기관이 신청의 형식적·절차적 적법성을 심사하는 원칙",
    "bullets": [
      "지적의 실질적 심사와 대비"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 18,
    "sourceSection": "등기제도·등기관처분",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p18 · 등기제도·등기관처분"
  },
  {
    "id": "reg-card-150",
    "subject": "registration_law",
    "order": 150,
    "type": "term",
    "category": "등기제도·등기관처분",
    "title": "보정",
    "subtitle": "등기신청의 보완 가능한 흠을 고치도록 하는 절차",
    "bullets": [
      "각하 전에 흠을 바로잡을 기회를 줄 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 18,
    "sourceSection": "등기제도·등기관처분",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p18 · 등기제도·등기관처분"
  },
  {
    "id": "reg-card-151",
    "subject": "registration_law",
    "order": 151,
    "type": "term",
    "category": "등기제도·등기관처분",
    "title": "등기신청 취하",
    "subtitle": "등기완료 또는 각하결정 전에 신청인이 신청을 철회하는 것",
    "bullets": [
      "공동신청은 원칙적으로 공동으로 취하"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 18,
    "sourceSection": "등기제도·등기관처분",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p18 · 등기제도·등기관처분"
  },
  {
    "id": "reg-card-152",
    "subject": "registration_law",
    "order": 152,
    "type": "term",
    "category": "등기제도·등기관처분",
    "title": "등기신청 각하",
    "subtitle": "법정 각하사유가 있는 신청의 등기실행을 거부하는 처분",
    "bullets": [
      "관할 위반·등기할 수 없는 사건·첨부정보 누락 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 18,
    "sourceSection": "등기제도·등기관처분",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p18 · 등기제도·등기관처분"
  },
  {
    "id": "reg-card-153",
    "subject": "registration_law",
    "order": 153,
    "type": "term",
    "category": "등기제도·등기관처분",
    "title": "사건이 등기할 것이 아닌 경우",
    "subtitle": "부동산등기법상 대표적인 등기신청 각하사유",
    "bullets": [
      "법률상 허용되지 않는 등기신청은 보정 없이 각하될 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 18,
    "sourceSection": "등기제도·등기관처분",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2023,
      2024
    ],
    "examSampleRefs": [
      "2023-34-second2-021",
      "2024-35-2-2-016"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p18 · 등기제도·등기관처분"
  },
  {
    "id": "reg-card-154",
    "subject": "registration_law",
    "order": 154,
    "type": "term",
    "category": "등기제도·경정등기",
    "title": "직권경정등기",
    "subtitle": "등기관의 착오·누락을 등기관이 직권으로 바로잡는 등기",
    "bullets": [
      "등기상 이해관계인이 있으면 승낙이 필요한 경우가 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 20,
    "sourceSection": "등기제도·경정등기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p20 · 등기제도·경정등기"
  },
  {
    "id": "reg-card-155",
    "subject": "registration_law",
    "order": 155,
    "type": "term",
    "category": "등기제도·말소",
    "title": "직권말소",
    "subtitle": "관할 위반·등기할 수 없는 사건 등을 등기관이 직권으로 말소하는 절차",
    "bullets": [
      "권리자·의무자·이해관계인에게 이의기회를 부여"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 22,
    "sourceSection": "등기제도·말소",
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
      "2021-32-second2-022",
      "2022-33-second2-023",
      "2024-35-2-2-022",
      "2025-36-second2-023"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p22 · 등기제도·말소"
  },
  {
    "id": "reg-card-156",
    "subject": "registration_law",
    "order": 156,
    "type": "term",
    "category": "등기제도·말소",
    "title": "이해관계 있는 제3자",
    "subtitle": "변경·말소·회복 등으로 등기상 손해를 입을 수 있는 제3자",
    "bullets": [
      "승낙이 등기실행 요건이 되는 경우가 많음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 22,
    "sourceSection": "등기제도·말소",
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
      "2021-32-second2-020",
      "2024-35-2-2-015",
      "2024-35-2-2-018"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p22 · 등기제도·말소"
  },
  {
    "id": "reg-card-157",
    "subject": "registration_law",
    "order": 157,
    "type": "term",
    "category": "등기제도·말소회복",
    "title": "말소회복의 제3자승낙",
    "subtitle": "말소회복으로 손해를 입을 등기상 이해관계인의 승낙",
    "bullets": [
      "승낙이 없으면 그 제3자에게 회복등기를 대항하지 못하는 문제가 생김"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 28,
    "sourceSection": "등기제도·말소회복",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p28 · 등기제도·말소회복"
  },
  {
    "id": "reg-card-158",
    "subject": "registration_law",
    "order": 158,
    "type": "term",
    "category": "등기제도·일반절차",
    "title": "등기명의인",
    "subtitle": "등기기록에 권리자로 기록된 자",
    "bullets": [
      "성명·주소 등 표시변경등기와 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 21,
    "sourceSection": "등기제도·일반절차",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 11,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-014",
      "2021-32-second2-015",
      "2022-33-second2-014",
      "2022-33-second2-016",
      "2022-33-second2-021",
      "2023-34-second2-021",
      "2023-34-second2-022",
      "2023-34-second2-024",
      "2024-35-2-2-014",
      "2024-35-2-2-017"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p21 · 등기제도·일반절차"
  },
  {
    "id": "reg-card-159",
    "subject": "registration_law",
    "order": 159,
    "type": "term",
    "category": "등기제도·변경등기",
    "title": "등기명의인표시변경등기",
    "subtitle": "성명·주소 등 등기명의인 표시가 변경된 때 하는 등기",
    "bullets": [
      "권리 자체가 아니라 명의인의 표시를 고침"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 27,
    "sourceSection": "등기제도·변경등기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p27 · 등기제도·변경등기"
  },
  {
    "id": "reg-card-160",
    "subject": "registration_law",
    "order": 160,
    "type": "term",
    "category": "등기제도·변경등기",
    "title": "권리변경등기",
    "subtitle": "등기 후 권리 내용이 바뀐 경우 그 내용을 변경하는 등기",
    "bullets": [
      "존속기간·지료·채권액 등 변경이 예시"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 27,
    "sourceSection": "등기제도·변경등기",
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
      "2025-36-second2-022"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p27 · 등기제도·변경등기"
  },
  {
    "id": "reg-card-161",
    "subject": "registration_law",
    "order": 161,
    "type": "term",
    "category": "등기제도·변경등기",
    "title": "부동산표시변경등기",
    "subtitle": "소재·지번·건물번호 등 부동산 표시를 변경하는 등기",
    "bullets": [
      "표제부에 주등기로 실행"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 27,
    "sourceSection": "등기제도·변경등기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p27 · 등기제도·변경등기"
  },
  {
    "id": "reg-card-162",
    "subject": "registration_law",
    "order": 162,
    "type": "term",
    "category": "등기제도·변경등기",
    "title": "대지권변경등기",
    "subtitle": "대지권의 발생·변경·경정·소멸을 공시하는 등기",
    "bullets": [
      "전유부분 표제부에 기록"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 27,
    "sourceSection": "등기제도·변경등기",
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
      "2023-34-second2-022"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p27 · 등기제도·변경등기"
  },
  {
    "id": "reg-card-163",
    "subject": "registration_law",
    "order": 163,
    "type": "term",
    "category": "등기제도·소유권",
    "title": "소유권보존등기",
    "subtitle": "미등기 부동산에 최초로 소유권을 공시하는 등기",
    "bullets": [
      "대장상 최초소유자·판결·수용 등 법정 신청인이 단독 신청"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 23,
    "sourceSection": "등기제도·소유권",
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
      "2021-32-second2-023",
      "2022-33-second2-016",
      "2023-34-second2-021",
      "2023-34-second2-022",
      "2023-34-second2-023",
      "2024-35-2-2-014",
      "2024-35-2-2-020",
      "2025-36-second2-013",
      "2025-36-second2-018"
    ],
    "importance": 4,
    "sourceLabel": "부동산공시법 요약집 p23 · 등기제도·소유권"
  },
  {
    "id": "reg-card-164",
    "subject": "registration_law",
    "order": 164,
    "type": "term",
    "category": "등기제도·소유권",
    "title": "직권 소유권보존등기",
    "subtitle": "미등기 부동산 처분제한등기 촉탁 때 등기관이 먼저 하는 보존등기",
    "bullets": [
      "법원의 촉탁 등 법정 사유에서 등기관이 직권 실행"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 23,
    "sourceSection": "등기제도·소유권",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p23 · 등기제도·소유권"
  },
  {
    "id": "reg-card-165",
    "subject": "registration_law",
    "order": 165,
    "type": "term",
    "category": "등기제도·소유권",
    "title": "소유권이전등기",
    "subtitle": "매매·증여·상속 등으로 소유권이 이전된 사실을 공시하는 등기",
    "bullets": [
      "원인에 따라 공동신청 또는 단독신청"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 23,
    "sourceSection": "등기제도·소유권",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 29,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-013",
      "2021-32-second2-014",
      "2021-32-second2-016",
      "2021-32-second2-017",
      "2021-32-second2-022",
      "2021-32-second2-023",
      "2022-33-second2-013",
      "2022-33-second2-016",
      "2022-33-second2-017",
      "2022-33-second2-019"
    ],
    "importance": 5,
    "sourceLabel": "부동산공시법 요약집 p23 · 등기제도·소유권"
  },
  {
    "id": "reg-card-166",
    "subject": "registration_law",
    "order": 166,
    "type": "term",
    "category": "등기제도·소유권",
    "title": "소유권 일부이전등기",
    "subtitle": "공유지분 등 소유권 일부를 이전하는 등기",
    "bullets": [
      "이전되는 지분을 등기기록에 명확히 기록"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 24,
    "sourceSection": "등기제도·소유권",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p24 · 등기제도·소유권"
  },
  {
    "id": "reg-card-167",
    "subject": "registration_law",
    "order": 167,
    "type": "term",
    "category": "등기제도·소유권",
    "title": "거래가액 등기",
    "subtitle": "법정 거래계약을 원인으로 한 소유권이전에 거래가액을 기록하는 등기",
    "bullets": [
      "부동산 거래신고와 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 24,
    "sourceSection": "등기제도·소유권",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p24 · 등기제도·소유권"
  },
  {
    "id": "reg-card-168",
    "subject": "registration_law",
    "order": 168,
    "type": "term",
    "category": "등기제도·소유권",
    "title": "공유물분할금지 약정",
    "subtitle": "공유물을 일정 기간 분할하지 않기로 한 약정의 등기",
    "bullets": [
      "변경등기는 공유자 전원이 공동신청"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 24,
    "sourceSection": "등기제도·소유권",
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
      "2025-36-second2-018"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p24 · 등기제도·소유권"
  },
  {
    "id": "reg-card-169",
    "subject": "registration_law",
    "order": 169,
    "type": "term",
    "category": "등기제도·소유권",
    "title": "유증등기",
    "subtitle": "유언에 따라 부동산 권리를 수증자에게 이전하는 등기",
    "bullets": [
      "특정유증과 포괄유증의 등기절차를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 24,
    "sourceSection": "등기제도·소유권",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p24 · 등기제도·소유권"
  },
  {
    "id": "reg-card-170",
    "subject": "registration_law",
    "order": 170,
    "type": "term",
    "category": "등기제도·소유권",
    "title": "진정명의회복등기",
    "subtitle": "무권리자 명의 등기를 진정한 권리자 명의로 회복하는 소유권이전등기",
    "bullets": [
      "등기원인일자는 기록하지 않으며 공동신청 또는 판결로 신청"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "진정명의회복"
    ],
    "sourceKind": "summary",
    "sourcePage": 24,
    "sourceSection": "등기제도·소유권",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2023,
      2024
    ],
    "examSampleRefs": [
      "2023-34-second2-023",
      "2024-35-2-2-017"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p24 · 등기제도·소유권"
  },
  {
    "id": "reg-card-171",
    "subject": "registration_law",
    "order": 171,
    "type": "term",
    "category": "등기제도·소유권",
    "title": "환매특약등기",
    "subtitle": "매도인이 일정 조건에서 다시 매수할 환매특약을 공시하는 등기",
    "bullets": [
      "소유권이전등기의 부기등기로 하며 환매대금·기간을 기록"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "환매특약"
    ],
    "sourceKind": "summary",
    "sourcePage": 12,
    "sourceSection": "등기제도·소유권",
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
      "2021-32-second2-021",
      "2022-33-second2-020",
      "2024-35-2-2-019",
      "2025-36-second2-017"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p12 · 등기제도·소유권"
  },
  {
    "id": "reg-card-172",
    "subject": "registration_law",
    "order": 172,
    "type": "term",
    "category": "등기제도·용익권",
    "title": "지상권등기",
    "subtitle": "타인 토지를 건물·공작물 소유 목적으로 사용하는 지상권을 공시",
    "bullets": [
      "설정목적·범위 등을 기록하고 을구에 주등기"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 25,
    "sourceSection": "등기제도·용익권",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p25 · 등기제도·용익권"
  },
  {
    "id": "reg-card-173",
    "subject": "registration_law",
    "order": 173,
    "type": "term",
    "category": "등기제도·용익권",
    "title": "지역권등기",
    "subtitle": "자기 토지 편익을 위해 타인 토지를 이용하는 지역권을 공시",
    "bullets": [
      "요역지·승역지와 설정목적·범위를 기록"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 25,
    "sourceSection": "등기제도·용익권",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p25 · 등기제도·용익권"
  },
  {
    "id": "reg-card-174",
    "subject": "registration_law",
    "order": 174,
    "type": "term",
    "category": "등기제도·용익권",
    "title": "요역지",
    "subtitle": "지역권으로 편익을 받는 토지",
    "bullets": [
      "승역지와 짝을 이루는 개념"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 25,
    "sourceSection": "등기제도·용익권",
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
      "2023-34-second2-017",
      "2025-36-second2-019"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p25 · 등기제도·용익권"
  },
  {
    "id": "reg-card-175",
    "subject": "registration_law",
    "order": 175,
    "type": "term",
    "category": "등기제도·용익권",
    "title": "승역지",
    "subtitle": "지역권의 부담을 지는 토지",
    "bullets": [
      "지역권설정등기는 승역지 을구에 기록"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 25,
    "sourceSection": "등기제도·용익권",
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
      "2023-34-second2-017",
      "2025-36-second2-014",
      "2025-36-second2-019"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p25 · 등기제도·용익권"
  },
  {
    "id": "reg-card-176",
    "subject": "registration_law",
    "order": 176,
    "type": "term",
    "category": "등기제도·용익권",
    "title": "전세권등기",
    "subtitle": "전세금을 지급하고 부동산을 사용·수익하는 전세권을 공시",
    "bullets": [
      "전세금·범위 등을 기록"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 25,
    "sourceSection": "등기제도·용익권",
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
      "2022-33-second2-022"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p25 · 등기제도·용익권"
  },
  {
    "id": "reg-card-177",
    "subject": "registration_law",
    "order": 177,
    "type": "term",
    "category": "등기제도·용익권",
    "title": "임차권등기",
    "subtitle": "임대차 권리를 등기해 제3자 대항력을 공시하는 등기",
    "bullets": [
      "차임·범위 등을 기록하며 전대등기와 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 25,
    "sourceSection": "등기제도·용익권",
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
      "2024-35-2-2-020",
      "2025-36-second2-020"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p25 · 등기제도·용익권"
  },
  {
    "id": "reg-card-178",
    "subject": "registration_law",
    "order": 178,
    "type": "term",
    "category": "등기제도·용익권",
    "title": "임차권이전등기",
    "subtitle": "등기된 임차권을 양도해 이전하는 등기",
    "bullets": [
      "임대인의 동의 여부 등 첨부정보가 문제될 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 25,
    "sourceSection": "등기제도·용익권",
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
      "2024-35-2-2-020"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p25 · 등기제도·용익권"
  },
  {
    "id": "reg-card-179",
    "subject": "registration_law",
    "order": 179,
    "type": "term",
    "category": "등기제도·용익권",
    "title": "임차물 전대등기",
    "subtitle": "임차인이 임차물을 제3자에게 전대하는 내용을 공시하는 등기",
    "bullets": [
      "임대인 동의 정보가 필요한 경우가 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 25,
    "sourceSection": "등기제도·용익권",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p25 · 등기제도·용익권"
  },
  {
    "id": "reg-card-180",
    "subject": "registration_law",
    "order": 180,
    "type": "term",
    "category": "등기제도·용익권",
    "title": "임차권등기명령",
    "subtitle": "임대차 종료 후 보증금 미반환 등에서 법원이 임차권등기를 명하는 제도",
    "bullets": [
      "미등기 주택은 직권보존 후 임차권등기를 할 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 25,
    "sourceSection": "등기제도·용익권",
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
      "2024-35-2-2-020",
      "2025-36-second2-020"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p25 · 등기제도·용익권"
  },
  {
    "id": "reg-card-181",
    "subject": "registration_law",
    "order": 181,
    "type": "term",
    "category": "등기제도·담보권",
    "title": "저당권등기",
    "subtitle": "채권담보를 위해 부동산에 설정한 저당권을 공시하는 등기",
    "bullets": [
      "채권액·채무자 등 필요적 사항을 기록"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 26,
    "sourceSection": "등기제도·담보권",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2023
    ],
    "examSampleRefs": [
      "2023-34-second2-015",
      "2023-34-second2-018"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p26 · 등기제도·담보권"
  },
  {
    "id": "reg-card-182",
    "subject": "registration_law",
    "order": 182,
    "type": "term",
    "category": "등기제도·담보권",
    "title": "근저당권등기",
    "subtitle": "계속적 거래에서 최고액 범위의 불특정채권을 담보하는 근저당권 등기",
    "bullets": [
      "채권최고액·채무자 등을 기록"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 26,
    "sourceSection": "등기제도·담보권",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2023
    ],
    "examSampleRefs": [
      "2023-34-second2-015",
      "2023-34-second2-018"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p26 · 등기제도·담보권"
  },
  {
    "id": "reg-card-183",
    "subject": "registration_law",
    "order": 183,
    "type": "term",
    "category": "등기제도·담보권",
    "title": "저당권이전등기",
    "subtitle": "피담보채권 이전에 따라 저당권을 이전하는 등기",
    "bullets": [
      "저당권이 채권과 함께 이전한다는 뜻을 신청정보에 표시"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 26,
    "sourceSection": "등기제도·담보권",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p26 · 등기제도·담보권"
  },
  {
    "id": "reg-card-184",
    "subject": "registration_law",
    "order": 184,
    "type": "term",
    "category": "등기제도·담보권",
    "title": "공동저당등기",
    "subtitle": "여러 부동산으로 하나의 채권을 공동 담보하는 저당권등기",
    "bullets": [
      "각 부동산의 권리표시와 공동담보 관계를 공시"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 26,
    "sourceSection": "등기제도·담보권",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p26 · 등기제도·담보권"
  },
  {
    "id": "reg-card-185",
    "subject": "registration_law",
    "order": 185,
    "type": "term",
    "category": "등기제도·가등기",
    "title": "가등기청구권",
    "subtitle": "장래 본등기를 청구할 수 있는 권리를 보전하는 청구권",
    "bullets": [
      "권리의 설정·이전·변경·소멸을 목적으로 하는 청구권"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 28,
    "sourceSection": "등기제도·가등기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p28 · 등기제도·가등기"
  },
  {
    "id": "reg-card-186",
    "subject": "registration_law",
    "order": 186,
    "type": "term",
    "category": "등기제도·가등기",
    "title": "가등기가처분명령",
    "subtitle": "가등기의무자 협력 없이 법원의 명령으로 가등기하게 하는 절차",
    "bullets": [
      "가등기 원인사실을 소명하여 관할 지방법원에 신청"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 29,
    "sourceSection": "등기제도·가등기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p29 · 등기제도·가등기"
  },
  {
    "id": "reg-card-187",
    "subject": "registration_law",
    "order": 187,
    "type": "term",
    "category": "등기제도·가등기",
    "title": "가등기에 의한 본등기",
    "subtitle": "가등기에 기초하여 최종 권리변동을 공시하는 본등기",
    "bullets": [
      "본등기 순위는 가등기 순위에 따름"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 29,
    "sourceSection": "등기제도·가등기",
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
      "2021-32-second2-022",
      "2022-33-second2-021"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p29 · 등기제도·가등기"
  },
  {
    "id": "reg-card-188",
    "subject": "registration_law",
    "order": 188,
    "type": "term",
    "category": "등기제도·가등기",
    "title": "가등기 후 직권말소",
    "subtitle": "본등기 시 가등기로 보전된 권리를 침해하는 후순위등기를 직권말소",
    "bullets": [
      "가등기 후 등기라도 본등기 권리를 침해하지 않으면 존속"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 29,
    "sourceSection": "등기제도·가등기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p29 · 등기제도·가등기"
  },
  {
    "id": "reg-card-189",
    "subject": "registration_law",
    "order": 189,
    "type": "term",
    "category": "등기제도·가등기",
    "title": "가등기말소",
    "subtitle": "가등기를 소멸시키는 말소등기",
    "bullets": [
      "가등기명의인은 단독 신청 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 29,
    "sourceSection": "등기제도·가등기",
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
      "2021-32-second2-014"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p29 · 등기제도·가등기"
  },
  {
    "id": "reg-card-190",
    "subject": "registration_law",
    "order": 190,
    "type": "term",
    "category": "등기제도·가처분",
    "title": "가처분등기",
    "subtitle": "권리이전·말소·설정청구권을 보전하기 위한 처분금지가처분의 등기",
    "bullets": [
      "가처분채권자의 본등기와 후순위등기 말소가 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 29,
    "sourceSection": "등기제도·가처분",
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
      "2021-32-second2-022",
      "2023-34-second2-019",
      "2024-35-2-2-024"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p29 · 등기제도·가처분"
  },
  {
    "id": "reg-card-191",
    "subject": "registration_law",
    "order": 191,
    "type": "term",
    "category": "등기제도·가처분",
    "title": "가처분 후 등기말소",
    "subtitle": "가처분채권자의 본등기 때 가처분에 저촉되는 후순위등기를 말소하는 절차",
    "bullets": [
      "법정 요건에서 가처분채권자가 단독으로 말소 신청 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 29,
    "sourceSection": "등기제도·가처분",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p29 · 등기제도·가처분"
  },
  {
    "id": "reg-card-192",
    "subject": "registration_law",
    "order": 192,
    "type": "term",
    "category": "등기제도·신탁",
    "title": "신탁등기",
    "subtitle": "신탁재산인 부동산 권리와 신탁사항을 공시하는 등기",
    "bullets": [
      "권리이전등기와 신탁등기를 함께 신청하는 것이 원칙"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 24,
    "sourceSection": "등기제도·신탁",
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
      "2021-32-second2-024",
      "2022-33-second2-024",
      "2025-36-second2-013",
      "2025-36-second2-022"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p24 · 등기제도·신탁"
  },
  {
    "id": "reg-card-193",
    "subject": "registration_law",
    "order": 193,
    "type": "term",
    "category": "등기제도·신탁",
    "title": "신탁변경등기",
    "subtitle": "수탁자·신탁내용 등 신탁원부 사항이 변경된 때 하는 등기",
    "bullets": [
      "법정 경우 등기관 직권 또는 수탁자 신청으로 변경"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 32,
    "sourceSection": "등기제도·신탁",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p32 · 등기제도·신탁"
  },
  {
    "id": "reg-card-194",
    "subject": "registration_law",
    "order": 194,
    "type": "term",
    "category": "등기제도·신탁",
    "title": "신탁말소등기",
    "subtitle": "권리가 신탁재산에서 벗어나거나 신탁이 종료된 때 신탁등기를 말소",
    "bullets": [
      "수탁자가 단독으로 신청할 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 32,
    "sourceSection": "등기제도·신탁",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p32 · 등기제도·신탁"
  },
  {
    "id": "reg-card-195",
    "subject": "registration_law",
    "order": 195,
    "type": "term",
    "category": "등기제도·신탁",
    "title": "담보권신탁",
    "subtitle": "저당권 등 담보권을 수탁자에게 신탁하고 채권자를 수익자로 하는 신탁",
    "bullets": [
      "피담보채권별 등기사항을 구분해 기록할 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 32,
    "sourceSection": "등기제도·신탁",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p32 · 등기제도·신탁"
  },
  {
    "id": "reg-card-196",
    "subject": "registration_law",
    "order": 196,
    "type": "term",
    "category": "등기제도·촉탁",
    "title": "관공서 촉탁등기",
    "subtitle": "국가·지자체 등이 등기권리자·의무자인 경우 관공서가 촉탁하는 등기",
    "bullets": [
      "관공서 촉탁에는 신청절차 규정을 준용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 33,
    "sourceSection": "등기제도·촉탁",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p33 · 등기제도·촉탁"
  },
  {
    "id": "reg-card-197",
    "subject": "registration_law",
    "order": 197,
    "type": "term",
    "category": "등기제도·촉탁",
    "title": "지적소관청 등기촉탁",
    "subtitle": "토지표시 변경 등 지적정리 결과를 지적소관청이 등기소에 촉탁하는 절차",
    "bullets": [
      "대장과 등기기록의 표시를 일치시키는 연결절차"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 33,
    "sourceSection": "등기제도·촉탁",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p33 · 등기제도·촉탁"
  },
  {
    "id": "reg-card-198",
    "subject": "registration_law",
    "order": 198,
    "type": "term",
    "category": "등기제도·이의신청",
    "title": "등기관 처분 이의신청",
    "subtitle": "등기관의 결정·처분에 불복해 관할 지방법원에 이의를 신청하는 절차",
    "bullets": [
      "이의신청만으로 등기관 처분의 집행이 자동 정지되지는 않음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 30,
    "sourceSection": "등기제도·이의신청",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산공시법 요약집 p30 · 등기제도·이의신청"
  },
  {
    "id": "reg-card-199",
    "subject": "registration_law",
    "order": 199,
    "type": "term",
    "category": "등기제도·이의신청",
    "title": "기록명령",
    "subtitle": "이의신청이 이유 있을 때 관할 법원이 등기관에게 등기기록을 명하는 결정",
    "bullets": [
      "명령 후 새로운 등기로 실행이 불가능해진 경우 등을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 30,
    "sourceSection": "등기제도·이의신청",
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
      "2025-36-second2-024"
    ],
    "importance": 3,
    "sourceLabel": "부동산공시법 요약집 p30 · 등기제도·이의신청"
  }
];
  cards.forEach(card=>{ if(!ids.has(card.id)){ bank.cards.push(card); ids.add(card.id); } });
})();
