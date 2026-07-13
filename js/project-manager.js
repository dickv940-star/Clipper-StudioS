/*
================================================

ClipperStudio
Project Manager

Version : 3.2

Project Controller

================================================
*/


(function(){

"use strict";



if(window.ProjectManager){

    console.warn(
        "ProjectManager already loaded"
    );

    return;

}





const ProjectManager = {



    current:null,





    init(){


        console.log(
            "Project Manager Ready"
        );


    },









    createNewProject(
        name="Untitled Project"
    ){



        if(
            !window.ProjectStorage
        ){

            console.error(
                "ProjectStorage tidak tersedia"
            );

            return null;

        }





        const project =

        ProjectStorage.createProject({

            name:name

        });





        this.current = project;





        console.log(

            "New Project Created:",

            project

        );





        this.openEditor();



        return project;



    },









    openProject(
        id
    ){



        const projects =

        ProjectStorage.getProjects();





        const project =

        projects.find(

            p=>p.id===id

        );





        if(!project){


            console.error(

                "Project tidak ditemukan"

            );


            return null;


        }






        ProjectStorage.setCurrentProject(

            project

        );





        this.current=project;





        this.openEditor();





        return project;



    },









    loadProjects(){



        if(
            !window.ProjectStorage
        ){

            return [];

        }





        return ProjectStorage.getProjects();



    },









    deleteProject(
        id
    ){



        if(
            !window.ProjectStorage
        ){

            return false;

        }



        ProjectStorage.deleteProject(

            id

        );





        console.log(

            "Project deleted:",

            id

        );



        return true;



    },









    openEditor(){



        console.log(

            "Opening Editor..."

        );





        if(
            window.Router &&
            Router.load
        ){


            Router.load(
                "editor"
            );


        }





        setTimeout(()=>{



            if(
                window.Editor
            ){


                Editor.project =

                this.current;



                console.log(

                    "Editor Project Loaded",

                    this.current

                );



            }



        },300);



    },









    getCurrent(){


        return this.current;


    },









    rename(
        id,
        name
    ){



        const projects =

        ProjectStorage.getProjects();





        const project =

        projects.find(

            p=>p.id===id

        );





        if(!project){

            return false;

        }





        project.name=name;





        ProjectStorage.saveProject(

            project

        );





        return true;



    }



};







window.ProjectManager = ProjectManager;



console.log(
"Project Manager Loaded"
);



})();
