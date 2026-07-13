/*
=========================================
ClipperStudio
Transition Renderer
Version : 1.0

Clip Transition Engine

=========================================
*/


const TransitionRenderer = {


    canvas:null,


    ctx:null,


    active:null,


    duration:1,


    progress:0,


    callbacks:{},





    init(
        canvas="previewCanvas"
    ){



        if(
            typeof canvas === "string"
        ){


            this.canvas =

            document.getElementById(
                canvas
            );


        }
        else{


            this.canvas =
            canvas;


        }




        if(this.canvas){



            this.ctx =

            this.canvas.getContext(
                "2d"
            );


        }



        console.log(

            "Transition Renderer Ready"

        );



    },









    setTransition(
        type,
        duration=1
    ){



        this.active={


            type,


            duration



        };



        this.duration =
            duration;



    },









    render(
        clipA,
        clipB,
        progress
    ){



        if(
            !this.ctx
        )
            return;




        this.progress =
            progress;



        switch(

            this.active?.type

        ){



            case "fade":


                this.fade(

                    clipA,

                    clipB,

                    progress

                );


                break;





            case "dissolve":


                this.dissolve(

                    clipA,

                    clipB,

                    progress

                );


                break;





            case "zoom":


                this.zoom(

                    clipA,

                    clipB,

                    progress

                );


                break;





            case "slide":


                this.slide(

                    clipA,

                    clipB,

                    progress

                );


                break;





            case "blur":


                this.blur(

                    clipA,

                    clipB,

                    progress

                );


                break;




            default:


                this.draw(

                    clipA

                );



        }




    },









    draw(
        frame
    ){



        this.ctx.drawImage(

            frame,

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );


    },









    fade(
        a,
        b,
        p
    ){



        this.ctx.globalAlpha=1;



        this.draw(a);





        this.ctx.globalAlpha=p;



        this.draw(b);





        this.ctx.globalAlpha=1;



    },









    dissolve(
        a,
        b,
        p
    ){



        this.ctx.globalAlpha=

        1-p;



        this.draw(a);




        this.ctx.globalAlpha=

        p;



        this.draw(b);




        this.ctx.globalAlpha=1;



    },









    zoom(
        a,
        b,
        p
    ){



        this.draw(a);





        const scale=

        1+p*0.2;





        this.ctx.save();




        this.ctx.translate(

            this.canvas.width/2,

            this.canvas.height/2

        );




        this.ctx.scale(

            scale,

            scale

        );




        this.ctx.translate(

            -this.canvas.width/2,

            -this.canvas.height/2

        );





        this.draw(b);





        this.ctx.restore();



    },









    slide(
        a,
        b,
        p
    ){



        const width =
            this.canvas.width;




        this.ctx.drawImage(

            a,

            -width*p,

            0,

            width,

            this.canvas.height

        );





        this.ctx.drawImage(

            b,

            width*(1-p),

            0,

            width,

            this.canvas.height

        );



    },









    blur(
        a,
        b,
        p
    ){



        this.ctx.filter=

        `blur(${10*(1-p)}px)`;




        this.draw(a);



        this.ctx.filter=

        `blur(${10*p}px)`;




        this.draw(b);




        this.ctx.filter="none";



    },









    list(){



        return [


            "fade",


            "dissolve",


            "zoom",


            "slide",


            "blur"


        ];


    },









    reset(){



        this.active=null;


        this.progress=0;



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



window.TransitionRenderer =
    TransitionRenderer;
