const slider = document.getElementById('planSlider');
const billingToggle = document.getElementById('billingToggle');
const priceEl = document.getElementById('price');
const durationEl = document.querySelector('.duration');
const plans = document.querySelectorAll('.plans span');

const prices = {
    monthly: [10, 20, 30],
    yearly: [100, 200, 300]
};

function updatePrice() {
    const index = slider.value - 1;
    const billing = billingToggle.checked ? 'yearly' : 'monthly';
    
    priceEl.style.transform = 'scale(1.3)';
    setTimeout(() => priceEl.style.transform = 'scale(1)', 150);
    
    priceEl.textContent = `$${prices[billing][index]}`;
    durationEl.textContent = billing === 'yearly' ? '/year' : '/month';

    plans.forEach((p, i) => {
        p.classList.toggle('active', i === index);
    });
}

slider.addEventListener('input', updatePrice);
billingToggle.addEventListener('change', updatePrice);
updatePrice();
