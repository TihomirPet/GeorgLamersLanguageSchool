document.addEventListener('DOMContentLoaded', async () => {
  // ======================
  // 🔗 DOM REFERENZEN
  // ======================
  const video = document.getElementById('video');
  const captions = document.getElementById('customCaptions');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const seekBar = document.getElementById('seekBar');
  const volumeSlider = document.getElementById('volume');
  const muteBtn = document.getElementById('muteBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const captionsBtn = document.getElementById('captionsBtn');
  const wrapper = document.getElementById('wrapper');

  // ======================
  // 🔊 INITIALZUSTAND
  // ======================
  video.muted = false;
  video.volume = 1;
  console.log(video.muted, video.volume);

  let captionsEnabled = localStorage.getItem('captionsEnabled') === 'true';
  let cues = [];

  captionsBtn.classList.toggle('active', captionsEnabled);

  // ======================
  // 📥 VTT LADEN & PARSEN
  // ======================
  try {
    const vttText = await fetch('./captions.vtt').then((r) => r.text());
    cues = parseVTT(vttText);
  } catch (e) {
    console.warn('Captions konnten nicht geladen werden:', e);
  }

  function parseVTT(data) {
    const lines = data.split('\n');
    const result = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('-->')) {
        const [start, end] = lines[i].split('-->');

        // Multiline-Cues: alle Zeilen bis zur nächsten Leerzeile sammeln
        const textLines = [];
        let j = i + 1;
        while (j < lines.length && lines[j].trim() !== '') {
          textLines.push(lines[j]);
          j++;
        }

        result.push({
          start: toSec(start),
          end: toSec(end),
          text: textLines.join('\n'),
        });
      }
    }

    return result;
  }

  function toSec(t) {
    const [h, m, s] = t.trim().split(':');
    return +h * 3600 + +m * 60 + parseFloat(s);
  }

  // ======================
  // ⏱ TIMEUPDATE (zusammengefasst)
  // ======================
  video.addEventListener('timeupdate', () => {
    // Seekbar aktualisieren
    seekBar.value = video.currentTime || 0;

    // Captions aktualisieren
    if (captionsEnabled) {
      const t = video.currentTime;
      const cue = cues.find((c) => t >= c.start && t <= c.end);
      captions.textContent = cue ? cue.text : '';
    }
  });

  // seekBar.max nur einmal setzen, wenn Metadaten geladen sind
  video.addEventListener('loadedmetadata', () => {
    seekBar.max = video.duration;
  });

  // ======================
  // 🎬 PLAY / PAUSE
  // ======================
  playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
      // Ton explizit im selben User-Interaction-Kontext setzen
      video.muted = false;
      video.volume = volumeSlider.value;

      video.play().catch((e) => {
        console.warn('Autoplay blockiert:', e);
      });
      playPauseBtn.textContent = '⏸';
    } else {
      video.pause();
      playPauseBtn.textContent = '▶';
    }
  });

  // Button-Icon zurücksetzen wenn Video zu Ende
  video.addEventListener('ended', () => {
    playPauseBtn.textContent = '▶';
  });

  // ======================
  // ⏩ SEEK BAR
  // ======================
  seekBar.addEventListener('input', () => {
    video.currentTime = seekBar.value;
  });

  // ======================
  // 🔊 LAUTSTÄRKE
  // ======================
  volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
    video.muted = volumeSlider.value == 0;
    muteBtn.textContent = video.muted ? '🔇' : '🔊';
  });

  // ======================
  // 🔇 MUTE
  // ======================
  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? '🔇' : '🔊';

    // Slider visuell anpassen
    volumeSlider.value = video.muted ? 0 : video.volume;
  });

  // ======================
  // ⛶ FULLSCREEN
  // ======================
  fullscreenBtn.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) {
        await wrapper.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.warn('Fullscreen nicht verfügbar:', e);
    }
  });

  // ======================
  // 🧾 CAPTIONS BUTTON
  // ======================
  captionsBtn.addEventListener('click', () => {
    captionsEnabled = !captionsEnabled;
    localStorage.setItem('captionsEnabled', captionsEnabled);
    captionsBtn.classList.toggle('active', captionsEnabled);

    if (!captionsEnabled) {
      captions.textContent = '';
    }
  });
});
