import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { get } from '@ember/object';
import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class RenderingEditOfferingsComponent extends Component {
  @service store;

  @action
  async remove(offering) {
    if( confirm( "Delete offering?  Only execute this if this offering has just been created by mistake and no orders were made using it yet.  Disable the offering otherwise.  You can disable the whole product by selecting the \"Published?\" option in the Details section." ) ) {
      const offerings = await get(this.args.resource, this.args.property);
      set(
        this.args.resource,
        this.args.property,
        offerings.rejectBy("id", offering.id)
      );
    }
  }

  @action
  async setSupplier(offering, uuid) {
    if( uuid ) {
      offering.supplier = this.store.peekRecord('business-entity', uuid);
    } else {
      offering.supplier = null;
    }
  }

  @action
  async create({ price, unit, amount }) {
    const unitPrice = this.store.createRecord(
      'unit-price-specification',
      { value: price, unit: "C62" });
    await unitPrice.save();
    const typeAndQuantity = this.store.createRecord(
      'type-and-quantity',
      { unit, value: amount, product: this.args.resource });
    await typeAndQuantity.save();

    const offering = this.store.createRecord(
      'offering',
      { unitPrice, typeAndQuantity });
    await offering.save();
    const offerings = await get(this.args.resource, this.args.property);
    offerings.pushObject(offering);
    await this.args.resource.save();

    get(this.args.resource, this.args.property).pushObject(offering);
  }
}
