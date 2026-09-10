// === Konfiguration ===
// Kostenloser Formular-Versand ohne eigenes Backend via Web3Forms.
// Access Key hier eintragen: https://web3forms.com (kostenlos registrieren, Key kopieren)
const WEB3FORMS_ACCESS_KEY = 'DEIN_ACCESS_KEY_HIER';

const totalSteps = 5; // Kontaktdaten ist Schritt 5, Danke-Screen zählt nicht mit
let currentStep = 1;

const steps = document.querySelectorAll('.step');
const btnNext = document.getElementById('btnNext');
const btnNextLabel = document.getElementById('btnNextLabel');
const btnBack = document.getElementById('btnBack');
const stepCount = document.getElementById('stepCount');
const navRow = document.getElementById('navRow');
const form = document.getElementById('quizForm');

function showStep(n) {
  steps.forEach((s) =>
    s.classList.toggle('active', Number(s.dataset.step) === n),
  );
  btnBack.classList.toggle('hidden', n === 1);
  stepCount.textContent = n + '/' + totalSteps;
  btnNextLabel.textContent = n === totalSteps ? 'Absenden' : 'Weiter';
  hideAllErrors();
}

function hideAllErrors() {
  document
    .querySelectorAll('.error-msg')
    .forEach((e) => e.classList.remove('show'));
}

function showError(stepEl) {
  stepEl.querySelector('.error-msg').classList.add('show');
}

function validateStep(n) {
  const stepEl = document.querySelector('.step[data-step="' + n + '"]');
  if (n === 1) {
    const checked = stepEl.querySelectorAll('input[name="kategorie"]:checked');
    if (checked.length === 0) {
      showError(stepEl);
      return false;
    }
  }
  if (n === 2) {
    if (!stepEl.querySelector('input[name="sprachniveau"]:checked')) {
      showError(stepEl);
      return false;
    }
  }
  if (n === 3) {
    if (!stepEl.querySelector('input[name="zeitpunkt"]:checked')) {
      showError(stepEl);
      return false;
    }
  }
  if (n === 4) {
    if (!stepEl.querySelector('input[name="uhrzeit"]:checked')) {
      showError(stepEl);
      return false;
    }
  }
  if (n === 5) {
    const name = document.getElementById('fullname');
    const email = document.getElementById('email');
    const telefon = document.getElementById('telefon');
    const consent = document.getElementById('consent');
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    let ok = true;
    [name, email, telefon].forEach((f) => f.classList.remove('invalid'));
    if (!name.value.trim()) {
      name.classList.add('invalid');
      ok = false;
    }
    if (!email.value.trim() || !emailValid) {
      email.classList.add('invalid');
      ok = false;
    }
    if (!telefon.value.trim()) {
      telefon.classList.add('invalid');
      ok = false;
    }
    if (!consent.checked) {
      ok = false;
    }
    if (!ok) {
      showError(stepEl);
      return false;
    }
  }
  return true;
}

async function submitForm() {
  btnNext.disabled = true;
  btnNextLabel.textContent = 'Wird gesendet…';

  const kategorien = Array.from(
    document.querySelectorAll('input[name="kategorie"]:checked'),
  ).map((i) => i.value);
  const data = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: 'Neue Kursanfrage – Webseite',
    kategorie: kategorien.join(', '),
    sprachniveau:
      document.querySelector('input[name="sprachniveau"]:checked')?.value || '',
    zeitpunkt:
      document.querySelector('input[name="zeitpunkt"]:checked')?.value || '',
    uhrzeit:
      document.querySelector('input[name="uhrzeit"]:checked')?.value || '',
    name: document.getElementById('fullname').value.trim(),
    email: document.getElementById('email').value.trim(),
    telefon: document.getElementById('telefon').value.trim(),
  };

  try {
    if (
      WEB3FORMS_ACCESS_KEY &&
      WEB3FORMS_ACCESS_KEY !== 'DEIN_ACCESS_KEY_HIER'
    ) {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });
    } else {
      console.warn(
        'Web3Forms Access Key fehlt – Daten wurden nicht versendet:',
        data,
      );
    }
  } catch (err) {
    console.error('Fehler beim Senden:', err);
  }

  navRow.style.display = 'none';
  showStep(6);
  btnNext.disabled = false;
}

btnNext.addEventListener('click', () => {
  if (!validateStep(currentStep)) return;
  if (currentStep < totalSteps) {
    currentStep++;
    showStep(currentStep);
  } else {
    submitForm();
  }
});

btnBack.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
});

form.addEventListener('submit', (e) => e.preventDefault());

showStep(currentStep);
