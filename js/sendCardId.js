// Event Listener für Links (nur setzen, wenn der Link existiert)
function addAccordionLinkListener(linkId, accordionId) {
  const link = document.getElementById(linkId);
  if (link) {
    link.addEventListener('click', function () {
      saveAccordionState(accordionId);
    });
  }
}

addAccordionLinkListener('link1', 'flush-collapseOne');
addAccordionLinkListener('link2', 'flush-collapseTwo');
addAccordionLinkListener('link3', 'flush-collapseThree');
addAccordionLinkListener('link4', 'flush-collapseFour');
addAccordionLinkListener('link5', 'flush-collapseFive');
addAccordionLinkListener('link6', 'flush-collapseSix');
addAccordionLinkListener('link7', 'flush-collapseSeven');
addAccordionLinkListener('link8', 'flush-collapseEight');
addAccordionLinkListener('link9', 'flush-collapseNine');
addAccordionLinkListener('link10', 'flush-collapseTen');

// Funktion, um die Accordion-ID in localStorage zu speichern
function saveAccordionState(targetId) {
  localStorage.setItem('accordionToOpen', targetId);
}
