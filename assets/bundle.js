(()=>{"use strict";var e={356:(e,t)=>{function n(e){if(0==e.length)throw new Error("Insert an array with at least one number.");return e.reduce(((e,t)=>e+t),0)/e.length}function r(e){if(0==e.length)throw new Error("Insert an array with at least one number.");const t=Math.min(...e);return Math.max(...e)-t}function o(e){const t=n(e);return e.reduce(((e,n)=>e+(n-t)**2),0)/e.length}function a(e){const t=n(e);return e.reduce(((e,n)=>e+(n-t)**2),0)/(e.length-1)}Object.defineProperty(t,"__esModule",{value:!0}),t.sampleStandardDeviation=t.sampleVariance=t.standardDeviation=t.variance=t.midrange=t.range=t.mode=t.median=t.harmonicMean=t.geometricMean=t.mean=void 0,t.mean=n,t.geometricMean=function(e){if(0==e.length)throw new Error("Insert an array with at least one number.");const t=e.reduce(((e,t)=>e*Math.abs(t)),1),n=e.every((e=>e>=0)),r=e.every((e=>e<=0));if(!n&&r)throw new Error("The values must be either all positive or all negative.");return n?t**(1/e.length):-(t**(1/e.length))},t.harmonicMean=function(e){if(0==e.length)throw new Error("Insert an array with at least one number.");if(e.includes(0))throw new Error("All values must be greater than zero.");const t=e.reduce(((e,t)=>e+1/t),0);return e.length/t},t.median=function(e){if(0==e.length)throw new Error("Insert an array with at least one number.");const t=e.sort(((e,t)=>e-t));return t.length%2?t[Math.floor(t.length/2)]:(t[t.length/2-1]+t[t.length/2])/2},t.mode=function(e){if(0==e.length)throw new Error("Insert an array with at least one number.");const t=new Map;e.forEach((e=>{var n;return t.set(e,(null!==(n=t.get(e))&&void 0!==n?n:0)+1)}));const n=Math.max(...t.values()),r=Math.min(...t.values()),o=[];return r<n&&Array.from(t).forEach((([e,t])=>t==n?o.push(e):void 0)),o},t.range=r,t.midrange=function(e){return r(e)/2},t.variance=o,t.standardDeviation=function(e){return Math.sqrt(o(e))},t.sampleVariance=a,t.sampleStandardDeviation=function(e){return Math.sqrt(a(e))}},698:(e,t,n)=>{n.r(t)}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};(()=>{n(698);const e=n(356);window.addEventListener("load",(function(){const t=document.querySelector("#input-form"),n=document.querySelector("#numbers-input"),r=document.querySelector("#sample-pop-sample"),o=document.querySelector("#err-feedback"),a=document.querySelector("#out"),i=document.querySelector("#data-set"),u=document.querySelector("#cout"),c=document.querySelector("#arithmetic-mean"),s=document.querySelector("#harmonic-mean"),d=document.querySelector("#geometric-mean"),l=document.querySelector("#median"),m=document.querySelector("#mode"),h=document.querySelector("#min"),g=document.querySelector("#max"),S=document.querySelector("#range"),v=document.querySelector("#midrange"),y=document.querySelector("#variance"),f=document.querySelector("#standard-deviation");t.addEventListener("submit",(t=>{t.preventDefault();try{const{isInteger:t}=Number,x=n.value.split(/\s*,\s*/).map((e=>parseFloat(e))).filter((e=>!isNaN(e))),p=r.checked,w=!x.includes(0),q=x.every((e=>e>=0)),M=x.every((e=>e<=0)),b=x.sort(((e,t)=>e-t)),C=(0,e.mean)(x),E=q||M?(0,e.geometricMean)(x):NaN,F=w&&q?(0,e.harmonicMean)(x):NaN,N=(0,e.median)(x),D=(0,e.mode)(x),I=Math.min(...x),j=Math.max(...x),L=(0,e.range)(x),_=(0,e.midrange)(x),O=p?(0,e.sampleVariance)(x):(0,e.variance)(x),P=p?(0,e.sampleStandardDeviation)(x):(0,e.standardDeviation)(x);a.classList.remove("d-none"),o.textContent="",i.textContent=b.join(", "),u.textContent=b.length.toString(),c.textContent=isFinite(C)?t(1e6*C)?C.toString():C.toFixed(6):"-",d.textContent=isFinite(E)&&!isNaN(E)?t(1e6*E)?E.toString():E.toFixed(6):"-",s.textContent=isNaN(F)?"-":t(1e6*F)?F.toString():F.toFixed(6),l.textContent=N.toString(),m.textContent=D.join(", "),h.textContent=I.toString(),g.textContent=j.toString(),S.textContent=t(1e6*L)?L.toString():L.toFixed(6),v.textContent=t(1e6*_)?_.toString():_.toFixed(6),y.textContent=isFinite(O)?t(1e6*O)?O.toString():O.toFixed(6):"-",f.textContent=isFinite(P)?t(1e6*P)?P.toString():P.toFixed(6):"-"}catch(e){a.classList.add("d-none"),o.textContent=e instanceof Error?e.message:String(e)}}))}))})()})();