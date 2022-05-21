import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class UiLinkComponent extends Component {
  @service store;

  get route() {
    const kind = this.kind;
    if (!this.modelClass?.linkOptions) {
      console.error(
        'Could not find options for model, please use @link annotation.',
        {
          model: this.args.model,
        }
      );
    }
    return this.modelClass?.linkOptions[kind];
  }

  get modelClass() {
    if( typeof this.args.class == "string" ) {
      const klass = this.store.modelFor(this.args.class);
      if( klass ) return klass;
      else console.error(`Could not find class for ${this.args.class} in Ux::Link`);
    } else if ( this.args.class ) {
      return this.args.class;
    } else {
      const model = this.args.model?.content || this.args.model;
      return model.constructor;
    }
  }

  get kind() {
    return this.args.kind || 'show';
  }

  get label() {
    if( this.kindHasModel )
      return get( this.args.model, this.linkProperty );
    else
      if( this.kind === "list" )
        return this.listLabel;
      else if( this.kind === "new" )
        return this.newLabel;
  }

  get listLabel() {
    if (!this.modelClass?.linkOptions)
      console.error(
        'Could not find options for model, please use @link annotation.',
        {
          model: this.args.model,
        }
      );

    return this.modelClass?.linkOptions['listLabel'];
  }

  get newLabel() {
    if (!this.modelClass?.linkOptions)
      console.error(
        'Could not find options for model, please use @link annotation.',
        {
          model: this.args.model,
        }
      );

    return this.modelClass?.linkOptions['newLabel'];
  }

  get linkProperty() {
    if (!this.modelClass?.linkOptions)
      console.error(
        'Could not find options for model, please use @link annotation.',
        {
          model: this.args.model,
        }
      );
    return this.modelClass?.linkOptions['label'];
  }

  /**
   * Should a model be supplied when creating the link?
   */
  get kindHasModel() {
    return !['list','new'].includes(this.kind);
  }
}
