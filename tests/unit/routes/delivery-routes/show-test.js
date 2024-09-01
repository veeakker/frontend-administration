import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | delivery-routes/show', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:delivery-routes/show');
    assert.ok(route);
  });
});
