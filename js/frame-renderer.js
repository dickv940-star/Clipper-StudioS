/*
=========================================
ClipperStudio
Frame Renderer
Version : 1.0

Single Frame Rendering Engine

=========================================
*/


const FrameRenderer = {


    ctx:null,


    canvas:null,


    frameData:null,


    transform:{},


    keyframes:[],


    effects:[],


    time:0,


    callbacks:{},





    init(
        canvas
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




        this.reset();



        console.log(

            "Frame Renderer Ready"

        );



    },









    reset(){



        this.transform={


            x:0,


            y:0,


            scale:1,


            rotation:0,


            opacity:1



        };



        this.keyframes=[];


        this.effects=[];


        this.time=0;



    },









    setFrame(
        frame
    ){



        this.frameData =
            frame;



    },









    render(
        video,
        time=0
    ){



        if(
            !this.ctx ||
            !video
        )
            return;




        this.time =
            time;




        this.updateKeyframe(
            time
        );




        const ctx =
            this.ctx;



        const canvas =
            this.canvas;




        ctx.save();





        ctx.clearRect(

            0,

            0,

            canvas.width,

            canvas.height

        );






        /*
        =========================
        TRANSFORM
        =========================
        */



        ctx.globalAlpha =

        this.transform.opacity;



        ctx.translate(

            canvas.width/2 +
            this.transform.x,


            canvas.height/2 +
            this.transform.y

        );



        ctx.rotate(

            this.transform.rotation *

            Math.PI / 180

        );



        ctx.scale(

            this.transform.scale,

            this.transform.scale

        );






        /*
        =========================
        DRAW FRAME
        =========================
        */



        const width =
            video.videoWidth;



        const height =
            video.videoHeight;




        ctx.drawImage(

            video,

            -width/2,

            -height/2,

            width,

            height

        );





        ctx.restore();





        this.applyEffects();



        this.emit(

            "render",

            {

                time,

                frame:this.frameData

            }

        );



    },









    setTransform(
        data={}
    ){



        Object.assign(

            this.transform,

            data

        );



    },









    zoom(
        value
    ){



        this.transform.scale =
            value;



    },









    move(
        x,
        y
    ){



        this.transform.x =
            x;



        this.transform.y =
            y;



    },









    rotate(
        deg
    ){



        this.transform.rotation =
            deg;



    },









    setOpacity(
        value
    ){



        this.transform.opacity =
            value;



    },









    addKeyframe(
        frame
    ){



        this.keyframes.push(

            frame

        );



        this.keyframes.sort(

            (a,b)=>

            a.time-b.time

        );


    },









    updateKeyframe(
        time
    ){



        if(
            this.keyframes.length===0
        )
            return;




        let before=null;


        let after=null;





        this.keyframes.forEach(

            frame=>{


                if(
                    frame.time<=time
                ){

                    before=frame;

                }



                if(
                    frame.time>time &&
                    !after
                ){

                    after=frame;

                }



            }

        );






        if(
            before
        ){



            this.setTransform(

                before.transform

            );



        }



    },









    addEffect(
        effect
    ){



        this.effects.push(

            effect

        );


    },









    applyEffects(){



        if(
            this.effects.length===0
        )
            return;




        this.effects.forEach(

            effect=>{


                if(
                    effect.type==="fade"
                ){


                    this.ctx.globalAlpha =
                    effect.value;


                }



                if(
                    effect.type==="blur"
                ){


                    this.ctx.filter =

                    `blur(${effect.value}px)`;


                }



            }

        );



    },









    clearEffects(){



        this.effects=[];


    },









    exportFrame(){



        return this.canvas

        .toDataURL(

            "image/png"

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



window.FrameRenderer =
    FrameRenderer;
