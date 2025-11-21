import Model from '@ember-data/model';
import { string, text, hasMany } from '../decorators/attributes';
import link from '../decorators/link';

@link({basePath: "suppliers"})
export default class BusinessEntityModel extends Model {
  @string() name;
  @string() email;
  @text() description;
  @hasMany('delivery-place', { inverse: "businessEntity" }) deliveryPlaces;
  @hasMany('product-group', {
    inverse: null,
    show: 'rendering/show/product-groups',
    edit: 'rendering/edit/product-groups',
    inverse: null
  }) disallowedProductGroups;

  get label() {
    return this.name;
  }
}
