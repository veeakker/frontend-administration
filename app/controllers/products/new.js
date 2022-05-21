import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class ProductsNewController extends Controller {
  @service store;
  @service router;

  @action
  async persist() {
    const { plu, label, description, sortIndex } = this.model;
    const model = this.store.createRecord('product', {
      plu, label, description, sortIndex, isEnabled: false
    });
    await model.save();
    this.router.transitionTo(model.constructor.linkOptions.edit, model);
  }
}
