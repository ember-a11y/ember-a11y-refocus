import { routeInfoEqual } from './routing.js';

function defaultValidator(transition) {
  return !routeInfoEqual(transition.from, transition.to);
}

export { defaultValidator };
//# sourceMappingURL=validators.js.map
