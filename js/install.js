/*
=========================================
ClipperStudio
Install Manager
Version : 1.0

PWA Installation Controller

=========================================
*/


const InstallManager = {


    deferredPrompt:null,


    installed:false,


    callbacks:{},





    init(){



        console.log(
            "Install Manager Ready"
        );



        this.checkInstalled();


        this.listen();



    },







    listen(){



        window.addEventListener(

            "beforeinstallprompt",

            (event)=>{


                event.preventDefault();



                this.deferredPrompt =
                    event;



                console.log(

                    "PWA Install Available"

                );



                this.emit(

                    "available"

                );



            }

        );







        window.addEventListener(

            "appinstalled",

            ()=>{


                this.installed=true;



                console.log(

                    "ClipperStudio Installed"

                );



                this.emit(

                    "installed"

                );


            }

        );



    },







    checkInstalled(){



        if(

            window.matchMedia(

            "(display-mode: standalone)"

            ).matches

        ){



            this.installed=true;



        }



    },







    canInstall(){



        return (

            this.deferredPrompt !== null

        );


    },







    async install(){



        if(
            !this.deferredPrompt
        ){



            console.warn(

                "Install tidak tersedia"

            );



            return false;


        }






        this.deferredPrompt.prompt();





        const result =

        await this.deferredPrompt

        .userChoice;





        if(

            result.outcome === "accepted"

        ){



            console.log(

                "User install App"

            );



            this.emit(

                "accepted"

            );


        }

        else{


            console.log(

                "Install dibatalkan"

            );


            this.emit(

                "dismissed"

            );


        }





        this.deferredPrompt=null;



        return true;



    },







    isInstalled(){



        return this.installed;


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



window.InstallManager =
    InstallManager;
