/*
Select the weather section tag and create the DOM elements needed to display the current weather
*/
const submit = document.getElementById('submit');
submit.addEventListener('click', getWeather);

async function getLocation() {
  const entry = document.getElementById('location').textContent;

  // Check the entry data type
  if (entry instanceof Number) {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/zip?zip=${entry}&appid=f51a778f79966048f8772e1c2dfb9667`
    );
    const locationData = await response.json();
    const city = locationData.name;
    const country = locationData.country;
  } else if (entry instanceof String) {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${entry}&appid=f51a778f79966048f8772e1c2dfb9667`
    );
    const locationData = await response.json();
    const city = locationData[0].name;
    const country = locationData[0].country;
  }
  return locationData;
}

async function getWeather() {
  getLocation();
  const lat = locationData.lat;
  const lon = locationData.lon;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=f51a778f79966048f8772e1c2dfb9667`
  );
  const weatherData = await response.json();
  console.log(weatherData);

  populateWeather(weatherData);
}

function populateWeather(data) {
  //Retrieve the desired weather data to present
  const temp = data.current.temp;
  const feelsLike = data.current['feels_like'];
  const timezone = data.timezone;
  const description = data.weather.description;
  const highTemp = data.daily[0].temp.max;
  const lowTemp = data.daily[0].temp.min;
  const windSpeed = data.daily['wind_speed'];
  const weatherAlert = data.alerts[0].description;
  const weatherEvent = data.alerts[0].event;

  // Populate the screen with the current weather information
  const weatherSection = document.getElementsByClassName('weather');

  const locale = document.createElement('h2');
  locale.textContent = city + ', ' + country;

  const current = document.createElement('p');
  current.textContent = 'Current temp: ' + temp;

  const condition = document.createElement('p');
  condition.textContent = description;

  const range = document.createElement('p');
  range.textContent = 'High: ' + highTemp + '   Low: ' + lowTemp;

  const winds = document.createElement('p');
  winds.textContent = windSpeed + ' MPH';

  const currentAdvisory = document.createElement('p');
  currentAdvisory.textContent = 'Current weather advisory: ' + weatherEvent;

  const advisoryDescription = document.createElement('p');
  advisoryDescription.textContent = weatherAlert;

  weatherSection.appendChild(locale);
  weatherSection.appendChild(current);
  weatherSection.appendChild(condition);
  weatherSection.appendChild(range);
  weatherSection.appendChild(winds);
  weatherSection.appendChild(currentAdvisory);
  weatherSection.appendChild(advisoryDescription);
}
