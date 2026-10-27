// Links work without JavaScript; enhance the menu with the visible section.
const menuLinks = [...document.querySelectorAll('.nav-link')];
const sections = menuLinks.map(link => document.querySelector(link.getAttribute('href')));
const currentSection = document.getElementById('current-section');
let scheduled = false;

function updateNavigation() {
  let current = sections[0];
  const marker = Math.min(window.innerHeight * 0.3, 180);
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= marker) current = section;
  }
  // The last section may be too short to reach the top of the viewport.
  if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    current = sections[sections.length - 1];
  }
  for (const link of menuLinks) {
    const active = link.hash === `#${current.id}`;
    link.classList.toggle('active', active);
    if (active) {
      link.setAttribute('aria-current', 'location');
      currentSection.textContent = link.textContent.trim();
    } else {
      link.removeAttribute('aria-current');
    }
  }
  scheduled = false;
}

function scheduleNavigation() {
  if (!scheduled) {
    scheduled = true;
    window.requestAnimationFrame(updateNavigation);
  }
}
window.addEventListener('scroll', scheduleNavigation, { passive: true });
window.addEventListener('resize', scheduleNavigation);
window.addEventListener('hashchange', scheduleNavigation);
window.addEventListener('load', scheduleNavigation);
document.getElementById('year').textContent = new Date().getFullYear();
updateNavigation();
