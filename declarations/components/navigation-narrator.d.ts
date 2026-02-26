import Component from '@glimmer/component';
import type RouterService from '@ember/routing/router-service';
import type Owner from '@ember/owner';
import type Transition from '@ember/routing/transition';
import type { Timer } from '@ember/runloop';
export interface NavigationNarratorSignature {
    Args: {
        /** Whether to include the skip link. Defaults to `true`. */
        skipLink?: boolean;
        /** CSS selector the skip link jumps to. Defaults to `'#main'`. */
        skipTo?: string;
        /** Text content of the skip link. Defaults to `'Skip to main content'`. */
        skipText?: string;
        /** Text announced by a screen reader after navigation. */
        navigationText?: string;
        /** Custom logic for determining whether a transition should trigger narration. */
        routeChangeValidator?: (transition: Transition) => boolean;
        /** Whether to ignore query param changes during route comparisons. Defaults to `false`. */
        excludeAllQueryParams?: boolean;
    };
    Element: HTMLElement;
}
/**
 * 🎧 NavigationNarrator
 *
 * Announces route changes for screen readers using a visually-hidden element,
 * and optionally renders a "Skip to main content" link.
 *
 * Usage:
 * ```gjs
 * import { NavigationNarrator } from 'ember-a11y-refocus';
 *
 * <template>
 *   <NavigationNarrator />
 * </template>
 * ```
 */
export default class NavigationNarrator extends Component<NavigationNarratorSignature> {
    readonly router: RouterService;
    isSkipLinkFocused: boolean;
    timer: Timer | undefined;
    transition: Transition | undefined;
    constructor(owner: Owner, args: NavigationNarratorSignature['Args']);
    /** Whether to include the skip link. Defaults to `true`. */
    get skipLink(): boolean;
    /** Selector for the skip link target. Defaults to `'#main'`. */
    get skipTo(): string;
    /** Text for the skip link. Defaults to `'Skip to main content'`. */
    get skipText(): string;
    /** Text announced by screen readers after route transition. */
    get navigationText(): string;
    /** Validator function for transitions. */
    get routeChangeValidator(): (transition: Transition) => boolean;
    /** Whether to ignore query param changes. Defaults to `false`. */
    get excludeAllQueryParams(): boolean;
    /** Whether the current transition includes query param changes. */
    get hasQueryParams(): boolean;
    onRouteChange: (transition: Transition) => void;
    handleSkipLinkFocus: () => void;
}
//# sourceMappingURL=navigation-narrator.d.ts.map