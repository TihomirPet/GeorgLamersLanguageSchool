// document.addEventListener('DOMContentLoaded', function () {
//   const accordionId = localStorage.getItem('accordionToOpen'); // Holt sich die gespeicherte Accordion-ID
//   console.log('Geladene Accordion-ID:', accordionId);

//   if (accordionId) {
//     // Das entsprechende Accordion-Element suchen
//     const targetAccordion = document.getElementById(accordionId);

//     if (targetAccordion) {
//       // Der zugehörige Button, der das Accordion öffnet
//       const button = document.querySelector(
//         `[data-bs-target="#${accordionId}"]`
//       );

//       if (button) {
//         // Accordion öffnen, indem die "collapsed"-Klasse entfernt wird
//         button.classList.remove('collapsed');
//         targetAccordion.classList.add('show'); // Accordion anzeigen
//       }
//     }
//     // Nach dem Öffnen des Accordions den Local Storage löschen
//     localStorage.removeItem('accordionToOpen');
//   }
// });


// ========================================================================================
document.addEventListener('DOMContentLoaded', () => {
  const accordionToOpen = localStorage.getItem('accordionToOpen');
  if (accordionToOpen) {
    const targetAccordion = document.querySelector(`#${accordionToOpen}`);
    if (targetAccordion) {
      targetAccordion.classList.add('show'); // Accordion öffnen
      console.log('Accordion geöffnet:', accordionToOpen);
    } else {
      console.warn('Accordion-ID nicht gefunden:', accordionToOpen);
    }

    // Accordion-ID aus dem Speicher entfernen
    localStorage.removeItem('accordionToOpen');
  }
});