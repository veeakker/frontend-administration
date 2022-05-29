import { get } from '@ember/object';
import Model from '@ember-data/model';
import link from '../decorators/link';
import { belongsTo } from '../decorators/attributes';

@link()
export default class DeliveryPlaceModel extends Model {
  @belongsTo('delivery-kind', {
    show: 'rendering/show/label',
    edit: 'rendering/edit/delivery-kind'
  }) deliveryKind;
  @belongsTo('geo-coordinate', {
    show: 'rendering/show/geo',
    edit: 'rendering/show/geo'
  }) geoCoordinate;
  @belongsTo('postal-address', {
    show: 'rendering/show/label',
    edit: 'rendering/edit/postalAddress'
  }) postalAddress;

  get label() {
    const kind = this.deliveryKind.get("label")?.toUpperCase();
    const address = this.postalAddress.get("locality");

    return `[${kind}] ${address}`;
  }
}
