// ======================================
// ClipperStudio
// Version 1.0
// ======================================

// ---------- Screen ----------

const homeScreen = document.getElementById("homeScreen");
const modeScreen = document.getElementById("modeScreen");
const autoClipScreen = document.getElementById("autoClipScreen");

// ---------- Home ----------

const chooseFile = document.getElementById("chooseFile");
const videoInput = document.getElementById("videoInput");

// ---------- Mode ----------

const autoClipBtn = document.getElementById("autoClipBtn");
const manualBtn = document.getElementById("manualBtn");

// ---------- Auto Clip ----------

const startAutoClip = document.getElementById("startAutoClip");

const outputRatio = document.getElementById("outputRatio");
const clipDuration = document.getElementById("clipDuration");

const effectCinematic = document.getElementById("effectCinematic");

const autoFrame = document.getElementById("autoFrame");
const autoSubtitle = document.getElementById("autoSubtitle");
const highlight = document.getElementById("highlight");

const subtitleLanguage = document.getElementById("subtitleLanguage");

// ======================================
// Global
// ======================================

window.currentVideo = null;

// ======================================
// Show Screen
// ======================================

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {

        screen.classList.remove("active");

    });

    document.getElementById(id).classList.add("active");

}

// ======================================
// Upload Video
// ======================================

chooseFile.addEventListener("click", () => {

    videoInput.click();

});

videoInput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) {

        return;

    }

    if (!file.type.startsWith("video/")) {

        alert("Silakan pilih file video.");

        return;

    }

    window.currentVideo = file;

    console.log("Video berhasil dipilih");

    console.log(file);

    showScreen("modeScreen");

});

// ======================================
// Mode
// ======================================

autoClipBtn.addEventListener("click", () => {

    showScreen("autoClipScreen");

});

manualBtn.addEventListener("click", () => {

    alert("Editor Manual akan dibuat pada tahap berikutnya.");

});

// ======================================
// Start Auto Clip
// ======================================

startAutoClip.addEventListener("click", () => {

    const settings = {

        video: window.currentVideo,

        output: outputRatio.value,

        duration: clipDuration.value,

        cinematic: effectCinematic.checked,

        autoFrame: autoFrame.checked,

        autoSubtitle: autoSubtitle.checked,

        highlight: highlight.checked,

        subtitleLanguage: subtitleLanguage.value

    };

    console.clear();

    console.log("========== AUTO CLIP ==========");

    console.log(settings);

    alert("Tahap berikutnya: AI mulai menganalisis video.");

});

// ======================================
// Ready
// ======================================

console.log("ClipperStudio Ready");
