
document.addEventListener('navLoaded', () => {
  console.log('Navigation + Scroll Observer gestartet');

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const sections = document.querySelectorAll('.section');

  if (!navToggle || !nav) {
    console.error('Navigation nicht gefunden!');
    return;
  }

  // =========================
  //  Hamburger Menü
  // =========================
  navToggle.addEventListener('click', (e) => {
    e.preventDefault();
    navToggle.classList.toggle('expanded');
    nav.classList.toggle('expanded');
  });

  // =========================
  //  Mobile Links schließen Nav
  // =========================
  const mobileLinks = document.querySelectorAll('.nav a');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('expanded')) {
        nav.classList.remove('expanded');
        navToggle.classList.remove('expanded');
      }
    });
  });

  // =========================
  //  Dropdown Mobile
  // =========================
  const dropdownButtons = document.querySelectorAll('.btn-mobile');
  dropdownButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      const dropdownContent = button.nextElementSibling;
      const icon = button.querySelector('i');

      if (dropdownContent) {
        dropdownContent.classList.toggle('expanded');

        if (icon) {
          icon.classList.toggle('bi-arrow-down-circle');
          icon.classList.toggle('bi-arrow-up-circle');
        }
      }
    });
  });

  // =========================
  // 🎯 SCROLL COLOR CHANGE
  // =========================
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bgClass = entry.target.dataset.bgClass;

          navToggle.classList.remove('nav-white', 'nav-dark');

          if (bgClass && bgClass.includes('white')) {
            navToggle.classList.add('nav-dark');
          } else {
            navToggle.classList.add('nav-white');
          }
        }
      });
    },
    {
      threshold: 0.6,
    },
  );

  sections.forEach((section) => observer.observe(section));

  console.log('Alles initialisiert ');
});