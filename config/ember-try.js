'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = async function () {
  return {
    useYarn: false,
    usePnpm: true,
    scenarios: [
      {
        name: 'ember-lts-3.28',
        npm: {
          devDependencies: {
            'ember-source': '3.28.12',
          },
        },
      },
      {
        name: 'ember-lts-4.8',
        npm: {
          devDependencies: {
            'ember-source': '4.8.6',
          },
        },
      },
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            'ember-source': '4.12.4',
          },
        },
      },
      {
        name: 'ember-release',
        allowedToFail: true,
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
    ],
  };
};
