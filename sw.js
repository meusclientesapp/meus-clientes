const C='mc-v25',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','xlsx.full.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
const G=()=>caches.match(r).then(h=>h||(r.mode==='navigate'?caches.match('./'):null));
e.respondWith(fetch(r).then(n=>{if(new URL(r.url).origin!==location.origin)return n;if(n.ok){const cp=n.clone();caches.open(C).then(c=>c.put(r,cp));return n}return G().then(h=>h||n)}).catch(()=>G().then(h=>h||Response.error())))});
