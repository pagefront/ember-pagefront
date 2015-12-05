import Ember from 'ember';

const FUNCTION = 'function';
const ACTION = 'pagefrontDidRelease';

function hasAction(route) {
  const actions = route.actions || route._actions;

  return actions && Ember.typeOf(actions[ACTION]) === FUNCTION;
}

function isEnabled(applicationInstance) {
  const route = applicationInstance.lookup('route:application');

  return route && hasAction(route);
}

export function initialize(applicationInstance) {
  if (isEnabled(applicationInstance)) {
    applicationInstance.lookup('service:pagefront-beacon');
  }
}

export default {
  name: 'pagefront-beacon',
  initialize: initialize
};
