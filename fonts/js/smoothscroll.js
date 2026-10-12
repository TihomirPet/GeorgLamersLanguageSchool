// // Wähle das Haupt-Element (oder das Scroll-Element) aus
// const main = document.querySelector('.main'); // Passe dies an dein Scroll-Element an!

// // Variablen zur Steuerung des Scroll-Verhaltens
// let currentScroll = 0; // Die aktuelle Scrollposition
// let targetScroll = 0;  // Die Zielposition
// const easeFactor = 0.2; // Kontrolliert die "Glätte" des Scrollens (kleiner = glatter)

// // Funktion für das sanfte Scrollen
// function smoothScroll() {
//   // Berechne die nächste Scrollposition
//   currentScroll += (targetScroll - currentScroll) * easeFactor;

//   // Wende die Scrollposition an
//   main.style.transform = `translateY(-${currentScroll}px)`;

//   // Beende die Animation, wenn der Unterschied minimal ist
//   if (Math.abs(targetScroll - currentScroll) > 6) {
//     requestAnimationFrame(smoothScroll); // Wiederhole die Animation
//   }
// }

// // Event-Listener für Scroll-Ereignisse (z. B. Mausrad)
// window.addEventListener('wheel', (event) => {
//   // Berechne die neue Zielposition basierend auf der Scrollrichtung
//   targetScroll += event.deltaY;

//   // Begrenze die Zielposition, damit sie nicht über den Inhalt hinausgeht
//   targetScroll = Math.max(0, Math.min(targetScroll, main.scrollHeight - window.innerHeight));

//   // Starte die Animation
//   requestAnimationFrame(smoothScroll);
// });

// let touchStartY = 0;

// window.addEventListener('touchstart', (event) => {
//   touchStartY = event.touches[0].clientY;
// });

// window.addEventListener('touchmove', (event) => {
//   const deltaY = touchStartY - event.touches[0].clientY;
//   targetScroll += deltaY;
//   targetScroll = Math.max(
//     0,
//     Math.min(targetScroll, main.scrollHeight - window.innerHeight)
//   );
//   touchStartY = event.touches[0].clientY;
//   requestAnimationFrame(smoothScroll);
// });

// ==================================================================================================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Nur Canvas-Elemente finden, wenn sie existieren
  const canvases = document.querySelectorAll('.noiseCanvas');

  if (canvases.length === 0) {
    console.error('⚠ Kein Canvas-Element gefunden!');
    return;
  }

  canvases.forEach((canvas) => {
    const context = canvas.getContext('2d');

    // 50 = gewünschte Zellgröße in CSS-Pixeln (optische Größe).
    // Multiplikation mit devicePixelRatio sorgt dafür, dass das Gitter
    // auf Retina-Displays optisch gleich groß bleibt.
    const CELL_SIZE_CSS_PX = 50;

    function resize() {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';

      drawGrid();
    }

    function drawGrid() {
      const w = context.canvas.width;
      const h = context.canvas.height;
      const cellSize = CELL_SIZE_CSS_PX * window.devicePixelRatio;

      // Canvas leeren
      context.clearRect(0, 0, w, h);

      // Rasterlinien zeichnen
      context.strokeStyle = 'rgba(253, 251, 236, 0.3)'; // Weiße Linien mit Transparenz
      context.lineWidth = 1;

      // Alle Linien in EINEM Pfad sammeln und nur einmal stroken
      // (kein wiederholtes Zeichnen, kein Rauschen, keine Animation -> kein Flackern).
      context.beginPath();

      for (let x = 0; x < w; x += cellSize) {
        context.moveTo(x, 0);
        context.lineTo(x, h);
      }

      for (let y = 0; y < h; y += cellSize) {
        context.moveTo(0, y);
        context.lineTo(w, y);
      }

      context.stroke();
    }

    // Gitter wird nur einmal gezeichnet und bei Größenänderung neu -
    // keine Animation-Loop, daher kein Flackern.
    resize();
    window.addEventListener('resize', resize);

    // Optionales Cleanup, falls das Canvas z. B. bei SPA-Navigation entfernt wird.
    canvas._cleanupGrid = () => {
      window.removeEventListener('resize', resize);
    };
  });
});
