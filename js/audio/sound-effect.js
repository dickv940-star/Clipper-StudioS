/*
=========================================
ClipperStudio
Sound Effect Engine
Version : 1.0

SFX Track Manager

=========================================
*/


const SoundEffect = {


    effects:[],


    active:null,


    callbacks:{},





    init(){


        this.effects=[];


        this.active=null;



        console.log(
            "Sound Effect Ready"
        );


    },







    add(
        source,
        options={}
    ){



        const effect = {


            id:

            "sfx_" +

            Date.now(),



            source:
                source,



            name:

                options.name ||

                "Effect",



            start:

                options.start ||

                0,



            end:

                options.end ||

                null,



            volume:

                options.volume ??
                1,



            fadeIn:

                0,



            fadeOut:

                0,



            muted:

                false



        };





        this.effects.push(
            effect
        );



        this.active =
            effect;



        this.emit(
            "added",
            effect
        );



        return effect;


    },







    select(
        id
    ){



        this.active =
            this.effects.find(

                item=>

                item.id===id

            );



        return this.active;


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



    },







    mute(
        state=true
    ){



        if(
            !this.active
        )
            return;



        this.active.muted =
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







    remove(
        id
    ){



        this.effects =

            this.effects.filter(

                item=>

                item.id!==id

            );



    },







    autoAdd(
        type,
        time
    ){



        const presets={


            highlight:
            "impact.mp3",



            transition:
            "whoosh.mp3",



            subtitle:
            "pop.mp3"



        };





        const file =
            presets[type];



        if(!file)
            return null;



        return this.add(

            file,

            {

                name:type,

                start:time

            }

        );



    },







    getTimelineData(){



        return this.effects.map(

            item=>{


                return {


                    id:
                    item.id,


                    name:
                    item.name,


                    start:
                    item.start,


                    volume:
                    item.volume



                };


            }

        );


    },







    clear(){


        this.effects=[];


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



window.SoundEffect =
    SoundEffect;
