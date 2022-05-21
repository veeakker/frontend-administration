import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import Product from 'freddie/models/product';

class TmpProduct {
  @tracked plu
  @tracked label
  @tracked description
  @tracked sortIndex
}

export default class ProductsNewRoute extends Route {
  @service store;

  model() {
    return {
      product: new TmpProduct(),
      class: Product
    };
  }
}
