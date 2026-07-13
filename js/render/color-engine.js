/*
=========================================
ClipperStudio
Color Engine
Version : 1.0

AI Color Grading System

=========================================
*/


const ColorEngine = {


    active:null,


    presets:{},


    settings:{},


    callbacks:{},





    init(){



        this.createPresets();



        this.reset();



        console.log(

            "Color Engine Ready"

        );


    },









    createPresets(){



        this.presets={



            cinematic:{


                name:
                "Cinematic",



                brightness:
                -0.05,



                contrast:
                1.25,



                saturation:
                1.15,



                temperature:
                -5,



                vignette:
                0.25



            },









            dramatic:{


                name:
                "Dramatic",



                brightness:
                -0.15,



                contrast:
                1.45,



                saturation:
                0.8,



                temperature:
                -10



            },









            vlog:{


                name:
                "Vlog",



                brightness:
                0.08,



                contrast:
                1.05,



                saturation:
                1.25,



                temperature:
                10



            },









            documentary:{


                name:
                "Documentary",



                brightness:
                0,



                contrast:
                1.15,



                saturation:
                0.95,



                temperature:
                0



            },









            gaming:{


                name:
                "Gaming",



                brightness:
                0.05,



                contrast:
                1.4,



                saturation:
                1.5,



                temperature:
                5



            },









            sport:{


                name:
                "Sport Highlight",



                brightness:
                0.05,



                contrast:
                1.35,



                saturation:
                1.3,



                sharpness:
                1.2



            },









            boost:{


                name:
                "Color Boost",



                brightness:
                0.1,



                contrast:
                1.15,



                saturation:
                1.6



            }



        };


    },









    apply(
        preset
    ){



        if(

            this.presets[preset]

        ){



            this.active =

            this.presets[preset];



        }




        this.emit(

            "change",

            this.active

        );





        return this.active;



    },









    custom(
        settings={}
    ){



        this.active =

        Object.assign(

            {},

            this.active,

            settings

        );



    },









    get(){



        return this.active;



    },









    createFilter(){



        if(
            !this.active
        )
            return "";





        let s =

        this.active;



        let filters=[];





        if(
            s.brightness
        ){


            filters.push(

                `brightness(${1+s.brightness})`

            );


        }






        if(
            s.contrast
        ){


            filters.push(

                `contrast(${s.contrast})`

            );


        }






        if(
            s.saturation
        ){


            filters.push(

                `saturate(${s.saturation})`

            );


        }






        if(
            s.vignette
        ){


            filters.push(

                `vignette(${s.vignette})`

            );


        }




        return filters.join(" ");



    },









    applyToCanvas(
        ctx
    ){



        if(
            !this.active
        )
            return;




        ctx.filter =

        this.createFilter();



    },









    reset(){



        this.active=null;



    },









    list(){



        return Object.keys(

            this.presets

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



window.ColorEngine =
    ColorEngine;
