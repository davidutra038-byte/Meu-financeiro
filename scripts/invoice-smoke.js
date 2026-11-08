const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync(process.argv[2]||'index.html','utf8'),source=html.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1],seed=JSON.parse(source.match(/const SEED=(\{.*?\});/s)[1]);new vm.Script(source);
const nodes=new Map(),node=()=>({innerHTML:'',value:'',dataset:{},focus(){},hidden:false,querySelector(){return null},querySelectorAll(){return []},classList:{add(){},remove(){}}});
class Clock extends Date{constructor(...a){super(...(a.length?a:['2026-11-08T12:00:00-03:00']))}static now(){return new Date('2026-11-08T12:00:00-03:00').getTime()}}
const context={window:{location:{hash:'',pathname:'/',search:''},addEventListener(){},scrollTo(){}},document:{querySelector(q){if(q==='#entryError')return null;if(!nodes.has(q))nodes.set(q,node());return nodes.get(q)},querySelectorAll(){return []},addEventListener(){},body:node()},localStorage:{getItem(){return null},setItem(){}},Date:Clock,Intl,Math,console,setTimeout(){},clearTimeout(){}};
const hook='globalThis.test={set:(d,id="")=>{s=d;editTarget=id},data:()=>s,canonicalCategory,inferredCategory,purchaseMethod,renderHome,renderCards,renderPlan,spendingImpact,liveCash,forecastFor,submitForm,quoteStatus,saveDebtOffers,savePlanningReview,getNotice:()=>noticeText,invoiceReconciliation,invoiceChoice,reconciliationPanel,projected,datedCashForecast};';
vm.runInNewContext(source.replace('render();acceptShortcutLink();',hook+'render();acceptShortcutLink();'),context);
const t=context.test,plain=x=>JSON.parse(JSON.stringify(x)),form=v=>({elements:{namedItem(k){return {value:v[k]??''}}}}),fresh=()=>({...plain(seed),referenceCycle:'2026-10',cardViewCycle:'2026-10',cardClosings:{},invoiceClosingDates:{},openingCents:100000,salaryNetCents:640000,openedAt:'2026-11-07',settings:{...seed.settings,budgetOverrides:{}},vault:{...seed.vault,startCycle:'2030-01'}});

// Confirmation of a total must not imply review of its itemization.
let d=fresh();d.invoices=[{id:'test',card:'Test',cycle:'2026-10',amountCents:100000,manualDeltaCents:500,estimated:false,paid:false,dueDate:'2026-11-25'}];d.movements=[{id:'m',invoice:'test',cents:40000}];t.set(d);
assert.equal(t.invoiceReconciliation(d.invoices[0]).difference,60500);
assert(t.invoiceChoice('Test','2026-10','Test').includes('Confirmado'));
assert(t.invoiceChoice('Test','2026-10','Test').includes('Detalhes parciais'));
d.invoices[0].estimated=true;assert(t.invoiceChoice('Test','2026-10','Test').includes('Estimado'));assert.equal(t.invoiceReconciliation(d.invoices[0]).label,'Detalhes parciais');
d.movements[0].cents=100500;assert.equal(t.invoiceReconciliation(d.invoices[0]).label,'Valores conferem');
d.movements.push({id:'historical-credit',invoice:'test',cents:-50000,excludedFromInvoiceDetails:true});assert.equal(t.invoiceReconciliation(d.invoices[0]).difference,0);d.movements[1].excludedFromInvoiceDetails=false;assert.equal(t.invoiceReconciliation(d.invoices[0]).difference,50000);
if(process.argv[3]&&process.argv[4]){
 const original=JSON.parse(fs.readFileSync(process.argv[3],'utf8')),updated=JSON.parse(fs.readFileSync(process.argv[4],'utf8'));
 const capture=data=>{t.set(data);return plain({cash:t.liveCash(),months:Array.from({length:36},(_,j)=>t.forecastFor((2026+Math.floor((10+j)/12))+'-'+String((10+j)%12+1).padStart(2,'0'))),projection:t.projected(36),daily:t.datedCashForecast()})};
 assert.deepStrictEqual(capture(updated),capture(original),'Cash and monthly/daily projections must remain identical');
 for(const key of Object.keys(original))if(!['invoices','movements'].includes(key))assert.deepStrictEqual(updated[key],original[key]);
 const restored=updated.movements.map(x=>{const y={...x};delete y.excludedFromInvoiceDetails;delete y.invoiceDetailExclusionReason;delete y.invoiceRecordVisibility;return y});assert.deepStrictEqual(restored,original.movements);
 assert.equal(updated.movements.filter(x=>x.excludedFromInvoiceDetails).length,3);
 const nu=updated.invoices.find(x=>x.card==='Nubank');t.set(updated);assert.equal(t.invoiceReconciliation(nu).difference,0);assert.equal(t.invoiceReconciliation(nu).details,nu.amountCents+(nu.manualDeltaCents||0));assert(!t.reconciliationPanel(nu).includes(String(Math.abs(updated.movements.find(x=>x.invoice===nu.id&&x.invoiceRecordVisibility==='archive-only').cents)/100).replace('.',',')));assert(!t.reconciliationPanel(nu).includes("Detalhes parciais"));
 const c6=updated.invoices.find(x=>x.card==='C6 Black');t.set(updated);assert.equal(t.invoiceReconciliation(c6).difference,0);assert.equal(t.invoiceReconciliation(c6).details,c6.amountCents+(c6.manualDeltaCents||0));
 assert.equal(updated.invoices.filter((i,j)=>JSON.stringify(i)!==JSON.stringify(original.invoices[j])).length,2);
 t.set(updated);for(const card of ['Nubank','C6 Black','Mercado Pago']){const i=updated.invoices.find(x=>x.card===card);assert.equal(i.estimated,false);assert(t.invoiceChoice(card,i.cycle,card).includes('Confirmado'));}
 const css=html.match(/<style>([\s\S]*?)<\/style>/)[1];
 fs.writeFileSync('dados-privados/previa-faturas.html','<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Prévia das faturas</title><style>'+css+'</style><body><main style="padding:24px;max-width:1200px;margin:auto"><h1>Faturas · novembro de 2026</h1><div class="card-selector">'+['Nubank','C6 Black','Mercado Pago'].map(c=>t.invoiceChoice(c,'2026-11','Nubank')).join('')+'</div><p>Prévia estática. Igualdade numérica não comprova conferência dos lançamentos.</p></main></body></html>');
}
console.log('Invoice confirmation, independent detail status and unchanged real-data projections passed');

