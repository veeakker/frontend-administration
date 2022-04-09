import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import fetchProp from '../utils/decorators/fetch-prop';
import link from '../decorators/link';
import { number, boolean, string, text } from '../decorators/attributes';

@link()
export default class ProductModel extends Model {
  @string() label;
  @string() altLabel;
  @string() description;
  @text() ingredientsText;
  @text() allergensText;
  @text() nutricionDataText;
  @number() sortIndex;
  @number() plu;
  @attr('uri-set') productLabels;
  @boolean() isEnabled;
  @hasMany('product-group') productGroups;
  @hasMany('offering') offerings;
  @belongsTo('unit-price-specification') unitPrice;
  @belongsTo('quantitative-value') targetUnit;
  @belongsTo('file') thumbnail;

  hasDirtyRelationships = false;

  @fetchProp('unitPrice', 'unit-price-specification') ensuredUnitPrice;
  @fetchProp('targetUnit', 'quantitative-value') ensuredTargetUnit;

  async save() {
    await super.save();
    this.set('hasDirtyRelationships', false);
  }
}
