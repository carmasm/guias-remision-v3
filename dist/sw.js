if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const u=s=>i(s,r),o={module:{uri:r},exports:t,require:u};e[r]=Promise.all(l.map((s=>o[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-fa446783"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/focus-visible-9c13edeb.js",revision:null},{url:"assets/focus-visible-legacy-b3e947fe.js",revision:null},{url:"assets/index-b1499a6a.js",revision:null},{url:"assets/index-ed535b22.css",revision:null},{url:"assets/index-legacy-c88857f4.js",revision:null},{url:"assets/index9-47f6a867.js",revision:null},{url:"assets/index9-legacy-7d91d282.js",revision:null},{url:"assets/input-shims-3103a6b3.js",revision:null},{url:"assets/input-shims-legacy-783b69e9.js",revision:null},{url:"assets/ios.transition-f0fce6bb.js",revision:null},{url:"assets/ios.transition-legacy-6aaeed85.js",revision:null},{url:"assets/keyboard2-14e0da31.js",revision:null},{url:"assets/keyboard2-legacy-6ef05eae.js",revision:null},{url:"assets/md.transition-ff9337b5.js",revision:null},{url:"assets/md.transition-legacy-28a33626.js",revision:null},{url:"assets/polyfills-legacy-75583bd0.js",revision:null},{url:"assets/status-tap-387d8db8.js",revision:null},{url:"assets/status-tap-legacy-949ce2db.js",revision:null},{url:"assets/swipe-back-0bcb9dc2.js",revision:null},{url:"assets/swipe-back-legacy-3f132fe0.js",revision:null},{url:"index.html",revision:"e26c5ecd018bc4e65c0690d4dbf14514"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"9d983147c48513c180d8d6ff2fc75ae5"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
