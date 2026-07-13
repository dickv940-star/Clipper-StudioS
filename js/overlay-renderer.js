/*
=========================================
ClipperStudio
Overlay Renderer
Version : 1.0

Video Layer Overlay Controller

=========================================
*/


const OverlayRenderer = {


    canvas:null,


    ctx:null,


    layers:[],


    callbacks:{},





    init(
        canvas="previewCanvas"
    ){



        if(
            typeof canvas==="string"
        ){


            this.canvas=

            document.getElementById(
                canvas
            );


        }
        else{


            this.canvas =
            canvas;


        }





        if(this.canvas){



            this.ctx=

            this.canvas.getContext(
                "2d"
            );


        }





        this.layers=[];



        console.log(

            "Overlay Renderer Ready"

        );



    },









    add(
        layer
    ){



        const item={


            id:

            Date.now(),



            type:

            layer.type || "text",



            x:

            layer.x || 0,



            y:

            layer.y || 0,



            visible:

            true,



            data:

            layer.data || {}



        };





        this.layers.push(

            item

        );





        this.emit(

            "add",

            item

        );





        return item.id;



    },









    remove(
        id
    ){



        this.layers =

        this.layers.filter(

            layer=>

            layer.id!==id

        );



    },









    clear(){



        this.layers=[];



    },









    render(){



        if(
            !this.ctx
        )
            return;





        this.layers.forEach(

            layer=>{



                if(
                    layer.visible
                ){


                    this.drawLayer(
                        layer
                    );


                }



            }

        );



    },









    drawLayer(
        layer
    ){



        switch(

            layer.type

        ){



            case "text":


                this.drawText(
                    layer
                );


                break;




            case "image":


                this.drawImage(
                    layer
                );


                break;




            case "logo":


                this.drawImage(
                    layer
                );


                break;




            case "progress":


                this.drawProgress(
                    layer
                );


                break;



        }



    },









    drawText(
        layer
    ){



        const ctx =
        this.ctx;



        const data =
        layer.data;





        ctx.save();





        ctx.font =

        data.font ||

        "48px Arial";





        ctx.fillStyle =

        data.color ||

        "white";





        ctx.textAlign =

        data.align ||

        "center";





        ctx.fillText(

            data.text || "",

            layer.x,

            layer.y

        );





        ctx.restore();



    },









    drawImage(
        layer
    ){



        const img =

        new Image();



        img.src =

        layer.data.src;





        img.onload=()=>{


            this.ctx.drawImage(

                img,

                layer.x,

                layer.y,

                layer.data.width ||

                100,


                layer.data.height ||

                100


            );


        };



    },









    drawProgress(
        layer
    ){



        const ctx =
        this.ctx;



        const data =
        layer.data;





        ctx.fillStyle =

        data.background ||

        "rgba(255,255,255,.3)";





        ctx.fillRect(

            layer.x,

            layer.y,

            data.width,

            data.height

        );





        ctx.fillStyle =

        data.color ||

        "#ffffff";





        ctx.fillRect(

            layer.x,

            layer.y,

            data.progress *

            data.width,


            data.height

        );



    },









    update(
        id,
        data
    ){



        const layer =

        this.layers.find(

            item=>

            item.id===id

        );





        if(layer){



            Object.assign(

                layer,

                data

            );



        }



    },









    getLayers(){



        return this.layers;


    },









    show(
        id
    ){



        const layer =

        this.layers.find(

            item=>

            item.id===id

        );



        if(layer)

            layer.visible=true;



    },









    hide(
        id
    ){



        const layer =

        this.layers.find(

            item=>

            item.id===id

        );



        if(layer)

            layer.visible=false;



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



window.OverlayRenderer =
    OverlayRenderer;
