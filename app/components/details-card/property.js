import Component from '@glimmer/component';
import humanize from 'freddie/utils/humanize';

export default class DetailsCardPropertyComponent extends Component {
  get label() {
    return this.args.label || humanize(this.args.property);
  }
}
