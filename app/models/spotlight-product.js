import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class SpotlightProductModel extends Model {
  @attr() sortIndex;
  @belongsTo('product', { inverse: null, async: true }) product;
  @hasMany('product-group', { inverse: "spotlightProducts", async: true }) productGroups;
}
