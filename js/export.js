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

            console.warn("Export sedang berjalan.");

            return;

        }

        this.exporting = true;

        console.log("================================");
        console.log("EXPORT ENGINE");
        console.log("================================");

        try {

            if (!video) {

                throw new Error("Video belum dipilih.");

            }

            if (!canvas) {

                throw new Error("Canvas tidak ditemukan.");

            }

            if (typeof Renderer === "undefined") {

                throw new Error("Renderer belum dimuat.");

            }

            if (typeof FFmpegEngine === "undefined") {

                throw new Error("FFmpeg Engine belum dimuat.");

            }

            console.log("Loading FFmpeg...");

            await FFmpegEngine.init();

            console.log("FFmpeg Ready");

            Renderer.init(

                video,

                canvas

            );

            Renderer.onProgress = (progress)=>{

                console.log(

                    "Render",

                    progress.percent + "%",

                    "(" +

                    progress.frame +

                    "/" +

                    progress.total +

                    ")"

                );

            };

            console.log("Start Rendering...");

            await Renderer.render();

            console.log("Render Finished");

            /*
            ========================================
            NEXT STEP
            ========================================

            Frame PNG

                    ↓

            FFmpeg Encode

                    ↓

            MP4 Download

            ========================================
            */

            alert(

                "Rendering selesai.\n\nTahap berikutnya adalah Encoding MP4."

            );

        }

        catch(error){

            console.error("Export Error");

            console.error(error);

            alert(error.message);

        }

        finally{

            this.exporting = false;

        }

    }

};

window.ExportEngine = ExportEngine;

console.log("Export Engine Loaded");
