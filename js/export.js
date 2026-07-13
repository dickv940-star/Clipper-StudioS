/*
=========================================
ClipperStudio
Export Controller
Version : 1.0

Main Export Manager

=========================================
*/


const ExportController = {


    current:null,


    progress:0,


    status:"idle",


    callbacks:{},





    init(){


        this.status =
            "idle";


        this.progress =
            0;



        console.log(
            "Export Controller Ready"
        );



        this.bindEvents();


    },







    bindEvents(){



        const button =
        document.getElementById(
            "exportButton"
        );



        if(button){


            button.addEventListener(

                "click",

                ()=>{


                    this.start();


                }

            );


        }



    },







    configure(
        options={}
    ){



        if(
            window.ExportEngine
        ){


            ExportEngine.configure(
                options
            );


        }



    },







    setPlatform(
        platform
    ){



        if(
            window.FormatManager
        ){


            FormatManager.apply(
                platform
            );


        }



        if(
            window.ExportEngine
        ){


            ExportEngine.setPlatform(
                platform
            );


        }



    },







    async start(){



        try{


            this.status =
                "processing";



            this.progress =
                0;



            this.emit(
                "start"
            );





            const data =

            ExportEngine.collectData();





            const job =

            RenderQueue.add({

                name:
                "Video Export",

                data:
                data

            });





            RenderQueue.on(

                "progress",

                (item)=>{


                    this.progress =
                        item.progress;



                    this.emit(

                        "progress",

                        this.progress

                    );


                }

            );





            await RenderQueue.start();





            this.status =
                "complete";



            this.progress =
                100;



            this.emit(
                "complete"
            );



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







    async download(
        url,
        filename="clip.mp4"
    ){



        const link =
        document.createElement(
            "a"
        );



        link.href =
            url;



        link.download =
            filename;



        link.click();



    },







    cancel(){



        if(
            window.RenderQueue
        ){


            RenderQueue.cancel();


        }



        this.status =
            "cancelled";



    },







    getStatus(){


        return {


            status:
            this.status,


            progress:
            this.progress



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



window.ExportController =
    ExportController;
