const questions = document.querySelectorAll('.question');

questions.forEach((button) => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    questions.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      btn.nextElementSibling.classList.remove('open');
    });
    if (!expanded) {
      button.setAttribute('aria-expanded', 'true');
      button.nextElementSibling.classList.add('open');
    }
  });

  button.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      button.click();
    }
  });
});
