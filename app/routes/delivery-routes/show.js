import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class DeliveryRoutesShowRoute extends Route {
  @service store;

  async model( { delivery_route_id } ) {
    return await this.store.findRecord('delivery-route', delivery_route_id);
  }
}
