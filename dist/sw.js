if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const u=s=>i(s,r),a={module:{uri:r},exports:t,require:u};e[r]=Promise.all(l.map((s=>a[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-fa446783"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/focus-visible-9c13edeb.js",revision:null},{url:"assets/focus-visible-legacy-b3e947fe.js",revision:null},{url:"assets/index-2f16e114.js",revision:null},{url:"assets/index-d03703dd.css",revision:null},{url:"assets/index-legacy-49a32bd0.js",revision:null},{url:"assets/index9-33e5aab8.js",revision:null},{url:"assets/index9-legacy-1fbb2e0d.js",revision:null},{url:"assets/input-shims-2e7122bf.js",revision:null},{url:"assets/input-shims-legacy-868bcc74.js",revision:null},{url:"assets/ios.transition-e131e017.js",revision:null},{url:"assets/ios.transition-legacy-1ed3484d.js",revision:null},{url:"assets/keyboard2-11df835c.js",revision:null},{url:"assets/keyboard2-legacy-ffe25798.js",revision:null},{url:"assets/md.transition-20da9d5c.js",revision:null},{url:"assets/md.transition-legacy-2dc131e0.js",revision:null},{url:"assets/polyfills-legacy-75583bd0.js",revision:null},{url:"assets/status-tap-eabaef62.js",revision:null},{url:"assets/status-tap-legacy-f218167b.js",revision:null},{url:"assets/swipe-back-5ee25846.js",revision:null},{url:"assets/swipe-back-legacy-2a09d00e.js",revision:null},{url:"index.html",revision:"cb1496aed543dae0400cd1828a64cd24"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"9d983147c48513c180d8d6ff2fc75ae5"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
