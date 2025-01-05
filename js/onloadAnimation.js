window.addEventListener('load', () => {
  console.log('Animation gestartet'); // Debugging-Log

  // Überprüfen, ob die Animation bereits ausgeführt wurde
  if (localStorage.getItem('animationPlayed')) {
    console.log('Animation bereits ausgeführt'); // Debugging-Log
    document.querySelectorAll('.char').forEach((char) => {
      char.style.opacity = 1;
      char.style.transform = 'none';
    });
    document.querySelectorAll('.animated-item').forEach((card) => {
      card.style.opacity = 1;
      card.style.transform = 'none';
    });
    const animatedButton = document.querySelector('.animated-button');
    if (animatedButton) {
      animatedButton.style.opacity = 1;
      animatedButton.style.transform = 'none';
    }
    return; // Weitere Animationen überspringen
  }

  // Funktion, um Text in einzelne Zeichen zu splitten
  const splitText = (element) => {
    if (!element) return; // Sicherstellen, dass das Element existiert
    const text = element.innerHTML; // Holen des HTML-Inhalts
    const chars = text
      .split(/(<br\s*\/?>|\s)/gi) // Aufteilen bei <br> und Leerzeichen
      .map((part) => {
        if (part.match(/<br\s*\/?>/gi)) {
          return part;
        } else if (part === ' ') {
          return `<span class="char space">&nbsp;</span>`;
        } else {
          return part
            .split('')
            .map((char) => `<span class="char">${char}</span>`)
            .join('');
        }
      })
      .join('');
    element.innerHTML = chars;
  };

  // Ziel-Elemente für die Animation
  const title = document.getElementById('animated-title');
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  const line3 = document.getElementById('line3');

  // Split Text für alle Ziel-Elemente
  splitText(title);
  splitText(line1);
  splitText(line2);
  splitText(line3);

  // GSAP Animation für Titel und Zeile1 gleichzeitig
  gsap.fromTo(
    '.char',
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.05,
      ease: 'power2.out',
    }
  );

  // Animation für die Karten
  gsap.fromTo(
    '.animated-item',
    { x: 0, opacity: 0 }, // Startposition und Transparenz
    {
      x: 0, // Endposition (normalerweise der aktuelle Platz)
      opacity: 1, // End-Transparenz
      duration: 1.5, // Dauer der Animation
      stagger: 0.5, // Abstand zwischen den Karten
      ease: 'power2.out', // Animationseffekt
    }
  );

  // Animation für den Button (falls vorhanden)
  const animatedButton = document.querySelector('.animated-button');
  if (animatedButton) {
    gsap.fromTo(
      '.animated-button',
      { x: -50, opacity: 0 }, // Startposition und Transparenz
      {
        x: 0, // Endposition (normalerweise der aktuelle Platz)
        opacity: 1, // End-Transparenz
        duration: 1, // Dauer der Animation
        delay: 1.5, // Zeitverzögerung nach den Karten
        ease: 'power2.out', // Animationseffekt
      }
    );
  }

  // Markiere die Animation als abgeschlossen
  localStorage.setItem('animationPlayed', true);
});
