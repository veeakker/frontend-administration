import { action, set } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class RenderingEditBusinessEntity extends Component {
  @service store;

  @action
  onChange(uuid) {
    const businessEntity = this.store.peekRecord('business-entity', uuid);
    set(this.args.resource, this.args.property, businessEntity);
  }
}
