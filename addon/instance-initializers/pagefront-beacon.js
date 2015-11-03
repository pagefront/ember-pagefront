import Ember from 'ember';

const FUNCTION = 'function';
const ACTION = 'pagefrontDidRelease';

function hasAction(route) {
  return Ember.typeOf(route.actions[ACTION]) === FUNCTION;
}

function isEnabled(container) {
  const route = container.lookup('route:application');

  return route && hasAction(route);
}

export function initialize(applicationInstance) {
  const container = applicationInstance.container;

  if (isEnabled(container)) {
    container.lookup('service:pagefront-beacon');
  }
}

export default {
  name: 'pagefront-beacon',
  initialize: initialize
};
