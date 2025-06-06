import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import Helper from '@ember/component/helper';

class State {
  @tracked records = null;
  @tracked isLoading = false;
  @tracked isSuccess = false;
}

export default class FindAll extends Helper {
  @service() store

  async updateResponse( state, type ) {
    try {
      state.records = await this.store.query(type, { page: { size: 200 } });
      state.isLoading = false;
      state.isSuccess = true;
    } catch (e) {
      state.isLoading = false;
      state.isError = e;
    }
  }

  compute( [type] ) {
    const state = new State();
    state.isLoading = false;

    this.updateResponse(state, type);
    return state;
  }
}
