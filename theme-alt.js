/* Cashflow V1.2 visual enhancement only: no storage changes, no changes to app.js calculations. */
(function(){'use strict';
const $=id=>document.getElementById(id);
const home=$('home');if(!home)return;
const first=home.querySelector('section');
const extras=document.createElement('div');extras.id='visualExtras';
extras.innerHTML=`<div class="mini-grid"><section class="stat" style="margin:0"><span class="muted">🏦 Girokonto</span><strong id="heroBalance">–</strong></section><section class="stat gold-card" style="margin:0"><span class="muted">👑 Gringotts</span><strong class="gold-value">Sparübersicht</strong><span class="muted" style="font-size:11px">Überweisung erst nach Prüfung am 9.</span></section></div><section><h3 class="section-title">🛒 Lebensmittelbudget</h3><div class="line"><span>Im Monat genutzt</span><strong id="heroFoodPercent">–</strong></div><div class="progress"><div id="heroFoodBar"></div></div><div class="line"><span>Noch geplant</span><strong id="heroFoodLeft">–</strong></div></section><section class="gold-card"><h3>👑 Gringotts · Monatscheck</h3><p class="muted">Am 9. offene Rechnungen prüfen, Zero Ten sichern und erst dann den echten Überschuss bestimmen.</p><div class="gold-rule"></div><div class="milestone">Kontostand abgleichen</div><div class="milestone">Offene Posten prüfen</div><div class="milestone">Zero Ten reservieren</div><div class="milestone">Freien Überschuss ermitteln</div></section>`;
first.after(extras);
const sync=()=>{try{const euro=n=>(n/100).toLocaleString('de-DE',{style:'currency',currency:'EUR'});$('heroBalance').textContent=euro(db.balance);const m=month();const plan=db.foodPlans[m]??0;const spent=db.shops.filter(s=>s.date.slice(0,7)===m).reduce((a,s)=>a+s.amount,0);const pct=plan?Math.round(spent/plan*100):0;$('heroFoodPercent').textContent=pct+' %';$('heroFoodBar').style.width=Math.min(100,pct)+'%';$('heroFoodBar').style.background=spent>plan?'#ff8585':'';$('heroFoodLeft').textContent=euro(Math.max(0,plan-spent));}catch(e){console.warn('Designanzeige:',e)}};
const oldRender=window.render; if(typeof oldRender==='function'){window.render=function(){oldRender();sync()}};
sync();
const foot=document.querySelector('main > p.muted:last-child');if(foot)foot.textContent='Cashflow V1.2 · Offline nach Laden · Daten nur in diesem Browser · Keine Bankverbindung';
})();
