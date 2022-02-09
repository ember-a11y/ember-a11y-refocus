import { defaultValidator } from 'ember-a11y-refocus';
import { module, test } from 'qunit';
import { MockTransition, MockRouteInfo } from '../../helpers/mocks';

module('Unit | Utility | defaultValidator', function () {
  test('when all routes, params, and query params are equal', function (assert) {
    let transition = new MockTransition({
      from: new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'hobnob' },
        parent: new MockRouteInfo({
          name: 'biscuits',
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      }),
      to: new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'hobnob' },
        parent: new MockRouteInfo({
          name: 'biscuits',
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      }),
    });

    let result = defaultValidator(transition);

    assert.false(result);
  });

  test('when routes differ', function (assert) {
    let transition = new MockTransition({
      from: new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'hobnob' },
        parent: new MockRouteInfo({
          name: 'biscuits',
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      }),
      to: new MockRouteInfo({
        name: 'index',
        parent: new MockRouteInfo({
          name: 'cakes',
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      }),
    });

    let result = defaultValidator(transition);

    assert.true(result);
  });

  test('when params differ', function (assert) {
    let transition = new MockTransition({
      from: new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'hobnob' },
        parent: new MockRouteInfo({
          name: 'biscuits',
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      }),
      to: new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'digestive' },
        parent: new MockRouteInfo({
          name: 'biscuits',
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      }),
    });

    let result = defaultValidator(transition);

    assert.true(result);
  });

  test('when queryParams differ', function (assert) {
    let transition = new MockTransition({
      from: new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'hobnob' },
        parent: new MockRouteInfo({
          name: 'biscuits',
          queryParams: { region: 'amer' },
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      }),
      to: new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'hobnob' },
        parent: new MockRouteInfo({
          name: 'biscuits',
          queryParams: { region: 'apac' },
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      }),
    });

    let result = defaultValidator(transition);

    assert.true(result);
  });

  test('when routes are different depths', function (assert) {
    let transition = new MockTransition({
      from: new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'hobnob' },
        parent: new MockRouteInfo({
          name: 'biscuits',
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      }),
      to: new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'hobnob' },
        parent: new MockRouteInfo({
          name: 'biscuits',
        }),
      }),
    });

    let result = defaultValidator(transition);

    assert.true(result);
  });
});
