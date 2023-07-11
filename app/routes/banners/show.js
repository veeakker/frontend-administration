import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class WebsiteBannersShowRoute extends Route {
  @service store;

  async model( {banner_id} ) {
    return await this.store.find('banner', banner_id);
  }
}
