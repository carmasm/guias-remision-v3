if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const u=s=>i(s,r),a={module:{uri:r},exports:t,require:u};e[r]=Promise.all(l.map((s=>a[s]||u(s)))).then((s=>(n(...s),t)))}}define(["./workbox-fa446783"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/focus-visible-9c13edeb.js",revision:null},{url:"assets/focus-visible-legacy-b3e947fe.js",revision:null},{url:"assets/index-0c99480d.js",revision:null},{url:"assets/index-37c74c2f.css",revision:null},{url:"assets/index-legacy-dca4c069.js",revision:null},{url:"assets/index9-5027c1fd.js",revision:null},{url:"assets/index9-legacy-083e5797.js",revision:null},{url:"assets/input-shims-1ea48fa9.js",revision:null},{url:"assets/input-shims-legacy-d79f4fc7.js",revision:null},{url:"assets/ios.transition-6df8930e.js",revision:null},{url:"assets/ios.transition-legacy-f5a142e1.js",revision:null},{url:"assets/keyboard2-1534410d.js",revision:null},{url:"assets/keyboard2-legacy-7bb1d970.js",revision:null},{url:"assets/md.transition-b033c115.js",revision:null},{url:"assets/md.transition-legacy-2ba81705.js",revision:null},{url:"assets/polyfills-legacy-75583bd0.js",revision:null},{url:"assets/status-tap-9f98cfc8.js",revision:null},{url:"assets/status-tap-legacy-0399c62c.js",revision:null},{url:"assets/swipe-back-d13b199c.js",revision:null},{url:"assets/swipe-back-legacy-838d6d21.js",revision:null},{url:"index.html",revision:"040eaabd09c5e938a875dfa0aa8cbe83"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"9d983147c48513c180d8d6ff2fc75ae5"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
