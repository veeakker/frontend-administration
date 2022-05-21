import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ProductsNewRoute extends Route {
  @service store;

  model() {
    return { constructor: this.store.modelFor('product') };
  }
}
