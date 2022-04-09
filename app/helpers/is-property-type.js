import { helper } from '@ember/component/helper';

export default helper(function isPropertyType([model,property,type] /*, named*/) {
  const ctr = model.constructor;
  return ctr &&
    ctr.knownProperties &&
    ctr.knownProperties[property] === type;
});
