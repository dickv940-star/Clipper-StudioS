/*
=========================================
ClipperStudio
Music Manager
Version : 1.0

Background Music Controller

=========================================
*/


const MusicManager = {


    tracks:[],


    active:null,


    volume:0.5,


    callbacks:{},





    init(){


        this.tracks=[];


        this.active=null;



        console.log(
            "Music Manager Ready"
        );


    },







    add(
        file
    ){



        const music = {


            id:

            "music_" +

            Date.now(),



            source:

            file,



            start:0,



            end:null,



            volume:

            this.volume,



            loop:false,



            fadeIn:0,



            fadeOut:0



        };





        this.tracks.push(
            music
        );



        this.active =
            music;



        this.emit(
            "added",
            music
        );



        return music;


    },







    remove(
        id
    ){



        this.tracks =
            this.tracks.filter(

                item=>

                item.id !== id

            );



    },







    select(
        id
    ){



        this.active =
            this.tracks.find(

                item=>

                item.id===id

            );



        return this.active;


    },







    setVolume(
        value
    ){



        if(
            !this.active
        )
            return;



        this.active.volume =
            Math.max(

                0,

                Math.min(

                    1,

                    value

                )

            );



        this.emit(
            "volume",
            this.active
        );


    },







    setPosition(
        start,
        end
    ){



        if(
            !this.active
        )
            return;



        this.active.start =
            start;



        this.active.end =
            end;



    },







    enableLoop(
        state=true
    ){



        if(
            !this.active
        )
            return;



        this.active.loop =
            state;



    },







    setFade(
        inTime,
        outTime
    ){



        if(
            !this.active
        )
            return;



        this.active.fadeIn =
            inTime;



        this.active.fadeOut =
            outTime;



    },







    getTimelineData(){



        return this.tracks.map(

            item=>{


                return {


                    id:
                    item.id,


                    start:
                    item.start,


                    end:
                    item.end,


                    volume:
                    item.volume



                };


            }

        );


    },







    clear(){


        this.tracks=[];


        this.active=null;


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



window.MusicManager =
    MusicManager;
