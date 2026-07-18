/*
=========================================================
Auto Frame Studio
Renderer Engine
Version 2.0
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

    recorder: null,

    stream: null,

    chunks: [],

    recording: false,

    webmBlob: null,

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

        this.webmBlob = null;

    },

    /*
    =========================================
    START RECORDING
    =========================================
    */

    startRecording() {

        this.chunks = [];

        this.stream = this.canvas.captureStream(this.fps);

        this.recorder = new MediaRecorder(

            this.stream,

            {

                mimeType: "video/webm"

            }

        );

        this.recorder.ondataavailable = (event) => {

            if (event.data.size > 0) {

                this.chunks.push(event.data);

            }

        };

        this.recorder.start();

        this.recording = true;

        console.log("Recording Started");

    },

    /*
    =========================================
    STOP RECORDING
    =========================================
    */

    async stopRecording() {

        if (!this.recording) {

            return null;

        }

        return new Promise(resolve => {

            this.recorder.onstop = () => {

                this.webmBlob = new Blob(

                    this.chunks,

                    {

                        type: "video/webm"

                    }

                );

                resolve(this.webmBlob);

            };

            this.recorder.stop();

            this.recording = false;

        });

    },

    /*
    =========================================
    START RENDER
    =========================================
    */

    async render() {

        if (!this.video) {

            throw new Error(

                "Video belum dimuat."

            );

        }

        this.rendering = true;

        this.video.pause();

        this.startRecording();

        while (

            this.currentFrame < this.totalFrames &&

            this.rendering

        ) {

            await this.renderFrame();

        }

        this.rendering = false;

        await this.stopRecording();

        if (this.onFinish) {

            this.onFinish(

                this.webmBlob

            );

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

                if (

                    window.AutoFrame &&

                    AutoFrame.draw

                ) {

                    AutoFrame.draw();

                }

                this.currentFrame++;

                if (this.onProgress) {

                    this.onProgress({

                        frame:

                            this.currentFrame,

                        total:

                            this.totalFrames,

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
