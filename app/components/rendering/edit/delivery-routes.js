import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { set } from '@ember/object';
import Component from '@glimmer/component';

export default class RenderingEditDeliveryRoutesComponent extends Component {
  @service store

  @action
  onChange(uuid) {
    const deliveryKind = this.store.peekRecord('delivery-route', uuid);
    set(this.args.resource, this.args.property, deliveryKind);
  }
}
