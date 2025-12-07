
// Define the function
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

// Expose the function globally (so DevTools and other scripts can call it)
window.getWeather = getWeather; // function

// ✅ Wire up the button after the DOM is parsed (because we used 'defer')
const btn = document.getElementById('btnGetWeather');
btn.addEventListener('click', async () => {
  try {
    const w = await window.getWeather();
    console.log(w);
  } catch (e) {
    console.error(e);
  }
});
