import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class DeliveryPlacesEditRoute extends Route {
  @service store;

  model({ delivery_place_id }) {
    return this.store.findRecord('delivery-place', delivery_place_id);
  }
}
