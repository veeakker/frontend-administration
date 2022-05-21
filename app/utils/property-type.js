/**
 * Yields the type of the supplied property.
 *
 * Either a class or a model must be supplied.
 *
 * @param {Object} options.class Class on which the property is defined.
 * @param {Object} options.model Model on which the property is defined.
 * @param {string} options.property The property of which we want to know the type
 */
export default function propertyType(options) {
  const ctr = ( options.class || options.model.constructor );
  return ctr && ctr.knownProperties && ctr.knownProperties[options.property];
}
