import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import humanize from 'freddie/utils/humanize';

export default class DetailsCardPropertyComponent extends Component {
  @tracked editing = false;

  get label() {
    return this.args.label || humanize(this.args.property);
  }
}
