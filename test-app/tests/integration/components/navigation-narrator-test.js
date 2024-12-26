import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, clearRender, focus, blur, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { MockTransition, MockRouteInfo } from '../../helpers/mocks';

module('Integration | Component | navigation-narrator', function (hooks) {
  setupRenderingTest(hooks);

  module('nav message', function () {
    test('it renders', async function (assert) {
      await render(hbs`<NavigationNarrator />`);

      assert
        .dom('#ember-a11y-refocus-nav-message')
        .hasText(
          'The page navigation is complete. You may now navigate the page content as you wish.',
        );
      assert
        .dom('#ember-a11y-refocus-nav-message')
        .hasAttribute('tabindex', '-1');
      assert.dom('#ember-a11y-refocus-nav-message').hasClass('ember-sr-only');
    });
  });

  module('skip link', function () {
    test('it renders', async function (assert) {
      await render(hbs`<NavigationNarrator />`);

      assert
        .dom('.ember-a11y-refocus-skip-link')
        .hasText('Skip to main content');
      assert.dom('.ember-a11y-refocus-skip-link').doesNotHaveClass('active');
      assert.dom('.ember-a11y-refocus-skip-link').hasAttribute('href', '#main');
    });

    test('it does not render when `skipLink` is set to false', async function (assert) {
      await render(hbs`<NavigationNarrator @skipLink={{false}} />`);

      assert.dom('.ember-a11y-refocus-skip-link').doesNotExist();
    });

    test('it targets the id passed to `skipTo`', async function (assert) {
      await render(hbs`<NavigationNarrator @skipTo="#newid" />`);

      assert
        .dom('.ember-a11y-refocus-skip-link')
        .hasAttribute('href', '#newid');
    });

    test('it renders custom text passed to `skipText`', async function (assert) {
      await render(hbs`<NavigationNarrator @skipText="Skip to content" />`);

      assert.dom('.ember-a11y-refocus-skip-link').hasText('Skip to content');
    });

    test('it shows/hides the bypass block/skip link for keyboard users', async function (assert) {
      await render(hbs`<NavigationNarrator />`);

      assert.dom('.ember-a11y-refocus-skip-link').doesNotHaveClass('active');

      await focus('.ember-a11y-refocus-skip-link');

      assert.dom('.ember-a11y-refocus-skip-link').hasClass('active');

      await blur('.ember-a11y-refocus-skip-link');

      assert.dom('.ember-a11y-refocus-skip-link').doesNotHaveClass('active');
    });
  });

  module('on routeDidChange', function () {
    test('it handles focus', async function (assert) {
      let router = this.owner.lookup('service:router');

      await render(hbs`<NavigationNarrator />`);

      router.trigger('routeDidChange', new MockTransition());

      await settled();

      assert.dom('#ember-a11y-refocus-nav-message').isFocused();
    });

    test('it does not error if element is removed before focus', async function (assert) {
      assert.expect(0); // no assertions here, just making sure the test runs w/o erroring
      let router = this.owner.lookup('service:router');

      await render(hbs`<NavigationNarrator />`);
      await clearRender();

      router.trigger('routeDidChange', new MockTransition());

      await settled();
    });

    test('it accepts custom change-detection logic', async function (assert) {
      let router = this.owner.lookup('service:router');

      this.set('routeChangeValidator', () => false);

      await render(
        hbs`<NavigationNarrator @routeChangeValidator={{this.routeChangeValidator}} />`,
      );

      router.trigger('routeDidChange', new MockTransition());

      await settled();

      assert.dom('#ember-a11y-refocus-nav-message').isNotFocused();
    });

    test('it transitions routes with query params and manages focus if `excludeAllQueryParams` is false (default)', async function (assert) {
      let router = this.owner.lookup('service:router');

      await render(hbs`<NavigationNarrator />`);

      router.trigger(
        'routeDidChange',
        new MockTransition({
          from: new MockRouteInfo({
            name: 'biscuit',
            params: { id: 'hobnob' },
            queryParams: { region: 'amer' },
          }),
          to: new MockRouteInfo({
            name: 'biscuit',
            params: { id: 'hobnob' },
            queryParams: { region: 'apac' },
          }),
        }),
      );

      await settled();

      assert.dom('#ember-a11y-refocus-nav-message').isFocused();
    });

    test('excludeAllQueryParams is true, queryParams exist, should not manage focus', async function (assert) {
      let router = this.owner.lookup('service:router');

      await render(hbs`<NavigationNarrator @excludeAllQueryParams={{true}} />`);

      // router.trigger('routeDidChange', new MockTransition());
      router.trigger(
        'routeDidChange',
        new MockTransition({
          from: new MockRouteInfo({
            name: 'biscuit',
            params: { id: 'hobnob' },
            queryParams: { region: 'amer' },
          }),
          to: new MockRouteInfo({
            name: 'biscuit',
            params: { id: 'hobnob' },
            queryParams: { region: 'apac' },
          }),
        }),
      );

      await settled();

      assert.dom('#ember-a11y-refocus-nav-message').isNotFocused();
    });

    test('excludeAllQueryParams is true, but queryParams do not exist, manage focus', async function (assert) {
      let router = this.owner.lookup('service:router');

      await render(hbs`<NavigationNarrator @excludeAllQueryParams={{true}} />`);
      router.trigger('routeDidChange', new MockTransition());

      await settled();

      assert.dom('#ember-a11y-refocus-nav-message').isFocused();
    });

    test('excludeAllQueryParams is true, queryParams do not exist but are added, do not manage focus', async function (assert) {
      let router = this.owner.lookup('service:router');

      await render(hbs`<NavigationNarrator @excludeAllQueryParams={{true}} />`);
      router.trigger(
        'routeDidChange',
        new MockTransition({
          from: new MockRouteInfo({
            name: 'biscuit',
            params: { id: 'hobnob' },
          }),
          to: new MockRouteInfo({
            name: 'biscuit',
            params: { id: 'hobnob' },
            queryParams: { region: 'apac' },
          }),
        }),
      );

      await settled();

      assert.dom('#ember-a11y-refocus-nav-message').isNotFocused();
    });

    test('excludeAllQueryParams is true, queryParams exist on the route but then are emptied, still do not manage focus', async function (assert) {
      let router = this.owner.lookup('service:router');

      await render(hbs`<NavigationNarrator @excludeAllQueryParams={{true}} />`);
      router.trigger(
        'routeDidChange',
        new MockTransition({
          from: new MockRouteInfo({
            name: 'biscuit',
            params: { id: 'hobnob' },
            queryParams: { region: 'apac' },
          }),
          to: new MockRouteInfo({
            name: 'biscuit',
            params: { id: 'hobnob' },
          }),
        }),
      );

      await settled();

      assert.dom('#ember-a11y-refocus-nav-message').isNotFocused();
    });

    test('excludeAllQueryParams is true, queryParams exist on the route, user navigates to new route without any query params, manage focus', async function (assert) {
      let router = this.owner.lookup('service:router');

      await render(hbs`<NavigationNarrator @excludeAllQueryParams={{true}} />`);
      router.trigger(
        'routeDidChange',
        new MockTransition({
          from: new MockRouteInfo({
            name: 'biscuit',
            params: { id: 'hobnob' },
            queryParams: { region: 'apac' },
            parent: new MockRouteInfo({
              name: 'biscuits',
              parent: new MockRouteInfo({
                name: 'application',
              }),
            }),
          }),
          to: new MockRouteInfo({
            name: 'index',
            parent: new MockRouteInfo({
              name: 'cakes',
              parent: new MockRouteInfo({
                name: 'application',
              }),
            }),
          }),
        }),
      );

      await settled();

      assert.dom('#ember-a11y-refocus-nav-message').isFocused();
    });
  });
});
