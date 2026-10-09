setTimeout(() => {
  const slots = document.querySelectorAll('[data-quiz-form]');
  console.log('Platzhalter:', slots.length);
  console.log(
    'Kinder pro Platzhalter:',
    [...slots].map((s) => s.children.length),
  );

  const b = document.querySelector('.btn-next');
  console.log(b ? getComputedStyle(b).backgroundColor : 'Button nicht im DOM');
}, 3000);
