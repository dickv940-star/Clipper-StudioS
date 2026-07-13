/*
================================================

ClipperStudio
Undo Engine

Version : 3.2

History Controller

================================================
*/


(function(){

"use strict";



if(window.Undo){

    console.warn(
        "Undo already loaded"
    );

    return;

}





const Undo = {



    stack:[],


    position:-1,


    maxHistory:100,


    callbacks:{},





    init(){


        this.stack=[];


        this.position=-1;



        console.log(
            "Undo Engine Ready"
        );


    },









    add(action){



        if(!action){

            return;

        }





        // hapus redo history

        this.stack =

        this.stack.slice(

            0,

            this.position + 1

        );





        this.stack.push(action);





        if(
            this.stack.length >
            this.maxHistory
        ){


            this.stack.shift();


        }



        this.position =

        this.stack.length - 1;





        this.emit(

            "change",

            this.status()

        );



    },









    execute(){



        if(
            this.position < 0
        ){


            console.warn(
                "Tidak ada history undo"
            );


            return false;


        }





        const action =

        this.stack[

            this.position

        ];





        if(
            action.undo
        ){


            action.undo();


        }





        this.position--;





        this.emit(

            "undo",

            action

        );



        return true;



    },









    redo(){



        if(

            this.position >=

            this.stack.length - 1

        ){


            console.warn(
                "Tidak ada redo"
            );


            return false;


        }






        this.position++;





        const action =

        this.stack[

            this.position

        ];





        if(
            action.redo
        ){


            action.redo();


        }





        this.emit(

            "redo",

            action

        );



        return true;



    },









    clear(){


        this.stack=[];


        this.position=-1;



        this.emit(
            "clear"
        );


    },









    canUndo(){


        return (

            this.position >=0

        );


    },









    canRedo(){


        return (

            this.position <

            this.stack.length - 1

        );


    },









    status(){


        return {


            total:

            this.stack.length,


            position:

            this.position,


            undo:

            this.canUndo(),


            redo:

            this.canRedo()


        };


    },









    on(
        event,
        callback
    ){


        this.callbacks[event]=callback;


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







window.Undo = Undo;



console.log(
"Undo Engine Loaded"
);



})();
