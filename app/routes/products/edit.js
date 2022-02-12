import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ProductsEditRoute extends Route {
  @service store;

  model({ product_id }) {
    return this.store.findRecord('product', product_id);
  }
}
