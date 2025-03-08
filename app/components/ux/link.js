import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import ObjectProxy from '@ember/object/proxy';
import { trackedFunction } from 'reactiveweb/function';

export default class UiLinkComponent extends Component {
  @service store;

  get route() {
    const kind = this.kind;
    if (this.modelPending)
      return null
    else if (!this.modelClass?.linkOptions) {
      console.error(
        'Could not find options for model, please use @link annotation.',
        {
          model: this.model,
        }
      );
    } else {
      return this.modelClass?.linkOptions[kind];
    }
  }

  get modelPending() {
    return !this.trackedModel.isFinished;
  }

  get model() {
    return !this.modelPending
     && this.trackedModel.value;
  }

  trackedModel = trackedFunction(this, async () => {
    if ( this.args.model instanceof ObjectProxy
      && this.args.model.promise ) {
      await this.args.model.promise;
      return this.args.model.content;
    } else {
      await (new Promise( (res) => res() ) );
      return this.args.model;
    }
  });

  get modelClass() {
    if( typeof this.args.class == "string" ) {
      const klass = this.store.modelFor(this.args.class);
      if( klass ) return klass;
      else console.error(`Could not find class for ${this.args.class} in Ux::Link`);
    } else if ( this.args.class ) {
      return this.args.class;
    } else if ( !this.modelPending ) {
      return this.model?.constructor;
    }
  }

  get kind() {
    return this.args.kind || 'show';
  }

  get label() {
    if( this.modelPending ) {
      return undefined;
    } else {
        if (this.kindHasModel)
            return get(this.model, this.linkProperty);
        else
            if (this.kind === "list")
                return this.listLabel;
            else if (this.kind === "new")
                return this.newLabel;
    }
  }

  get listLabel() {
    if (this.modelPending)
      return undefined;
    else if (!this.modelClass?.linkOptions)
      console.error(
        'Could not find options for model, please use @link annotation.',
        {
          model: this.model,
        }
      );
    else
      return this.modelClass?.linkOptions['listLabel'];
  }

  get newLabel() {
    if (this.modelPending)
      return undefined;
    else if (!this.modelClass?.linkOptions)
      console.error(
        'Could not find options for model, please use @link annotation.',
        {
          model: this.model,
        }
      );
    else
      return this.modelClass?.linkOptions['newLabel'];
  }

  get linkProperty() {
    if (this.modelPending)
      return undefined;
    else if (!this.modelClass?.linkOptions)
      console.error(
        'Could not find options for model, please use @link annotation.',
        {
          model: this.model,
        }
      );
    else
      return this.modelClass?.linkOptions['label'];
  }

  /**
   * Should a model be supplied when creating the link?
   */
  get kindHasModel() {
    return !['list','new'].includes(this.kind);
  }
}
