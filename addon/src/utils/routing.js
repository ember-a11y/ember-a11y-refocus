/**
 * Returns true if the given RouteInfo objects represent the same route in the
 * tree, with matching params and query params.
 *
 * @param {RouteInfo} a
 * @param {RouteInfo} b
 * @returns {boolean}
 */
export function routeInfoEqual(a, b) {
  do {
    if (!a || !b) {
      return false;
    }

    if (a.name !== b.name) {
      return false;
    }

    if (!shallowEqual(a.params, b.params)) {
      return false;
    }

    if (!shallowEqual(a.queryParams, b.queryParams)) {
      return false;
    }

    a = a.parent;
    b = b.parent;
  } while (a || b);

  return true;
}

function shallowEqual(a, b) {
  let keys = new Set([...Object.keys(a), ...Object.keys(b)]);

  for (let key of keys) {
    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}
