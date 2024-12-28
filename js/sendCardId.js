document.querySelectorAll('.video-container').forEach((card) => {
  card.addEventListener('click', function () {
    const accordionId = this.getAttribute('data-accordion'); // Holt sich das data-accordion-Attribut
    localStorage.setItem('accordionToOpen', accordionId); // Speichert die ID im Local Storage
    console.log('Accordion-ID gespeichert:', accordionId);
  });
});
