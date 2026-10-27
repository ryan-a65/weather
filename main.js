const apiKey = "8ac5c4d57ba6a4b3dfcf622700447b1e";

async function getWeather() {
  let cityName = document.getElementById("city").value.trim();
  let resultDiv = document.getElementById("result");

  if (cityName === "") {
    resultDiv.innerHTML = `<p class="text-danger">Please enter a city name.</p>`;
    return;
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    let response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("City not found");
    }

    let data = await response.json();

    resultDiv.innerHTML = `
      <h4>${data.name}, ${data.sys.country}</h4>
      <h2>${data.main.temp} °C</h2>
      <p class="text-capitalize">${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p class="text-danger">Invalid city name. Try again!</p>`;
  }
}