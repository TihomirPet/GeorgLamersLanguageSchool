// // Wandelt Storyblok-Richtext-JSON in normales HTML um.
// // Deckt genau das ab, was wir in unseren Texten benutzt haben:
// // Absätze, Fett-Markierung, nummerierte Listen.
// function richtextToHtml(doc) {
//   if (!doc || !doc.content) return '';

//   function renderNode(node) {
//     switch (node.type) {
//       case 'paragraph':
//         return `<p class="mt-3">${(node.content || []).map(renderNode).join('')}</p>`;
//       case 'text': {
//         let text = node.text;
//         const linkMark = node.marks?.find((m) => m.type === 'link');
//         if (linkMark) {
//           text = `<a href="${linkMark.attrs.href}" class="courses-link-tutoring">${text}</a>`;
//         }
//         if (node.marks?.some((m) => m.type === 'bold')) {
//           text = `<span class="courses-info-text">${text}</span>`;
//         }
//         return text;
//       }
//       case 'ordered_list':
//         return `<ol>${(node.content || []).map(renderNode).join('')}</ol>`;
//       case 'list_item':
//         return `<li>${(node.content || []).map(renderNode).join('')}</li>`;
//       default:
//         return (node.content || []).map(renderNode).join('');
//     }
//   }

//   return doc.content.map(renderNode).join('');
// }

// async function renderKursangebote() {
//   const res = await fetch('https://api.storyblok.com/v2/cdn/stories/kursangebote?token=QmVkDiJSgLsaP7qzh2EIGAtt&version=published');
//   const data = await res.json();
//   const angebote = data.story.content.angebote;

//   const accordion = document.getElementById('accordionFlushExample');

//   accordion.innerHTML = angebote.map(a => `
//     <div class="accordion-item-info">
//       <h2 class="accordion-header">
//         <button class="accordion-button collapsed" type="button"
//           data-bs-toggle="collapse" data-bs-target="#${a.anchor_id}"
//           aria-expanded="false" aria-controls="${a.anchor_id}">
//           ${a.label}
//         </button>
//       </h2>
//       <div id="${a.anchor_id}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
//         <div class="accordion-body">
//           <div class="col-xl-8 font-size-p">
//             ${richtextToHtml(a.inhalt)}
//             ${a.bild?.filename ? `
//               <div class="mt-3 d-flex">
//                 <img src="${a.bild.filename}" alt="QR Code" width="100" />
//                 ${a.bild_link ? `
//                   <a class="courses-link-form ms-4 d-flex align-items-center justify-content-between" href="${a.bild_link}" target="_blank">
//                     <p class="courses-link-test">Link zum Formular</p>
//                     <i class="bi bi-arrow-right-circle icon-coursesinfo font-size-h5 Bold"></i>
//                   </a>` : ''}
//               </div>` : ''}
//             ${a.links?.length ? a.links.map(l => `
//               <a class="courses-link-plan d-flex align-items-center justify-content-between mt-3" href="${l.url}">
//                 <p class="courses-link-test">${l.text}</p>
//                 <i class="bi bi-arrow-right-circle icon-coursesinfo font-size-h5 Bold"></i>
//               </a>`).join('') : ''}
//           </div>
//         </div>
//       </div>
//     </div>
//   `).join('');

//   openAccordionFromLocalStorage();
// }

// renderKursangebote();

// Hilfsfunktion zum Auslesen von Storyblok-Link-Objekten
// Hilfsfunktion zum Auslesen von Storyblok-Link-Objekten
function getStoryblokUrl(linkObj) {
  if (!linkObj) return '#';
  if (typeof linkObj === 'string') return linkObj;
  return linkObj.url || linkObj.cached_url || '#';
}

// Wandelt Storyblok-Richtext-JSON in HTML um
function richtextToHtml(doc) {
  if (!doc || !doc.content) return '';

  function renderNode(node) {
    switch (node.type) {
      case 'paragraph': {
        // Leere Absätze als Zeilenumbruch (<br>) rendern für Abstand
        if (!node.content || node.content.length === 0) {
          return '<br />';
        }
        const innerContent = node.content.map(renderNode).join('');
        if (!innerContent.trim()) {
          return '<br />';
        }
        return `<p class="mt-3 mb-0">${innerContent}</p>`;
      }

      case 'heading': {
        const level = node.attrs?.level || 3;
        return `<h${level} class="mt-4 mb-2 fw-bold">${(node.content || []).map(renderNode).join('')}</h${level}>`;
      }

      case 'text': {
        let text = node.text;

        // Zeilenumbrüche (Shift+Enter) verarbeiten
        text = text.replace(/\n/g, '<br />');

        // 1. Fett-Markierung anwenden
        if (node.marks?.some((m) => m.type === 'bold')) {
          text = `<span class="courses-info-text">${text}</span>`;
        }

        // 2. Link-Markierung um den Text/Span herumlegen
        const linkMark = node.marks?.find((m) => m.type === 'link');
        if (linkMark) {
          const href = linkMark.attrs?.href || linkMark.attrs?.url || '#';
          const target = linkMark.attrs?.target
            ? `target="${linkMark.attrs.target}"`
            : '';
          text = `<a href="${href}" ${target} class="courses-link-tutoring">${text}</a>`;
        }

        return text;
      }

      case 'ordered_list':
        return `<ol>${(node.content || []).map(renderNode).join('')}</ol>`;

      case 'bullet_list':
        return `<ul>${(node.content || []).map(renderNode).join('')}</ul>`;

      case 'list_item':
        return `<li>${(node.content || []).map(renderNode).join('')}</li>`;

      default:
        return (node.content || []).map(renderNode).join('');
    }
  }

  return doc.content.map(renderNode).join('');
}

async function renderKursangebote() {
  const res = await fetch(
    'https://api.storyblok.com/v2/cdn/stories/kursangebote?token=QmVkDiJSgLsaP7qzh2EIGAtt&version=published',
  );
  const data = await res.json();
  const angebote = data.story.content.angebote;

  const accordion = document.getElementById('accordionFlushExample');

  accordion.innerHTML = angebote
    .map(
      (a) => `
    <div class="accordion-item-info">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button"
          data-bs-toggle="collapse" data-bs-target="#${a.anchor_id}"
          aria-expanded="false" aria-controls="${a.anchor_id}">
          ${a.label}
        </button>
      </h2>
      <div id="${a.anchor_id}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <div class="col-xl-8 font-size-p">
            ${richtextToHtml(a.inhalt)}

            ${
              a.bild?.filename
                ? `
              <div class="mt-3 d-flex">
                <img src="${a.bild.filename}" alt="QR Code" width="100" />
                ${
                  a.bild_link
                    ? `
                  <a class="courses-link-form ms-4 d-flex align-items-center justify-content-between" href="${getStoryblokUrl(a.bild_link)}" target="_blank">
                    <p class="courses-link-test">Link zum Formular</p>
                    <i class="bi bi-arrow-right-circle icon-coursesinfo font-size-h5 Bold"></i>
                  </a>`
                    : ''
                }
              </div>`
                : ''
            }

            ${
              a.links?.length
                ? a.links
                    .map(
                      (l) => `
              <a class="courses-link-plan d-flex align-items-center justify-content-between mt-3" href="${getStoryblokUrl(l.link || l.url)}">
                <p class="courses-link-test">${l.text || l.label || 'Link'}</p>
                <i class="bi bi-arrow-right-circle icon-coursesinfo font-size-h5 Bold"></i>
              </a>`,
                    )
                    .join('')
                : ''
            }
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join('');

  openAccordionFromLocalStorage();
}

renderKursangebote();
