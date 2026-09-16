(() => {
  const params = new URLSearchParams(location.search);
  const subjectKey = params.get('subject') || 'real_estate_intro';
  const targets = {
    real_estate_intro: 300,
    civil_law: 300,
    brokerage_law: 300,
    public_law: 300,
    registration_law: 220,
    tax_law: 180
  };
  const prefixes = {
    real_estate_intro: 'blank-01', civil_law: 'blank-02', brokerage_law: 'blank-03',
    public_law: 'blank-04', registration_law: 'blank-05', tax_law: 'blank-06'
  };
  const target = targets[subjectKey] || 180;
  const prefix = prefixes[subjectKey] || 'blank-99';
  const seedBank = window.BLANK_QUIZ_BANK || { subject: '', questions: [] };
  const summary = window.SUMMARY_DATA && window.SUMMARY_DATA[subjectKey];
  if (!summary || !Array.isArray(summary.sections)) return;

  const seed = (seedBank.questions || []).slice(0, 30).map(q => ({ ...q }));
  const generic = new Set('의의 구성 설치 적용 실행 대상 신청인 기간 예외 요건 절차 내용 효과 범위 특징 방법 원칙 목적 기준 종류 구분 성질 의무 권리 효력 처리 신고 등록 개념 과정 주체 기관 기타 관계 문제 원인 결과 요약'.split(' '));
  const numRe = /(?:\d{1,3}(?:,\d{3})*\s*분의\s*\d+|\d+(?:\.\d+)?\s*~\s*\d+(?:\.\d+)?\s*(?:년|개월|일|시간|분|명|개|회|m|㎡|㎥|%|원|억원|만원|배|점)?|\d+\s*월\s*\d+\s*일|\d+(?:\.\d+)?\s*(?:년|개월|일|시간|분|명|개|회|m|㎡|㎥|%|원|억원|만원|배|점))/g;

  function norm(s) {
    return String(s || '').replace(/\u00ad/g, '').replace(/[․ㆍ]/g, '·').replace(/|⇒/g, '→').replace(/\s+/g, ' ').trim().replace(/^[-•▪◦]\s*/, '');
  }
  function stripEnum(s) {
    return s.replace(/^(?:\(?\d+\)?[.)]?\s*|[①-⑳]\s*|[가-힣]\)\s*)/, '').trim();
  }
  function balanced(s) {
    return (s.match(/\(/g) || []).length === (s.match(/\)/g) || []).length && (s.match(/\[/g) || []).length === (s.match(/\]/g) || []).length;
  }
  function complete(s) {
    if (s.length < 18 || s.length > 150 || !balanced(s)) return false;
    if (/[:,·,(\[]$/.test(s) || /(?:및|또는|중|따라|경우|하고|하며)$/.test(s)) return false;
    if (/^(?:는|은|을|를|이|가|의|및|또는|다만|경우|때에는|하고|하며|m\b|㎡|%)/.test(s)) return false;
    const useful = [...s].filter(ch => /[A-Za-z0-9가-힣]/.test(ch)).length;
    return useful / Math.max(1, s.length) > 0.48;
  }
  function cleanTerm(s) {
    return stripEnum(s).replace(/^[-–—., ]+|[-–—., ]+$/g, '').replace(/\s+/g, ' ');
  }
  function specific(t, loose = false) {
    const c = t.replace(/\s+/g, '');
    if (c.length < 2 || t.length > (loose ? 34 : 26) || generic.has(c)) return false;
    if (/[：:→>\/;—]/.test(t) || !balanced(t) || t.includes(',')) return false;
    if (!loose && c.length <= 5 && [...generic].some(g => c === g || c.endsWith(g))) return false;
    if (!loose && /(?:하|한|된|같|있|없|않|경우|때)$/.test(c)) return false;
    return true;
  }
  function splitTop(s) {
    const out = []; let start = 0; let depth = 0;
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (ch === '(' || ch === '[') depth++;
      else if (ch === ')' || ch === ']') depth = Math.max(0, depth - 1);
      else if (ch === ',' && depth === 0) { out.push(s.slice(start, i).trim()); start = i + 1; }
    }
    out.push(s.slice(start).trim()); return out;
  }
  function numericDistractors(ans) {
    const c = ans.replace(/\s+/g, ''); let m;
    if ((m = c.match(/^(\d{1,3}(?:,\d{3})*)분의(\d+)$/))) {
      const d = Number(m[1].replace(/,/g, '')), n = Number(m[2]);
      const vals = [[d + 1, n], [Math.max(2, d - 1), n], [d + 2, n]].filter(([x,y]) => x > y && y > 0).map(([x,y]) => `${x.toLocaleString('ko-KR')}분의 ${y}`);
      return [...new Set(vals)].slice(0, 3);
    }
    if ((m = c.match(/^(\d+)월(\d+)일$/))) {
      const mo = +m[1], day = +m[2];
      return [`${mo}월 ${Math.max(1, day - 1)}일`, `${mo}월 ${Math.min(28, day + 14)}일`, `${Math.min(12, mo + 1)}월 ${day}일`];
    }
    if ((m = c.match(/^(\d+(?:\.\d+)?)~(\d+(?:\.\d+)?)(.*)$/))) {
      const a = +m[1], b = +m[2], u = m[3], span = Math.max(1, b - a);
      const fmt = v => Number.isInteger(v) ? String(v) : String(Math.round(v * 10) / 10);
      return [-span, span, span * 2].map(d => `${fmt(Math.max(0, a + d))}~${fmt(Math.max(a + d + span, b + d))}${u}`);
    }
    if ((m = c.match(/^(\d+(?:\.\d+)?)(.*)$/))) {
      const n = +m[1], u = m[2], ds = n <= 5 ? [-1,1,2,3] : n <= 20 ? [-2,2,5,10] : n <= 100 ? [-10,10,20,30] : [-50,50,100,200];
      return ds.map(d => n + d).filter(v => v > 0 && v !== n).slice(0, 3).map(v => `${Number.isInteger(v) ? v : Math.round(v * 100) / 100}${u}`);
    }
    return [];
  }
  function answerClass(a) {
    if (/\d/.test(a)) return 'num';
    for (const suf of ['권','세','법','계약','등기','지역','지구','계획','시장','분석','원칙','주의','요건','행위','활동','제도','효과','재','지','점','률','금','기간','기관']) if (a.endsWith(suf)) return `t:${suf}`;
    return 'term';
  }

  const candidates = [];
  function addCandidate(sectionIndex, sectionTitle, source, prompt, answer, kind, local = [], score = 0) {
    prompt = norm(prompt); answer = norm(answer);
    if (!prompt.includes('{{blank}}') || !answer || prompt.replace('{{blank}}', '').includes(answer)) return;
    candidates.push({ sectionIndex, sectionTitle, source, prompt, answer, kind, local, score });
  }

  summary.sections.forEach((section, sectionIndex) => {
    const title = norm(section.title || '');
    const lines = String(section.content || '').split(/\r?\n/).map(norm).filter(Boolean);
    lines.forEach(raw => {
      if (!complete(raw)) return;
      const core = stripEnum(raw);
      const matches = [...core.matchAll(new RegExp(numRe.source, 'g'))].slice(0, 2);
      for (const m of matches) {
        const ans = m[0].trim();
        if (!/(년|개월|일|시간|분|명|개|회|m|㎡|㎥|%|원|억원|만원|배|점|분의)/.test(ans)) continue;
        if (/[A-Za-z]$/.test(core.slice(0, m.index))) continue;
        const before = core.slice(0, m.index).trim(), after = core.slice(m.index + m[0].length).trim();
        if (before.length < 6 && after.length < 10) continue;
        addCandidate(sectionIndex, title, core, `${core.slice(0,m.index)}{{blank}}${core.slice(m.index + m[0].length)}`, ans, 'number', [], 8);
      }
      if (core.includes(':')) {
        const pos = core.indexOf(':'), left = cleanTerm(core.slice(0,pos)), right = core.slice(pos+1).trim();
        if (specific(left) && right.length >= 12 && right.length <= 115) addCandidate(sectionIndex, title, core, `다음 설명에 해당하는 것은 {{blank}}이다. — ${right}`, left, 'term', [], 7);
        const items = splitTop(right).map(x => x.replace(/^[-–—., ]+|[-–—., ]+$/g,'')).filter(x => x.length >= 2 && x.length <= 35 && balanced(x));
        const good = items.filter(x => specific(cleanTerm(x), true) || /\d/.test(x));
        if (good.length >= 3 && good.length <= 9) {
          good.slice(0,3).forEach(ans => { if (core.split(ans).length === 2) addCandidate(sectionIndex, title, core, core.replace(ans,'{{blank}}'), ans, 'list', good.filter(x=>x!==ans), 5); });
        }
      }
      for (const token of ['이란 ','란 ','은 ','는 ']) {
        if (!core.includes(token)) continue;
        const [l,...rest] = core.split(token), left = cleanTerm(l), right = rest.join(token).trim();
        if (specific(left) && left.length <= 20 && /^[가-힣A-Za-z0-9·.() ]+$/.test(left) && right.length >= 12 && right.length <= 105) addCandidate(sectionIndex, title, core, `다음 설명에 해당하는 것은 {{blank}}이다. — ${right}`, left, 'term', [], 6);
        break;
      }
    });
  });

  const seenCandidate = new Set();
  const cleanCandidates = candidates.filter(c => {
    const k = `${c.prompt.replace(/\s/g,'')}|${c.answer.replace(/\s/g,'')}`;
    if (seenCandidate.has(k)) return false; seenCandidate.add(k); return true;
  });
  const termBySection = new Map(), numBySection = new Map(), terms = [], nums = [];
  function pushUnique(map, idx, value) { if (!map.has(idx)) map.set(idx, []); const a = map.get(idx); if (!a.includes(value)) a.push(value); }
  cleanCandidates.forEach(c => {
    if (c.kind === 'number') { pushUnique(numBySection,c.sectionIndex,c.answer); if (!nums.includes(c.answer)) nums.push(c.answer); }
    else { pushUnique(termBySection,c.sectionIndex,c.answer); if (!terms.includes(c.answer)) terms.push(c.answer); }
  });
  function makeChoices(c) {
    if (c.kind === 'number') {
      const ds = numericDistractors(c.answer);
      for (const x of [...(numBySection.get(c.sectionIndex)||[]), ...nums]) if (x !== c.answer && !ds.includes(x)) ds.push(x);
      return ds.length >= 3 ? [c.answer, ...ds.slice(0,3)] : null;
    }
    const out = [];
    for (const x of c.local || []) if (x !== c.answer && !out.includes(x) && x.length <= 35) out.push(x);
    const cls = answerClass(c.answer);
    for (const x of [...(termBySection.get(c.sectionIndex)||[]), ...terms]) if (x !== c.answer && !out.includes(x) && answerClass(x) === cls) out.push(x);
    for (const x of terms) if (x !== c.answer && !out.includes(x) && Math.abs(x.length - c.answer.length) <= 9) out.push(x);
    return out.length >= 3 ? [c.answer, ...out.slice(0,3)] : null;
  }

  const usable = cleanCandidates.map(c => ({...c, choices: makeChoices(c)})).filter(c => c.choices && new Set(c.choices).size === 4);
  usable.sort((a,b) => b.score - a.score || a.prompt.length - b.prompt.length);
  const usedPrompts = new Set(seed.map(q => q.prompt.replace(/\s/g,'')));
  const selected = [];
  const bySection = new Map();
  usable.forEach(c => { if (!bySection.has(c.sectionIndex)) bySection.set(c.sectionIndex, []); bySection.get(c.sectionIndex).push(c); });
  const sectionIds = [...bySection.keys()].sort((a,b)=>a-b);
  let depth = 0;
  while (seed.length + selected.length < target && depth < 100) {
    let added = false;
    for (const sid of sectionIds) {
      const c = bySection.get(sid)[depth]; if (!c) continue;
      const sig = c.prompt.replace(/\s/g,''); if (usedPrompts.has(sig)) continue;
      usedPrompts.add(sig); selected.push(c); added = true;
      if (seed.length + selected.length >= target) break;
    }
    depth++;
    if (!added && depth > Math.max(0,...[...bySection.values()].map(v=>v.length))) break;
  }
  if (seed.length + selected.length < target) {
    for (const c of usable) {
      const sig = c.prompt.replace(/\s/g,''); if (usedPrompts.has(sig)) continue;
      usedPrompts.add(sig); selected.push(c);
      if (seed.length + selected.length >= target) break;
    }
  }
  if (seed.length + selected.length < target) {
    const base = [...selected];
    for (const c of base) {
      if (c.kind !== 'term' || !c.source.includes(':')) continue;
      const right = c.source.slice(c.source.indexOf(':') + 1).trim();
      if (right.length < 12 || right.length > 110) continue;
      const prompt = `${c.sectionTitle} 핵심 암기: ${right}에 해당하는 용어는 {{blank}}이다.`;
      const sig = prompt.replace(/\s/g,''); if (usedPrompts.has(sig)) continue;
      usedPrompts.add(sig); selected.push({...c, prompt, score: 1});
      if (seed.length + selected.length >= target) break;
    }
  }

  const questions = [...seed];
  selected.slice(0, Math.max(0,target-seed.length)).forEach((c, i) => {
    questions.push({
      id: `${prefix}-${String(seed.length + i + 1).padStart(3,'0')}`,
      type: 'blank', subject: summary.name || seedBank.subject || '',
      prompt: c.prompt, answer: c.answer, choices: c.choices,
      explanation: `${c.sectionTitle}: ${c.source}`,
      source: summary.source_file || '', section: c.sectionTitle
    });
  });
  window.BLANK_QUIZ_BANK = {
    subject: summary.name || seedBank.subject || '',
    targetCount: target,
    generatedCount: questions.length,
    questions
  };
})();
