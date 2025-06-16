import { UnitGroup } from '../../constants/enums.js';

const getUnitGroup = (unitGroupValue: string): UnitGroup =>
  Object.values(UnitGroup).find((unitGroup) => unitGroup === unitGroupValue) ?? UnitGroup.US;

export default getUnitGroup;
