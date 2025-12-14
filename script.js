const API_KEY = "c8d594890b5e4cb3b7a50220251412";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const weatherDetails = document.getElementById('weather-details');
const errorMessage = document.getElementById('error-message');

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value.trim(); 
    if (cityName) {
        fetchWeatherData(cityName);
    } else {
        displayError("Please enter a city name.");}
});

function fetchWeatherData(city) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${city}`;
    weatherDetails.innerHTML=`
    <div id="result"></div>
    <p id="change">Fetching the data...</p>`;
    errorMessage.textContent = ''; 
    fetch(url).then(response => {
            if (!response.ok) {
                throw new Error(`Error: City not found or API issue. Status: ${response.status}`);
            }return response.json();
        })
        .then(data => {
            displayWeather(data);})
        .catch(error => {
            console.error('Fetch error:', error);
            displayError("Could not retrieve weather data for that city. Please check the city name.");
        });}
function displayWeather(data) {
    const location = data.location;
    const current = data.current;

    weatherDetails.innerHTML = `
    <div class="weather-details-card">
        
        <div class="header-info">
            <p class="loc"><i class="fa-solid fa-location-dot"></i></p>
            <h2>${location.name}, ${location.country}</h2>
        </div>
        <div class="time">
            <strong>Local Time :</strong>
            <span>   ${location.localtime}</span>
        </div>
        <div class="info1">
        <div class="dispBox">
            <p  class="icon"><i class="fa-solid fa-fan"></i></p>
            <strong>Condition</strong> <span>${current.condition.text}</span>
        </div>
        <div class="dispBox">
            <p  class="icon"><i class="fa-solid fa-temperature-empty"></i></p>
            <strong>Temperature:</strong> <span>${current.temp_c}°C / ${current.temp_f}°F</span>
        </div>
        <div class="dispBox">
            <p  class="icon"><i class="fa-solid fa-person"></i></p>
            <strong>Feels Like:</strong> <span>${current.feelslike_c}°C</span>
        </div>
        </div>
        <div class="info2">
        <div class="dispBox">
            <p  class="icon"><i class="fa-solid fa-droplet"></i></p>
            <strong>Humidity:</strong> <span>${current.humidity}%</span>
        </div>
        <div class="dispBox">
            <p  class="icon"><i class="fa-solid fa-wind"></i></p>
            <strong>Wind:</strong> <span>${current.wind_kph} kph (${current.wind_dir})</span>
        </div>
        <div class="dispBox">
            <p  class="icon"><i class="fa-solid fa-gauge"></i></p>
            <strong>Pressure:</strong> <span>${current.pressure_mb} mb</span>
        </div>
        </div>
    </div>`;}
function displayError(message) {
    weatherDetails.innerHTML=`
    <div class="error"></div>`
    errorMessage.textContent = message;
}
