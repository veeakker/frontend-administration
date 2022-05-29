import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class DeliveryPlacesEditController extends Controller {
  @action
  async persist() {
    await (await this.model.geoCoordinate).save();
    await (await this.model.postalAddress).save();
    await this.model.save();
  }

  @action
  destroy() {
    alert("Destroying locations is not implemented yet");
  }
}
