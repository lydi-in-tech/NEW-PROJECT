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






function showTemp(response) {
  console.log(response.data)
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let tempElement = document.querySelector("#temp");
  let humidElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windSpeed");
  let dateElement = document.querySelector("#time");

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  humidElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  windElement.innerHTML = `Wind Speed: ${response.data.wind.speed}km/h`;
  dateElement.innerHTML = `Last Update: ${formatDate(response.data.time * 1000)}`;

}

let apiKey = "o0c5f69b1t0fad2340ee5f05678ddda3";
let city = "New York";
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`

axios.get(apiUrl).then(showTemp);
