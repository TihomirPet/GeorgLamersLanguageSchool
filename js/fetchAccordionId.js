// function openAccordionFromLocalStorage() {
//   const accordionId = localStorage.getItem('accordionToOpen'); // gespeicherte ID abrufen

//   if (accordionId) {
//     // Ziel-Accordion-Element suchen
//     const targetAccordion = document.getElementById(accordionId);

//     if (targetAccordion) {
//       // Den Button zum Öffnen des Accordions finden
//       const button = document.querySelector(
//         `[data-bs-target="#${accordionId}"]`
//       );

//       if (button) {
//         // Button-Klasse "collapsed" entfernen
//         button.classList.remove('collapsed');
//         // Accordion anzeigen durch Hinzufügen der Bootstrap-"show"-Klasse
//         targetAccordion.classList.add('show');
//       }
//     }

//     // Optional: Wert aus localStorage löschen, damit es nicht bei jedem Seitenladen passiert
//     localStorage.removeItem('accordionToOpen');
//   }
// }

// // Beim Laden der Seite ausführen
// window.addEventListener('load', openAccordionFromLocalStorage);

// ######################################################################################
  // Funktion zum Öffnen des Accordions basierend auf localStorage
  function openAccordionFromLocalStorage() {
    const accordionId = localStorage.getItem('accordionToOpen'); // gespeicherte ID abrufen

    if (accordionId) {
      // Ziel-Accordion-Element suchen
      const targetAccordion = document.getElementById(accordionId);

      if (targetAccordion) {
        // Den Button zum Öffnen des Accordions finden
        const button = document.querySelector(`[data-bs-target="#${accordionId}"]`);

        if (button) {
          // Button-Klasse "collapsed" entfernen
          button.classList.remove('collapsed');
          // Accordion anzeigen durch Hinzufügen der Bootstrap-"show"-Klasse
          targetAccordion.classList.add('show');
        }
      }

      // Optional: Wert aus localStorage löschen, damit es nicht bei jedem Seitenladen passiert
      localStorage.removeItem('accordionToOpen');
    }
  }

  // Beim Laden der Seite ausführen
  window.addEventListener('load', openAccordionFromLocalStorage);