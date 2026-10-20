const STORYBLOK_TOKEN = 'QmVkDiJSgLsaP7qzh2EIGAtt';
const KURSE_URL = '/pages/courses.html#accordionFlushExample';

// Macht den Text aus Storyblok sicher für HTML
function esc(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Zeilenumbrüche aus Storyblok werden zu <br>
function withBreaks(text) {
  return esc(text).replace(/\n/g, '<br>');
}

function kursLink(l, i, istLetzter) {
  const url = (l.url || '').trim() || KURSE_URL;
  const abstand =
    (i === 0 ? 'ps-4 pe-2 mt-xl-4' : 'ps-3 pe-2') +
    (istLetzter ? ' mb-xl-4' : '');

  return `
    <div class="courses-holder ${abstand}">
      <a class="courses-link btnc btn-courses letter-spacing-title w-100 d-flex align-items-center justify-content-between"
         href="${url}" role="button" data-accordion="${esc(l.accordion_id)}">
        <h6 class="Semibold letter-spacing-title font-size-h6 text-start">${esc(l.text)}</h6>
        <i class="bi bi-arrow-right-circle font-size-h5"></i>
      </a>
    </div>`;
}
function unterrichtsformItem(u, i) {
  const id = `unterricht-collapse${i}`;
  // Jede Zeile im Textarea wird ein Stichpunkt, leere Zeilen werden ignoriert
  const punkte = String(u.punkte || '')
    .split('\n')
    .map((zeile) => zeile.trim())
    .filter(Boolean);

  return `
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button"
          data-bs-toggle="collapse" data-bs-target="#${id}"
          aria-expanded="false" aria-controls="${id}">
          ${esc(u.titel)}
        </button>
      </h2>
      <div id="${id}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <ul class="list-unstyled font-size-p">
            ${punkte
              .map(
                (p) => `
              <li class="mt-3">
                <i class="bi bi-check-circle me-2"></i> ${esc(p)}
              </li>`,
              )
              .join('')}
          </ul>
        </div>
      </div>
    </div>`;
}

async function ladeStartseite() {
  try {
    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/startseite?token=${STORYBLOK_TOKEN}&version=published`,
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { story } = await res.json();
    const c = story.content;

    // 1) Einfache Texte: jedes Element mit data-cms bekommt den passenden Wert
    document.querySelectorAll('[data-cms]').forEach((el) => {
      const wert = c[el.dataset.cms];
      if (wert) el.innerHTML = withBreaks(wert);
    });

    // 2) Kursauswahl: Liste neu aufbauen
    const liste = document.getElementById('kursauswahl-liste');
    const links = c.kursauswahl_links || [];
    if (liste && links.length) {
      liste.innerHTML = links
        .map((l, i) => kursLink(l, i, i === links.length - 1))
        .join('');
    }
    // 3) Unterrichtsformen: Accordion neu aufbauen
    const formen = c.unterrichtsformen || [];
    const accordion = document.getElementById('accordionFlushExample');
    if (accordion && formen.length) {
      accordion.innerHTML = formen
        .map((u, i) => unterrichtsformItem(u, i))
        .join('');
    }
  } catch (err) {
    console.error(
      'Startseite aus Storyblok nicht ladbar, die festen Texte bleiben:',
      err,
    );
  }
}

// Klick auf einen Kurslink: merkt sich, welches Accordion auf courses.html aufgehen soll.
// Das Skript hängt am Container und gilt deshalb auch für Links, die erst später entstehen.
document.getElementById('kursauswahl-liste')?.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-accordion]');
  if (link && link.dataset.accordion) {
    localStorage.setItem('accordionToOpen', link.dataset.accordion);
  }
});

ladeStartseite();
