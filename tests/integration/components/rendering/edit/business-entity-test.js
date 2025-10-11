import { module, test } from 'qunit';
import { setupRenderingTest } from 'freddie/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | rendering/edit/business-entity',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`<Rendering::Edit::BusinessEntity />`);

      assert.dom().hasText('');

      // Template block usage:
      await render(hbs`
      <Rendering::Edit::BusinessEntity>
        template block text
      </Rendering::Edit::BusinessEntity>
    `);

      assert.dom().hasText('template block text');
    });
  }
);
