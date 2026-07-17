"use strict";

const FFmpegEngine = {

    ffmpeg: null,
    loaded: false,

    async load() {

        if (this.loaded) {
            return;
        }

        if (typeof FFmpeg === "undefined") {
            throw new Error("FFmpeg belum dimuat.");
        }

        const { createFFmpeg } = FFmpeg;

        this.ffmpeg = createFFmpeg({

            log: true,

            corePath: "libs/ffmpeg/ffmpeg-core.js"

        });

        await this.ffmpeg.load();

        this.loaded = true;

        console.log("FFmpeg Loaded");

    }

};

window.FFmpegEngine = FFmpegEngine;
