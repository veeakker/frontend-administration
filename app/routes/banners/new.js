import { tracked } from '@glimmer/tracking';
import Route from '@ember/routing/route';
import Banner from 'freddie/models/banner';

class TmpBanner {
  @tracked title;
  @tracked isEnabled = true;
  @tracked sortIndex;
}

export default class WebsiteBannersNewRoute extends Route {
  model() {
    return {
      banner: new TmpBanner(),
      class: Banner
    };
  }
}
