// document.getElementById('myVid').addEventListener('mouseover', function () {
//   this.play();
// });

// document.getElementById('myVid').addEventListener('mouseleave', function () {
//   this.pause();
// });

// ######

const video = document.querySelector('.video-container ');
const videoPlay = document.querySelector('.video-container video');
const hoverText = document.querySelector('.video-container .hover-text');
const hoverCard = document.querySelector(
  '.video-container  .header-image-test '
);
console.log(hoverCard);
// video.forEach(element => {
  
// });
video.addEventListener('mouseenter', () => {
  hoverCard.classList.remove('show');
  videoPlay.play();
hoverText.classList.add('active');
});

video.addEventListener('mouseleave', () => {
  hoverCard.classList.add('show');
  videoPlay.pause();
 hoverText.classList.remove('active');
});

// **********************************
// const videos = document.querySelectorAll('video');

// videos.forEach((video) => {
//   video.addEventListener('mouseover', function () {
//     this.play();
//     video.addEventListener('mouseout', function () {
//       this.pause();
//     });
//   });
// });