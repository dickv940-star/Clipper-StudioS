/*
=========================================
ClipperStudio
LUT Engine
Version : 1.0

Professional Color LUT Preset System

=========================================
*/


const LUTEngine = {


    active:null,


    presets:{},


    intensity:1,


    callbacks:{},





    init(){



        this.createPresets();



        console.log(

            "LUT Engine Ready"

        );


    },









    createPresets(){



        this.presets={





            hollywood:{


                name:
                "Hollywood Film",



                contrast:
                1.35,



                saturation:
                1.1,



                temperature:
                -8,



                shadows:
                -15,



                highlights:
                10,



                grain:
                0.2



            },









            tealOrange:{


                name:
                "Teal Orange",



                contrast:
                1.3,



                saturation:
                1.25,



                temperature:
                5,



                teal:
                true



            },









            moody:{


                name:
                "Moody Dark",



                contrast:
                1.5,



                brightness:
                -0.2,



                saturation:
                0.85,



                shadows:
                -25



            },









            vintage:{


                name:
                "Vintage Film",



                contrast:
                1.1,



                saturation:
                0.8,



                temperature:
                15,



                grain:
                0.35,



                fade:
                0.2



            },









            wedding:{


                name:
                "Wedding Soft",



                brightness:
                0.15,



                contrast:
                1.05,



                saturation:
                1.1,



                temperature:
                20,



                soft:
                true



            },









            sportsHDR:{


                name:
                "Sports HDR",



                contrast:
                1.45,



                saturation:
                1.45,



                sharpness:
                1.4,



                hdr:
                true



            },









            documentary:{


                name:
                "Documentary Natural",



                contrast:
                1.15,



                saturation:
                0.95,



                temperature:
                0



            }





        };



    },









    apply(
        name,
        intensity=1
    ){



        if(
            !this.presets[name]
        ){



            console.warn(

                "LUT tidak ditemukan:",

                name

            );


            return null;


        }






        this.active =

        this.presets[name];



        this.intensity =
            intensity;






        this.emit(

            "apply",

            this.active

        );





        return this.active;



    },









    setIntensity(
        value
    ){



        this.intensity =

        Math.max(

            0,

            Math.min(

                1,

                value

            )

        );



    },









    get(){



        return {


            lut:this.active,


            intensity:this.intensity


        };



    },









    createFilter(){



        if(
            !this.active
        )
            return "";





        const lut =
            this.active;




        let filters=[];






        if(
            lut.contrast
        ){


            filters.push(

            `contrast(${lut.contrast})`

            );


        }







        if(
            lut.saturation
        ){


            filters.push(

            `saturate(${lut.saturation})`

            );


        }







        if(
            lut.brightness
        ){


            filters.push(

            `brightness(${1+lut.brightness})`

            );


        }






        return filters.join(" ");



    },









    applyCanvas(
        ctx
    ){



        if(
            !this.active
        )
            return;




        ctx.filter =

        this.createFilter();



    },









    combineWithColorEngine(){



        if(
            !window.ColorEngine
        )
            return;





        if(
            this.active
        ){



            ColorEngine.custom(

                this.active

            );


        }



    },









    list(){



        return Object.keys(

            this.presets

        );



    },









    reset(){



        this.active=null;


        this.intensity=1;



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



window.LUTEngine =
    LUTEngine;
