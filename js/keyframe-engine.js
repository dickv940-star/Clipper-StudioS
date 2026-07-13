/*
=========================================
ClipperStudio
Keyframe Engine
Version : 1.0

Animation Controller

=========================================
*/


const KeyframeEngine = {


    objects:{},


    callbacks:{},





    init(){



        this.objects={};



        console.log(

            "Keyframe Engine Ready"

        );



    },









    create(
        id
    ){



        this.objects[id]={


            id,


            keyframes:[],



            current:{


                x:0,


                y:0,


                scale:1,


                rotation:0,


                opacity:1


            }



        };





        return this.objects[id];



    },









    add(
        id,
        time,
        properties
    ){



        if(
            !this.objects[id]
        ){



            this.create(id);



        }




        this.objects[id]

        .keyframes

        .push({


            time,


            properties



        });





        this.objects[id]

        .keyframes

        .sort(

            (a,b)=>

            a.time-b.time

        );




    },









    remove(
        id,
        time
    ){



        if(
            !this.objects[id]
        )
            return;





        this.objects[id]

        .keyframes =

        this.objects[id]

        .keyframes

        .filter(

            frame=>

            frame.time!==time

        );



    },









    update(
        id,
        time
    ){



        const object =

        this.objects[id];




        if(
            !object
        )
            return null;





        const frames =

        object.keyframes;





        if(
            frames.length===0
        )
            return object.current;





        let previous =
            frames[0];



        let next =
            frames[frames.length-1];





        for(
            let i=0;

            i<frames.length-1;

            i++
        ){


            if(

                time >= frames[i].time &&

                time <= frames[i+1].time

            ){


                previous =
                    frames[i];


                next =
                    frames[i+1];


                break;


            }


        }







        const duration =

        next.time -

        previous.time;





        let progress =

        duration===0

        ?

        0

        :

        (

        time -

        previous.time

        )

        /

        duration;







        progress = Math.max(

            0,

            Math.min(

                1,

                progress

            )

        );







        object.current =

        this.interpolate(

            previous.properties,

            next.properties,

            progress

        );






        this.emit(

            "update",

            object

        );





        return object.current;



    },









    interpolate(
        a,
        b,
        t
    ){



        const result={};




        const keys =

        new Set(

            [

            ...

            Object.keys(a),

            ...

            Object.keys(b)

            ]

        );





        keys.forEach(

            key=>{



                const start =
                    a[key] ?? 0;



                const end =
                    b[key] ?? start;





                result[key]=

                start +

                (

                end-start

                )

                *

                t;



            }

        );





        return result;



    },









    get(
        id
    ){



        return this.objects[id]

        ?

        this.objects[id].current

        :

        null;



    },









    clear(
        id
    ){



        delete this.objects[id];



    },









    reset(){



        this.objects={};



    },









    list(){



        return Object.keys(

            this.objects

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



window.KeyframeEngine =
    KeyframeEngine;
