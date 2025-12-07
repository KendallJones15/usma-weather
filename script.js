
console.log("script.js loaded ✅");

// ✅ Define the function
async function getWeather() {
  const lat = 41.3912;
  const lon = -73.964;

  // National Weather Service API calls
  const pointResponse = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
  const pointData = await pointResponse.json();

  const forecastUrl = pointData.properties.forecast;
  const forecastResponse = await fetch(forecastUrl);
  const forecastData = await forecastResponse.json();

  // Return the first forecast period (e.g., "Today" or "Tonight")
  return forecastData.properties.periods[0];
}

// ✅ Expose the function globally for DevTools and other scripts
window.getWeather = getWeather; // <-- function, not getWeather()

// ✅ Wire up the button click (safe because 'defer' ensures DOM is parsed)
const btn = document.getElementById('btnGetWeather');
const out = document.getElementById('forecast');

btn.addEventListener('click', async () => {
  try {
    const w = await window.getWeather();
    console.log("Forecast:", w);
    if (out) {
      out.textContent = JSON.stringify(w, null, 2);
    }
  } catch (e) {
    console.error("Weather fetch failed:", e);
  }
});

// (Optional) auto-run once to verify—use promises here, no top-level await
getWeather()
  .then(w => console.log("Auto Forecast:", w))
  .catch(e => console.error(e));
