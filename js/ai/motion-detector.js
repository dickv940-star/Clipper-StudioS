/*
=========================================
ClipperStudio
AI Motion Detector
Version : 1.0

Detect pergerakan video berdasarkan
perubahan pixel antar frame.

=========================================
*/


const MotionDetector = {


    interval: 0.5,


    threshold: 15,


    canvas:null,


    ctx:null,




    init(){


        this.canvas =
            document.createElement(
                "canvas"
            );


        this.ctx =
            this.canvas.getContext(
                "2d",
                {
                    willReadFrequently:true
                }
            );



        console.log(
            "MotionDetector Ready"
        );


    },





    async analyze(
        videoData,
        options={}
    ){


        if(!this.canvas){

            this.init();

        }



        const interval =
            options.interval ||
            this.interval;



        const threshold =
            options.threshold ||
            this.threshold;




        const video =
            document.createElement(
                "video"
            );



        video.src =
            videoData.url;



        video.muted=true;


        video.playsInline=true;




        await new Promise(
            resolve=>{

                video.onloadedmetadata =
                    resolve;

            }
        );




        this.canvas.width =
            video.videoWidth;



        this.canvas.height =
            video.videoHeight;




        let previous = null;



        let motions = [];



        for(
            let time=0;
            time < video.duration;
            time += interval
        ){



            const frame =
                await this.getFrame(
                    video,
                    time
                );



            if(previous){



                const score =
                    this.compare(
                        previous,
                        frame
                    );



                motions.push({

                    time:time,

                    score:
                        score,

                    level:
                        this.level(score)

                });



            }



            previous =
                frame;



        }



        return {


            duration:
                video.duration,


            samples:
                motions.length,


            motions:
                motions,


            average:
                this.average(
                    motions
                )


        };



    },





    getFrame(
        video,
        time
    ){


        return new Promise(
            resolve=>{


                video.currentTime =
                    time;



                video.onseeked =
                ()=>{


                    this.ctx.drawImage(

                        video,

                        0,

                        0,

                        this.canvas.width,

                        this.canvas.height

                    );



                    resolve(

                        this.ctx.getImageData(

                            0,

                            0,

                            this.canvas.width,

                            this.canvas.height

                        )

                    );



                };


            }
        );

    },






    compare(
        frameA,
        frameB
    ){



        const a =
            frameA.data;



        const b =
            frameB.data;



        let diff=0;



        let count=0;




        for(
            let i=0;
            i<a.length;
            i+=16
        ){



            diff += Math.abs(
                a[i]-b[i]
            );



            diff += Math.abs(
                a[i+1]-b[i+1]
            );



            diff += Math.abs(
                a[i+2]-b[i+2]
            );



            count++;


        }




        return (
            diff /
            count /
            3
        );



    },







    level(score){



        if(
            score < 10
        ){

            return "low";

        }



        if(
            score < 30
        ){

            return "medium";

        }



        return "high";


    },







    average(data){



        if(
            data.length===0
        ){

            return 0;

        }



        let total=0;



        data.forEach(
            item=>{

                total += item.score;

            }
        );



        return (
            total /
            data.length
        );


    }



};



window.MotionDetector =
    MotionDetector;
