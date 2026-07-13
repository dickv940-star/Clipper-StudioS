/*
=========================================
ClipperStudio
AI Clip Generator
Version : 1.0

Generate automatic clips
from AI highlights

=========================================
*/


const ClipGenerator = {


    defaultDuration:30,


    minScore:60,




    init(){


        console.log(
            "ClipGenerator Ready"
        );


    },





    generate(
        highlightData,
        options={}
    ){


        if(!highlightData){

            throw new Error(
                "Highlight data kosong"
            );

        }




        const duration =
            options.duration ||
            this.defaultDuration;



        const minScore =
            options.minScore ||
            this.minScore;



        let clips=[];



        highlightData.clips.forEach(
            item=>{



                if(
                    item.score >= minScore
                ){


                    clips.push(

                        this.createClip(

                            item,

                            duration

                        )

                    );


                }



            }

        );





        return {


            total:
                clips.length,


            clips:
                this.optimize(
                    clips
                )



        };



    },







    createClip(
        highlight,
        duration
    ){



        const center =
            (
                highlight.start +
                highlight.end
            ) / 2;



        let start =
            center -
            duration / 2;



        let end =
            center +
            duration / 2;




        if(start < 0){

            start = 0;

            end = duration;

        }




        return {


            id:
            "clip_" +
            Date.now() +
            "_" +
            Math.floor(
                Math.random()*999
            ),



            start:
                Math.round(start),



            end:
                Math.round(end),



            duration:
                duration,



            score:
                highlight.score,



            level:
                highlight.level,



            status:
                "ready"



        };



    },








    optimize(
        clips
    ){



        clips.sort(
            (a,b)=>
            b.score-a.score
        );



        let result=[];



        clips.forEach(
            clip=>{


                const duplicate =
                    result.some(
                        item=>{


                            return (

                                Math.abs(
                                    item.start -
                                    clip.start
                                )
                                < 5

                            );


                        }
                    );



                if(!duplicate){

                    result.push(
                        clip
                    );

                }



            }

        );



        return result;



    },







    limit(
        clips,
        max=10
    ){


        return clips.slice(
            0,
            max
        );


    }







};



window.ClipGenerator =
    ClipGenerator;
