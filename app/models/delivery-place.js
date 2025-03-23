import Model from '@ember-data/model';
import link from '../decorators/link';
import { belongsTo, string, boolean, url } from '../decorators/attributes';

@link()
export default class DeliveryPlaceModel extends Model {
  @string() label;
  @boolean() isEnabled;

  @url() lfwLink;
  @belongsTo('delivery-kind', {
    show: 'rendering/show/label',
    edit: 'rendering/edit/delivery-kind'
  }) deliveryKind;
  @belongsTo('geo-coordinate', {
    show: 'rendering/show/geo',
    edit: 'rendering/edit/geo'
  }) geoCoordinate;
  @belongsTo('postal-address', {
    show: 'rendering/show/label',
    edit: 'rendering/edit/postalAddress'
  }) postalAddress;
  @belongsTo('delivery-route', {
    show: 'rendering/show/link',
    edit: 'rendering/edit/delivery-route'
  }) deliveryRoute;

  get label() {
    const kind = this.deliveryKind.get("label")?.toUpperCase();
    const address = this.postalAddress.get("locality");

    return this.label ||  `[${kind}] ${address}`;
  }
}
