async function getWeather():
  const lat = 41.3912;
  const lon = -73.964;

  const response = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
  const data = await response.json();

  const forecastUrl = data.properties.forecast;
  const forecastResponse = await fetch(forecastUrl);
  const forecastData = await forecastResponse.json();

  return forecastData.properties.periods[0];

window.getWeather = getWeather;
