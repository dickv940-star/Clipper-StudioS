/*
=========================================
ClipperStudio
Export Engine
Version : 1.0

Video Export Controller

=========================================
*/


const ExportEngine = {


    project:null,


    settings:{},


    status:"idle",


    callbacks:{},





    init(){


        this.project=null;


        this.settings={


            format:
            "mp4",



            ratio:
            "16:9",



            width:
            1920,



            height:
            1080,



            fps:
            30,



            quality:
            "high"



        };



        this.status="idle";



        console.log(
            "Export Engine Ready"
        );


    },







    setProject(
        project
    ){



        this.project =
            project;



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







    setPlatform(
        platform
    ){



        const presets={



            youtube:{


                ratio:
                "16:9",


                width:
                1920,


                height:
                1080



            },



            tiktok:{


                ratio:
                "9:16",


                width:
                1080,


                height:
                1920



            },



            shorts:{


                ratio:
                "9:16",


                width:
                1080,


                height:
                1920



            },



            reels:{


                ratio:
                "9:16",


                width:
                1080,


                height:
                1920



            },



            square:{


                ratio:
                "1:1",


                width:
                1080,


                height:
                1080



            }



        };





        if(
            presets[platform]
        ){


            this.configure(

                presets[platform]

            );


        }



    },







    collectData(){



        return {


            project:
            this.project,



            settings:
            this.settings,



            timeline:

            window.Timeline

            ?

            Timeline.export()

            :

            null,



            subtitles:

            window.SubtitleManager

            ?

            SubtitleManager.export()

            :

            [],



            audio:


            {

                music:

                window.MusicManager

                ?

                MusicManager.getTimelineData()

                :

                [],



                voice:

                window.VoiceOver

                ?

                VoiceOver.tracks

                :

                [],



                effects:

                window.SoundEffect

                ?

                SoundEffect.getTimelineData()

                :

                []

            }



        };


    },







    async start(){



        this.status =
            "processing";



        const data =
            this.collectData();



        this.emit(

            "start",

            data

        );





        /*
        Renderer belum aktif.
        Nantinya masuk:
        FFmpeg WASM
        */


        console.log(

            "Export Data",

            data

        );



        return data;


    },







    cancel(){



        this.status =
            "cancelled";



        this.emit(
            "cancel"
        );


    },







    reset(){



        this.status =
            "idle";


    },







    getStatus(){


        return this.status;


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



window.ExportEngine =
    ExportEngine;
