import { pageTitle } from 'ember-page-title';
import { LinkTo } from '@ember/routing';

import type { TOC } from '@ember/component/template-only';

interface BravoRouteSignature {
  Args: {
    model: unknown;
    controller: unknown;
  };
}

<template>
  {{pageTitle "Bravo"}}

  <h1>Bravo Page</h1>

  <p>This route (named "bravo") has a single child route-
    <LinkTo @route="bravo.november">November</LinkTo>.</p>
  {{outlet}}
</template> satisfies TOC<BravoRouteSignature>;
