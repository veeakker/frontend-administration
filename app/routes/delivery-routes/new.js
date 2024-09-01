import Route from '@ember/routing/route';
import DeliveryRoute from 'freddie/models/delivery-route';

export default class DeliveryRoutesNewRoute extends Route {
  model() {
    return {
      deliveryRoute: { label: null, nextDeliveryDate: new Date() },
      class: DeliveryRoute
    };
  }
}
