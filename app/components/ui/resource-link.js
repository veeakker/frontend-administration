import Component from '@glimmer/component';

export default class UiResourceLinkComponent extends Component {
  get route() {
    const kind = this.kind;
    if( !this.resourceClass?.linkOptions ) {
      console.error("Could not find options for resource, please use @link annotation.", {
        resource: this.args.resource
      });
    }
    return this.resourceClass?.linkOptions[kind];
  }

  get resourceClass() {
    const resource = this.args.resource?.content || this.args.resource;
    return resource.constructor;
  }

  get kind() {
    return this.args.kind || "show";
  }

  get listLabel() {
    if (!this.resourceClass?.linkOptions)
      console.error("Could not find options for resource, please use @link annotation.", {
        resource: this.args.resource
      });

    return this.resourceClass?.linkOptions["listLabel"];
  }

  get linkProperty() {
    if( !this.resourceClass?.linkOptions )
      console.error("Could not find options for resource, please use @link annotation.", {
        resource: this.args.resource
      });
    return this.resourceClass?.linkOptions["label"];
  }

  /**
   * Should a model be supplied when creating the link?
   */
  get kindHasModel() {
    return this.kind !== "list";
  }
}
