/*
=========================================
ClipperStudio
Render Compositor
Version : 1.0

Final Rendering Pipeline Mixer

=========================================
*/


const RenderCompositor = {


    canvas:null,


    ctx:null,


    layers:[],


    video:null,


    frame:0,


    callbacks:{},





    init(
        canvas="previewCanvas"
    ){



        if(
            typeof canvas==="string"
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

            "Render Compositor Ready"

        );



    },









    setVideo(
        video
    ){



        this.video =
            video;



    },









    addLayer(
        renderer
    ){



        this.layers.push(

            renderer

        );



    },









    clearLayers(){



        this.layers=[];



    },









    render(
        time=0
    ){



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





        /*
        =========================
        1. VIDEO FRAME
        =========================
        */


        if(
            window.FrameRenderer
        ){



            FrameRenderer.render(

                this.video,

                time

            );


        }








        /*
        =========================
        2. EFFECT
        =========================
        */



        if(
            window.RenderEngine
        ){


            RenderEngine.renderFrame();


        }









        /*
        =========================
        3. OVERLAY
        =========================
        */


        if(
            window.OverlayRenderer
        ){


            OverlayRenderer.render();


        }









        /*
        =========================
        4. SUBTITLE
        =========================
        */


        if(
            window.SubtitleRenderer
        ){


            SubtitleRenderer.render(

                this.ctx,

                this.canvas

            );


        }









        this.frame++;





        this.emit(

            "render",

            {

                frame:
                this.frame,


                time

            }

        );



    },









    renderClip(
        clip
    ){



        if(
            !clip
        )
            return;




        this.setVideo(

            clip.video

        );




        this.render(

            clip.start || 0

        );



    },









    start(
        fps=30
    ){



        const interval =

        1000/fps;




        this.timer =

        setInterval(

            ()=>{


                this.render();


            },

            interval

        );



    },









    stop(){



        clearInterval(

            this.timer

        );


    },









    capture(){



        return this.canvas

        .toDataURL(

            "image/png"

        );



    },









    exportStream(){



        if(
            !this.canvas
        )
            return null;




        return this.canvas

        .captureStream(

            30

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



window.RenderCompositor =
    RenderCompositor;
