import Model from '@ember-data/model';
import { computed } from '@ember/object';
import link from '../decorators/link';

import {
  number,
  string,
  belongsTo,
  hasMany,
} from '../decorators/attributes';

@link()
export default class ProductGroupModel extends Model {
  @string() label;
  @number() sortIndex;
  @string() uri;
  @hasMany('product-group', {
    inverse: null,
    show: 'rendering/show/product-groups',
    edit: 'rendering/edit/product-groups'
  }) parentGroups;
  @hasMany('product-group', {
    inverse: null,
    show: 'rendering/show/product-groups',
    edit: 'rendering/edit/product-groups'
  }) childGroups;
  @hasMany('spotlight-product', { inverse: "productGroups", async: true }) spotlightProducts;
  @hasMany('product', {
    inverse: 'productGroups',
    show: 'rendering/show/products',
    edit: 'rendering/edit/products'
  }) products;

  @computed('childGroups.@each.sortIndex')
  get sortedChildren() {
    return (this.childGroups || []).sortBy('sortIndex');
  }

  // TODO: This does not always recompute.  Figure out solution
  @computed('products.@each.sortIndex')
  get sortedProducts() {
    return (this.products || []).sortBy('sortIndex');
  }
}
