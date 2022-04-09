import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ProductGroupsEditRoute extends Route {
  @service store;

  model({ product_group_id }) {
    return this.store.findRecord('product-group', product_group_id);
  }
}
