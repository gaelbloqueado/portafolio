function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
    showSection('sobre-mi');
});

function togglePlayPause() {
    var audioPlayer = document.getElementById("audio-player");
    var playPauseBtn = document.getElementById("playPauseBtn");

    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseBtn.innerHTML = "Pausa";
    } else {
      audioPlayer.pause();
      playPauseBtn.innerHTML = "Play";
    }
  }
