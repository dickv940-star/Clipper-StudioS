/*
=========================================
ClipperStudio
Render Engine
Version : 1.0

Canvas Video Rendering Controller

=========================================
*/


const RenderEngine = {


    canvas:null,


    ctx:null,


    video:null,


    running:false,


    frame:0,


    settings:{},


    callbacks:{},





    init(
        canvasId="previewCanvas"
    ){



        this.canvas =

        document.getElementById(
            canvasId
        );



        if(!this.canvas){


            console.warn(

                "Canvas preview tidak ditemukan"

            );


            return;


        }



        this.ctx =

        this.canvas.getContext(
            "2d"
        );



        this.settings={


            width:1080,


            height:1920,


            ratio:"9:16",


            effects:[],


            subtitle:true



        };



        console.log(

            "Render Engine Ready"

        );


    },









    setVideo(
        video
    ){



        this.video =
            video;


    },









    configure(
        options={}
    ){



        Object.assign(

            this.settings,

            options

        );



    },









    start(){



        if(
            this.running
        )
            return;



        this.running=true;



        this.loop();



    },









    stop(){



        this.running=false;



    },









    loop(){



        if(
            !this.running
        )
            return;



        this.renderFrame();



        requestAnimationFrame(

            ()=>this.loop()

        );



    },









    renderFrame(){



        if(
            !this.ctx ||
            !this.video
        )
            return;





        const ctx =
            this.ctx;



        const canvas =
            this.canvas;





        ctx.clearRect(

            0,

            0,

            canvas.width,

            canvas.height

        );






        /*
        ==========================
        DRAW VIDEO
        ==========================
        */



        this.drawVideo();





        /*
        ==========================
        EFFECT
        ==========================
        */


        this.applyEffect();





        /*
        ==========================
        SUBTITLE
        ==========================
        */


        if(
            this.settings.subtitle
        ){


            this.drawSubtitle();


        }






        this.emit(

            "frame",

            this.frame++

        );


    },









    drawVideo(){



        const ctx =
        this.ctx;



        const canvas =
        this.canvas;



        const video =
        this.video;




        let scale = Math.max(

            canvas.width /
            video.videoWidth,


            canvas.height /
            video.videoHeight

        );




        let width =
        video.videoWidth *
        scale;



        let height =
        video.videoHeight *
        scale;





        let x =

        (canvas.width-width)/2;



        let y =

        (canvas.height-height)/2;





        ctx.drawImage(

            video,

            x,

            y,

            width,

            height

        );



    },









    applyEffect(){



        if(
            !window.EffectEngine
        )
            return;




        const filters =

        EffectEngine.getFFmpegFilter();




        if(
            filters
        ){



            this.canvas.style.filter =
            this.convertFilter(filters);



        }



    },









    convertFilter(
        filter
    ){



        let result="";



        if(
            filter.includes(
                "contrast"
            )
        ){


            result +=
            "contrast(1.2) ";


        }




        if(
            filter.includes(
                "saturation"
            )
        ){


            result +=
            "saturate(1.4) ";


        }



        return result;


    },









    drawSubtitle(){



        if(
            !window.SubtitleRenderer
        )
            return;




        SubtitleRenderer.render(

            this.ctx,

            this.canvas


        );



    },









    resize(
        width,
        height
    ){



        this.canvas.width =
            width;



        this.canvas.height =
            height;



    },









    exportFrame(){



        return this.canvas.toDataURL(
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



window.RenderEngine =
    RenderEngine;
