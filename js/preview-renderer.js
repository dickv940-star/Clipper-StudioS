/*
=========================================
ClipperStudio
Preview Renderer
Version : 1.0

Editor Preview Controller

=========================================
*/


const PreviewRenderer = {


    container:null,


    canvas:null,


    video:null,


    playing:false,


    currentTime:0,


    duration:0,


    fps:30,


    callbacks:{},





    init(
        options={}
    ){



        this.container =

        document.getElementById(

            options.container ||

            "previewContainer"

        );



        this.canvas =

        document.getElementById(

            options.canvas ||

            "previewCanvas"

        );



        this.video =

        options.video || null;



        console.log(

            "Preview Renderer Ready"

        );



    },









    setVideo(
        video
    ){



        this.video =
            video;



        if(video){


            this.duration =
                video.duration;


        }



    },









    play(){



        if(
            !this.video
        )
            return;



        this.playing=true;



        this.video.play();



        this.loop();



        this.emit(

            "play"

        );


    },









    pause(){



        if(
            !this.video
        )
            return;



        this.playing=false;



        this.video.pause();



        this.emit(

            "pause"

        );



    },









    toggle(){



        if(
            this.playing
        ){


            this.pause();


        }

        else{


            this.play();


        }


    },









    seek(
        time
    ){



        if(
            !this.video
        )
            return;



        this.video.currentTime =
            time;



        this.currentTime =
            time;



        this.render();



    },









    loop(){



        if(
            !this.playing
        )
            return;



        this.currentTime =

        this.video.currentTime;



        this.render();





        requestAnimationFrame(

            ()=>this.loop()

        );



    },









    render(){



        if(
            window.RenderEngine
        ){



            RenderEngine.setVideo(

                this.video

            );



            RenderEngine.renderFrame();



        }



        this.emit(

            "update",

            {

                time:
                this.currentTime


            }

        );



    },









    setRatio(
        ratio
    ){



        if(
            !this.canvas
        )
            return;




        switch(
            ratio
        ){



            case "youtube":


                this.resize(

                    1920,

                    1080

                );

                break;





            case "tiktok":


            case "shorts":


            case "reels":


                this.resize(

                    1080,

                    1920

                );

                break;





            case "square":


                this.resize(

                    1080,

                    1080

                );

                break;



        }



    },









    resize(
        width,
        height
    ){



        if(
            this.canvas
        ){



            this.canvas.width =
                width;



            this.canvas.height =
                height;



        }




        if(
            window.RenderEngine
        ){


            RenderEngine.resize(

                width,

                height

            );


        }



    },









    setFPS(
        fps
    ){



        this.fps =
            fps;



    },









    loading(
        state
    ){



        if(
            !this.container
        )
            return;



        if(state){



            this.container

            .classList

            .add(

                "loading"

            );


        }

        else{


            this.container

            .classList

            .remove(

                "loading"

            );


        }



    },









    screenshot(){



        if(
            window.RenderEngine
        ){


            return RenderEngine.exportFrame();


        }


        return null;


    },









    getTime(){



        return {


            current:
            this.currentTime,


            duration:
            this.duration


        };


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



window.PreviewRenderer =
    PreviewRenderer;
