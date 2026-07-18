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

            alert("Export sedang berjalan.");

            return;

        }

        this.exporting = true;

        console.log("================================");
        console.log("EXPORT ENGINE");
        console.log("================================");

        try {

            /*
            ========================================
            LOAD FFMPEG
            ========================================
            */

            await FFmpegEngine.init();

            /*
            ========================================
            INIT RENDERER
            ========================================
            */

            Renderer.init(

                video,

                canvas

            );

            Renderer.onProgress = (progress) => {

                console.log(

                    "Render :",

                    progress.percent + "%",

                    "(" +

                    progress.frame +

                    "/" +

                    progress.total +

                    ")"

                );

                const fill = document.getElementById("progressFill");

                const text = document.getElementById("progressText");

                if (fill) {

                    fill.style.width = progress.percent + "%";

                }

                if (text) {

                    text.innerHTML =

                        "Rendering " +

                        progress.percent +

                        "%";

                }

            };

            /*
            ========================================
            START RENDER
            ========================================
            */

            await Renderer.render();

            console.log("Render Finished");

            /*
            ========================================
            RENDER COMPLETE
            ========================================
            */

            alert(

                "Render selesai.\n\nTahap berikutnya adalah Encode MP4."

            );

        }

        catch (error) {

            console.error(error);

            alert(

                "Export gagal.\n\n" +

                error.message

            );

        }

        finally {

            this.exporting = false;

        }

    }

};

window.ExportEngine = ExportEngine;

console.log("Export Engine Loaded");
