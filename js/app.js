/*
================================================

ClipperStudio
Editor Controller

Version : 3.0

Main Video Editor System

================================================
*/


const Editor = {


    project:null,


    ready:false,


    state:"idle",


    callbacks:{},





    async init(){



        console.log(

            "Editor Initializing..."

        );





        this.loadProject();



        this.initSystems();



        this.bindUI();





        this.ready=true;



        console.log(

            "Editor Ready"

        );



        this.emit(

            "ready"

        );



    },









    loadProject(){



        if(
            window.ProjectStorage
        ){



            this.project =

            ProjectStorage

            .getCurrentProject();



        }





        if(
            !this.project
        ){



            console.warn(

                "Project belum tersedia"

            );


            return;



        }





        console.log(

            "Editor Project:",

            this.project

        );



    },









    initSystems(){





        /*
        ==========================
        PLAYER
        ==========================
        */


        if(
            window.Player
        ){


            Player.init();



        }






        /*
        ==========================
        TIMELINE
        ==========================
        */


        if(
            window.Timeline
        ){


            Timeline.init();



        }






        /*
        ==========================
        PLAYHEAD
        ==========================
        */


        if(
            window.Playhead
        ){


            Playhead.init();



        }






        /*
        ==========================
        AUDIO
        ==========================
        */


        if(
            window.AudioEngine
        ){


            AudioEngine.init();



        }






        /*
        ==========================
        EFFECT
        ==========================
        */


        if(
            window.EffectEngine
        ){


            EffectEngine.init();



        }






        /*
        ==========================
        PREVIEW
        ==========================
        */


        if(
            window.PreviewRenderer
        ){


            PreviewRenderer.init();



        }






        /*
        ==========================
        RENDER PIPELINE
        ==========================
        */


        if(
            window.RenderPipeline
        ){



            RenderPipeline.loadProject(

                this.project

            );



        }




    },









    bindUI(){



        const play =

        document.getElementById(

            "playButton"

        );





        if(play){


            play.onclick=()=>{

                this.play();

            };


        }






        const pause =

        document.getElementById(

            "pauseButton"

        );





        if(pause){


            pause.onclick=()=>{


                this.pause();


            };


        }






        const split =

        document.getElementById(

            "splitButton"

        );





        if(split){


            split.onclick=()=>{


                this.split();


            };


        }






        const undo =

        document.getElementById(

            "undoButton"

        );





        if(undo){


            undo.onclick=()=>{


                this.undo();


            };


        }






        const redo =

        document.getElementById(

            "redoButton"

        );





        if(redo){


            redo.onclick=()=>{


                this.redo();


            };


        }



    },









    play(){



        this.state =
            "playing";





        if(
            window.Player
        ){



            Player.play();



        }





        this.emit(

            "play"

        );



    },









    pause(){



        this.state =
            "paused";





        if(
            window.Player
        ){



            Player.pause();



        }





        this.emit(

            "pause"

        );



    },









    split(){



        if(
            window.Split
        ){



            Split.execute();



        }





        this.emit(

            "split"

        );



    },









    delete(){



        if(
            window.Delete
        ){



            Delete.execute();



        }





    },









    undo(){



        if(
            window.Undo
        ){



            Undo.execute();



        }



    },









    redo(){



        if(
            window.Redo
        ){



            Redo.execute();



        }



    },









    async preview(){



        console.log(

            "Generating preview..."

        );





        if(
            window.RenderPipeline
        ){



            return await RenderPipeline.render();



        }



    },









    async render(){



        this.state =
            "rendering";





        if(
            window.RenderPipeline
        ){



            return await RenderPipeline.render();



        }



    },









    async export(){



        this.state =
            "exporting";





        if(
            window.ExportManager
        ){



            return await ExportManager.start(

                this.project

            );



        }



    },









    setEffect(
        effect
    ){



        if(
            window.EffectEngine
        ){



            EffectEngine.apply(

                effect

            );


        }



    },









    addClip(
        clip
    ){



        if(
            window.Timeline
        ){



            Timeline.addClip(

                clip

            );



        }



    },









    getProject(){



        return this.project;



    },









    reset(){



        this.project=null;


        this.state="idle";


        this.ready=false;



    },









    on(
        event,
        callback
    ){



        this.callbacks[event]=callback;



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






window.Editor = Editor;
