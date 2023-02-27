import Model, { attr, belongsTo } from '@ember-data/model';

export default class AccountModel extends Model {
  @attr() email;
  @belongsTo() postalAddress;
  @belongsTo() person;
}
