import { helper } from '@ember/component/helper';
import propertyType from 'freddie/utils/property-type';

export default helper(function isPropertyType(
  [model, property, type] /*, named*/
) {
  return propertyType(model, property) === type;
});
