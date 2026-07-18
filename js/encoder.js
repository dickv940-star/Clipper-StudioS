/*
====================================================
Auto Frame Studio
WebCodecs Encoder
Version 3.0
====================================================
*/

"use strict";

const Encoder = {

    encoder: null,

    chunks: [],

    width: 1080,

    height: 1920,

    fps: 30,

    bitrate: 12000000,

    ready: false,

    async init() {

        if (!("VideoEncoder" in window)) {

            alert("Browser tidak mendukung WebCodecs.");

            return false;

        }

        this.chunks = [];

        this.encoder = new VideoEncoder({

            output: (chunk) => {

                this.chunks.push(chunk);

            },

            error: (e) => {

                console.error(e);

            }

        });

        this.encoder.configure({

            codec: "avc1.42001E",

            width: this.width,

            height: this.height,

            bitrate: this.bitrate,

            framerate: this.fps

        });

        this.ready = true;

        console.log("WebCodecs Ready");

        return true;

    }

};

window.Encoder = Encoder;
