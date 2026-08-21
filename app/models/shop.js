import Model from '@ember-data/model';
import link from '../decorators/link';
import { string, text, hasMany, belongsTo } from '../decorators/attributes';

@link()
export default class ShopModel extends Model {
  @string() label;
  @string() slug;
  @text() style;
  @belongsTo('file', {
    show: 'rendering/show/image',
    edit: 'rendering/edit/image',
    inverse: null
  }) logo;
  @belongsTo('file', {
    show: 'rendering/show/image',
    edit: 'rendering/edit/image',
    inverse: null
  }) topImage;
  @belongsTo('file', {
    show: 'rendering/show/image',
    edit: 'rendering/edit/image',
    inverse: null
  }) placeholderImage;
  @hasMany('delivery-place', {
    show: 'rendering/show/delivery-places',
    edit: 'rendering/edit/delivery-places',
    inverse: null
  }) deliveryPlaces;
  @hasMany('product-group', {
    show: 'rendering/show/product-groups',
    edit: 'rendering/edit/product-groups',
    inverse: null
  }) disallowedProductGroups;
  @hasMany('business-entity', {
    show: 'rendering/show/business-entities',
    edit: 'rendering/edit/business-entities',
    inverse: null
  }) suppliers;
}
