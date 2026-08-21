import { set, get, action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { trackedFunction } from 'reactiveweb/function';

export default class RenderingEditBusinessEntitiesComponent extends Component {
  @tracked entities = A()
  @service store

  @action
  async startSearch(search) {
    const filter = search ? { filter: { name: search } } : {};
    const businessEntities = await this.store.query('business-entity', filter);
    this.entities = A([...businessEntities]);
  }

  newEntitiesTf = trackedFunction( this, async () => {
    const entities = this.entities;
    const currentEntities = [...(await get(this.args.resource, this.args.property))];
    return entities.filter((x) => !currentEntities.includes(x));
  });
  get newEntities() { return this.newEntitiesTf.value; }

  @action
  async addEntity(entity) {
    set(this.args.resource,
      this.args.property,
      [...(await get(this.args.resource, this.args.property)), entity]);
  }

  @action
  async removeEntity(entity) {
    const currentEntities = await get(this.args.resource, this.args.property);
    const newEntities =
          [...currentEntities]
          .filter( (x) => x.id != entity.id );
    set( this.args.resource, this.args.property, newEntities );
  }
}
