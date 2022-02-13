import Component from '@glimmer/component';

export default class UiLinkComponent extends Component {
  get route() {
    const kind = this.kind;
    if( !this.modelClass?.linkOptions ) {
      console.error("Could not find options for model, please use @link annotation.", {
        model: this.args.model
      });
    }
    return this.modelClass?.linkOptions[kind];
  }

  get modelClass() {
    const model = this.args.model?.content || this.args.model;
    return model.constructor;
  }

  get kind() {
    return this.args.kind || "show";
  }

  get listLabel() {
    if (!this.modelClass?.linkOptions)
      console.error("Could not find options for model, please use @link annotation.", {
        model: this.args.model
      });

    return this.modelClass?.linkOptions["listLabel"];
  }

  get linkProperty() {
    if( !this.modelClass?.linkOptions )
      console.error("Could not find options for model, please use @link annotation.", {
        model: this.args.model
      });
    return this.modelClass?.linkOptions["label"];
  }

  /**
   * Should a model be supplied when creating the link?
   */
  get kindHasModel() {
    return this.kind !== "list";
  }
}
