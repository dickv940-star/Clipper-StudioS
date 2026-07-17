/*
=========================================================
Auto Frame Studio
Renderer Engine
Version 1.0
=========================================================
*/

"use strict";

const Renderer = {

    video: null,

    canvas: null,

    ctx: null,

    fps: 30,

    totalFrames: 0,

    currentFrame: 0,

    rendering: false,

    onProgress: null,

    onFinish: null,

    /*
    =========================================
    INIT
    =========================================
    */

    init(video, canvas) {

        this.video = video;

        this.canvas = canvas;

        this.ctx = canvas.getContext("2d");

        this.totalFrames = Math.floor(

            video.duration * this.fps

        );

        this.currentFrame = 0;

    },

    /*
    =========================================
    START RENDER
    =========================================
    */

    async render() {

        if (!this.video) {

            throw new Error("Video belum dimuat.");

        }

        this.rendering = true;

        this.video.pause();

        while (

            this.currentFrame < this.totalFrames &&

            this.rendering

        ) {

            await this.renderFrame();

        }

        this.rendering = false;

        if (this.onFinish) {

            this.onFinish();

        }

    },

    /*
    =========================================
    STOP
    =========================================
    */

    stop() {

        this.rendering = false;

    },

    /*
    =========================================
    RENDER FRAME
    =========================================
    */

    renderFrame() {

        return new Promise(resolve => {

            const time =

                this.currentFrame / this.fps;

            this.video.currentTime = time;

            this.video.onseeked = () => {

                /*
                Gambar hasil Auto Frame
                */

                if (

                    window.AutoFrame &&

                    AutoFrame.draw

                ) {

                    AutoFrame.draw();

                }

                /*
                Progress
                */

                this.currentFrame++;

                if (this.onProgress) {

                    this.onProgress({

                        frame: this.currentFrame,

                        total: this.totalFrames,

                        percent:

                            Math.round(

                                this.currentFrame /

                                this.totalFrames *

                                100

                            )

                    });

                }

                resolve();

            };

        });

    }

};

window.Renderer = Renderer;

console.log("Renderer Engine Loaded");
