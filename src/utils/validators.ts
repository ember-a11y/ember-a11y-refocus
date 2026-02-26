import { routeInfoEqual } from './routing.ts';

import type RouteInfo from '@ember/routing/route-info';
import type { RouteInfoLike } from './routing.ts';

interface TransitionLike {
  from?: RouteInfoLike | RouteInfo | null | undefined | void;
  to?: RouteInfoLike | RouteInfo | null | undefined | void;
}

export function defaultValidator(transition: TransitionLike): boolean {
  return !routeInfoEqual(transition.from, transition.to);
}
