/*
================================================

ClipperStudio
APP CORE

Version : 3.0

Application Bootstrap

================================================
*/


const App = {


    version:"3.0",


    ready:false,


    modules:{},





    async init(){



        console.clear();



        console.log(

            "%cClipperStudio Starting...",

            "color:#6c5ce7;font-size:18px"

        );





        this.checkModules();



        await this.initialize();



        this.ready=true;




        console.log(

            "%cClipperStudio Ready",

            "color:#00b894;font-size:18px"

        );



    },









    checkModules(){



        const list=[



            // STORAGE

            "ProjectStorage",



            // VIDEO

            "VideoLoader",


            "Metadata",


            "Thumbnail",


            "Player",





            // AI

            "SceneDetector",


            "MotionDetector",


            "FaceDetector",


            "SubtitleEngine",


            "HighlightEngine",


            "AutoFrame",


            "ClipGenerator",


            "AutoEditor",





            // EDITOR

            "Timeline",


            "Track",


            "Clip",


            "Marker",


            "Playhead",


            "Undo",


            "Redo",





            // AUDIO

            "AudioEngine",


            "MusicManager",


            "VoiceOver",


            "SoundEffect",





            // EFFECT

            "EffectEngine",





            // RENDER

            "RenderEngine",


            "PreviewRenderer",


            "FrameRenderer",


            "MotionEngine",


            "ColorEngine",


            "LUTEngine",


            "ShaderEngine",


            "RenderCompositor",


            "RenderPipeline",





            // EXPORT

            "QualityManager",


            "ExportManager",


            "ExportController",


            "RenderPreview"




        ];





        list.forEach(

            module=>{



                this.modules[module]=

                Boolean(

                    window[module]

                );



                if(
                    window[module]
                ){


                    console.log(

                        "✓",

                        module

                    );


                }
                else{


                    console.warn(

                        "○",

                        module,

                        "belum tersedia"

                    );


                }



            }


        );



    },









    async initialize(){



        console.log(

            "Initializing systems..."

        );





        /*
        ===========================
        STORAGE
        ===========================
        */


        this.initModule(

            "ProjectStorage"

        );






        /*
        ===========================
        VIDEO
        ===========================
        */


        this.initModule(

            "Player"

        );






        /*
        ===========================
        AI
        ===========================
        */


        this.initModule(

            "SceneDetector"

        );


        this.initModule(

            "MotionDetector"

        );


        this.initModule(

            "FaceDetector"

        );






        /*
        ===========================
        EDITOR
        ===========================
        */


        this.initModule(

            "Timeline"

        );


        this.initModule(

            "Undo"

        );


        this.initModule(

            "Redo"

        );






        /*
        ===========================
        AUDIO
        ===========================
        */


        this.initModule(

            "AudioEngine"

        );






        /*
        ===========================
        EFFECT
        ===========================
        */


        this.initModule(

            "EffectEngine"

        );






        /*
        ===========================
        RENDER
        ===========================
        */


        this.initModule(

            "RenderEngine"

        );


        this.initModule(

            "MotionEngine"

        );


        this.initModule(

            "ColorEngine"

        );


        this.initModule(

            "LUTEngine"

        );


        this.initModule(

            "ShaderEngine"

        );






        if(
            window.RenderPipeline
        ){



            RenderPipeline.init({

                fps:30,

                width:1080,

                height:1920


            });


        }








        /*
        ===========================
        EXPORT
        ===========================
        */


        this.initModule(

            "QualityManager"

        );


        this.initModule(

            "ExportManager"

        );


        this.initModule(

            "ExportController"

        );





    },









    initModule(
        name
    ){



        const module =

        window[name];





        if(
            module &&
            typeof module.init==="function"
        ){



            try{


                module.init();



                console.log(

                    name,

                    "initialized"

                );



            }

            catch(error){



                console.error(

                    name,

                    error

                );


            }



        }



    },









    getStatus(){



        return {


            ready:this.ready,


            modules:this.modules



        };



    },









    reset(){



        this.ready=false;



        console.log(

            "ClipperStudio Reset"

        );



    }




};







window.App = App;







document.addEventListener(

"DOMContentLoaded",

()=>{


    App.init();


}

);
