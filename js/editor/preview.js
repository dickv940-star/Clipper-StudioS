/*
=========================================
ClipperStudio
Preview Engine
Version : 1.0

Editor Video Preview Controller

=========================================
*/


const Preview = {


    container:null,


    video:null,


    overlays:[],


    currentTime:0,


    callbacks:{},





    init(containerId){



        this.container =
            document.getElementById(
                containerId
            );



        if(!this.container){


            console.error(
                "Preview container tidak ditemukan"
            );


            return;


        }




        this.video =
            document.createElement(
                "video"
            );



        this.video.playsInline=true;


        this.video.controls=false;


        this.video.preload="auto";



        this.video.style.width =
            "100%";



        this.video.style.height =
            "100%";



        this.container.appendChild(
            this.video
        );



        console.log(
            "Preview Ready"
        );



        this.bind();


    },








    load(
        videoData
    ){



        if(!this.video)
            return;



        this.video.src =
            videoData.url;



        this.video.load();



    },







    play(){


        this.video.play();


    },







    pause(){


        this.video.pause();


    },







    seek(
        time
    ){



        this.video.currentTime =
            time;



    },







    setVolume(
        value
    ){



        this.video.volume =
            value;



    },







    setSpeed(
        speed
    ){



        this.video.playbackRate =
            speed;



    },








    addOverlay(
        element
    ){



        element.style.position =
            "absolute";



        this.container.appendChild(
            element
        );



        this.overlays.push(
            element
        );



    },







    removeOverlay(
        element
    ){



        element.remove();



        this.overlays =
            this.overlays.filter(
                item =>
                item !== element
            );


    },








    clearOverlay(){



        this.overlays.forEach(
            item =>
            item.remove()
        );



        this.overlays=[];


    },







    applyCrop(
        crop
    ){



        if(!crop)
            return;



        this.video.style.objectFit =
            "cover";



        this.video.style.objectPosition =


            (

                crop.x || 50

            )

            +

            "% "

            +

            (

                crop.y || 50

            )

            +

            "%";



    },







    bind(){



        this.video.addEventListener(

            "timeupdate",

            ()=>{


                this.currentTime =
                    this.video.currentTime;



                this.emit(

                    "timeupdate",

                    this.currentTime

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



window.Preview =
    Preview;
