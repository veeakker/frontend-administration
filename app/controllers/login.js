import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service session;

  @tracked email;
  @tracked password;
  @tracked error = [];

  @action
    async login(event) {
      event.preventDefault();
      this.error = [];

      try {
        await this.session.authenticate('authenticator:mu-semtech', {
          email: this.email,
          password: this.password
        });
      } catch(err){
        this.error = err.errors[0].title;
      }
    }
}
