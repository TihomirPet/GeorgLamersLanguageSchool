// form.js
// Mehrstufiges Anfrage-Formular (Versand über Web3Forms).
// Kann beliebig oft auf einer Seite vorkommen. Platzhalter im HTML:
//   <div data-quiz-form data-quelle="Header"></div>
// Das Formular selbst liegt in /pages/quizform.html.

const QUIZ_FORM_URL = '/pages/quizform.html';
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
const TOTAL_STEPS = 5; // Schritt 6 ist der Danke-Screen und zählt nicht mit

let quizFormPromise = null;
let formCounter = 0;

function sanitizeInput(str) {
  if (!str) return '';
  return str.replace(/[<>]/g, '');
}

// ======================================================
// Formular-Partial in alle Platzhalter laden
// ======================================================
window.loadQuizForms = async function () {
  const slots = Array.from(
    document.querySelectorAll('[data-quiz-form]:not([data-loaded])'),
  );
  if (slots.length === 0) return;

  // Sofort markieren, damit ein zweiter Aufruf (z. B. aus contact.js)
  // dieselben Platzhalter nicht noch einmal befüllt
  slots.forEach((slot) => {
    slot.dataset.loaded = 'true';
  });

  try {
    if (!quizFormPromise) {
      quizFormPromise = fetch(QUIZ_FORM_URL).then((res) => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      });
    }
    const html = await quizFormPromise;

    slots.forEach((slot) => {
      slot.innerHTML = html;
      const quelle = slot.querySelector('input[name="quelle"]');
      if (quelle) quelle.value = slot.dataset.quelle || '';
    });

    window.initQuizForm();
  } catch (err) {
    console.error('Formular konnte nicht geladen werden:', err);
    quizFormPromise = null;
    slots.forEach((slot) => {
      delete slot.dataset.loaded;
    });
  }
};

// ======================================================
// IDs pro Formular eindeutig machen (fullname -> fullname-1 usw.)
// und die zugehörigen <label for="..."> mitziehen
// ======================================================
function makeIdsUnique(form) {
  formCounter++;
  form.querySelectorAll('[id]').forEach((el) => {
    const oldId = el.id;
    const newId = `${oldId}-${formCounter}`;
    form.querySelectorAll(`label[for="${oldId}"]`).forEach((label) => {
      label.htmlFor = newId;
    });
    el.id = newId;
  });
}

// ======================================================
// Alle noch nicht initialisierten Formulare starten
// ======================================================
window.initQuizForm = function () {
  document.querySelectorAll('form.quiz-form').forEach((form) => {
    if (form.dataset.initialized === 'true') return;
    form.dataset.initialized = 'true';

    makeIdsUnique(form);

    const steps = Array.from(form.querySelectorAll('.step'));
    const btnNext = form.querySelector('.btn-next');
    const btnBack = form.querySelector('.btn-back');
    const btnNextLabel = form.querySelector('.btn-next span:first-child');
    const stepCount = form.querySelector('.step-count');
    const navRow = form.querySelector('.nav-row');

    // Felder über das name-Attribut finden (IDs sind pro Formular verschieden)
    const field = (name) => form.querySelector(`[name="${name}"]`);

    let currentStep = 1;

    function updateSteps() {
      steps.forEach((step) => {
        const stepNum = parseInt(step.getAttribute('data-step'), 10);
        step.classList.toggle('active', stepNum === currentStep);
      });

      if (currentStep <= TOTAL_STEPS) {
        if (stepCount) stepCount.textContent = `${currentStep}/${TOTAL_STEPS}`;

        if (btnBack) {
          const hideBack = currentStep === 1;
          btnBack.classList.toggle('hidden', hideBack);
          btnBack.style.display = hideBack ? 'none' : 'flex';
        }

        if (btnNextLabel) {
          btnNextLabel.textContent =
            currentStep === TOTAL_STEPS ? 'Absenden' : 'Weiter';
        }
      } else if (navRow) {
        navRow.style.display = 'none';
      }
    }

    function validateCurrentStep() {
      const activeStepEl = form.querySelector(
        `.step[data-step="${currentStep}"]`,
      );
      if (!activeStepEl) return true;

      const errorMsg = activeStepEl.querySelector('.error-msg');
      let isValid = true;

      if (currentStep === 1) {
        isValid =
          activeStepEl.querySelectorAll('input[name="kategorie"]:checked')
            .length > 0;
      } else if (currentStep === 2) {
        isValid = !!activeStepEl.querySelector(
          'input[name="sprachniveau"]:checked',
        );
      } else if (currentStep === 3) {
        isValid = !!activeStepEl.querySelector(
          'input[name="zeitpunkt"]:checked',
        );
      } else if (currentStep === 4) {
        isValid = !!activeStepEl.querySelector('input[name="uhrzeit"]:checked');
      } else if (currentStep === 5) {
        const fullname = sanitizeInput(field('fullname')?.value.trim());
        const email = field('email')?.value.trim() || '';
        const telefon = sanitizeInput(field('telefon')?.value.trim());
        const consent = field('consent')?.checked;
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        // Fehlerhafte Felder rot markieren (CSS: .field input.invalid)
        field('fullname')?.classList.toggle('invalid', !fullname);
        field('email')?.classList.toggle('invalid', !emailOk);
        field('telefon')?.classList.toggle('invalid', !telefon);

        isValid = !!fullname && emailOk && !!telefon && !!consent;
      }

      if (errorMsg) errorMsg.classList.toggle('show', !isValid);
      return isValid;
    }

    async function submitForm() {
      btnNext.disabled = true;
      if (btnNextLabel) btnNextLabel.textContent = 'Wird gesendet…';

      const formData = new FormData(form);

      // Eingaben bereinigen
      formData.set('fullname', sanitizeInput(field('fullname')?.value || ''));
      formData.set('telefon', sanitizeInput(field('telefon')?.value || ''));

      // Mehrfachauswahl zu einem Wert zusammenfassen
      const kategorien = Array.from(
        form.querySelectorAll('input[name="kategorie"]:checked'),
      ).map((input) => input.value);
      formData.delete('kategorie');
      formData.set('kategorie', kategorien.join(', '));

      try {
        const response = await fetch(WEB3FORMS_URL, {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();

        if (result.success) {
          currentStep = 6;
          updateSteps();
        } else {
          alert(
            'Fehler beim Absenden: ' +
              (result.message || 'Bitte versuche es erneut.'),
          );
          btnNext.disabled = false;
          if (btnNextLabel) btnNextLabel.textContent = 'Absenden';
        }
      } catch (error) {
        console.error('Web3Forms Fehler:', error);
        alert(
          'Das Senden hat leider nicht geklappt. Bitte prüfe deine Internetverbindung oder ruf uns an: 0221 331 8191',
        );
        btnNext.disabled = false;
        if (btnNextLabel) btnNextLabel.textContent = 'Absenden';
      }
    }

    // Enter-Taste darf das Formular nicht normal absenden
    form.addEventListener('submit', (e) => e.preventDefault());

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (!validateCurrentStep()) return;

        if (currentStep === TOTAL_STEPS) {
          submitForm();
        } else {
          currentStep++;
          updateSteps();
        }
      });
    }

    if (btnBack) {
      btnBack.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          updateSteps();
        }
      });
    }

    updateSteps();
  });
};

// Platzhalter auf der Seite befüllen. Platzhalter, die erst später
// durch contact.js ins DOM kommen, werden von dort nachgeladen.
document.addEventListener('DOMContentLoaded', () => {
  window.loadQuizForms();
  window.initQuizForm();
});
