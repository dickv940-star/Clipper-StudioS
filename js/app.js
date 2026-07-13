import Uploader from "./core/uploader.js";
import Player from "./core/player.js";
import Timeline from "./core/timeline.js";

window.addEventListener("DOMContentLoaded",()=>{

    Player.init();

    Timeline.init();

    Uploader.init();

});
