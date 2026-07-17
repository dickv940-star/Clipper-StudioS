"use strict";

const FFmpegEngine = {

    ffmpeg: null,
    loaded: false,

    async init() {

        if (this.loaded) {
            return;
        }

        const { FFmpeg } = window;

        this.ffmpeg = new FFmpeg();

        await this.ffmpeg.load({

            coreURL:
                "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js",

            wasmURL:
                "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm"

        });

        this.loaded = true;

        console.log("FFmpeg Loaded");

    }

};

window.FFmpegEngine = FFmpegEngine;
