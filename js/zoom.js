/*
=========================================
ClipperStudio
Zoom Engine
Version : 1.0

Timeline Zoom Controller

=========================================
*/


const Zoom = {


    level:1,


    min:0.5,


    max:10,


    step:0.5,


    callbacks:{},





    init(){


        this.level=1;


        console.log(
            "Zoom Engine Ready"
        );


    },







    set(
        value
    ){



        this.level =

            Math.max(

                this.min,

                Math.min(

                    this.max,

                    value

                )

            );



        this.emit(
            "change",
            this.level
        );



        return this.level;


    },







    in(){



        return this.set(

            this.level +

            this.step

        );


    },







    out(){



        return this.set(

            this.level -

            this.step

        );


    },







    reset(){



        this.set(1);


    },







    get(){



        return this.level;


    },







    applyTimeline(
        element
    ){



        if(!element)
            return;



        element.style.transform =

            "scaleX(" +

            this.level +

            ")";



        element.style.transformOrigin =
            "left center";



    },







    applyPreview(
        video
    ){



        if(!video)
            return;



        video.style.transform =

            "scale(" +

            this.level +

            ")";



        video.style.transition =
            "transform 0.3s";



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



window.Zoom =
    Zoom;
