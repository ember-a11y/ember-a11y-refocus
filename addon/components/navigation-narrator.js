import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class NavigationNarratorComponent extends Component {
  @service router;

  @tracked isSkipLinkFocused = false;

  skipLink = true;

  skipTo = '#main' || this.args.skipTo;

  skipText = 'Skip to main content' || this.args.skipText;

  navigationText =
    'The page navigation is complete. You may now navigate the page content as you wish.' ||
    this.args.navigationText;

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
