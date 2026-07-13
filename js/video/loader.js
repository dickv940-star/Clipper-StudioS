/*
=========================================
ClipperStudio
Video Loader
Version : 1.0
=========================================
*/

const VideoLoader = {

    async load(file) {

        return new Promise((resolve, reject) => {

            if (!file) {

                reject("File tidak ditemukan.");

                return;

            }

            if (!file.type.startsWith("video/")) {

                reject("File bukan video.");

                return;

            }

            const url = URL.createObjectURL(file);

            const video = document.createElement("video");

            video.preload = "metadata";
            video.src = url;
            video.muted = true;
            video.playsInline = true;

            video.onloadedmetadata = () => {

                const metadata = {

                    file: file,

                    name: file.name,

                    size: file.size,

                    type: file.type,

                    lastModified: file.lastModified,

                    url: url,

                    duration: video.duration,

                    width: video.videoWidth,

                    height: video.videoHeight,

                    aspectRatio:
                        video.videoWidth + ":" + video.videoHeight,

                    resolution:
                        video.videoWidth +
                        " x " +
                        video.videoHeight

                };

                resolve(metadata);

            };

            video.onerror = () => {

                URL.revokeObjectURL(url);

                reject("Gagal membaca video.");

            };

        });

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

    }

};

window.VideoLoader = VideoLoader;
