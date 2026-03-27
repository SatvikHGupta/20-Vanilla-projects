const arc = document.getElementById('arc');
const pct = document.getElementById('pct');
const range = document.getElementById('range');

function set(v) {
  const tot = 264;
  arc.style.strokeDashoffset = tot - (tot * v / 100);
  pct.textContent = v + '%';
}

range.oninput = () => set(range.value);
set(range.value);
