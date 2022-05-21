import { helper } from '@ember/component/helper';
import propertyType from 'freddie/utils/property-type';

/**
 * Yields the type of the supplied property.
 *
 * Either a class or a model must be supplied.
 *
 * @param {Object} options.class Class on which the property is defined.
 * @param {Object} options.model Model on which the property is defined.
 * @param {string} options.property The property of which we want to know the type
 */
export default helper(function isPropertyType(
  type, options
) {
  return propertyType(options) === type;
});
