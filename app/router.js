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
    this.route('new');
  });
  this.route('accounts', function () {});
  this.route('delivery-places', function() {
    this.route('new');
    this.route('show', { path: '/:delivery_place_id' });
    this.route('edit', { path: '/:delivery_place_id/edit' });
  });
  this.route('banners', function () {
    this.route('show', { path: '/:banner_id' });
    this.route('edit', { path: '/:banner_id/edit' });
    this.route('new');
  });
  this.route('login');

  this.route('delivery-routes', function() {
    this.route('show', { path: '/:delivery_route_id' });
    this.route('edit', { path: '/:delivery_route_id/edit' });
    this.route('new');
  });
});
