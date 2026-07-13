const Player = {

    init() {

        this.video = document.getElementById("video");

    },

    load(file) {

        const url = URL.createObjectURL(file);

        this.video.src = url;

        this.video.load();

        console.log(file.name);

        console.log(file.size);

    }

};

export default Player;
