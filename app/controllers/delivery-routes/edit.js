import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class DeliveryRoutesEditController extends Controller {
  @service router

  @action
  async persist() {
    await this.model.save();
  }

  @action
  async destroy() {
    if( confirm(`Destroy route ${this.model.label}?`) ) {
      const targetRoute = this.model.constructor.linkOptions.list;
      await this.model.destroyRecord();
      this.router.transitionTo(targetRoute);
    }
  }
}
