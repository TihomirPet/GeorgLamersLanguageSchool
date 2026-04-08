

// sections.forEach((section) => observer.observe(section));
// document.addEventListener('navLoaded', () => {
//   console.log('Scroll Observer startet...');

//   const sections = document.querySelectorAll('.section');
//   const navToggle = document.querySelector('.nav-toggle');

//   if (!navToggle) {
//     console.error('nav-toggle nicht gefunden!');
//     return;
//   }

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           const bgClass = entry.target.dataset.bgClass;

//           navToggle.classList.remove('nav-white', 'nav-dark');

//           if (bgClass === 'bg-third-white') {
//             navToggle.classList.add('nav-dark');
//           } else {
//             navToggle.classList.add('nav-white');
//           }
//         }
//       });
//     },
//     {
//       threshold: 0.6,
//     },
//   );

//   sections.forEach((section) => observer.observe(section));
// });