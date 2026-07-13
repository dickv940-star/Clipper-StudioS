/*
=========================================
ClipperStudio
Subtitle Manager
Version : 1.0

Subtitle Timeline Controller

=========================================
*/


const SubtitleManager = {


    subtitles:[],


    active:null,


    language:"id",


    callbacks:{},





    init(){


        this.subtitles=[];


        this.active=null;



        console.log(
            "Subtitle Manager Ready"
        );


    },







    create(
        data={}
    ){



        return {


            id:

            "sub_" +

            Date.now() +

            "_" +

            Math.floor(
                Math.random()*999
            ),



            text:

            data.text ||

            "",



            start:

            data.start || 0,



            end:

            data.end || 3,



            language:

            data.language ||

            this.language,



            style:

            data.style ||

            {},



            confidence:

            data.confidence ||

            0



        };


    },







    add(
        subtitle
    ){



        this.subtitles.push(
            subtitle
        );



        this.sort();



        this.active =
            subtitle;



        this.emit(
            "added",
            subtitle
        );



        return subtitle;


    },







    remove(
        id
    ){



        this.subtitles =

        this.subtitles.filter(

            item=>

            item.id !== id

        );



    },







    update(
        id,
        data
    ){



        const sub =
        this.get(id);



        if(!sub)
            return null;



        Object.assign(

            sub,

            data

        );



        this.emit(
            "updated",
            sub
        );



        return sub;


    },







    get(
        id
    ){



        return this.subtitles.find(

            item=>

            item.id===id

        );


    },







    getActive(
        time
    ){



        return this.subtitles.filter(

            item=>


            time >= item.start &&

            time <= item.end



        );


    },







    setLanguage(
        lang
    ){



        this.language =
            lang;


    },







    translate(
        id,
        text,
        language
    ){



        const sub =
        this.get(id);



        if(!sub)
            return;



        sub.text =
            text;



        sub.language =
            language;



        this.emit(
            "translated",
            sub
        );


    },







    importAI(
        data
    ){



        if(
            !Array.isArray(data)
        )
            return;



        data.forEach(

            item=>{


                this.add(

                    this.create({

                        text:
                        item.text,


                        start:
                        item.start,


                        end:
                        item.end,


                        confidence:
                        item.confidence


                    })

                );


            }

        );



    },







    export(){



        return this.subtitles;


    },







    sort(){



        this.subtitles.sort(

            (a,b)=>

            a.start-b.start

        );


    },







    clear(){



        this.subtitles=[];


        this.active=null;


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



window.SubtitleManager =
    SubtitleManager;
