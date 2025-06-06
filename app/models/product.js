import Model, { attr } from '@ember-data/model';
import fetchProp from '../decorators/fetch-prop';
import link from '../decorators/link';
import {
  number,
  boolean,
  string,
  text,
  belongsTo,
  hasMany,
} from '../decorators/attributes';

@link()
export default class ProductModel extends Model {
  @string() label;
  @string() altLabel;
  @text() description;
  @text() ingredientsText;
  @text() allergensText;
  @text() nutricionDataText;
  @number() sortIndex;
  @number() plu;
  @attr('uri-set') productLabels;
  @boolean() isEnabled;
  @hasMany('product-group', {
    inverse: null,
    show: 'rendering/show/product-groups',
    edit: 'rendering/edit/product-groups',
    inverse: 'products'
  }) productGroups;
  @hasMany('offering', {
    show: 'rendering/show/offerings',
    edit: 'rendering/edit/offerings',
    inverse: null
  }) offerings;
  @belongsTo('unit-price-specification', {
    show: 'rendering/show/unit-price-specification',
    edit: 'rendering/edit/unit-price-specification',
    inverse: null
  })
  unitPrice;
  @belongsTo('quantitative-value', {
    show: 'rendering/show/quantitative-value',
    edit: 'rendering/edit/quantitative-value',
    inverse: null
  })
  targetUnit;
  // @belongsTo('file') thumbnail;
  @belongsTo('file', {
    show: 'rendering/show/thumbnail',
    edit: 'rendering/edit/thumbnail',
    inverse: null
  })
  thumbnail;

  hasDirtyRelationships = false;

  @fetchProp('unitPrice', 'unit-price-specification') ensuredUnitPrice;
  @fetchProp('targetUnit', 'quantitative-value') ensuredTargetUnit;

  async save() {
    await super.save();
    this.set('hasDirtyRelationships', false);
  }
}
