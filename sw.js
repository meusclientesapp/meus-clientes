const C='mc-v18',X='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(async c=>{await c.addAll(F);try{await c.put(X,await fetch(X,{mode:'no-cors'}))}catch(x){}}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
if(r.url===X){e.respondWith(caches.match(X).then(h=>h||fetch(r).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(X,cp));return n})));return}
const G=()=>caches.match(r).then(h=>h||(r.mode==='navigate'?caches.match('./'):null));
e.respondWith(fetch(r).then(n=>{if(new URL(r.url).origin!==location.origin)return n;if(n.ok){const cp=n.clone();caches.open(C).then(c=>c.put(r,cp));return n}return G().then(h=>h||n)}).catch(()=>G().then(h=>h||Response.error())))});
