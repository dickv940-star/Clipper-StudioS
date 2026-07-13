/*
=========================================
ClipperStudio
Export Manager
Version : 1.0

Video Export Controller

=========================================
*/


const ExportManager = {


    format:"mp4",


    quality:"1080p",


    fps:30,


    status:"idle",


    progress:0,


    output:null,


    callbacks:{},





    init(){


        console.log(

            "Export Manager Ready"

        );


    },









    configure(
        settings={}
    ){



        this.format =

        settings.format ||

        "mp4";





        this.quality =

        settings.quality ||

        "1080p";





        this.fps =

        settings.fps ||

        30;



    },









    async start(
        project
    ){



        if(
            !project
        ){


            console.error(

                "Tidak ada project"

            );


            return;


        }






        this.status =
            "preparing";





        this.progress=0;





        this.emit(

            "start"

        );









        try{





            if(
                window.RenderPipeline
            ){



                RenderPipeline.loadProject(

                    project

                );



                RenderPipeline.prepare();



            }








            this.status =
                "rendering";





            const frames =

            await RenderPipeline.render();









            this.status =
                "encoding";





            const video =

            await this.encode(

                frames

            );









            this.output = video;





            this.status =
                "complete";





            this.emit(

                "complete",

                video

            );





            return video;






        }

        catch(error){



            this.status =
                "error";



            console.error(

                error

            );



            this.emit(

                "error",

                error

            );


        }



    },









    async encode(
        frames
    ){



        console.log(

            "Encoding video..."

        );





        if(
            window.Encoder
        ){



            return await Encoder.encode(

                frames,

                {

                    format:this.format,

                    fps:this.fps,

                    quality:this.quality


                }


            );



        }







        return {


            type:

            "video/mock",



            frames



        };



    },









    setProgress(
        value
    ){



        this.progress =

        Math.min(

            1,

            Math.max(

                0,

                value

            )

        );





        this.emit(

            "progress",

            this.progress

        );



    },









    cancel(){



        this.status =
            "cancelled";





        this.emit(

            "cancel"

        );



    },









    download(){



        if(
            !this.output
        )
            return;





        const url =

        URL.createObjectURL(

            this.output

        );





        const a =

        document.createElement(

            "a"

        );





        a.href=url;



        a.download=

        `ClipperStudio-export.${this.format}`;





        a.click();





        URL.revokeObjectURL(

            url

        );



    },









    reset(){



        this.output=null;


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



window.ExportManager =
    ExportManager;
