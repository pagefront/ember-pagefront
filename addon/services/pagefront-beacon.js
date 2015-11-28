import Ember from 'ember';

const HASH_NAME = 'pagefront-hash';
const ENVIRONMENT_NAME = 'pagefront-environment';
const APP_NAME = 'pagefront-app';
const INTERVAL = 20000;
const HOST = 'https://beacon.pagefronthq.com';
const PATH = 'snapshots';
const ACTION = 'pagefrontDidRelease';

function fetchMeta(name) {
  return Ember.$(`meta[name='${name}']`).attr('content');
};

export default Ember.Service.extend({
  app: fetchMeta(APP_NAME),
  environment: fetchMeta(ENVIRONMENT_NAME),
  currentHash: fetchMeta(HASH_NAME),
  target: null,

  start: Ember.on('init', function() {
    if (this.app && this.currentHash) {
      Ember.run.later(this, this.check, INTERVAL);
    }
  }),

  check() {
    const base = [HOST, PATH, this.app].join('/');
    const environment = this.environment;
    const url = environment ? `${base}?environment=${environment}` : base;

    Ember.$.getJSON(url, Ember.run.bind(this, this.handle));
  },

  handle(snapshot) {
    if (snapshot.hash !== this.currentHash) {
      this.target.send(ACTION, snapshot);
    } else {
      Ember.run.later(this, this.check, INTERVAL);
    }
  }
});
