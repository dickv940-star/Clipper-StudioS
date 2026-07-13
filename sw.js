const CACHE_NAME="clipper-v1";

const FILES=[

"./",

"./index.html",

"./manifest.json",

"./assets/logo.png",

"./assets/icon-192.png",

"./assets/icon-512.png"

];

self.addEventListener("install",event=>{

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>cache.addAll(FILES))

);

self.skipWaiting();

});

self.addEventListener("activate",event=>{

event.waitUntil(

self.clients.claim()

);

});

self.addEventListener("fetch",event=>{

event.respondWith(

caches.match(event.request)

.then(response=>{

return response||fetch(event.request);

})

);

});
