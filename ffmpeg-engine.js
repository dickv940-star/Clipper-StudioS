/*
=========================================================
Auto Frame Studio
FFmpeg Engine
Version 1.0
=========================================================
*/

"use strict";

const FFmpegEngine = {

    ffmpeg: null,

    loaded: false,

    async load() {

        if (this.loaded) {

            return;

        }

        console.log("================================");
        console.log("Loading FFmpeg...");
        console.log("================================");

        const {

            FFmpeg

        } = FFmpegWASM;

        this.ffmpeg = new FFmpeg();

        await this.ffmpeg.load({

            coreURL: "libs/ffmpeg-core.js",

            wasmURL: "libs/ffmpeg-core.wasm"

        });

        this.loaded = true;

        console.log("FFmpeg Loaded");

    },

    async writeFile(name, file) {

        await this.ffmpeg.writeFile(

            name,

            file

        );

    },

    async exec(command) {

        await this.ffmpeg.exec(command);

    },

    async readFile(name) {

        return await this.ffmpeg.readFile(name);

    }

};

window.FFmpegEngine = FFmpegEngine;

console.log("FFmpeg Engine Loaded");
