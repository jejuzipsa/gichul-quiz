import fs from "node:fs";
import path from "node:path";

const root = process.argv[2];
if (!root) {
  console.error("Usage: node automotive-technician/validate-bank.mjs <private data dir>");
  process.exit(2);
}
const files = fs.readdirSync(root).filter(x => /^round-\d{2}-subject-\d{2}\.json$/.test(x)).sort();
const seen = new Set();
let count = 0, errors = [], pending = 0;
for (const file of files) {
  let items;
  try { items = JSON.parse(fs.readFileSync(path.join(root, file), "utf8")); }
  catch (e) { errors.push(file + ": " + e.message); continue; }
  if (!Array.isArray(items) || items.length !== 20) errors.push(file + ": expected 20 items");
  const ids = new Set();
  for (const q of Array.isArray(items) ? items : []) {
    count++;
    if (!q?.id || seen.has(q.id)) errors.push(file + ": missing/duplicate id " + q?.id);
    seen.add(q?.id); ids.add(q?.question_number);
    if (!q.question || !Array.isArray(q.choices) || q.choices.length !== 4 || q.choices.some(x => !x)) errors.push(q.id + ": invalid text/choices");
    if (!Number.isInteger(q.answer) || q.answer < 1 || q.answer > 4) errors.push(q.id + ": invalid answer");
    if (!q.explanation) errors.push(q.id + ": missing explanation");
    if (q.review_status !== "approved" || !q.answer_verified) pending++;
  }
  if (ids.size !== 20 || !Array.from({length:20},(_,i)=>i+1).every(x=>ids.has(x))) errors.push(file + ": numbering is incomplete");
}
if (files.length !== 36 || count !== 720) errors.push("Expected 36 files / 720 items; got " + files.length + " / " + count);
console.log(JSON.stringify({files:files.length,count,pendingApproval:pending,errors:errors.length,details:errors.slice(0,100)},null,2));
process.exitCode = errors.length ? 1 : 0;
