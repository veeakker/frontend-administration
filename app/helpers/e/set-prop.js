import { helper } from '@ember/component/helper';

export default helper(function eSetProp([object, key] /*, named*/) {
  return function (value) {
    object[key] = value;
  };
});
