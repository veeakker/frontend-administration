import { helper } from '@ember/component/helper';
import humanUnit from '../utils/human-unit';

export default helper(function humanUnitHelper([unitSymbol] /*, named*/) {
  return humanUnit(unitSymbol);
});
