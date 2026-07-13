/*
=========================================
ClipperStudio
AI Highlight Engine
Version : 1.0

Menggabungkan semua analisis AI

Scene
Motion
Face
Subtitle

Output:
Best Clip Recommendation

=========================================
*/


const HighlightEngine = {


    weights:{


        scene:0.25,


        motion:0.35,


        face:0.20,


        subtitle:0.20


    },





    init(){


        console.log(
            "HighlightEngine Ready"
        );


    },






    analyze(data){



        if(!data){

            throw new Error(
                "Data AI kosong"
            );

        }




        const duration =
            data.duration || 0;




        const interval =
            data.interval || 5;




        let highlights=[];




        for(
            let time=0;
            time < duration;
            time += interval
        ){



            const score =
                this.calculateScore(
                    time,
                    data
                );



            highlights.push({


                start:time,


                end:
                    time + interval,


                score:score,


                level:
                    this.level(score)



            });



        }





        return {


            total:
                highlights.length,


            clips:
                highlights.sort(
                    (a,b)=>
                    b.score-a.score
                )



        };



    },









    calculateScore(
        time,
        data
    ){



        let score=0;




        const scene =
            this.findScore(
                data.scenes,
                time
            );



        const motion =
            this.findScore(
                data.motion,
                time
            );



        const face =
            this.findFace(
                data.faces,
                time
            );



        const subtitle =
            this.findSubtitle(
                data.subtitle,
                time
            );





        score +=
            scene *
            this.weights.scene;



        score +=
            motion *
            this.weights.motion;



        score +=
            face *
            this.weights.face;



        score +=
            subtitle *
            this.weights.subtitle;




        return Math.round(score);



    },







    findScore(
        list,
        time
    ){



        if(!list){

            return 0;

        }



        let closest =
            list.find(
                item =>
                Math.abs(
                    item.time-time
                ) < 2
            );



        if(!closest){

            return 0;

        }




        return Math.min(
            closest.score,
            100
        );



    },








    findFace(
        list,
        time
    ){



        if(!list){

            return 0;

        }



        const item =
            list.find(
                x =>
                Math.abs(
                    x.time-time
                ) < 2
            );



        if(
            item &&
            item.count > 0
        ){

            return 80;

        }



        return 0;



    },








    findSubtitle(
        list,
        time
    ){



        if(!list){

            return 0;

        }




        const item =
            list.find(
                x =>
                time >= x.start &&
                time <= x.end
            );



        if(item){

            return 70;

        }



        return 0;



    },







    level(score){



        if(score >=80){

            return "excellent";

        }



        if(score >=60){

            return "good";

        }



        if(score >=40){

            return "normal";

        }



        return "low";


    }







};



window.HighlightEngine =
    HighlightEngine;
