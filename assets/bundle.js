(()=>{var e={853:e=>{e.exports={getArray:function(e,t,n){const r=new Float64Array(e,t,n);return Array.from(r)}}},698:(e,t,n)=>{"use strict";n.r(t)}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{"use strict";n(698);const{getArray:e}=n(853);!async function(){const t=document.querySelector("#input-form"),n=document.querySelector("#numbers-input"),r=document.querySelector("#sample-pop-sample"),o=document.querySelector("#err-feedback"),i=document.querySelector("#out"),a=document.querySelector("#data-set"),c=document.querySelector("#cout"),s=document.querySelector("#arithmetic-mean"),u=document.querySelector("#harmonic-mean"),d=document.querySelector("#geometric-mean"),m=document.querySelector("#median"),l=document.querySelector("#mode"),y=document.querySelector("#min"),S=document.querySelector("#max"),g=document.querySelector("#range"),x=document.querySelector("#midrange"),f=document.querySelector("#variance"),p=document.querySelector("#standard-deviation");try{const b=await fetch("./assets/program.wasm"),q=await WebAssembly.instantiateStreaming(b,{wasi_snapshot_preview1:{proc_exit:e=>{if(e)throw`Exit code ${e}`}},env:{power:(e,t)=>e**t}}),{memory:v,sort:h,mean:C,variance:F,geometricMean:N,harmonicMean:w,median:A,mode:L,min:_,max:j,range:E,midrange:M,standardDeviation:O,sampleVariance:D,sampleStandardDeviation:k}=q.instance.exports;t.addEventListener("submit",(t=>{t.preventDefault();try{const{isInteger:t}=Number,b=n.value.split(/\s*,\s*/).map((e=>parseFloat(e))).filter((e=>!isNaN(e))),q=new Float64Array(v.buffer,0,b.length),P=new Uint32Array(v.buffer,q.byteLength),T=r.checked,I=!b.includes(0),U=0==b.filter((e=>e<0)).length,V=0==b.filter((e=>e>0)).length;q.set(b);const W=[q.byteOffset,q.length],$=e(v.buffer,h(...W),q.length),z=C(...W),B=U||V?N(...W):NaN,G=I&&U?w(...W):NaN,H=A(...W),J=e(v.buffer,L(...W,P.byteOffset),P[0]),K=_(...W),Q=j(...W),R=E(...W),X=M(...W),Y=T?D(...W):F(...W),Z=T?k(...W):O(...W);i.classList.remove("d-none"),o.textContent="",a.textContent=$.join(", "),c.textContent=$.length.toString(),s.textContent=isFinite(B)?t(1e6*z)?z.toString():z.toFixed(6):"-",d.textContent=isFinite(B)&&!isNaN(B)?t(1e6*B)?B.toString():B.toFixed(6):"-",u.textContent=isNaN(G)?"-":t(1e6*G)?G.toString():G.toFixed(6),m.textContent=H.toString(),l.textContent=J.join(", "),y.textContent=K.toString(),S.textContent=Q.toString(),g.textContent=t(1e6*R)?R.toString():R.toFixed(6),x.textContent=t(1e6*X)?X.toString():X.toFixed(6),f.textContent=isFinite(Y)?t(1e6*Y)?Y.toString():Y.toFixed(6):"-",p.textContent=isFinite(Z)?t(1e6*Z)?Z.toString():Z.toFixed(6):"-"}catch(e){i.classList.add("d-none"),o.textContent=e instanceof Error?e.message:String(e)}}))}catch(e){i.classList.add("d-none"),o.textContent=e instanceof Error?e.message:String(e)}}()})()})();