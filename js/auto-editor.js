/*
=========================================
ClipperStudio
Auto Editor AI
Version : 1.0

Main AI Auto Clip Pipeline

=========================================
*/


const AutoEditor = {


    video:null,


    settings:{},


    result:{},


    status:"idle",


    callbacks:{},





    init(){


        this.status =
            "idle";


        this.result={};



        this.settings={


            clipCount:
            5,


            duration:
            30,


            ratio:
            "9:16",



            effects:
            [],



            autoFrame:
            true,



            subtitle:
            true



        };



        console.log(

            "Auto Editor AI Ready"

        );


    },









    setVideo(
        video
    ){



        this.video =
            video;



        ClipGenerator.setVideo(
            video
        );


    },









    configure(
        options={}
    ){



        Object.assign(

            this.settings,

            options

        );



    },









    async start(){



        this.status =
            "processing";



        this.emit(

            "start"

        );



        try{



            /*
            ====================
            STEP 1
            SCENE ANALYSIS
            ====================
            */


            this.progress(
                "Detecting Scene"
            );



            let scenes=[];



            if(
                window.SceneDetector
            ){


                scenes =

                await SceneDetector.scan(

                    this.video

                );


            }








            /*
            ====================
            STEP 2
            MOTION
            ====================
            */


            this.progress(

                "Analyzing Motion"

            );



            let motions=[];



            if(
                window.MotionDetector
            ){


                motions =

                await MotionDetector.scan(

                    this.video

                );


            }









            /*
            ====================
            STEP 3
            FACE
            ====================
            */


            this.progress(

                "Detecting Face"

            );



            let faces=[];



            if(
                window.FaceDetector
            ){


                faces =

                await FaceDetector.scan(

                    this.video

                );


            }









            /*
            ====================
            STEP 4
            HIGHLIGHT
            ====================
            */


            this.progress(

                "Finding Highlight"

            );



            let highlights=[];



            if(
                window.HighlightEngine
            ){


                highlights =

                HighlightEngine.analyze({

                    scenes,

                    motions,

                    faces

                });



            }









            /*
            ====================
            STEP 5
            RANKING
            ====================
            */



            this.progress(

                "Ranking Best Moment"

            );




            const ranked =

            RankingEngine.rank(

                highlights

            );









            /*
            ====================
            STEP 6
            SMART CUT
            ====================
            */



            this.progress(

                "Creating Smart Cut"

            );





            SmartCut.loadData({


                scenes,

                motions,

                faces,

                highlights:


                ranked



            });









            const selected =

            SmartCut.generate(

                this.settings.clipCount

            );









            /*
            ====================
            STEP 7
            CLIP GENERATOR
            ====================
            */



            this.progress(

                "Generating Clips"

            );




            const clips =

            ClipGenerator.generate(

                selected

            );









            /*
            ====================
            STEP 8
            AUTOFAME
            ====================
            */


            if(

                this.settings.autoFrame

            ){


                this.progress(

                    "Applying Auto Frame"

                );



                clips.forEach(

                    clip=>{


                        if(
                            window.AutoFrame
                        ){


                            AutoFrame.apply(
                                clip
                            );


                        }


                    }

                );


            }









            /*
            ====================
            STEP 9
            SUBTITLE
            ====================
            */


            if(

                this.settings.subtitle

            ){



                this.progress(

                    "Generating Subtitle"

                );



                if(
                    window.SubtitleEngine
                ){


                    SubtitleEngine.generate(

                        clips

                    );


                }



            }









            this.result={


                clips,


                ranked,


                scenes,


                motions,


                faces,


                highlights



            };





            this.status =
                "complete";





            this.emit(

                "complete",

                this.result

            );



            return this.result;



        }



        catch(error){



            this.status =
                "error";



            this.emit(

                "error",

                error

            );



            console.error(
                error
            );



        }



    },









    progress(
        text
    ){



        console.log(

            "AI:",

            text

        );



        this.emit(

            "progress",

            text

        );



    },









    getResult(){


        return this.result;


    },









    reset(){



        this.result={};


        this.status="idle";


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



window.AutoEditor =
    AutoEditor;
