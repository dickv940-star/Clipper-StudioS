/*
================================================

ClipperStudio
Timeline Engine

Version : 3.2

Video Timeline Controller

================================================
*/


(function(){

"use strict";



if(window.Timeline){

    console.warn(
        "Timeline already loaded"
    );

    return;

}





const Timeline = {



    tracks:[],


    duration:0,


    callbacks:{},


    initialized:false,









    init(){


        if(this.initialized){

            return;

        }



        this.tracks=[];


        this.duration=0;


        this.initialized=true;



        console.log(
            "Timeline Ready"
        );



    },









    createTrack(
        type="video"
    ){



        const track={



            id:

            "track_" +

            Date.now(),



            type:type,



            clips:[]



        };



        this.tracks.push(
            track
        );



        return track;



    },









    addClip(
        clip
    ){



        if(!clip){

            return null;

        }






        let track =

        this.tracks.find(

            t=>t.type==="video"

        );






        if(!track){


            track=

            this.createTrack(
                "video"
            );


        }






        track.clips.push(
            clip
        );






        this.calculateDuration();






        this.emit(

            "clip-added",

            clip

        );





        console.log(

            "Timeline Clip Added",

            clip

        );



        return clip;



    },









    removeClip(
        clip
    ){



        this.tracks.forEach(

            track=>{


                const index=

                track.clips.indexOf(
                    clip
                );



                if(index!==-1){


                    track.clips.splice(

                        index,

                        1

                    );


                }


            }

        );





        this.calculateDuration();



        this.emit(

            "clip-removed",

            clip

        );



    },









    splitClip(
        clip,
        time
    ){



        if(
            !window.Split
        ){

            return;

        }



        Split.selectClip(
            clip
        );


        return Split.execute(
            time
        );



    },









    getClips(){



        let result=[];



        this.tracks.forEach(

            track=>{


                result.push(

                    ...track.clips

                );


            }

        );



        return result;



    },









    calculateDuration(){



        let max=0;



        this.getClips()

        .forEach(

            clip=>{


                if(
                    clip.end > max
                ){

                    max=clip.end;

                }


            }

        );



        this.duration=max;



        return max;



    },









    seek(
        time
    ){



        if(
            window.Playhead
        ){


            Playhead.set(
                time
            );


        }





        this.emit(

            "seek",

            time

        );



    },









    play(){



        if(
            window.RenderPreview
        ){


            RenderPreview.play();


        }



        this.emit(
            "play"
        );



    },









    pause(){



        if(
            window.RenderPreview
        ){


            RenderPreview.pause();


        }



        this.emit(
            "pause"
        );



    },









    clear(){


        this.tracks=[];


        this.duration=0;



    },









    getState(){


        return {


            tracks:this.tracks,


            duration:this.duration


        };


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






window.Timeline =
Timeline;



console.log(
"Timeline Engine Loaded"
);



})();
