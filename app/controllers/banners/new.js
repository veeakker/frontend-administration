import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class BannersNewController extends Controller {
  @service store
  @service router

  @action
  async persist() {
    const { isEnabled, title, sortIndex } = this.model.banner;
    const model = this.store.createRecord('banner', {
      isEnabled, title, sortIndex
    });
    await model.save();
    this.router.transitionTo(model.constructor.linkOptions.edit, model);
  }
}
