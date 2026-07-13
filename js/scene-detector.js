/*
=========================================
ClipperStudio
AI Scene Detector
Version : 1.0

Detect perubahan scene berdasarkan
perbedaan frame video.

=========================================
*/


const SceneDetector = {


    threshold: 25,


    interval: 1,

    canvas: null,

    ctx: null,



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
            "SceneDetector Ready"
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


        video.muted = true;

        video.playsInline = true;



        await new Promise(
            resolve => {

                video.onloadedmetadata =
                    resolve;

            }
        );



        const duration =
            video.duration;



        this.canvas.width =
            video.videoWidth;



        this.canvas.height =
            video.videoHeight;




        let scenes = [];

        let previousFrame = null;



        for(
            let time = 0;
            time < duration;
            time += interval
        ){



            const frame =
                await this.getFrame(
                    video,
                    time
                );



            if(previousFrame){



                const difference =
                    this.compareFrames(
                        previousFrame,
                        frame
                    );



                if(
                    difference >= threshold
                ){


                    scenes.push({

                        time:time,

                        score:
                            difference,

                        type:
                            "scene-change"

                    });


                }


            }



            previousFrame =
                frame;



        }



        return {


            duration:duration,


            total:
                scenes.length,


            scenes:scenes


        };



    },




    getFrame(video,time){


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



                    const image =
                        this.ctx.getImageData(

                            0,

                            0,

                            this.canvas.width,

                            this.canvas.height

                        );



                    resolve(image);



                };



            }
        );


    },





    compareFrames(
        frameA,
        frameB
    ){


        const dataA =
            frameA.data;


        const dataB =
            frameB.data;



        let total = 0;



        const length =
            dataA.length;



        for(
            let i=0;
            i<length;
            i+=4
        ){



            const r =
                Math.abs(
                    dataA[i]
                    -
                    dataB[i]
                );



            const g =
                Math.abs(
                    dataA[i+1]
                    -
                    dataB[i+1]
                );



            const b =
                Math.abs(
                    dataA[i+2]
                    -
                    dataB[i+2]
                );



            total +=
                (r+g+b)/3;



        }



        return (
            total /
            (length/4)
        );



    }



};



window.SceneDetector =
    SceneDetector;
