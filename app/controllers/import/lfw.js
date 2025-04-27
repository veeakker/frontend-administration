import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class ImportLfwController extends Controller {
  @tracked output = "";

  @action
  async lfwImport() {
    this.output = "Importing from LFW... you may need to come back later when the process is finished.";
    this.output = await (await fetch('/import/lfw/', {
      method: "POST",
      headers: {
        accept: "application/vnd.api+json"
      }
    })).text();
  }
}
