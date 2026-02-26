/**
 * Returns true if the given RouteInfo objects represent the same route in the
 * tree, with matching params and query params.
 */
function routeInfoEqual(a, b) {
  let current_a = a;
  let current_b = b;
  do {
    if (!current_a || !current_b) {
      return false;
    }
    if (current_a.name !== current_b.name) {
      return false;
    }
    if (!shallowEqual(current_a.params, current_b.params)) {
      return false;
    }
    if (!shallowEqual(current_a.queryParams, current_b.queryParams)) {
      return false;
    }
    current_a = current_a.parent;
    current_b = current_b.parent;
  } while (current_a || current_b);
  return true;
}
function shallowEqual(a, b) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const key of keys) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

export { routeInfoEqual };
//# sourceMappingURL=routing.js.map
