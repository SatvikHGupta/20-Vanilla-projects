const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const toggleBtn = document.getElementById('theme-toggle');

function updateTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');

    if (hoursEl.textContent !== h) {
        hoursEl.style.transform = 'scale(1.3)';
        setTimeout(() => hoursEl.style.transform = 'scale(1)', 150);
        hoursEl.textContent = h;
    }

    if (minutesEl.textContent !== m) {
        minutesEl.style.transform = 'scale(1.3)';
        setTimeout(() => minutesEl.style.transform = 'scale(1)', 150);
        minutesEl.textContent = m;
    }

    if (secondsEl.textContent !== s) {
        secondsEl.style.transform = 'scale(1.3)';
        setTimeout(() => secondsEl.style.transform = 'scale(1)', 150);
        secondsEl.textContent = s;
    }
}

setInterval(updateTime, 1000);
updateTime();

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

document.body.classList.add('light');
