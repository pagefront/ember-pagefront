export function initialize() {
  let application = arguments[1] || arguments[0];
  application.inject('service:pagefront-beacon', 'target', 'route:application');
}

export default {
  name: 'pagefront-beacon',
  initialize: initialize
};
