import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, focus, blur } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | navigation-narrator', function (hooks) {
  setupRenderingTest(hooks);

  module('nav message', function() {
    test('it renders', async function(assert) {
      await render(hbs`<NavigationNarrator />`);

      assert.dom("#ember-a11y-refocus-nav-message").hasText(
        'The page navigation is complete. You may now navigate the page content as you wish.'
      );
      assert.dom("#ember-a11y-refocus-nav-message").hasAttribute('tabindex', '-1');
      assert.dom("#ember-a11y-refocus-nav-message").hasClass('ember-sr-only');
    });
  });

  module('skip link', function() {
    test('it renders', async function(assert) {
      await render(hbs`<NavigationNarrator />`);

      assert.dom(".ember-a11y-refocus-skip-link").hasText('Skip to main content');
      assert.dom(".ember-a11y-refocus-skip-link").doesNotHaveClass('active');
      assert.dom(".ember-a11y-refocus-skip-link").hasAttribute('href', '#main');
    });

    test('it not renders', async function(assert) {
      await render(hbs`<NavigationNarrator @skipLink={{false}} />`);

      assert.dom(".ember-a11y-refocus-skip-link").doesNotExist();
    });

    test('it updates the ID', async function(assert) {
      await render(hbs`<NavigationNarrator @skipTo="#newid" />`);

      assert.dom(".ember-a11y-refocus-skip-link").hasAttribute('href', '#newid');
    });

    test('it updates the text', async function(assert) {
      await render(hbs`<NavigationNarrator @skipText="Skip to content" />`);

      assert.dom(".ember-a11y-refocus-skip-link").hasText('Skip to content');
    });

    test('it shows/hides for keyboard users', async function(assert) {
      await render(hbs`<NavigationNarrator />`);

      assert.dom(".ember-a11y-refocus-skip-link").doesNotHaveClass('active');

      await focus(".ember-a11y-refocus-skip-link");

      assert.dom(".ember-a11y-refocus-skip-link").hasClass('active');

      await blur(".ember-a11y-refocus-skip-link");

      assert.dom(".ember-a11y-refocus-skip-link").doesNotHaveClass('active');
    });
  });
});
