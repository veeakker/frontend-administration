import { set } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class RenderingEditProductGroupsComponent extends Component {
  @tracked groups = A()
  @service store

  @action
  async startSearch(search) {
    const filter = search ? { filter: { label: search } } : {};
    this.groups = (await this.store.query('product-group', filter)).toArray();
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
