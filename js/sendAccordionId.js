// Event Listener für Links
document.getElementById('link1').addEventListener('click', function () {
  saveAccordionState('flush-collapseOne');
});

document.getElementById('link2').addEventListener('click', function () {
  saveAccordionState('flush-collapseTwo');
});

document.getElementById('link3').addEventListener('click', function () {
  saveAccordionState('flush-collapseThree');
});
document.getElementById('link4').addEventListener('click', function () {
  saveAccordionState('flush-collapseFour');
});
document.getElementById('link5').addEventListener('click', function () {
  saveAccordionState('flush-collapseFive');
});
document.getElementById('link6').addEventListener('click', function () {
  saveAccordionState('flush-collapseSix');
});
document.getElementById('link7').addEventListener('click', function () {
  saveAccordionState('flush-collapseSeven');
});

// Funktion, um die Accordion-ID in localStorage zu speichern
function saveAccordionState(targetId) {
  localStorage.setItem('accordionToOpen', targetId);
}
