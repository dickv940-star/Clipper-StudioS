/*
=========================================
ClipperStudio
Redo Engine
Version : 1.0

Editor Redo Controller

=========================================
*/


const Redo = {


    stack:[],


    limit:50,


    callbacks:{},





    init(){


        this.stack=[];


        console.log(
            "Redo Engine Ready"
        );


    },







    push(
        action
    ){



        if(!action)
            return;



        this.stack.push(
            this.clone(action)
        );



        if(
            this.stack.length >
            this.limit
        ){


            this.stack.shift();


        }



        this.emit(
            "push",
            action
        );


    },







    execute(){



        if(
            this.stack.length===0
        ){



            console.warn(
                "Tidak ada redo"
            );



            return null;


        }





        const action =
            this.stack.pop();



        this.emit(
            "redo",
            action
        );



        return action;


    },







    clear(){



        this.stack=[];


    },







    canRedo(){



        return (

            this.stack.length > 0

        );


    },







    clone(
        data
    ){



        return JSON.parse(

            JSON.stringify(
                data
            )

        );


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



window.Redo =
    Redo;
