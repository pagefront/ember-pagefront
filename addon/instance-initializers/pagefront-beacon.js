import Ember from 'ember';

const FUNCTION = 'function';
const ACTION = 'pagefrontDidRelease';

function isFunction(object) {
  Ember.typeOf(object) === FUNCTION;
}

function lookup(applicationInstance, name) {
  if (isFunction(applicationInstance.lookup)) {
    return applicationInstance.lookup(name);
  } else {
    return applicationInstance.container.lookup(name);
  }
}

function hasAction(route) {
  const actions = route.actions || route._actions;

  return actions && isFunction(actions[ACTION]);
}

function isEnabled(applicationInstance) {
  const route = lookup(applicationInstance, 'route:application');

  return route && hasAction(route);
}

export function initialize(applicationInstance) {
  if (isEnabled(applicationInstance)) {
    lookup(applicationInstance, 'service:pagefront-beacon');
  }
}

export default {
  name: 'pagefront-beacon',
  initialize: initialize
};
