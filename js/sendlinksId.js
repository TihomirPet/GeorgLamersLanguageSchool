document.addEventListener('navLoaded', () => {
  const navigation = document.querySelector('.navigation');
  if (navigation) {
    // Event Delegation für Links
    navigation.addEventListener('click', function (event) {
      const target = event.target;

      if (target.tagName === 'A' && target.hasAttribute('data-accordion')) {
        event.preventDefault();
        const accordionId = target.getAttribute('data-accordion');
        localStorage.setItem('accordionToOpen', accordionId);
        console.log('Accordion-ID gespeichert:', accordionId);
        window.location.href = target.href;
      }
    });

    console.log('Event-Listener für Links hinzugefügt.');
  }
});
