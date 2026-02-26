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
export declare function routeInfoEqual(a: RouteInfoLike | RouteInfo | null | undefined | void, b: RouteInfoLike | RouteInfo | null | undefined | void): boolean;
//# sourceMappingURL=routing.d.ts.map