/*
Select the weather section tag and create the DOM elements needed to display the current weather
*/
const submit = document.getElementById('submit');
submit.addEventListener('click', getLocation);

async function getLocation() {
  const entry = document.getElementById('location').textContent;

  // Check the entry data type
  if (entry instanceof Number) {
    const response = await fetch(
      'http://api.openweathermap.org/geo/1.0/zip?zip=entry&appid=f51a778f79966048f8772e1c2dfb9667'
    );
    const weatherData = await response.json();
  } else if (entry instanceof String) {
    const response = await fetch(
      'http://api.openweathermap.org/geo/1.0/direct?q=entry&appid=f51a778f79966048f8772e1c2dfb9667'
    );
    const weatherData = await response.json();
  }

  
}

const weatherSection = document.getElementsByClassName('weather');
