/*
================================================

ClipperStudio
Editor Controller

Version : 3.2

Main Editor Singleton

================================================
*/


(function(){

"use strict";



if(window.Editor){

    console.warn(
        "Editor already exists - skip duplicate"
    );

    return;

}





const Editor = {



    project:null,


    ready:false,


    state:"idle",


    callbacks:{},





    init(){


        if(this.ready){

            console.warn(
                "Editor already initialized"
            );

            return;

        }



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



        try{


            if(
                window.ProjectStorage
            ){


                this.project =

                ProjectStorage.getCurrentProject();


            }



        }

        catch(error){


            console.error(
                "Project Load Error",
                error
            );


        }



        console.log(
            "Editor Project:",
            this.project
        );



    },









    connectSystems(){



        console.log(
            "Connecting Editor Systems..."
        );





        if(
            window.Timeline &&
            Timeline.init
        ){

            Timeline.init();

        }






        if(
            window.Playhead &&
            Playhead.init
        ){

            Playhead.init();

        }







        if(
            window.EffectEngine &&
            EffectEngine.init
        ){

            EffectEngine.init();

        }







        if(
            window.RenderPreview &&
            RenderPreview.init
        ){

            RenderPreview.init();

        }







        if(
            window.RenderPipeline &&
            RenderPipeline.init
        ){

            RenderPipeline.init({

                width:1080,

                height:1920,

                fps:30

            });

        }





    },









    bindUI(){



        const events = {



            "playButton":
            ()=>this.play(),



            "pauseButton":
            ()=>this.pause(),



            "undoButton":
            ()=>this.undo(),



            "redoButton":
            ()=>this.redo(),



            "deleteButton":
            ()=>this.delete(),



            "splitButton":
            ()=>this.split()



        };





        Object.keys(events)

        .forEach(id=>{


            const button =

            document.getElementById(
                id
            );



            if(button){


                button.onclick =
                events[id];


            }



        });



    },









    play(){


        this.state="playing";



        if(
            window.Player &&
            Player.play
        ){

            Player.play();

        }



        if(
            window.RenderPreview &&
            RenderPreview.play
        ){

            RenderPreview.play();

        }



        this.emit(
            "play"
        );


    },









    pause(){


        this.state="paused";



        if(
            window.Player &&
            Player.pause
        ){

            Player.pause();

        }



        if(
            window.RenderPreview &&
            RenderPreview.pause
        ){

            RenderPreview.pause();

        }



        this.emit(
            "pause"
        );


    },









    split(){


        if(
            window.Split &&
            Split.execute
        ){

            return Split.execute();

        }


    },









    delete(){


        if(
            window.Delete &&
            Delete.execute
        ){

            return Delete.execute();

        }


    },









    undo(){


        if(
            window.Undo &&
            Undo.execute
        ){

            return Undo.execute();

        }


    },









    redo(){


        if(
            window.Redo &&
            Redo.execute
        ){

            return Redo.execute();

        }


    },









    addClip(clip){



        if(
            window.Timeline &&
            Timeline.addClip
        ){


            Timeline.addClip(
                clip
            );


        }


    },









    render(){



        if(
            window.RenderPipeline &&
            RenderPipeline.render
        ){


            return RenderPipeline.render();


        }



    },









    export(){



        if(
            window.ExportManager &&
            ExportManager.start
        ){


            return ExportManager.start(
                this.project
            );


        }


    },









    getProject(){


        return this.project;


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



console.log(
"Editor Controller Loaded"
);



})();
