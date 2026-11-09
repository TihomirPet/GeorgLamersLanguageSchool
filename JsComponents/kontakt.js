const STORYBLOK_TOKEN = 'QmVkDiJSgLsaP7qzh2EIGAtt';
const KONTAKT_HTML = '/pages/contact.html'; // später: '/pages/contact.html'

function esc(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// "0221 331 8191" -> "492213318191", "+49 157 74332043" -> "4915774332043"
function telDigits(nr) {
  const d = String(nr ?? '').replace(/[^\d+]/g, '');
  if (d.startsWith('+')) return d.slice(1);
  if (d.startsWith('00')) return d.slice(2);
  if (d.startsWith('0')) return '49' + d.slice(1);
  return d;
}

// "text" ist schon fertiges HTML (wegen der <br>) und wurde vorher mit esc() abgesichert
function kontaktZeile({ icon, href, text, kompakt = false, neuerTab = false }) {
  const target = neuerTab ? ' target="_blank" rel="noopener"' : '';
  return `
    <div class="d-flex align-items-center">
      <div class="contact-telephone d-flex align-items-center justify-content-center">
        <i class="bi ${icon} font-size-h5"></i>
      </div>
      <a href="${esc(href)}"${target} class="ps-2">
        <h3 class="font-text-contact Semibold third-colour contact-text${kompakt ? ' mb-0' : ''}">${text}</h3>
      </a>
    </div>`;
}

function kontaktZeilen(c) {
  const zeilen = [];

  if (c.telefon) {
    zeilen.push({
      icon: 'bi-telephone-fill',
      href: `tel:+${telDigits(c.telefon)}`,
      text: esc(c.telefon),
    });
  }
  if (c.adresse) {
    zeilen.push({
      icon: 'bi-compass-fill',
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.adresse)}`,
      text: esc(c.adresse).replace(', ', ',<br>'),
      kompakt: true,
      neuerTab: true,
    });
  }
  if (c.email) {
    zeilen.push({
      icon: 'bi-box-arrow-up-right',
      href: `mailto:${c.email.trim()}`,
      text: esc(c.email).replace('@', '@<br>'),
      kompakt: true,
    });
  }
  if (c.whatsapp) {
    zeilen.push({
      icon: 'bi-whatsapp',
      href: `https://wa.me/${telDigits(c.whatsapp)}`,
      text: 'Whatsapp',
      neuerTab: true,
    });
  }
  if (c.instagram) {
    zeilen.push({
      icon: 'bi-instagram',
      href: c.instagram.trim(),
      text: 'Instagram',
      neuerTab: true,
    });
  }

  return zeilen.map(kontaktZeile).join('');
}

async function ladeKontakt() {
  const container = document.querySelector('.contact');
  if (!container) return;

  // 1) Der feste HTML-Teil, wie bisher in contact.js
  try {
    const res = await fetch(KONTAKT_HTML);
    container.innerHTML = await res.text();
  } catch (err) {
    console.error('Kontaktbereich nicht ladbar:', err);
    return;
  }
  window.loadQuizForms?.();
  // 2) Erst danach die Inhalte aus Storyblok einsetzen
  try {
    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/kontakt?token=${STORYBLOK_TOKEN}&version=published`,
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { story } = await res.json();
    const c = story.content;

    container.querySelectorAll('[data-cms]').forEach((el) => {
      if (c[el.dataset.cms]) el.textContent = c[el.dataset.cms];
    });

    const liste = container.querySelector('#kontakt-liste');
    const html = kontaktZeilen(c);
    if (liste && html) liste.innerHTML = html;
  } catch (err) {
    console.error(
      'Kontaktdaten aus Storyblok nicht ladbar, die festen Texte bleiben:',
      err,
    );
  }
}

ladeKontakt();
