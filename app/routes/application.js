import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  @service() session;

  async beforeModel(transition) {
    await this.session.setup();
    this.session.requireAuthentication(transition, 'login');
  }
}
