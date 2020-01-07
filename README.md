# ember-a11y-refocus

[![Latest NPM release][npm-badge]][npm-badge-url]

[npm-badge]: https://img.shields.io/npm/v/ember-a11y-refocus.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-a11y-refocus

## What This Addon Does

This addon does two things: 
1. it adds a message to the page to let the screen reader user know that the route has changed and regular page navigation can resume (it is similar to [https://github.com/ember-a11y/a11y-announcer](https://github.com/ember-a11y/a11y-announcer) but does not use `aria-live`).
2. It moves the focus to that message for the screen reader user, effectively resetting focus in Ember apps (similar to how a native web page/site works).

## FAQs 

### What about async data loading?

Async data can be loaded as it normally would be. Since this addon does not use `aria-live`, it won't interfere with or compete with other loading states. This will only give the user with a screen reader a message that the route (URL) has changed, and place the focus where they expect it to be (reset to the top left of the page). 

### What if I want to put focus somewhere specific in the app flow?

Since this will run before other content, focus can be programmatically moved by the developer to go somewhere else. The message should still read out, and is findable by users with screen readers.



Compatibility
------------------------------------------------------------------------------

* Ember.js v3.8 or above
* Ember CLI v2.13 or above
* Node.js v8 or above

Installation
------------------------------------------------------------------------------

```bash
ember install ember-a11y-refocus
```

Usage
------------------------------------------------------------------------------

Insert `{{navigation-narrator}}` into your application.hbs file, preferably inside of a `<header>` element.

Contributing
------------------------------------------------------------------------------

Contributions are welcome.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
