const sections = document.querySelectorAll('.section');
const navToggle = document.querySelector('.nav-toggle');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bgClass = entry.target.dataset.bgClass;

        // Reset Klassen
        navToggle.classList.remove('nav-white', 'nav-dark');

        // Logik: helle Section → dunkler Button
        if (bgClass === 'bg-third-white') {
          navToggle.classList.add('nav-dark');
        } else {
          navToggle.classList.add('nav-white');
        }
      }
    });
  },
  {
    threshold: 0.6, // wann Section aktiv wird (60% sichtbar)
  },
);

sections.forEach((section) => observer.observe(section));
