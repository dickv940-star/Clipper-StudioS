/*
=========================================
ClipperStudio
Effect Engine
Version : 1.0

Video Visual Effect Controller

=========================================
*/


const EffectEngine = {


    active:[],


    presets:{},


    callbacks:{},





    init(){


        this.createPresets();



        console.log(

            "Effect Engine Ready"

        );


    },









    createPresets(){



        this.presets={



            cinematic:{


                name:
                "Cinematic",


                color:{

                    contrast:1.25,

                    saturation:1.15,

                    brightness:0.95

                },


                style:{


                    film:true,


                    grain:0.15,


                    vignette:0.25


                }


            },







            dramatic:{


                name:
                "Dramatic",



                color:{


                    contrast:1.5,


                    saturation:0.8,


                    brightness:0.85


                },


                style:{


                    shadow:true,


                    darkTone:true


                }


            },







            vlog:{


                name:
                "Vlog",



                color:{


                    contrast:1.05,


                    saturation:1.2,


                    brightness:1.05


                },


                style:{


                    smooth:true,


                    warm:true


                }


            },







            documentary:{


                name:
                "Documentary",



                color:{


                    contrast:1.2,


                    saturation:0.9


                },


                style:{


                    natural:true,


                    realistic:true


                }


            },







            gaming:{


                name:
                "Gaming",



                color:{


                    contrast:1.4,


                    saturation:1.5


                },


                style:{


                    sharp:true,


                    neon:true


                }


            },







            sport:{


                name:
                "Sport Highlight",



                color:{


                    contrast:1.35,


                    saturation:1.25


                },


                style:{


                    slowMotion:true,


                    motionBlur:true,


                    sharp:true


                }


            },







            color:{


                name:
                "Color Boost",



                color:{


                    contrast:1.1,


                    saturation:1.6,


                    brightness:1.1


                },


                style:{


                    vibrant:true


                }


            }



        };


    },









    apply(
        effects=[]
    ){



        this.active=[];




        effects.forEach(

            effect=>{


                if(
                    this.presets[effect]
                ){


                    this.active.push(

                        this.presets[effect]

                    );


                }


            }

        );





        this.emit(

            "change",

            this.active

        );



        return this.active;



    },









    getActive(){



        return this.active;


    },









    getFFmpegFilter(){



        let filters=[];



        this.active.forEach(

            effect=>{



                const color =
                effect.color;



                if(color){



                    if(
                        color.contrast
                    ){


                        filters.push(

                            `eq=contrast=${color.contrast}`

                        );


                    }




                    if(
                        color.saturation
                    ){


                        filters.push(

                            `eq=saturation=${color.saturation}`

                        );


                    }


                }



            }

        );



        return filters.join(",");


    },









    applyToClip(
        clip
    ){



        clip.effects =
            this.active;



        return clip;


    },









    list(){


        return Object.keys(
            this.presets
        );


    },









    reset(){


        this.active=[];


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



window.EffectEngine =
    EffectEngine;
