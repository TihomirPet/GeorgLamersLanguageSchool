
  async function renderKursplan() {
    const res = await fetch('https://api.storyblok.com/v2/cdn/stories/kursplan?token=QmVkDiJSgLsaP7qzh2EIGAtt&version=published');
    const data = await res.json();
    const niveaus = data.story.content.niveaus;

    const accordion = document.getElementById('accordionFlushExampleOne');

    accordion.innerHTML = niveaus
      .map(
        (niveau, i) => `
      <div class="accordion-item-info">
        <h2 class="accordion-header">
          <button class="accordion-button text-black collapsed" type="button"
            data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}"
            aria-expanded="false" aria-controls="flush-collapse${i}">
            ${niveau.label}
          </button>
        </h2>
        <div id="flush-collapse${i}" class="accordion-collapse collapse " data-bs-parent="#accordionFlushExampleOne">
          <div class="accordion-body">
            ${niveau.termine
              .map(
                (t) => `
              <div class="col-sm-12 col-xl-11 font-size-p price-table-holder mt-3">
                <table class="table table-striped ShadowTable Semibold">
                  <thead class="mb-5">
                    <tr>
                      <th scope="col" class="text-start price-head-table">Tage</th>
                      <th scope="col" class="price-head-table">Uhrzeit</th>
                      <th scope="col" class="price-head-table">Kursort</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-md-start">${t.tage}</td>
                      <td>${t.uhrzeit}</td>
                      <td>${t.kursort}</td>
                    </tr>
                  </tbody>
                </table>
               
              </div>
               <p class="mt-3 font-size-p">${t.hinweis}</p>
            `,
              )
              .join('')}
          </div>
        </div>
      </div>
    `,
      )
      .join('');
  }

  renderKursplan();
