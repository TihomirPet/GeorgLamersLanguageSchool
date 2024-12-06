


function elme(css) {
  return document.querySelector(css);
}

let navigation = elme('.navigation'); // Platzhalter-Div für Navigation
console.log(navigation);

fetch('/pages/navindex.html')
  .then((res) => res.text())
  .then((data) => {
    navigation.innerHTML = data; // Navigation wird eingefügt

    // Initialisierung des Hamburger-Menüs nach dem Einfügen
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
  })
  .catch((err) => console.error('Fehler beim Laden der Navigation:', err));