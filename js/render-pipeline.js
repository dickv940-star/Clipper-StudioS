/*
=========================================
ClipperStudio
Render Pipeline
Version : 1.0

Complete Video Rendering Controller

=========================================
*/


const RenderPipeline = {


    project:null,


    clips:[],


    status:"idle",


    progress:0,


    settings:{


        fps:30,


        width:1080,


        height:1920


    },


    callbacks:{},





    init(
        settings={}
    ){



        Object.assign(

            this.settings,

            settings

        );





        console.log(

            "Render Pipeline Ready"

        );



    },









    loadProject(
        project
    ){



        this.project =
            project;



        this.clips =

        project.clips || [];





        this.emit(

            "project",

            project

        );



    },









    prepare(){



        console.log(

            "Preparing Render..."

        );




        this.status =
            "prepare";





        /*
        =========================
        INIT SYSTEM
        =========================
        */



        if(
            window.RenderCompositor
        ){


            RenderCompositor.init();


        }






        if(
            window.MotionEngine
        ){


            MotionEngine.init();


        }






        if(
            window.ColorEngine
        ){


            ColorEngine.init();


        }






        if(
            window.LUTEngine
        ){


            LUTEngine.init();


        }






        this.status =
            "ready";



    },









    async render(){



        if(
            !this.project
        ){


            console.error(

            "Project kosong"

            );


            return;


        }






        this.status =
            "rendering";





        const total =

        this.clips.length;





        let output=[];





        for(
            let i=0;

            i<total;

            i++
        ){



            const clip =

            this.clips[i];





            const result =

            await this.renderClip(

                clip,

                i

            );





            output.push(

                result

            );






            this.progress =

            (

            i+1

            )

            /

            total;






            this.emit(

                "progress",

                this.progress

            );



        }





        this.status =
            "complete";





        this.emit(

            "complete",

            output

        );





        return output;



    },









    async renderClip(
        clip,
        index
    ){



        console.log(

            "Render Clip",

            index

        );





        /*
        =========================
        MOTION
        =========================
        */


        if(
            window.MotionEngine
        ){



            MotionEngine.apply(

                clip.time || 0

            );



        }









        /*
        =========================
        COLOR
        =========================
        */


        if(
            clip.color
            &&
            window.ColorEngine
        ){



            ColorEngine.apply(

                clip.color

            );



        }









        /*
        =========================
        LUT
        =========================
        */


        if(
            clip.lut
            &&
            window.LUTEngine
        ){



            LUTEngine.apply(

                clip.lut

            );



        }









        /*
        =========================
        COMPOSITOR
        =========================
        */



        if(
            window.RenderCompositor
        ){


            RenderCompositor.render(

                clip.time || 0

            );


        }






        return {


            clip:index,


            status:"done"



        };



    },









    cancel(){



        this.status =
            "cancelled";



        this.emit(

            "cancel"

        );



    },









    reset(){



        this.project=null;


        this.clips=[];


        this.progress=0;


        this.status="idle";



    },









    getStatus(){



        return {


            status:this.status,


            progress:this.progress


        };



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



window.RenderPipeline =
    RenderPipeline;
