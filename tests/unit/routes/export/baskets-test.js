import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | export/baskets', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:export/baskets');
    assert.ok(route);
  });
});
