import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class SuppliersEditController extends Controller {
  @service router

  @action
  async persist() {
    await this.model.save();
  }

  @action
  async destroy() {
    if( confirm(`Destroy supplier ${this.model.name}?`) ) {
      const targetRoute = this.model.constructor.linkOptions.list;
      await this.model.destroyRecord();
      this.router.transitionTo(targetRoute);
    }
  }
}
