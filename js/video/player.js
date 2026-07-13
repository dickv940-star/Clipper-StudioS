/*
=========================================
ClipperStudio
Video Player Engine
Version : 1.0
=========================================
*/


const VideoPlayer = {


    video: null,

    container: null,

    source: null,

    callbacks: {},



    init(containerId) {


        this.container =
            document.getElementById(
                containerId
            );


        if(!this.container){

            console.error(
                "Player container tidak ditemukan"
            );

            return;

        }



        this.video =
            document.createElement(
                "video"
            );


        this.video.controls = false;


        this.video.playsInline = true;


        this.video.muted = false;


        this.video.preload = "auto";



        this.video.style.width =
            "100%";


        this.video.style.height =
            "100%";



        this.container.appendChild(
            this.video
        );



        this.bindEvents();



        console.log(
            "VideoPlayer Ready"
        );


    },




    load(videoData){


        if(!this.video){

            console.error(
                "Player belum diinisialisasi"
            );

            return;

        }



        this.source =
            videoData;



        this.video.src =
            videoData.url;



        this.video.load();



        console.log(
            "Video Loaded:",
            videoData.name
        );


    },




    play(){


        if(this.video){

            this.video.play();

        }


    },




    pause(){


        if(this.video){

            this.video.pause();

        }


    },




    toggle(){


        if(
            this.video.paused
        ){

            this.play();

        }

        else{

            this.pause();

        }


    },




    seek(time){


        if(this.video){

            this.video.currentTime =
                time;

        }


    },




    getCurrentTime(){


        return this.video
            ? this.video.currentTime
            : 0;


    },




    getDuration(){


        return this.video
            ? this.video.duration
            : 0;


    },




    setVolume(value){


        if(this.video){

            this.video.volume =
                value;

        }


    },




    setPlaybackRate(rate){


        if(this.video){

            this.video.playbackRate =
                rate;

        }


    },




    captureFrame(){



        if(!this.video){

            return null;

        }




        const canvas =
            document.createElement(
                "canvas"
            );



        canvas.width =
            this.video.videoWidth;



        canvas.height =
            this.video.videoHeight;




        const ctx =
            canvas.getContext(
                "2d"
            );



        ctx.drawImage(

            this.video,

            0,

            0,

            canvas.width,

            canvas.height

        );




        return canvas.toDataURL(
            "image/jpeg",
            0.85
        );


    },




    on(event, callback){


        this.callbacks[event] =
            callback;


    },




    bindEvents(){



        this.video.addEventListener(

            "loadedmetadata",

            ()=>{


                this.emit(
                    "loadedmetadata",
                    this.video
                );


            }

        );




        this.video.addEventListener(

            "timeupdate",

            ()=>{


                this.emit(
                    "timeupdate",
                    this.video.currentTime
                );


            }

        );




        this.video.addEventListener(

            "play",

            ()=>{


                this.emit(
                    "play"
                );


            }

        );




        this.video.addEventListener(

            "pause",

            ()=>{


                this.emit(
                    "pause"
                );


            }

        );



    },




    emit(event,data){


        if(
            this.callbacks[event]
        ){

            this.callbacks[event](
                data
            );

        }


    }


};



window.VideoPlayer = VideoPlayer;
