import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class DeliveryRoutesNewController extends Controller {
  @service store;
  @service router;

  @action
  async persist() {
    const model = this.store.createRecord(
      'deliveryRoute',
      this.model.deliveryRoute);
    await model.save();
    this.router.transitionTo(model.constructor.linkOptions.edit, model);
  }
}
