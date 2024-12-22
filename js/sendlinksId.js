// document.addEventListener('navLoaded', () => {
//   const navigation = document.querySelector('.navigation');
//   if (navigation) {
//     // Event Delegation für Links
//     navigation.addEventListener('click', function (event) {
//       const target = event.target;

//       if (target.tagName === 'A' && target.hasAttribute('data-accordion')) {
//         event.preventDefault();
//         const accordionId = target.getAttribute('data-accordion');
//         localStorage.setItem('accordionToOpen', accordionId);
//         console.log('Accordion-ID gespeichert:', accordionId);
//         window.location.href = target.href;
//       }
//     });

//     console.log('Event-Listener für Links hinzugefügt.');
//   }
// });

// ===================================================================================================
document.addEventListener('navLoaded', () => {
  console.log('Navigation geladen.');

  // Alle Links mit der Klasse 'custom-nav-link' selektieren
  const navLinks = document.querySelectorAll('.custom-nav-link');

  // Schleife, um Event-Listener für jeden Link hinzuzufügen
  navLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // Standard-Link-Verhalten verhindern

      // Accordion-ID aus dem 'data-accordion'-Attribut extrahieren
      const accordionId = this.getAttribute('data-accordion');
      if (accordionId) {
        localStorage.setItem('accordionToOpen', accordionId); // Accordion-ID speichern
        console.log('Accordion-ID gespeichert:', accordionId);

        // Weiterleiten zur Zielseite
        window.location.href = this.href;
      } else {
        console.warn('Kein Accordion-ID gefunden für:', this);
      }
    });
  });

  console.log('Event-Listener für alle .custom-nav-link hinzugefügt.');
});
