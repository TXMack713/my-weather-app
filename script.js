/*
Select the weather section tag and create the DOM elements needed to display the current weather
*/
const submit = document.getElementById('submit');
submit.addEventListener('click', getWeather);
// submit.addEventListener('click', function () {
//   alert('You hit the submit button');
// });
// submit.addEventListener('click', function () {
//   const value = document.getElementById('location').value;
//   alert(value + ' is a typeof ' + typeof value);
// });

async function getLocation() {
  const entry = document.getElementById('location').value;
  let x = Number.parseInt(entry);

  if (typeof x === Number) {
    const url =
      'http://api.openweathermap.org/geo/1.0/zip?zip=' +
      x +
      '&appid=f51a778f79966048f8772e1c2dfb9667';
    const response = await fetch(url);
    if (response.status >= 200 && response.status <= 299) {
      const locationData = await response.json();
      console.log(locationData);
    } else {
      // Handle errors
      console.log(response.status, response.statusText);
    }
    const city = locationData.name;
    const country = locationData.country;
  } else if (x === NaN) {
    let place = entry.split(',');
    if (place.length == 1) {
      const url =
        'http://api.openweathermap.org/geo/1.0/direct?q=' +
        place[0] +
        '&appid=f51a778f79966048f8772e1c2dfb9667';
      const response = await fetch(url);
      if (response.status >= 200 && response.status <= 299) {
        const locationData = await response.json();
        console.log(locationData);
      } else {
        // Handle errors
        console.log(response.status, response.statusText);
      }
    } else if (place.length == 2) {
      const url =
        'http://api.openweathermap.org/geo/1.0/direct?q=' +
        place[0] +
        ',' +
        place[1] +
        '&appid=f51a778f79966048f8772e1c2dfb9667';
      const response = await fetch(url);
      if (response.status >= 200 && response.status <= 299) {
        const locationData = await response.json();
        console.log(locationData);
      } else {
        // Handle errors
        console.log(response.status, response.statusText);
      }
    } else if (place.length == 3) {
      const url =
        'http://api.openweathermap.org/geo/1.0/direct?q=' +
        place[0] +
        ',' +
        place[1] +
        ',' +
        place[2] +
        '&appid=f51a778f79966048f8772e1c2dfb9667';
      const response = await fetch(url);
      if (response.status >= 200 && response.status <= 299) {
        const locationData = await response.json();
        console.log(locationData);
      } else {
        // Handle errors
        console.log(response.status, response.statusText);
      }
    }
    // const locationData = await response.json();
    // const city = locationData[0].name;
    // const country = locationData[0].country;
  }
  getWeather(locationData);
}

async function getWeather(data) {
  const lat = data['lat'];
  const lon = data['lon'];
  const weatherURL =
    'https://api.openweathermap.org/data/2.5/onecall?lat=' +
    lat +
    '&lon=' +
    lon +
    '&units=imperial&appid=f51a778f79966048f8772e1c2dfb9667';
  const response = await fetch(weatherURL);
  if (response.status >= 200 && response.status <= 299) {
    const weatherData = await response.json();
    console.log(weatherData);
    populateWeather(weatherData);
  } else {
    // Handle errors
    console.log(response.status, response.statusText);
  }
  // console.log(weatherData);
}

function populateWeather(data) {
  //Retrieve the desired weather data to present
  const temp = data['current']['temp'];
  const feelsLike = data['current']['feels_like'];
  const timezone = data['timezone'];
  const description = data['weather']['description'];
  const highTemp = data['daily'][0]['temp']['max'];
  const lowTemp = data['daily'][0]['temp']['min'];
  const windSpeed = data['daily']['wind_speed'];
  const weatherAlert = data['alerts'][0]['description'];
  const weatherEvent = data['alerts'][0]['event'];

  // Populate the screen with the current weather information
  const weatherSection = document.getElementsByClassName('weather');

  const locale = document.createElement('h2');
  // locale.textContent = city + ', ' + country;

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

  // weatherSection.appendChild(locale);
  weatherSection.appendChild(current);
  weatherSection.appendChild(condition);
  weatherSection.appendChild(range);
  weatherSection.appendChild(winds);
  weatherSection.appendChild(currentAdvisory);
  weatherSection.appendChild(advisoryDescription);
}
