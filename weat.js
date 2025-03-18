const apiKey = "2282ee51ca58c90591ef83ecf63102c1"; // this stores your api key in a constant variable
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // this stores your api Link

// variables for the html content
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  // condition to check for correct city name
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather-info").style.display = "none";
  } else {
    var data = await response.json();

    // update the html content live
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const weatherMain = data.weather[0].main;
    if (weatherMain == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (weatherMain == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (weatherMain == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (weatherMain == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (weatherMain == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather-info").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});
