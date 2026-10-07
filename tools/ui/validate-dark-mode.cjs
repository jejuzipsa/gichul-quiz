const fs=require('node:fs');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const errors=[];
const need=(ok,msg)=>{if(!ok)errors.push(msg);};

const index=read('index.html');
const app=read('app.js');
const css=read('styles.css');
const wordIndex=read('word-quiz/index.html');
const wordCss=read('word-quiz/quiz.css');
const entryCss=read('word-quiz/entry.css');
const blankCss=read('word-quiz/blank-quiz.css');
const version=JSON.parse(read('version.json'));

need(version.version==='1.54','version.json must be 1.54');
need(index.includes('meta name="app-version" content="1.54"'),'index app version mismatch');
need(index.includes('styles.css?v=1.54')&&index.includes('app.js?v=1.54'),'main cache keys must be 1.54');
need(app.includes("SITE_BUILD_VERSION='1.54'"),'app build version mismatch');
need(index.includes('id="themeToggleBtn"'),'main theme button missing');
need(index.indexOf('id="themeToggleBtn"')<index.indexOf('class="reading-size-control"'),'theme button must be left of reading-size buttons');
need(index.includes("prefers-color-scheme: dark"),'main early system theme bootstrap missing');
need(app.includes("gichulQuizTheme"),'main theme persistence key missing');
need(app.includes("라이트모드 켜기")&&app.includes("다크모드 켜기"),'main theme accessibility labels missing');
need(css.includes(':root[data-theme="dark"]'),'main dark theme selector missing');
for(const color of ['#080d18','#111a2b','#18243a','#8174ff']) need(css.includes(color),'approved dark palette color missing: '+color);
need(css.includes('.theme-toggle-btn'),'main theme button CSS missing');
need(css.includes('.question-image')&&css.includes('background: #fff'),'problem images must keep white backing');

need(wordIndex.includes('id="themeToggleBtn"'),'word quiz theme button missing');
need(wordIndex.includes("gichulQuizTheme"),'word quiz theme persistence missing');
need(wordIndex.includes('quiz.css?v=1.8')&&wordIndex.includes('blank-quiz.css?v=1.4'),'word quiz cache keys mismatch');
need(wordCss.includes(':root[data-theme="dark"]'),'word quiz dark palette missing');
need(entryCss.includes(':root[data-theme="dark"]'),'entry dark overrides missing');
need(blankCss.includes(':root[data-theme="dark"]'),'blank quiz dark overrides missing');

console.log('Dark mode UI validation');
console.log('Errors: '+errors.length);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
