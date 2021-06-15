import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

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

  constructor() {
    super(...arguments);

    // set the skip link properties
    this.isFocusable = true;

    // focus on the navigation message after render
    this.router.on('didTransition', () => {
      schedule('afterRender', this, function () {
        console.log(`navigation message is ${this.navigationText}.`);
        document.body.querySelector('#ember-a11y-refocus-nav-message').focus();
      });
    });
  }

  @action
  handleSkipLinkFocus() {
    this.isSkipLinkFocused = !this.isSkipLinkFocused;
  }
}
