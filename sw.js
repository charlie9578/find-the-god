/* Find the God offline shell and artwork cache. All paths are scope-relative. */
const VERSION='ftg-pwa-v1';
const CACHE=VERSION+'-core';
const ART_CACHE=VERSION+'-images';
const CORE=['./','./index.html','./css/style.css','./js/art.js','./js/game.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
const GODS=['anubis','horus','isis','osiris','sekhmet','sobek','thoth','hathor','ptah','bastet','set','nephthys','amun','khonsu','min','ra','maat','nut','geb','mut','nehebkau','khnum','neith','taweret','bes'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k.startsWith('ftg-pwa-')&&k!==CACHE&&k!==ART_CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
 })());
});
// Download art only after the app has started. Keep activation short.
self.addEventListener('message',event=>{
 if(event.data?.type!=='CACHE_ARTWORK')return;
 event.waitUntil((async()=>{
  const cache=await caches.open(ART_CACHE);
  for(const name of GODS){
   const url=new URL('./assets/'+name+'.webp',self.registration.scope).href;
   if(await cache.match(url))continue;
   try{const response=await fetch(url);if(response.ok)await cache.put(url,response)}catch(e){/* retry next visit */}
  }
 })());
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin||!url.pathname.startsWith(new URL(self.registration.scope).pathname))return;
 const isArt=url.pathname.includes('/assets/')&&url.pathname.endsWith('.webp');
 if(isArt){
  event.respondWith((async()=>{
   const cache=await caches.open(ART_CACHE);
   const saved=await cache.match(request);
   if(saved)return saved;
   const response=await fetch(request);
   if(response.ok)event.waitUntil(cache.put(request,response.clone()));
   return response;
  })());
  return;
 }
 event.respondWith((async()=>{
  try{
   const response=await fetch(request);
   if(response.ok){const cache=await caches.open(CACHE);event.waitUntil(cache.put(request,response.clone()))}
   return response;
  }catch(e){
   return await caches.match(request,{ignoreSearch:true}) || (request.mode==='navigate'?await caches.match('./index.html'):Response.error());
  }
 })());
});
