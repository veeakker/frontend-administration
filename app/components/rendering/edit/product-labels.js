import { get, set, action } from '@ember/object';
import Component from '@glimmer/component';
import productLabels from 'freddie/utils/product-labels';

export default class RenderingEditProductLabelsComponent extends Component {
  get productLabels() {
    const enabled = get(this.args.resource, this.args.property) || [];
    return productLabels.map( (label) => ({ ...label, selected: enabled.includes(label.uri) }));
  }

  @action
  toggle(entry, checked) {
    const enabled = (get(this.args.resource, this.args.property) || [])
      .filter( (uri) => uri != entry.uri );
    if (checked)
      enabled.push(entry.uri);
    set(this.args.resource, this.args.property, enabled);
  }
}
