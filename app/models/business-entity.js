import Model from '@ember-data/model';
import { string, text } from '../decorators/attributes';
import link from '../decorators/link';

@link({basePath: "suppliers"})
export default class BusinessEntityModel extends Model {
  @string() name;
  @string() email;
  @text() description;

  get label() {
    return this.name;
  }
}
