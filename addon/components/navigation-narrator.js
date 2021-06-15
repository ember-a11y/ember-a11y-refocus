import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class NavigationNarratorComponent extends Component {
  @service router;

  @tracked isSkipLinkFocused = false;

  constructor(owner, args) {
    super(owner, args);

    // set the skip link properties
    this.skipLink = true;
    this.skipTo = '#main' || this.args.skipTo;
    this.skipText = 'Skip to main content' || this.args.skipText;

    // set the navigation message properties
    this.navigationText =
      'The page navigation is complete. You may now navigate the page content as you wish.' ||
      this.args.navigationText;
    this.isFocusable = true;

    // focus on the navigation message after render
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
