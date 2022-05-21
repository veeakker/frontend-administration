import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | product-groups/new', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:product-groups/new');
    assert.ok(route);
  });
});
