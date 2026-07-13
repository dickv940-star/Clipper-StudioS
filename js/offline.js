/*
=========================================
ClipperStudio
Offline Manager
Version : 1.0

PWA Offline Controller

=========================================
*/


const OfflineManager = {


    online:true,


    storageKey:
    "clipper_offline_project",


    callbacks:{},





    init(){


        this.online =
            navigator.onLine;



        this.bind();



        console.log(
            "Offline Manager Ready",
            this.online
        );



        this.emit(

            "status",

            this.online

        );


    },







    bind(){



        window.addEventListener(

            "online",

            ()=>{


                this.online=true;


                console.log(
                    "Internet Connected"
                );



                this.emit(

                    "online"

                );



                this.sync();



            }

        );







        window.addEventListener(

            "offline",

            ()=>{


                this.online=false;



                console.log(
                    "Offline Mode"
                );



                this.emit(

                    "offline"

                );



            }

        );



    },







    isOnline(){


        return this.online;


    },







    save(
        data
    ){



        try{


            localStorage.setItem(

                this.storageKey,

                JSON.stringify(
                    data
                )

            );



            console.log(
                "Project tersimpan offline"
            );



        }


        catch(error){



            console.error(
                "Offline save gagal",
                error
            );


        }



    },







    load(){



        const data =

            localStorage.getItem(

                this.storageKey

            );



        if(!data)
            return null;



        return JSON.parse(
            data
        );


    },







    clear(){



        localStorage.removeItem(

            this.storageKey

        );



    },







    async sync(){



        const project =
            this.load();



        if(
            !project
        )
            return;



        console.log(

            "Sync project offline",

            project

        );



        /*
        Nanti bisa dikirim
        ke cloud/server
        */


        this.emit(

            "sync",

            project

        );


    },







    registerServiceWorker(){



        if(
            "serviceWorker"
            in navigator
        ){



            navigator.serviceWorker

            .register(
                "sw.js"
            )

            .then(()=>{


                console.log(

                    "Service Worker aktif"

                );


            })

            .catch(error=>{


                console.error(

                    "SW Error",

                    error

                );


            });



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



window.OfflineManager =
    OfflineManager;
