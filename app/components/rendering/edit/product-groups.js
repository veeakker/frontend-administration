import { set, get, action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { trackedFunction } from 'reactiveweb/function';

export default class RenderingEditProductGroupsComponent extends Component {
  @tracked groups = A()
  @service store

  @action
  async startSearch(search) {
    const filter = search ? { filter: { label: search } } : {};
    const productGroups = await this.store.query('product-group', filter);
    this.groups = A([...productGroups]);
  }

  newGroupsTf = trackedFunction( this, async () => {
    const groups = this.groups; // must be before first async call!
    const currentGroups = [...(await get(this.args.resource, this.args.property))];
    return groups.filter((x) => !currentGroups.includes(x));
  });
  get newGroups() { return this.newGroupsTf.value; }

  @action
  async addGroup(group) {
    set(this.args.resource,
      this.args.property,
      [...(await get(this.args.resource, this.args.property)), group]);
  }

  @action
  async removeGroup(group) {
    const currentGroups = await get(this.args.resource, this.args.property);
    const newGroups =
          [...currentGroups]
          .filter( (x) => x.id != group.id );
    set( this.args.resource, this.args.property, newGroups );
  }
}
