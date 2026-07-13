const CACHE_NAME =
"clipperstudio-v1";



self.addEventListener(
"install",
event=>{

console.log(
"SW Installed"
);

self.skipWaiting();

});



self.addEventListener(
"activate",
event=>{

console.log(
"SW Active"
);

});
