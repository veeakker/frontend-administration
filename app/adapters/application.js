import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  async findHasManyWithPageSize(_store, _snapshot, url, _relationship) {
    // Append or merge query params to the URL
    const separator = url.includes('?') ? '&' : '?';
    url += separator + "page[size]=750";

    return this.ajax(url, 'GET');
  }

  async findHasMany() {
    const response = await this.findHasManyWithPageSize(...arguments);
    if ( response.meta.count > response.data.length ) {
      console.warn("Not all resources for findHasMany returned from backend");
    }
    return response;
  }
}
