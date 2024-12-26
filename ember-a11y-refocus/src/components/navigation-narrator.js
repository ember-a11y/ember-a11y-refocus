import Component from '@glimmer/component';
import { action } from '@ember/object';
import { registerDestructor } from '@ember/destroyable';
import { inject as service } from '@ember/service';
import { schedule, cancel } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import { defaultValidator } from './../utils/validators.js';

export default class NavigationNarratorComponent extends Component {
  @service router;
  @tracked isSkipLinkFocused = false;
  timer = null;

  /*
   * @param skipLink
   * @type {boolean}
   * @description Whether or not to include the skip link in the page. If you don't want the skip link to be included, you can set this to false.
   * @default true
   */
  get skipLink() {
    return this.args.skipLink ?? true;
  }

  /*
   * @param skipTo
   * @type {string}
   * @description Element selector for what the skip link should jump to. A default is provided but this can be customized.
   * @default '#main'
   */
  get skipTo() {
    return this.args.skipTo ?? '#main';
  }

  /*
   * @param skipText
   * @type {string}
   * @description text of the bypass block/skip link. Default text is provided but it can be customized.
   * @default 'Skip to main content'
   */
  get skipText() {
    return this.args.skipText ?? 'Skip to main content';
  }

  /*
   * @param navigationText
   * @type {string}
   * @description The text to be read by the screen reader when the page navigation is complete. While a default message is provided, it can be customized to better fit the needs of your application.
   * @default 'The page navigation is complete. You may now navigate the page content as you wish.'
   */
  get navigationText() {
    return (
      this.args.navigationText ??
      'The page navigation is complete. You may now navigate the page content as you wish.'
    );
  }

  /*
   * @param routeChangeValidator
   * @type {function}
   * @description A function that can be used to provide a custom definition of a route transition. Typically used if you have some query params that you don't want to trigger the route transition (but you would otherwise mostly want it to behave per Ember's default).
   */
  get routeChangeValidator() {
    return this.args.routeChangeValidator ?? defaultValidator;
  }

  /*
   * @param excludeAllQueryParams
   * @type {boolean}
   * @description Whether or not to include all query params in definition of a route transition. If you want to include/exclude _some_ query params, the routeChangeValidator function should be used instead.
   * @default false
   */
  get excludeAllQueryParams() {
    return this.args.excludeAllQueryParams ?? false;
  }

  /*
   * @param hasQueryParams
   * @type {boolean}
   * @description Check for queryParams.
   * @default false
   */
  get hasQueryParams() {
    if (
      Object.keys(this.transition.from?.queryParams || {}).length ||
      Object.keys(this.transition.to?.queryParams || {}).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  constructor() {
    super(...arguments);

    this.router.on('routeDidChange', this.onRouteChange);

    registerDestructor(this, () => {
      // eslint-disable-next-line ember/no-runloop
      cancel(this.timer);
      this.timer = null;
      this.router.off('routeDidChange', this.onRouteChange);
    });
  }

  @action
  onRouteChange(transition) {
    let shouldFocus;
    this.transition = transition; // We need to do this because we can't pass an argument to a getter

    // add a check to see if it's the same route
    let hasSameRoute = this.transition.from?.name === this.transition.to?.name;

    if (this.excludeAllQueryParams && this.hasQueryParams && hasSameRoute) {
      return;
    }

    shouldFocus = this.routeChangeValidator(transition);

    // leaving this here for now because maybe it needs to be used in a custom validator function
    if (!shouldFocus) {
      return;
    }

    // eslint-disable-next-line ember/no-runloop
    this.timer = schedule('afterRender', this, function () {
      this.timer = null;
      document.body.querySelector('#ember-a11y-refocus-nav-message').focus();
    });
  }

  @action
  handleSkipLinkFocus() {
    this.isSkipLinkFocused = !this.isSkipLinkFocused;
  }
}
