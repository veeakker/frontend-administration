import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import Component from '@glimmer/component';

export default class UxPageHeaderComponent extends Component {
  @service store

  get class() {
    if( typeof this.args.class === "string" )
      return this.store.modelFor( this.args.class );
    else if ( this.args.class )
      return this.args.class;
    else
      return this.args.model.constructor;
  }

  get label() {
    const labelProp = this.linkOptions.label;
    return get(this.args.model, labelProp);
  }

  get linkOptions() {
    return this.class.linkOptions;
  }
}
