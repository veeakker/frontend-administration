import { module, test } from 'qunit';
import { setupTest } from 'freddie/tests/helpers';

module('Unit | Controller | suppliers/new', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:suppliers/new');
    assert.ok(controller);
  });
});
