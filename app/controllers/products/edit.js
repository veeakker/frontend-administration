import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class ProductsEditController extends Controller {
  @action
  persist(event) {
    event.preventDefault();
  }
}
