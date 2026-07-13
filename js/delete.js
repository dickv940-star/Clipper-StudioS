/*
=================================

ClipperStudio
Delete Engine

=================================
*/


(function(){


"use strict";



if(window.Delete){

    return;

}



const Delete = {



    active:null,



    callbacks:{},





    init(){


        console.log(
            "Delete Engine Ready"
        );


    },





    select(clip){


        this.active=clip;


    },





    execute(clip){


        clip =

        clip ||

        this.active;



        if(!clip){

            console.warn(
                "Tidak ada clip"
            );

            return false;

        }



        this.emit(

            "delete",

            clip

        );



        return true;


    },





    removeFromTrack(
        track,
        clip
    ){


        if(
            !track ||
            !track.clips
        ){

            return false;

        }



        const index=

        track.clips.indexOf(
            clip
        );



        if(index===-1){

            return false;

        }



        track.clips.splice(
            index,
            1
        );



        return true;


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

            this.callbacks[event](data);

        }


    }



};



window.Delete=Delete;



console.log(
"Delete Engine Loaded"
);



})();
