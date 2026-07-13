/*
=========================================
ClipperStudio
Project Storage
Version : 1.0

IndexedDB Project Manager

=========================================
*/


const ProjectStorage = {


    db:null,


    dbName:
    "ClipperStudioDB",


    storeName:
    "projects",


    version:1,


    current:null,


    callbacks:{},





    async init(){


        return new Promise(

            (resolve,reject)=>{


                const request =

                indexedDB.open(

                    this.dbName,

                    this.version

                );





                request.onupgradeneeded =

                (event)=>{


                    const db =
                    event.target.result;



                    if(
                        !db.objectStoreNames
                        .contains(
                            this.storeName
                        )
                    ){



                        const store =

                        db.createObjectStore(

                            this.storeName,

                            {

                                keyPath:
                                "id"

                            }

                        );



                        store.createIndex(

                            "name",

                            "name",

                            {

                                unique:false

                            }

                        );



                    }


                };






                request.onsuccess =

                (event)=>{


                    this.db =
                    event.target.result;



                    console.log(

                        "Project Storage Ready"

                    );



                    resolve();



                };






                request.onerror =

                (error)=>{


                    console.error(
                        error
                    );


                    reject(error);


                };



            }

        );


    },







    create(
        name="Untitled Project"
    ){



        const project={


            id:

            "project_" +

            Date.now(),



            name:



            name,



            created:

            Date.now(),



            updated:

            Date.now(),



            video:null,



            metadata:{},



            clips:[],



            timeline:[],



            subtitle:[],



            audio:{


                music:[],


                voice:[],


                effects:[]


            },



            settings:{


                ratio:"16:9",


                fps:30


            }



        };




        this.current =
            project;



        return project;


    },







    async save(
        project
    ){



        if(
            !this.db
        )
            await this.init();





        project.updated =
            Date.now();





        return new Promise(

            (resolve,reject)=>{



                const tx =

                this.db.transaction(

                    this.storeName,

                    "readwrite"

                );



                tx.objectStore(
                    this.storeName
                )
                .put(
                    project
                );





                tx.oncomplete =

                ()=>{


                    this.current =
                    project;



                    this.emit(

                        "saved",

                        project

                    );



                    resolve(
                        project
                    );


                };





                tx.onerror = reject;



            }

        );


    },







    async load(
        id
    ){



        return new Promise(

            (resolve,reject)=>{



                const tx =

                this.db.transaction(

                    this.storeName,

                    "readonly"

                );



                const request =

                tx.objectStore(

                    this.storeName

                )
                .get(
                    id
                );





                request.onsuccess=

                ()=>{


                    this.current =

                    request.result;



                    resolve(

                        request.result

                    );


                };





                request.onerror =
                reject;



            }

        );


    },







    async list(){



        return new Promise(

            (resolve)=>{


                const tx =

                this.db.transaction(

                    this.storeName,

                    "readonly"

                );



                const request =

                tx.objectStore(

                    this.storeName

                )
                .getAll();





                request.onsuccess=

                ()=>{


                    resolve(

                        request.result

                    );


                };



            }

        );


    },







    async remove(
        id
    ){



        const tx =

        this.db.transaction(

            this.storeName,

            "readwrite"

        );



        tx.objectStore(

            this.storeName

        )
        .delete(
            id
        );



        this.emit(

            "deleted",

            id

        );


    },







    rename(
        project,
        name
    ){



        project.name =
            name;



        return project;


    },







    getCurrent(){



        return this.current;


    },







    autosave(){



        if(
            !this.current
        )
            return;



        this.save(

            this.current

        );



    },







    on(
        event,
        callback
    ){



        this.callbacks[event]=
            callback;



    },







    emit(
        event,
        data
    ){



        if(
            this.callbacks[event]
        ){


            this.callbacks[event](
                data
            );


        }



    }





};



window.ProjectStorage =
    ProjectStorage;
