export function initialize(container, application) {
  application.inject('service:pagefront-beacon', 'target', 'route:application');
}

export default {
  name: 'pagefront-beacon',
  initialize: initialize
};
