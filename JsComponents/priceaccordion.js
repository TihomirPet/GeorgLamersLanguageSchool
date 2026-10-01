
  async function renderPreise() {
    const res = await fetch('https://api.storyblok.com/v2/cdn/stories/preise?token=QmVkDiJSgLsaP7qzh2EIGAtt&version=published');
    const data = await res.json();
    const kategorien = data.story.content.kategorien;

    const accordion = document.getElementById('accordionFlushExample');

    accordion.innerHTML = kategorien
      .map(
        (kat) => `
      <div class="accordion-item-info">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed text-black" type="button"
            data-bs-toggle="collapse" data-bs-target="#${kat.anchor_id}"
            aria-expanded="false" aria-controls="${kat.anchor_id}">
            ${kat.label}
          </button>
        </h2>
        <div id="${kat.anchor_id}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            ${kat.tabellen
              .map(
                (tabelle) => `
              <div class="col-sm-12 col-xl-11 font-size-p price-table-holder mt-5">
                <table class="table table-striped ShadowTable Semibold">
                  <thead class="mb-5">
                    <tr>
                      <th scope="col" class="text-start price-head-table">${tabelle.titel}</th>
                      ${tabelle.spalte_ustd_label ? `<th scope="col" class="price-head-table">${tabelle.spalte_ustd_label}</th>` : ''}
                      <th scope="col" class="text-end price-head-table">${tabelle.spalte_gesamt_label}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${tabelle.zeilen
                      .map(
                        (zeile) => `
                      <tr>
                        <td class="text-md-start">${zeile.beschreibung || ''}</td>
                        ${tabelle.spalte_ustd_label ? `<td>${zeile.preis_pro_ustd || ''}</td>` : ''}
                        <td>${zeile.gesamtpreis}</td>
                      </tr>
                    `,
                      )
                      .join('')}
                  </tbody>
                </table>
                
              </div>
              ${tabelle.fussnote ? `<p class="mt-5 font-size-p">${tabelle.fussnote}</p>` : ''}
            `,
              )
              .join('')}
          </div>
        </div>
      </div>
    `,
      )
      .join('');
      openAccordionFromLocalStorage();
  }

  renderPreise();
