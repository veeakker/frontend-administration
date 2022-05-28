import Model from '@ember-data/model';
import link from '../decorators/link';
import { belongsTo } from '../decorators/attributes';

@link()
export default class DeliveryPlaceModel extends Model {
  @belongsTo('delivery-kind') deliveryKind;
  @belongsTo('geo-coordinate') geoCoordinate;
  @belongsTo('postal-address') postalAddress;
}
