import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | delivery-places/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:delivery-places/new');
    assert.ok(route);
  });
});
