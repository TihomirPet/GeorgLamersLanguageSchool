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

// Iteriere über alle video-container
videoContainers.forEach((container) => {
  // Selektiere Elemente relativ zum aktuellen Container
  const videoPlay = container.querySelector('video'); // Video im aktuellen Container
  const hoverText = container.querySelector('.hover-text'); // Hover-Text im aktuellen Container
  const hoverCard = container.querySelector('.header-image-test'); // Header-Card im aktuellen Container

  // Wenn die Maus über den Container fährt
  container.addEventListener('mouseenter', () => {
    hoverCard.classList.remove('show'); // Header-Card ausblenden
    videoPlay.play(); // Nur dieses Video abspielen
    hoverText.classList.add('active'); // Hover-Text aktivieren
  });

  // Wenn die Maus den Container verlässt
  container.addEventListener('mouseleave', () => {
    hoverCard.classList.add('show'); // Header-Card wieder einblenden
    videoPlay.pause(); // Nur dieses Video stoppen
    videoPlay.currentTime = 0; // Video zurücksetzen
    hoverText.classList.remove('active'); // Hover-Text deaktivieren
  });
});
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


