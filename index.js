/* jshint node: true */
'use strict';

var commands = require('./lib/commands');

module.exports = {
  name: 'ember-pagefront',

  includedCommands: function() {
    return commands;
  }
};
