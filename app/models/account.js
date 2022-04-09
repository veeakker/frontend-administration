import Model, { attr, belongsTo } from '@ember-data/model';

export default class AccountModel extends Model {
  @attr() email;
  @attr() firstName;
  @attr() lastName;

  @belongsTo() postalAddress;
}
