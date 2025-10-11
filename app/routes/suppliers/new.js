import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Route from '@ember/routing/route';
import BusinessEntity from 'freddie/models/business-entity';

class TmpBusinessEntity {
  @tracked name;
  @tracked email;
  @tracked description;
}

export default class SuppliersNewRoute extends Route {
  @service store;

  model() {
    return {
      businessEntity: new TmpBusinessEntity(),
      class: BusinessEntity
    }
  }
}
