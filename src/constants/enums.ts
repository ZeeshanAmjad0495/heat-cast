enum Selector {
  ErrorDivision = 'div#error-division',
  Form = 'form',
  CityNameInput = 'input#city-input',
  UnitGroupSelect = 'select#unit-group',
}

enum Unit {
  US = '°F',
  METRIC = '°C',
  UK = '°C',
}

enum UnitGroup {
  US = 'us',
  METRIC = 'metric',
  UK = 'uk',
}

export { Selector, Unit, UnitGroup };
