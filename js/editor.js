/*
================================================

ClipperStudio
Editor Controller

Version : 3.1

Main Editor System

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



        this.connectSystems();



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

            ProjectStorage.getCurrentProject();



        }



        console.log(

            "Editor Project:",

            this.project

        );



    },









    connectSystems(){



        /*
        ======================
        PLAYER
        ======================
        */


        if(
            window.Player &&
            Player.init
        ){

            Player.init();

        }







        /*
        ======================
        TIMELINE
        ======================
        */


        if(
            window.Timeline &&
            Timeline.init
        ){

            Timeline.init();

        }







        /*
        ======================
        PLAYHEAD
        ======================
        */


        if(
            window.Playhead &&
            Playhead.init
        ){

            Playhead.init();

        }








        /*
        ======================
        AUDIO
        ======================
        */


        if(
            window.AudioEngine &&
            AudioEngine.init
        ){

            AudioEngine.init();

        }








        /*
        ======================
        EFFECT
        ======================
        */


        if(
            window.EffectEngine &&
            EffectEngine.init
        ){

            EffectEngine.init();

        }








        /*
        ======================
        PREVIEW
        ======================
        */


        if(
            window.RenderPreview
        ){


            RenderPreview.init();


            RenderPreview.connectTimeline();


        }








        /*
        ======================
        RENDER PIPELINE
        ======================
        */


        if(
            window.RenderPipeline
        ){


            RenderPipeline.init({

                width:1080,

                height:1920,

                fps:30

            });


        }





    },









    bindUI(){



        const buttons = {


            playButton:
            ()=>this.play(),


            pauseButton:
            ()=>this.pause(),


            splitButton:
            ()=>this.split(),


            deleteButton:
            ()=>this.delete(),


            undoButton:
            ()=>this.undo(),


            redoButton:
            ()=>this.redo(),


            exportButton:
            ()=>this.export()



        };






        Object.keys(buttons)

        .forEach(

            id=>{


                const btn =

                document.getElementById(
                    id
                );



                if(btn){


                    btn.onclick =
                    buttons[id];


                }


            }

        );



    },









    play(){



        this.state =
        "playing";




        if(
            window.Player
        ){


            Player.play();


        }



        if(
            window.RenderPreview
        ){


            RenderPreview.play();


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



        if(
            window.RenderPreview
        ){


            RenderPreview.pause();


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









    async preview(){



        if(
            window.RenderPreview
        ){


            return RenderPreview.renderFrame();


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









    getProject(){


        return this.project;


    },









    reset(){


        this.project=null;


        this.ready=false;


        this.state="idle";


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
