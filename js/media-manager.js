/*
================================================

ClipperStudio
Media Manager

Version : 3.2

Video Import Controller

================================================
*/


(function(){

"use strict";



if(window.MediaManager){

    console.warn(
        "MediaManager already loaded"
    );

    return;

}





const MediaManager = {



    currentVideo:null,


    currentFile:null,









    init(){


        console.log(
            "Media Manager Ready"
        );


    },









    openPicker(){



        const input =

        document.createElement(
            "input"
        );



        input.type="file";


        input.accept=

        "video/*";





        input.onchange=(e)=>{


            const file =

            e.target.files[0];



            if(file){


                this.importVideo(
                    file
                );


            }



        };





        input.click();



    },









    async importVideo(
        file
    ){



        if(
            !file.type.startsWith(
                "video/"
            )
        ){


            console.error(
                "File bukan video"
            );


            return null;


        }






        console.log(
            "Import video:",
            file.name
        );





        this.currentFile=file;





        const url =

        URL.createObjectURL(
            file
        );





        const video =

        document.createElement(
            "video"
        );





        video.src=url;


        video.preload="metadata";





        await new Promise(

            resolve=>{


                video.onloadedmetadata=

                resolve;


            }

        );






        const metadata={


            name:file.name,


            size:file.size,


            type:file.type,


            duration:

            video.duration,


            width:

            video.videoWidth,


            height:

            video.videoHeight,


            url:url



        };





        this.currentVideo=metadata;





        console.log(
            "Video Metadata:",
            metadata
        );






        this.addToProject(
            metadata
        );





        return metadata;



    },









    addToProject(
        video
    ){



        if(
            !window.ProjectStorage
        ){

            console.error(
                "Storage tidak tersedia"
            );

            return;

        }






        let project =

        ProjectStorage.getCurrentProject();





        if(!project){



            project =

            ProjectStorage.createProject({

                name:"Video Project"

            });



        }






        const clip={



            id:

            "clip_" +

            Date.now(),



            source:

            video.url,



            name:

            video.name,



            start:0,



            end:

            video.duration,



            duration:

            video.duration,



            type:"video",



            volume:1,



            speed:1,



            effects:[]



        };







        if(
            !project.clips
        ){

            project.clips=[];

        }






        project.clips.push(
            clip
        );






        ProjectStorage.saveProject(
            project
        );



        ProjectStorage.setCurrentProject(
            project
        );






        this.addTimelineClip(
            clip
        );






        console.log(

            "Video added:",

            clip

        );



    },









    addTimelineClip(
        clip
    ){



        if(
            window.Timeline &&
            Timeline.addClip
        ){


            Timeline.addClip(
                clip
            );



            console.log(
                "Clip masuk Timeline"
            );


        }



    },









    getCurrent(){


        return this.currentVideo;


    }







};





window.MediaManager =
MediaManager;



console.log(
"Media Manager Loaded"
);



})();
