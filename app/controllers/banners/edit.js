import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class BannersEditController extends Controller {
  @service router

  @action
  async persist() {
    await this.model.save();
  }

  @action
  async destroy() {
    if( confirm(`Destroy banner ${this.model.label}?`) ) {
      const targetRoute = this.model.constructor.linkOptions.list;
      await this.model.destroyRecord();
      this.router.transitionTo(targetRoute);
    }
  }
}
