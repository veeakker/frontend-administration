import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class DeliveryPlacesNewController extends Controller {
  @service store;
  @service router;

  get DeliveryPlaceModel() {
    return this.store.modelFor("delivery-place");
  }

  @action
  async create() {
    const { country, locality, postalCode, streetAddress } = this.model.postalAddress;
    const postalAddress = this.store.createRecord("postal-address", {
      country, locality, postalCode, streetAddress
    });
    await postalAddress.save();

    const geoCoordinate = this.store.createRecord("geo-coordinate", {
      latitude: this.model.geoCoordinate.latitude,
      longitude: this.model.geoCoordinate.longitude
    });
    await geoCoordinate.save();

    const deliveryPlace = this.store.createRecord('delivery-place', {
      postalAddress, geoCoordinate,
      deliveryKind: this.model.deliveryKind
    });
    await deliveryPlace.save();

    this.router.transitionTo("delivery-places.show", deliveryPlace);
  }

  @action
  cancel() {
    this.router.transitionTo("delivery-places.index");
  }
}
