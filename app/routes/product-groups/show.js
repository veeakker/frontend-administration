import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ProductGroupsShowRoute extends Route {
  @service store;

  model({product_group_id}) {
    return this.store.find('product-group', product_group_id);
  }
}
