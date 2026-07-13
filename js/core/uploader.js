const Uploader = {

    init() {

        this.input = document.getElementById("videoInput");

        this.button = document.getElementById("chooseVideo");

        this.button.onclick = () => {

            this.input.click();

        };

        this.input.onchange = (e) => {

            const file = e.target.files[0];

            if (!file) return;

            Player.load(file);

        };

    }

};

import Player from "./player.js";

export default Uploader;
