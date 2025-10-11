import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class SuppliersNewController extends Controller {
  @service store;
  @service router;

  @action
  async persist() {
    const { name, email, description } = this.model.businessEntity;
    const model = this.store.createRecord('business-entity', {
      name, email, description
    });
    await model.save();
    this.router.transitionTo(model.constructor.linkOptions.edit, model);
  }
}
