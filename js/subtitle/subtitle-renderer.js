/*
=========================================
ClipperStudio
Subtitle Renderer
Version : 1.0

Subtitle Visual Renderer

=========================================
*/


const SubtitleRenderer = {


    container:null,


    element:null,


    enabled:true,


    current:null,



    style:null,



    callbacks:{},





    init(
        containerId
    ){



        this.container =
            document.getElementById(
                containerId
            );



        if(!this.container){


            console.error(
                "Subtitle container tidak ditemukan"
            );


            return;


        }





        this.element =
            document.createElement(
                "div"
            );



        this.element.className =
            "subtitle-overlay";



        this.element.style.position =
            "absolute";



        this.element.style.left =
            "50%";



        this.element.style.transform =
            "translateX(-50%)";



        this.element.style.textAlign =
            "center";



        this.element.style.pointerEvents =
            "none";



        this.container.appendChild(
            this.element
        );



        this.style =
            SubtitleStyle.get();



        this.applyStyle();



        console.log(
            "Subtitle Renderer Ready"
        );


    },







    update(
        time
    ){



        if(
            !this.enabled
        )
            return;




        const subtitles =

            SubtitleManager.getActive(
                time
            );




        if(
            subtitles.length===0
        ){



            this.hide();



            return;


        }






        const subtitle =
            subtitles[0];



        if(
            this.current &&
            this.current.id === subtitle.id
        ){


            return;


        }



        this.current =
            subtitle;



        this.render(
            subtitle
        );


    },







    render(
        subtitle
    ){



        if(!this.element)
            return;




        this.element.innerText =
            subtitle.text;



        this.show();



        this.emit(
            "render",
            subtitle
        );


    },







    hide(){



        if(this.element){


            this.element.style.display =
                "none";


        }


    },







    show(){



        if(this.element){


            this.element.style.display =
                "block";


        }


    },







    setStyle(
        style
    ){



        this.style =
            style;



        this.applyStyle();


    },







    applyStyle(){



        if(
            !this.element ||
            !this.style
        )
            return;




        this.element.style.fontFamily =
            this.style.font;



        this.element.style.fontSize =

            this.style.size +

            "px";



        this.element.style.color =
            this.style.color;



        this.element.style.background =
            this.style.background;



        this.element.style.padding =
            "8px 16px";



        this.element.style.borderRadius =
            "8px";



        this.element.style.textShadow =
            this.style.shadow

            ?

            "2px 2px 5px black"

            :

            "none";





        if(
            this.style.position==="center"
        ){


            this.element.style.top =
                "45%";


        }
        else{


            this.element.style.bottom =
                "10%";


        }



    },







    enable(){



        this.enabled=true;


    },







    disable(){



        this.enabled=false;


        this.hide();


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



window.SubtitleRenderer =
    SubtitleRenderer;
