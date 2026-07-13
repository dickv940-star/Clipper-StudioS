/*
=========================================
ClipperStudio
Main Application Controller
Version : 1.0
=========================================
*/


import "./loader.js";
import "./metadata.js";
import "./thumbnail.js";
import "./player.js";

import "./offline.js";
import "./cache.js";
import "./install.js";

import "./ffmpeg.js";
import "./export.js";


/* AI */

import "./ai/scene-detector.js";
import "./ai/motion-detector.js";
import "./ai/face-detector.js";
import "./ai/subtitle-engine.js";
import "./ai/highlight-engine.js";
import "./ai/autoframe.js";
import "./ai/ranking.js";
import "./ai/smart-cut.js";
import "./ai/clip-generator.js";


/* Editor */

import "./editor/timeline.js";
import "./editor/track.js";
import "./editor/clip.js";


/* Storage */

import "./storage/project-storage.js";





const App = {



    video:null,


    file:null,


    project:null,



    screens:{},





    async init(){



        console.log(
            "ClipperStudio Starting..."
        );



        this.cacheScreens();



        this.bindUpload();



        this.bindButtons();




        await this.initializeSystems();




        console.log(
            "ClipperStudio Ready"
        );



    },









    async initializeSystems(){



        try{



            OfflineManager.init();



            CacheManager.init();



            InstallManager.init();



            await ProjectStorage.init();



            ClipGenerator.init();



            SmartCut.init();



            RankingEngine.init();




        }

        catch(error){


            console.error(

                "System Init Error",

                error

            );


        }



    },









    cacheScreens(){



        this.screens={


            home:

            document.getElementById(
                "homeScreen"
            ),



            mode:

            document.getElementById(
                "modeScreen"
            ),



            auto:

            document.getElementById(
                "autoClipScreen"
            )


        };



    },









    showScreen(
        name
    ){



        Object.values(
            this.screens
        )
        .forEach(

            screen=>{


                if(screen)

                    screen.classList.remove(
                        "active"
                    );


            }

        );




        if(
            this.screens[name]
        ){



            this.screens[name]

            .classList.add(
                "active"
            );



        }



    },









    bindUpload(){



        const input =

        document.getElementById(
            "videoInput"
        );



        const button =

        document.getElementById(
            "chooseFile"
        );




        if(!input || !button)
            return;





        button.onclick=()=>{


            input.click();



        };







        input.onchange=

        async(e)=>{



            const file =
            e.target.files[0];



            if(!file)
                return;




            console.log(

                "Video dipilih",

                file

            );



            this.file=file;



            await this.loadVideo(
                file
            );



        };



    },









    async loadVideo(
        file
    ){



        try{



            this.showScreen(
                "mode"
            );





            this.project =

            ProjectStorage.create(

                file.name

            );





            this.project.video={


                name:file.name,


                size:file.size,


                type:file.type



            };





            await ProjectStorage.save(

                this.project

            );





            CacheManager.saveVideoMeta({

                name:file.name,

                size:file.size,

                type:file.type


            });





            console.log(

                "Video berhasil dimuat"

            );



        }


        catch(error){



            console.error(

                "Load video error",

                error

            );


        }



    },









    bindButtons(){



        const auto =

        document.getElementById(

            "autoClipBtn"

        );




        if(auto){



            auto.onclick=()=>{


                this.showScreen(
                    "auto"
                );


            };


        }






        const manual =

        document.getElementById(

            "manualBtn"

        );



        if(manual){



            manual.onclick=()=>{


                console.log(

                    "Open Manual Editor"

                );



            };


        }





        const startAuto =

        document.getElementById(

            "startAutoClip"

        );




        if(startAuto){



            startAuto.onclick=

            ()=>{


                this.startAutoClip();


            };



        }




    },









    async startAutoClip(){



        console.log(

            "AI Auto Clip Started"

        );




        this.showProcessing();



        /*

        Pipeline:

        Video
        |
        Scene
        |
        Motion
        |
        Face
        |
        Highlight
        |
        Ranking
        |
        Smart Cut
        |
        Clip Generator

        */





        try{



            const result = {


                video:
                this.file,



                scenes:[],


                motions:[],


                faces:[],


                highlights:[]


            };





            RankingEngine.rank(

                []

            );




            const clips =

            ClipGenerator.generate(

                []

            );




            this.project.clips =
                clips;



            await ProjectStorage.save(

                this.project

            );





            console.log(

                "AI Clip selesai",

                clips

            );



        }


        catch(error){



            console.error(

                error

            );


        }



    },









    showProcessing(){



        console.log(

            "Processing AI..."

        );



    }



};





window.App =
    App;



document.addEventListener(

"DOMContentLoaded",

()=>{


    App.init();


});                                   
