import { routeInfoEqual } from 'ember-a11y-refocus/utils/route-utils';
import { module, test } from 'qunit';
import { MockRouteInfo } from '../../helpers/mocks';

module('Unit | Utility | route-utils', function () {
  module('routeInfoEqual', function () {
    test('when all routes, params, and query params are equal', function (assert) {
      let a = new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'hobnob' },
        parent: new MockRouteInfo({
          name: 'biscuits',
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      });
      let b = new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'hobnob' },
        parent: new MockRouteInfo({
          name: 'biscuits',
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      });

      let result = routeInfoEqual(a, b);

      assert.true(result);
    });

    test('when routes differ', function (assert) {
      let a = new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'hobnob' },
        parent: new MockRouteInfo({
          name: 'biscuits',
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      });
      let b = new MockRouteInfo({
        name: 'index',
        parent: new MockRouteInfo({
          name: 'cakes',
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      });

      let result = routeInfoEqual(a, b);

      assert.false(result);
    });

    test('when params differ', function (assert) {
      let a = new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'hobnob' },
        parent: new MockRouteInfo({
          name: 'biscuits',
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      });
      let b = new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'digestive' },
        parent: new MockRouteInfo({
          name: 'biscuits',
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      });

      let result = routeInfoEqual(a, b);

      assert.false(result);
    });

    test('when queryParams differ', function (assert) {
      let a = new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'hobnob' },
        parent: new MockRouteInfo({
          name: 'biscuits',
          queryParams: { region: 'amer' },
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      });
      let b = new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'hobnob' },
        parent: new MockRouteInfo({
          name: 'biscuits',
          queryParams: { region: 'apac' },
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      });

      let result = routeInfoEqual(a, b);

      assert.false(result);
    });

    test('when routes are different depths', function (assert) {
      let a = new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'hobnob' },
        parent: new MockRouteInfo({
          name: 'biscuits',
          parent: new MockRouteInfo({
            name: 'application',
          }),
        }),
      });
      let b = new MockRouteInfo({
        name: 'biscuit',
        params: { id: 'hobnob' },
        parent: new MockRouteInfo({
          name: 'biscuits',
        }),
      });

      let result = routeInfoEqual(a, b);

      assert.false(result);
    });
  });
});
