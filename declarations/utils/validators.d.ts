import type RouteInfo from '@ember/routing/route-info';
import type { RouteInfoLike } from './routing.ts';
interface TransitionLike {
    from?: RouteInfoLike | RouteInfo | null | undefined | void;
    to?: RouteInfoLike | RouteInfo | null | undefined | void;
}
export declare function defaultValidator(transition: TransitionLike): boolean;
export {};
//# sourceMappingURL=validators.d.ts.map