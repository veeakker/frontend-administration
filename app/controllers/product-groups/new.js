import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import ProductGroup from 'freddie/models/product-group';

export default class ProductGroupsNewController extends Controller {
  @service store
  @service router

  get class() {
    return ProductGroup;
  }

  @action
  async persist() {
    const { label, sortIndex } = this.model;

    const record = this.store.createRecord( 'product-group', {
      label, sortIndex
    });
    await record.save();
    this.router.transitionTo('product-groups.edit', record);
  }
}
