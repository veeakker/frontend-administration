import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  async findHasMany() {
    const response = await super.findHasMany(...arguments);
    if ( response.meta.count > response.data.length ) {
      console.warn("Not all resources for findHasMany returned from backend");
    }
    return response;
  }
}
