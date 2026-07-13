/*
=========================================
ClipperStudio
Quality Manager
Version : 1.0

Video Export Quality Presets

=========================================
*/


const QualityManager = {


    presets:{},


    active:null,


    callbacks:{},





    init(){


        this.createPresets();



        console.log(

            "Quality Manager Ready"

        );


    },









    createPresets(){



        this.presets={



            low:{


                name:
                "Low Size",


                width:720,


                height:1280,


                fps:30,


                bitrate:2500000,


                codec:"h264"



            },









            medium:{


                name:
                "Medium",


                width:1080,


                height:1920,


                fps:30,


                bitrate:5000000,


                codec:"h264"



            },









            high:{


                name:
                "High Quality",


                width:1080,


                height:1920,


                fps:60,


                bitrate:8000000,


                codec:"h264"



            },









            ultra:{


                name:
                "Ultra 4K",


                width:2160,


                height:3840,


                fps:60,


                bitrate:20000000,


                codec:"h265"



            },









            tiktok:{


                name:
                "TikTok Optimized",


                width:1080,


                height:1920,


                fps:30,


                bitrate:6000000,


                codec:"h264",


                format:"mp4"



            },









            youtube:{


                name:
                "YouTube Full HD",


                width:1920,


                height:1080,


                fps:60,


                bitrate:12000000,


                codec:"h264"



            },









            youtube4k:{


                name:
                "YouTube 4K",


                width:3840,


                height:2160,


                fps:60,


                bitrate:35000000,


                codec:"h265"



            },









            mobile:{


                name:
                "Mobile Friendly",


                width:720,


                height:1280,


                fps:30,


                bitrate:3000000,


                codec:"h264"



            }



        };



    },









    apply(
        name
    ){



        if(
            !this.presets[name]
        ){


            console.warn(

                "Quality preset tidak ada"

            );


            return null;


        }






        this.active =

        this.presets[name];





        this.emit(

            "change",

            this.active

        );





        return this.active;



    },









    get(){



        return this.active;



    },









    list(){



        return Object.keys(

            this.presets

        );



    },









    auto(
        duration,
        device="desktop"
    ){



        let preset =
            "medium";





        if(
            duration > 600
        ){


            preset =
            "mobile";


        }





        if(
            device==="youtube"
        ){


            preset =
            "youtube";


        }






        this.apply(

            preset

        );





        return this.active;



    },









    estimateSize(
        duration
    ){



        if(
            !this.active
        )
            return 0;





        const bytes =

        (

        duration *

        this.active.bitrate

        )

        /

        8;





        return {


            bytes,


            mb:

            (

            bytes /

            1024 /

            1024

            )

            .toFixed(2)

        };



    },









    reset(){



        this.active=null;



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



window.QualityManager =
    QualityManager;
