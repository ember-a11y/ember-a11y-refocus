'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    'ember-cli-babel': { enableTypeScriptTransform: true },

    // Add options here
    autoImport: {
      watchDependencies: ['ember-a11y-refocus'],
    },

    sassOptions: {
      includePaths: ['node_modules/ember-a11y-refocus/dist/styles'],
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app);
};
