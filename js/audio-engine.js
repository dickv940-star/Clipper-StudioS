/*
=========================================
ClipperStudio
Audio Engine
Version : 1.0

Audio Controller

Video Audio
Music
Voice
Effect

=========================================
*/


const AudioEngine = {


    audio:null,


    volume:1,


    muted:false,


    fadeTimer:null,


    callbacks:{},





    init(){


        this.audio =
            document.createElement(
                "audio"
            );


        this.audio.preload =
            "auto";


        this.volume=1;


        this.muted=false;



        console.log(
            "Audio Engine Ready"
        );


    },







    load(
        source
    ){



        if(!this.audio){

            this.init();

        }



        this.audio.src =
            source;



        this.audio.load();



        this.emit(
            "loaded",
            source
        );


    },







    play(){



        if(!this.audio)
            return;



        this.audio.play();



        this.emit(
            "play"
        );


    },







    pause(){



        if(!this.audio)
            return;



        this.audio.pause();



        this.emit(
            "pause"
        );


    },







    seek(
        time
    ){



        if(!this.audio)
            return;



        this.audio.currentTime =
            time;



    },







    setVolume(
        value
    ){



        this.volume =
            Math.max(

                0,

                Math.min(

                    1,

                    value

                )

            );



        if(this.audio){


            this.audio.volume =
                this.volume;


        }



        this.emit(
            "volume",
            this.volume
        );


    },







    mute(
        state=true
    ){



        this.muted =
            state;



        if(this.audio){


            this.audio.muted =
                state;


        }



        this.emit(
            "mute",
            state
        );


    },







    toggleMute(){



        this.mute(
            !this.muted
        );


    },







    fadeIn(
        duration=2000
    ){



        if(!this.audio)
            return;



        this.audio.volume=0;



        this.audio.play();



        let volume=0;



        const step =
            50 /
            duration;



        this.fadeTimer =
        setInterval(
            ()=>{


                volume += step;



                if(volume>=this.volume){



                    volume=this.volume;



                    clearInterval(
                        this.fadeTimer
                    );


                }



                this.audio.volume =
                    volume;



            },

            50

        );



    },







    fadeOut(
        duration=2000
    ){



        if(!this.audio)
            return;



        let volume =
            this.audio.volume;



        const step =
            volume /
            (
                duration / 50
            );



        this.fadeTimer =
        setInterval(
            ()=>{


                volume -= step;



                if(volume<=0){


                    volume=0;


                    clearInterval(
                        this.fadeTimer
                    );


                    this.audio.pause();


                }



                this.audio.volume =
                    volume;



            },

            50

        );



    },







    sync(
        video
    ){



        if(!video)
            return;



        video.addEventListener(

            "timeupdate",

            ()=>{


                if(
                    Math.abs(

                        this.audio.currentTime -
                        video.currentTime

                    ) > 0.3
                ){


                    this.audio.currentTime =
                        video.currentTime;


                }


            }

        );



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



window.AudioEngine =
    AudioEngine;
