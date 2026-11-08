const fs=require('fs'),vm=require('vm'),assert=require('assert');
const file=process.argv[2]||'review-v9.html',html=fs.readFileSync(file,'utf8');
const scripts=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
assert(scripts.length,'No app script');const source=scripts.at(-1)[1];new vm.Script(source);
const seedText=html.match(/const SEED=(\{.*?\});\s*\(\(\)=>/s);assert(seedText,'No seed');const seed=JSON.parse(seedText[1]);
assert.equal(seed.openingCents,0);assert.equal(seed.salaryNetCents,0);
for(const key of ['entries','invoices','movements','receivables','ledger','nubankLoans'])assert.equal(seed[key].length,0,'Personal data in '+key);
assert(html.includes('repeat(6,minmax(0,1fr))'),'Mobile bottom nav must have six columns');
const needle='render();acceptShortcutLink();';
assert(source.includes(needle));
const extra=source.includes('function localToday()')?',localToday,cycleForDate,nextPayday,upcomingBills,projected,uiCycleSelect':'';
const hook='globalThis.__test={setData:(data)=>{s=data},scenarioProjection,renderSimulation,forecastFor'+extra+'};'+needle;
const js=source.replace(needle,hook);
const stub=()=>({innerHTML:'',value:'',classList:{add(){},remove(){}}});
class FixedDate extends Date{constructor(...args){super(...(args.length?args:['2026-11-08T12:00:00-03:00']))}static now(){return new Date('2026-11-08T12:00:00-03:00').getTime()}}
const context={window:{location:{hash:'',pathname:'/',search:''},addEventListener(){},scrollTo(){}},document:{querySelector:stub,addEventListener(){},body:stub()},localStorage:{getItem(){return null},setItem(){}},setTimeout,clearTimeout,console,alert(){},Date:FixedDate,Intl,Math};
vm.runInNewContext(js,context,{timeout:2000});assert(context.__test);
if(file.includes('v10')||file==='index.html'&&source.includes('mf-cash-panel')){
 assert.equal(context.__test.localToday(),'2026-11-08');
 assert.equal(context.__test.cycleForDate('2026-11-08'),'2026-10');
 assert.equal(context.__test.cycleForDate('2026-11-20'),'2026-11');
 assert.equal(context.__test.nextPayday().date,'2026-11-23');
 assert.equal(context.__test.nextPayday().cycle,'2026-11');
}
const d=JSON.parse(JSON.stringify(seed));
d.openingCents=100000;d.salaryNetCents=640000;d.oldFuncefInstallmentCents=140500;d.oldFuncefEnd='2028-02';
d.loanOptions=[{id:'nenhum',label:'Sem empréstimo',netCents:0,installmentCents:0,months:0},{id:'45-fixo',label:'Crédito Fixo',netCents:2400000,installmentCents:150000,months:36}];
d.whatIf={option:'45-fixo',payLosango:true,payNubankSmall:false,payNubankLarge:false,payCards:false,startCycle:'2026-12',horizon:12};
d.losango={paid:false,payoffCents:1200000};d.loan={status:'none',option:'nenhum',startCycle:'2026-12'};
d.settings={bonusCents:0,includeVacation:false,includeTravel:false,diversionMonthlyCents:0,obraGrowthPct:0,budgetOverrides:{}};
d.vault={startCycle:'2029-12',monthlyPlannedCents:0,movements:[]};
d.salaryHistory=[];d.nubankLoans=[];d.entries=[];d.invoices=[];d.receivables=[];d.ledger=[];d.movements=[];
context.__test.setData(d);
const rows=context.__test.scenarioProjection();assert.equal(rows.length,12);
assert.equal(rows.meta.currentCash,100000);assert.equal(rows.meta.loanNet,2400000);assert.equal(rows.meta.upfront,1200000);assert.equal(rows.meta.instant,1300000);
assert.equal(rows[0].baseline,740000);assert.equal(rows[0].balance,1940000);assert.equal(rows[1].salaryDelta,-9500);
assert(context.__test.renderSimulation().includes('Caixa hipotético após receber e quitar'));
d.whatIf.option='nenhum';context.__test.setData(d);assert.equal(context.__test.scenarioProjection().meta.instant,-1100000);
d.whatIf.payLosango=false;context.__test.setData(d);assert.equal(context.__test.scenarioProjection().meta.instant,100000);
if(file.includes('v10')||file==='index.html'&&source.includes('mf-cash-panel')){
 d.whatIf.option='45-fixo';context.__test.setData(d);
 d.invoices=[{id:'test-inv',card:'C6 Black',cycle:'2026-11',dueDate:'2026-11-18',amountCents:18000,paid:false}];
 assert.equal(context.__test.upcomingBills().total,18000);
 d.invoices[0].paid=true;
 assert.equal(context.__test.upcomingBills().total,0);
 assert(context.__test.renderSimulation().includes('Compare as propostas lado a lado'));
 assert(context.__test.uiCycleSelect().includes('Atual'));
}
console.log('Smoke test passed:',file);
