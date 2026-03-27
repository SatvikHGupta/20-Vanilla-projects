const targetDate = new Date('January 1, 2027 00:00:00').getTime()
const daysEl = document.getElementById('days')
const hoursEl = document.getElementById('hours')
const minutesEl = document.getElementById('minutes')
const secondsEl = document.getElementById('seconds')

function updateCountdown() {
  const now = new Date().getTime()
  const distance = targetDate - now

  if (distance < 0) {
    daysEl.textContent = '00'
    hoursEl.textContent = '00'
    minutesEl.textContent = '00'
    secondsEl.textContent = '00'
    clearInterval(interval)
    return
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  daysEl.textContent = days.toString().padStart(2, '0')
  hoursEl.textContent = hours.toString().padStart(2, '0')
  minutesEl.textContent = minutes.toString().padStart(2, '0')
  secondsEl.textContent = seconds.toString().padStart(2, '0')
}

const interval = setInterval(updateCountdown, 1000)
updateCountdown()
