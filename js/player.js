import Timeline from "./timeline.js";
import Clips from "./clips.js";

const Player = {

    video: null,

    currentFile: null,

    init() {

        this.video = document.getElementById("video");

        if (!this.video) {
            console.error("Video element tidak ditemukan.");
            return;
        }

        // Video selesai dimuat
        this.video.addEventListener("loadedmetadata", () => {

            console.log("Video Loaded");

            console.log("Nama :", this.currentFile?.name);

            console.log("Durasi :", this.video.duration);

            console.log(
                "Resolusi :",
                this.video.videoWidth + " x " + this.video.videoHeight
            );

            // Membuat 1 clip penuh
            Clips.create(this.video.duration);

            // Menggambar timeline
            Timeline.setDuration(this.video.duration);

        });

        // Update playhead
        this.video.addEventListener("timeupdate", () => {

            if (!Timeline.duration) return;

            const playhead = document.getElementById("playhead");

            if (!playhead) return;

            const x =
                (this.video.currentTime / Timeline.duration) *
                Timeline.canvas.width;

            playhead.style.left = x + "px";

        });

        // Video selesai diputar
        this.video.addEventListener("ended", () => {

            console.log("Playback selesai");

        });

    },

    load(file) {

        if (!file) return;

        this.currentFile = file;

        // Hapus object URL sebelumnya
        if (this.video.src) {
            URL.revokeObjectURL(this.video.src);
        }

        const url = URL.createObjectURL(file);

        this.video.src = url;

        this.video.load();

    },

    play() {

        this.video.play();

    },

    pause() {

        this.video.pause();

    },

    toggle() {

        if (this.video.paused) {

            this.video.play();

        } else {

            this.video.pause();

        }

    },

    seek(seconds) {

        if (!this.video) return;

        this.video.currentTime = seconds;

    },

    getCurrentTime() {

        return this.video.currentTime;

    },

    getDuration() {

        return this.video.duration;

    }

};

export default Player;
