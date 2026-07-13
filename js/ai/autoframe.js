/*
=========================================
ClipperStudio
AI Auto Frame Engine
Version : 1.0

Auto Crop / Reframe Video

Input:
- Video metadata
- Face detection
- Target ratio

Output:
- Crop position
- Scale
- Frame data

=========================================
*/


const AutoFrame = {


    targetRatio:"9:16",



    init(){


        console.log(
            "AutoFrame Ready"
        );


    },





    calculate(
        video,
        options={}
    ){


        const ratio =
            options.ratio ||
            this.targetRatio;



        const faces =
            options.faces || [];



        const width =
            video.width;



        const height =
            video.height;



        const crop =
            this.calculateCrop(
                width,
                height,
                ratio
            );



        const focus =
            this.calculateFocus(
                faces,
                width,
                height
            );



        return {


            source:{

                width:width,

                height:height

            },


            targetRatio:
                ratio,


            crop:crop,


            focus:focus



        };



    },








    calculateCrop(
        width,
        height,
        ratio
    ){



        const target =
            ratio.split(":");



        const rw =
            Number(target[0]);



        const rh =
            Number(target[1]);




        const targetValue =
            rw / rh;



        const sourceValue =
            width / height;




        let cropWidth =
            width;



        let cropHeight =
            height;




        if(
            sourceValue >
            targetValue
        ){


            /*
            Video terlalu lebar

            Potong kiri kanan

            */


            cropHeight =
                height;



            cropWidth =
                height *
                targetValue;



        }

        else{


            /*
            Video terlalu tinggi

            Potong atas bawah

            */


            cropWidth =
                width;



            cropHeight =
                width /
                targetValue;


        }





        return {


            width:
                Math.round(
                    cropWidth
                ),


            height:
                Math.round(
                    cropHeight
                )


        };


    },









    calculateFocus(
        faces,
        width,
        height
    ){



        if(
            !faces ||
            faces.length===0
        ){


            return {


                x:
                width/2,


                y:
                height/2


            };


        }





        let x=0;

        let y=0;



        faces.forEach(
            face=>{


                x +=
                face.x +
                face.width/2;



                y +=
                face.y +
                face.height/2;


            }

        );




        return {


            x:
            x / faces.length,


            y:
            y / faces.length



        };



    },









    createKeyframes(
        analysis,
        duration
    ){



        let frames=[];



        for(
            let t=0;
            t<duration;
            t+=1
        ){



            frames.push({


                time:t,


                x:
                analysis.focus.x,


                y:
                analysis.focus.y



            });



        }



        return frames;



    }







};



window.AutoFrame =
    AutoFrame;
