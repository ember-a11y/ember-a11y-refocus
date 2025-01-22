import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import type EmberA11yRefocusRegistry from 'ember-a11y-refocus/template-registry';
import type PageTitle from 'ember-page-title/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  // Remove this once entries have been added! 👇

  export default interface Registry
    extends EmberA11yRefocusRegistry,
      PageTitle {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
  }
}
