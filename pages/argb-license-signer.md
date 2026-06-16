---
layout: page
title: "HSL License Signer"
meta-title: "HSL License Signer"
permalink: /tools/hsl-lic-7q3m9x
sitemap: false
comments: false
---

<style>
.signer-wrap{padding:0 16px;max-width:720px;margin:0 auto}
.signer-wrap *{box-sizing:border-box}
.signer-hero{background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 50%,#16213e 100%);border:1px solid #00aeff33;border-radius:12px;padding:28px 24px;margin-bottom:28px;text-align:center}
.signer-hero .app-icon{font-size:52px;display:block;margin-bottom:10px}
.signer-hero h2{color:#00aeff;margin:0 0 8px 0;font-size:1.5em}
.signer-hero p{color:#aaa;margin:0;font-size:.92em}
.signer-badge{display:inline-block;background:#00aeff22;border:1px solid #00aeff55;color:#00aeff;border-radius:20px;padding:4px 14px;font-size:.8em;margin:6px 4px 0 4px}
.signer-card{background:#111;border:1px solid #243345;border-left:4px solid #00aeff;border-radius:0 8px 8px 0;padding:18px 20px;margin-bottom:22px}
.signer-card label{display:block;font-size:12px;color:#9fb3c8;margin:12px 0 5px;font-weight:600}
.signer-card label:first-of-type{margin-top:0}
.signer-card input,.signer-card textarea{width:100%;padding:11px 12px;border-radius:9px;border:1px solid #2c3e54;background:#0e161f;color:#e6edf5;font-size:15px;font-family:ui-monospace,Menlo,monospace}
.signer-card textarea{resize:vertical}
.signer-card .row{display:flex;gap:10px}
.signer-card .row>div{flex:1}
.signer-card button{width:100%;padding:13px;margin-top:14px;border:none;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;background:linear-gradient(180deg,#2f7de0,#1e5fb8);color:#fff}
.signer-card button.alt{background:#243345;color:#cfe0f0;margin-top:8px}
.signer-card button:active{filter:brightness(.9)}
.signer-card .status{font-size:13px;margin-top:10px;min-height:18px;color:#ccc}
.signer-card .ok{color:#58d68d}
.signer-card .err{color:#ff6b6b}
.signer-card .warn{color:#ffcc66}
.signer-card .mono-small{font-family:ui-monospace,monospace;font-size:11px;color:#8aa0b6;word-break:break-all}
.signer-card details{margin-top:10px}
.signer-card summary{font-size:12px;color:#9fb3c8;cursor:pointer}
.footer-note{color:#555;font-size:.85em;text-align:center;margin-top:32px}
.footer-note a{color:#555}
</style>

<div class="signer-wrap">

<div class="signer-hero">
  <span class="app-icon">🔏</span>
  <h2>HSL License Signer</h2>
  <p>Ký file <strong>.lic</strong> ngay trên điện thoại (offline). Seed chỉ lưu trong trình duyệt máy này.</p>
  <div style="margin-top:14px">
    <span class="signer-badge">📱 Mobile / Offline</span>
    <span class="signer-badge">🔒 Ed25519</span>
    <span class="signer-badge">🛠️ Nội bộ HSL</span>
  </div>
</div>

<div class="signer-card">
  <label>Seed private key (base64, 32 byte) — nhập 1 lần</label>
  <input id="q0" type="password" placeholder="dán seed base64 ở đây" autocomplete="off">
  <button class="alt" id="q1">💾 Lưu seed vào máy này</button>
  <div class="status" id="q2"></div>
  <details>
    <summary>Lấy seed từ máy dev thế nào?</summary>
    <p class="mono-small">Chạy 1 lần trên PC (thư mục chứa license_private_key.pem), rồi dán kết quả vào ô seed:<br><br>
    python tools/print_seed.py</p>
  </details>
  <div class="status mono-small" id="q3"></div>
</div>

<div class="signer-card">
  <label>machine_id của khách (sha256 hex)</label>
  <input id="q4" placeholder="vd 3f9a... (64 ký tự hex)" autocomplete="off" autocapitalize="none" spellcheck="false">
  <div class="row">
    <div>
      <label>license_id</label>
      <input id="q5" placeholder="HSL-2026-000001" autocapitalize="characters" spellcheck="false">
    </div>
    <div>
      <label>edition</label>
      <input id="q6" value="pro" spellcheck="false">
    </div>
  </div>
  <label>expiry (epoch giây) — 0 = mua đứt</label>
  <input id="q7" value="0" inputmode="numeric">
  <button id="q8">🔏 Ký license</button>
  <div class="status" id="q9"></div>
</div>

<div class="signer-card">
  <label>Nội dung file .lic</label>
  <textarea id="qa" rows="6" readonly placeholder="kết quả sẽ hiện ở đây"></textarea>
  <button class="alt" id="qb">📋 Copy</button>
  <button class="alt" id="qc">📤 Chia sẻ / Lưu file .lic</button>
</div>

<p class="footer-note">
  © {{ site.time | date: '%Y' }} {{ site.company_EN }} &nbsp;·&nbsp;
  <a href="/aboutme">Về chúng tôi</a> &nbsp;·&nbsp;
  Công cụ nội bộ — chỉ dùng để cấp license ARGB HSL
</p>

</div>

<script>
"use strict";(function(){
var _S=["SE1BQw==","U0hBLTI1Ng==","c2lnbg==","RWQyNTUxOQ==","dmVyaWZ5","cmF3","cGtjczg=","SFNMLUxJQ0VOU0UtRkstVjE=","aHNsLXNlZWQtc2VsZmNoZWNr","aHNsX3NpZ25lcl9zZWVkX2I2NA==","ZWRpdGlvbg==","ZXhwaXJ5","Zms=","aXNzdWVkX2F0","bGljZW5zZV9pZA==","bWFjaGluZV9pZA==","YThxaHFhUTRXWkdwWlltK0NxNWNLaTdZTHVUWkwwdVBPQ3BOOFVUdDUxYz0=","cHJv","aHNsX2xpY2Vuc2U=","c2ln","dg==","bGljZW5zZQ==","LmxpYw==","YXBwbGljYXRpb24vanNvbg==","bWlk","bGlk","YXV0bw==","4p2MIA==","4p2MIFNlZWQgS0jDlE5HIGto4bubcCBwdWJsaWMga2V5IG5ow7puZyDigJQgc2FpIGtleSE=","4pyFIMSQw6MgbMawdSBzZWVkIChraOG7m3AgcHVibGljIGtleSkuIEzhuqduIHNhdSBraMO0bmcgY+G6p24gbmjhuq1wIGzhuqFpLg==","cHVibGljIGtleSBraOG7m3A6IA==","4pyFIFNlZWQgxJHDoyBsxrB1IHPhurVuIHRyw6puIG3DoXkgbsOgeS4=","4o+zIMSRYW5nIGvDvS4uLg==","4pyFIMSQw6Mga8O9IA==","IGNobyBtw6F5IA==","4oCm","8J+TiyDEkMOjIGNvcHku","c2VlZCBwaOG6o2kgxJHDum5nIDMyIGJ5dGUgKHNhdSBnaeG6o2kgYmFzZTY0KQ==","VHLDrG5oIGR1eeG7h3Qga2jDtG5nIGjhu5cgdHLhu6MgV2ViQ3J5cHRvIChj4bqnbiBTYWZhcmkvQ2hyb21lIG3hu5tpKS4=","Q2jGsGEgY8OzIHNlZWQuIE5o4bqtcCBzZWVkIHbDoCBi4bqlbSBMxrB1Lg==","c2VlZCBraMO0bmcgcGjhuqNpIDMyIGJ5dGUu","Tmjhuq1wIHNlZWQgdHLGsOG7m2Mu","bWFjaGluZV9pZCBraMO0bmcgaOG7o3AgbOG7hyAoaGV4KS4=","VGhp4bq/dSBsaWNlbnNlX2lkLg==","ZXhwaXJ5IHBo4bqjaSBsw6Agc+G7kS4="];
function _u(i){return decodeURIComponent(escape(atob(_S[i])))}
var $=function(i){return document.getElementById(i)},E=new TextEncoder(),K=_u(9),P=[0x30,0x2e,0x02,0x01,0x00,0x30,0x05,0x06,0x03,0x2b,0x65,0x70,0x04,0x22,0x04,0x20];
function b2(b){var s="",i=0;for(;i<b.length;i++)s+=String.fromCharCode(b[i]);return btoa(s)}
function d2(b){var x=atob(b.trim()),o=new Uint8Array(x.length),i=0;for(;i<x.length;i++)o[i]=x.charCodeAt(i);return o}
function pk(s){if(s.length!==32)throw new Error(_u(37));var r=new Uint8Array(P.length+32);r.set(P,0);r.set(s,P.length);return r}
async function wc(){if(!window.crypto||!crypto.subtle)throw new Error(_u(38))}
async function fk(s){var k=await crypto.subtle.importKey(_u(5),s,{name:_u(0),hash:_u(1)},false,[_u(2)]);return new Uint8Array(await crypto.subtle.sign(_u(0),k,E.encode(_u(7))))}
async function ip(s){return crypto.subtle.importKey(_u(6),pk(s),{name:_u(3)},false,[_u(2)])}
function cp(p){return '{"'+_u(10)+'":'+JSON.stringify(p.e)+',"'+_u(11)+'":'+p.x+',"'+_u(12)+'":'+JSON.stringify(p.f)+',"'+_u(13)+'":'+p.i+',"'+_u(14)+'":'+JSON.stringify(p.l)+',"'+_u(15)+'":'+JSON.stringify(p.m)+'}'}
async function cs(){var b=localStorage.getItem(K)||$('q0').value;if(!b)throw new Error(_u(39));return d2(b)}
async function vs(b){await wc();var s=d2(b);if(s.length!==32)throw new Error(_u(40));var pv=await ip(s),sm=E.encode(_u(8)),sg=await crypto.subtle.sign({name:_u(3)},pv,sm),pb=await crypto.subtle.importKey(_u(5),d2(_u(16)),{name:_u(3)},false,[_u(4)]);return await crypto.subtle.verify({name:_u(3)},pb,sg,sm)}
$('q1').onclick=async function(){var el=$('q2');try{var b=$('q0').value.trim();if(!b)throw new Error(_u(41));if(!await vs(b)){el.className='status err';el.textContent=_u(28);return}localStorage.setItem(K,b);$('q0').value='';el.className='status ok';el.textContent=_u(29);$('q3').textContent=_u(30)+_u(16)}catch(e){el.className='status err';el.textContent=_u(27)+e.message}};
async function sg(){var el=$('q9');el.className='status';el.textContent=_u(32);try{await wc();var s=await cs(),m=$('q4').value.trim().toLowerCase();if(!/^[0-9a-f]{16,128}$/.test(m))throw new Error(_u(42));var l=$('q5').value.trim();if(!l)throw new Error(_u(43));var ed=$('q6').value.trim()||_u(17),x=parseInt($('q7').value.trim()||'0',10);if(Number.isNaN(x))throw new Error(_u(44));var f=b2(await fk(s)),p={l:l,m:m,e:ed,i:Math.floor(Date.now()/1000),x:x,f:f},pb=E.encode(cp(p)),pv=await ip(s),si=new Uint8Array(await crypto.subtle.sign({name:_u(3)},pv,pb)),ev={};ev[_u(18)]=b2(pb);ev[_u(19)]=b2(si);ev[_u(20)]=1;$('qa').value=JSON.stringify(ev);el.className='status ok';el.textContent=_u(33)+l+_u(34)+m.slice(0,10)+_u(35);return l}catch(e){el.className='status err';el.textContent=_u(27)+e.message;throw e}}
$('q8').onclick=function(){sg().catch(function(){})};
$('qb').onclick=async function(){var t=$('qa').value;if(!t)return;try{await navigator.clipboard.writeText(t);$('q9').textContent=_u(36)}catch(e){$('qa').select();document.execCommand('copy')}};
$('qc').onclick=async function(){var t=$('qa').value;if(!t)return;var n=($('q5').value.trim()||_u(21))+_u(22);try{var fl=new File([t],n,{type:_u(23)});if(navigator.canShare&&navigator.canShare({files:[fl]})){await navigator.share({files:[fl],title:n});return}}catch(e){}var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:_u(23)}));a.download=n;a.click()};
(function(){var p=new URLSearchParams(location.search);if(p.get(_u(24)))$('q4').value=p.get(_u(24));if(p.get(_u(25)))$('q5').value=p.get(_u(25));if(p.get(_u(10)))$('q6').value=p.get(_u(10));if(p.get(_u(11)))$('q7').value=p.get(_u(11));if(localStorage.getItem(K)){$('q2').className='status ok';$('q2').textContent=_u(31);if(p.get(_u(26))==='1'&&p.get(_u(24))&&(p.get(_u(25))||$('q5').value)){window.addEventListener('load',function(){sg().catch(function(){})})}}})();
})();
</script>
