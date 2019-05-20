import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | navigation-narrator', function(hooks) {
  setupRenderingTest(hooks);

  test('navigation message renders', async function(assert) {
    await render(hbs`{{navigation-narrator}}`);
    assert.equal(this.element.textContent.trim(), 'The page navigation is complete. You may now navigate the page content as you wish.');

  });
});
