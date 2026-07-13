/*
=========================================
ClipperStudio
Motion Engine
Version : 1.0

Dynamic Camera Movement System

=========================================
*/


const MotionEngine = {


    mode:"none",


    intensity:1,


    target:null,


    time:0,


    callbacks:{},





    init(){



        console.log(

            "Motion Engine Ready"

        );



    },









    setMode(
        mode
    ){



        this.mode =
            mode;



    },









    setIntensity(
        value
    ){



        this.intensity =
            value;



    },









    update(
        time
    ){



        this.time =
            time;




        switch(

            this.mode

        ){



            case "zoom":

                return this.zoom(
                    time
                );



            case "cinematic":

                return this.cinematic(
                    time
                );



            case "shake":

                return this.shake(
                    time
                );



            case "follow":

                return this.follow(
                    time
                );



            case "sport":

                return this.sport(
                    time
                );



            default:


                return {

                    x:0,

                    y:0,

                    scale:1,

                    rotation:0


                };


        }



    },









    zoom(
        time
    ){



        const scale =

        1 +

        (

        Math.sin(time)

        *

        0.05

        *

        this.intensity

        );





        return {


            x:0,


            y:0,


            scale,


            rotation:0



        };



    },









    cinematic(
        time
    ){



        return {



            x:

            Math.sin(time*0.5)

            *

            20

            *

            this.intensity,





            y:

            Math.cos(time*0.4)

            *

            10

            *

            this.intensity,





            scale:

            1.05 +

            (

            Math.sin(time*0.3)

            *

            0.03

            ),





            rotation:

            Math.sin(time*0.2)

            *

            1



        };



    },









    shake(
        time
    ){



        return {



            x:

            (

            Math.random()-0.5

            )

            *

            30

            *

            this.intensity,





            y:

            (

            Math.random()-0.5

            )

            *

            30

            *

            this.intensity,





            scale:1,



            rotation:0



        };



    },









    follow(
        time
    ){



        if(
            !this.target
        ){


            return {


                x:0,

                y:0,

                scale:1


            };


        }





        return {



            x:

            -this.target.x,





            y:

            -this.target.y,





            scale:

            1.15



        };



    },









    sport(
        time
    ){



        return {



            x:

            Math.sin(time*5)

            *

            5

            *

            this.intensity,





            y:

            Math.cos(time*4)

            *

            5

            *

            this.intensity,





            scale:

            1.1



        };



    },









    setTarget(
        object
    ){



        this.target =
            object;



    },









    apply(
        time
    ){



        const transform =

        this.update(
            time
        );





        if(
            window.FrameRenderer
        ){



            FrameRenderer.setTransform(

                transform

            );


        }





        if(
            window.KeyframeEngine
        ){



            KeyframeEngine.update(

                "camera",

                time

            );


        }





        this.emit(

            "move",

            transform

        );





        return transform;



    },









    auto(
        type="cinematic"
    ){



        this.setMode(
            type
        );



        this.setIntensity(
            1
        );



    },









    reset(){



        this.mode="none";


        this.target=null;



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



window.MotionEngine =
    MotionEngine;
