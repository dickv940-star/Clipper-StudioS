/*
=========================================
ClipperStudio
Subtitle Style Engine
Version : 1.0

Subtitle Appearance Controller

=========================================
*/


const SubtitleStyle = {


    current:null,


    presets:{},


    callbacks:{},





    init(){


        this.createPresets();


        this.current =
            this.presets.default;



        console.log(
            "Subtitle Style Ready"
        );


    },







    createPresets(){



        this.presets = {



            default:{


                name:
                "Default",



                font:
                "Arial",



                size:
                32,



                color:
                "#FFFFFF",



                background:
                "rgba(0,0,0,0.5)",



                outline:
                "2px #000000",



                shadow:
                true,



                position:
                "bottom"



            },







            tiktok:{


                name:
                "TikTok Style",



                font:
                "Arial Black",



                size:
                42,



                color:
                "#FFFFFF",



                background:
                "transparent",



                outline:
                "3px #000000",



                shadow:
                true,



                position:
                "center"



            },







            youtube:{


                name:
                "YouTube Style",



                font:
                "Roboto",



                size:
                36,



                color:
                "#FFFFFF",



                background:
                "rgba(0,0,0,0.6)",



                outline:
                "2px #000000",



                shadow:
                true,



                position:
                "bottom"



            },







            cinematic:{


                name:
                "Cinematic",



                font:
                "Georgia",



                size:
                34,



                color:
                "#FFFFFF",



                background:
                "transparent",



                outline:
                "1px #000000",



                shadow:
                true,



                position:
                "bottom"



            }



        };


    },







    apply(
        name
    ){



        if(
            !this.presets[name]
        ){


            console.error(
                "Style tidak ditemukan"
            );


            return;


        }



        this.current =
            this.presets[name];



        this.emit(
            "change",
            this.current
        );



        return this.current;


    },







    set(
        property,
        value
    ){



        if(
            !this.current
        )
            return;



        this.current[property]=
            value;



        this.emit(
            "update",
            this.current
        );


    },







    get(){



        return this.current;


    },







    createCustom(
        options={}
    ){



        return {


            name:
            options.name ||
            "Custom",



            font:
            options.font ||
            "Arial",



            size:
            options.size ||
            32,



            color:
            options.color ||
            "#FFFFFF",



            background:
            options.background ||
            "transparent",



            outline:
            options.outline ||
            "2px #000000",



            shadow:
            options.shadow ??
            true,



            position:
            options.position ||
            "bottom"



        };


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



window.SubtitleStyle =
    SubtitleStyle;
