import { pageTitle } from 'ember-page-title';

import type { TOC } from '@ember/component/template-only';

interface AlphaRouteSignature {
  Args: {
    model: unknown;
    controller: unknown;
  };
}

<template>
  {{pageTitle "Alpha"}}

  <h1>Alpha Page</h1>

  <p>This is the route named "alpha" in an
    <a href="https://emberjs.com">Ember JS</a>
    application.</p>
</template> satisfies TOC<AlphaRouteSignature>;
