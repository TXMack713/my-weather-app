/*
Select the weather section tag and create the DOM elements needed to display the current weather
*/
const submit = document.getElementById('submit');
submit.addEventListener('click', getLocation);
// submit.addEventListener('click', function () {
//   alert('You hit the submit button');
// });
// submit.addEventListener('click', function () {
//   const value = document.getElementById('location').value;
//   alert(value + ' is a typeof ' + typeof value);
// });

async function getLocation() {
  const entry = document.getElementById('location').value;
  let location = entry.split(',');
  for (let i = 0; i < location.length; i++) {
    location[i] = location[i].trim();
    console.log(location[i]);
  }
  const x = isNaN(location[0]);
  console.log(x);

  if (x === false) {
    console.log('Number statement');
    const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${location[0]}&appid=f51a778f79966048f8772e1c2dfb9667`;
    const response = await fetch(url);

    if (response.status >= 200 && response.status <= 299) {
      const locationData = await response.json();
      console.log(locationData);
      getWeather(locationData);
    } else {
      // Handle errors
      console.log('The problem is in the zip code api.');
      console.log(response.status, response.statusText);
    }
  } else if (x === true) {
    console.log(location);
    console.log(location.length);
    console.log('Else statement');

    if (location.length == 2) {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location[0]},${location[1]}&appid=f51a778f79966048f8772e1c2dfb9667`;
      console.log(location[0] + ', ' + location[1]);
      console.log(url);

      const response = await fetch(url);
      const locationData = await response.json();
      console.log(locationData);
      getWeather(locationData);

      if (response.status >= 200 && response.status <= 299) {
        const locationData = await response.json();
        console.log(locationData);
        getWeather(locationData);
      } else {
        // Handle errors
        console.log(response.status, response.statusText);
      }
    } else if (location.length == 3) {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location[0]},${location[1]},${location[2]}&appid=f51a778f79966048f8772e1c2dfb9667`;
      console.log(url);
      const response = await fetch(url);
      const locationData = await response.json();
      console.log(locationData);
      getWeather(locationData);

      if (response.status >= 200 && response.status <= 299) {
        const locationData = await response.json();
        console.log(locationData);
        getWeather(locationData);
      } else {
        // Handle errors
        console.log(response.status, response.statusText);
      }
    }
  }
}

async function getWeather(data) {
  console.log("Here's the data being passed to the getWeather method");
  console.log(data);

  const lat = data['lat'];
  const lon = data['lon'];
  console.log(lat);
  console.log(lon);
  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=f51a778f79966048f8772e1c2dfb9667`;
  const response = await fetch(weatherURL);
  const weatherData = await response.json();
  console.log(weatherData);
  populateWeather(weatherData);
  if (response.status >= 200 && response.status <= 299) {
    const weatherData = await response.json();
    console.log(weatherData);
    populateWeather(weatherData);
  } else {
    // Handle errors
    console.log('Error is in the getWeather method');
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
