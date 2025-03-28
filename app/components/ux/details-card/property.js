import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import humanize from 'freddie/utils/humanize';
import propertyType from 'freddie/utils/property-type';
import { getOwner } from '@ember/application';
import { trackedFunction } from 'reactiveweb/function';
import ObjectProxy from '@ember/object/proxy';

export default class DetailsCardPropertyComponent extends Component {
  @tracked editing = false;

  @action
  startEditing() {
    if (this.args.editable)
      this.editing = true;
  }

  @action
  stopEditing() {
    this.editing = false;
  }

  get label() {
    return this.args.label || humanize(this.args.property);
  }

  get renderType() {
    if ( this.class ) {
        return propertyType({
            class: this.class,
            property: this.args.property
        });
    } else {
      return undefined;
    }
  }

  asyncResource = trackedFunction( this, async () => {
    if( this.args.resource instanceof ObjectProxy
      && this.args.resource.promise ) {
      await this.args.resource.promise;
      return this.args.resource.content;
    } else {
      return this.args.resource;
    }
  } )

  get resource() {
    return this.asyncResource.isFinished && this.asyncResource.value;
  }

  get resourceAvailable() {
    return this.asyncResource.isFinished;
  }

  get class() {
    if ( this.args.class )
      return this.args.class;
    else if ( this.resourceAvailable )
      return this.resource.constructor;
    else
      return null;
  }

  get classAvailable() {
    return ( this.args.class || this.resourceAvailable || false ) && true;
  }

  get customShowComponent() {
    const options = this.class?.propertyMeta;
    return options && (options[this.args.property] || {}).show;
  }

  get implicitEditComponentName() {
    return this.renderType && `rendering/edit/${this.renderType}`;
  }

  get hasImplicitEditComponent() {
    return this.componentExists(this.implicitEditComponentName);
  }

  get explicitEditComponentName() {
    const options = this.class?.propertyMeta;
    return options && (options[this.args.property] || {}).edit;
  }

  get hasCustomEditComponent() {
    return this.explicitEditComponentName || this.hasImplicitEditComponent;
  }

  get customEditComponentName() {
    return (
      this.explicitEditComponentName ||
      (this.hasImplicitEditComponent && this.implicitEditComponentName)
    );
  }

  get showComponentName() {
    // although this is an interesting approach, perhaps we can make do
    // with less magic and allow for custom rendering on the property
    // level.  in order to make that happen, the property could indicate
    // which property should be rendered for editing and showing if it
    // would like to do so.  this would make rendering custom edit menus
    // for related properties feasible too.  if we play this exactly
    // right, we could even make it share an options object to that
    // component which could help in further abstracting things.
    return this.renderType && `rendering/show/${this.renderType}`;
  }

  /**
   * Yields truthy iff the specified component name exists.
   *
   * @param {string} name The path where the component can be found.
   */
  componentExists(name) {
    // borrowed from https://github.com/xcambar/ember-cli-is-component
    const owner = getOwner(this);
    return !!owner
      .lookup('component-lookup:main')
      .componentFor(name, owner);
  }

  get renderLabel() {
    return 'renderLabel' in this.args ? this.args.renderLabel : true;
  }
}
