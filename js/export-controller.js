/*
=========================================
ClipperStudio
Export Controller
Version : 1.0

Export UI Controller

=========================================
*/


const ExportController = {


    project:null,


    elements:{},


    settings:{


        format:"mp4",


        quality:"1080p",


        fps:30


    },



    callbacks:{},





    init(){



        this.cacheElements();


        this.bindEvents();





        if(
            window.ExportManager
        ){



            ExportManager.init();



            this.listenExport();



        }





        console.log(

            "Export Controller Ready"

        );



    },









    cacheElements(){



        this.elements={



            button:

            document.getElementById(

                "exportButton"

            ),




            format:

            document.getElementById(

                "exportFormat"

            ),




            quality:

            document.getElementById(

                "exportQuality"

            ),




            fps:

            document.getElementById(

                "exportFPS"

            ),




            progress:

            document.getElementById(

                "exportProgress"

            ),




            status:

            document.getElementById(

                "exportStatus"

            )



        };



    },









    bindEvents(){



        if(
            this.elements.button
        ){



            this.elements.button

            .addEventListener(

                "click",

                ()=>{


                    this.start();


                }


            );



        }






        if(
            this.elements.format
        ){


            this.elements.format

            .addEventListener(

                "change",

                e=>{


                    this.settings.format =

                    e.target.value;


                }


            );


        }








        if(
            this.elements.quality
        ){


            this.elements.quality

            .addEventListener(

                "change",

                e=>{


                    this.settings.quality =

                    e.target.value;


                }


            );


        }








        if(
            this.elements.fps
        ){


            this.elements.fps

            .addEventListener(

                "change",

                e=>{


                    this.settings.fps =

                    Number(

                        e.target.value

                    );



                }


            );


        }



    },









    setProject(
        project
    ){



        this.project =
            project;



    },









    async start(){



        if(
            !this.project
        ){



            this.status(

                "Project belum tersedia"

            );


            return;


        }






        this.status(

            "Preparing export..."

        );





        ExportManager.configure(

            this.settings

        );





        await ExportManager.start(

            this.project

        );



    },









    listenExport(){



        ExportManager.on(

            "start",

            ()=>{


                this.status(

                    "Rendering..."

                );


            }

        );









        ExportManager.on(

            "progress",

            value=>{


                this.updateProgress(

                    value

                );


            }

        );









        ExportManager.on(

            "complete",

            ()=>{


                this.status(

                    "Export selesai"

                );



            }

        );









        ExportManager.on(

            "error",

            error=>{


                this.status(

                    "Error: "+error.message

                );


            }

        );



    },









    updateProgress(
        value
    ){



        if(
            this.elements.progress
        ){



            this.elements.progress.value =

            value * 100;



        }



    },









    status(
        text
    ){



        if(
            this.elements.status
        ){



            this.elements.status.textContent =

            text;



        }



        this.emit(

            "status",

            text

        );



    },









    cancel(){



        if(
            window.ExportManager
        ){


            ExportManager.cancel();


        }



    },









    download(){



        if(
            window.ExportManager
        ){


            ExportManager.download();


        }



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
