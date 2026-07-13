import Uploader from "./core/uploader.js";
import Player from "./core/player.js";
import Timeline from "./core/timeline.js";
import Clips from "./core/clips.js";

window.addEventListener("DOMContentLoaded", () => {

    console.log("ClipperStudio Started");

    // ==========================
    // Inisialisasi Modul
    // ==========================

    Player.init();
    Timeline.init();
    Uploader.init();

    // ==========================
    // Auto Clip
    // ==========================

    const autoClipBtn = document.getElementById("autoClipBtn");

    if (autoClipBtn) {

        autoClipBtn.addEventListener("click", () => {

            const duration = Player.getDuration();

            if (!duration) {

                alert("Upload video terlebih dahulu.");

                return;

            }

            const segment = Number(
                prompt(
                    "Durasi setiap clip (detik)",
                    "30"
                )
            );

            if (!segment || segment <= 0) return;

            Clips.autoClip(duration, segment);

            Timeline.render();

        });

    }

    // ==========================
    // Split Clip
    // ==========================

    const splitBtn = document.getElementById("splitBtn");

    if (splitBtn) {

        splitBtn.addEventListener("click", () => {

            if (!Player.getDuration()) return;

            Clips.split(

                Player.getCurrentTime()

            );

            Timeline.render();

        });

    }

    // ==========================
    // Delete Clip
    // ==========================

    const deleteBtn = document.getElementById("deleteBtn");

    if (deleteBtn) {

        deleteBtn.addEventListener("click", () => {

            if (!Clips.selected) {

                alert("Pilih clip terlebih dahulu.");

                return;

            }

            Clips.delete(

                Clips.selected

            );

            Clips.selected = null;

            Timeline.render();

        });

    }

    // ==========================
    // Export (sementara)
    // ==========================

    const exportBtn = document.getElementById("exportBtn");

    if (exportBtn) {

        exportBtn.addEventListener("click", () => {

            alert(
                "Fitur Export akan dibuat pada tahap berikutnya."
            );

        });

    }

});
