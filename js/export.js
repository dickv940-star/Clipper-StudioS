/*
=========================================================
Auto Frame Studio
Export Engine
Version 2.0
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

        console.log("================================");
        console.log("EXPORT ENGINE");
        console.log("================================");

        try {

            /*
            ================================
            LOAD FFMPEG
            ================================
            */

            await FFmpegEngine.load();

            /*
            ================================
            INIT RENDERER
            ================================
            */

            Renderer.init(

                video,

                canvas

            );

            Renderer.onProgress = (progress)=>{

                console.log(

                    progress.percent + "%",

                    progress.frame,

                    "/",

                    progress.total

                );

            };

            /*
            ================================
            START RENDER
            ================================
            */

            await Renderer.render();

            console.log("Render Finished");

            /*
            ================================
            NEXT
            ================================
            */

            alert(

                "Render selesai.\n\nBagian berikutnya akan membuat MP4."

            );

        }

        catch(error){

            console.error(error);

        }

        this.exporting = false;

    }

};

window.ExportEngine = ExportEngine;

console.log("Export Engine Loaded");
