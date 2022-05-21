import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class ProductsEditController extends Controller {
  @service router

  @action
  async persist() {
    await this.model.save();
    await (await this.model.targetUnit)?.save();
    await (await this.model.unitPrice)?.save();
    const offerings = await this.model.offerings;
    const offeringSaves = offerings?.map(
      async (o) => {
        await o.save();
        await (await o.unitPrice)?.save();
        await (await o.typeAndQuantity)?.save();
      });
    await Promise.all(offeringSaves || []);
  }

  @action
  async applyDefaultPrices() {
    const offerings = (await this.model.offerings);
    offerings.map( (o) => o.calculatePricingSync( this.model ) );
  }

  @action
  async destroy() {
    if( confirm(`Destroy product ${this.model.plu} ${this.model.label}?`) ) {
      const targetRoute = this.model.constructor.linkOptions.list;
      await this.model.destroyRecord();
      this.router.transitionTo(targetRoute);
    }
  }
}
