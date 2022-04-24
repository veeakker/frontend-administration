import { set } from '@ember/object';
import { helper } from '@ember/component/helper';

/**
 * Uses the named arguments to create an object with default values.
 *
 * Augmentations:
 *
 * - `reset` on this object resets all the values to their original.
 *
 * - `clone` on this object takes a copy which you can send elsewhere
 * (eg: for saving state).
 */
export default helper(function obj(_positional, named) {
  const initialValues = Object.assign({}, named);

  const result = {};

  // Augment with reset functionality
  const reset = () => {
    for (const key in initialValues)
      // set ensures view gets updated
      set( result, key, initialValues[key] );
    return result;
  };
  const clone = () => {
    return Object.assign({}, result);
  };
  set( result, "reset", reset );
  set( result, "clone", clone );

  // Use reset functionality to initialize values
  result.reset();

  return result;
});
