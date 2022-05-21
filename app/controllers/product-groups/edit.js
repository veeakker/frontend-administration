import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class ProductGroupsEditController extends Controller {
  @action
  persist() {
    this.model.save();
  }

  @action
  async destroy() {
    if( confirm(`Destroy product ${this.model.plu} ${this.model.label}?`) ) {
      const targetRoute = this.model.constructor.linkOptions.list;
      await this.model.destroyRecord();
      this.router.transitionTo(targetRoute);
    }
  }
}
