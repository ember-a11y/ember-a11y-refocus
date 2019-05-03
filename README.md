# ember-a11y-refocus

[![Latest NPM release][npm-badge]][npm-badge-url]

[npm-badge]: https://img.shields.io/npm/v/ember-a11y-refocus.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-a11y-refocus

This addon does two things: 
1. it adds a message to the page to let the screen reader user know that the route has changed and regular page navigation can resume (it is similar to [https://github.com/ember-a11y/a11y-announcer](https://github.com/ember-a11y/a11y-announcer) but does not use `aria-live`).
2. It moves the focus to that message for the screen reader user- effectively resetting focus in Ember apps (which is the current, undesirable state for screen-reader users). 

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above

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
