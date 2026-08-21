import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ShopsShowRoute extends Route {
  @service store;

  async model({ shop_id }) {
    const shops = await this.store.query('shop', {
      'filter[:id:]': shop_id,
      include: 'delivery-places,logo,top-image,placeholder-image,disallowed-product-groups,suppliers'
    });

    return shops.length ? shops[0] : null;
  }
}
