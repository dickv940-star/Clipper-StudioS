/*
=========================================================
Auto Frame Studio
Export Engine
Version 3.0
=========================================================
*/

"use strict";

const ExportEngine = {

    exporting: false,

    async export(video, canvas) {

        if (this.exporting) {
            return;
        }

        this.exporting = true;

        console.clear();

        console.log("================================");
        console.log("AUTO FRAME EXPORT");
        console.log("================================");

        try {

            /*
            ==========================
            LOAD FFMPEG
            ==========================
            */

            if (!FFmpegEngine.loaded) {

                console.log("Loading FFmpeg...");

                await FFmpegEngine.init();

            }

            /*
            ==========================
            INIT RENDERER
            ==========================
            */

            Renderer.init(video, canvas);

            Renderer.onProgress = (progress) => {

                console.log(

                    "Rendering",

                    progress.percent + "%"

                );

                const fill =
                    document.getElementById("progressFill");

                const text =
                    document.getElementById("progressText");

                if (fill) {

                    fill.style.width =
                        progress.percent + "%";

                }

                if (text) {

                    text.innerHTML =
                        progress.percent + "%";

                }

            };

            /*
            ==========================
            START RENDER
            ==========================
            */

            console.log("Start Rendering...");

            await Renderer.render();

            console.log("Renderer Finished");

            /*
            ==========================
            ENCODE MP4
            ==========================
            */

            console.log("Encoding MP4...");

            const mp4Blob =
                await FFmpegEngine.encode(

                    Renderer.webmBlob

                );

            /*
            ==========================
            DOWNLOAD
            ==========================
            */

            const url =
                URL.createObjectURL(mp4Blob);

            const a =
                document.createElement("a");

            a.href = url;

            a.download = "AutoFrame.mp4";

            document.body.appendChild(a);

            a.click();

            a.remove();

            URL.revokeObjectURL(url);

            console.log("Download Finished");

            alert("Export MP4 selesai.");

        }

        catch (error) {

            console.error(error);

            alert("Export gagal.");

        }

        this.exporting = false;

    }

};

window.ExportEngine = ExportEngine;

console.log("Export Engine Loaded");
