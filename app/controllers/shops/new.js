import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import Shop from 'freddie/models/shop';

export default class ShopsNewController extends Controller {
  @service store;
  @service router;

  get class() {
    return Shop;
  }

  @action
  async persist() {
    const { label, slug, style } = this.model;
    const record = this.store.createRecord('shop', { label, slug, style });
    await record.save();
    this.router.transitionTo('shops.edit', record);
  }

  @action
  cancel() {
    this.router.transitionTo('shops.index');
  }
}
