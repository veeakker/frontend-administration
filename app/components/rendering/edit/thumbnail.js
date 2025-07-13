import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class RenderingEditThumbnailComponent extends Component {
  @service store;

  @action
  async uploadThumbnail(file) {
    const result = await (await file.upload('/files')).json();
    this.store.pushPayload('file', result);
    const uploadedFile = this.store.peekRecord('file', result.data.id);
    const product = this.args.resource;
    product.thumbnail = uploadedFile;
    await product.save();
    this.args.exitEditing();
  }
}
