import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | banners/new', function(hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:banners/new');
    assert.ok(controller);
  });
});
