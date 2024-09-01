import Component from '@glimmer/component';
import { get } from '@ember/object';

export default class RenderingShowDateComponent extends Component {
  get dateString() {
    return get( this.args.resource, this.args.property )?.toLocaleDateString();
  }
}
