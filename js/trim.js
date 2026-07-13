/*
=========================================
ClipperStudio
Trim Engine
Version : 1.0

Clip Cutting Controller

=========================================
*/


const Trim = {


    activeClip:null,


    callbacks:{},





    init(){


        this.activeClip=null;


        console.log(
            "Trim Engine Ready"
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







    start(
        time
    ){



        const clip =
            this.activeClip;



        if(!clip){

            console.error(
                "Tidak ada clip dipilih"
            );

            return;

        }





        if(
            time >= clip.end
        ){


            console.error(
                "Trim start melewati akhir clip"
            );


            return;


        }





        clip.start =
            time;



        this.update(
            clip
        );


    },







    end(
        time
    ){



        const clip =
            this.activeClip;



        if(!clip){

            console.error(
                "Tidak ada clip dipilih"
            );

            return;

        }





        if(
            time <= clip.start
        ){


            console.error(
                "Trim end tidak valid"
            );


            return;


        }




        clip.end =
            time;



        this.update(
            clip
        );


    },







    update(
        clip
    ){



        clip.duration =

            clip.end -
            clip.start;



        clip.status =
            "edited";



        this.emit(
            "updated",
            clip
        );


    },







    reset(
        clip,
        original
    ){



        clip.start =
            original.start;



        clip.end =
            original.end;



        this.update(
            clip
        );


    },







    getRange(
        clip
    ){



        return {


            start:
                clip.start,


            end:
                clip.end,


            duration:
                clip.end -
                clip.start


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



window.Trim =
    Trim;
