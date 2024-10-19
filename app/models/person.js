import Model, { attr, belongsTo } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr('string') firstName;
  @attr('string') lastName;
  @attr('string') email;
  @attr('string') phone;

  @belongsTo('account') accounts;
}
