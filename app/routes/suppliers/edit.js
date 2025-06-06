import { service } from '@ember/service';
import Route from '@ember/routing/route';

export default class SuppliersEditRoute extends Route {
  @service store;

  async model({supplier_id}) {
    const businessEntity = await this.store.findRecord('business-entity', supplier_id);
    return businessEntity;
  }
}
