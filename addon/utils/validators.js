import { routeInfoEqual } from './routing';

export function defaultValidator(transition) {
  return !routeInfoEqual(transition.from, transition.to);
}
