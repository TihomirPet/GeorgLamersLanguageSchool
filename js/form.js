// // Funktion, um das passende Formular einzufügen
// function loadForm() {
//   const container = document.getElementById('form-container');
//   container.innerHTML = ''; // Leeren, falls schon was drin ist

//   const isMobile = window.innerWidth <= 768; // Mobil bis 768px Breite
//   let iframe = document.createElement('iframe');
//   let script = document.createElement('script');
//   script.src = 'https://link.msgsndr.com/js/form_embed.js';

//   if (isMobile) {
//     iframe.src =
//       'https://api.leadconnectorhq.com/widget/form/RqrtsuwvO6WK1lPpQkdv';
//     iframe.style = 'width:100%;height:100%;border:none;border-radius:3px';
//     iframe.id = 'inline-RqrtsuwvO6WK1lPpQkdv';
//     iframe.setAttribute('data-layout', "{'id':'INLINE'}");
//     iframe.setAttribute('data-trigger-type', 'alwaysShow');
//     iframe.setAttribute('data-activation-type', 'alwaysActivated');
//     iframe.setAttribute('data-deactivation-type', 'neverDeactivate');
//     iframe.setAttribute('data-form-name', 'Homepage Form - mobil');
//     iframe.setAttribute('data-height', '744');
//     iframe.setAttribute('data-layout-iframe-id', 'inline-RqrtsuwvO6WK1lPpQkdv');
//     iframe.setAttribute('data-form-id', 'RqrtsuwvO6WK1lPpQkdv');
//     iframe.title = 'Homepage Form - mobil';
//   } else {
//     iframe.src = '/widget/form/YakqhyDE9e6Hk7kcixy2';
//     iframe.style = 'width:100%;height:100%;border:none;border-radius:4px';
//     iframe.id = 'inline-YakqhyDE9e6Hk7kcixy2';
//     iframe.setAttribute('data-layout', "{'id':'INLINE'}");
//     iframe.setAttribute('data-trigger-type', 'alwaysShow');
//     iframe.setAttribute('data-activation-type', 'alwaysActivated');
//     iframe.setAttribute('data-deactivation-type', 'neverDeactivate');
//     iframe.setAttribute('data-form-name', '');
//     iframe.setAttribute('data-height', 'undefined');
//     iframe.setAttribute('data-layout-iframe-id', 'inline-YakqhyDE9e6Hk7kcixy2');
//     iframe.setAttribute('data-form-id', 'YakqhyDE9e6Hk7kcixy2');
//     iframe.title = '';
//   }

//   container.appendChild(iframe);
//   container.appendChild(script);
// }

// // Beim Laden und beim Ändern der Fenstergröße prüfen
// window.addEventListener('load', loadForm);
// window.addEventListener('resize', loadForm);
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quizForm');
  if (!form) return;

  const steps = Array.from(form.querySelectorAll('.step'));
  const btnNext = document.getElementById('btnNext');
  const btnBack = document.getElementById('btnBack');
  const btnNextLabel = document.getElementById('btnNextLabel');
  const stepCount = document.getElementById('stepCount');
  const navRow = document.getElementById('navRow');

  let currentStep = 1;
  const totalInteractiveSteps = 5;

  function updateSteps() {
    steps.forEach((step) => {
      const stepNum = parseInt(step.getAttribute('data-step'), 10);
      step.classList.toggle('active', stepNum === currentStep);
    });

    if (currentStep <= totalInteractiveSteps) {
      if (stepCount)
        stepCount.textContent = `${currentStep}/${totalInteractiveSteps}`;
      if (btnBack) btnBack.classList.toggle('hidden', currentStep === 1);
      if (btnNextLabel) {
        btnNextLabel.textContent =
          currentStep === totalInteractiveSteps ? 'Absenden' : 'Weiter';
      }
    } else {
      if (navRow) navRow.style.display = 'none';
    }
  }

  function validateCurrentStep() {
    const activeStepEl = form.querySelector(
      `.step[data-step="${currentStep}"]`,
    );
    if (!activeStepEl) return true;

    const errorMsg = activeStepEl.querySelector('.error-msg');
    let isValid = true;

    if (errorMsg) errorMsg.style.display = 'none';

    if (currentStep === 1) {
      const checked = activeStepEl.querySelectorAll(
        'input[name="kategorie"]:checked',
      );
      if (checked.length === 0) isValid = false;
    } else if (currentStep === 2) {
      const checked = activeStepEl.querySelector(
        'input[name="sprachniveau"]:checked',
      );
      if (!checked) isValid = false;
    } else if (currentStep === 3) {
      const checked = activeStepEl.querySelector(
        'input[name="zeitpunkt"]:checked',
      );
      if (!checked) isValid = false;
    } else if (currentStep === 4) {
      const checked = activeStepEl.querySelector(
        'input[name="uhrzeit"]:checked',
      );
      if (!checked) isValid = false;
    } else if (currentStep === 5) {
      const fullname = activeStepEl.querySelector('#fullname')?.value.trim();
      const email = activeStepEl.querySelector('#email')?.value.trim();
      const telefon = activeStepEl.querySelector('#telefon')?.value.trim();
      const consent = activeStepEl.querySelector('#consent')?.checked;

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        !fullname ||
        !email ||
        !emailPattern.test(email) ||
        !telefon ||
        !consent
      ) {
        isValid = false;
      }
    }

    if (!isValid && errorMsg) {
      errorMsg.style.display = 'block';
    }

    return isValid;
  }

  if (btnNext) {
    btnNext.addEventListener('click', async () => {
      if (!validateCurrentStep()) return;

      if (currentStep === totalInteractiveSteps) {
        btnNext.disabled = true;
        if (btnNextLabel) btnNextLabel.textContent = 'Wird gesendet...';

        const formData = new FormData(form);

        try {
          // Echtes Absenden an die Web3Forms API
          const response = await fetch('https://api.web3forms.com/submit', {
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
                (result.message || 'Bitte erneut versuchen.'),
            );
            btnNext.disabled = false;
            if (btnNextLabel) btnNextLabel.textContent = 'Absenden';
          }
        } catch (error) {
          console.error('Web3Forms Fehler:', error);
          alert('Netzwerkfehler! Bitte überprüfe deine Internetverbindung.');
          btnNext.disabled = false;
          if (btnNextLabel) btnNextLabel.textContent = 'Absenden';
        }
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