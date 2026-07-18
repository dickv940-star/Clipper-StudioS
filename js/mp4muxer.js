/*
=========================================================
Auto Frame Studio
MP4 Muxer
Version 1.0
=========================================================
*/

"use strict";

const MP4Muxer = {

    muxer: null,

    target: null,

    ready: false,

    async init(width,height){

        if(typeof Mp4Muxer==="undefined"){

            throw new Error(
                "Mp4Muxer Library belum dimuat."
            );

        }

        this.target = new Mp4Muxer.ArrayBufferTarget();

        this.muxer = new Mp4Muxer.Muxer({

            target: this.target,

            video:{

                codec:"avc",

                width:width,

                height:height

            },

            fastStart:"in-memory"

        });

        this.ready=true;

        console.log("MP4 Muxer Ready");

    },

    addChunk(chunk,meta){

        if(!this.ready){

            return;

        }

        this.muxer.addVideoChunk(

            chunk,

            meta

        );

    },

    finish(){

        this.muxer.finalize();

        return new Blob(

            [

                this.target.buffer

            ],

            {

                type:"video/mp4"

            }

        );

    }

};

window.MP4Muxer = MP4Muxer;

console.log("MP4 Muxer Loaded");
