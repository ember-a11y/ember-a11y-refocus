ember-a11y-refocus

[![Latest NPM release][npm-badge]][npm-badge-url]

[npm-badge]: https://img.shields.io/npm/v/ember-a11y-refocus.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-a11y-refocus
==============================================================================

This adds a message to the page to let the screen reader user know that the route has changed and regular page navigation can resume.
It is similar to [https://github.com/ember-a11y/a11y-announcer](https://github.com/ember-a11y/a11y-announcer) but does not use aria-live.

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
