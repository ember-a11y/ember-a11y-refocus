# ember-a11y-refocus

[![Latest NPM release](https://img.shields.io/npm/v/ember-a11y-refocus.svg)](https://www.npmjs.com/package/ember-a11y-refocus)
[![Ember Observer Score](https://emberobserver.com/badges/ember-a11y-refocus.svg)](http://emberobserver.com/addons/ember-a11y-refocus)
[![Publish Stable](https://github.com/ember-a11y/ember-a11y-refocus/actions/workflows/publish.yml/badge.svg)](https://github.com/ember-a11y/ember-a11y-refocus/actions/workflows/publish.yml)

## What This Addon Does

This addon does three things:

1. it adds a message to the page to let the screen reader user know that the route has changed and regular page navigation can resume (it is similar to [https://github.com/ember-a11y/a11y-announcer](https://github.com/ember-a11y/a11y-announcer) but does not use `aria-live`).
2. It moves the focus to that message for the screen reader user, effectively resetting focus in Ember apps (similar to how a native web page/site works).
3. It provides a bypass mechanism so the user can skip to the page's primary content (see <https://www.w3.org/TR/WCAG20-TECHS/G1.html>). You can opt out of this if you want (see the `Options` section for available options).

## Why This Addon is Needed

Single-Page Applications(SPAs) use `pushState` to allow portions of the page to be updated or replaced without a whole new page being rendered. While this was a positive gain for performance on the web, it has made an entire type of web app not accessible (usable) for folks who depend on assistive technology(such as screen-readers) to use the web. With the prolific rise of JavaScript frameworks as the tool of choice for building modern web applications, screen-reader users have become increasingly left out of many experiences of the modern web that have become necessary for everyday life, such as online banking, paying bills, and ordering products and services.

Since `pushState` does nothing to inform the browser--and, by extent, the screen reader--that new content is present, the screen-reader user has no way of knowing that new content exists, or that navigation to a new page was successful. Additionally, focus remains where it was, instead of being reset in a predictable fashion.

## Installation

```bash
pnpm add ember-a11y-refocus
```

Or with npm:

```bash
npm install ember-a11y-refocus
```

## Usage

- Insert `<NavigationNarrator/>` into your application.hbs file, inside of the `<header>` element.
- Next, add `id="main"` to the primary content element in your application (should be the `<main>` element).

Example:

```html
<header>
  <NavigationNarrator/>
  <!-- other header content-->
</header>
<main id="main">
 <!--main content-->
</main>
```

Gjs/Gts:

- Import the `NavigationNarrator` 
- Insert `<NavigationNarrator/>` component into your template file, inside of the `<header>` element.
- Next, add `id="main"` to the primary content element in your application (should be the `<main>` element).

Example:

```gjs
import { NavigationNarrator } from 'ember-a11y-refocus';

<template>
  <header>
    <NavigationNarrator/>
    <!-- other header content-->
  </header>
  <main id="main">
   <!--main content-->
  </main>
</template>
```

Template Registry is available for loose mode users:

```ts
import type EmberA11yRefocusRegistry from 'ember-a11y-refocus/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmberA11yRefocusRegistry {}
}
```

Minimal CSS is provided to style the skip link and navigation message.

```diff
/* app/app.ts */
+ import 'ember-a11y-refocus/styles/navigation-narrator.css';
+
import Application from '@ember/application';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';

import config from './config/environment';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
```

<details>

<summary>Use Sass?</summary>

If your build tool resolves node module paths (e.g. Vite), the full specifier works directly:

```scss
/* app/styles/app.scss */
@use "ember-a11y-refocus/styles/navigation-narrator.css";
```

For classic Ember apps using `ember-cli-sass`, add the path to `includePaths`:

```js
// ember-cli-build.js
const app = new EmberApp(defaults, {
  sassOptions: {
    includePaths: ['node_modules/ember-a11y-refocus/dist/styles'],
  },
});
```

Then import with the short path:

```scss
/* app/styles/app.scss */
@use "navigation-narrator.css";
```

</details>

### Customizing the definition of a route change

This addon provides support for custom definitions of which route changes should trigger refocusing behavior.
To use this functionality, pass `routeChangeValidator` when you invoke the component, and add your custom action in the appropriate controller (likely the application controller).

So when you add the component to your application.hbs file:

```hbs
<NavigationNarrator @routeChangeValidator={{this.myCustomValidator}} />
```

This is what the controller could look like:

```js
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  myCustomValidator(transition) {
    // Custom logic goes here...
  }
}
```

The validator function:

- Receives a [Transition](https://api.emberjs.com/ember/release/classes/Transition) object containing information about the source and destination routes
- Should return `true` if refocusing should occur, otherwise `false`

If you wish to extend the default behavior (rather than completely replacing it), you can import the default validator like so:

```js
 import Controller from '@ember/controller';
 import { defaultValidator } from 'ember-a11y-refocus';

 export default class ApplicationController extends Controller {
   myCustomValidator(transition) {
     if (transition.from.name === 'special') {
        return false;
     } else {
        return defaultValidator(transition);
     }
   }
 }
 ```

## Additional Options

All of these are optional and have default values.

- `skipLink` - pass `{{false}}` if you do not want to implement a bypass block/skip link.
- `skipTo` - pass a specific element ID that should receive focus on skip. Defaults to `#main`.
- `skipText` - customize the text passed in the skip link. Defaults to `Skip to main content`.
- `navigationText` - customize the text passed as the navigation message. Defaults to `The page navigation is complete. You may now navigate the page content as you wish`.
- `excludeAllQueryParams` - pass `{{true}}` if you want to exclude all query params from the route change check/focus management. Really shouldn't do this, but you might be upgrading an older app and need this for a little bit, or you are using QPs in a specific way and would like to otherwise benefit from the accessibility options in this addon. If you only need to exclude _some_ QPs, use the [custom validator function](https://github.com/ember-a11y/ember-a11y-refocus?tab=readme-ov-file#customizing-the-definition-of-a-route-change) instead.

## FastBoot

With FastBoot, you'll want to guard the `<NavigationNarrator />` from rendering. Like so:

```hbs
{{#unless this.fastboot.isFastBoot}}
  <NavigationNarrator />
{{/unless}}
```

Where `this.fastboot` is the fastboot service injected in the application controller.

## FAQs

### What about async data loading?

Async data can be loaded as it normally would be. Since this addon does not use `aria-live`, it won't interfere with or compete with other loading states. This will only give the user with a screen reader a message that the route (URL) has changed, and place the focus where they expect it to be (reset to the top left of the page).

### What if I want to put focus somewhere specific in the app flow?

Since this will run before other content, focus can be programmatically moved by the developer to go somewhere else. The message should still read out, and is findable by users with screen readers.

## Compatibility

- Ember.js v4.12 or above
- Node.js v22 or above

## Contributing

Contributions are welcome.

## License

This project is licensed under the [MIT License](LICENSE.md).
