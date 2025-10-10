let button = document.querySelector('button')
let sections = document.querySelectorAll('section');
let page = 0;
let tekst = "oker";

updatePage();

button.addEventListener('click', () => {
    // Increment page index and loop back to 0 when it exceeds last section
    page = (page + 1) % sections.length;
    updatePage();
});

function updatePage() {
    sections.forEach((section, i) => {
        // Hide all sections except the active one
        section.style.display = (i === page) ? 'flex' : 'none';
    });
    button.innerHTML = sections[page].dataset.knop;
}

let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  const now = new Date().getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault(); // prevent double-tap zoom
  }
  lastTouchEnd = now;
}, false);