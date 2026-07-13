import Clips from "./clips.js";
import Player from "./player.js";

const Timeline = {

    canvas: null,

    ctx: null,

    duration: 0,

    zoom: 100,

    width: 1000,

    trackY: 45,

    trackHeight: 30,

    init() {

        this.canvas = document.getElementById("timelineCanvas");

        this.ctx = this.canvas.getContext("2d");

        this.canvas.height = 120;

        this.canvas.width = this.width;

        this.bind();

        this.render();

    },

    bind() {

        const zoomIn = document.getElementById("zoomIn");

        const zoomOut = document.getElementById("zoomOut");

        if (zoomIn) {

            zoomIn.onclick = () => {

                this.zoom += 20;

                this.update();

            };

        }

        if (zoomOut) {

            zoomOut.onclick = () => {

                this.zoom = Math.max(20, this.zoom - 20);

                this.update();

            };

        }

        this.canvas.addEventListener("click", (e) => {

            if (!this.duration) return;

            const rect = this.canvas.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            // =========================
            // Cek apakah klik clip
            // =========================

            let found = false;

            Clips.items.forEach((clip) => {

                const clipX = (clip.start / this.duration) * this.canvas.width;

                const clipW = ((clip.end - clip.start) / this.duration) * this.canvas.width;

                if (

                    x >= clipX &&
                    x <= clipX + clipW &&
                    y >= this.trackY &&
                    y <= this.trackY + this.trackHeight

                ) {

                    Clips.selected = clip.id;

                    found = true;

                }

            });

            if (!found) {

                Clips.selected = null;

                const time = (x / this.canvas.width) * this.duration;

                Player.seek(time);

            }

            this.render();

        });

    },

    setDuration(duration) {

        this.duration = duration;

        this.update();

    },

    update() {

        const label = document.getElementById("zoomLabel");

        if (label) {

            label.textContent = this.zoom + "%";

        }

        this.width = Math.max(

            1000,

            this.duration * 50 * (this.zoom / 100)

        );

        this.canvas.width = this.width;

        this.render();

    },

    render() {

        const ctx = this.ctx;

        ctx.clearRect(

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );

        // Background Track

        ctx.fillStyle = "#2b2b2b";

        ctx.fillRect(

            0,

            this.trackY,

            this.canvas.width,

            this.trackHeight

        );

        if (!this.duration) return;

        // ==========================
        // Time Ruler
        // ==========================

        const px = this.canvas.width / this.duration;

        ctx.strokeStyle = "#555";

        ctx.fillStyle = "#ffffff";

        ctx.font = "11px Arial";

        for (let i = 0; i <= this.duration; i++) {

            const x = i * px;

            ctx.beginPath();

            ctx.moveTo(x, 0);

            ctx.lineTo(x, 20);

            ctx.stroke();

            ctx.fillText(

                this.format(i),

                x + 2,

                15

            );

        }

        // ==========================
        // Render Clips
        // ==========================

        Clips.items.forEach((clip, index) => {

            const x =

                (clip.start / this.duration)

                * this.canvas.width;

            const width =

                ((clip.end - clip.start)

                / this.duration)

                * this.canvas.width;

            if (clip.id === Clips.selected) {

                ctx.fillStyle = "#ff9800";

            } else {

                ctx.fillStyle =

                    index % 2

                    ? "#4CAF50"

                    : "#2196F3";

            }

            ctx.fillRect(

                x,

                this.trackY,

                width,

                this.trackHeight

            );

            ctx.strokeStyle = "#111";

            ctx.strokeRect(

                x,

                this.trackY,

                width,

                this.trackHeight

            );

            ctx.fillStyle = "#ffffff";

            ctx.font = "12px Arial";

            ctx.fillText(

                "Clip " + (index + 1),

                x + 8,

                this.trackY + 19

            );

        });

    },

    format(sec) {

        sec = Math.floor(sec);

        const m = Math.floor(sec / 60);

        const s = sec % 60;

        return (

            String(m).padStart(2, "0") +

            ":" +

            String(s).padStart(2, "0")

        );

    }

};

export default Timeline;
