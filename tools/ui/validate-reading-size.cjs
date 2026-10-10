'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '../..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

function lastCssBodyRule(selector) {
  const start = css.lastIndexOf(selector + ' {');
  assert.ok(start >= 0, selector + ' CSS rule missing');
  return css.slice(start, css.indexOf('}', start) + 1);
}

test('three reading sizes have distinct style values in the home and review views', () => {
  const vars = [
    '--reading-home-heading-size',
    '--reading-home-subject-size',
    '--reading-home-subject-meta-size',
    '--reading-home-card-size',
    '--reading-home-card-meta-size',
    '--reading-home-feature-size',
    '--reading-home-description-size',
    '--reading-review-heading-size'
  ];
  const blocks = [
    lastCssBodyRule('body'),
    lastCssBodyRule('body[data-reading-size="small"]'),
    lastCssBodyRule('body[data-reading-size="large"]')
  ];
  for (const variable of vars) {
    const values = blocks.map(block => {
      const escaped = variable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const match = block.match(new RegExp(escaped + ':\\s*([^;]+);'));
      assert.ok(match, variable + ' missing in one reading-size rule');
      return match[1].trim();
    });
    assert.equal(new Set(values).size, 3, variable + ' does not vary in all three sizes');
  }
  const selectors = [
    '#homeView .past-exam-home-head h2',
    '#homeView .word-quiz-home-head h2',
    '#homeView .law-home-copy h2',
    '#homeView .subject-btn strong',
    '#homeView .subject-btn span',
    '#homeView .word-quiz-subject-info strong',
    '#homeView .word-quiz-subject-info > span',
    '#homeView .home-feature-card span',
    '.exam-review-question'
  ];
  for (const selector of selectors) assert.ok(css.includes(selector), selector + ' missing');
  assert.match(html, /class="reading-size-control" role="group" aria-label="학습 글자 크기"/);
  assert.match(css, /\.question-text-content\s*\{\s*font-size: var\(--reading-question-size\);/);
  assert.match(css, /\.choice-text,[\s\S]*?font-size: var\(--reading-text-size\);/);
});

test('button clicks update reading-size dataset, selected button state and localStorage', () => {
  const beginning = app.indexOf('  function loadReadingSize(){');
  const end = app.indexOf('  function showView(name)', beginning);
  assert.ok(beginning >= 0 && end > beginning, 'reading-size functions were moved or lost');
  const functions = app.slice(beginning, end);
  const binder = [
    "  readingSizeButtons.forEach(btn => {",
    "    btn.addEventListener('click', () => applyReadingSize(btn.dataset.readingSize));",
    "  });",
    "  applyReadingSize(loadReadingSize(), false);"
  ].join('\n');
  assert.ok(app.includes(binder), 'reading-size click handlers or saved setting initialization missing');

  const saved = new Map([['gichulQuizReadingSize', 'normal']]);
  const buttons = ['small', 'normal', 'large'].map(size => ({
    dataset: {readingSize: size},
    attributes: {},
    handlers: {},
    active: false,
    classList: {toggle(name, active) { assert.equal(name,'active'); this.owner.active=active; }},
    setAttribute(name,value) {this.attributes[name]=value;},
    addEventListener(name,fn) {this.handlers[name]=fn;}
  }));
  for (const btn of buttons) btn.classList.owner=btn;
  const context = {
    document:{body:{dataset:{}}},
    localStorage:{
      getItem(k) {return saved.has(k)?saved.get(k):null;},
      setItem(k,v) {saved.set(k,v);}
    },
    READING_SIZE_KEY: 'gichulQuizReadingSize',
    READING_SIZES: new Set(['small','normal','large']),
    readingSizeButtons:buttons
  };
  vm.createContext(context);
  vm.runInContext(functions + '\n' + binder,context);
  assert.equal(context.document.body.dataset.readingSize,'normal');
  assert.equal(buttons.filter(b=>b.active).length,1);
  buttons[2].handlers.click();
  assert.equal(context.document.body.dataset.readingSize,'large');
  assert.equal(saved.get('gichulQuizReadingSize'),'large');
  assert.equal(buttons[2].attributes['aria-pressed'],'true');
  buttons[0].handlers.click();
  assert.equal(context.document.body.dataset.readingSize,'small');
  assert.equal(saved.get('gichulQuizReadingSize'),'small');
  assert.equal(buttons[0].attributes['aria-pressed'],'true');
  assert.equal(buttons[2].attributes['aria-pressed'],'false');
});
