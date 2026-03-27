const progressBar = document.getElementById("progressBar");
const topBtn = document.getElementById("topBtn");
const themeToggle = document.getElementById("themeToggle");
const reveals = document.querySelectorAll(".reveal");

if (localStorage.getItem("theme") === "light") document.body.classList.add("light");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
});

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = `${(scrollTop / scrollHeight) * 100}%`;

  if (scrollTop > 300) topBtn.classList.add("show");
  else topBtn.classList.remove("show");

  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) el.classList.add("visible");
  });
});

topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
  });
});
