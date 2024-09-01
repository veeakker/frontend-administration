import Model from '@ember-data/model';
import link from 'freddie/decorators/link';
import {
  string,
  date,
  hasMany
} from '../decorators/attributes';

@link()
export default class DeliveryRouteModel extends Model {
  @string() label;
  @date() nextDeliveryDate;
  @hasMany('delivery-place') deliveryPlaces;
}
