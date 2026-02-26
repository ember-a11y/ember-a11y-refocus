import type RouteInfo from '@ember/routing/route-info';

export interface RouteInfoLike {
  name: string;
  params: Record<string, unknown>;
  queryParams: Record<string, unknown>;
  parent: RouteInfoLike | RouteInfo | null;
}

/**
 * Returns true if the given RouteInfo objects represent the same route in the
 * tree, with matching params and query params.
 */
export function routeInfoEqual(
  a: RouteInfoLike | RouteInfo | null | undefined | void,
  b: RouteInfoLike | RouteInfo | null | undefined | void,
): boolean {
  let current_a: RouteInfoLike | RouteInfo | null | undefined | void = a;
  let current_b: RouteInfoLike | RouteInfo | null | undefined | void = b;

  do {
    if (!current_a || !current_b) {
      return false;
    }

    if (current_a.name !== current_b.name) {
      return false;
    }

    if (
      !shallowEqual(
        current_a.params as Record<string, unknown>,
        current_b.params as Record<string, unknown>,
      )
    ) {
      return false;
    }

    if (
      !shallowEqual(
        current_a.queryParams as Record<string, unknown>,
        current_b.queryParams as Record<string, unknown>,
      )
    ) {
      return false;
    }

    current_a = current_a.parent;
    current_b = current_b.parent;
  } while (current_a || current_b);

  return true;
}

function shallowEqual(
  a: Record<string, unknown>,
  b: Record<string, unknown>,
): boolean {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);

  for (const key of keys) {
    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}
