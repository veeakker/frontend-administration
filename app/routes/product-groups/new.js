import { tracked } from '@glimmer/tracking';
import Route from '@ember/routing/route';

class TmpProductGroup {
  @tracked label;
  @tracked sortIndex;
}

export default class ProductGroupsNewRoute extends Route {
  model() {
    return new TmpProductGroup();
  }
}
