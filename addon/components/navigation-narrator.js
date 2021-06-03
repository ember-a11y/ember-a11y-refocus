import Component from '@ember/component';
import layout from '../templates/components/navigation-narrator';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class NavigationNarrator extends Component {
  layout = layout;
  tagName = '';

  @service router;

  @tracked isSkipLinkFocused = false;

  skipLink = true;

  skipTo = '#main' || this.args.skipTo;

  skipText = 'Skip to main content' || this.args.skipText;

  isFocusable = true;

  constructor() {
    super(...arguments);

    this.router.on('routeDidChange', () => {
      // we need to put this inside of something async so we can make sure it really happens **after everything else**
      schedule('afterRender', this, function() {
        document.body.querySelector('#ember-a11y-refocus-nav-message').focus();
      });
    })
  }

  @action
  handleSkipLinkFocus() {
    this.isSkipLinkFocused = !this.isSkipLinkFocused;
  }
}
