import { get, action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class DeliveryPlacesEditController extends Controller {
  @service store;
  @service router;

  @action
  async persist() {
    await (await this.model.geoCoordinate).save();
    await (await this.model.postalAddress).save();
    await this.model.save();
  }

  @action
  async destroy() {
    if( confirm(`Do you want to destroy location ${get(this.model, "postalAddress.locality")}?`) ) {
      await (await this.model.geoCoordinate)?.destroyRecord();
      await (await this.model.postalAddress)?.destroyRecord();
      await this.model.destroyRecord();
      this.router.transitionTo('delivery-places.index');
    }
  }
}
