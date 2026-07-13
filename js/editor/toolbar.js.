/*
=========================================
ClipperStudio
Toolbar Engine
Version : 1.0

Editor Command Controller

=========================================
*/


const Toolbar = {


    container:null,


    buttons:{},


    callbacks:{},





    init(containerId){


        this.container =
            document.getElementById(
                containerId
            );



        if(!this.container){


            console.error(
                "Toolbar container tidak ditemukan"
            );


            return;


        }



        this.create();


        console.log(
            "Toolbar Ready"
        );


    },







    create(){



        const tools=[


            {
                id:"select",
                label:"Select"
            },


            {
                id:"split",
                label:"Split"
            },


            {
                id:"trim",
                label:"Trim"
            },


            {
                id:"delete",
                label:"Delete"
            },


            {
                id:"undo",
                label:"Undo"
            },


            {
                id:"redo",
                label:"Redo"
            },


            {
                id:"subtitle",
                label:"Subtitle"
            },


            {
                id:"effect",
                label:"Effect"
            }


        ];





        tools.forEach(
            tool=>{


                const button =
                    document.createElement(
                        "button"
                    );



                button.innerText =
                    tool.label;



                button.dataset.action =
                    tool.id;



                button.onclick =
                ()=>{


                    this.execute(
                        tool.id
                    );


                };



                this.container.appendChild(
                    button
                );



                this.buttons[
                    tool.id
                ] =
                    button;



            }

        );



    },







    execute(
        action
    ){



        console.log(
            "Toolbar:",
            action
        );



        this.emit(
            action
        );


    },







    enable(
        action
    ){



        if(
            this.buttons[action]
        ){


            this.buttons[action]
                .disabled=false;


        }



    },







    disable(
        action
    ){



        if(
            this.buttons[action]
        ){


            this.buttons[action]
                .disabled=true;


        }


    },







    on(
        action,
        callback
    ){



        this.callbacks[action]=
            callback;



    },







    emit(
        action,
        data
    ){



        if(
            this.callbacks[action]
        ){


            this.callbacks[action](
                data
            );


        }



    }




};



window.Toolbar =
    Toolbar;
