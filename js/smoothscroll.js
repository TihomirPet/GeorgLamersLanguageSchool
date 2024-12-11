// const main = document.querySelector('.main');

// // Variablen zur Verwaltung der Scroll-Position
// let currentScroll = 0; // Die aktuelle Scrollposition
// let targetScroll = 0.1; // Die Zielposition
// const easeFactor = 0.1; // Kontrolliert die "Glätte" des Scrollens (kleiner = langsamer)
// const sections = document.querySelectorAll('section');

// // Ausgabe der Höhen jedes Abschnitts
// sections.forEach((section) => {
//   console.log(section.offsetHeight);
// });

// // 1. Smooth-Scroll-Funktion
// function smoothScroll() {
//   // Berechne den nächsten Schritt der Annäherung
//   currentScroll += (targetScroll - currentScroll) * easeFactor;

//   // Wende die transformierte Position an
//   main.style.transform = `translateY(-${currentScroll}px)`;

//   // Beende die Animation, wenn die Bewegung minimal ist (Optimierung)
//   if (Math.abs(targetScroll - currentScroll) > 0.5) {
//     requestAnimationFrame(smoothScroll);
//   }
// }

// // 2. Event-Listener für Scroll-Eingaben (Mausrad oder Touchpad)
// window.addEventListener('wheel', (event) => {
//   // Aktualisiere die Zielposition basierend auf der Scrollrichtung
//   targetScroll += event.deltaY;

//   // Begrenze die Zielposition, damit sie nicht über den Inhalt hinausgeht
//   targetScroll = Math.max(
//     0,
//     Math.min(targetScroll, main.scrollHeight - window.innerHeight)
//   );

//   // Starte die Animation (einmaliger Aufruf)
//   requestAnimationFrame(smoothScroll);
// });
// ######################################################################################
// // Wähle das Haupt-Element aus
// const main = document.querySelector('.main');

// // Variablen zur Verwaltung der Scroll-Position
// let currentScroll = 0; // Die aktuelle Scrollposition
// let targetScroll = 0;  // Die Zielposition
// let easeFactor = 0.1;  // Kontrolliert die "Glätte" des Scrollens

// // Funktion zur dynamischen Anpassung der Geschwindigkeit
// function updateEaseFactor() {
//     // Berechne die Gesamthöhe des Inhalts abzüglich der Fensterhöhe
//     const totalHeight = main.scrollHeight - window.innerHeight;

//     // Dynamische Anpassung: Relativer Geschwindigkeitsfaktor
//     const relativeSpeed = Math.min(1, 1000 / totalHeight); // Maximal 1 (schnell), minimal langsamer bei großen Seiten

//     // Aktualisiere den Ease-Faktor basierend auf dem relativen Geschwindigkeitsfaktor
//     easeFactor = 0.1 * relativeSpeed;
// }

// // Smooth-Scroll-Funktion
// function smoothScroll() {
//     // Berechne den nächsten Schritt der Annäherung
//     currentScroll += (targetScroll - currentScroll) * easeFactor;

//     // Wende die transformierte Position an
//     main.style.transform = `translateY(-${currentScroll}px)`;

//     // Beende die Animation, wenn die Bewegung minimal ist
//     if (Math.abs(targetScroll - currentScroll) > 0.5) {
//         requestAnimationFrame(smoothScroll);
//     }
// }

// // Event-Listener für Scroll-Eingaben (Mausrad oder Touchpad)
// window.addEventListener('wheel', (event) => {
//     // Aktualisiere die Zielposition basierend auf der Scrollrichtung
//     targetScroll += event.deltaY;

//     // Begrenze die Zielposition
//     targetScroll = Math.max(0, Math.min(targetScroll, main.scrollHeight - window.innerHeight));

//     // Aktualisiere die Geschwindigkeit bei jeder Scroll-Eingabe
//     updateEaseFactor();

//     // Starte die Animation
//     requestAnimationFrame(smoothScroll);
// });

// // Initiale Berechnung des Ease-Faktors (beim Laden der Seite)
// updateEaseFactor();