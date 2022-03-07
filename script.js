/*
Select the weather section tag and create the DOM elements needed to display the current weather
*/

const weatherSection = document.getElementsByClassName('weather');

fetch(api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid=f51a778f79966048f8772e1c2dfb9667);