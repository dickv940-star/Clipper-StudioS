/*
================================================

ClipperStudio
Project Storage Manager

Version : 3.2

Local Project Database

================================================
*/


(function(){

"use strict";



if(window.ProjectStorage){

    console.warn(
        "ProjectStorage already loaded"
    );

    return;

}





const ProjectStorage = {



    key:

    "clipperstudio_projects",



    currentKey:

    "clipperstudio_current_project",





    init(){


        console.log(
            "ProjectStorage Ready"
        );


    },









    createProject(data={}){


        const project = {


            id:

            "project_" +

            Date.now(),



            name:

            data.name ||

            "Untitled Project",



            created:

            Date.now(),



            updated:

            Date.now(),



            timeline:{

                tracks:[]

            },



            clips:[],



            settings:{


                width:1080,


                height:1920,


                fps:30


            }



        };




        this.saveProject(project);



        this.setCurrentProject(

            project

        );



        return project;



    },









    saveProject(project){



        if(!project){

            return false;

        }



        project.updated =

        Date.now();




        let projects =

        this.getProjects();




        const index =

        projects.findIndex(

            p=>p.id===project.id

        );




        if(index>=0){


            projects[index]=project;


        }

        else{


            projects.push(project);


        }




        localStorage.setItem(

            this.key,

            JSON.stringify(projects)

        );




        return true;



    },









    getProjects(){



        const data =

        localStorage.getItem(

            this.key

        );



        if(!data){


            return [];


        }



        try{


            return JSON.parse(data);


        }

        catch(error){


            console.error(

                "Project database error",

                error

            );


            return [];


        }


    },









    setCurrentProject(project){



        if(!project){

            return;

        }



        localStorage.setItem(

            this.currentKey,

            JSON.stringify(project)

        );



    },









    getCurrentProject(){



        const data =

        localStorage.getItem(

            this.currentKey

        );



        if(!data){



            return null;



        }



        try{


            return JSON.parse(data);



        }

        catch(error){


            console.error(

                "Current project error",

                error

            );


            return null;


        }


    },









    updateCurrentProject(data){



        const project =

        this.getCurrentProject();



        if(!project){


            return false;


        }



        Object.assign(

            project,

            data

        );



        this.setCurrentProject(

            project

        );



        this.saveProject(

            project

        );



        return true;


    },









    deleteProject(id){



        let projects =

        this.getProjects();



        projects =

        projects.filter(

            p=>p.id!==id

        );



        localStorage.setItem(

            this.key,

            JSON.stringify(projects)

        );



    },









    clear(){


        localStorage.removeItem(

            this.key

        );


        localStorage.removeItem(

            this.currentKey

        );


    }



};






window.ProjectStorage = ProjectStorage;



console.log(
"ProjectStorage Loaded"
);



})();
