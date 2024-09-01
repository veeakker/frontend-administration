import Model, { attr } from '@ember-data/model';
import link from '../decorators/link';
import {
  number,
  boolean,
  string,
} from '../decorators/attributes';

@link()
export default class BannerModel extends Model {
  @string() title;
  @number() sortIndex;
  @boolean() isEnabled;

  get label() {
    return this.title;
  }
}
