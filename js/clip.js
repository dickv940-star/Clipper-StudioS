/*
=========================================
ClipperStudio
Clip Engine
Version : 1.0

Video Clip Object Manager

=========================================
*/


const Clip = {


    create(options={}){


        const start =
            options.start || 0;


        const end =
            options.end || 0;



        return {


            id:
            options.id ||
            (
                "clip_" +
                Date.now() +
                "_" +
                Math.floor(
                    Math.random()*9999
                )
            ),



            source:
                options.source ||
                null,



            start:start,


            end:end,


            duration:
                end-start,



            speed:
                options.speed ||
                1,



            volume:
                options.volume ??
                1,



            muted:false,



            effects:[],



            status:
                "ready"



        };


    },







    getDuration(
        clip
    ){


        return (
            clip.end -
            clip.start
        );


    },







    trimStart(
        clip,
        time
    ){



        if(
            time >= clip.end
        ){

            console.error(
                "Trim tidak valid"
            );

            return;

        }



        clip.start =
            time;



        clip.duration =
            this.getDuration(
                clip
            );



    },







    trimEnd(
        clip,
        time
    ){



        if(
            time <= clip.start
        ){

            console.error(
                "Trim tidak valid"
            );

            return;

        }



        clip.end =
            time;



        clip.duration =
            this.getDuration(
                clip
            );



    },







    split(
        clip,
        time
    ){



        if(
            time <= clip.start ||
            time >= clip.end
        ){

            return null;

        }




        const first =
        this.create({

            source:
                clip.source,


            start:
                clip.start,


            end:
                time

        });





        const second =
        this.create({

            source:
                clip.source,


            start:
                time,


            end:
                clip.end

        });





        return [

            first,

            second

        ];


    },







    move(
        clip,
        newStart
    ){



        const duration =
            this.getDuration(
                clip
            );



        clip.start =
            newStart;



        clip.end =
            newStart +
            duration;



    },







    setSpeed(
        clip,
        speed
    ){



        clip.speed =
            Math.max(
                0.1,
                speed
            );



    },







    mute(
        clip,
        state=true
    ){



        clip.muted =
            state;



        if(state){

            clip.volume=0;

        }


    },







    addEffect(
        clip,
        effect
    ){



        clip.effects.push(
            effect
        );


    },







    removeEffect(
        clip,
        effectName
    ){



        clip.effects =
            clip.effects.filter(
                item =>
                item.name !== effectName
            );


    },







    duplicate(
        clip
    ){



        return this.create({

            source:
                clip.source,


            start:
                clip.start,


            end:
                clip.end,


            speed:
                clip.speed,


            volume:
                clip.volume


        });


    }



};



window.Clip =
    Clip;
