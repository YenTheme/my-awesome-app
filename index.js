//Feature 1

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let currentHour = date.getHours();
  if (currentHour < 0) {
    currentHour = `0${currentHour}`;
  }

  let dayDate = `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}, ${currentHour}:${currentMinutes}`;
  let today = document.querySelector("#daydate");
  today.innerHTML = dayDate;
  return dayDate;
}

//Feature 2
function displayCountry(event) {
  event.preventDefault();
  let searchCountry = document.querySelector("#which-country");
  let currentCountry = document.querySelector("#interested-country");
  currentCountry.innerHTML = `${searchCountry.value}`;
}

let search = document.querySelector("#search-country-now");
search.addEventListener("submit", displayCountry);

//Bonus Feature
function convertToFahrenheit(fahrenheit) {
  fahrenheit.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 90;
}

function convertToCelcius(celcius) {
  celcius.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 32;
}

function showWeather(weather) {
  let currentLocation = weather.data.name;
  console.log(currentLocation);
  let searchedCurrentLocation = document.querySelector("#interested-country");
  searchedCurrentLocation.innerHTML = `${currentLocation}`;
  let currentTemperature = Math.round(weather.data.main.temp);
  console.log(currentTemperature);
  let searchedCurrentTemperature = document.querySelector("#temperature");
  searchedCurrentTemperature.innerHTML = `${currentTemperature}`;
}
function getLocationNow(location) {
  location.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function searchInterestedCountry(country) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayWeatherCondition(response) {
  document.querySelector("#interested-country").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCityNow(find) {
  find.preventDefault();
  let country = document.querySelector("#which-country").value;
  searchInterestedCountry(country);
}

let searchCurrentLocation = document.querySelector("#current-location");
searchCurrentLocation.addEventListener("click", getLocationNow);

let searchCity = document.querySelector("#search-country-now");
searchCity.addEventListener("submit", searchCityNow);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

let currentTime = new Date();
formatDate(currentTime);
