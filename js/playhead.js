/*
=========================================
ClipperStudio
Playhead Engine
Version : 1.0

Timeline Position Controller

=========================================
*/


const Playhead = {


    time:0,


    duration:0,


    callbacks:{},


    playing:false,





    init(options={}){


        this.duration =
            options.duration || 0;


        this.time = 0;


        this.playing = false;



        console.log(
            "Playhead Ready"
        );


    },







    setDuration(
        duration
    ){


        this.duration =
            duration;


    },







    setTime(
        time
    ){



        if(time < 0){

            time = 0;

        }



        if(
            time > this.duration
        ){

            time =
            this.duration;

        }




        this.time =
            time;



        this.emit(
            "change",
            time
        );


    },







    getTime(){


        return this.time;


    },







    move(
        delta
    ){



        this.setTime(

            this.time +
            delta

        );


    },







    start(){



        this.playing = true;



        this.emit(
            "play"
        );


    },







    stop(){



        this.playing = false;



        this.emit(
            "stop"
        );


    },







    sync(
        currentTime
    ){



        this.setTime(
            currentTime
        );


    },







    percentage(){



        if(
            this.duration===0
        ){

            return 0;

        }



        return (

            this.time /
            this.duration

        )
        *
        100;


    },







    on(
        event,
        callback
    ){



        this.callbacks[event] =
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



window.Playhead =
    Playhead;
