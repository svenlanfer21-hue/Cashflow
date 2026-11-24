/* Cashflow V1.2 Emerald x Gringotts: presentation only. Never changes app data. */
(function(){'use strict';
const $=id=>document.getElementById(id);
const home=$('home');if(!home)return;
const first=home.querySelector('section');if(!first)return;
const extras=document.createElement('div');extras.id='visualExtras';
extras.innerHTML=`<div class="mini-grid"><section class="stat" style="margin:0"><span class="hero-card-label">🏦 Girokonto</span><strong id="heroBalance" class="hero-balance">–</strong><span class="muted">Aktueller Bankstand</span></section><section class="stat gold-card" style="margin:0"><span class="hero-card-label gold-title">👑 GRINGOTTS</span><strong class="gold-value">Spar- & Überschusskonto</strong><span class="muted">Überschuss erst am 9. prüfen</span></section></div><section class="hero-section"><h3>🛒 Lebensmittelbudget</h3><div class="line"><span>Im Monat genutzt</span><strong id="heroFoodPercent">–</strong></div><div class="progress"><div id="heroFoodBar"></div></div><div class="hero-metrics"><span>Noch geplant: <strong id="heroFoodLeft">–</strong></span><span>Monatsbudget: <strong id="heroFoodTotal">–</strong></span></div></section><div class="dashboard-lower"><section><h3>📋 Offene Positionen</h3><div class="line"><span>Einzelbuchungen</span><strong id="heroPending">–</strong></div><div class="line"><span>Fixkosten</span><strong id="heroRecurring">–</strong></div><div class="line"><span>Lebensmittel geplant</span><strong id="heroFoodOpen">–</strong></div></section><section class="gold-card"><h3 class="gold-title">📅 Nächster Monatscheck</h3><div class="milestone-date" id="heroNextCheck">–</div><div class="milestone">Kontostand prüfen</div><div class="milestone">Offene Posten abgleichen</div><div class="milestone">Zero Ten sichern</div><div class="milestone">Überschuss → Gringotts</div></section></div>`;
first.after(extras);
const icons={home:'⌂',plan:'▥',foodtab:'🛒',entries:'⇄',recurring:'▤',settings:'⚙'};
document.querySelectorAll('.tabs button[data-tab]').forEach(b=>{const i=document.createElement('span');i.className='nav-emblem';i.setAttribute('aria-hidden','true');i.textContent=icons[b.dataset.tab]||'•';b.prepend(i)});
const fmt=n=>(n/100).toLocaleString('de-DE',{style:'currency',currency:'EUR'});
function sync(){try{
$('heroBalance').textContent=fmt(db.balance);
const m=month();const plan=Number.isSafeInteger(db.foodPlans[m])?db.foodPlans[m]:Math.round(db.food*52/12);
const spent=db.shops.filter(s=>s.date.slice(0,7)===m).reduce((a,s)=>a+s.amount,0);
const pct=plan>0?Math.round(spent/plan*100):0;
$('heroFoodPercent').textContent=pct+' % genutzt';$('heroFoodBar').style.width=Math.min(100,pct)+'%';$('heroFoodBar').style.background=spent>plan?'linear-gradient(90deg,#c75454,#f2a17c)':'';
$('heroFoodLeft').textContent=fmt(Math.max(0,plan-spent));$('heroFoodTotal').textContent=fmt(plan);$('heroFoodOpen').textContent=fmt(Math.max(0,plan-spent));
const pending=db.entries.filter(e=>e.status==='open').reduce((s,e)=>s+(e.type==='expense'?e.amount:-e.amount),0);
const rec=db.recurring.filter(r=>!(r.paidMonths||[]).includes(m)).reduce((s,r)=>s+r.amount,0);
$('heroPending').textContent=fmt(pending);$('heroRecurring').textContent=fmt(rec);
const now=new Date();let y=now.getFullYear(),mo=now.getMonth();if(now.getDate()>9){mo++;if(mo===12){mo=0;y++}}$('heroNextCheck').textContent='09.'+String(mo+1).padStart(2,'0')+'.'+y;
}catch(e){console.warn('Designanzeigen:',e)}}
const originalRender=window.render;
if(typeof originalRender==='function')window.render=function(){const result=originalRender.apply(this,arguments);sync();return result};
sync();
})();
