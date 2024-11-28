function elm(css) {
  return document.querySelector(css);
}

let contact = elm('.contact');
// const nav = document.querySelector('.nav-holder');
console.log(contact);
fetch('/pages/contact.html')
  .then((res) => res.text())
  .then((data) => {
    contact.innerHTML = data;
      // nav.insertAdjacentHTML('beforeend', data);
  });

