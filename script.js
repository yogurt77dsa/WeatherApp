const apiKey = "e068a4d5fbfddd99dc00f0b5494dc4f2"; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  document.querySelector(".weather-info").classList.add("show");
  const city = cityInput.value;
  if (!city) return;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found. Please try again.");
      return;
    }

    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("An error occurred. Please try again later.");
  }
}

function displayWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  document.querySelector(".city-name").textContent = name;
  document.querySelector(".temperature").textContent = `${Math.round(temp)}°C`;
  document.querySelector(".description").textContent = description;
  document.querySelector(".humidity").textContent = `Humidity: ${humidity}%`;
  document.querySelector(
    ".wind-speed"
  ).textContent = `Wind Speed: ${speed} m/s`;
  weatherIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;
}

// Add event listener for Enter key
cityInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    getWeather();
  }
});
