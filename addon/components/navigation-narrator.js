import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import { routeInfoEqual } from '../utils/route-utils';

const DEFAULT_ROUTE_CHANGE_VALIDATOR = (transition) => {
  return !routeInfoEqual(transition.from, transition.to);
};

export default class NavigationNarratorComponent extends Component {
  @service router;

  @tracked isSkipLinkFocused = false;

  get skipLink() {
    return this.args.skipLink ?? true;
  }

  get skipTo() {
    return this.args.skipTo ?? '#main';
  }

  get skipText() {
    return this.args.skipText ?? 'Skip to main content';
  }

  get navigationText() {
    return (
      this.args.navigationText ??
      'The page navigation is complete. You may now navigate the page content as you wish.'
    );
  }

  get routeChangeValidator() {
    return this.args.routeChangeValidator ?? DEFAULT_ROUTE_CHANGE_VALIDATOR;
  }

  constructor() {
    super(...arguments);

    // focus on the navigation message after render
    this.router.on('routeDidChange', (transition) => {
      let shouldFocus = this.routeChangeValidator(transition);

      if (!shouldFocus) {
        return;
      }

      schedule('afterRender', this, function () {
        document.body.querySelector('#ember-a11y-refocus-nav-message').focus();
      });
    });
  }

  @action
  handleSkipLinkFocus() {
    this.isSkipLinkFocused = !this.isSkipLinkFocused;
  }
}
