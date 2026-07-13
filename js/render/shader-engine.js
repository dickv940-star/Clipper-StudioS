/*
=========================================
ClipperStudio
Shader Engine
Version : 1.0

WebGL Real-Time Effect System

=========================================
*/


const ShaderEngine = {


    canvas:null,


    gl:null,


    program:null,


    effects:{},


    active:[],


    uniforms:{},


    callbacks:{},





    init(
        canvas="previewCanvas"
    ){



        if(
            typeof canvas==="string"
        ){


            this.canvas =

            document.getElementById(
                canvas
            );


        }
        else{


            this.canvas =
            canvas;


        }





        if(!this.canvas)
            return;





        this.gl =

        this.canvas.getContext(
            "webgl"
        );





        if(
            !this.gl
        ){


            console.warn(

                "WebGL tidak tersedia"

            );


            return;


        }





        this.createShaders();



        this.createEffects();




        console.log(

            "Shader Engine Ready"

        );



    },









    createShaders(){



        const vertex = `

        attribute vec2 position;

        varying vec2 uv;


        void main(){


            uv = position * 0.5 + 0.5;


            gl_Position =
            vec4(position,0.0,1.0);


        }

        `;






        const fragment = `


        precision mediump float;


        uniform sampler2D texture;


        uniform float time;


        uniform float grain;


        uniform float glow;


        uniform float rgb;


        varying vec2 uv;




        void main(){



            vec4 color =

            texture2D(

                texture,

                uv

            );





            // Film Grain


            float noise =

            fract(

            sin(

            dot(

            uv,

            vec2(

            12.9898,

            78.233

            )

            ))

            *

            43758.5453

            );





            color.rgb +=

            (

            noise-0.5

            )

            *

            grain;







            // RGB Split


            if(rgb > 0.0){


                color.r =

                texture2D(

                    texture,

                    uv + vec2(

                    rgb,

                    0.0

                    )

                ).r;



            }







            // Glow


            color.rgb +=

            glow *
            
            color.rgb;







            gl_FragColor =
            color;


        }

        `;





        this.program =

        this.createProgram(

            vertex,

            fragment

        );



    },









    createProgram(
        vertex,
        fragment
    ){



        const gl =
            this.gl;




        const vs =

        gl.createShader(

            gl.VERTEX_SHADER

        );




        gl.shaderSource(

            vs,

            vertex

        );



        gl.compileShader(vs);






        const fs =

        gl.createShader(

            gl.FRAGMENT_SHADER

        );




        gl.shaderSource(

            fs,

            fragment

        );



        gl.compileShader(fs);






        const program =

        gl.createProgram();





        gl.attachShader(

            program,

            vs

        );



        gl.attachShader(

            program,

            fs

        );



        gl.linkProgram(

            program

        );





        return program;



    },









    createEffects(){



        this.effects={



            grain:{


                value:0.15


            },




            glow:{


                value:0


            },




            rgbSplit:{


                value:0


            },




            vhs:{


                value:0


            },




            bloom:{


                value:0


            }



        };



    },









    enable(
        effect,
        value=1
    ){



        if(
            this.effects[effect]
        ){



            this.effects[effect]

            .value=value;



        }





        if(
            !this.active.includes(
                effect
            )
        ){


            this.active.push(
                effect
            );


        }



    },









    disable(
        effect
    ){



        this.active =

        this.active.filter(

            e=>

            e!==effect

        );



    },









    apply(){



        if(
            !this.gl ||
            !this.program
        )
            return;





        const gl =
            this.gl;




        gl.useProgram(

            this.program

        );





        const grain =

        this.effects.grain.value;



        const glow =

        this.effects.glow.value;



        const rgb =

        this.effects.rgbSplit.value;





        this.uniforms.time =

        gl.getUniformLocation(

            this.program,

            "time"

        );



        gl.uniform1f(

            this.uniforms.time,

            performance.now()/1000

        );





        gl.uniform1f(

            gl.getUniformLocation(

            this.program,

            "grain"

            ),

            grain

        );





        gl.uniform1f(

            gl.getUniformLocation(

            this.program,

            "glow"

            ),

            glow

        );





        gl.uniform1f(

            gl.getUniformLocation(

            this.program,

            "rgb"

            ),

            rgb

        );



    },









    preset(
        name
    ){



        switch(name){



            case "cinematic":


                this.enable(
                    "grain",
                    0.2
                );


                this.enable(
                    "bloom",
                    0.3
                );


            break;





            case "vhs":


                this.enable(
                    "rgbSplit",
                    0.02
                );


                this.enable(
                    "grain",
                    0.3
                );


            break;





            case "glow":


                this.enable(
                    "glow",
                    0.5
                );


            break;



        }



    },









    reset(){



        this.active=[];


        this.createEffects();



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



window.ShaderEngine =
    ShaderEngine;
