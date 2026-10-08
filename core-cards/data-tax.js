(() => {
  const bank=window.CORE_WORD_CARD_BANK;
  if(!bank) throw new Error('CORE_WORD_CARD_BANK base data missing');
  if(!bank.sources.includes("4.공인중개사요약_세법.pdf 23쪽 + Q-Net 2021~2025 제32~36회 + 국가법령정보센터 2026-10-08 현행 세법")) bank.sources.push("4.공인중개사요약_세법.pdf 23쪽 + Q-Net 2021~2025 제32~36회 + 국가법령정보센터 2026-10-08 현행 세법");
  const subject=bank.subjects.find(item=>item.code==="tax_law");
  if(subject) subject.disabled=false;
  const ids=new Set(bank.cards.map(card=>card.id));
  const cards=[
  {
    "id": "tax-card-001",
    "subject": "tax_law",
    "order": 1,
    "type": "term",
    "category": "조세총론·분류",
    "title": "국세",
    "subtitle": "국가가 과세권을 갖는 조세",
    "bullets": [
      "소득세·종합부동산세·상속세·증여세·농어촌특별세 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "조세총론·분류",
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
      "2021-32-second2-030",
      "2022-33-second2-038",
      "2023-34-second2-025",
      "2023-34-second2-026",
      "2024-35-2-2-025",
      "2024-35-2-2-026",
      "2025-36-second2-025",
      "2025-36-second2-036"
    ],
    "importance": 4,
    "sourceLabel": "부동산세법 요약집 p1 · 조세총론·분류"
  },
  {
    "id": "tax-card-002",
    "subject": "tax_law",
    "order": 2,
    "type": "term",
    "category": "조세총론·분류",
    "title": "지방세",
    "subtitle": "지방자치단체가 과세권을 갖는 조세",
    "bullets": [
      "취득세·등록면허세·재산세·지방소득세 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "조세총론·분류",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 39,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-025",
      "2021-32-second2-027",
      "2021-32-second2-028",
      "2021-32-second2-029",
      "2021-32-second2-030",
      "2021-32-second2-031",
      "2021-32-second2-033",
      "2021-32-second2-035",
      "2022-33-second2-025",
      "2022-33-second2-026"
    ],
    "importance": 5,
    "sourceLabel": "부동산세법 요약집 p1 · 조세총론·분류"
  },
  {
    "id": "tax-card-003",
    "subject": "tax_law",
    "order": 3,
    "type": "term",
    "category": "조세총론·분류",
    "title": "보통세",
    "subtitle": "조세수입의 용도를 특정하지 않는 조세",
    "bullets": [
      "목적세와 대비되는 분류"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "조세총론·분류",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p1 · 조세총론·분류"
  },
  {
    "id": "tax-card-004",
    "subject": "tax_law",
    "order": 4,
    "type": "term",
    "category": "조세총론·분류",
    "title": "목적세",
    "subtitle": "조세수입을 특정 목적에 사용하도록 정한 조세",
    "bullets": [
      "지방교육세·지역자원시설세·농어촌특별세 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "조세총론·분류",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p1 · 조세총론·분류"
  },
  {
    "id": "tax-card-005",
    "subject": "tax_law",
    "order": 5,
    "type": "term",
    "category": "조세총론·분류",
    "title": "독립세",
    "subtitle": "다른 조세에 부가되지 않고 독립된 과세대상을 가진 조세",
    "bullets": [
      "취득세·재산세·종합부동산세·양도소득세 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "조세총론·분류",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p1 · 조세총론·분류"
  },
  {
    "id": "tax-card-006",
    "subject": "tax_law",
    "order": 6,
    "type": "term",
    "category": "조세총론·분류",
    "title": "부가세(附加稅)",
    "subtitle": "독립세에 대비하여 다른 조세에 덧붙여 부과되는 조세",
    "bullets": [
      "지방교육세·농어촌특별세 등은 다른 조세에 부가해 산정하는 유형이 있음",
      "일상적으로 부가가치세를 줄여 부르는 '부가세'와는 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "조세총론·분류",
    "sourceRef": "",
    "sourceNote": "2026-10-08: 조세 분류상의 부가세(附加稅)와 부가가치세의 일상적 약칭을 구별. 출처: 요약집 p1.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p1 · 조세총론·분류"
  },
  {
    "id": "tax-card-007",
    "subject": "tax_law",
    "order": 7,
    "type": "term",
    "category": "조세총론·분류",
    "title": "인세",
    "subtitle": "납세의무자의 인적 사정과 담세력을 고려하는 조세",
    "bullets": [
      "소득세·종합부동산세 등에서 인적 요소가 반영될 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "조세총론·분류",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p1 · 조세총론·분류"
  },
  {
    "id": "tax-card-008",
    "subject": "tax_law",
    "order": 8,
    "type": "term",
    "category": "조세총론·분류",
    "title": "물세",
    "subtitle": "재산·거래 등 물적 사실을 중심으로 과세하는 조세",
    "bullets": [
      "취득세·등록면허세·재산세 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "조세총론·분류",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p1 · 조세총론·분류"
  },
  {
    "id": "tax-card-009",
    "subject": "tax_law",
    "order": 9,
    "type": "term",
    "category": "조세총론·분류",
    "title": "직접세",
    "subtitle": "납세의무자와 실질적인 담세자가 원칙적으로 일치하는 조세",
    "bullets": [
      "소득세·재산세·취득세 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "조세총론·분류",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p1 · 조세총론·분류"
  },
  {
    "id": "tax-card-010",
    "subject": "tax_law",
    "order": 10,
    "type": "term",
    "category": "조세총론·분류",
    "title": "간접세",
    "subtitle": "세 부담이 거래 상대방에게 전가될 수 있는 조세",
    "bullets": [
      "부가가치세·인지세 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 1,
    "sourceSection": "조세총론·분류",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p1 · 조세총론·분류"
  },
  {
    "id": "tax-card-011",
    "subject": "tax_law",
    "order": 11,
    "type": "term",
    "category": "조세총론·납세의무",
    "title": "납세의무 성립",
    "subtitle": "과세요건이 충족되어 추상적 납세의무가 생기는 단계",
    "bullets": [
      "취득세는 과세물건 취득 시, 재산세는 과세기준일에 성립"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 2,
    "sourceSection": "조세총론·납세의무",
    "sourceRef": "4.공인중개사요약_세법.pdf p2 + 국가법령정보센터 「지방세기본법」 제34조",
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
      "2021-32-second2-035",
      "2023-34-second2-029",
      "2025-36-second2-033",
      "2025-36-second2-034"
    ],
    "importance": 3,
    "sourceLabel": "4.공인중개사요약_세법.pdf p2 + 국가법령정보센터 「지방세기본법」 제34조"
  },
  {
    "id": "tax-card-012",
    "subject": "tax_law",
    "order": 12,
    "type": "term",
    "category": "조세총론·납세의무",
    "title": "납세의무 확정",
    "subtitle": "성립한 납세의무의 과세표준과 세액을 구체적으로 정하는 단계",
    "bullets": [
      "신고납세와 정부부과 방식으로 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "조세총론·납세의무",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p3 · 조세총론·납세의무"
  },
  {
    "id": "tax-card-013",
    "subject": "tax_law",
    "order": 13,
    "type": "term",
    "category": "조세총론·납세의무",
    "title": "신고납세제도",
    "subtitle": "납세의무자가 과세표준과 세액을 신고하여 확정하는 방식",
    "bullets": [
      "취득세·등록면허세·소득세 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "조세총론·납세의무",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p3 · 조세총론·납세의무"
  },
  {
    "id": "tax-card-014",
    "subject": "tax_law",
    "order": 14,
    "type": "term",
    "category": "조세총론·납세의무",
    "title": "정부부과제도",
    "subtitle": "과세관청의 결정으로 세액이 확정되는 방식",
    "bullets": [
      "재산세·종합부동산세의 부과방식과 연결"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "조세총론·납세의무",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p3 · 조세총론·납세의무"
  },
  {
    "id": "tax-card-015",
    "subject": "tax_law",
    "order": 15,
    "type": "term",
    "category": "조세총론·징수",
    "title": "보통징수",
    "subtitle": "지방자치단체가 납세고지서를 발급하여 지방세를 징수하는 방식",
    "bullets": [
      "재산세의 기본 징수방식"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "조세총론·징수",
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
      "2022-33-second2-035",
      "2023-34-second2-032"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p3 · 조세총론·징수"
  },
  {
    "id": "tax-card-016",
    "subject": "tax_law",
    "order": 16,
    "type": "term",
    "category": "조세총론·납세의무",
    "title": "납세의무 소멸",
    "subtitle": "성립·확정된 납세의무가 없어지는 것",
    "bullets": [
      "납부·충당·부과취소·부과제척기간 만료·징수권 소멸시효 완성 등이 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "조세총론·납세의무",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p3 · 조세총론·납세의무"
  },
  {
    "id": "tax-card-017",
    "subject": "tax_law",
    "order": 17,
    "type": "term",
    "category": "조세총론·기간",
    "title": "부과제척기간",
    "subtitle": "과세관청이 세금을 부과할 수 있는 법정 기간",
    "bullets": [
      "기간이 지나면 부과권 자체가 소멸하며 소멸시효와 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "조세총론·기간",
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
      "2023-34-second2-025"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p3 · 조세총론·기간"
  },
  {
    "id": "tax-card-018",
    "subject": "tax_law",
    "order": 18,
    "type": "term",
    "category": "조세총론·기간",
    "title": "징수권 소멸시효",
    "subtitle": "확정된 조세채권을 일정 기간 행사하지 않으면 징수권이 소멸하는 제도",
    "bullets": [
      "시효의 중단·정지 여부가 부과제척기간과 다름"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "조세총론·기간",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p3 · 조세총론·기간"
  },
  {
    "id": "tax-card-019",
    "subject": "tax_law",
    "order": 19,
    "type": "term",
    "category": "조세총론·제재",
    "title": "가산세",
    "subtitle": "세법상 신고·납부 등 의무위반에 따라 본세에 더해지는 금액",
    "bullets": [
      "무신고·과소신고·납부지연 등 유형을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 2,
    "sourceSection": "조세총론·제재",
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
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-025",
      "2022-33-second2-033",
      "2022-33-second2-035",
      "2022-33-second2-037",
      "2024-35-2-2-026",
      "2025-36-second2-026"
    ],
    "importance": 4,
    "sourceLabel": "부동산세법 요약집 p2 · 조세총론·제재"
  },
  {
    "id": "tax-card-020",
    "subject": "tax_law",
    "order": 20,
    "type": "term",
    "category": "조세총론·납세의무",
    "title": "연대납세의무",
    "subtitle": "둘 이상의 자가 동일 조세채무 전부에 대해 함께 납세의무를 지는 것",
    "bullets": [
      "국세·지방세에서 법정 사유에 따라 성립"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "조세총론·납세의무",
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
      2024
    ],
    "examSampleRefs": [
      "2022-33-second2-026",
      "2023-34-second2-026",
      "2024-35-2-2-036"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p3 · 조세총론·납세의무"
  },
  {
    "id": "tax-card-021",
    "subject": "tax_law",
    "order": 21,
    "type": "term",
    "category": "조세총론·우선권",
    "title": "조세우선권",
    "subtitle": "국세·지방세가 일정 일반채권보다 우선하여 징수되는 원칙",
    "bullets": [
      "법정기일 전에 설정된 담보권·소액임차보증금 등과 우선순위를 비교"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "조세총론·우선권",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p3 · 조세총론·우선권"
  },
  {
    "id": "tax-card-022",
    "subject": "tax_law",
    "order": 22,
    "type": "term",
    "category": "조세총론·우선권",
    "title": "법정기일",
    "subtitle": "조세채권과 담보채권 등의 우선순위를 판단하는 기준일",
    "bullets": [
      "세목과 부과방식에 따라 법정기일이 달라짐"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 3,
    "sourceSection": "조세총론·우선권",
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
      "2024-35-2-2-025",
      "2025-36-second2-028"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p3 · 조세총론·우선권"
  },
  {
    "id": "tax-card-023",
    "subject": "tax_law",
    "order": 23,
    "type": "term",
    "category": "조세총론·불복",
    "title": "서류의 송달",
    "subtitle": "과세관청이 납세고지서 등 세법상 서류를 상대방에게 전달하는 절차",
    "bullets": [
      "교부·우편·전자송달·공시송달 등을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "조세총론·불복",
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
      "2022-33-second2-026"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p4 · 조세총론·불복"
  },
  {
    "id": "tax-card-024",
    "subject": "tax_law",
    "order": 24,
    "type": "term",
    "category": "조세총론·불복",
    "title": "이의신청",
    "subtitle": "과세처분에 대해 행정청에 다시 판단을 요구하는 불복절차",
    "bullets": [
      "국세·지방세 모두 법정 절차와 기간을 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "조세총론·불복",
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
      "2022-33-second2-025"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p4 · 조세총론·불복"
  },
  {
    "id": "tax-card-025",
    "subject": "tax_law",
    "order": 25,
    "type": "term",
    "category": "조세총론·불복",
    "title": "심판청구",
    "subtitle": "조세심판원에 과세처분의 취소·변경을 구하는 불복절차",
    "bullets": [
      "이의신청과 별개로 법정 요건에서 직접 청구 가능"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "조세총론·불복",
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
      "2022-33-second2-025"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p4 · 조세총론·불복"
  },
  {
    "id": "tax-card-026",
    "subject": "tax_law",
    "order": 26,
    "type": "term",
    "category": "조세총론·불복",
    "title": "심사청구",
    "subtitle": "국세청장 등 법정 기관에 과세처분 심사를 구하는 불복절차",
    "bullets": [
      "국세 불복절차에서 심판청구와 선택관계가 문제됨"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "조세총론·불복",
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
      "2023-34-second2-025"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p4 · 조세총론·불복"
  },
  {
    "id": "tax-card-027",
    "subject": "tax_law",
    "order": 27,
    "type": "term",
    "category": "취득세·총칙",
    "title": "취득세",
    "subtitle": "부동산 등 과세물건의 취득에 대해 부과하는 지방세",
    "bullets": [
      "등기·등록 여부와 관계없이 사실상 취득하면 과세되는 실질과세 성격"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "취득세·총칙",
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
      "2021-32-second2-025",
      "2021-32-second2-027",
      "2021-32-second2-032",
      "2022-33-second2-035",
      "2022-33-second2-040",
      "2023-34-second2-026",
      "2023-34-second2-027",
      "2023-34-second2-028",
      "2024-35-2-2-025",
      "2024-35-2-2-026"
    ],
    "importance": 5,
    "sourceLabel": "부동산세법 요약집 p4 · 취득세·총칙"
  },
  {
    "id": "tax-card-028",
    "subject": "tax_law",
    "order": 28,
    "type": "term",
    "category": "취득세·총칙",
    "title": "취득세 과세대상",
    "subtitle": "취득세가 부과되는 부동산·준부동산·권리",
    "bullets": [
      "토지·건축물, 차량·기계장비·항공기·선박·입목, 광업권·어업권·양식업권과 법정 회원권 등을 포함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 4,
    "sourceSection": "취득세·총칙",
    "sourceRef": "국가법령정보센터 「지방세법」 제7조제1항",
    "sourceNote": "2026-10-08: 현행 지방세법 제7조제1항의 '양식업권' 누락을 보완.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국가법령정보센터 「지방세법」 제7조제1항"
  },
  {
    "id": "tax-card-029",
    "subject": "tax_law",
    "order": 29,
    "type": "term",
    "category": "취득세·총칙",
    "title": "취득",
    "subtitle": "매매·교환·상속·증여·기부·현물출자·건축 등으로 과세물건을 취득하는 것",
    "bullets": [
      "유상·무상·원시취득을 모두 포함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "취득세·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 36,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-025",
      "2021-32-second2-027",
      "2021-32-second2-032",
      "2021-32-second2-036",
      "2021-32-second2-037",
      "2021-32-second2-038",
      "2021-32-second2-039",
      "2021-32-second2-040",
      "2022-33-second2-028",
      "2022-33-second2-031"
    ],
    "importance": 5,
    "sourceLabel": "부동산세법 요약집 p4 · 취득세·총칙"
  },
  {
    "id": "tax-card-030",
    "subject": "tax_law",
    "order": 30,
    "type": "term",
    "category": "취득세·총칙",
    "title": "취득의 의제",
    "subtitle": "법률상 소유권 취득이 없어도 경제적 가치 증가 등을 취득으로 보는 것",
    "bullets": [
      "지목변경·건축물 개수·차량 종류변경·과점주주 취득 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "취득세·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p5 · 취득세·총칙"
  },
  {
    "id": "tax-card-031",
    "subject": "tax_law",
    "order": 31,
    "type": "term",
    "category": "취득세·총칙",
    "title": "과점주주 간주취득",
    "subtitle": "법인의 과점주주가 되면 법인 소유 과세물건을 지분비율만큼 취득한 것으로 보는 제도",
    "bullets": [
      "주식 취득으로 과점주주가 되거나 지분이 증가한 경우 법정 범위에서 과세"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "취득세·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p6 · 취득세·총칙"
  },
  {
    "id": "tax-card-032",
    "subject": "tax_law",
    "order": 32,
    "type": "term",
    "category": "취득세·납세의무",
    "title": "취득세 납세의무자",
    "subtitle": "과세물건을 사실상 취득한 자",
    "bullets": [
      "명의보다 실제 취득관계가 중요"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "취득세·납세의무",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p4 · 취득세·납세의무"
  },
  {
    "id": "tax-card-033",
    "subject": "tax_law",
    "order": 33,
    "type": "term",
    "category": "취득세·취득시기",
    "title": "유상승계취득 시기",
    "subtitle": "매매 등 유상으로 승계취득한 때의 취득시기",
    "bullets": [
      "원칙적으로 사실상 잔금지급일 등 대통령령이 정한 날을 기준으로 판단"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 5,
    "sourceSection": "취득세·취득시기",
    "sourceRef": "4.공인중개사요약_세법.pdf p5 + 국가법령정보센터 「지방세법 시행령」 취득시기 관련 조문",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "4.공인중개사요약_세법.pdf p5 + 국가법령정보센터 「지방세법 시행령」 취득시기 관련 조문"
  },
  {
    "id": "tax-card-034",
    "subject": "tax_law",
    "order": 34,
    "type": "term",
    "category": "취득세·취득시기",
    "title": "무상승계취득 시기",
    "subtitle": "증여 등 무상으로 승계취득한 때의 취득시기",
    "bullets": [
      "상속·유증과 일반 증여의 취득시기를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "취득세·취득시기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p5 · 취득세·취득시기"
  },
  {
    "id": "tax-card-035",
    "subject": "tax_law",
    "order": 35,
    "type": "term",
    "category": "취득세·취득시기",
    "title": "상속 취득시기",
    "subtitle": "상속개시일에 상속재산을 취득한 것으로 보는 기준",
    "bullets": [
      "상속 취득세 신고기간과 별도로 취득시기를 판단"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "취득세·취득시기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p5 · 취득세·취득시기"
  },
  {
    "id": "tax-card-036",
    "subject": "tax_law",
    "order": 36,
    "type": "term",
    "category": "취득세·취득시기",
    "title": "원시취득 시기",
    "subtitle": "건축·매립 등으로 새 과세물건이 생기는 경우의 취득시기",
    "bullets": [
      "사용승인일·사실상 사용일 등 법정 기준 중 해당 시점을 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "취득세·취득시기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p5 · 취득세·취득시기"
  },
  {
    "id": "tax-card-037",
    "subject": "tax_law",
    "order": 37,
    "type": "term",
    "category": "취득세·취득시기",
    "title": "연부취득",
    "subtitle": "취득대금을 장기간에 걸쳐 분할하여 지급하는 취득",
    "bullets": [
      "각 연부금 지급 시마다 부분 취득으로 보아 과세할 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "취득세·취득시기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p5 · 취득세·취득시기"
  },
  {
    "id": "tax-card-038",
    "subject": "tax_law",
    "order": 38,
    "type": "term",
    "category": "취득세·취득시기",
    "title": "선등기 취득",
    "subtitle": "취득시기 전에 등기·등록한 경우 그 등기·등록일을 취득시기로 보는 제도",
    "bullets": [
      "실제 잔금지급일보다 먼저 등기한 경우가 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 5,
    "sourceSection": "취득세·취득시기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p5 · 취득세·취득시기"
  },
  {
    "id": "tax-card-039",
    "subject": "tax_law",
    "order": 39,
    "type": "term",
    "category": "취득세·과세표준",
    "title": "취득세 과세표준",
    "subtitle": "취득세액 계산의 기초가 되는 취득 당시의 가액",
    "bullets": [
      "현행법은 무상·유상·원시취득 등 취득원인별 과세표준 규정을 구분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 5,
    "sourceSection": "취득세·과세표준",
    "sourceRef": "국가법령정보센터 「지방세법」 제10조~제10조의6",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「지방세법」 제10조~제10조의6"
  },
  {
    "id": "tax-card-040",
    "subject": "tax_law",
    "order": 40,
    "type": "term",
    "category": "취득세·과세표준",
    "title": "취득당시가액",
    "subtitle": "취득세 과세표준 산정의 기준이 되는 취득 당시 가액",
    "bullets": [
      "현행 지방세법 제10조의 기본 개념"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 5,
    "sourceSection": "취득세·과세표준",
    "sourceRef": "국가법령정보센터 「지방세법」 제10조",
    "sourceNote": "",
    "basis": [
      "exam",
      "essential"
    ],
    "examHitCount": 2,
    "examYears": [
      2022,
      2024
    ],
    "examSampleRefs": [
      "2022-33-second2-035",
      "2024-35-2-2-029"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「지방세법」 제10조"
  },
  {
    "id": "tax-card-041",
    "subject": "tax_law",
    "order": 41,
    "type": "term",
    "category": "취득세·과세표준",
    "title": "시가인정액",
    "subtitle": "무상취득 등의 과세표준에 사용하는 매매사례·감정·공매 등 시가 인정가액",
    "bullets": [
      "현행 무상취득 과세표준의 핵심 개념"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 5,
    "sourceSection": "취득세·과세표준",
    "sourceRef": "국가법령정보센터 「지방세법」 제10조의2",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「지방세법」 제10조의2"
  },
  {
    "id": "tax-card-042",
    "subject": "tax_law",
    "order": 42,
    "type": "term",
    "category": "취득세·과세표준",
    "title": "유상승계 과세표준",
    "subtitle": "유상으로 부동산을 승계취득할 때 적용하는 과세표준",
    "bullets": [
      "현행법은 실제 취득가격을 중심으로 법정 조정사항을 반영"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 5,
    "sourceSection": "취득세·과세표준",
    "sourceRef": "국가법령정보센터 「지방세법」 제10조의3",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「지방세법」 제10조의3"
  },
  {
    "id": "tax-card-043",
    "subject": "tax_law",
    "order": 43,
    "type": "term",
    "category": "취득세·과세표준",
    "title": "무상취득 과세표준",
    "subtitle": "증여 등 무상취득에 적용하는 과세표준",
    "bullets": [
      "원칙적으로 시가인정액을 기준으로 하며 상속 등 법정 예외를 둠"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 5,
    "sourceSection": "취득세·과세표준",
    "sourceRef": "국가법령정보센터 「지방세법」 제10조의2",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「지방세법」 제10조의2"
  },
  {
    "id": "tax-card-044",
    "subject": "tax_law",
    "order": 44,
    "type": "term",
    "category": "취득세·과세표준",
    "title": "원시취득 과세표준",
    "subtitle": "건축·매립 등 원시취득에 적용하는 과세표준",
    "bullets": [
      "사실상 취득가격 등 현행 법정 기준으로 산정"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 5,
    "sourceSection": "취득세·과세표준",
    "sourceRef": "국가법령정보센터 「지방세법」 제10조의4",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「지방세법」 제10조의4"
  },
  {
    "id": "tax-card-045",
    "subject": "tax_law",
    "order": 45,
    "type": "term",
    "category": "취득세·과세표준",
    "title": "시가표준액",
    "subtitle": "지방세 과세를 위해 법정 기준에 따라 정한 재산가액",
    "bullets": [
      "토지·주택은 공시가격, 기타 건축물 등은 법정 기준으로 산정"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 5,
    "sourceSection": "취득세·과세표준",
    "sourceRef": "4.공인중개사요약_세법.pdf p5 + 국가법령정보센터 「지방세법 시행령」 제2조 등",
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
      "2021-32-second2-029",
      "2021-32-second2-030",
      "2021-32-second2-033",
      "2023-34-second2-034",
      "2024-35-2-2-029",
      "2025-36-second2-031",
      "2025-36-second2-032"
    ],
    "importance": 4,
    "sourceLabel": "4.공인중개사요약_세법.pdf p5 + 국가법령정보센터 「지방세법 시행령」 제2조 등"
  },
  {
    "id": "tax-card-046",
    "subject": "tax_law",
    "order": 46,
    "type": "term",
    "category": "취득세·과세표준",
    "title": "취득가격 포함비용",
    "subtitle": "취득을 위해 거래상대방 또는 제3자에게 지급한 직접·간접 비용",
    "bullets": [
      "법정 비용은 취득가격에 포함하고 제외항목과 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "취득세·과세표준",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p6 · 취득세·과세표준"
  },
  {
    "id": "tax-card-047",
    "subject": "tax_law",
    "order": 47,
    "type": "term",
    "category": "취득세·과세표준",
    "title": "취득가격 제외비용",
    "subtitle": "취득가격 산정에서 법령상 제외되는 비용",
    "bullets": [
      "부가가치세 등 법정 제외항목을 포함비용과 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "취득세·과세표준",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p6 · 취득세·과세표준"
  },
  {
    "id": "tax-card-048",
    "subject": "tax_law",
    "order": 48,
    "type": "term",
    "category": "취득세·세율",
    "title": "취득세 표준세율",
    "subtitle": "일반적인 취득에 적용하는 법정 기본세율",
    "bullets": [
      "취득원인·농지 여부·주택 여부 등에 따라 세율을 구분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "취득세·세율",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p6 · 취득세·세율"
  },
  {
    "id": "tax-card-049",
    "subject": "tax_law",
    "order": 49,
    "type": "term",
    "category": "취득세·세율",
    "title": "주택 유상취득세율",
    "subtitle": "주택을 유상으로 취득할 때 적용하는 취득세율 체계",
    "bullets": [
      "주택가액과 주택 수·지역 등에 따라 일반세율 또는 중과세율이 적용될 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "취득세·세율",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p6 · 취득세·세율"
  },
  {
    "id": "tax-card-050",
    "subject": "tax_law",
    "order": 50,
    "type": "term",
    "category": "취득세·세율",
    "title": "취득세 중과세율",
    "subtitle": "사치성 재산·대도시 법인 등 일정 취득에 높은 세율을 적용하는 제도",
    "bullets": [
      "표준세율과 중과기준세율을 조합해 계산하는 구조"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "취득세·세율",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p6 · 취득세·세율"
  },
  {
    "id": "tax-card-051",
    "subject": "tax_law",
    "order": 51,
    "type": "term",
    "category": "취득세·중과세",
    "title": "사치성 재산",
    "subtitle": "취득세 중과대상인 골프장·고급주택·고급오락장·고급선박",
    "bullets": [
      "현행 지방세법 제13조제5항에 따른 취득세 중과대상을 구별",
      "별장은 2023년 3월 14일부터 해당 중과대상에서 제외"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 6,
    "sourceSection": "취득세·중과세",
    "sourceRef": "국가법령정보센터 「지방세법」 제13조제5항 (2023.3.14. 별장 중과 삭제)",
    "sourceNote": "2026-10-08: 요약집 p6의 과거 별장 중과 설명 삭제. 2023.3.14 시행 지방세법 개정으로 별장 제외.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국가법령정보센터 「지방세법」 제13조제5항 (2023.3.14. 별장 중과 삭제)"
  },
  {
    "id": "tax-card-052",
    "subject": "tax_law",
    "order": 52,
    "type": "term",
    "category": "취득세·중과세",
    "title": "별장",
    "subtitle": "상시 주거용이 아닌 휴양·피서용 주거용 건축물",
    "bullets": [
      "2023년 3월 14일부터 별장이라는 이유만으로 취득세를 중과하지 않음",
      "2021년 기출의 별장 중과 관련 규정은 당시 법령 기준이므로 현행법과 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 6,
    "sourceSection": "취득세·중과세",
    "sourceRef": "국가법령정보센터 「지방세법」 제13조제5항 (2023.3.14. 별장 중과 삭제)",
    "sourceNote": "2026-10-08: 2021년 제32회 기출 직접 등장 용어이므로 카드 보존, 폐지된 별장 중과 규정은 현행 설명으로 교정.",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second2-028"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「지방세법」 제13조제5항 (2023.3.14. 별장 중과 삭제)"
  },
  {
    "id": "tax-card-053",
    "subject": "tax_law",
    "order": 53,
    "type": "term",
    "category": "취득세·중과세",
    "title": "고급주택",
    "subtitle": "면적·가액·시설 등 법정 요건을 충족하는 고급 주거용 건축물",
    "bullets": [
      "사치성 재산에 해당하면 취득세가 중과"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "취득세·중과세",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p6 · 취득세·중과세"
  },
  {
    "id": "tax-card-054",
    "subject": "tax_law",
    "order": 54,
    "type": "term",
    "category": "취득세·중과세",
    "title": "고급오락장",
    "subtitle": "도박장·유흥주점 등 법정 고급오락 용도의 부동산",
    "bullets": [
      "토지와 건축물의 중과 여부를 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "취득세·중과세",
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
      "2023-34-second2-031"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p6 · 취득세·중과세"
  },
  {
    "id": "tax-card-055",
    "subject": "tax_law",
    "order": 55,
    "type": "term",
    "category": "취득세·중과세",
    "title": "대도시 법인중과",
    "subtitle": "대도시 법인설립·지점설치·전입 등에 따른 부동산 취득의 중과",
    "bullets": [
      "중과대상과 제외업종·예외를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 6,
    "sourceSection": "취득세·중과세",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p6 · 취득세·중과세"
  },
  {
    "id": "tax-card-056",
    "subject": "tax_law",
    "order": 56,
    "type": "term",
    "category": "취득세·세율",
    "title": "취득세 세율특례",
    "subtitle": "형식적 취득이나 의제취득에 일반 표준세율과 다른 구조를 적용하는 제도",
    "bullets": [
      "공유물분할·합병·개수·지목변경 등의 유형을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 7,
    "sourceSection": "취득세·세율",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p7 · 취득세·세율"
  },
  {
    "id": "tax-card-057",
    "subject": "tax_law",
    "order": 57,
    "type": "term",
    "category": "취득세·세율",
    "title": "형식적 취득",
    "subtitle": "실질적 재산증가가 크지 않은 소유형태 정리 등 취득",
    "bullets": [
      "공유물분할·법인합병 등은 법정 세율특례가 적용될 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 7,
    "sourceSection": "취득세·세율",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p7 · 취득세·세율"
  },
  {
    "id": "tax-card-058",
    "subject": "tax_law",
    "order": 58,
    "type": "term",
    "category": "취득세·비과세",
    "title": "취득세 비과세",
    "subtitle": "국가 등의 취득 등 법률상 취득세를 부과하지 않는 경우",
    "bullets": [
      "국가·지자체의 취득 등 법정 비과세 사유를 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 4,
    "sourceSection": "취득세·비과세",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p4 · 취득세·비과세"
  },
  {
    "id": "tax-card-059",
    "subject": "tax_law",
    "order": 59,
    "type": "term",
    "category": "취득세·비과세",
    "title": "취득세 면세점",
    "subtitle": "취득가액이 소액인 일정 취득에 취득세를 부과하지 않는 제도",
    "bullets": [
      "취득가액이 50만원 이하이면 취득세를 부과하지 않음",
      "취득 후 1년 안에 인접 토지·건축물을 추가 취득한 경우에는 법정 합산 규정을 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 7,
    "sourceSection": "취득세·비과세",
    "sourceRef": "국가법령정보센터 「지방세법」 제17조",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국가법령정보센터 「지방세법」 제17조. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국가법령정보센터 「지방세법」 제17조"
  },
  {
    "id": "tax-card-060",
    "subject": "tax_law",
    "order": 60,
    "type": "term",
    "category": "취득세·부과징수",
    "title": "취득세 신고납부",
    "subtitle": "취득 후 법정 신고기한 내 과세표준과 세액을 신고·납부하는 절차",
    "bullets": [
      "일반 취득은 취득일부터 60일 이내에 신고·납부",
      "일반 무상취득·부담부증여는 취득일이 속하는 달의 말일부터 3개월",
      "상속은 상속개시일이 속하는 달의 말일부터 6개월(해외주소 상속인이 있으면 9개월)",
      "신고기한 전에 등기·등록하려면 접수일까지 먼저 신고·납부"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 7,
    "sourceSection": "취득세·부과징수",
    "sourceRef": "국가법령정보센터 「지방세법」 제20조제1항·제4항",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국가법령정보센터 「지방세법」 제20조제1항·제4항. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국가법령정보센터 「지방세법」 제20조제1항·제4항"
  },
  {
    "id": "tax-card-061",
    "subject": "tax_law",
    "order": 61,
    "type": "term",
    "category": "취득세·부과징수",
    "title": "취득세 보통징수",
    "subtitle": "신고가 없거나 부족한 경우 과세관청이 세액을 부과·징수하는 방식",
    "bullets": [
      "가산세와 함께 추가 징수될 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 7,
    "sourceSection": "취득세·부과징수",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p7 · 취득세·부과징수"
  },
  {
    "id": "tax-card-062",
    "subject": "tax_law",
    "order": 62,
    "type": "term",
    "category": "취득세·부과징수",
    "title": "취득세 납세지",
    "subtitle": "취득세를 납부할 지방자치단체를 정하는 기준",
    "bullets": [
      "부동산은 소재지, 차량 등은 등록지 등 과세물건별 기준을 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 7,
    "sourceSection": "취득세·부과징수",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p7 · 취득세·부과징수"
  },
  {
    "id": "tax-card-063",
    "subject": "tax_law",
    "order": 63,
    "type": "term",
    "category": "등록면허세·총칙",
    "title": "등록면허세",
    "subtitle": "재산권 등의 등기·등록 또는 각종 면허에 부과하는 지방세",
    "bullets": [
      "취득세와 달리 등록이라는 형식 자체가 과세대상이 되는 경우가 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 7,
    "sourceSection": "등록면허세·총칙",
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
      "2021-32-second2-031",
      "2021-32-second2-032",
      "2022-33-second2-037",
      "2023-34-second2-033",
      "2023-34-second2-034",
      "2025-36-second2-025",
      "2025-36-second2-027"
    ],
    "importance": 4,
    "sourceLabel": "부동산세법 요약집 p7 · 등록면허세·총칙"
  },
  {
    "id": "tax-card-064",
    "subject": "tax_law",
    "order": 64,
    "type": "term",
    "category": "등록면허세·총칙",
    "title": "등록면허세 납세의무자",
    "subtitle": "등기·등록을 받거나 면허를 받는 자",
    "bullets": [
      "권리의 설정·변경·소멸 등을 등록받는 자가 원칙"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 7,
    "sourceSection": "등록면허세·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p7 · 등록면허세·총칙"
  },
  {
    "id": "tax-card-065",
    "subject": "tax_law",
    "order": 65,
    "type": "term",
    "category": "등록면허세·총칙",
    "title": "등록면허세 과세대상",
    "subtitle": "재산권과 권리의 설정·변경·소멸에 관한 등기·등록 등",
    "bullets": [
      "취득세 과세대상 취득을 원인으로 하는 등기·등록은 원칙적으로 제외"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 7,
    "sourceSection": "등록면허세·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p7 · 등록면허세·총칙"
  },
  {
    "id": "tax-card-066",
    "subject": "tax_law",
    "order": 66,
    "type": "term",
    "category": "등록면허세·비과세",
    "title": "등록면허세 비과세",
    "subtitle": "국가 등의 등록 등 법정 사유에서 등록면허세를 부과하지 않는 것",
    "bullets": [
      "비과세와 감면을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 8,
    "sourceSection": "등록면허세·비과세",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p8 · 등록면허세·비과세"
  },
  {
    "id": "tax-card-067",
    "subject": "tax_law",
    "order": 67,
    "type": "term",
    "category": "등록면허세·과세표준",
    "title": "등록면허세 과세표준",
    "subtitle": "등록면허세액 계산의 기초가 되는 가액 또는 건수",
    "bullets": [
      "부동산가액·채권금액·임대보증금 또는 건수 등을 기준으로 하는 유형이 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 8,
    "sourceSection": "등록면허세·과세표준",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p8 · 등록면허세·과세표준"
  },
  {
    "id": "tax-card-068",
    "subject": "tax_law",
    "order": 68,
    "type": "term",
    "category": "등록면허세·세율",
    "title": "종가세 등록",
    "subtitle": "부동산가액·채권금액 등 가액에 비례해 등록면허세를 계산하는 등록",
    "bullets": [
      "소유권·저당권 등 권리등기가 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 8,
    "sourceSection": "등록면허세·세율",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p8 · 등록면허세·세율"
  },
  {
    "id": "tax-card-069",
    "subject": "tax_law",
    "order": 69,
    "type": "term",
    "category": "등록면허세·세율",
    "title": "종량세 등록",
    "subtitle": "가액이 아니라 등기·등록 건수에 정액세율을 적용하는 등록",
    "bullets": [
      "말소·변경 등 일정 등기가 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 8,
    "sourceSection": "등록면허세·세율",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p8 · 등록면허세·세율"
  },
  {
    "id": "tax-card-070",
    "subject": "tax_law",
    "order": 70,
    "type": "term",
    "category": "등록면허세·세율",
    "title": "등록면허세 표준세율",
    "subtitle": "등기·등록 유형별 기본세율",
    "bullets": [
      "소유권·소유권 외 물권·임차권·법인등기 등 유형을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 8,
    "sourceSection": "등록면허세·세율",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p8 · 등록면허세·세율"
  },
  {
    "id": "tax-card-071",
    "subject": "tax_law",
    "order": 71,
    "type": "term",
    "category": "등록면허세·중과세",
    "title": "대도시 법인등기 중과",
    "subtitle": "대도시에서 법인설립·전입 등 일정 법인등기에 높은 세율을 적용하는 제도",
    "bullets": [
      "법정 중과제외 사유와 함께 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 8,
    "sourceSection": "등록면허세·중과세",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p8 · 등록면허세·중과세"
  },
  {
    "id": "tax-card-072",
    "subject": "tax_law",
    "order": 72,
    "type": "term",
    "category": "등록면허세·부과징수",
    "title": "등록면허세 신고납부",
    "subtitle": "등기·등록을 하기 전까지 등록면허세를 신고·납부하는 절차",
    "bullets": [
      "등록분 등록면허세는 등기·등록을 하기 전까지 신고·납부해야 함",
      "등록 후 법정 중과대상에 해당하면 추가 신고·납부 규정이 적용될 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 8,
    "sourceSection": "등록면허세·부과징수",
    "sourceRef": "국가법령정보센터 「지방세법」 제30조",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국가법령정보센터 「지방세법」 제30조. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2022
    ],
    "examSampleRefs": [
      "2022-33-second2-037"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「지방세법」 제30조"
  },
  {
    "id": "tax-card-073",
    "subject": "tax_law",
    "order": 73,
    "type": "term",
    "category": "등록면허세·세율",
    "title": "등록면허세 최저세액",
    "subtitle": "종가세 산출액이 해당 종류의 최저 정액세율보다 작을 때 적용하는 하한",
    "bullets": [
      "부동산 등기 중 '그 밖의 등기' 정액세율은 건당 6천원",
      "등록 종류마다 최저 정액세율이 다르므로 모든 등록에 6천원을 일률 적용하지 않음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 8,
    "sourceSection": "등록면허세·세율",
    "sourceRef": "국가법령정보센터 「지방세법」 제28조제1항",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국가법령정보센터 「지방세법」 제28조제1항. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국가법령정보센터 「지방세법」 제28조제1항"
  },
  {
    "id": "tax-card-074",
    "subject": "tax_law",
    "order": 74,
    "type": "term",
    "category": "재산세·총칙",
    "title": "재산세",
    "subtitle": "토지·건축물·주택·선박·항공기 보유에 부과하는 지방세",
    "bullets": [
      "매년 과세기준일 현재 보유상태를 기준으로 과세"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "재산세·총칙",
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
      "2021-32-second2-028",
      "2021-32-second2-029",
      "2021-32-second2-032",
      "2021-32-second2-033",
      "2021-32-second2-035",
      "2022-33-second2-027",
      "2022-33-second2-028",
      "2022-33-second2-029",
      "2022-33-second2-040",
      "2023-34-second2-031"
    ],
    "importance": 5,
    "sourceLabel": "부동산세법 요약집 p9 · 재산세·총칙"
  },
  {
    "id": "tax-card-075",
    "subject": "tax_law",
    "order": 75,
    "type": "term",
    "category": "재산세·총칙",
    "title": "재산세 과세기준일",
    "subtitle": "재산세 납세의무자를 판단하는 기준일",
    "bullets": [
      "매년 6월 1일 현재 사실상 소유자를 중심으로 판단"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 9,
    "sourceSection": "재산세·총칙",
    "sourceRef": "4.공인중개사요약_세법.pdf p9 + 국가법령정보센터 「지방세법」 재산세 과세기준일 관련 조문",
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
      "2021-32-second2-032",
      "2022-33-second2-028",
      "2024-35-2-2-033",
      "2025-36-second2-029"
    ],
    "importance": 3,
    "sourceLabel": "4.공인중개사요약_세법.pdf p9 + 국가법령정보센터 「지방세법」 재산세 과세기준일 관련 조문"
  },
  {
    "id": "tax-card-076",
    "subject": "tax_law",
    "order": 76,
    "type": "term",
    "category": "재산세·납세의무",
    "title": "재산세 납세의무자",
    "subtitle": "과세기준일 현재 재산의 사실상 소유자",
    "bullets": [
      "공부상 소유자·사용자·주된 상속자 등 법정 예외를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "재산세·납세의무",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p9 · 재산세·납세의무"
  },
  {
    "id": "tax-card-077",
    "subject": "tax_law",
    "order": 77,
    "type": "term",
    "category": "재산세·납세의무",
    "title": "사실상 소유자",
    "subtitle": "실질적으로 재산을 소유하는 자로 재산세 납세의무의 원칙적 주체",
    "bullets": [
      "공부상 명의와 실제 소유가 다를 때 법정 요건에 따라 판단"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "재산세·납세의무",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p9 · 재산세·납세의무"
  },
  {
    "id": "tax-card-078",
    "subject": "tax_law",
    "order": 78,
    "type": "term",
    "category": "재산세·총칙",
    "title": "재산세 과세대상",
    "subtitle": "토지·건축물·주택·선박·항공기",
    "bullets": [
      "토지와 건축물, 주택은 과세구분 방식이 다름"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "재산세·총칙",
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
      "2021-32-second2-035",
      "2022-33-second2-027",
      "2024-35-2-2-033",
      "2025-36-second2-029"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p9 · 재산세·총칙"
  },
  {
    "id": "tax-card-079",
    "subject": "tax_law",
    "order": 79,
    "type": "term",
    "category": "재산세·과세대상",
    "title": "주택의 재산세 판정",
    "subtitle": "주거와 비주거가 혼합된 건물 등을 주택으로 볼지 판단하는 기준",
    "bullets": [
      "주거용 면적과 건물 구조·부속토지 기준을 함께 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "재산세·과세대상",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p9 · 재산세·과세대상"
  },
  {
    "id": "tax-card-080",
    "subject": "tax_law",
    "order": 80,
    "type": "term",
    "category": "재산세·과세표준",
    "title": "재산세 시가표준액",
    "subtitle": "재산세 과세표준 산정의 출발점이 되는 법정 평가가액",
    "bullets": [
      "토지·주택의 공시가격과 기타 재산의 시가표준액을 사용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "재산세·과세표준",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p9 · 재산세·과세표준"
  },
  {
    "id": "tax-card-081",
    "subject": "tax_law",
    "order": 81,
    "type": "term",
    "category": "재산세·과세표준",
    "title": "재산세 공정시장가액비율",
    "subtitle": "시가표준액에 곱해 재산세 과세표준을 정하는 비율",
    "bullets": [
      "2026년 일반 토지·건축물은 70%, 일반 주택은 60%"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 9,
    "sourceSection": "재산세·과세표준",
    "sourceRef": "국가법령정보센터 「지방세법 시행령」 제109조",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「지방세법 시행령」 제109조"
  },
  {
    "id": "tax-card-082",
    "subject": "tax_law",
    "order": 82,
    "type": "term",
    "category": "재산세·과세표준",
    "title": "2026 1주택 공정비율",
    "subtitle": "2026년 1세대 1주택 재산세 과세표준에 적용하는 특례비율",
    "bullets": [
      "시가표준액 3억원 이하 43%, 3억원 초과 6억원 이하 44%, 6억원 초과 45%"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "1세대 1주택 공정시장가액비율"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "재산세·과세표준",
    "sourceRef": "국가법령정보센터 「지방세법 시행령」 제109조",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「지방세법 시행령」 제109조"
  },
  {
    "id": "tax-card-083",
    "subject": "tax_law",
    "order": 83,
    "type": "term",
    "category": "재산세·토지과세",
    "title": "종합합산과세 토지",
    "subtitle": "별도합산·분리과세가 아닌 일반 토지를 합산하여 과세하는 토지분",
    "bullets": [
      "나대지·일반 잡종지 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 10,
    "sourceSection": "재산세·토지과세",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p10 · 재산세·토지과세"
  },
  {
    "id": "tax-card-084",
    "subject": "tax_law",
    "order": 84,
    "type": "term",
    "category": "재산세·토지과세",
    "title": "별도합산과세 토지",
    "subtitle": "사업용 건축물 부속토지 등 법정 토지를 별도로 합산하는 토지분",
    "bullets": [
      "종합합산보다 사업용 성격을 고려한 세율체계를 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 10,
    "sourceSection": "재산세·토지과세",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p10 · 재산세·토지과세"
  },
  {
    "id": "tax-card-085",
    "subject": "tax_law",
    "order": 85,
    "type": "term",
    "category": "재산세·토지과세",
    "title": "분리과세 토지",
    "subtitle": "법정 토지를 다른 토지와 합산하지 않고 개별적으로 과세하는 토지분",
    "bullets": [
      "농지 등 저율분리·골프장 등 고율분리·사업용 분리과세를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "재산세·토지과세",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p9 · 재산세·토지과세"
  },
  {
    "id": "tax-card-086",
    "subject": "tax_law",
    "order": 86,
    "type": "term",
    "category": "재산세·세율",
    "title": "주택분 재산세",
    "subtitle": "주택과 그 부속토지를 하나의 과세대상으로 보아 부과하는 재산세",
    "bullets": [
      "주택별 과세표준에 누진세율을 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "재산세·세율",
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
      "2022-33-second2-029"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p9 · 재산세·세율"
  },
  {
    "id": "tax-card-087",
    "subject": "tax_law",
    "order": 87,
    "type": "term",
    "category": "재산세·세율",
    "title": "건축물분 재산세",
    "subtitle": "주택 외 건축물에 부과하는 재산세",
    "bullets": [
      "골프장·고급오락장·공장용 건축물 등 유형별 세율을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 10,
    "sourceSection": "재산세·세율",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p10 · 재산세·세율"
  },
  {
    "id": "tax-card-088",
    "subject": "tax_law",
    "order": 88,
    "type": "term",
    "category": "재산세·세율",
    "title": "재산세 도시지역분",
    "subtitle": "도시지역 내 일정 토지·건축물·주택에 추가로 부과되는 재산세액",
    "bullets": [
      "일반 재산세와 함께 고지될 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 10,
    "sourceSection": "재산세·세율",
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
      "2021-32-second2-028"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p10 · 재산세·세율"
  },
  {
    "id": "tax-card-089",
    "subject": "tax_law",
    "order": 89,
    "type": "term",
    "category": "재산세·비과세",
    "title": "재산세 비과세",
    "subtitle": "국가 소유 재산·공용재산 등 법정 과세제외",
    "bullets": [
      "유료사용 여부 등 비과세 배제사유를 함께 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "재산세·비과세",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p9 · 재산세·비과세"
  },
  {
    "id": "tax-card-090",
    "subject": "tax_law",
    "order": 90,
    "type": "term",
    "category": "재산세·부과징수",
    "title": "재산세 납기",
    "subtitle": "재산 종류에 따라 정해진 재산세 납부기간",
    "bullets": [
      "건축물·선박·항공기: 7월 16일~31일, 토지: 9월 16일~30일",
      "주택: 원칙적으로 7월과 9월에 절반씩 납부",
      "주택분 해당 연도 세액이 20만원 이하이면 조례에 따라 7월 한 번에 부과할 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 11,
    "sourceSection": "재산세·부과징수",
    "sourceRef": "국가법령정보센터 「지방세법」 제115조",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국가법령정보센터 「지방세법」 제115조. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국가법령정보센터 「지방세법」 제115조"
  },
  {
    "id": "tax-card-091",
    "subject": "tax_law",
    "order": 91,
    "type": "term",
    "category": "재산세·부과징수",
    "title": "재산세 보통징수",
    "subtitle": "과세관청이 납세고지서를 발급해 재산세를 징수하는 방식",
    "bullets": [
      "신고납부세목인 취득세와 대비"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 11,
    "sourceSection": "재산세·부과징수",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p11 · 재산세·부과징수"
  },
  {
    "id": "tax-card-092",
    "subject": "tax_law",
    "order": 92,
    "type": "term",
    "category": "재산세·부과징수",
    "title": "재산세 분할납부",
    "subtitle": "재산세액이 일정 기준을 넘으면 법정 범위에서 나누어 납부하는 제도",
    "bullets": [
      "납부세액이 250만원을 초과하면 법정 범위에서 분할납부 가능",
      "500만원 이하는 250만원 초과분, 500만원 초과는 세액의 절반 이하",
      "재산세 분납기한은 원래 납부기한이 지난 날부터 3개월 이내"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 11,
    "sourceSection": "재산세·부과징수",
    "sourceRef": "국가법령정보센터 「지방세법」 제118조·시행령 제116조",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국가법령정보센터 「지방세법」 제118조·시행령 제116조. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국가법령정보센터 「지방세법」 제118조·시행령 제116조"
  },
  {
    "id": "tax-card-093",
    "subject": "tax_law",
    "order": 93,
    "type": "term",
    "category": "재산세·부과징수",
    "title": "재산세 물납",
    "subtitle": "일정 요건을 충족한 재산세를 부동산으로 납부하는 제도",
    "bullets": [
      "재산세 납부세액이 1천만원을 초과할 때 물납 신청 가능",
      "물납은 해당 지방자치단체 관할구역 내 부동산에 한하여 허가할 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 11,
    "sourceSection": "재산세·부과징수",
    "sourceRef": "국가법령정보센터 「지방세법」 제117조",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국가법령정보센터 「지방세법」 제117조. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second2-029"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「지방세법」 제117조"
  },
  {
    "id": "tax-card-094",
    "subject": "tax_law",
    "order": 94,
    "type": "term",
    "category": "재산세·부과징수",
    "title": "재산세 소액징수면제",
    "subtitle": "고지서 1장당 세액이 법정 소액이면 징수하지 않는 제도",
    "bullets": [
      "고지서 1장당 징수할 재산세액이 2천원 미만이면 징수하지 않음",
      "취득세 면세점(취득가액)과 달리 재산세 고지서별 세액 기준"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 11,
    "sourceSection": "재산세·부과징수",
    "sourceRef": "국가법령정보센터 「지방세법」 제119조",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국가법령정보센터 「지방세법」 제119조. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국가법령정보센터 「지방세법」 제119조"
  },
  {
    "id": "tax-card-095",
    "subject": "tax_law",
    "order": 95,
    "type": "term",
    "category": "재산세·부가세",
    "title": "재산세 지방교육세",
    "subtitle": "재산세액에 부가되는 지방교육세",
    "bullets": [
      "재산세와 연계해 부과되는 목적세"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 11,
    "sourceSection": "재산세·부가세",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p11 · 재산세·부가세"
  },
  {
    "id": "tax-card-096",
    "subject": "tax_law",
    "order": 96,
    "type": "term",
    "category": "재산세·부가세",
    "title": "지역자원시설세 병기",
    "subtitle": "특정 부동산 재산세 고지서에 지역자원시설세를 함께 적어 고지하는 방식",
    "bullets": [
      "재산세 자체와 별도의 지방세라는 점을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 11,
    "sourceSection": "재산세·부가세",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p11 · 재산세·부가세"
  },
  {
    "id": "tax-card-097",
    "subject": "tax_law",
    "order": 97,
    "type": "term",
    "category": "재산세·과세대상",
    "title": "공부와 사실현황 과세",
    "subtitle": "공부상 등재와 실제 현황이 다를 때 재산세 과세대상을 판단하는 원칙",
    "bullets": [
      "원칙적으로 사실상 현황을 기준으로 하되 법정 예외를 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 9,
    "sourceSection": "재산세·과세대상",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p9 · 재산세·과세대상"
  },
  {
    "id": "tax-card-098",
    "subject": "tax_law",
    "order": 98,
    "type": "term",
    "category": "종합부동산세·총칙",
    "title": "종합부동산세",
    "subtitle": "고액 부동산 보유자에게 부과하는 국세",
    "bullets": [
      "주택분과 토지분으로 구분하고 재산세와 과세체계를 연계"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 11,
    "sourceSection": "종합부동산세·총칙",
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
      "2021-32-second2-032",
      "2021-32-second2-033",
      "2021-32-second2-034",
      "2021-32-second2-035",
      "2022-33-second2-029",
      "2022-33-second2-030",
      "2023-34-second2-025",
      "2023-34-second2-029",
      "2023-34-second2-030",
      "2024-35-2-2-027"
    ],
    "importance": 5,
    "sourceLabel": "부동산세법 요약집 p11 · 종합부동산세·총칙"
  },
  {
    "id": "tax-card-099",
    "subject": "tax_law",
    "order": 99,
    "type": "term",
    "category": "종합부동산세·총칙",
    "title": "종부세 과세기준일",
    "subtitle": "종합부동산세 납세의무자를 판단하는 기준일",
    "bullets": [
      "재산세와 동일하게 매년 6월 1일"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 11,
    "sourceSection": "종합부동산세·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p11 · 종합부동산세·총칙"
  },
  {
    "id": "tax-card-100",
    "subject": "tax_law",
    "order": 100,
    "type": "term",
    "category": "종합부동산세·주택",
    "title": "주택분 종부세",
    "subtitle": "일정 기준을 넘는 주택 공시가격 합계에 부과하는 종합부동산세",
    "bullets": [
      "납세의무자별 전국 주택 공시가격을 합산해 과세표준을 계산"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 12,
    "sourceSection": "종합부동산세·주택",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p12 · 종합부동산세·주택"
  },
  {
    "id": "tax-card-101",
    "subject": "tax_law",
    "order": 101,
    "type": "term",
    "category": "종합부동산세·주택",
    "title": "종부세 1세대 1주택자",
    "subtitle": "대통령령 요건을 충족한 1세대 1주택 소유자",
    "bullets": [
      "과세표준 공제와 세액공제 등에서 별도 규정이 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 12,
    "sourceSection": "종합부동산세·주택",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p12 · 종합부동산세·주택"
  },
  {
    "id": "tax-card-102",
    "subject": "tax_law",
    "order": 102,
    "type": "term",
    "category": "종합부동산세·주택",
    "title": "주택분 종부세 기본공제",
    "subtitle": "주택 공시가격 합계에서 과세표준 계산 전에 공제하는 금액",
    "bullets": [
      "2026년 1세대 1주택자는 12억원, 그 밖의 일반 개인은 9억원"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "종합부동산세·주택",
    "sourceRef": "국가법령정보센터 「종합부동산세법」 제8조",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「종합부동산세법」 제8조"
  },
  {
    "id": "tax-card-103",
    "subject": "tax_law",
    "order": 103,
    "type": "term",
    "category": "종합부동산세·주택",
    "title": "주택분 종부세 공정비율",
    "subtitle": "주택분 종합부동산세 과세표준에 적용하는 공정시장가액비율",
    "bullets": [
      "2026년 현행 시행령상 60%"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "종부세 공정시장가액비율"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "종합부동산세·주택",
    "sourceRef": "국가법령정보센터 「종합부동산세법 시행령」 제2조의4",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「종합부동산세법 시행령」 제2조의4"
  },
  {
    "id": "tax-card-104",
    "subject": "tax_law",
    "order": 104,
    "type": "term",
    "category": "종합부동산세·주택",
    "title": "종부세 합산배제주택",
    "subtitle": "법정 요건을 충족해 주택분 종부세 합산대상에서 제외되는 주택",
    "bullets": [
      "임대주택·사원용주택 등 법정 유형과 신고요건을 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 12,
    "sourceSection": "종합부동산세·주택",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p12 · 종합부동산세·주택"
  },
  {
    "id": "tax-card-105",
    "subject": "tax_law",
    "order": 105,
    "type": "term",
    "category": "종합부동산세·주택",
    "title": "주택분 재산세액 공제",
    "subtitle": "종부세 과세대상 주택에 이미 부과된 재산세 상당액을 종부세에서 공제하는 제도",
    "bullets": [
      "이중과세 조정을 위한 장치"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 12,
    "sourceSection": "종합부동산세·주택",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p12 · 종합부동산세·주택"
  },
  {
    "id": "tax-card-106",
    "subject": "tax_law",
    "order": 106,
    "type": "term",
    "category": "종합부동산세·주택",
    "title": "고령자 세액공제",
    "subtitle": "1세대 1주택자 등의 연령에 따라 주택분 종부세에서 공제하는 제도",
    "bullets": [
      "1세대 1주택자 등 법정 요건 충족 시 60세 이상 20%, 65세 이상 30%, 70세 이상 40%",
      "장기보유 세액공제와 합산하여 최대 80%까지 공제"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 12,
    "sourceSection": "종합부동산세·주택",
    "sourceRef": "국가법령정보센터 「종합부동산세법」 제9조 / 국세청 종합부동산세 안내",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국가법령정보센터 「종합부동산세법」 제9조 / 국세청 종합부동산세 안내. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국가법령정보센터 「종합부동산세법」 제9조 / 국세청 종합부동산세 안내"
  },
  {
    "id": "tax-card-107",
    "subject": "tax_law",
    "order": 107,
    "type": "term",
    "category": "종합부동산세·주택",
    "title": "장기보유 세액공제",
    "subtitle": "1세대 1주택자 등의 보유기간에 따라 주택분 종부세에서 공제하는 제도",
    "bullets": [
      "1세대 1주택자 등 법정 요건 충족 시 5년 이상 20%, 10년 이상 40%, 15년 이상 50%",
      "고령자 세액공제와 합산한 한도는 최대 80%"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 12,
    "sourceSection": "종합부동산세·주택",
    "sourceRef": "국가법령정보센터 「종합부동산세법」 제9조 / 국세청 종합부동산세 안내",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국가법령정보센터 「종합부동산세법」 제9조 / 국세청 종합부동산세 안내. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국가법령정보센터 「종합부동산세법」 제9조 / 국세청 종합부동산세 안내"
  },
  {
    "id": "tax-card-108",
    "subject": "tax_law",
    "order": 108,
    "type": "term",
    "category": "종합부동산세·토지",
    "title": "종합합산 토지 종부세",
    "subtitle": "종합합산과세대상 토지 공시가격을 합산해 부과하는 토지분 종부세",
    "bullets": [
      "공시가격 합계에서 5억원을 공제한 뒤 법정 공정시장가액비율 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 13,
    "sourceSection": "종합부동산세·토지",
    "sourceRef": "4.공인중개사요약_세법.pdf p13 + 국가법령정보센터 「종합부동산세법」 제13조",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "4.공인중개사요약_세법.pdf p13 + 국가법령정보센터 「종합부동산세법」 제13조"
  },
  {
    "id": "tax-card-109",
    "subject": "tax_law",
    "order": 109,
    "type": "term",
    "category": "종합부동산세·토지",
    "title": "별도합산 토지 종부세",
    "subtitle": "별도합산과세대상 토지 공시가격을 합산해 부과하는 토지분 종부세",
    "bullets": [
      "공시가격 합계에서 80억원을 공제한 뒤 법정 공정시장가액비율 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 13,
    "sourceSection": "종합부동산세·토지",
    "sourceRef": "4.공인중개사요약_세법.pdf p13 + 국가법령정보센터 「종합부동산세법」 제13조",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "4.공인중개사요약_세법.pdf p13 + 국가법령정보센터 「종합부동산세법」 제13조"
  },
  {
    "id": "tax-card-110",
    "subject": "tax_law",
    "order": 110,
    "type": "term",
    "category": "종합부동산세·토지",
    "title": "토지분 종부세 공정비율",
    "subtitle": "토지분 종합부동산세 과세표준에 적용하는 공정시장가액비율",
    "bullets": [
      "2026년 현행 시행령상 종합합산·별도합산 토지는 100%"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "종합부동산세·토지",
    "sourceRef": "국가법령정보센터 「종합부동산세법 시행령」 제2조의4",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「종합부동산세법 시행령」 제2조의4"
  },
  {
    "id": "tax-card-111",
    "subject": "tax_law",
    "order": 111,
    "type": "term",
    "category": "종합부동산세·토지",
    "title": "토지분 재산세액 공제",
    "subtitle": "종부세 과세대상 토지에 이미 부과된 재산세 상당액을 공제하는 제도",
    "bullets": [
      "주택분과 마찬가지로 이중과세를 조정"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 13,
    "sourceSection": "종합부동산세·토지",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p13 · 종합부동산세·토지"
  },
  {
    "id": "tax-card-112",
    "subject": "tax_law",
    "order": 112,
    "type": "term",
    "category": "종합부동산세·부과징수",
    "title": "종부세 정부부과",
    "subtitle": "세무서장이 과세표준과 세액을 계산해 고지하는 종부세 기본 부과방식",
    "bullets": [
      "관할 세무서장이 종합부동산세액을 결정하여 12월 1일~15일 부과·징수하는 것이 기본",
      "납세자가 법정기간에 신고납부를 선택할 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 13,
    "sourceSection": "종합부동산세·부과징수",
    "sourceRef": "국가법령정보센터 「종합부동산세법」 제16조",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국가법령정보센터 「종합부동산세법」 제16조. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국가법령정보센터 「종합부동산세법」 제16조"
  },
  {
    "id": "tax-card-113",
    "subject": "tax_law",
    "order": 113,
    "type": "term",
    "category": "종합부동산세·부과징수",
    "title": "종부세 신고납부 선택",
    "subtitle": "납세자가 정해진 기간에 직접 과세표준·세액을 신고해 납부하는 선택제도",
    "bullets": [
      "납세자는 12월 1일~15일에 종부세 과세표준·세액을 신고하고 납부하는 방식을 선택 가능",
      "법정 신고를 하면 정부부과 방식의 기존 결정은 없었던 것으로 봄"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 13,
    "sourceSection": "종합부동산세·부과징수",
    "sourceRef": "국가법령정보센터 「종합부동산세법」 제16조제3항·제4항",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국가법령정보센터 「종합부동산세법」 제16조제3항·제4항. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국가법령정보센터 「종합부동산세법」 제16조제3항·제4항"
  },
  {
    "id": "tax-card-114",
    "subject": "tax_law",
    "order": 114,
    "type": "term",
    "category": "종합부동산세·부과징수",
    "title": "종부세 납부기간",
    "subtitle": "종합부동산세를 납부하는 법정 기간",
    "bullets": [
      "종합부동산세 법정 납부기간은 매년 12월 1일부터 12월 15일까지",
      "납부기한이 공휴일에 해당하는 경우에는 기한 연장 규정을 함께 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 13,
    "sourceSection": "종합부동산세·부과징수",
    "sourceRef": "국가법령정보센터 「종합부동산세법」 제16조 / 국세청 종부세 납부기한",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국가법령정보센터 「종합부동산세법」 제16조 / 국세청 종부세 납부기한. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국가법령정보센터 「종합부동산세법」 제16조 / 국세청 종부세 납부기한"
  },
  {
    "id": "tax-card-115",
    "subject": "tax_law",
    "order": 115,
    "type": "term",
    "category": "종합부동산세·부과징수",
    "title": "종부세 분납",
    "subtitle": "납부할 종부세액이 일정 기준을 넘으면 나누어 납부하는 제도",
    "bullets": [
      "납부할 종부세액이 250만원을 초과하면 6개월 이내 분납 가능",
      "250만원 초과 500만원 이하는 250만원 초과분, 500만원 초과는 세액의 50% 이하",
      "재산세 분납기한(3개월)과 종부세 분납기한(6개월)을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 13,
    "sourceSection": "종합부동산세·부과징수",
    "sourceRef": "국세청 「종합부동산세 납부기한」 / 종합부동산세법 제20조",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국세청 「종합부동산세 납부기한」 / 종합부동산세법 제20조. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국세청 「종합부동산세 납부기한」 / 종합부동산세법 제20조"
  },
  {
    "id": "tax-card-116",
    "subject": "tax_law",
    "order": 116,
    "type": "term",
    "category": "종합부동산세·부가세",
    "title": "종부세 농어촌특별세",
    "subtitle": "종합부동산세액에 부가되는 농어촌특별세",
    "bullets": [
      "종합부동산세의 20%에 해당하는 농어촌특별세가 부과됨",
      "종부세를 분납하면 농어촌특별세도 종부세와 같은 비율로 분납"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 13,
    "sourceSection": "종합부동산세·부가세",
    "sourceRef": "국세청 「종합부동산세 납부기한」",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국세청 「종합부동산세 납부기한」. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국세청 「종합부동산세 납부기한」"
  },
  {
    "id": "tax-card-117",
    "subject": "tax_law",
    "order": 117,
    "type": "term",
    "category": "종합부동산세·신탁",
    "title": "신탁재산 종부세",
    "subtitle": "신탁부동산의 종부세 납세의무와 수탁자 물적납세의무에 관한 제도",
    "bullets": [
      "위탁자의 종부세 체납 시 법정 요건에서 수탁자가 신탁재산으로 납부할 의무를 질 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "종합부동산세·신탁",
    "sourceRef": "국가법령정보센터 「종합부동산세법」 제12조의2 등",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「종합부동산세법」 제12조의2 등"
  },
  {
    "id": "tax-card-118",
    "subject": "tax_law",
    "order": 118,
    "type": "term",
    "category": "소득세·총칙",
    "title": "소득세",
    "subtitle": "개인의 소득에 부과하는 국세",
    "bullets": [
      "거주자는 원칙적으로 국내외 소득, 비거주자는 국내원천소득에 과세"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 13,
    "sourceSection": "소득세·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 36,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-026",
      "2021-32-second2-030",
      "2021-32-second2-032",
      "2021-32-second2-036",
      "2021-32-second2-037",
      "2021-32-second2-038",
      "2021-32-second2-039",
      "2021-32-second2-040",
      "2022-33-second2-032",
      "2022-33-second2-033"
    ],
    "importance": 5,
    "sourceLabel": "부동산세법 요약집 p13 · 소득세·총칙"
  },
  {
    "id": "tax-card-119",
    "subject": "tax_law",
    "order": 119,
    "type": "term",
    "category": "소득세·납세의무",
    "title": "거주자",
    "subtitle": "국내에 주소를 두거나 법정 기간 이상 거소를 둔 개인",
    "bullets": [
      "소득세법상 무제한 납세의무가 원칙"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "소득세·납세의무",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 28,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-031",
      "2021-32-second2-032",
      "2021-32-second2-033",
      "2021-32-second2-036",
      "2021-32-second2-038",
      "2021-32-second2-040",
      "2022-33-second2-031",
      "2022-33-second2-032",
      "2022-33-second2-033",
      "2022-33-second2-034"
    ],
    "importance": 5,
    "sourceLabel": "부동산세법 요약집 p14 · 소득세·납세의무"
  },
  {
    "id": "tax-card-120",
    "subject": "tax_law",
    "order": 120,
    "type": "term",
    "category": "소득세·납세의무",
    "title": "비거주자",
    "subtitle": "거주자가 아닌 개인으로 국내원천소득이 있는 자",
    "bullets": [
      "국내원천소득에 한해 제한적으로 납세의무"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "소득세·납세의무",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p14 · 소득세·납세의무"
  },
  {
    "id": "tax-card-121",
    "subject": "tax_law",
    "order": 121,
    "type": "term",
    "category": "소득세·과세기간",
    "title": "소득세 과세기간",
    "subtitle": "소득세를 계산하는 기본 기간",
    "bullets": [
      "원칙적으로 1월 1일부터 12월 31일까지"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "소득세·과세기간",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p14 · 소득세·과세기간"
  },
  {
    "id": "tax-card-122",
    "subject": "tax_law",
    "order": 122,
    "type": "term",
    "category": "소득세·납세지",
    "title": "소득세 납세지",
    "subtitle": "소득세를 신고·납부할 관할 세무서를 정하는 기준",
    "bullets": [
      "거주자는 원칙적으로 주소지, 비거주자는 국내사업장 등 법정 기준"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "소득세·납세지",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p14 · 소득세·납세지"
  },
  {
    "id": "tax-card-123",
    "subject": "tax_law",
    "order": 123,
    "type": "term",
    "category": "소득세·과세방법",
    "title": "종합과세",
    "subtitle": "여러 소득을 합산해 하나의 과세표준으로 계산하는 방식",
    "bullets": [
      "이자·배당·사업·근로·연금·기타소득 등이 대상"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 13,
    "sourceSection": "소득세·과세방법",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p13 · 소득세·과세방법"
  },
  {
    "id": "tax-card-124",
    "subject": "tax_law",
    "order": 124,
    "type": "term",
    "category": "소득세·과세방법",
    "title": "분류과세",
    "subtitle": "다른 소득과 합산하지 않고 별도의 과세표준으로 계산하는 방식",
    "bullets": [
      "퇴직소득과 양도소득이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 13,
    "sourceSection": "소득세·과세방법",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p13 · 소득세·과세방법"
  },
  {
    "id": "tax-card-125",
    "subject": "tax_law",
    "order": 125,
    "type": "term",
    "category": "소득세·과세방법",
    "title": "분리과세",
    "subtitle": "일정 소득을 다른 소득과 합산하지 않고 별도 세율로 과세종결하는 방식",
    "bullets": [
      "법정 금융소득·주택임대소득 등에서 적용될 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 13,
    "sourceSection": "소득세·과세방법",
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
      "2021-32-second2-035",
      "2022-33-second2-036",
      "2024-35-2-2-028",
      "2024-35-2-2-032",
      "2025-36-second2-029"
    ],
    "importance": 4,
    "sourceLabel": "부동산세법 요약집 p13 · 소득세·과세방법"
  },
  {
    "id": "tax-card-126",
    "subject": "tax_law",
    "order": 126,
    "type": "term",
    "category": "소득세·사업소득",
    "title": "사업소득",
    "subtitle": "사업활동에서 발생하는 소득",
    "bullets": [
      "부동산임대업·부동산매매업 등에서 발생한 소득이 포함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "소득세·사업소득",
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
      "2022-33-second2-031",
      "2022-33-second2-036",
      "2023-34-second2-035",
      "2024-35-2-2-032",
      "2025-36-second2-036"
    ],
    "importance": 4,
    "sourceLabel": "부동산세법 요약집 p14 · 소득세·사업소득"
  },
  {
    "id": "tax-card-127",
    "subject": "tax_law",
    "order": 127,
    "type": "term",
    "category": "소득세·부동산임대",
    "title": "부동산임대업 소득",
    "subtitle": "부동산 또는 부동산상의 권리를 대여해 얻는 사업소득",
    "bullets": [
      "임대료·관리비·간주임대료 등 총수입금액에서 필요경비를 공제"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "소득세·부동산임대",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p14 · 소득세·부동산임대"
  },
  {
    "id": "tax-card-128",
    "subject": "tax_law",
    "order": 128,
    "type": "term",
    "category": "소득세·부동산임대",
    "title": "주택임대소득",
    "subtitle": "주택을 임대하여 얻는 사업소득",
    "bullets": [
      "주택 수·임대수입 규모 등 법정 요건에 따라 과세방법이 달라짐"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "소득세·부동산임대",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 2,
    "examYears": [
      2022,
      2024
    ],
    "examSampleRefs": [
      "2022-33-second2-036",
      "2024-35-2-2-032"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p14 · 소득세·부동산임대"
  },
  {
    "id": "tax-card-129",
    "subject": "tax_law",
    "order": 129,
    "type": "term",
    "category": "소득세·부동산임대",
    "title": "간주임대료",
    "subtitle": "보증금 등에서 발생한 것으로 보아 임대수입에 포함하는 금액",
    "bullets": [
      "법정 주택 수·보증금 요건과 이자율을 적용해 계산"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "소득세·부동산임대",
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
      "2022-33-second2-036"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p14 · 소득세·부동산임대"
  },
  {
    "id": "tax-card-130",
    "subject": "tax_law",
    "order": 130,
    "type": "term",
    "category": "소득세·부동산임대",
    "title": "선세금",
    "subtitle": "여러 과세기간에 걸친 임대료를 미리 받은 금액",
    "bullets": [
      "대여기간에 대응하도록 수입금액을 안분"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "소득세·부동산임대",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p14 · 소득세·부동산임대"
  },
  {
    "id": "tax-card-131",
    "subject": "tax_law",
    "order": 131,
    "type": "term",
    "category": "소득세·부동산임대",
    "title": "부동산임대업 결손금",
    "subtitle": "부동산임대업에서 필요경비가 총수입금액을 초과한 금액",
    "bullets": [
      "주거용 건물 임대업 여부 등에 따라 다른 종합소득과의 공제범위가 달라짐"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 14,
    "sourceSection": "소득세·부동산임대",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p14 · 소득세·부동산임대"
  },
  {
    "id": "tax-card-132",
    "subject": "tax_law",
    "order": 132,
    "type": "term",
    "category": "양도소득세·총칙",
    "title": "양도소득세",
    "subtitle": "자산의 양도로 발생한 소득에 부과하는 국세",
    "bullets": [
      "종합소득과 구분하여 분류과세"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "양도소득세·총칙",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 24,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-026",
      "2021-32-second2-032",
      "2021-32-second2-036",
      "2021-32-second2-037",
      "2021-32-second2-038",
      "2021-32-second2-039",
      "2022-33-second2-032",
      "2022-33-second2-033",
      "2022-33-second2-034",
      "2022-33-second2-038"
    ],
    "importance": 5,
    "sourceLabel": "부동산세법 요약집 p15 · 양도소득세·총칙"
  },
  {
    "id": "tax-card-133",
    "subject": "tax_law",
    "order": 133,
    "type": "term",
    "category": "양도소득세·과세대상",
    "title": "양도소득세 과세대상",
    "subtitle": "토지·건물·부동산에 관한 권리·주식·기타자산 등 법정 자산",
    "bullets": [
      "자산 유형별 과세여부를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "양도소득세·과세대상",
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
      "2021-32-second2-037",
      "2022-33-second2-038",
      "2023-34-second2-038",
      "2024-35-2-2-037"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p15 · 양도소득세·과세대상"
  },
  {
    "id": "tax-card-134",
    "subject": "tax_law",
    "order": 134,
    "type": "term",
    "category": "양도소득세·과세대상",
    "title": "부동산에 관한 권리",
    "subtitle": "지상권·전세권·등기된 부동산임차권 등 양도세 과세대상 권리",
    "bullets": [
      "부동산 그 자체와 구별되는 권리"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "양도소득세·과세대상",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p15 · 양도소득세·과세대상"
  },
  {
    "id": "tax-card-135",
    "subject": "tax_law",
    "order": 135,
    "type": "term",
    "category": "양도소득세·과세대상",
    "title": "부동산 취득권리",
    "subtitle": "분양권·매매계약상 권리 등 부동산을 취득할 수 있는 권리",
    "bullets": [
      "계약금만 지급한 상태의 권리 등도 과세대상이 될 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "양도소득세·과세대상",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p15 · 양도소득세·과세대상"
  },
  {
    "id": "tax-card-136",
    "subject": "tax_law",
    "order": 136,
    "type": "term",
    "category": "양도소득세·과세대상",
    "title": "조합원입주권",
    "subtitle": "정비사업 등으로 조합원이 새 주택을 공급받을 수 있는 권리",
    "bullets": [
      "양도세 과세와 주택 수 계산에서 별도 규정이 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "양도소득세·과세대상",
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
      "2024-35-2-2-037"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p15 · 양도소득세·과세대상"
  },
  {
    "id": "tax-card-137",
    "subject": "tax_law",
    "order": 137,
    "type": "term",
    "category": "양도소득세·과세대상",
    "title": "분양권",
    "subtitle": "주택 등 분양계약에 따라 장래 소유권을 취득할 수 있는 권리",
    "bullets": [
      "현행 세율과 주택 수 규정에서 조합원입주권과 함께 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "양도소득세·과세대상",
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
      "2023-34-second2-037"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p15 · 양도소득세·과세대상"
  },
  {
    "id": "tax-card-138",
    "subject": "tax_law",
    "order": 138,
    "type": "term",
    "category": "양도소득세·과세대상",
    "title": "기타자산",
    "subtitle": "사업용 고정자산과 함께 양도하는 영업권·특정시설물이용권 등 법정 자산",
    "bullets": [
      "부동산 관련성이 큰 특정 주식 등도 포함될 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "양도소득세·과세대상",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p15 · 양도소득세·과세대상"
  },
  {
    "id": "tax-card-139",
    "subject": "tax_law",
    "order": 139,
    "type": "term",
    "category": "양도소득세·양도",
    "title": "양도",
    "subtitle": "자산을 유상으로 사실상 이전하는 것",
    "bullets": [
      "매매·교환·법인 현물출자·대물변제 등이 대표적"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 15,
    "sourceSection": "양도소득세·양도",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 33,
    "examYears": [
      2021,
      2022,
      2023,
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-026",
      "2021-32-second2-032",
      "2021-32-second2-036",
      "2021-32-second2-037",
      "2021-32-second2-038",
      "2021-32-second2-039",
      "2021-32-second2-040",
      "2022-33-second2-032",
      "2022-33-second2-033",
      "2022-33-second2-034"
    ],
    "importance": 5,
    "sourceLabel": "부동산세법 요약집 p15 · 양도소득세·양도"
  },
  {
    "id": "tax-card-140",
    "subject": "tax_law",
    "order": 140,
    "type": "term",
    "category": "양도소득세·양도",
    "title": "부담부증여",
    "subtitle": "수증자가 채무를 인수하는 조건의 증여",
    "bullets": [
      "채무 인수액에 해당하는 부분은 증여자에게 유상양도로 보아 양도세가 과세될 수 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 19,
    "sourceSection": "양도소득세·양도",
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
      "2021-32-second2-027",
      "2022-33-second2-038",
      "2023-34-second2-027",
      "2024-35-2-2-038",
      "2025-36-second2-035"
    ],
    "importance": 4,
    "sourceLabel": "부동산세법 요약집 p19 · 양도소득세·양도"
  },
  {
    "id": "tax-card-141",
    "subject": "tax_law",
    "order": 141,
    "type": "term",
    "category": "양도소득세·양도",
    "title": "양도로 보지 않는 경우",
    "subtitle": "형식상 이전이 있어도 양도소득세법상 양도로 보지 않는 유형",
    "bullets": [
      "환지처분·단순 공유물분할·일정 양도담보 등 법정 유형을 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 16,
    "sourceSection": "양도소득세·양도",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p16 · 양도소득세·양도"
  },
  {
    "id": "tax-card-142",
    "subject": "tax_law",
    "order": 142,
    "type": "term",
    "category": "양도소득세·시기",
    "title": "양도·취득시기",
    "subtitle": "양도소득세 계산에서 취득일과 양도일을 정하는 기준",
    "bullets": [
      "원칙은 대금청산일이며 법정 예외를 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 16,
    "sourceSection": "양도소득세·시기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p16 · 양도소득세·시기"
  },
  {
    "id": "tax-card-143",
    "subject": "tax_law",
    "order": 143,
    "type": "term",
    "category": "양도소득세·시기",
    "title": "대금청산일",
    "subtitle": "일반 매매에서 양도·취득시기의 원칙이 되는 날",
    "bullets": [
      "잔금 약정일이 아니라 실제 대금이 청산된 날이 기준"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 16,
    "sourceSection": "양도소득세·시기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p16 · 양도소득세·시기"
  },
  {
    "id": "tax-card-144",
    "subject": "tax_law",
    "order": 144,
    "type": "term",
    "category": "양도소득세·시기",
    "title": "등기접수일 특례",
    "subtitle": "대금청산일이 불분명하거나 청산 전에 등기한 경우 적용하는 시기",
    "bullets": [
      "등기·등록 접수일을 양도·취득시기로 보는 법정 예외"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 16,
    "sourceSection": "양도소득세·시기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p16 · 양도소득세·시기"
  },
  {
    "id": "tax-card-145",
    "subject": "tax_law",
    "order": 145,
    "type": "term",
    "category": "양도소득세·시기",
    "title": "장기할부 취득시기",
    "subtitle": "장기할부조건 거래의 양도·취득시기",
    "bullets": [
      "소유권이전등기 접수일·인도일·사용수익일 중 빠른 날 등을 기준"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 16,
    "sourceSection": "양도소득세·시기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p16 · 양도소득세·시기"
  },
  {
    "id": "tax-card-146",
    "subject": "tax_law",
    "order": 146,
    "type": "term",
    "category": "양도소득세·시기",
    "title": "자가건설 건물 취득시기",
    "subtitle": "자기가 건설한 건축물의 취득시기",
    "bullets": [
      "원칙적으로 사용승인서 교부일, 그 전에 사용하면 사실상 사용일 등을 기준"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 16,
    "sourceSection": "양도소득세·시기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p16 · 양도소득세·시기"
  },
  {
    "id": "tax-card-147",
    "subject": "tax_law",
    "order": 147,
    "type": "term",
    "category": "양도소득세·시기",
    "title": "상속·증여 취득시기",
    "subtitle": "상속·증여로 자산을 취득한 경우의 취득시기",
    "bullets": [
      "상속개시일과 증여받은 날을 각각 기준"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 16,
    "sourceSection": "양도소득세·시기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p16 · 양도소득세·시기"
  },
  {
    "id": "tax-card-148",
    "subject": "tax_law",
    "order": 148,
    "type": "term",
    "category": "양도소득세·시기",
    "title": "경매 취득시기",
    "subtitle": "경매로 부동산을 취득한 경우의 취득시기",
    "bullets": [
      "원칙적으로 경매대금 완납일"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 16,
    "sourceSection": "양도소득세·시기",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p16 · 양도소득세·시기"
  },
  {
    "id": "tax-card-149",
    "subject": "tax_law",
    "order": 149,
    "type": "concept",
    "category": "양도소득세·계산",
    "title": "양도소득 계산구조",
    "subtitle": "양도가액에서 필요경비·공제액을 차감해 과세표준을 구하는 순서",
    "bullets": [
      "양도차익 → 장기보유특별공제 → 양도소득금액 → 기본공제 → 과세표준"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 17,
    "sourceSection": "양도소득세·계산",
    "sourceRef": "4.공인중개사요약_세법.pdf p17 + 국가법령정보센터 「소득세법」 제92조",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "4.공인중개사요약_세법.pdf p17 + 국가법령정보센터 「소득세법」 제92조"
  },
  {
    "id": "tax-card-150",
    "subject": "tax_law",
    "order": 150,
    "type": "term",
    "category": "양도소득세·계산",
    "title": "양도가액",
    "subtitle": "자산 양도로 받은 대가로서 양도차익 계산의 출발점",
    "bullets": [
      "원칙적으로 실지거래가액을 기준"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "양도소득세·계산",
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
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-038",
      "2022-33-second2-032",
      "2022-33-second2-034",
      "2024-35-2-2-036",
      "2024-35-2-2-039",
      "2025-36-second2-038"
    ],
    "importance": 4,
    "sourceLabel": "부동산세법 요약집 p17 · 양도소득세·계산"
  },
  {
    "id": "tax-card-151",
    "subject": "tax_law",
    "order": 151,
    "type": "term",
    "category": "양도소득세·필요경비",
    "title": "취득가액",
    "subtitle": "양도자산을 취득하는 데 든 가액",
    "bullets": [
      "원칙적으로 실지거래가액을 기준으로 필요경비에 포함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "양도소득세·필요경비",
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
      "2021-32-second2-038",
      "2022-33-second2-031",
      "2022-33-second2-032",
      "2022-33-second2-033",
      "2022-33-second2-034",
      "2022-33-second2-040",
      "2024-35-2-2-036",
      "2025-36-second2-027"
    ],
    "importance": 4,
    "sourceLabel": "부동산세법 요약집 p17 · 양도소득세·필요경비"
  },
  {
    "id": "tax-card-152",
    "subject": "tax_law",
    "order": 152,
    "type": "term",
    "category": "양도소득세·계산",
    "title": "실지거래가액",
    "subtitle": "실제로 거래한 금액을 기준으로 양도차익을 계산하는 방식",
    "bullets": [
      "현행 양도소득세 계산의 원칙"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "양도소득세·계산",
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
      "2021-32-second2-036",
      "2022-33-second2-032",
      "2023-34-second2-040",
      "2024-35-2-2-038",
      "2024-35-2-2-039",
      "2025-36-second2-032",
      "2025-36-second2-038"
    ],
    "importance": 4,
    "sourceLabel": "부동산세법 요약집 p17 · 양도소득세·계산"
  },
  {
    "id": "tax-card-153",
    "subject": "tax_law",
    "order": 153,
    "type": "term",
    "category": "양도소득세·계산",
    "title": "추계가액",
    "subtitle": "실지거래가액을 인정·확인하기 어려울 때 법정 순서로 추정한 가액",
    "bullets": [
      "매매사례가액·감정가액·환산가액·기준시가 등을 활용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "양도소득세·계산",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p17 · 양도소득세·계산"
  },
  {
    "id": "tax-card-154",
    "subject": "tax_law",
    "order": 154,
    "type": "term",
    "category": "양도소득세·계산",
    "title": "매매사례가액",
    "subtitle": "유사자산의 실제 거래사례를 이용한 추계가액",
    "bullets": [
      "추계결정 시 우선 검토되는 가액 중 하나"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "양도소득세·계산",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p17 · 양도소득세·계산"
  },
  {
    "id": "tax-card-155",
    "subject": "tax_law",
    "order": 155,
    "type": "term",
    "category": "양도소득세·계산",
    "title": "감정가액",
    "subtitle": "감정평가 결과를 이용한 추계가액",
    "bullets": [
      "법정 요건에 맞는 감정가액을 사용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "양도소득세·계산",
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
      "2022-33-second2-033"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p17 · 양도소득세·계산"
  },
  {
    "id": "tax-card-156",
    "subject": "tax_law",
    "order": 156,
    "type": "term",
    "category": "양도소득세·계산",
    "title": "환산취득가액",
    "subtitle": "양도가액과 취득·양도 당시 기준시가 비율로 환산한 취득가액",
    "bullets": [
      "취득 실지거래가액을 확인하기 어려운 경우 활용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "양도소득세·계산",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p17 · 양도소득세·계산"
  },
  {
    "id": "tax-card-157",
    "subject": "tax_law",
    "order": 157,
    "type": "term",
    "category": "양도소득세·계산",
    "title": "기준시가",
    "subtitle": "소득세법상 자산 유형별로 정한 평가기준가액",
    "bullets": [
      "실지거래가액과 추계가액 계산에서 사용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "양도소득세·계산",
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
      2023
    ],
    "examSampleRefs": [
      "2021-32-second2-036",
      "2022-33-second2-032",
      "2022-33-second2-036",
      "2023-34-second2-035",
      "2023-34-second2-040"
    ],
    "importance": 4,
    "sourceLabel": "부동산세법 요약집 p17 · 양도소득세·계산"
  },
  {
    "id": "tax-card-158",
    "subject": "tax_law",
    "order": 158,
    "type": "term",
    "category": "양도소득세·필요경비",
    "title": "필요경비",
    "subtitle": "양도차익 계산에서 양도가액에서 공제하는 취득·개량·양도 관련 비용",
    "bullets": [
      "취득가액·자본적지출액·양도비 등이 핵심"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "양도소득세·필요경비",
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
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-026",
      "2021-32-second2-036",
      "2021-32-second2-038",
      "2021-32-second2-040",
      "2022-33-second2-034",
      "2024-35-2-2-036",
      "2025-36-second2-038"
    ],
    "importance": 4,
    "sourceLabel": "부동산세법 요약집 p17 · 양도소득세·필요경비"
  },
  {
    "id": "tax-card-159",
    "subject": "tax_law",
    "order": 159,
    "type": "term",
    "category": "양도소득세·필요경비",
    "title": "자본적지출액",
    "subtitle": "자산 가치 증가·내용연수 연장 등에 든 비용",
    "bullets": [
      "법정 증빙이 있는 경우 필요경비에 산입"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "양도소득세·필요경비",
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
      "2021-32-second2-036",
      "2023-34-second2-040",
      "2025-36-second2-038",
      "2025-36-second2-040"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p17 · 양도소득세·필요경비"
  },
  {
    "id": "tax-card-160",
    "subject": "tax_law",
    "order": 160,
    "type": "term",
    "category": "양도소득세·필요경비",
    "title": "양도비",
    "subtitle": "자산을 양도하기 위해 직접 지출한 비용",
    "bullets": [
      "중개보수·인지대 등 법정 양도비용을 포함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 18,
    "sourceSection": "양도소득세·필요경비",
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
      2025
    ],
    "examSampleRefs": [
      "2022-33-second2-032",
      "2023-34-second2-040",
      "2025-36-second2-038",
      "2025-36-second2-040"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p18 · 양도소득세·필요경비"
  },
  {
    "id": "tax-card-161",
    "subject": "tax_law",
    "order": 161,
    "type": "term",
    "category": "양도소득세·필요경비",
    "title": "필요경비 개산공제",
    "subtitle": "실제 일부 필요경비를 확인하기 어려운 경우 기준시가 등에 일정률을 적용하는 공제",
    "bullets": [
      "자산 종류와 미등기 여부에 따라 방식이 다름"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 18,
    "sourceSection": "양도소득세·필요경비",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p18 · 양도소득세·필요경비"
  },
  {
    "id": "tax-card-162",
    "subject": "tax_law",
    "order": 162,
    "type": "term",
    "category": "양도소득세·계산",
    "title": "양도차익",
    "subtitle": "양도가액에서 필요경비를 뺀 금액",
    "bullets": [
      "양도소득금액 계산의 기초"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "양도소득세·계산",
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
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-036",
      "2021-32-second2-038",
      "2022-33-second2-034",
      "2024-35-2-2-036",
      "2024-35-2-2-040",
      "2025-36-second2-038",
      "2025-36-second2-040"
    ],
    "importance": 4,
    "sourceLabel": "부동산세법 요약집 p17 · 양도소득세·계산"
  },
  {
    "id": "tax-card-163",
    "subject": "tax_law",
    "order": 163,
    "type": "term",
    "category": "양도소득세·공제",
    "title": "장기보유특별공제",
    "subtitle": "장기간 보유한 일정 자산의 양도차익에서 공제하는 제도",
    "bullets": [
      "미등기자산 등 법정 배제대상과 1세대 1주택 특례를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 18,
    "sourceSection": "양도소득세·공제",
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
      2024
    ],
    "examSampleRefs": [
      "2021-32-second2-026",
      "2023-34-second2-040",
      "2024-35-2-2-036",
      "2024-35-2-2-040"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p18 · 양도소득세·공제"
  },
  {
    "id": "tax-card-164",
    "subject": "tax_law",
    "order": 164,
    "type": "term",
    "category": "양도소득세·계산",
    "title": "양도소득금액",
    "subtitle": "양도차익에서 장기보유특별공제액을 뺀 금액",
    "bullets": [
      "양도소득 기본공제 전 단계"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 18,
    "sourceSection": "양도소득세·계산",
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
      2024,
      2025
    ],
    "examSampleRefs": [
      "2021-32-second2-038",
      "2023-34-second2-026",
      "2024-35-2-2-038",
      "2024-35-2-2-039",
      "2025-36-second2-035"
    ],
    "importance": 4,
    "sourceLabel": "부동산세법 요약집 p18 · 양도소득세·계산"
  },
  {
    "id": "tax-card-165",
    "subject": "tax_law",
    "order": 165,
    "type": "term",
    "category": "양도소득세·공제",
    "title": "양도소득기본공제",
    "subtitle": "양도소득금액에서 소득별로 공제하는 기본공제",
    "bullets": [
      "양도소득 유형별로 해당 과세기간 양도소득금액에서 연 250만원 기본공제",
      "미등기양도자산은 양도소득기본공제 적용이 배제"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 17,
    "sourceSection": "양도소득세·공제",
    "sourceRef": "국가법령정보센터 「소득세법」 제103조 / 국세청 양도세 계산 안내",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국가법령정보센터 「소득세법」 제103조 / 국세청 양도세 계산 안내. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "exam",
      "summary"
    ],
    "examHitCount": 1,
    "examYears": [
      2021
    ],
    "examSampleRefs": [
      "2021-32-second2-026"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「소득세법」 제103조 / 국세청 양도세 계산 안내"
  },
  {
    "id": "tax-card-166",
    "subject": "tax_law",
    "order": 166,
    "type": "term",
    "category": "양도소득세·계산",
    "title": "양도소득과세표준",
    "subtitle": "양도소득금액에서 기본공제를 뺀 세율 적용 대상금액",
    "bullets": [
      "종합소득과 별도로 계산"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 17,
    "sourceSection": "양도소득세·계산",
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
      "2022-33-second2-038",
      "2023-34-second2-037",
      "2023-34-second2-040",
      "2024-35-2-2-040",
      "2025-36-second2-035"
    ],
    "importance": 4,
    "sourceLabel": "부동산세법 요약집 p17 · 양도소득세·계산"
  },
  {
    "id": "tax-card-167",
    "subject": "tax_law",
    "order": 167,
    "type": "term",
    "category": "양도소득세·세율",
    "title": "양도소득 기본세율",
    "subtitle": "일반 토지·건물 등에 적용하는 초과누진세율",
    "bullets": [
      "2026년 현행 기본세율은 6%부터 45%까지의 누진구조"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "양도소득세 기본세율"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "양도소득세·세율",
    "sourceRef": "국가법령정보센터 「소득세법」 제55조·제104조",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「소득세법」 제55조·제104조"
  },
  {
    "id": "tax-card-168",
    "subject": "tax_law",
    "order": 168,
    "type": "term",
    "category": "양도소득세·세율",
    "title": "단기보유 세율",
    "subtitle": "보유기간이 짧은 토지·건물 등에 적용하는 별도 양도세율",
    "bullets": [
      "일반 토지·건물: 보유 1년 미만 50%, 1년 이상 2년 미만 40%",
      "주택·조합원입주권·분양권: 보유 1년 미만 70%, 1년 이상 2년 미만 60%",
      "분양권은 보유기간 2년 이상이어도 60% 세율을 적용하는 별도 규정을 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "양도소득세·세율",
    "sourceRef": "국가법령정보센터 「소득세법」 제104조",
    "sourceNote": "2026-10-08: 소득세법 제104조제1항제1~3호에 따라 보유기간별 세율 및 분양권 장기보유 60% 규정을 구별.",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「소득세법」 제104조"
  },
  {
    "id": "tax-card-169",
    "subject": "tax_law",
    "order": 169,
    "type": "term",
    "category": "양도소득세·세율",
    "title": "미등기양도자산",
    "subtitle": "취득등기를 하지 않고 양도하는 자산",
    "bullets": [
      "현행법상 70% 세율, 비과세·감면·장기보유특별공제·기본공제 제한 등이 문제됨"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 20,
    "sourceSection": "양도소득세·세율",
    "sourceRef": "4.공인중개사요약_세법.pdf p20 + 국가법령정보센터 「소득세법」 제104조 등",
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
      "2021-32-second2-026",
      "2023-34-second2-039"
    ],
    "importance": 3,
    "sourceLabel": "4.공인중개사요약_세법.pdf p20 + 국가법령정보센터 「소득세법」 제104조 등"
  },
  {
    "id": "tax-card-170",
    "subject": "tax_law",
    "order": 170,
    "type": "term",
    "category": "양도소득세·세율",
    "title": "미등기양도제외자산",
    "subtitle": "등기하지 않았어도 법정 사유로 미등기 중과에서 제외되는 자산",
    "bullets": [
      "법원의 결정으로 등기불가·장기할부·도시개발사업 미완료 등 법정 유형을 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 20,
    "sourceSection": "양도소득세·세율",
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
      "2021-32-second2-026",
      "2021-32-second2-039"
    ],
    "importance": 3,
    "sourceLabel": "부동산세법 요약집 p20 · 양도소득세·세율"
  },
  {
    "id": "tax-card-171",
    "subject": "tax_law",
    "order": 171,
    "type": "term",
    "category": "양도소득세·세율",
    "title": "비사업용 토지",
    "subtitle": "법정 기간 동안 소유자의 사업에 직접 사용하지 않은 토지",
    "bullets": [
      "기간기준과 토지용도 기준을 모두 확인하며 기본세율보다 중과된 누진세율이 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "양도소득세·세율",
    "sourceRef": "국가법령정보센터 「소득세법」 제104조의3 + 국가법령정보센터 「소득세법 시행령」 제168조의6 등",
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
      "2024-35-2-2-040",
      "2025-36-second2-037"
    ],
    "importance": 3,
    "sourceLabel": "국가법령정보센터 「소득세법」 제104조의3 + 국가법령정보센터 「소득세법 시행령」 제168조의6 등"
  },
  {
    "id": "tax-card-172",
    "subject": "tax_law",
    "order": 172,
    "type": "term",
    "category": "양도소득세·세율",
    "title": "비사업용 토지 기간기준",
    "subtitle": "토지 보유기간 중 비사업용으로 본 기간을 판단하는 기준",
    "bullets": [
      "보유기간 5년 이상이면 최근 5년·3년·전체 보유기간의 법정 기준을 함께 판단"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "양도소득세·세율",
    "sourceRef": "국가법령정보센터 「소득세법 시행령」 제168조의6",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「소득세법 시행령」 제168조의6"
  },
  {
    "id": "tax-card-173",
    "subject": "tax_law",
    "order": 173,
    "type": "term",
    "category": "양도소득세·세율",
    "title": "다주택자 중과",
    "subtitle": "조정대상지역의 일정 다주택 양도에 기본세율을 가산하는 제도",
    "bullets": [
      "중과 유예는 2026년 5월 9일 종료되었고 현행 적용배제 주택을 별도로 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "양도소득세·세율",
    "sourceRef": "국가법령정보센터 「소득세법 시행령」 제167조의3·제167조의10 등",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「소득세법 시행령」 제167조의3·제167조의10 등"
  },
  {
    "id": "tax-card-174",
    "subject": "tax_law",
    "order": 174,
    "type": "term",
    "category": "양도소득세·비과세",
    "title": "1세대 1주택 비과세",
    "subtitle": "법정 보유·거주 등 요건을 갖춘 1세대 1주택 양도소득 비과세",
    "bullets": [
      "고가주택은 전부 비과세가 아니며 일시적 2주택 등 특례가 있음"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 21,
    "sourceSection": "양도소득세·비과세",
    "sourceRef": "4.공인중개사요약_세법.pdf p21 + 국가법령정보센터 「소득세법」 제89조",
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
      "2024-35-2-2-038",
      "2024-35-2-2-039"
    ],
    "importance": 3,
    "sourceLabel": "4.공인중개사요약_세법.pdf p21 + 국가법령정보센터 「소득세법」 제89조"
  },
  {
    "id": "tax-card-175",
    "subject": "tax_law",
    "order": 175,
    "type": "term",
    "category": "양도소득세·비과세",
    "title": "고가주택 12억원 기준",
    "subtitle": "1세대 1주택 비과세에서 고가주택을 구분하는 현행 기준",
    "bullets": [
      "주택과 부수토지의 양도 당시 실지거래가액 합계가 12억원을 초과하면 초과분 관련 양도차익을 과세"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [
      "고가주택"
    ],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "양도소득세·비과세",
    "sourceRef": "국가법령정보센터 「소득세법」 제89조 + 국가법령정보센터 「소득세법 시행령」 제160조",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「소득세법」 제89조 + 국가법령정보센터 「소득세법 시행령」 제160조"
  },
  {
    "id": "tax-card-176",
    "subject": "tax_law",
    "order": 176,
    "type": "formula",
    "category": "양도소득세·비과세",
    "title": "고가주택 양도차익",
    "subtitle": "고가 1세대 1주택의 과세대상 양도차익을 안분하는 계산",
    "bullets": [
      "전체 양도차익에 (양도가액-12억원)/양도가액 비율을 적용"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "양도소득세·비과세",
    "sourceRef": "국가법령정보센터 「소득세법 시행령」 제160조",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「소득세법 시행령」 제160조"
  },
  {
    "id": "tax-card-177",
    "subject": "tax_law",
    "order": 177,
    "type": "term",
    "category": "양도소득세·비과세",
    "title": "일시적 2주택 특례",
    "subtitle": "대체취득·상속·혼인 등으로 일시적으로 2주택 이상이 된 경우의 비과세 특례",
    "bullets": [
      "사유별 처분기한·거주요건 등 현행 시행령 요건을 충족해야 함"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 21,
    "sourceSection": "양도소득세·비과세",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p21 · 양도소득세·비과세"
  },
  {
    "id": "tax-card-178",
    "subject": "tax_law",
    "order": 178,
    "type": "term",
    "category": "양도소득세·비과세",
    "title": "조합원입주권 비과세특례",
    "subtitle": "1주택과 조합원입주권을 보유한 경우 일정 주택 양도에 적용하는 특례",
    "bullets": [
      "입주권 취득시점·종전주택 양도시기·거주요건 등을 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 22,
    "sourceSection": "양도소득세·비과세",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p22 · 양도소득세·비과세"
  },
  {
    "id": "tax-card-179",
    "subject": "tax_law",
    "order": 179,
    "type": "term",
    "category": "양도소득세·특례",
    "title": "부담부증여 양도차익",
    "subtitle": "부담부증여에서 채무 인수부분의 양도차익을 계산하는 방식",
    "bullets": [
      "채무 인수액에 대응하는 양도가액·취득가액을 안분하여 계산"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 19,
    "sourceSection": "양도소득세·특례",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p19 · 양도소득세·특례"
  },
  {
    "id": "tax-card-180",
    "subject": "tax_law",
    "order": 180,
    "type": "term",
    "category": "양도소득세·특례",
    "title": "증여재산 이월과세",
    "subtitle": "배우자·직계존비속에게 증여받은 자산을 일정 기간 내 양도할 때 증여자의 취득가액 등을 승계하는 제도",
    "bullets": [
      "부동산 등은 양도일부터 소급하여 10년 이내 증여받은 경우가 기본"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 19,
    "sourceSection": "양도소득세·특례",
    "sourceRef": "4.공인중개사요약_세법.pdf p19 + 국가법령정보센터 「소득세법」 제97조의2",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "4.공인중개사요약_세법.pdf p19 + 국가법령정보센터 「소득세법」 제97조의2"
  },
  {
    "id": "tax-card-181",
    "subject": "tax_law",
    "order": 181,
    "type": "term",
    "category": "양도소득세·특례",
    "title": "부당행위계산 부인",
    "subtitle": "특수관계인 거래로 조세부담을 부당하게 줄인 경우 정상가액으로 다시 계산하는 제도",
    "bullets": [
      "우회양도 등에서 거래형태와 세부담 감소 여부를 판단"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 19,
    "sourceSection": "양도소득세·특례",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p19 · 양도소득세·특례"
  },
  {
    "id": "tax-card-182",
    "subject": "tax_law",
    "order": 182,
    "type": "term",
    "category": "양도소득세·계산",
    "title": "양도차손 통산",
    "subtitle": "같은 과세기간의 양도차익과 양도차손을 법정 소득군별로 통산하는 제도",
    "bullets": [
      "자산군에 따라 통산 범위와 기본공제 적용순서를 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "양도소득세·계산",
    "sourceRef": "국가법령정보센터 「소득세법」 제102조",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「소득세법」 제102조"
  },
  {
    "id": "tax-card-183",
    "subject": "tax_law",
    "order": 183,
    "type": "term",
    "category": "양도소득세·신고납부",
    "title": "양도소득 예정신고",
    "subtitle": "자산 양도 후 법정기한 내 양도소득과세표준을 신고하는 절차",
    "bullets": [
      "토지·건물 등 일반 양도는 양도일이 속하는 달의 말일부터 2개월 이내 예정신고",
      "부담부증여 중 채무 인수액을 양도로 보는 부분은 양도월 말일부터 3개월",
      "토지거래허가구역에서 허가 전 잔금을 청산한 경우 등의 예외를 구별"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 20,
    "sourceSection": "양도소득세·신고납부",
    "sourceRef": "국가법령정보센터 「소득세법」 제105조",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국가법령정보센터 「소득세법」 제105조. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국가법령정보센터 「소득세법」 제105조"
  },
  {
    "id": "tax-card-184",
    "subject": "tax_law",
    "order": 184,
    "type": "term",
    "category": "양도소득세·신고납부",
    "title": "양도소득 확정신고",
    "subtitle": "한 해의 양도소득을 다음 연도 법정기간에 확정해 신고하는 절차",
    "bullets": [
      "양도소득 확정신고는 원칙적으로 다음 해 5월 1일~31일",
      "예정신고를 했다면 일정 요건에서 확정신고를 생략할 수 있지만, 연간 복수 양도 등은 별도 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary+official",
    "sourcePage": 21,
    "sourceSection": "양도소득세·신고납부",
    "sourceRef": "국가법령정보센터 「소득세법」 제110조 / 국세청 양도세 신고 안내",
    "sourceNote": "2026-10-08 2차 현행법 검수: 국가법령정보센터 「소득세법」 제110조 / 국세청 양도세 신고 안내. 요약집의 이전 수치가 아닌 해당 시행법 기준.",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "국가법령정보센터 「소득세법」 제110조 / 국세청 양도세 신고 안내"
  },
  {
    "id": "tax-card-185",
    "subject": "tax_law",
    "order": 185,
    "type": "term",
    "category": "양도소득세·신고납부",
    "title": "양도소득세 분할납부",
    "subtitle": "납부세액이 일정 기준을 넘으면 일부를 나누어 납부하는 제도",
    "bullets": [
      "현행 법정 분납기준·기한을 확인"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 21,
    "sourceSection": "양도소득세·신고납부",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p21 · 양도소득세·신고납부"
  },
  {
    "id": "tax-card-186",
    "subject": "tax_law",
    "order": 186,
    "type": "term",
    "category": "양도소득세·신고납부",
    "title": "양도소득세 납세지",
    "subtitle": "양도소득세를 신고·납부할 세무서의 관할 기준",
    "bullets": [
      "거주자는 주소지, 비거주자는 국내사업장·자산소재지 등 법정 기준"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "summary",
    "sourcePage": 20,
    "sourceSection": "양도소득세·신고납부",
    "sourceRef": "",
    "sourceNote": "",
    "basis": [
      "summary"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 2,
    "sourceLabel": "부동산세법 요약집 p20 · 양도소득세·신고납부"
  },
  {
    "id": "tax-card-187",
    "subject": "tax_law",
    "order": 187,
    "type": "term",
    "category": "양도소득세·국외자산",
    "title": "국외자산 양도소득",
    "subtitle": "거주자가 국외 부동산 등을 양도하여 발생한 소득",
    "bullets": [
      "국내 거주기간 등 법정 요건을 충족하면 국외자산 양도소득도 과세대상"
    ],
    "formula": "",
    "visual": "none",
    "aliases": [],
    "sourceKind": "official",
    "sourcePage": 0,
    "sourceSection": "양도소득세·국외자산",
    "sourceRef": "국가법령정보센터 「소득세법」 국외자산 양도 관련 조문",
    "sourceNote": "",
    "basis": [
      "essential"
    ],
    "examHitCount": 0,
    "examYears": [],
    "examSampleRefs": [],
    "importance": 1,
    "sourceLabel": "국가법령정보센터 「소득세법」 국외자산 양도 관련 조문"
  }
];
  cards.forEach(card=>{ if(!ids.has(card.id)){ bank.cards.push(card); ids.add(card.id); } });
})();
