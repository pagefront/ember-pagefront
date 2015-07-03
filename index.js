/* jshint node: true */
'use strict';

var IndexAdapter = require('./lib/index-adapter');
var AssetsAdapter = require('./lib/assets-adapter');

module.exports = {
  name: 'ember-pagefront',
  type: 'ember-deploy-addon',
  adapters: {
    index: {
      'pagefront-index': IndexAdapter
    },
    assets: {
      'pagefront-assets': AssetsAdapter
    }
  }
};
