import Model, { attr } from '@ember-data/model';

export default class PostalAddressModel extends Model {
  @attr() country;
  @attr() locality;
  @attr() postalCode;
  @attr() streetAddress;

  get label() {
    return `${this.streetAddress}, ${this.postalCode} ${this.locality}`;
  }
}
