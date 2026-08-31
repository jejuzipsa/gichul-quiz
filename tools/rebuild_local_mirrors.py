"""data/*.json을 수정한 뒤 로컬 file:// 실행용 *.js 미러와 manifest.js를 다시 만든다."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
SUBJECTS = [
    ("real_estate_intro", "부동산학개론"),
    ("civil_law", "민법 및 민사특별법"),
    ("brokerage_law", "공인중개사법령 및 중개실무"),
    ("public_law", "부동산공법"),
    ("registration_law", "부동산공시법"),
    ("tax_law", "부동산세법"),
]
manifest=[]

LEGAL_PARTY_MAP = str.maketrans({
    "甲": "갑", "乙": "을", "丙": "병", "丁": "정", "戊": "무"
})

def normalize_legal_parties(value):
    if isinstance(value, str):
        return value.translate(LEGAL_PARTY_MAP)
    if isinstance(value, list):
        return [normalize_legal_parties(v) for v in value]
    return value

for code, name in SUBJECTS:
    json_path=DATA/f"{code}.json"
    questions=json.loads(json_path.read_text(encoding="utf-8"))
    for q in questions:
        q["question"] = normalize_legal_parties(q.get("question", ""))
        q["choices"] = normalize_legal_parties(q.get("choices", []))
        q["explanation"] = normalize_legal_parties(q.get("explanation", ""))
        if q.get("subject") != name:
            raise ValueError(f"{json_path.name}: subject 불일치: {q.get('id')}")
    (DATA/f"{code}.js").write_text(
        "window.SUBJECT_DATA = window.SUBJECT_DATA || {};\n"
        + f"window.SUBJECT_DATA[{json.dumps(name, ensure_ascii=False)}] = "
        + json.dumps(questions, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8"
    )
    years=sorted({int(q.get("year") or 0) for q in questions if q.get("year")})
    manifest.append({"code":code,"name":name,"count":len(questions),"years":years,
                     "json":f"data/{code}.json","script":f"data/{code}.js"})
(DATA/"manifest.js").write_text(
    "window.SUBJECT_DATA = window.SUBJECT_DATA || {};\n"
    + "window.SUBJECT_MANIFEST = " + json.dumps(manifest, ensure_ascii=False, indent=2) + ";\n"
    + f"window.BANK_TOTAL = {sum(x['count'] for x in manifest)};\n"
    + "window.BANK_LABEL = '" + " + ".join(f"{y}년 제{y-1989}회" for y in sorted({y for x in manifest for y in x['years']})) + " · 과목별 분리';\n",
    encoding="utf-8"
)
print("완료:", ", ".join(f"{x['name']} {x['count']}" for x in manifest))
