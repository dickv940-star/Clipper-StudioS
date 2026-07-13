/*
=========================================
ClipperStudio
Voice Over Engine
Version : 1.0

Voice Recording / Voice Track Manager

=========================================
*/


const VoiceOver = {


    tracks:[],


    active:null,


    recorder:null,


    chunks:[],


    callbacks:{},





    init(){


        this.tracks=[];


        this.active=null;


        console.log(
            "Voice Over Ready"
        );


    },







    add(
        source
    ){



        const voice = {


            id:

            "voice_" +

            Date.now(),



            source:
                source,



            start:
                0,



            end:
                null,



            volume:
                1,



            muted:
                false,



            fadeIn:
                0,



            fadeOut:
                0



        };





        this.tracks.push(
            voice
        );



        this.active =
            voice;



        this.emit(
            "added",
            voice
        );



        return voice;


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







    async startRecording(){



        const stream =
            await navigator.mediaDevices
            .getUserMedia({

                audio:true

            });



        this.recorder =
            new MediaRecorder(
                stream
            );



        this.chunks=[];



        this.recorder.ondataavailable =
        event=>{


            this.chunks.push(
                event.data
            );


        };



        this.recorder.start();



        this.emit(
            "recording-start"
        );



    },







    stopRecording(){



        return new Promise(
            resolve=>{


                if(
                    !this.recorder
                ){

                    resolve(null);

                    return;

                }





                this.recorder.onstop =
                ()=>{


                    const blob =
                    new Blob(

                        this.chunks,

                        {
                            type:
                            "audio/webm"

                        }

                    );



                    const url =
                    URL.createObjectURL(
                        blob
                    );



                    const voice =
                    this.add(
                        url
                    );



                    resolve(
                        voice
                    );


                };



                this.recorder.stop();



                this.emit(
                    "recording-stop"
                );


            }

        );


    },







    remove(
        id
    ){



        this.tracks =
            this.tracks.filter(

                item=>

                item.id!==id

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



window.VoiceOver =
    VoiceOver;
