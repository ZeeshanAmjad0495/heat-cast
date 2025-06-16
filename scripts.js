async function getData() {
  const cityName = document.querySelector('#city-input').value.trim();
  document.querySelector('#city-input').value = '';

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=us&key=KV4LSMZL6XKPAC5SWWUJGKJY4&contentType=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    const city = json.address;
    const temperature = json.currentConditions.temp;
    document.querySelector('#temperature').innerHTML = `${temperature} °F`;
    document.querySelector('#city-name').innerHTML = city;
  } catch (error) {
    console.error(error.message);
  }
}
