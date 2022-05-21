import { get, set } from '@ember/object';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class RenderingEditProductsComponent extends Component {
  @tracked products = A()
  @service store

  @action
  async startSearch(search) {
    const filter = search ? { filter: { label: search } } : {};
    this.products = (await this.store.query('product', filter)).toArray();
  }

  get newProducts() {
    return this.products
      .filter((x) =>
        ! get(this.args.resource, this.args.property)
          .toArray()
          .includes(x));
  }

  @action
  async add(product) {
    (await get(this.args.resource, this.args.property)).pushObject(product);
  }

  @action
  async remove(product) {
    const currentProducts = await get(this.args.resource, this.args.property);
    const newProducts = currentProducts
          .toArray()
          .filter( (x) => x.id != product.id );
    set( this.args.resource, this.args.property, newProducts );
  }
}
