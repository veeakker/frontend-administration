import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import fetchProp from '../utils/decorators/fetch-prop';

export default class ProductModel extends Model {
  @attr('string') label;
  @attr('string') altLabel;
  @attr('string') description;
  @attr('string') ingredientsText;
  @attr('string') allergensText;
  @attr('string') nutricionDataText;
  @attr('number') sortIndex;
  @attr('number') plu;
  @attr('uri-set') productLabels;
  @attr('boolean') isEnabled;
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
