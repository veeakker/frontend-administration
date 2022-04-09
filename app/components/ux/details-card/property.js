import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import humanize from 'freddie/utils/humanize';
import propertyType from 'freddie/utils/property-type';
import { getOwner } from '@ember/application';

export default class DetailsCardPropertyComponent extends Component {
  @tracked editing = false;

  get label() {
    return this.args.label || humanize(this.args.property);
  }

  get renderType() {
    return propertyType(this.args.resource, this.args.property);
  }

  get editComponentName() {
    return this.renderType && `rendering/edit/${this.renderType}`;
  }

  get hasCustomEditComponent() {
    // borrowed from https://github.com/xcambar/ember-cli-is-component
    const owner = getOwner(this);
    return owner
      .lookup('component-lookup:main')
      .componentFor(this.editComponentName, owner);
  }
}
