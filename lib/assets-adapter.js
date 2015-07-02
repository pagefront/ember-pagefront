var CoreObject = require('core-object');
var RSVP = require('rsvp');
var API = require('./api');
var collectFiles = require('./collect-files');
var uploadAsset = require('./upload-asset');

var ROOT = 'tmp/assets-sync/assets';

module.exports = CoreObject.extend({
  init: function() {
    this._super.apply(this, arguments);
    this.api = new API(this.config.assets.key);
  },

  upload: function() {
    var manifest = collectFiles(ROOT);
    var uploadAssets = this.uploadAssets.bind(this);

    return this.createDifference(manifest).then(uploadAssets);
  },

  uploadAssets: function(diff) {
    var uploads = diff.missing.map(function(asset) {
      return uploadAsset(asset);
    });

    return RSVP.all(uploads);
  },

  createDifference: function(manifest) {
    return this.api.createDifference(this.config.assets.app, {
      manifest: manifest
    });
  }
});
