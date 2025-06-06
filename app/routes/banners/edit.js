import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class WebsiteBannersEditRoute extends Route {
  @service store;

  async model({banner_id}) {
    return await this.store.findRecord('banner', banner_id);
  }
}
