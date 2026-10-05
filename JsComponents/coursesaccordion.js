
  // Wandelt Storyblok-Richtext-JSON in normales HTML um.
  // Deckt genau das ab, was wir in unseren Texten benutzt haben:
  // Absätze, Fett-Markierung, nummerierte Listen.
  function richtextToHtml(doc) {
    if (!doc || !doc.content) return '';

    function renderNode(node) {
      switch (node.type) {
        case 'paragraph':
          return `<p class="mt-3">${(node.content || []).map(renderNode).join('')}</p>`;
        case 'text': {
          let text = node.text;
          const linkMark = node.marks?.find((m) => m.type === 'link');
          if (linkMark) {
            text = `<a href="${linkMark.attrs.href}" class="courses-link-tutoring">${text}</a>`;
          }
          if (node.marks?.some((m) => m.type === 'bold')) {
            text = `<span class="courses-info-text">${text}</span>`;
          }
          return text;
        }
        case 'ordered_list':
          return `<ol>${(node.content || []).map(renderNode).join('')}</ol>`;
        case 'list_item':
          return `<li>${(node.content || []).map(renderNode).join('')}</li>`;
        default:
          return (node.content || []).map(renderNode).join('');
      }
    }

    return doc.content.map(renderNode).join('');
  }

  async function renderKursangebote() {
    const res = await fetch('https://api.storyblok.com/v2/cdn/stories/kursangebote?token=QmVkDiJSgLsaP7qzh2EIGAtt&version=published');
    const data = await res.json();
    const angebote = data.story.content.angebote;

    const accordion = document.getElementById('accordionFlushExample');

    accordion.innerHTML = angebote.map(a => `
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
              ${a.bild?.filename ? `
                <div class="mt-3 d-flex">
                  <img src="${a.bild.filename}" alt="QR Code" width="100" />
                  ${a.bild_link ? `
                    <a class="courses-link-form ms-4 d-flex align-items-center justify-content-between" href="${a.bild_link}" target="_blank">
                      <p class="courses-link-test">Link zum Formular</p>
                      <i class="bi bi-arrow-right-circle icon-coursesinfo font-size-h5 Bold"></i>
                    </a>` : ''}
                </div>` : ''}
              ${a.links?.length ? a.links.map(l => `
                <a class="courses-link-plan d-flex align-items-center justify-content-between mt-3" href="${l.url}">
                  <p class="courses-link-test">${l.text}</p>
                  <i class="bi bi-arrow-right-circle icon-coursesinfo font-size-h5 Bold"></i>
                </a>`).join('') : ''}
            </div>
          </div>
        </div>
      </div>
    `).join('');

    openAccordionFromLocalStorage();
  }

  renderKursangebote();
