const toggle = document.getElementById("theme-toggle")
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark")
  toggle.textContent = document.body.classList.contains("dark") ? "🌙" : "☀️"
})

const sections = document.querySelectorAll(".overlay")
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, { threshold: 0.3 })

sections.forEach(section => observer.observe(section))
