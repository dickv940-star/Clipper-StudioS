import Timeline from "./timeline.js";

const Player={

video:null,

init(){

    this.video=document.getElementById("video");

    this.video.addEventListener("loadedmetadata",()=>{

        Timeline.setDuration(
            this.video.duration
        );

    });

    this.video.addEventListener("timeupdate",()=>{

        const playhead=document.getElementById("playhead");

        if(!Timeline.duration) return;

        const x=(this.video.currentTime/Timeline.duration)
            *Timeline.canvas.width;

        playhead.style.left=x+"px";

    });

},

load(file){

    this.video.src=
        URL.createObjectURL(file);

    this.video.load();

}

};

export default Player;
