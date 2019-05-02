import Component from '@ember/component';
import layout from '../templates/components/navigation-narrator';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  tagName: '',
  router: service(),

  init() {
    this._super();

    this.set('fullUrl', window.location.href);

    this.router.on('routeDidChange', () => {
      this.set('fullUrl', window.location.href);
      // here
      document.body.querySelector('#ember-a11y-refocus-nav-message').focus();
    })
  },
  
  // observer didn't work
  
  // currentURLUpdated: observer('router.currentURL', function() {
  //   let navUrl = this.router.currentURL;

  //   console.log('updating!?');

  //   if(this.fullUrl !== navUrl) {
  //     this.set('fullUrl', navUrl);
  //   }
  // }),
  
  currentURL: computed('router.currentURL', function() {
    // console.log(this.router.currentURL, window.location.href);
    let navUrl = this.router.currentURL; // ignore
    // turns out, router.currentURL doesn't update unless it's read directly
    // but this means I have an used var now...
    return window.location.href;
  })
});
