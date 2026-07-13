/*
=========================================
ClipperStudio
Split Engine
Version : 1.0

Clip Split Controller

=========================================
*/


const Split = {


    activeClip:null,


    callbacks:{},





    init(){


        this.activeClip=null;


        console.log(
            "Split Engine Ready"
        );


    },







    selectClip(
        clip
    ){


        this.activeClip =
            clip;



        this.emit(
            "selected",
            clip
        );


    },







    execute(
        time
    ){



        const clip =
            this.activeClip;



        if(!clip){


            console.error(
                "Tidak ada clip aktif"
            );


            return null;


        }






        if(
            time <= clip.start ||
            time >= clip.end
        ){



            console.error(
                "Posisi split tidak valid"
            );


            return null;


        }






        const clipA =
        this.createPart(

            clip,

            clip.start,

            time

        );





        const clipB =
        this.createPart(

            clip,

            time,

            clip.end

        );





        const result=[

            clipA,

            clipB

        ];





        this.emit(
            "split",
            result
        );



        return result;



    },







    createPart(
        source,
        start,
        end
    ){



        return {


            id:

            "clip_" +

            Date.now() +

            "_" +

            Math.floor(
                Math.random()*9999
            ),




            source:

                source.source,



            start:start,



            end:end,



            duration:

                end-start,



            speed:

                source.speed || 1,



            volume:

                source.volume ?? 1,



            effects:

                [...source.effects],



            status:
                "edited"



        };



    },







    replace(
        track,
        oldClip,
        newClips
    ){



        const index =
            track.clips.indexOf(
                oldClip
            );



        if(
            index === -1
        ){

            return;

        }





        track.clips.splice
