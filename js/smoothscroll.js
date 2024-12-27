// Wähle das Haupt-Element (oder das Scroll-Element) aus
const main = document.querySelector('.main'); // Passe dies an dein Scroll-Element an!

// Variablen zur Steuerung des Scroll-Verhaltens
let currentScroll = 0; // Die aktuelle Scrollposition
let targetScroll = 0;  // Die Zielposition
const easeFactor = 0.2; // Kontrolliert die "Glätte" des Scrollens (kleiner = glatter)

// Funktion für das sanfte Scrollen
function smoothScroll() {
  // Berechne die nächste Scrollposition
  currentScroll += (targetScroll - currentScroll) * easeFactor;

  // Wende die Scrollposition an
  main.style.transform = `translateY(-${currentScroll}px)`;

  // Beende die Animation, wenn der Unterschied minimal ist
  if (Math.abs(targetScroll - currentScroll) > 6) {
    requestAnimationFrame(smoothScroll); // Wiederhole die Animation
  }
}

// Event-Listener für Scroll-Ereignisse (z. B. Mausrad)
window.addEventListener('wheel', (event) => {
  // Berechne die neue Zielposition basierend auf der Scrollrichtung
  targetScroll += event.deltaY;

  // Begrenze die Zielposition, damit sie nicht über den Inhalt hinausgeht
  targetScroll = Math.max(0, Math.min(targetScroll, main.scrollHeight - window.innerHeight));

  // Starte die Animation
  requestAnimationFrame(smoothScroll);
});

let touchStartY = 0;

window.addEventListener('touchstart', (event) => {
  touchStartY = event.touches[0].clientY;
});

window.addEventListener('touchmove', (event) => {
  const deltaY = touchStartY - event.touches[0].clientY;
  targetScroll += deltaY;
  targetScroll = Math.max(
    0,
    Math.min(targetScroll, main.scrollHeight - window.innerHeight)
  );
  touchStartY = event.touches[0].clientY;
  requestAnimationFrame(smoothScroll);
});

// ==================================================================================================================================================


