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
  
  return `${hours}:${minutes} ${day}`;
}

function showTemperature(response) {
  
  let tempElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let windElement = document.querySelector("#windSpeed");
  let humidElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#time");
  
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  windElement.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)}km/h`;
  humidElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`; 
dateElement.innerHTML = formatDate(response.data.time * 1000);
}

let apiKey = "o0c5f69b1t0fad2340ee5f05678ddda3";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=paris&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);