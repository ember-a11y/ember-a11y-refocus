# ember-a11y-refocus

[![Latest NPM release](https://img.shields.io/npm/v/ember-a11y-refocus.svg)](https://www.npmjs.com/package/ember-a11y-refocus)
[![Ember Observer Score](https://emberobserver.com/badges/ember-a11y-refocus.svg)](http://emberobserver.com/addons/ember-a11y-refocus)
[![Build status](https://github.com/ember-a11y/ember-a11y-refocus/actions/workflows/main.yml/badge.svg)](https://github.com/ember-a11y/ember-a11y-refocus/actions)


## What This Addon Does

This addon does three things:
1. it adds a message to the page to let the screen reader user know that the route has changed and regular page navigation can resume (it is similar to [https://github.com/ember-a11y/a11y-announcer](https://github.com/ember-a11y/a11y-announcer) but does not use `aria-live`).
2. It moves the focus to that message for the screen reader user, effectively resetting focus in Ember apps (similar to how a native web page/site works).
3. It provides a bypass mechanism so the user can skip to the page's primary content (see https://www.w3.org/TR/WCAG20-TECHS/G1.html). You can opt out of this if you want (see the `Options` section for available options).

## Why This Addon is Needed

Single-Page Applications(SPAs) use `pushState` to allow portions of the page to be updated or replaced without a whole new page being rendered. While this was a positive gain for performance on the web, it has made an entire type of web app not accessible (usable) for folks who depend on assistive technology(such as screen-readers) to use the web. With the prolific rise of JavaScript frameworks as the tool of choice for building modern web applications, screen-reader users have become increasingly left out of many experiences of the modern web that have become necessary for everyday life, such as online banking, paying bills, and ordering products and services.

Since `pushState` does nothing to inform the browser--and, by extent, the screen reader--that new content is present, the screen-reader user has no way of knowing that new content exists, or that navigation to a new page was successful. Additionally, focus remains where it was, instead of being reset in a predictable fashion.

## FAQs

### What about async data loading?

Async data can be loaded as it normally would be. Since this addon does not use `aria-live`, it won't interfere with or compete with other loading states. This will only give the user with a screen reader a message that the route (URL) has changed, and place the focus where they expect it to be (reset to the top left of the page).

### What if I want to put focus somewhere specific in the app flow?

Since this will run before other content, focus can be programmatically moved by the developer to go somewhere else. The message should still read out, and is findable by users with screen readers.



Compatibility
------------------------------------------------------------------------------

* Ember.js v3.26 or above
* Ember CLI v3.26 or above
* Node.js v12 or above

Installation
------------------------------------------------------------------------------

```bash
ember install ember-a11y-refocus
```

Usage
------------------------------------------------------------------------------

Insert `<NavigationNarrator/>` into your application.hbs file, preferably inside of a `<header>` element.

Options
------------------------------------------------------------------------------

* `skipLink` - pass `{{false}}` if you do not want to implement a skip link.
* `skipTo` - pass a specific element ID that should receive focus on skip.
* `skipText` - customize the text passed in the skip link. Defaults to "Skip to main content".
* `navigationText` - customize the text passed as the navigation message. Defaults to "The page navigation is complete. You may now navigate the page content as you wish."

Contributing
------------------------------------------------------------------------------

Contributions are welcome.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
