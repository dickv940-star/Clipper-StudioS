/*
=========================================
ClipperStudio
AI Face Detector
Version : 1.0

Face detection engine.
Ready for MediaPipe / TensorFlow.js

=========================================
*/


const FaceDetector = {


    interval: 1,


    modelReady:false,


    faces:[],




    init(){


        console.log(
            "FaceDetector Ready"
        );


        /*
        Tempat loading model AI

        Contoh nanti:

        await faceModel.load();

        */


        this.modelReady = true;


    },






    async analyze(
        videoData,
        options={}
    ){


        if(!this.modelReady){

            this.init();

        }




        const interval =
            options.interval ||
            this.interval;




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



        let results=[];




        for(
            let time=0;
            time < video.duration;
            time += interval
        ){



            const frame =
                await this.captureFrame(
                    video,
                    time
                );



            const detection =
                await this.detect(
                    frame
                );



            results.push({

                time:time,

                faces:
                    detection.faces,

                count:
                    detection.count,

                score:
                    detection.score

            });


        }





        return {


            duration:
                video.duration,


            totalFrames:
                results.length,


            detections:
                results,


            averageFaces:
                this.average(
                    results
                )


        };


    },







    captureFrame(
        video,
        time
    ){


        return new Promise(
            resolve=>{


                video.currentTime =
                    time;



                video.onseeked =
                ()=>{


                    const canvas =
                        document.createElement(
                            "canvas"
                        );


                    canvas.width =
                        video.videoWidth;



                    canvas.height =
                        video.videoHeight;



                    const ctx =
                        canvas.getContext(
                            "2d"
                        );



                    ctx.drawImage(

                        video,

                        0,

                        0,

                        canvas.width,

                        canvas.height

                    );



                    resolve(canvas);


                };


            }
        );


    },







    async detect(canvas){



        /*
        Placeholder detector


        Nanti diganti:

        MediaPipe

        atau

        TensorFlow.js


        */


        return {


            count:0,


            score:0,


            faces:[]


        };


    },







    average(results){


        if(
            results.length===0
        ){

            return 0;

        }



        let total=0;



        results.forEach(
            item=>{

                total += item.count;

            }
        );



        return (
            total /
            results.length
        );


    }






};



window.FaceDetector =
    FaceDetector;
