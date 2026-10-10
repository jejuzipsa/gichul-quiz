'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('topbar heading has separate one-line text and never appends total items',()=>{
  const html=read('index.html'), app=read('app.js');
  assert.match(html,/<h1 id="headerTitle"><span id="headerTitleText">공인중개사 기출문제<\/span><\/h1>/);
  assert.match(app,/setHeaderTitle\('공인중개사 기출문제'\)/);
  assert.match(app,/setHeaderTitle\('공인중개사 핵심요약'\)/);
  assert.ok(!app.includes('기출문제('), 'remove count from header, not from subject data');
  assert.ok(!app.includes('els.headerTitle.textContent'));
});
test('CSS reserves fixed-size buttons and safely prevents wrapping/overlap',()=>{
  const css=read('styles.css');
  assert.match(css,/#headerTitleText\s*\{[^}]*white-space:\s*nowrap/s);
  assert.match(css,/#headerTitleText\s*\{[^}]*min-width:\s*0/s);
  assert.match(css,/#headerTitleText\s*\{[^}]*overflow:\s*hidden/s);
  assert.match(css,/#headerTitle\s*\{[^}]*max-width:\s*100%/s);
  assert.match(css,/\.topbar-title-wrap\s*\{[^}]*flex:\s*1 1 auto/s);
  assert.match(css,/\.topbar-actions\s*\{[^}]*flex:\s*0 0 auto/s);
  assert.match(css,/@media \(max-width: 340px\)/);
});
test('JS auto-fits on width changes and resets font for wider screens',()=>{
  const s=read('app.js');
  assert.match(s,/function fitHeaderTitle\(\)/);
  assert.match(s,/titleText\.scrollWidth <= titleText\.clientWidth/);
  assert.match(s,/titleText\.style\.fontSize = ''/);
  assert.match(s,/window\.addEventListener\('resize', scheduleHeaderFit/);
  assert.match(s,/observer\.observe\(els\.headerTitle\.parentElement\)/);
  assert.match(s,/scheduleHeaderFit\(\)/);
});
test('CSS and JS cache-bust updated assets without affecting API version',()=>{
  const html=read('index.html'), v=JSON.parse(read('version.json'));
  assert.equal(v.version,'2.28');
  assert.match(html,/styles\.css\?v=2\.28&header=2/);
  assert.match(html,/app\.js\?v=2\.28&header=1/);
});
