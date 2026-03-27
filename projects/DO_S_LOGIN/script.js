const form = document.getElementById('loginForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.style.animation = 'pulse 0.3s';
    setTimeout(() => submitBtn.style.animation = '', 300);

});
