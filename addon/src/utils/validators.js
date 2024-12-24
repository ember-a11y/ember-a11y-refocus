import { routeInfoEqual } from './routing.js';

export function defaultValidator(transition) {
  return !routeInfoEqual(transition.from, transition.to);
}
