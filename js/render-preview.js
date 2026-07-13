/*
================================================

ClipperStudio
Render Preview Engine

Version : 1.0

Realtime Preview Controller

================================================
*/


const RenderPreview = {



    canvas:null,


    ctx:null,


    container:null,


    playing:false,


    currentTime:0,


    fps:30,


    frame:0,


    project:null,


    callbacks:{},







    init(options={}){


        this.canvas =

        options.canvas ||

        document.getElementById(
            "previewCanvas"
        );



        if(this.canvas){


            this.ctx =

            this.canvas.getContext(
                "2d",
                {
                    alpha:false
                }
            );


        }



        console.log(
            "Render Preview Ready"
        );


    },









    load(project){


        this.project = project;


        console.log(
            "Preview Project Loaded",
            project
        );


    },









    play(){


        if(this.playing)
            return;



        this.playing=true;


        this.loop();



        this.emit(
            "play"
        );


    },









    pause(){


        this.playing=false;


        this.emit(
            "pause"
        );


    },









    stop(){


        this.playing=false;


        this.currentTime=0;


        this.frame=0;


        this.clear();


    },









    loop(){


        if(!this.playing)
            return;



        this.renderFrame();


        this.currentTime +=

        1 / this.fps;



        requestAnimationFrame(

            ()=>this.loop()

        );


    },









    async renderFrame(){



        let frameData=null;





        /*
        ==========================
        RENDER PIPELINE
        ==========================
        */


        if(
            window.RenderPipeline
        ){


            frameData =

            await RenderPipeline.renderFrame(

                this.currentTime

            );


        }






        /*
        ==========================
        DRAW CANVAS
        ==========================
        */


        if(frameData){


            this.draw(

                frameData

            );


        }





        this.emit(

            "frame",

            {

                time:
                this.currentTime,

                frame:
                this.frame

            }

        );



        this.frame++;



    },









    draw(image){



        if(
            !this.ctx
        )
            return;




        this.ctx.clearRect(

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );






        if(
            image instanceof ImageData
        ){



            this.ctx.putImageData(

                image,

                0,

                0

            );


        }


        else if(
            image instanceof HTMLVideoElement
        ){


            this.ctx.drawImage(

                image,

                0,

                0,

                this.canvas.width,

                this.canvas.height

            );


        }


        else if(
            image instanceof HTMLCanvasElement
        ){


            this.ctx.drawImage(

                image,

                0,

                0,

                this.canvas.width,

                this.canvas.height

            );


        }


    },









    seek(time){


        this.currentTime =

        Math.max(

            0,

            time

        );



        this.renderFrame();


    },









    setFPS(value){


        this.fps=value;


    },









    resize(
        width,
        height
    ){


        if(!this.canvas)
            return;



        this.canvas.width=

        width;



        this.canvas.height=

        height;


    },









    snapshot(){



        if(!this.canvas)
            return null;




        return this.canvas.toDataURL(

            "image/png"

        );


    },









    clear(){


        if(
            !this.ctx
        )
            return;



        this.ctx.clearRect(

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );


    },









    connectTimeline(){



        if(
            window.Timeline
        ){



            Timeline.on(

                "update",

                data=>{


                    this.seek(

                        data.time

                    );


                }

            );


        }



    },









    connectEffects(){



        if(
            window.EffectEngine
        ){



            EffectEngine.on(

                "change",

                ()=>{


                    this.renderFrame();


                }

            );


        }



    },









    on(
        event,
        callback
    ){


        this.callbacks[event]=callback;


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






window.RenderPreview = RenderPreview;
