const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../..');
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const errors=[];
const need=(ok,msg)=>{if(!ok)errors.push(msg);};

const index=read('index.html');
const app=read('app.js');
const css=read('styles.css');
const cardIndex=read('core-cards/index.html');
const cardCss=read('core-cards/cards.css');
const cardJs=read('core-cards/cards.js');
const dataJs=read('core-cards/data.js');
const version=JSON.parse(read('version.json'));
const ctx={window:{}};
vm.createContext(ctx);
vm.runInContext(dataJs,ctx);
const bank=ctx.window.CORE_WORD_CARD_BANK;

need(version.version==='1.55','version.json must be 1.55');
need(index.includes('class="past-exam-home-section"'),'past-exam section wrapper missing');
need(index.includes('class="home-feature-grid"'),'split feature grid missing');
need(index.includes('id="examEntryBtn"')&&index.includes('id="coreCardEntryBtn"'),'home feature buttons missing');
need(index.indexOf('id="examEntryBtn"')<index.indexOf('id="coreCardEntryBtn"'),'exam must be left/before core card entry');
need(index.includes('assets/core-card-icon.png'),'uploaded core card icon not referenced');
need(css.includes('.home-feature-grid{display:grid;grid-template-columns:repeat(2'),'desktop 2-column feature layout missing');
need(css.includes('@media(max-width:720px)')&&css.includes('.home-feature-grid{grid-template-columns:1fr'),'mobile stacked feature layout missing');
need(app.includes("location.href='core-cards/index.html'"),'core card navigation handler missing');

need(fs.existsSync(path.join(ROOT,'assets/core-card-icon.png')),'core card icon asset missing');
for(const p of ['core-cards/index.html','core-cards/cards.css','core-cards/cards.js','core-cards/data.js']) need(fs.existsSync(path.join(ROOT,p)),p+' missing');
need(cardIndex.includes('id="cardGrid"')&&cardIndex.includes('id="prevBtn"')&&cardIndex.includes('id="nextBtn"'),'core card stage controls missing');
need(cardIndex.includes('gichulQuizTheme'),'core card theme bootstrap missing');
need(cardCss.includes('@media(min-width:1280px)')&&cardCss.includes('repeat(3,minmax(0,1fr))'),'wide PC 3-card rule missing');
need(cardCss.includes('@media(max-width:979px)')&&cardCss.includes('.core-card-grid{grid-template-columns:1fr}'),'narrow screen 1-card rule missing');
need(cardJs.includes("if(w>=1280) return 3")&&cardJs.includes("if(w>=980) return 2")&&cardJs.includes("return 1"),'responsive visible-count logic missing');
need(cardJs.includes('gichulCoreWordImportant')&&cardJs.includes('gichulCoreWordMemorized'),'card state persistence missing');
need(cardJs.includes('card.image'),'optional illustration support missing');
need(Array.isArray(bank?.cards)&&bank.cards.length===5,'starter card count must be 5');
need(bank?.cards?.every(c=>c.subject==='real_estate_intro'),'starter cards must be real_estate_intro');
for(const title of ['부동성','영속성','부증성','개별성','인접성']) need(bank.cards.some(c=>c.title===title),'starter card missing: '+title);
need(new Set(bank.cards.map(c=>c.id)).size===bank.cards.length,'duplicate starter card id');
need(bank.cards.every(c=>Array.isArray(c.bullets)&&c.bullets.length>=2),'every starter card needs bullets');

console.log('Core word card UI validation');
console.log('Cards: '+(bank?.cards?.length||0));
console.log('Errors: '+errors.length);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
