import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ShopsEditRoute extends Route {
  @service store;

  model({ shop_id }) {
    return this.store.findRecord('shop', shop_id, {
      include: 'delivery-places,logo,top-image,placeholder-image,disallowed-product-groups,suppliers',
      reload: true
    });
  }
}
