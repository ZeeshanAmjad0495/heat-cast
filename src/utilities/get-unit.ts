import { Unit } from '../constants/enums.js';

const getUnit = (unitGroupValue: string): Unit => {
  const selectedUnit = Object.keys(Unit).find(
    (unit) => unit.toLowerCase() === unitGroupValue.toLowerCase(),
  );
  return selectedUnit ? Unit[selectedUnit as keyof typeof Unit] : Unit.US;
};

export default getUnit;
