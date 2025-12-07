console.log("✅ script.js file loaded");

console.log("Script loaded");

async function getWeather() {
  const lat = 41.3912;
  const lon = -73.964;

  const pointResponse = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
  const pointData = await pointResponse.json();

  const forecastUrl = pointData.properties.forecast;
  const forecastResponse = await fetch(forecastUrl);
  const forecastData = await forecastResponse.json();

  return forecastData.properties.periods[0];
}

window.getWeather = getWeather; // expose for console testing
