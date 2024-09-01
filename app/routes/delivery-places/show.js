import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class DeliveryPlacesShowRoute extends Route {
  @service store;

  async model({ delivery_place_id }) {
    return (await this.store.query('delivery-place', {
      'filter[:id:]': delivery_place_id,
      include: 'delivery-route'
    })).firstObject;
  }
}
