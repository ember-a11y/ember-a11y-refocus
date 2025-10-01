import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { registerDestructor } from '@ember/destroyable';
import { schedule, cancel } from '@ember/runloop';

import '../styles/navigation-narrator.css';
import { defaultValidator } from '../utils/validators.js';

import type RouterService from '@ember/routing/router-service';
import type Owner from '@ember/owner';
import type Transition from '@ember/routing/transition';
import type { Timer } from '@ember/runloop';

export interface NavigationNarratorSignature {
  Args: {
    /** Whether to include the skip link. Defaults to `true`. */
    skipLink?: boolean;

    /** CSS selector the skip link jumps to. Defaults to `'#main'`. */
    skipTo?: string;

    /** Text content of the skip link. Defaults to `'Skip to main content'`. */
    skipText?: string;

    /** Text announced by a screen reader after navigation. */
    navigationText?: string;

    /** Custom logic for determining whether a transition should trigger narration. */
    routeChangeValidator?: (transition: Transition) => boolean;

    /** Whether to ignore query param changes during route comparisons. Defaults to `false`. */
    excludeAllQueryParams?: boolean;
  };

  Element: HTMLElement;
}

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
export default class NavigationNarrator extends Component<NavigationNarratorSignature> {
  @service declare readonly router: RouterService;

  @tracked isSkipLinkFocused = false;

  timer: Timer | undefined;
  transition: Transition | undefined;

  constructor(owner: Owner, args: NavigationNarratorSignature['Args']) {
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
    return (
      this.args.navigationText ??
      'The page navigation is complete. You may now navigate the page content as you wish.'
    );
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
    if (
      Object.keys(this.transition?.from?.queryParams || {}).length ||
      Object.keys(this.transition?.to?.queryParams || {}).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  onRouteChange = (transition: Transition) => {
    this.transition = transition; // We need to do this because we can't pass an argument to a getter

    // add a check to see if it's the same route
    const hasSameRoute =
      this.transition.from?.name === this.transition.to?.name;

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
      (
        document.body.querySelector(
          '#ember-a11y-refocus-nav-message',
        ) as HTMLElement
      )?.focus();
    });
  };

  handleSkipLinkFocus = () => {
    this.isSkipLinkFocused = !this.isSkipLinkFocused;
  };

  <template>
    <div
      tabindex="-1"
      id="ember-a11y-refocus-nav-message"
      class="ember-sr-only ember-sr-only-focusable"
    >
      {{this.navigationText}}
    </div>

    {{#if this.skipLink}}
      <a
        href={{this.skipTo}}
        id="ember-a11y-refocus-skip-link"
        class="ember-a11y-refocus-skip-link
          {{if this.isSkipLinkFocused 'active'}}"
        {{on "focus" this.handleSkipLinkFocus}}
        {{on "blur" this.handleSkipLinkFocus}}
      >
        {{this.skipText}}
      </a>
    {{/if}}
  </template>
}
