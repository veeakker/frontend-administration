import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | banners/index', function(hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:banners/index');
    assert.ok(controller);
  });
});
