const fs=require('fs'),vm=require('vm'),assert=require('assert');
function load(file){
const html=fs.readFileSync(file,'utf8'),source=html.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1],seed=JSON.parse(source.match(/const SEED=(\{.*?\});/s)[1]);new vm.Script(source);
const nodes=new Map(),node=()=>({innerHTML:'',value:'',dataset:{},focus(){},hidden:false,querySelector(){return null},querySelectorAll(){return []},classList:{add(){},remove(){}}});
class Clock extends Date{constructor(...a){super(...(a.length?a:['2026-11-08T12:00:00-03:00']))}static now(){return new Date('2026-11-08T12:00:00-03:00').getTime()}}
const context={window:{location:{hash:'',pathname:'/',search:''},addEventListener(){},scrollTo(){}},document:{querySelector(q){if(q==='#entryError')return null;if(!nodes.has(q))nodes.set(q,node());return nodes.get(q)},querySelectorAll(){return []},addEventListener(){},body:node()},localStorage:{getItem(){return null},setItem(){}},Date:Clock,Intl,Math,console,setTimeout(){},clearTimeout(){}};
const hook='globalThis.test={set:(d,id="")=>{s=d;editTarget=id},data:()=>s,canonicalCategory,inferredCategory,purchaseMethod,renderHome,renderCards,renderPlan,spendingImpact,liveCash,forecastFor,submitForm,quoteStatus,saveDebtOffers,savePlanningReview,getNotice:()=>noticeText,layout,lineChartSeries,incomeExpenseChart,datedCashForecast,projected,renderFutureOverview,onClick,onChange,getMonth:()=>monthViewCycle,setMonth:c=>{monthViewCycle=c},setPage:p=>{page=p}};';
vm.runInNewContext(source.replace('render();acceptShortcutLink();',hook+'render();acceptShortcutLink();'),context);
const t=context.test,plain=x=>JSON.parse(JSON.stringify(x)),form=v=>({elements:{namedItem(k){return {value:v[k]??''}}}}),fresh=()=>({...plain(seed),referenceCycle:'2026-10',cardViewCycle:'2026-10',cardClosings:{},invoiceClosingDates:{},openingCents:100000,salaryNetCents:640000,openedAt:'2026-11-07',settings:{...seed.settings,budgetOverrides:{}},vault:{...seed.vault,startCycle:'2030-01'}});
return {t,plain,fresh,form,nodes,seed};}

const {t,plain,fresh}=load(process.argv[2]||'index.html');
let d=fresh();d.vault={...d.vault,goalCents:5000000,targetCycle:'2028-03',monthlyPlannedCents:50000};d.entries=[{id:'test',type:'despesa',month:'2026-11',cents:100000,description:'Conta de teste',status:'previsto',dueDate:'2026-12-01'}];t.set(d);
let original=JSON.stringify(d);const rows=t.projected(48);for(const n of [12,24,36,48]){d.settings.planHorizon=n;t.setMonth('');const markup=t.renderFutureOverview();assert(markup.includes('O que entra, o que sai e o que sobra'));assert(markup.includes('id="inspectMonth"'));assert.equal((markup.match(/class="mf-flow-row /g)||[]).length,6);assert(!/NaN|Infinity/.test(markup));}
t.onClick({target:{closest(){return {dataset:{act:'inspectMonth',id:rows.at(-1).cycle}}}}});assert.equal(t.getMonth(),rows.at(-1).cycle);assert(t.renderFutureOverview().includes('Mostrando 43–48 de 48'));
t.onClick({target:{closest(){return {dataset:{act:'inspectMonth',id:'invalid'}}}}});assert.equal(t.getMonth(),rows.at(-1).cycle);
t.onChange({target:{dataset:{field:'inspectMonth'},value:rows[0].cycle}});assert.equal(t.getMonth(),rows[0].cycle);
for(const vals of [[0,0],[100,100],[-100,-200],[1,-1]]){const markup=t.lineChartSeries([{color:'var(--brand)',values:vals.map((value,i)=>({value,label:'Mês '+i}))}],'Teste');assert(!/NaN|Infinity/.test(markup));assert(markup.includes('mf-line-axis'));}
assert(t.lineChartSeries([],'Teste').includes('Cadastre'));d.settings.planHorizon=24;t.setMonth('');const beforeRender=JSON.stringify(d);t.renderHome();t.renderPlan();assert.equal(JSON.stringify(d),beforeRender,'Presentation must not modify data');
if(process.argv[3]&&process.argv[4]){
 const backup=JSON.parse(fs.readFileSync(process.argv[3],'utf8')),old=load(process.argv[4]);
 const capture=(api,data)=>{api.set(structuredClone(data));return plain({cash:api.liveCash(),projected:api.projected(48),daily:api.datedCashForecast(),forecasts:api.projected(48).map(r=>api.forecastFor(r.cycle))})};
 assert.deepStrictEqual(capture(t,backup),capture(old.t,backup),'All monthly, daily and cash calculations must remain unchanged');
 t.set(structuredClone(backup));const before=JSON.stringify(t.data());t.renderHome();t.renderPlan();assert.equal(JSON.stringify(t.data()),before);
 const html=fs.readFileSync(process.argv[2]||'index.html','utf8');const preview=html.replace(/const SEED=\{.*?\};/s,'const SEED='+JSON.stringify(backup)+';').replaceAll('meu-financeiro-2026-local-v4','meu-financeiro-redesign-preview-v17-nubank-parcelas-r2').replace('<body>','<body><div style="padding:12px 20px;background:#fff3d9;color:#543c17;font:13px system-ui;line-height:1.6">PRÉVIA V17 · Cópia isolada do backup. Alterações feitas aqui ficam nesta prévia e não sincronizam com o aplicativo em uso.</div>');
 fs.writeFileSync('dados-privados/previa-redesign.html',preview);
}
console.log('Redesign: 12–48 months, month selection, chart edge cases, immutable rendering and unchanged accounting passed');

