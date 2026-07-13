const chooseFile = document.getElementById("chooseFile");
const input = document.getElementById("videoInput");

const home = document.getElementById("homeScreen");
const mode = document.getElementById("modeScreen");

chooseFile.onclick = () => {

    input.click();

};

input.onchange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    console.log(file);

    home.classList.remove("active");

    mode.classList.add("active");

};

document.getElementById("autoClipBtn").onclick = () => {

    console.log("Auto Clips");

};

document.getElementById("manualBtn").onclick = () => {

    console.log("Edit Manual");

};
