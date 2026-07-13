/*
=========================================
ClipperStudio
FFmpeg Engine
Version : 1.0

FFmpeg WASM Controller

=========================================
*/


const FFmpegEngine = {


    ffmpeg:null,


    loaded:false,


    progress:0,


    callbacks:{},





    async init(){


        try{


            if(
                !window.FFmpegWASM
            ){


                console.warn(
                    "FFmpeg library belum dimuat"
                );


                return false;


            }



            this.ffmpeg =
                new FFmpegWASM();



            await this.ffmpeg.load();



            this.loaded=true;



            console.log(
                "FFmpeg Ready"
            );



            this.emit(
                "ready"
            );



            return true;



        }

        catch(error){


            console.error(

                "FFmpeg gagal load",

                error

            );


            return false;


        }


    },







    async loadVideo(
        file
    ){



        if(
            !this.loaded
        )
            await this.init();




        const buffer =

            await file.arrayBuffer();





        await this.ffmpeg.writeFile(

            "input.mp4",

            new Uint8Array(
                buffer
            )

        );



        console.log(
            "Video masuk FFmpeg"
        );


    },







    async trim(
        start,
        end
    ){



        await this.ffmpeg.exec([


            "-i",

            "input.mp4",



            "-ss",

            String(start),



            "-to",

            String(end),



            "-c",

            "copy",



            "clip.mp4"



        ]);



        return "clip.mp4";


    },







    async resize(
        width,
        height
    ){



        await this.ffmpeg.exec([


            "-i",

            "input.mp4",



            "-vf",

            `scale=${width}:${height}`,



            "resize.mp4"



        ]);



        return "resize.mp4";


    },







    async convert(
        format="mp4"
    ){



        await this.ffmpeg.exec([


            "-i",

            "input.mp4",



            `output.${format}`



        ]);



        return (

            `output.${format}`

        );


    },







    async export(){

        

        const data =

            await this.ffmpeg.readFile(

                "clip.mp4"

            );





        const blob =

            new Blob(

                [

                    data.buffer

                ],

                {

                    type:
                    "video/mp4"

                }

            );



        return URL.createObjectURL(
            blob
        );


    },







    on(
        event,
        callback
    ){



        this.callbacks[event]=
            callback;



    },







    emit(
        event,
        data
    ){



        if(
            this.callbacks[event]
        ){


            this.callbacks[event](
                data
            );


        }


    }





};



window.FFmpegEngine =
    FFmpegEngine;
