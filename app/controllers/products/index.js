import { tracked } from '@glimmer/tracking';
import DataTableController from 'ember-data-table/controller';

export default class ProductsIndexController extends DataTableController {
  queryParams = ['size', 'page', 'filter', 'sort', 'shop', 'supplier'];

  @tracked shop = '';
  @tracked supplier = '';
}
