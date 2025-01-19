// document.getElementById('myVid').addEventListener('mouseover', function () {
//   this.play();
// });

// document.getElementById('myVid').addEventListener('mouseleave', function () {
//   this.pause();
// });

// ######

// const video = document.querySelectorAll('.video-container ');

// video.forEach(video => {
//   const videoPlay = document.querySelector('.video-container video');
//   const hoverText = document.querySelector('.video-container .hover-text');
//   const hoverCard = document.querySelector(
//     '.video-container  .header-image-test '
//   );
//   video.addEventListener('mouseenter', () => {

//     hoverCard.classList.remove('show');
//     videoPlay.play();
//     hoverText.classList.add('active');
//   });

//   video.addEventListener('mouseleave', () => {
//     hoverCard.classList.add('show');
//     videoPlay.pause();
//     hoverText.classList.remove('active');
//   });

// });
// **********************************
const videoContainers = document.querySelectorAll('.video-container');

// Füge Event-Listener für jeden Video-Container hinzu
videoContainers.forEach((container) => {
  // Selektiere Video und verwandte Elemente innerhalb des Containers
  const videoPlay = container.querySelector('video');
  const hoverText = container.querySelector('.hover-text');
  const hoverCard = container.querySelector('.header-image-test');

  // Wenn die Maus über den Container fährt
  container.addEventListener('mouseenter', () => {
    if (hoverCard) hoverCard.classList.remove('show'); // Header-Card ausblenden
    if (videoPlay) videoPlay.play(); // Video abspielen
    if (hoverText) hoverText.classList.add('active'); // Hover-Text anzeigen
  });

  // Wenn die Maus den Container verlässt
  container.addEventListener('mouseleave', () => {
    if (hoverCard) hoverCard.classList.add('show'); // Header-Card wieder einblenden
    if (videoPlay) {
      videoPlay.pause(); // Video stoppen
      videoPlay.currentTime = 0; // Video zurücksetzen
    }
    if (hoverText) hoverText.classList.remove('active'); // Hover-Text ausblenden
  });
});

// Stumm schalten und Videos programmatisch laden
window.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video');
  videos.forEach((video) => {
    video.muted = true; // Alle Videos stumm schalten
    video.load(); // Programmatisch laden
  });
});

// Klickevents auf Videos abfangen, um Verlinkung zu verhindern
document.querySelectorAll('.video-container video').forEach((video) => {
  video.addEventListener('click', (event) => {
    event.stopPropagation(); // Verhindert, dass das Ereignis den Container-Link erreicht
  });
});

// Opera-spezifische Anpassungen
if (
  navigator.userAgent.includes('Opera') ||
  navigator.userAgent.includes('OPR')
) {
  document.querySelectorAll('video').forEach((video) => {
    video.disablePictureInPicture = true; // Bild-in-Bild deaktivieren
    video.setAttribute(
      'controlsList',
      'nodownload nofullscreen noremoteplayback'
    ); // Zusätzliche Steuerungen deaktivieren
  });
}

// ********************************************************************
// for (let i = 0; i < video.length; i++) {

//   video[i].addEventListener('mouseenter', function (e) {

//     video[i].play();

//   });
//   video[i].addEventListener('mouseleave', function (e) {
//     video[i].pause();

//   });
// }

// ********************************************************************
