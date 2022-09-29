import Component from '@glimmer/component';
import { action } from '@ember/object';
import { registerDestructor } from '@ember/destroyable';
import { inject as service } from '@ember/service';
import { schedule, cancel } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';
import { defaultValidator } from 'ember-a11y-refocus';

export default class NavigationNarratorComponent extends Component {
  @service router;

  @tracked isSkipLinkFocused = false;

  timer = null;

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
    return this.args.routeChangeValidator ?? defaultValidator;
  }

  constructor() {
    super(...arguments);

    // focus on the navigation message after render
    this.router.on('routeDidChange', this.onRouteChange);

    registerDestructor(this, () => {
      cancel(this.timer);
      this.timer = null;
      this.router.off('routeDidChange', this.onRouteChange);
    });
  }

  @action
  onRouteChange(transition) {
    let shouldFocus = this.routeChangeValidator(transition);

    if (!shouldFocus) {
      return;
    }

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
