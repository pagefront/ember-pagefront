/* jshint node: true */
'use strict';

var AssetsAdapter = require('./lib/assets-adapter');

module.exports = {
  name: 'ember-pagefront',
  type: 'ember-deploy-addon',
  adapters: {
    assets: {
      'pagefront-assets': AssetsAdapter
    }
  }
};
