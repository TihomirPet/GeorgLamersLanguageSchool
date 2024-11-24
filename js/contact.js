function elm(css) {
  return document.querySelector(css);
}

let nav = elm('.contact');
// const nav = document.querySelector('.nav-holder');

fetch('./contact.html')
  .then((res) => res.text())
  .then((data) => {
    nav.innerHTML = data;
      // nav.insertAdjacentHTML('beforeend', data);
  });
console.log(contact);
