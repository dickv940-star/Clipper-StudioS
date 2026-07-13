import Player from "./player/player.js";

import Timeline from "./editor/timeline.js";

import Uploader from "./media/uploader.js";

import Library from "./media/library.js";

window.addEventListener(

    "DOMContentLoaded",

    () => {

        console.log(

            "ClipperStudio Started"

        );

        Player.init();

        Timeline.init();

        Library.init();

        Uploader.init();

    }

);
