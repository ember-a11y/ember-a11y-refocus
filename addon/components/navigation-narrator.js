import Component from '@ember/component';
import layout from '../templates/components/navigation-narrator';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';

export default class NavigationNarrator extends Component {
  layout = layout;
  tagName = '';

  @service router;

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
}
