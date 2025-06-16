import { Selector } from './constants/enums.js';
import {
  API_KEY,
  BASE_URL,
  FORM_ELEMENT_NOT_FOUND_ERROR_MESSAGE,
  NO_MATCHING_ELEMENT_ERROR_MESSAGE,
  UNABLE_TO_RETRIEVE_DATA_ERROR_MESSAGE,
} from './constants/constants.js';
import getUnit from './utilities/get-unit.js';
import getUnitGroup from './utilities/get-unit-group.js';

async function getWeatherData(event: SubmitEvent): Promise<void> {
  event.preventDefault();

  const cityNameInput = document.querySelector<HTMLInputElement>(Selector.CityNameInput);
  const errorDivision = document.querySelector<HTMLDivElement>(Selector.ErrorDivision);
  const unitGroupSelect = document.querySelector<HTMLSelectElement>(Selector.UnitGroupSelect);

  if (errorDivision) {
    errorDivision.style.display = 'none';
    errorDivision.textContent = '';
  }

  if (!cityNameInput || !unitGroupSelect) {
    throw new Error(NO_MATCHING_ELEMENT_ERROR_MESSAGE);
  }

  const cityName = cityNameInput.value.trim();
  cityNameInput.value = '';

  const unitGroupValue = unitGroupSelect.selectedOptions[0].value;

  try {
    const requestUrl = `${BASE_URL}/${encodeURIComponent(cityName)}`;

    const params = new URLSearchParams({
      unitGroup: getUnitGroup(unitGroupValue),
      key: API_KEY,
      contentType: 'json',
    });

    const response = await fetch(`${requestUrl}?${params.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const city = json.address;
    const temperature = json.currentConditions.temp;

    const temperatureElement = document.querySelector<HTMLParagraphElement>('p#temperature');
    const cityNameHeading = document.querySelector<HTMLHeadingElement>('h2#city-name');

    if (!temperatureElement || !cityNameHeading) {
      throw new Error(NO_MATCHING_ELEMENT_ERROR_MESSAGE);
    }

    temperatureElement.innerHTML = `${temperature} ${getUnit(unitGroupValue)}`;
    cityNameHeading.innerHTML = city;
  } catch (error) {
    if (errorDivision) {
      errorDivision.style.display = 'block';
      errorDivision.innerText = UNABLE_TO_RETRIEVE_DATA_ERROR_MESSAGE;
    }
    throw error;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector<HTMLFormElement>(Selector.Form);
  if (!form) throw new Error(FORM_ELEMENT_NOT_FOUND_ERROR_MESSAGE);
  form.addEventListener('submit', getWeatherData);
});
