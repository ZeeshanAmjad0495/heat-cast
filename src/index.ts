import { Unit, UnitGroup } from './constants/enums.js';
import { API_KEY, BASE_URL, NO_MATCHING_ELEMENT_ERROR_MESSAGE } from './constants/constants.js';

const getUnitGroup = (unitGroupValue: string): UnitGroup =>
  Object.values(UnitGroup).find((unitGroup) => unitGroup === unitGroupValue) ?? UnitGroup.US;

const getUnit = (unitGroupValue: string): Unit => {
  const selectedUnit = Object.keys(Unit).find(
    (unit) => unit.toLowerCase() === unitGroupValue.toLowerCase(),
  );
  return selectedUnit ? Unit[selectedUnit as keyof typeof Unit] : Unit.US;
};

async function getData(event: SubmitEvent): Promise<void> {
  event.preventDefault();

  const errorDivision = document.querySelector<HTMLDivElement>('#error-division');
  const cityNameInput = document.querySelector<HTMLInputElement>('input#city-input');
  const unitGroupSelect = document.querySelector<HTMLSelectElement>('select#unit-group');

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
      errorDivision.innerText = '❌ Unable to retrieve weather data. Please try again.';
    }
    throw error;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector<HTMLFormElement>('form');
  if (!form) throw new Error('Form element not found.');
  form.addEventListener('submit', getData);
});
