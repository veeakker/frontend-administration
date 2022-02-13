import { helper } from '@ember/component/helper';
import { byUri as findLabel } from 'freddie/utils/product-labels';

export default helper(function productLabelInfo([labelUri] /*, named*/) {
  return findLabel(labelUri);
});
