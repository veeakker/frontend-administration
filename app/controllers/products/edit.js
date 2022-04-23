import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class ProductsEditController extends Controller {
  @action
  async persist() {
    await this.model.save();
    await (await this.model.targetUnit)?.save();
    await (await this.model.unitPrice)?.save();
  }
}
