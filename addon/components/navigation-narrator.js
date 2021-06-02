import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NavigationNarratorComponent extends Component {
  @service router;

  @tracked isSkipLinkFocused = false;

  skipLink = true;

  skipTo = '#main' || this.args.skipTo;

  skipText = 'Skip to main content' || this.args.skipText;

  isFocusable = true;

  constructor() {
    super(...arguments);

    this.router.on('didTransition', () => {
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
