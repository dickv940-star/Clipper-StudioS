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

            return false;

        }



        track.clips.splice(

            index,

            1,

            ...newClips

        );



        this.emit(

            "replaced",

            {

                oldClip,

                newClips

            }

        );



        return true;


    },









    splitTrack(
        track,
        time
    ){


        if(
            !track ||
            !track.clips
        ){

            return [];

        }



        let result=[];



        track.clips.forEach(

            clip=>{


                if(

                    time > clip.start &&

                    time < clip.end

                ){



                    const parts =

                    this.createParts(

                        clip,

                        time

                    );



                    this.replace(

                        track,

                        clip,

                        parts

                    );



                    result.push(

                        ...parts

                    );



                }



            }

        );



        return result;


    },





    createParts(
        clip,
        time
    ){


        return [

            this.createPart(

                clip,

                clip.start,

                time

            ),


            this.createPart(

                clip,

                time,

                clip.end

            )


        ];


    },





    undo(){

        console.log(

            "Split undo"

        );

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







window.Split = Split;
