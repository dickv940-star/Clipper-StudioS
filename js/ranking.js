/*
=========================================
ClipperStudio
AI Ranking Engine
Version : 1.0

Clip Quality Ranking System

=========================================
*/


const RankingEngine = {


    results:[],


    weights:{},


    callbacks:{},





    init(){


        this.results=[];



        this.weights={


            highlight:
            0.35,


            motion:
            0.20,


            face:
            0.15,


            scene:
            0.15,


            audio:
            0.15



        };



        console.log(
            "AI Ranking Engine Ready"
        );


    },







    setWeights(
        data
    ){



        Object.assign(

            this.weights,

            data

        );



    },







    calculate(
        item
    ){



        const score =


        (

            (item.highlight || 0)

            *

            this.weights.highlight


        )

        +


        (

            (item.motion || 0)

            *

            this.weights.motion


        )

        +


        (

            (item.face || 0)

            *

            this.weights.face


        )

        +


        (

            (item.scene || 0)

            *

            this.weights.scene


        )

        +


        (

            (item.audio || 0)

            *

            this.weights.audio


        );





        return Math.round(
            score
        );


    },







    rank(
        clips=[]
    ){



        this.results =



        clips.map(

            clip=>{


                return {


                    ...clip,


                    score:

                    this.calculate(
                        clip
                    )



                };


            }

        );





        this.results.sort(

            (a,b)=>

            b.score -

            a.score

        );





        this.emit(

            "ranked",

            this.results

        );



        return this.results;


    },







    top(
        count=5
    ){



        return this.results.slice(

            0,

            count

        );


    },







    getWinner(){



        return this.results[0] || null;


    },







    explain(
        clip
    ){



        if(!clip)
            return null;



        return {


            score:
            clip.score,



            reason:[


                clip.highlight>70

                ?

                "High Highlight"

                :

                null,



                clip.motion>70

                ?

                "Strong Movement"

                :

                null,



                clip.face>70

                ?

                "Face Detected"

                :

                null



            ].filter(Boolean)



        };


    },







    clear(){


        this.results=[];


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



window.RankingEngine =
    RankingEngine;
