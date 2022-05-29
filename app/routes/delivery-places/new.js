import { tracked } from '@glimmer/tracking';
import Route from '@ember/routing/route';

class MockGeoCoordinate {
  @tracked latitude;
  @tracked longitude;
}

class MockDeliveryPlace {
  @tracked geoCoordinate;
  @tracked deliveryKind;
  @tracked postalAddress;

  constructor() {
    this.deliveryKind = null,
    this.geoCoordinate = new MockGeoCoordinate(),
    this.postalAddress = {
        country: "BE",
        locality: null,
        postalCode: null,
        streetAddress: null
    };
  }
}

export default class DeliveryPlacesNewRoute extends Route {
  model() {
    return new MockDeliveryPlace();
  }
}
