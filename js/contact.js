// function elm(css) {
//   return document.querySelector(css);
// }

// let contact = elm('.contact');
// // const nav = document.querySelector('.nav-holder');
// console.log(contact);
// fetch('/pages/contact.html')
//   .then((res) => res.text())
//   .then((data) => {
//     contact.innerHTML = data;
//       // nav.insertAdjacentHTML('beforeend', data);
//   });

function elm(css) {
  return document.querySelector(css);
}

let contact = elm('.contact');

if (contact) {
  fetch('/pages/contact.html')
    .then((res) => res.text())
    .then((data) => {
      contact.innerHTML = data;

      // Falls initQuizForm existiert (aus script.js), rufe es für die dynamisch geladenen Formulare auf:
     if (typeof window.loadQuizForms === 'function') {
       window.loadQuizForms();
     }
    })
    .catch((err) => console.error('Fehler beim Laden von contact.html:', err));
}