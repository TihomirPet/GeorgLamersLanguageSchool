// Funktion, um das passende Formular einzufügen
function loadForm() {
  const container = document.getElementById('form-container');
  container.innerHTML = ''; // Leeren, falls schon was drin ist

  const isMobile = window.innerWidth <= 768; // Mobil bis 768px Breite
  let iframe = document.createElement('iframe');
  let script = document.createElement('script');
  script.src = 'https://link.msgsndr.com/js/form_embed.js';

  if (isMobile) {
    iframe.src =
      'https://api.leadconnectorhq.com/widget/form/RqrtsuwvO6WK1lPpQkdv';
    iframe.style = 'width:100%;height:100%;border:none;border-radius:3px';
    iframe.id = 'inline-RqrtsuwvO6WK1lPpQkdv';
    iframe.setAttribute('data-layout', "{'id':'INLINE'}");
    iframe.setAttribute('data-trigger-type', 'alwaysShow');
    iframe.setAttribute('data-activation-type', 'alwaysActivated');
    iframe.setAttribute('data-deactivation-type', 'neverDeactivate');
    iframe.setAttribute('data-form-name', 'Homepage Form - mobil');
    iframe.setAttribute('data-height', '744');
    iframe.setAttribute('data-layout-iframe-id', 'inline-RqrtsuwvO6WK1lPpQkdv');
    iframe.setAttribute('data-form-id', 'RqrtsuwvO6WK1lPpQkdv');
    iframe.title = 'Homepage Form - mobil';
  } else {
    iframe.src = '/widget/form/YakqhyDE9e6Hk7kcixy2';
    iframe.style = 'width:100%;height:100%;border:none;border-radius:4px';
    iframe.id = 'inline-YakqhyDE9e6Hk7kcixy2';
    iframe.setAttribute('data-layout', "{'id':'INLINE'}");
    iframe.setAttribute('data-trigger-type', 'alwaysShow');
    iframe.setAttribute('data-activation-type', 'alwaysActivated');
    iframe.setAttribute('data-deactivation-type', 'neverDeactivate');
    iframe.setAttribute('data-form-name', '');
    iframe.setAttribute('data-height', 'undefined');
    iframe.setAttribute('data-layout-iframe-id', 'inline-YakqhyDE9e6Hk7kcixy2');
    iframe.setAttribute('data-form-id', 'YakqhyDE9e6Hk7kcixy2');
    iframe.title = '';
  }

  container.appendChild(iframe);
  container.appendChild(script);
}

// Beim Laden und beim Ändern der Fenstergröße prüfen
window.addEventListener('load', loadForm);
window.addEventListener('resize', loadForm);
