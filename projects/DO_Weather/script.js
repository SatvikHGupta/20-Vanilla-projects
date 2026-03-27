const weatherData = {
  delhi: { temp: "32°C", condition: " Sunny" },
  mumbai: { temp: "28°C", condition: " Humid" },
  london: { temp: "18°C", condition: " Cloudy" },
  tokyo: { temp: "26°C", condition: " Rainy" }
};

const input = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");
const card = document.getElementById("weatherCard");
const info = document.getElementById("weatherInfo");

button.addEventListener("click", () => {
  const city = input.value.toLowerCase().trim();
  if (weatherData[city]) {
    const data = weatherData[city];
    info.innerHTML = `
      <h3>${city.charAt(0).toUpperCase() + city.slice(1)}</h3>
      <p><strong>Temp:</strong> ${data.temp}</p>
      <p>${data.condition}</p>
    `;
  } else {
    info.innerHTML = `<p> City not found</p>`;
  }
  card.classList.add("flip");
});
