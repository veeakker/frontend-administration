import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ProductsShowRoute extends Route {
  @service store;

  model({product}) {
    return this.store.findRecord('product', product);
  }
}
