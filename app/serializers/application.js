import DataTableSerializer from 'ember-data-table/serializer';

export default class ApplicationSerializer extends DataTableSerializer {
  serializeAttribute(_snapshot, _json, key, _attributes) {
    if (key !== 'uri') super.serializeAttribute(...arguments);
  }
}
