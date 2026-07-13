const Timeline={

canvas:null,
ctx:null,

duration:0,

zoom:100,

width:1000,

init(){

    this.canvas=document.getElementById("timelineCanvas");

    this.ctx=this.canvas.getContext("2d");

    this.canvas.width=this.width;

    this.canvas.height=120;

    this.bind();

    this.render();

},

bind(){

    document
    .getElementById("zoomIn")
    .onclick=()=>{

        this.zoom+=20;

        this.update();

    };

    document
    .getElementById("zoomOut")
    .onclick=()=>{

        this.zoom=Math.max(20,this.zoom-20);

        this.update();

    };

},

setDuration(seconds){

    this.duration=seconds;

    this.update();

},

update(){

    document
    .getElementById("zoomLabel")
    .textContent=this.zoom+"%";

    this.width=Math.max(
        1000,
        this.duration*50*(this.zoom/100)
    );

    this.canvas.width=this.width;

    this.render();

},

render(){

    const ctx=this.ctx;

    ctx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

    ctx.fillStyle="#333";

    ctx.fillRect(
        0,
        40,
        this.canvas.width,
        40
    );

    ctx.strokeStyle="#666";

    ctx.fillStyle="white";

    if(this.duration<=0) return;

    const px=this.canvas.width/this.duration;

    for(let i=0;i<=this.duration;i++){

        let x=i*px;

        ctx.beginPath();

        ctx.moveTo(x,0);

        ctx.lineTo(x,30);

        ctx.stroke();

        ctx.fillText(
            this.format(i),
            x+2,
            15
           import Clips from "./clips.js"; 
        );

    }

},

format(sec){

    sec=Math.floor(sec);

    let m=Math.floor(sec/60);

    let s=sec%60;

    return String(m).padStart(2,"0")
    +":"
    +String(s).padStart(2,"0");

}

};

export default Timeline;
