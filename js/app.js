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

videoInput.addEventListener("change", async (event) => {

    const file = event.target.files[0];

    if (!file) return;

    try {

        const video = await VideoLoader.load(file);

        window.currentVideo = video;

        console.log(video);

        showScreen("modeScreen");

    }

    catch (err) {

        alert(err);

    }

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
function startProcessing() {

    const progressBar = document.getElementById("progressBar");

    const progressText = document.getElementById("progressText");

    const processTitle = document.getElementById("processTitle");

    const steps = [

        {
            id: "step1",
            text: "Membaca Video..."
        },

        {
            id: "step2",
            text: "Analisis Scene..."
        },

        {
            id: "step3",
            text: "Motion Detection..."
        },

        {
            id: "step4",
            text: "Highlight Detection..."
        },

        {
            id: "step5",
            text: "Subtitle AI..."
        },

        {
            id: "step6",
            text: "Rendering Timeline..."
        }

    ];

    let progress = 0;

    let index = 0;

    const timer = setInterval(() => {

        progress += 2;

        progressBar.style.width = progress + "%";

        progressText.textContent = progress + "%";

        if (
            index < steps.length &&
            progress >= ((index + 1) * 100 / steps.length)
        ) {

            processTitle.textContent = steps[index].text;

            const step = document.getElementById(steps[index].id);

            step.innerHTML = "✅ " + step.textContent.replace("⏳ ", "");

            index++;

        }

        if (progress >= 100) {

            clearInterval(timer);

            processTitle.textContent = "Analisis Selesai";

            setTimeout(() => {

                alert("Tahap berikutnya: Editor Auto Clip");

                // showScreen("editorScreen");

            }, 500);

        }

    }, 80);

}
// ======================================
// Ready
// ======================================

console.log("ClipperStudio Ready");
