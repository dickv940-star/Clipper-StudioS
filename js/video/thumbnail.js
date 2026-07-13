/*
=========================================
ClipperStudio
Thumbnail Generator
Version : 1.0
=========================================
*/


const Thumbnail = {


    async generate(videoData, time = 1) {


        return new Promise((resolve, reject) => {


            if (!videoData) {


                reject(
                    "Video tidak tersedia."
                );

                return;

            }



            const video = document.createElement("video");


            video.src = videoData.url;


            video.preload = "metadata";


            video.muted = true;


            video.playsInline = true;



            video.onloadedmetadata = () => {



                if (time > video.duration) {


                    time = video.duration / 2;


                }



                video.currentTime = time;



            };




            video.onseeked = () => {



                const canvas =
                    document.createElement("canvas");



                canvas.width =
                    video.videoWidth;



                canvas.height =
                    video.videoHeight;




                const ctx =
                    canvas.getContext("2d");




                ctx.drawImage(

                    video,

                    0,

                    0,

                    canvas.width,

                    canvas.height

                );




                const image =
                    canvas.toDataURL(

                        "image/jpeg",

                        0.85

                    );




                canvas.toBlob((blob)=>{


                    resolve({

                        image:image,

                        blob:blob,

                        width:
                            canvas.width,

                        height:
                            canvas.height,

                        time:time

                    });



                },

                "image/jpeg",

                0.85);



            };




            video.onerror = () => {


                reject(
                    "Thumbnail gagal dibuat."
                );


            };


        });


    },




    async generateMultiple(videoData, count = 5) {


        const thumbnails = [];



        const duration =
            videoData.duration || 10;




        for(
            let i = 1;
            i <= count;
            i++
        ){


            const position =
                (duration / count) * i;




            const thumb =
                await this.generate(

                    videoData,

                    position

                );



            thumbnails.push(thumb);



        }



        return thumbnails;



    }


};



window.Thumbnail = Thumbnail;
