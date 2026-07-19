let startBtn = document.querySelector("#start-btn");
let main = document.querySelector("#main");

startBtn.addEventListener("click", showSearch);

function showSearch() {
  main.innerHTML = `
    <div class="card p-lg-5" id="inputSection">
      <div class="card-body">

        <h2 class="text-center searchText">Search Location</h2>

        <p class="text-center text-light">
          Find weather updates for any place
        </p>

        <div class="input-group">
          <input
            type="text"
            class="form-control"
            id="input"
            placeholder="Search City..."
          >

          <button class="btn btn-primary" id="searchBtn">
            Search
          </button>
        </div>

      </div>
    </div>
  `;

  addEvents();
}

function addEvents() {
  document.querySelector("#searchBtn").addEventListener("click", inputBtn);

  document.querySelector("#input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      inputBtn();
    }
  });
}

function inputBtn() {
  let city = document.querySelector("#input").value.trim();

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  let APIkey = "18196adb736a0ff23b9fa214ca394629";

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod != 200) {
        alert(data.message);
        return;
      }

      let weather = data.weather[0].main;

      main.innerHTML = `
      
      <div class="input-group mb-4">

        <input
          type="text"
          class="form-control"
          id="input"
          placeholder="Search City..."
          value="${city}"
        >

        <button class="btn btn-primary" id="searchBtn">
          Search
        </button>

      </div>

      <div class="card weather-card mx-auto shadow text-center text-light p-4" style="max-width:350px;">

        <h3>${data.name}</h3>

        <img
          id="weatherImg"
          width="180"
          height="180"
          class="mx-auto weather-img"
          alt="Weather Image"
        >

        <h1>${Math.round(data.main.temp)}°C</h1>

        <h5>${data.weather[0].main}</h5>

        <p>Feels Like: ${Math.round(data.main.feels_like)}°C</p>

        <hr>

        <p>💧 Humidity : ${data.main.humidity}%</p>

        <p>🌬 Wind : ${(data.wind.speed * 3.6).toFixed(1)} km/h</p>

      </div>
      `;

      let weatherImg = document.getElementById("weatherImg");

      switch (weather) {
        case "Clear":
          weatherImg.src = "./images/clear.png";
          break;

        case "Clouds":
          weatherImg.src = "./images/cloud.png";
          break;

        case "Rain":
        case "Drizzle":
          weatherImg.src = "./images/rain.png";
          break;

        case "Thunderstorm":
          weatherImg.src = "./images/thunderstorm.png";
          break;

        case "Snow":
          weatherImg.src = "./images/snow.png";
          break;

        case "Mist":
        case "Smoke":
        case "Haze":
        case "Fog":
          weatherImg.src = "./images/smoke.png";
          break;

        default:
          weatherImg.src = "./images/weather.png";
      }

      addEvents();
    })
    .catch((error) => {
      console.log(error);
      alert("Something went wrong!");
    });
}
