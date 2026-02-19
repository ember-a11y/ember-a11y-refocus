import type { TOC } from '@ember/component/template-only';

interface NovemberRouteSignature {
  Args: {
    model: unknown;
    controller: unknown;
  };
}

<template>
  <p>This is the November route.</p>

  <button type="button">Focus me!</button>
</template> satisfies TOC<NovemberRouteSignature>;
