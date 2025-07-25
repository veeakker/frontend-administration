import Model, { hasMany } from '@ember-data/model';

export default class OrganizationModel extends Model {
  @hasMany('delivery-place', { inverse: null, async: true }) deliveryPlaces;
}
