// function elme(css) {
//   return document.querySelector(css);
// }

// let navigation = elme('.navigation'); // Platzhalter-Div für Navigation
// console.log(navigation);

// fetch('/pages/navindex.html')
//   .then((res) => res.text())
//   .then((data) => {
//     navigation.innerHTML = data; // Navigation wird eingefügt

//     // Initialisierung des Hamburger-Menüs nach dem Einfügen
//     let navToggle = document.querySelector('.nav-toggle');
//     let nav = document.querySelector('.nav');

//     if (navToggle && nav) {
//       navToggle.addEventListener('click', function (e) {
//         e.preventDefault();
//         navToggle.classList.toggle('expanded');
//         nav.classList.toggle('expanded');
//       });
//     } else {
//       console.error('Elemente .nav-toggle oder .nav wurden nicht gefunden.');
//     }
//   })
//   .catch((err) => console.error('Fehler beim Laden der Navigation:', err));

// ================================================================================================

// function elme(css) {
//   return document.querySelector(css);
// }

// let navigation = elme('.navigation'); // Platzhalter-Div für Navigation
// console.log(navigation);

// fetch('/pages/navindex.html')
//   .then((res) => res.text())
//   .then((data) => {
//     navigation.innerHTML = data; // Navigation wird eingefügt

//     // Initialisierung des Hamburger-Menüs nach dem Einfügen
//     let navToggle = document.querySelector('.nav-toggle');
//     let nav = document.querySelector('.nav');

//     if (navToggle && nav) {
//       navToggle.addEventListener('click', function (e) {
//         e.preventDefault();
//         navToggle.classList.toggle('expanded');
//         nav.classList.toggle('expanded');
//       });
//     } else {
//       console.error('Elemente .nav-toggle oder .nav wurden nicht gefunden.');
//     }

//     // --- Neuer Code für die mobile Dropdown-Menüs ---
//     const mobileButtons = document.querySelectorAll('.btn-mobile');

//     mobileButtons.forEach((button) => {
//       button.addEventListener('click', function () {
//         const dropdown = button.nextElementSibling;

//         if (
//           dropdown &&
//           dropdown.classList.contains('dropdown-index-content-mobile')
//         ) {
//           dropdown.classList.toggle('expanded');

//           const icon = button.querySelector('i');
//           if (icon) {
//             icon.classList.toggle('bi-arrow-down-circle');
//             icon.classList.toggle('bi-arrow-up-circle');
//           }
//         } else {
//           console.error('Zu diesem Button gehört kein Dropdown.');
//         }
//       });
//     });
//   })
//   .catch((err) => console.error('Fehler beim Laden der Navigation:', err));

// ========================================================================================
function elme(css) {
  return document.querySelector(css);
}

// Wartet, bis das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', () => {
  let navigation = elme('.navigation'); // Platzhalter-Div für Navigation
  console.log(navigation);

  // Navigation wird dynamisch geladen
  fetch('/pages/navindex.html')
    .then((res) => res.text())
    .then((data) => {
      navigation.innerHTML = data; // Navigation wird eingefügt
      console.log('Navigation erfolgreich geladen.');
      const navLoadedEvent = new Event('navLoaded');
      document.dispatchEvent(navLoadedEvent);
      // Hamburger-Menü initialisieren
      let navToggle = document.querySelector('.nav-toggle');
      let nav = document.querySelector('.nav');

      if (navToggle && nav) {
        navToggle.addEventListener('click', function (e) {
          e.preventDefault();
          navToggle.classList.toggle('expanded');
          nav.classList.toggle('expanded');
        });
      } else {
        console.error('Elemente .nav-toggle oder .nav wurden nicht gefunden.');
      }

      // Schließen der Navigation beim Klick auf einen mobilen Navigationslink
      let mobileLinks = document.querySelectorAll('.nav a');
      mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
          // Nur ausführen, wenn die Navigation geöffnet ist
          if (nav.classList.contains('expanded')) {
            nav.classList.remove('expanded'); // Navigation schließen
            navToggle.classList.remove('expanded'); // Hamburger-Menü zurücksetzen
          }
        });
      });

      // Dropdown-Button in der mobilen Navigation
      let dropdownButtons = document.querySelectorAll('.btn-mobile');
      dropdownButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          let dropdownContent = button.nextElementSibling; // Direktes Geschwisterelement
          let icon = button.querySelector('i'); // Das Icon im Button

          if (dropdownContent) {
            dropdownContent.classList.toggle('expanded'); // Dropdown öffnen/schließen

            // Icon ändern
            if (icon) {
              icon.classList.toggle('bi-arrow-down-circle');
              icon.classList.toggle('bi-arrow-up-circle');
            }
          }
        });
      });
    })
    .catch((err) => console.error('Fehler beim Laden der Navigation:', err));
});
