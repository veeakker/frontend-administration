import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { get } from '@ember/object';
import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class RenderingEditOfferingsComponent extends Component {
  @service store;

  @action
  async remove(offering) {
    const offerings = await get(this.args.resource, this.args.property);
    set(
      this.args.resource,
      this.args.property,
      offerings.rejectBy("id", offering.id)
    );
  }

  @action
  async create({ price, unit, amount }) {
    const unitPrice = this.store.createRecord(
      'unit-price-specification',
      { value: price, unit: "C62" });
    await unitPrice.save();
    const typeAndQuantity = this.store.createRecord(
      'type-and-quantity',
      { unit, value: amount });
    await typeAndQuantity.save();

    const offering = this.store.createRecord(
      'offering',
      { unitPrice, typeAndQuantity });
    await offering.save();

    get(this.args.resource, this.args.property).pushObject(offering);
  }
}
