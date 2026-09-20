import Route from 'ember-data-table/route';

export default class ProductsIndexRoute extends Route {
  modelName = 'product';

  queryParams = {
    filter: { refreshModel: true },
    page: { refreshModel: true },
    size: { refreshModel: true },
    sort: { refreshModel: true },
    shop: { refreshModel: true },
    supplier: { refreshModel: true },
  };

  mergeQueryOptions(params) {
    const options = {};
    if (params.shop) {
      options['filter[offerings][offered-by-shop][:id:]'] = params.shop;
    }
    if (params.supplier) {
      options['filter[offerings][supplier][:id:]'] = params.supplier;
    }
    return options;
  }
}
