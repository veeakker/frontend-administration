import { get, set, action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { trackedFunction } from 'reactiveweb/function';

export default class RenderingEditProductsComponent extends Component {
  @tracked products = A()
  @service store

  @action
  async startSearch(search) {
    const filter = search ? { filter: { label: search } } : {};
    this.products = await this.store.query('product', filter);
  }

  newProductsTF = trackedFunction(this, async () => {
    const products = this.products;
    const selectedProducts = [...await get(this.args.resource, this.args.property)];
    return products.filter((x) => ! selectedProducts.includes(x));
  })

  get newProducts() {
    return this.newProductsTF?.value;
  }

  @action
  async add(product) {
    const arr = [...(await get(this.args.resource, this.args.property))];
    arr.push(product);
    set( this.args.resource, this.args.property, arr );
  }

  @action
  async remove(product) {
    const currentProducts = await get(this.args.resource, this.args.property);
    const newProducts = currentProducts
          .filter( (x) => x.id != product.id );
    set( this.args.resource, this.args.property, newProducts );
  }
}
