/*
================================================

ClipperStudio AI Editor

Application Bootstrap

Version : 3.2

================================================
*/


(function(){

"use strict";





const App = {



    version:"3.2",


    modules:{},


    started:false,







    async init(){



        if(this.started){

            console.warn(
                "ClipperStudio already started"
            );

            return;

        }





        console.log(
            "================================"
        );

        console.log(
            "ClipperStudio Starting..."
        );

        console.log(
            "Version:",
            this.version
        );

        console.log(
            "================================"
        );





        this.registerModules();





        await this.waitModules();





        this.startRouter();





        this.startEditor();





        this.started=true;





        console.log(
            "ClipperStudio Ready"
        );



    },









    registerModules(){



        const list=[


            "Router",


            "ProjectStorage",


            "Timeline",


            "Editor",


            "RenderPipeline",


            "RenderPreview",


            "EffectEngine",


            "AudioEngine",


            "ExportManager"



        ];






        list.forEach(

            name=>{


                this.modules[name]=

                window[name] || null;



                if(
                    this.modules[name]
                ){


                    console.log(

                        name,

                        "Loaded"

                    );


                }

                else{


                    console.warn(

                        name,

                        "Not Found"

                    );


                }



            }

        );



    },









    async waitModules(){



        let retry=0;



        while(

            !window.Editor &&

            retry < 20

        ){


            await new Promise(

                resolve=>

                setTimeout(

                    resolve,

                    100

                )

            );


            retry++;


        }




    },









    startRouter(){



        if(

            window.Router &&

            Router.init

        ){



            Router.init();



            console.log(

                "Router Started"

            );


        }



    },









    startEditor(){



        if(

            window.Editor &&

            Editor.init

        ){



            Editor.init();



            console.log(

                "Editor Started"

            );


        }

        else{


            console.error(

                "Editor module missing"

            );


        }



    },









    getModule(name){


        return this.modules[name];


    },









    status(){



        return {


            version:this.version,


            started:this.started,


            modules:this.modules



        };



    }




};







window.App = App;






window.addEventListener(

"DOMContentLoaded",

()=>{


    App.init();



}

);






})();
