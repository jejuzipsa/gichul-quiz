"""기출 TXT Source of Truth에서 data/*.json, data/*.js, manifest.js를 재생성한다.

기존 스크립트 이름을 사용하는 작업 흐름을 깨지 않기 위한 호환 래퍼.
기출 원본은 review/past-exams-v1/*.txt 이며 data/*.json을 직접 편집하지 않는다.
"""
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
subprocess.run(
    ["node", str(ROOT / "tools" / "past-exams" / "build.cjs")],
    cwd=ROOT,
    check=True,
)
