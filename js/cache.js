/*
=========================================
ClipperStudio
Cache Manager
Version : 1.0

Temporary Data Storage Controller

=========================================
*/


const CacheManager = {


    prefix:
    "clipper_cache_",


    memory:{},


    callbacks:{},





    init(){


        this.memory={};



        console.log(
            "Cache Manager Ready"
        );


    },







    key(
        name
    ){



        return (

            this.prefix +

            name

        );


    },







    set(
        name,
        data
    ){



        try{


            const value =

                JSON.stringify(
                    data
                );



            localStorage.setItem(

                this.key(name),

                value

            );



            this.memory[name]=
                data;



            this.emit(

                "saved",

                {

                    name,

                    data

                }

            );



        }

        catch(error){



            console.error(

                "Cache save error",

                error

            );


        }



    },







    get(
        name
    ){



        if(
            this.memory[name]
        ){


            return this.memory[name];


        }






        const data =

        localStorage.getItem(

            this.key(name)

        );



        if(!data)
            return null;



        try{


            const result =

                JSON.parse(
                    data
                );



            this.memory[name]=
                result;



            return result;



        }

        catch(error){


            return null;


        }



    },







    remove(
        name
    ){



        localStorage.removeItem(

            this.key(name)

        );



        delete this.memory[name];



    },







    clear(){



        Object.keys(

            localStorage

        )

        .forEach(

            key=>{


                if(

                    key.startsWith(
                        this.prefix
                    )

                ){


                    localStorage.removeItem(
                        key
                    );


                }


            }

        );



        this.memory={};



    },







    has(
        name
    ){



        return !!this.get(
            name
        );


    },







    saveVideoMeta(
        meta
    ){



        this.set(

            "video_meta",

            meta

        );


    },







    getVideoMeta(){



        return this.get(
            "video_meta"
        );


    },







    saveThumbnail(
        image
    ){



        this.set(

            "thumbnail",

            image

        );


    },







    getThumbnail(){



        return this.get(
            "thumbnail"
        );


    },







    saveAIResult(
        data
    ){



        this.set(

            "ai_result",

            data

        );


    },







    getAIResult(){



        return this.get(

            "ai_result"

        );


    },







    saveTimeline(
        data
    ){



        this.set(

            "timeline",

            data

        );


    },







    getTimeline(){



        return this.get(

            "timeline"

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



window.CacheManager =
    CacheManager;
