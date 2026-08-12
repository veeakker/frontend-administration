import { tracked } from '@glimmer/tracking';
import Route from '@ember/routing/route';

class TmpShop {
  @tracked label;
  @tracked slug;
  @tracked style;
}

export default class ShopsNewRoute extends Route {
  model() {
    return new TmpShop();
  }
}
