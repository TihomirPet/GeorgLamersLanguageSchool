document.addEventListener('DOMContentLoaded', async () => {
  const video = document.getElementById('video');
  const captions = document.getElementById('customCaptions');

  const playPauseBtn = document.getElementById('playPauseBtn');
  const seekBar = document.getElementById('seekBar');
  const volume = document.getElementById('volume');
  const speed = document.getElementById('speed');
  const muteBtn = document.getElementById('muteBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const captionsBtn = document.getElementById('captionsBtn');

  const wrapper = document.getElementById('wrapper');

  // ======================
  // 🔊 INITIAL STATE
  // ======================
  video.muted = false;
  video.volume = 1;

  // 🔥 CC Zustand laden (Standard = AUS)
  let captionsEnabled = localStorage.getItem('captionsEnabled') === 'true';

  // UI synchronisieren
  if (captionsEnabled) {
    captionsBtn.classList.add('active');
  } else {
    captions.textContent = '';
    captionsBtn.classList.remove('active');
  }

  // ======================
  // 📥 LOAD VTT FILE
  // ======================
  const vttText = await fetch('./captions.vtt').then((r) => r.text());

  const cues = parseVTT(vttText);

  function parseVTT(data) {
    const lines = data.split('\n');
    const result = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('-->')) {
        const [start, end] = lines[i].split('-->');
        const text = lines[i + 1];

        result.push({
          start: toSec(start),
          end: toSec(end),
          text,
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
  // 🧾 CAPTIONS ENGINE
  // ======================
  video.addEventListener('timeupdate', () => {
    if (!captionsEnabled) return;

    const t = video.currentTime;

    const cue = cues.find((c) => t >= c.start && t <= c.end);

    captions.textContent = cue ? cue.text : '';
  });

  // ======================
  // 🎬 PLAY / PAUSE
  // ======================
  playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
      // 🔥 Ton beim Start sicherstellen
      video.muted = false;
      video.volume = 1;

      video.play();
      playPauseBtn.textContent = '⏸';
    } else {
      video.pause();
      playPauseBtn.textContent = '▶';
    }
  });

  // ======================
  // ⏩ SEEK BAR
  // ======================
  video.addEventListener('timeupdate', () => {
    seekBar.max = video.duration || 0;
    seekBar.value = video.currentTime || 0;
  });

  seekBar.addEventListener('input', () => {
    video.currentTime = seekBar.value;
  });

  // ======================
  // 🔊 VOLUME
  // ======================
  volume.addEventListener('input', () => {
    video.volume = volume.value;

    if (volume.value == 0) {
      video.muted = true;
      muteBtn.textContent = '🔇';
    } else {
      video.muted = false;
      muteBtn.textContent = '🔊';
    }
  });

  // ======================
  // 🔇 MUTE
  // ======================
  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;

    muteBtn.textContent = video.muted ? '🔇' : '🔊';
  });

  // ======================
  // ⚡ SPEED
  // ======================
  speed.addEventListener('change', () => {
    video.playbackRate = speed.value;
  });

  // ======================
  // ⛶ FULLSCREEN
  // ======================
  fullscreenBtn.addEventListener('click', async () => {
    if (!document.fullscreenElement) {
      await wrapper.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  });

  // ======================
  // 🧾 CC BUTTON (MIT SPEICHER)
  // ======================
  captionsBtn.addEventListener('click', () => {
    captionsEnabled = !captionsEnabled;

    // 🔥 Zustand speichern
    localStorage.setItem('captionsEnabled', captionsEnabled);

    // UI aktualisieren
    captionsBtn.classList.toggle('active', captionsEnabled);

    // Text löschen wenn AUS
    if (!captionsEnabled) {
      captions.textContent = '';
    }
  });
});
