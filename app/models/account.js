import Model, { attr, belongsTo } from '@ember-data/model';

export default class AccountModel extends Model {
  @attr('string') email;
  @attr('string') password;
  @belongsTo({inverse: null, async: true}) postalAddress;
  @belongsTo({inverse: "account", async: true}) person;
}
