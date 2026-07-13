/*
=========================================

ClipperStudio
Router System

Version 3.0

=========================================
*/


(function(){


"use strict";



if(window.Router){

    return;

}



const Router = {


    current:null,


    pages:[

        "splash",
        "home",
        "mode",
        "analysis",
        "clips",
        "editor",
        "export"

    ],



    init(){


        console.log(
            "Router Ready"
        );


    },





    load(page){


        if(
            !this.pages.includes(page)
        ){

            console.error(
                "Page tidak ditemukan:",
                page
            );

            return;

        }



        this.current=page;



        const container =

        document.getElementById(
            "page"
        );



        if(container){


            container.innerHTML=

            `

            <h2>
            ${page}
            </h2>

            `;


        }



        console.log(
            "Router Load:",
            page
        );


    },





    getCurrent(){


        return this.current;


    }



};



window.Router=Router;



console.log(
"Router Loaded"
);



})();
