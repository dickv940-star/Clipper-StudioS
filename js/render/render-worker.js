/*
=========================================
ClipperStudio
Render Worker
Version : 1.0

Background Rendering Thread

=========================================
*/


let canvas = null;

let ctx = null;


let settings = {


    width:1080,


    height:1920,


    fps:30


};





self.onmessage = async function(event){



    const data =
        event.data;



    switch(
        data.type
    ){



        case "init":


            initWorker(
                data.settings
            );


        break;






        case "render":


            await renderFrame(
                data.frame
            );


        break;






        case "batch":


            await renderBatch(
                data.frames
            );


        break;






        case "reset":


            reset();


        break;



    }



};









function initWorker(
    config={}
){



    Object.assign(

        settings,

        config

    );



    canvas =

    new OffscreenCanvas(

        settings.width,

        settings.height

    );



    ctx =

    canvas.getContext(

        "2d"

    );





    self.postMessage({

        type:"ready"


    });



}









async function renderFrame(
    frame
){



    if(
        !ctx
    )
        return;





    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );






    /*
    ==========================
    DRAW FRAME
    ==========================
    */



    if(
        frame.image
    ){



        ctx.drawImage(

            frame.image,

            0,

            0,

            canvas.width,

            canvas.height

        );



    }






    /*
    ==========================
    APPLY EFFECT
    ==========================
    */


    applyEffect(
        frame.effect
    );






    const bitmap =

    canvas.transferToImageBitmap();






    self.postMessage({

        type:"frame",

        bitmap

    },

    [

        bitmap

    ]);



}









async function renderBatch(
    frames
){



    let result=[];





    for(
        let i=0;

        i<frames.length;

        i++
    ){



        await renderFrame(

            frames[i]

        );





        result.push({

            frame:i,


            status:"done"


        });



        self.postMessage({

            type:"progress",

            value:

            (

            i+1

            )

            /

            frames.length



        });



    }






    self.postMessage({

        type:"complete",

        result


    });



}









function applyEffect(
    effect
){



    if(
        !effect
    )
        return;






    if(
        effect.blur
    ){


        ctx.filter =

        `blur(${effect.blur}px)`;


    }







    if(
        effect.opacity
    ){



        ctx.globalAlpha =

        effect.opacity;


    }





}









function reset(){



    if(ctx){



        ctx.clearRect(

            0,

            0,

            canvas.width,

            canvas.height

        );


    }



}
