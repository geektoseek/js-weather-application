async function checkWeather() {
    const cityInput = document.getElementById("cityName");
    const city = cityInput.value.trim();
    const resultDiv = document.getElementById("resultDiv");

    if (!city) {
        showError("Please enter a city name!");
        return;
    }

    resultDiv.innerHTML = "<p>Loading...</p>";
    resultDiv.classList.add("show");

    try {
        const response = await fetch(`https://p2pclouds.up.railway.app/v1/learn/weather?city=${encodeURIComponent(city)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.current) {
            throw new Error("City not found or invalid response");
        }

        const current = data.current;

        resultDiv.innerHTML = `
                    <h2>${city.charAt(0).toUpperCase() + city.slice(1)}</h2>
                    <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
                    <p><strong>Feels like:</strong> ${current.feelslike_c}°C</p>
                    <p><strong>Condition:</strong> ${current.condition?.text || "N/A"}</p>
                    <p><strong>Humidity:</strong> ${current.humidity}%</p>
                    <p><strong>Wind:</strong> ${current.wind_kph} km/h</p>
                `;

    } catch (err) {
        showError(`Error: ${err.message || "Something went wrong. Try again!"}`);
        console.error(err);
    }
}

function showError(message) {
    const resultDiv = document.getElementById("resultDiv");
    resultDiv.innerHTML = `<p class="error">${message}</p>`;
    resultDiv.classList.add("show");
}
