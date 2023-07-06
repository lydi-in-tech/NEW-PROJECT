function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
   if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  
  let forecastElement = document.querySelector("#weather-forecast");

   let forecastHTML =`<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML = forecastHTML +
        `
    <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}
        </div>
        
        <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" width="42"
        />

   
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">
          ${Math.round(forecastDay.temp.max)}° 
        </span>
        /
        <span class="weather-forecast-temperatue-min"> ${Math.round(forecastDay.temp.min)}°  </span>
      </div>
    </div>
  
  `;
    }
  }
  );

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey2 = "4c9b53e4f8f5eb00df5915bdca340605";
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;
  let apiUrl1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey2}&units=metric`;
  axios.get(apiUrl1).then(displayForecast);
}

function showTemp(response) { 
  
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let tempElement = document.querySelector("#temp");
  let humidElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windSpeed");
  let dateElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");
  
  celsiusTemp = response.data.temperature.current

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  tempElement.innerHTML = Math.round(celsiusTemp);
  humidElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  windElement.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)}%`
  dateElement.innerHTML = `Last update: ${formatDate(response.data.time * 1000)}`;
  iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  iconElement.setAttribute("alt", response.data.condition.description)
  
  getForecast(response.data.coordinates);
  
}

function searchCity(city) {
  let apiKey = "o0c5f69b1t0fad2340ee5f05678ddda3";
let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
axios.get(apiUrl).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let celsiusTemp = null;

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9 / 5) + 32
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

searchCity("New York");




