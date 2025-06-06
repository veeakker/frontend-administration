import { inject as service } from '@ember/service';
import { action, set } from '@ember/object';
import Component from '@glimmer/component';

export default class RenderingEditDeliveryKindComponent extends Component {
  @service store

  @action
  onChange(uuid) {
    const deliveryKind = this.store.peekRecord('delivery-kind', uuid);
    set(this.args.resource, this.args.property, deliveryKind);
  }
}
