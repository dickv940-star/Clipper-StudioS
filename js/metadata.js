/*
=========================================
ClipperStudio
Metadata Engine
Version : 1.0
=========================================
*/

const Metadata = {

    async read(videoData) {

        return new Promise((resolve, reject) => {

            if (!videoData) {

                reject("Video tidak tersedia.");

                return;

            }

            const video = document.createElement("video");

            video.preload = "metadata";

            video.src = videoData.url;

            video.onloadedmetadata = () => {

                const width = video.videoWidth;

                const height = video.videoHeight;

                const duration = video.duration;

                const fps = this.detectFPS(duration);

                resolve({

                    name: videoData.name,

                    size: videoData.size,

                    sizeText: this.formatSize(videoData.size),

                    type: videoData.type,

                    duration: duration,

                    durationText: this.formatDuration(duration),

                    width: width,

                    height: height,

                    resolution: width + " × " + height,

                    aspectRatio: this.aspectRatio(width, height),

                    orientation: width >= height
                        ? "landscape"
                        : "portrait",

                    fps: fps,

                    bitrate: this.calculateBitrate(
                        videoData.size,
                        duration
                    )

                });

            };

            video.onerror = () => {

                reject("Metadata gagal dibaca.");

            };

        });

    },

    aspectRatio(width, height) {

        const gcd = (a, b) => {

            return b === 0
                ? a
                : gcd(b, a % b);

        };

        const d = gcd(width, height);

        return (width / d) + ":" + (height / d);

    },

    calculateBitrate(size, duration) {

        if (!duration) return 0;

        const bits = size * 8;

        return Math.round(bits / duration);

    },

    detectFPS(duration) {

        /*
        Browser tidak memberikan FPS asli.

        Untuk sementara menggunakan default.
        */

        return 30;

    },

    formatDuration(seconds) {

        seconds = Math.floor(seconds);

        const h = Math.floor(seconds / 3600);

        const m = Math.floor((seconds % 3600) / 60);

        const s = seconds % 60;

        if (h > 0) {

            return (

                String(h).padStart(2, "0") +

                ":" +

                String(m).padStart(2, "0") +

                ":" +

                String(s).padStart(2, "0")

            );

        }

        return (

            String(m).padStart(2, "0") +

            ":" +

            String(s).padStart(2, "0")

        );

    },

    formatSize(bytes) {

        if (bytes < 1024) {

            return bytes + " B";

        }

        if (bytes < 1024 * 1024) {

            return (bytes / 1024).toFixed(2) + " KB";

        }

        if (bytes < 1024 * 1024 * 1024) {

            return (bytes / 1024 / 1024).toFixed(2) + " MB";

        }

        return (bytes / 1024 / 1024 / 1024).toFixed(2) + " GB";

    }

};

window.Metadata = Metadata;
