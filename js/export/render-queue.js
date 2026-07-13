/*
=========================================
ClipperStudio
Render Queue
Version : 1.0

Export Render Job Manager

=========================================
*/


const RenderQueue = {


    jobs:[],


    current:null,


    running:false,


    callbacks:{},





    init(){


        this.jobs=[];


        this.current=null;


        this.running=false;



        console.log(
            "Render Queue Ready"
        );


    },







    add(
        job
    ){



        const item={


            id:

            "render_" +

            Date.now(),



            name:

            job.name ||

            "Export Video",



            data:

            job.data ||

            null,



            progress:

            0,



            status:

            "waiting",



            created:

            Date.now()



        };





        this.jobs.push(
            item
        );



        this.emit(
            "added",
            item
        );



        return item;


    },







    async start(){



        if(
            this.running
        )
            return;



        this.running=true;



        while(

            this.jobs.length>0

        ){



            const job =
            this.jobs.shift();



            this.current =
                job;



            await this.process(
                job
            );



        }



        this.running=false;



        this.current=null;



        this.emit(
            "complete"
        );


    },







    process(
        job
    ){



        return new Promise(

            resolve=>{


                job.status =
                    "rendering";



                this.emit(
                    "start",
                    job
                );





                let progress=0;





                const timer =

                setInterval(

                    ()=>{


                        progress +=5;



                        job.progress =
                            progress;



                        this.emit(

                            "progress",

                            job

                        );





                        if(
                            progress>=100
                        ){



                            clearInterval(
                                timer
                            );



                            job.status =
                                "complete";



                            this.emit(

                                "finished",

                                job

                            );



                            resolve();



                        }



                    },

                    200

                );



            }

        );


    },







    cancel(){



        if(
            this.current
        ){


            this.current.status =
                "cancelled";


        }



        this.jobs=[];



        this.running=false;



        this.emit(
            "cancel"
        );


    },







    clear(){



        this.jobs=[];



    },







    getCurrent(){


        return this.current;


    },







    getProgress(){



        if(
            !this.current
        )
            return 0;



        return this.current.progress;


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



window.RenderQueue =
    RenderQueue;
