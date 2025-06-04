import { service } from '@ember/service';
import Route from '@ember/routing/route';

export default class SuppliersShowRoute extends Route {
  @service store;

  async model({supplier_id}) {
    return await this.store.find('business-entity', supplier_id);
  }
}
