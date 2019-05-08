import Component from '@ember/component';
import layout from '../templates/components/navigation-narrator';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';

export default Component.extend({
  layout,
  tagName: '',
  router: service(),
  isFocusable: true,

  init() {
    this._super();

    this.router.on('routeDidChange', () => {
      // we need to put this inside of something async so we can make sure it really happens **after everything else**
      schedule('afterRender', this, function() {
        document.body.querySelector('#ember-a11y-refocus-nav-message').focus();
      });
    })
  }
});
