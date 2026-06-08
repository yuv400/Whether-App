const input = document.querySelector("#city");
const searchBtn = document.querySelector("#searchBtn");
const weather = document.querySelector("#weather");
const map = document.querySelector("#map");

const apiKey = "a2defe5bc1561906cfc4fe50616a1601";

searchBtn.addEventListener("click", () => {
  const cityName = input.value.trim();
  weather.innerHTML = "";
  map.innerHTML = "";

  if (cityName === "") {
    weather.innerText = "⚠️ Please enter a city name!";
    return;
  }

  const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}`;
  console.log(api);

  fetch(api)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      displayWeather(data);
    });
});

function displayWeather(data) {
  const box = document.createElement("div");

  const minTemp = document.createElement("h2");
  minTemp.innerText = `Min Temp: ${data.main.temp_min} K`;

  const maxTemp = document.createElement("h2");
  maxTemp.innerText = `Max Temp: ${data.main.temp_max} K`;

  const wind = document.createElement("h2");
  wind.innerText = `Wind: ${data.wind.speed} m/s, ${data.wind.deg}°`;

  const cloud = document.createElement("h2");
  cloud.innerText = `Clouds: ${data.clouds.all}%`;

  const sunrise = document.createElement("h2");
  sunrise.innerText = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;

  const sunset = document.createElement("h2");
  sunset.innerText = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;

  box.append(minTemp, maxTemp, wind, cloud, sunrise, sunset);
  weather.append(box);

  // Map 
  const { lat, lon } = data.coord;

  const display = document.createElement("iframe");
  display.setAttribute("src", `https://maps.google.com/maps?q=${lat},${lon}&z=10&output=embed`)
  display.setAttribute("width", "100%");
  display.setAttribute("height", "300");
  display.style.marginTop = "10px";
  
  map.append(display);

  //     map.innerHTML = `
  // <iframe
  //   width="100%"
  //   height="300"
  //   style="border:0; border-radius:10px; margin-top:10px;"
  //   loading="lazy"
  //   allowfullscreen
  //   src="https://maps.google.com/maps?q=${lat},${lon}&z=10&output=embed">
  // </iframe>`;
}