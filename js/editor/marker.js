/*
=========================================
ClipperStudio
Marker Engine
Version : 1.0

Timeline Marker Manager

=========================================
*/


const Marker = {


    markers:[],




    init(){


        this.markers=[];


        console.log(
            "Marker Engine Ready"
        );


    },







    create(options={}){


        return {


            id:

            options.id ||

            (
                "marker_" +

                Date.now() +

                "_" +

                Math.floor(
                    Math.random()*999
                )
            ),



            time:

            options.time || 0,



            type:

            options.type ||

            "custom",



            label:

            options.label ||

            "Marker",



            color:

            options.color ||

            "#FFD600",



            data:

            options.data || null



        };


    },








    add(marker){



        this.markers.push(
            marker
        );



        this.sort();



        return marker;


    },







    remove(id){



        this.markers =

            this.markers.filter(

                marker =>

                marker.id !== id

            );


    },







    get(id){



        return this.markers.find(

            marker =>

            marker.id === id

        );


    },







    getByTime(
        time,
        range=1
    ){



        return this.markers.filter(

            marker =>

            Math.abs(
                marker.time-time
            )
            <= range

        );


    },







    getByType(
        type
    ){



        return this.markers.filter(

            marker =>

            marker.type === type

        );


    },







    sort(){



        this.markers.sort(

            (a,b)=>

            a.time-b.time

        );


    },







    clear(){



        this.markers=[];


    },







    loadFromAI(
        data
    ){



        if(!data)
            return;



        /*
        Scene Detector
        */


        if(
            data.scenes
        ){


            data.scenes.forEach(

                scene=>{


                    this.add(

                        this.create({

                            time:
                            scene.time,


                            type:
                            "scene",


                            label:
                            "Scene Change",


                            data:
                            scene


                        })

                    );


                }

            );


        }






        /*
        Highlight AI
        */


        if(
            data.highlights
        ){


            data.highlights.forEach(

                item=>{


                    this.add(

                        this.create({

                            time:
                            item.start,


                            type:
                            "highlight",


                            label:
                            "AI Highlight",


                            data:
                            item


                        })

                    );


                }

            );


        }


    }







};



window.Marker =
    Marker;
