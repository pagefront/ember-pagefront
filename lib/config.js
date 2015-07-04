var CoreObject = require('core-object');
var readFileSync = require('fs').readFileSync;
var findFile = require('./find-file');

module.exports = CoreObject.extend({
  init: function(filename) {
    var raw = readFileSync(findFile(filename));

    this.parsed = JSON.parse(raw) || {};
  },

  get: function(key) {
    return this.parsed[key];
  }
});
