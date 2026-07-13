/*
=========================================
ClipperStudio
Timeline Engine
Version : 1.0

Main timeline controller

Video
Audio
Subtitle
Effect Track

=========================================
*/


const Timeline = {


    duration:0,


    zoom:1,


    width:1000,


    tracks:[],


    playhead:0,


    callbacks:{},





    init(options={}){


        this.width =
            options.width ||
            1000;


        this.zoom =
            options.zoom ||
            1;



        this.tracks=[];


        this.playhead=0;



        console.log(
            "Timeline Ready"
        );


    },







    load(videoData){



        if(!videoData){

            console.error(
                "Video tidak tersedia"
            );

            return;

        }



        this.duration =
            videoData.duration;



        console.log(
            "Timeline Loaded:",
            this.duration
        );


        this.emit(
            "loaded",
            this.duration
        );


    },







    addTrack(
        track
    ){



        this.tracks.push(
            track
        );



        this.emit(
            "track-added",
            track
        );


    },







    removeTrack(
        id
    ){



        this.tracks =
            this.tracks.filter(
                item =>
                item.id !== id
            );


    },







    addClip(
        trackId,
        clip
    ){



        const track =
            this.getTrack(
                trackId
            );



        if(!track){

            console.error(
                "Track tidak ditemukan"
            );

            return;

        }



        track.clips.push(
            clip
        );



        this.emit(
            "clip-added",
            clip
        );


    },







    removeClip(
        trackId,
        clipId
    ){



        const track =
            this.getTrack(
                trackId
            );



        if(!track)
            return;



        track.clips =
            track.clips.filter(
                clip =>
                clip.id !== clipId
            );


    },







    getTrack(
        id
    ){


        return this.tracks.find(
            track =>
            track.id === id
        );


    },







    setPlayhead(
        time
    ){



        if(
            time < 0
        ){

            time=0;

        }



        if(
            time > this.duration
        ){

            time =
            this.duration;

        }



        this.playhead =
            time;



        this.emit(
            "playhead",
            time
        );



    },







    getPlayhead(){


        return this.playhead;


    },







    timeToPixel(
        time
    ){



        return (

            time /
            this.duration

        )
        *
        this.width
        *
        this.zoom;



    },







    pixelToTime(
        pixel
    ){



        return (

            pixel /
            (
                this.width *
                this.zoom
            )

        )
        *
        this.duration;



    },







    setZoom(
        value
    ){



        this.zoom =
            Math.max(
                0.1,
                value
            );



        this.emit(
            "zoom",
            this.zoom
        );


    },







    getVisibleRange(){



        return {


            start:0,


            end:
            this.duration



        };


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





window.Timeline =
    Timeline;
