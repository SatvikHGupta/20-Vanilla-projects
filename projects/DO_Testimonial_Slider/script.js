const testimonials = [
  { text: "This is testimonial 1.", author: "Person 1" },
  { text: "Amazing service and support!", author: "Person 2" },
  { text: "Highly recommend to everyone.", author: "Person 3" },
  { text: "Fantastic experience overall.", author: "Person 4" }
]

let currentIndex = 0
const testimonialEl = document.getElementById('testimonial')
const authorEl = document.getElementById('author')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')

function showTestimonial(index) {
  testimonialEl.style.opacity = 0
  authorEl.style.opacity = 0
  setTimeout(() => {
    testimonialEl.textContent = testimonials[index].text
    authorEl.textContent = "- " + testimonials[index].author
    testimonialEl.style.opacity = 1
    authorEl.style.opacity = 1
  }, 250)
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
  showTestimonial(currentIndex)
})

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % testimonials.length
  showTestimonial(currentIndex)
})

showTestimonial(currentIndex)
