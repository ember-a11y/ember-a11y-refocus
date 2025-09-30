import Component from '@glimmer/component';
import type RouterService from '@ember/routing/router-service';
import type Owner from '@ember/owner';
import type Transition from '@ember/routing/transition';
import type { Timer } from '@ember/runloop';
export interface NavigationNarratorSignature {
    Args: {
        skipLink?: boolean;
        skipTo?: string;
        skipText?: string;
        navigationText?: string;
        routeChangeValidator?: (transition: Transition) => boolean;
        excludeAllQueryParams?: boolean;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class NavigationNarrator extends Component<NavigationNarratorSignature> {
    readonly router: RouterService;
    isSkipLinkFocused: boolean;
    timer: Timer | undefined;
    transition: Transition | undefined;
    get skipLink(): boolean;
    get skipTo(): string;
    get skipText(): string;
    get navigationText(): string;
    get routeChangeValidator(): (transition: Transition) => boolean;
    get excludeAllQueryParams(): boolean;
    get hasQueryParams(): boolean;
    constructor(owner: Owner, args: NavigationNarratorSignature['Args']);
    onRouteChange: (transition: Transition) => void;
    handleSkipLinkFocus: () => void;
}
//# sourceMappingURL=navigation-narrator.d.ts.map