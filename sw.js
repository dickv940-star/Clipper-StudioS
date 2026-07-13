/*
=================================
ClipperStudio Service Worker
Version 3.0
=================================
*/


const CACHE_NAME =
"clipperstudio-v3";



const FILES = [


"./",

"./index.html",

"./app.js",

"./manifest.json",



// CORE

"js/core/router.js",



// STORAGE

"js/storage/project-storage.js",



// VIDEO

"js/video/loader.js",
"js/video/player.js",
"js/video/metadata.js",
"js/video/thumbnail.js",



// AI

"js/ai/scene-detector.js",
"js/ai/motion-detector.js",
"js/ai/face-detector.js",
"js/ai/auto-editor.js",
"js/ai/clip-generator.js",



// EDITOR

"js/editor/editor.js",
"js/editor/timeline.js",
"js/editor/clip.js",
"js/editor/track.js",
"js/editor/undo.js",
"js/editor/redo.js",



// AUDIO

"js/audio/audio-engine.js",
"js/audio/music-manager.js",
"js/audio/voice-over.js",
"js/audio/sound-effect.js",



// EFFECT

"js/effects/effect-engine.js",



// RENDER

"js/render/render-engine.js",
"js/render/frame-renderer.js",
"js/render/motion-engine.js",
"js/render/color-engine.js",
"js/render/lut-engine.js",
"js/render/shader-engine.js",
"js/render/render-pipeline.js",



// EXPORT

"js/export/quality-manager.js",
"js/export/render-preview.js",
"js/export/export-manager.js",
"js/export/export-controller.js"



];





self.addEventListener(

"install",

event=>{


console.log(

"ClipperStudio SW Install"

);



event.waitUntil(

caches.open(

CACHE_NAME

)

.then(

cache=>{


return cache.addAll(

FILES

);


})

);



self.skipWaiting();


});








self.addEventListener(

"activate",

event=>{


event.waitUntil(

caches.keys()

.then(

keys=>{


return Promise.all(

keys.map(

key=>{


if(

key !== CACHE_NAME

){


return caches.delete(

key

);


}



})


);



})

);



self.clients.claim();



});








self.addEventListener(

"fetch",

event=>{


event.respondWith(

caches.match(

event.request

)

.then(

cached=>{


return cached ||

fetch(

event.request

);


})

);



});
