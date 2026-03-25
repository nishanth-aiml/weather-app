// Get your free API key from: https://openweathermap.org/api
// Replace 'YOUR_API_KEY' below with your actual API key
const API_KEY = '793be8b856672cf937e832b02cb8c31b';

function getWeather() {
    const city = document.getElementById('city').value;
    const resultDiv = document.getElementById('result');
    
    if (city === '') {
        resultDiv.innerHTML = '<div class="error">Please enter a city name</div>';
        return;
    }
    
    resultDiv.innerHTML = '<div>Loading...</div>';
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            resultDiv.innerHTML = `
                <div class="weather-card">
                    <div class="city">${data.name}, ${data.sys.country}</div>
                    <div class="temp">${Math.round(data.main.temp)}°C</div>
                    <div>${data.weather[0].description}</div>
                    <div>💧 Humidity: ${data.main.humidity}%</div>
                    <div>💨 Wind: ${Math.round(data.wind.speed * 3.6)} km/h</div>
                </div>
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = `<div class="error">${error.message}</div>`;
        });
}

// Press Enter key to search
document.getElementById('city').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});