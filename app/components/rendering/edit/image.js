import { inject as service } from '@ember/service';
import { set, action } from '@ember/object';
import Component from '@glimmer/component';

export default class RenderingEditImageComponent extends Component {
  @service store;

  @action
  async uploadImage(file) {
    const result = await (await file.upload('/files')).json();
    this.store.pushPayload('file', result);
    const uploadedFile = this.store.peekRecord('file', result.data.id);
    set(this.args.resource, this.args.property, uploadedFile);
    await this.args.resource.save();
    this.args.exitEditing();
  }
}
