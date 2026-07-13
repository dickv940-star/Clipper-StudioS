/*
=========================================
ClipperStudio
Track Engine
Version : 1.0

Timeline Layer Manager

=========================================
*/


const Track = {


    id:null,


    type:"video",


    name:"",


    clips:[],


    visible:true,


    locked:false,


    volume:1,




    create(
        options={}
    ){



        return {


            id:
                options.id ||
                (
                    "track_" +
                    Date.now()
                ),



            type:
                options.type ||
                "video",



            name:
                options.name ||
                "Untitled Track",



            clips:[],


            visible:true,


            locked:false,


            volume:
                options.volume ??
                1



        };



    },







    addClip(
        track,
        clip
    ){



        if(
            track.locked
        ){

            console.warn(
                "Track terkunci"
            );

            return false;

        }




        track.clips.push(
            clip
        );



        this.sort(
            track
        );



        return true;


    },








    removeClip(
        track,
        clipId
    ){



        track.clips =
            track.clips.filter(
                clip =>
                clip.id !== clipId
            );



    },








    getClip(
        track,
        id
    ){



        return track.clips.find(
            clip =>
            clip.id === id
        );


    },







    sort(
        track
    ){



        track.clips.sort(

            (a,b)=>

            a.start -
            b.start

        );


    },







    moveClip(
        track,
        clipId,
        newStart
    ){



        const clip =
            this.getClip(
                track,
                clipId
            );



        if(!clip)
            return;



        const duration =
            clip.end -
            clip.start;



        clip.start =
            newStart;



        clip.end =
            newStart +
            duration;



        this.sort(
            track
        );


    },







    toggleVisible(
        track
    ){



        track.visible =
            !track.visible;



    },







    lock(
        track,
        state=true
    ){



        track.locked =
            state;



    },







    setVolume(
        track,
        value
    ){



        track.volume =
            Math.max(
                0,
                Math.min(
                    1,
                    value
                )
            );



    },







    duration(
        track
    ){



        let total=0;



        track.clips.forEach(
            clip=>{


                if(
                    clip.end >
                    total
                ){

                    total =
                    clip.end;

                }


            }
        );



        return total;



    }



};





window.Track =
    Track;
