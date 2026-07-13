/*
================================================

ClipperStudio
Preview Controller

Version : 3.2

Video Preview Manager

================================================
*/


(function(){

"use strict";



if(window.Preview){

    console.warn(
        "Preview already loaded"
    );

    return;

}





const Preview = {



    video:null,


    canvas:null,


    ctx:null,


    currentClip:null,


    initialized:false,





    init(){



        if(this.initialized){

            return;

        }



        this.createElements();



        this.bindEvents();



        this.initialized=true;



        console.log(
            "Preview Ready"
        );



    },









    createElements(){



        this.video =

        document.createElement(
            "video"
        );



        this.video.controls=false;


        this.video.playsInline=true;


        this.video.preload="auto";



        this.video.style.display="none";





        this.canvas =

        document.createElement(
            "canvas"
        );



        this.canvas.width=1080;


        this.canvas.height=1920;



        this.ctx =

        this.canvas.getContext(
            "2d"
        );






        const container =

        document.getElementById(
            "page"
        );





        if(container){


            container.appendChild(
                this.canvas
            );


            container.appendChild(
                this.video
            );


        }



    },









    bindEvents(){



        this.video.ontimeupdate=()=>{



            if(
                window.Playhead
            ){


                Playhead.set(

                    this.video.currentTime

                );


            }



            this.render();



        };



    },









    load(
        clip
    ){



        if(!clip){

            return;

        }





        this.currentClip=clip;



        this.video.src=

        clip.source;





        this.video.load();





        console.log(

            "Preview Load:",

            clip

        );



    },









    play(){



        if(!this.video.src){

            console.warn(
                "Tidak ada video"
            );

            return;

        }





        this.video.play();



    },









    pause(){



        this.video.pause();



    },









    seek(
        time
    ){



        this.video.currentTime=time;



        this.render();



    },









    render(){



        if(
            !this.video.videoWidth
        ){

            return;

        }





        this.ctx.clearRect(

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );





        const ratio =

        Math.min(

            this.canvas.width /

            this.video.videoWidth,


            this.canvas.height /

            this.video.videoHeight

        );





        const width =

        this.video.videoWidth *

        ratio;



        const height =

        this.video.videoHeight *

        ratio;





        const x =

        (

            this.canvas.width -

            width

        ) / 2;



        const y =

        (

            this.canvas.height -

            height

        ) / 2;






        this.ctx.drawImage(

            this.video,

            x,

            y,

            width,

            height

        );



    }






};







window.Preview =
Preview;



console.log(
"Preview Controller Loaded"
);



})();
