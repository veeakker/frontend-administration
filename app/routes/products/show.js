import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ProductsShowRoute extends Route {
  @service store;

  model({ product_id }) {
    return this.store.find('product', product_id);
  }
}
