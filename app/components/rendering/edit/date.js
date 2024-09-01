import Component from '@glimmer/component';
import { get } from '@ember/object';

export default class RenderingEditDateComponent extends Component {
  get dateString() {
    const date = get(this.args.resource, this.args.property );
    if( date ) {
      var day = ("0" + date.getDate()).slice(-2);
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      return date.getFullYear() + "-" + (month) + "-" + (day);
    } else {
      return null;
    }
  }
}
