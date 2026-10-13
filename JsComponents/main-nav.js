// main.js
const STORYBLOK_TOKEN = 'QmVkDiJSgLsaP7qzh2EIGAtt';

// Untermenü-Links (Desktop und Mobile unterscheiden sich nur in den Klassen)
function subLinks(items, baseClass, gapClass) {
  return items
    .map((l, i) => {
      const hasAccordion = Boolean(l.accordion_id);
      const classes = [
        i > 0 ? gapClass : '',
        baseClass,
        hasAccordion ? 'custom-nav-link' : '',
      ]
        .filter(Boolean)
        .join(' ');
      const dataAttr = hasAccordion
        ? ` data-accordion="${l.accordion_id}"`
        : '';
      return `<a class="${classes}" role="button"${dataAttr} href="${l.url}">${l.text}</a>`;
    })
    .join('');
}

function desktopItem(punkt) {
  const sub = punkt.untermenue || [];
  const link = `<a class="nav-link-desktop" href="${punkt.url}">${punkt.text}</a>`;
  if (!sub.length) return `<li>${link}</li>`;

  return `
    <li class="dropdown-index">
      ${link}
      <div class="dropdown-index-content overlay pt-0">
        <div class="container d-flex dropdown-index-link p-3 pt-0">
          <div class="col-2 col-lg-1 col-xl-2">
            <i class="bi bi-arrow-right-circle nav-icon font-size-h2"></i>
          </div>
          <div class="col-10 col-lg-11 col-xl-10 d-flex flex-column ps-lg-3 ps-xl-0">
            ${subLinks(sub, 'nav-link-desktop', 'mt-1')}
          </div>
        </div>
      </div>
    </li>`;
}

function mobileItem(punkt, i) {
  const sub = punkt.untermenue || [];
  const gap = i > 0 ? 'mt-2' : '';
  const link = `<a href="${punkt.url}">${punkt.text}</a>`;
  if (!sub.length) return `<li class="${gap}">${link}</li>`;

  return `
    <li class="dropdown-index ${gap}">
      ${link}
      <button class="col-2 col-lg-1 col-xl-2 btn-mobile">
        <i class="bi bi-arrow-down-circle nav-icon font-size-h3 ms-4"></i>
      </button>
      <div class="dropdown-index-content-mobile p-2 pt-0">
        <div class="container d-flex dropdown-index-link p-2">
          <div class="col-12 col-lg-11 col-xl-10 d-flex flex-column">
            ${subLinks(sub, 'a-mobile', 'mt-1')}
          </div>
        </div>
      </div>
    </li>`;
}

function desktopLegal(items) {
  return `
    <li>
      <div class="col-11 col-lg-10 d-flex flex-column flex-md-row align-self-end column-gap-3 mt-5">
        ${items
          .map(
            (l) => `
          <a class="contact-link btncontact btn-contact letter-spacing-title d-flex align-items-center justify-content-between" href="${l.url}" role="button">
            <h6 class="letter-spacing-title font-size-p Medium">${l.text}</h6>
          </a>`,
          )
          .join('')}
      </div>
    </li>`;
}

function mobileLegal(items) {
  return items
    .map(
      (l, i) => `
      <li>
        <a class="${i === 0 ? 'contact-link ' : ''}letter-spacing-title d-flex align-items-center justify-content-between${i === 0 ? ' mt-3' : ''}" href="${l.url}">
          <h6 class="letter-spacing-title font-size-p">${l.text}</h6>
        </a>
      </li>`,
    )
    .join('');
}

function buildNav(hauptmenue, rechtliches) {
  return `
    <div class="nav-toggle animated-button">
      <div class="nav-toggle-bar"></div>
    </div>
    <nav class="nav">
      <ul class="d-flex flex-column nav-decktop">
        ${hauptmenue.map((p) => desktopItem(p)).join('')}
        ${desktopLegal(rechtliches)}
      </ul>
      <ul class="d-flex flex-column align-items-start justify-content-between nav-mobile">
        ${hauptmenue.map((p, i) => mobileItem(p, i)).join('')}
        ${mobileLegal(rechtliches)}
      </ul>
    </nav>`;
}

document.addEventListener('DOMContentLoaded', async () => {
  const navigation = document.querySelector('.navigation');
  if (!navigation) return;

  try {
    const res = await fetch(
      `https://api.storyblok.com/v2/cdn/stories/navigation?token=${STORYBLOK_TOKEN}&version=published`,
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { story } = await res.json();
    navigation.innerHTML = buildNav(
      story.content.hauptmenue || [],
      story.content.rechtliches || [],
    );
  } catch (err) {
    console.error('Menü aus Storyblok nicht ladbar, nutze navindex.html:', err);
    try {
      const res = await fetch('/pages/navindex.html');
      navigation.innerHTML = await res.text();
    } catch (err2) {
      console.error('Auch der Fallback ist fehlgeschlagen:', err2);
      return;
    }
  }

  // nav.js und accordion.js warten auf dieses Event
  document.dispatchEvent(new Event('navLoaded'));
});
