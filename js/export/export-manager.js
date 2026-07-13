/*
================================

ClipperStudio
Export Manager

================================
*/


(function(){



const ExportManager={



    init(){

        console.log(
            "Export Manager Ready"
        );

    },



    async start(project){


        console.log(
            "Export Start",
            project
        );


        return true;


    }



};



window.ExportManager=
ExportManager;



console.log(
"Export Manager Loaded"
);



})();
