import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { registerDestructor } from '@ember/destroyable';
import { cancel, schedule } from '@ember/runloop';
import { defaultValidator } from '../utils/validators.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i } from 'decorator-transforms/runtime-esm';

/**
 * 🎧 NavigationNarrator
 *
 * Announces route changes for screen readers using a visually-hidden element,
 * and optionally renders a "Skip to main content" link.
 *
 * Usage:
 * ```gjs
 * import { NavigationNarrator } from 'ember-a11y-refocus';
 *
 * <template>
 *   <NavigationNarrator />
 * </template>
 * ```
 */
class NavigationNarrator extends Component {
  static {
    g(this.prototype, "router", [service]);
  }
  #router = (i(this, "router"), void 0);
  static {
    g(this.prototype, "isSkipLinkFocused", [tracked], function () {
      return false;
    });
  }
  #isSkipLinkFocused = (i(this, "isSkipLinkFocused"), void 0);
  timer;
  transition;
  constructor(owner, args) {
    super(owner, args);
    this.router.on('routeDidChange', this.onRouteChange);
    registerDestructor(this, () => {
      // eslint-disable-next-line ember/no-runloop
      cancel(this.timer);
      this.timer = undefined;
      this.router.off('routeDidChange', this.onRouteChange);
    });
  }
  /** Whether to include the skip link. Defaults to `true`. */
  get skipLink() {
    return this.args.skipLink ?? true;
  }
  /** Selector for the skip link target. Defaults to `'#main'`. */
  get skipTo() {
    return this.args.skipTo ?? '#main';
  }
  /** Text for the skip link. Defaults to `'Skip to main content'`. */
  get skipText() {
    return this.args.skipText ?? 'Skip to main content';
  }
  /** Text announced by screen readers after route transition. */
  get navigationText() {
    return this.args.navigationText ?? 'The page navigation is complete. You may now navigate the page content as you wish.';
  }
  /** Validator function for transitions. */
  get routeChangeValidator() {
    return this.args.routeChangeValidator ?? defaultValidator;
  }
  /** Whether to ignore query param changes. Defaults to `false`. */
  get excludeAllQueryParams() {
    return this.args.excludeAllQueryParams ?? false;
  }
  /** Whether the current transition includes query param changes. */
  get hasQueryParams() {
    if (Object.keys(this.transition?.from?.queryParams || {}).length || Object.keys(this.transition?.to?.queryParams || {}).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  onRouteChange = transition => {
    this.transition = transition; // We need to do this because we can't pass an argument to a getter
    // add a check to see if it's the same route
    const hasSameRoute = this.transition.from?.name === this.transition.to?.name;
    if (this.excludeAllQueryParams && this.hasQueryParams && hasSameRoute) {
      return;
    }
    const shouldFocus = this.routeChangeValidator(transition);
    // leaving this here for now because maybe it needs to be used in a custom validator function
    if (!shouldFocus) {
      return;
    }
    // eslint-disable-next-line ember/no-runloop
    this.timer = schedule('afterRender', this, function () {
      this.timer = undefined;
      document.body.querySelector('#ember-a11y-refocus-nav-message')?.focus();
    });
  };
  handleSkipLinkFocus = () => {
    this.isSkipLinkFocused = !this.isSkipLinkFocused;
  };
  static {
    setComponentTemplate(precompileTemplate("<div tabindex=\"-1\" id=\"ember-a11y-refocus-nav-message\" class=\"ember-sr-only ember-sr-only-focusable\">\n  {{this.navigationText}}\n</div>\n\n{{#if this.skipLink}}\n  <a href={{this.skipTo}} id=\"ember-a11y-refocus-skip-link\" class=\"ember-a11y-refocus-skip-link\n      {{if this.isSkipLinkFocused \"active\"}}\" {{on \"focus\" this.handleSkipLinkFocus}} {{on \"blur\" this.handleSkipLinkFocus}}>\n    {{this.skipText}}\n  </a>\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}

export { NavigationNarrator as default };
//# sourceMappingURL=navigation-narrator.js.map
