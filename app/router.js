import EmberRouter from '@ember/routing/router';
import config from 'freddie/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('products', function () {
    this.route('show', { path: '/:product_id' });
    this.route('edit', { path: '/:product_id/edit' });
    this.route('new');
  });
  this.route('product-groups', function () {
    this.route('show', { path: '/product-groups/:product_group_id' });
    this.route('edit', { path: '/product-groups/:product_group_id/edit' });
  });
  this.route('accounts', function () {});
});
