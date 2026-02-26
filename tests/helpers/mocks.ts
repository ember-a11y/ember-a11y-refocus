export class MockTransition {
  from = new MockRouteInfo({ name: 'alpha' });
  to = new MockRouteInfo({ name: 'bravo' });

  constructor(props = {}) {
    Object.assign(this, props);
  }
}

export class MockRouteInfo {
  name = '[anonymous]';
  parent = null;
  params = {};
  queryParams = {};

  constructor(props = {}) {
    Object.assign(this, props);
  }
}
