import { helper } from '@ember/component/helper';

export default helper(function setProp([object, key] /*, named*/) {
  return function (value) {
    object[key] = value;
  };
});
