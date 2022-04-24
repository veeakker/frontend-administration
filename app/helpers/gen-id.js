import { helper } from '@ember/component/helper';

let counter=0;

export default helper(function genId([label="gen-id"]/*, named*/) {
  return `${label}-${++counter}`;
});
