import Model from '@ember-data/model';
import { string, text, hasMany } from '../decorators/attributes';
import link from '../decorators/link';

@link({basePath: "suppliers"})
export default class BusinessEntityModel extends Model {
  @string() name;
  @string() email;
  @text() description;
  @hasMany('delivery-place') deliveryPlaces;

  get label() {
    return this.name;
  }
}
