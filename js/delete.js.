/*
=========================================
ClipperStudio
Delete Engine
Version : 1.0

Clip Remove Controller

=========================================
*/


const Delete = {


    selectedClip:null,


    history:null,


    callbacks:{},





    init(){


        this.selectedClip=null;


        this.history=null;


        console.log(
            "Delete Engine Ready"
        );


    },







    selectClip(
        clip
    ){


        this.selectedClip =
            clip;


        this.emit(
            "selected",
            clip
        );


    },







    execute(
        track
    ){



        const clip =
            this.selectedClip;



        if(!clip){


            console.error(
                "Tidak ada clip dipilih"
            );


            return false;


        }





       
