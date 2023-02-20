import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class ProductsNewController extends Controller {
  @service store;
  @service router;

  @action
  async persist() {
    const { plu, label, description, sortIndex } = this.model.product;
    const unitPrice = this.store.createRecord('unit-price-specification');
    const targetUnit = this.store.createRecord('quantitative-value');
    await unitPrice.save();
    await targetUnit.save();
    const model = this.store.createRecord('product', {
      plu, label, description, sortIndex, isEnabled: false,
      unitPrice, targetUnit
    });
    await model.save();
    this.router.transitionTo(model.constructor.linkOptions.edit, model);
  }
}
