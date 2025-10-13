let pages = document.querySelectorAll('section:not(#last)');
let button = document.querySelector('button')
let link = document.querySelector('a');
let sections = document.querySelectorAll('section');
let page = 0;
let tekst = "oker";

updatePage();

pages.forEach(prot => {
prot.addEventListener('pointerdown', () => {
    page = (page + 1) % sections.length;
    updatePage();
});

});

button.addEventListener('click', () => {
    // Increment page index and loop back to 0 when it exceeds last section
    page = (page + 1) % sections.length;
    updatePage();
});

link.addEventListener('click', () => {
    // Increment page index and loop back to 0 when it exceeds last section
    page = (page + 1) % sections.length;
    updatePage();
});

function updatePage() {
    sections.forEach((section, i) => {
        // Hide all sections except the active one
        section.style.display = (i === page) ? 'flex' : 'none';
    });
}

// --- 🧩 Disable ALL zooming (double-tap + pinch) ---
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('gesturechange', e => e.preventDefault());
document.addEventListener('gestureend', e => e.preventDefault());

let lastTouchEnd = 0;
document.addEventListener('touchend', event => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault(); // stop double-tap zoom
  }
  lastTouchEnd = now;
}, false);