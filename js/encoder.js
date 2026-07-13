/*
=========================================
ClipperStudio
Encoder Engine
Version : 1.0

Video Encoding Controller

=========================================
*/


const Encoder = {


    settings:{},


    status:"idle",


    progress:0,


    callbacks:{},





    init(){


        this.settings={


            videoCodec:
            "libx264",



            audioCodec:
            "aac",



            preset:
            "medium",



            quality:
            23,



            bitrate:
            "4000k",



            fps:
            30



        };



        this.status =
            "idle";



        console.log(
            "Encoder Ready"
        );


    },







    configure(
        options={}
    ){



        Object.assign(

            this.settings,

            options

        );



        this.emit(

            "config",

            this.settings

        );



    },







    async encode(
        input,
        output="final.mp4"
    ){



        if(
            !window.FFmpegEngine
        ){


            throw new Error(
                "FFmpeg Engine belum aktif"
            );


        }





        this.status =
            "encoding";



        this.progress =
            0;



        this.emit(
            "start"
        );





        try{





            await FFmpegEngine.ffmpeg.exec([



                "-i",

                input,



                "-c:v",

                this.settings.videoCodec,



                "-preset",

                this.settings.preset,



                "-crf",

                String(
                    this.settings.quality
                ),



                "-r",

                String(
                    this.settings.fps
                ),



                "-b:v",

                this.settings.bitrate,



                "-c:a",

                this.settings.audioCodec,



                output



            ]);





            this.status =
                "complete";



            this.progress =
                100;



            this.emit(

                "complete",

                output

            );





            return output;



        }


        catch(error){



            this.status =
                "error";



            this.emit(
                "error",
                error
            );



            throw error;



        }



    },







    setQuality(
        value
    ){



        this.settings.quality =
            value;



    },







    setCodec(
        video,
        audio
    ){



        this.settings.videoCodec =
            video;



        this.settings.audioCodec =
            audio;



    },







    getSettings(){


        return this.settings;


    },







    getStatus(){



        return {


            status:
            this.status,


            progress:
            this.progress



        };


    },







    reset(){



        this.progress=0;


        this.status="idle";


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



window.Encoder =
    Encoder;
