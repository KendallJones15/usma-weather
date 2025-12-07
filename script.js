
alert("script.js loaded successfully ✅");
console.log("script.js loaded ✅");

async function getWeather() {
  const lat = 41.3912;
  const lon = -73.964;

  // National Weather Service API
  const pointResponse = await fetch(`https://api.weather.gov/points/${lat},${lon}`, {
    headers: {
      // NWS requests a descriptive User-Agent header
      "User-Agent": "USMA Weather Demo (your-email@example.com)"
    }
  });
  const pointData = await pointResponse.json();

  const forecastUrl = pointData.properties.forecast;
  const forecastResponse = await fetch(forecastUrl, {
    headers: {
      "User-Agent": "USMA Weather Demo (your-email@example.com)"
    }
  });
  const forecastData = await forecastResponse.json();

  // Return the first period (usually "Today" or "Tonight")
  return forecastData.properties.periods[0];
}

// Expose function globally so you can call it from DevTools
window.getWeather = getWeather;

// Optional: auto-run once
getWeather().then(weather => console.log("Forecast:", weather)).catch(err => console.error(err));
