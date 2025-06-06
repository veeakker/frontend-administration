import { get, set, action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { A } from '@ember/array';

export default class RenderingEditDeliveryPlacesComponent extends Component {
  @tracked groups = A()
  @service store

  @action
  async startSearch(search) {
    const filter = search ? { filter: { label: search } } : {};
    this.groups = (await this.store.query('delivery-place', filter)).toArray();
  }

  get newGroups() {
    return this.groups
      .filter((x) =>
        ! get(this.args.resource, this.args.property)
          .toArray()
          .includes(x));
  }

  @action
  async addGroup(group) {
    (await get(this.args.resource, this.args.property)).pushObject(group);
  }

  @action
  async removeGroup(group) {
    const currentGroups = await get(this.args.resource, this.args.property);
    const newGroups = currentGroups
          .toArray()
          .filter( (x) => x.id != group.id );
    set( this.args.resource, this.args.property, newGroups );
  }
}
