// accordion.js
document.addEventListener('navLoaded', () => {
  console.log('Accordion-Navigation aktiv.');

  // Alle Links mit 'custom-nav-link'
  const navLinks = document.querySelectorAll('.custom-nav-link');

  navLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      const accordionId = this.getAttribute('data-accordion');
      if (accordionId) {
        localStorage.setItem('accordionToOpen', accordionId);
        console.log('Accordion-ID gespeichert:', accordionId);

        window.location.href = this.href;
      } else {
        console.warn('Kein Accordion-ID gefunden für:', this);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop();
  const accordionId = localStorage.getItem('accordionToOpen');

  if (
    accordionId &&
    (currentPage === 'prices.html' || currentPage === 'courses.html')
  ) {
    const targetAccordion = document.getElementById(accordionId);

    if (targetAccordion) {
      const button = document.querySelector(
        `[data-bs-target="#${accordionId}"]`
      );
      if (button) {
        button.classList.remove('collapsed');
        targetAccordion.classList.add('show');
      }
    }

    localStorage.removeItem('accordionToOpen');
  }
});
