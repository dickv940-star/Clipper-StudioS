// =======================================
// ClipperStudio
// Version : V1
// =======================================

const homeScreen = document.getElementById("homeScreen");
const modeScreen = document.getElementById("modeScreen");

const chooseFile = document.getElementById("chooseFile");
const videoInput = document.getElementById("videoInput");

const autoClipBtn = document.getElementById("autoClipBtn");
const manualBtn = document.getElementById("manualBtn");

// =======================================
// Menyimpan video yang dipilih
// =======================================

window.currentVideo = null;

// =======================================
// Ganti Screen
// =======================================

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {

        screen.classList.remove("active");

    });

    document.getElementById(screenId).classList.add("active");

}

// =======================================
// Upload Video
// =======================================

chooseFile.addEventListener("click", () => {

    videoInput.click();

});

// =======================================
// Setelah video dipilih
// =======================================

videoInput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) {

        return;

    }

    // Pastikan file adalah video
    if (!file.type.startsWith("video/")) {

        alert("Silakan pilih file video.");

        return;

    }

    // Simpan video sementara
    window.currentVideo = file;

    console.log("Video dipilih:");

    console.log(file);

    // Pindah ke Screen Mode
    showScreen("modeScreen");

});

// =======================================
// Auto Clips
// =======================================

autoClipBtn.addEventListener("click", () => {

    console.log("Mode Auto Clips");

    // Tahap berikutnya:
    // buka halaman Auto Clip

});

// =======================================
// Edit Manual
// =======================================

manualBtn.addEventListener("click", () => {

    console.log("Mode Edit Manual");

    // Tahap berikutnya:
    // buka halaman Editor

});

// =======================================
// Aplikasi Siap
// =======================================

console.log("ClipperStudio Ready");
