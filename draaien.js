let pages = document.querySelectorAll('section:not(.negeer)');
let links = document.querySelectorAll('a');
let sections = document.querySelectorAll('section');
let page = 0;
let tekst = "oker";
let nederlands = document.querySelectorAll('.NL')
let frans = document.querySelectorAll('.FR')
let engels = document.querySelectorAll('.ENG')
let taal = "NL"

updatePage();

pages.forEach(prot => {
    prot.addEventListener('pointerdown', (e) => {
        if (e.target.closest('button')) return;
        page = (page + 1) % sections.length;
        updatePage();
    });
});

links.forEach(link => {
    link.addEventListener('click', () => {
        taal = link.dataset.lang;
        page = (page + 1) % sections.length;
        updatePage();
    });    
});

function updatePage() {
    sections.forEach((section, i) => {
        if (taal === "NL") {
            nederlands.forEach(el => el.style.display = "block");
            frans.forEach(el => el.style.display = "none");
            engels.forEach(el => el.style.display = "none");
        } else if (taal === "FR") {
            nederlands.forEach(el => el.style.display = "none");
            frans.forEach(el => el.style.display = "block");
            engels.forEach(el => el.style.display = "none");
        } else {
            nederlands.forEach(el => el.style.display = "none");
            frans.forEach(el => el.style.display = "none");
            engels.forEach(el => el.style.display = "block");
        }
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