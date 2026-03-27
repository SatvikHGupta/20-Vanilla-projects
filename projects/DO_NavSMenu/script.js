const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('navOverlay');
const closeNav = document.getElementById('closeNav');
const focusableSelectors = 'a, button';
let lastFocused;

function openMenu() {
  lastFocused = document.activeElement;
  mobileNav.classList.add('open');
  overlay.classList.add('visible');
  mobileNav.setAttribute('aria-hidden', 'false');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  const firstLink = mobileNav.querySelector(focusableSelectors);
  firstLink && firstLink.focus();
}

function closeMenu() {
  mobileNav.classList.remove('open');
  overlay.classList.remove('visible');
  mobileNav.setAttribute('aria-hidden', 'true');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  lastFocused && lastFocused.focus();
}

navToggle.addEventListener('click', openMenu);
closeNav.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
  if (e.key === 'Tab' && mobileNav.classList.contains('open')) {
    const focusables = mobileNav.querySelectorAll(focusableSelectors);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
});
