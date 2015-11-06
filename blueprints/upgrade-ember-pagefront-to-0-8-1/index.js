var fs = require('fs');
var chalk = require('chalk');

var green = chalk.green;

var PAGEFRONT_CONFIG = '.pagefrontrc';
var GITIGNORE = '.gitignore';
var NEW_LINE = '\n';
var DOT_ENV_FILE = '.env.deploy.*';
var MESSAGE = NEW_LINE + green('Success!') + NEW_LINE;

module.exports = {
  description: 'upgrades configuration to match what ember-pagefront@0.8.0 expects',

  beforeInstall: function() {
    return this.addPackageToProject('ember-cli-deploy', '0.5.0');
  },

  locals: function() {
    var key = '';

    try {
      var rawPagefrontrc = fs.readFileSync(PAGEFRONT_CONFIG);
      key = JSON.parse(rawPagefrontrc).key;
    } catch (e) {}

    return { key: key };
  },

  afterInstall: function() {
    try { fs.unlinkSync(PAGEFRONT_CONFIG); } catch (e) {}
    fs.appendFileSync(GITIGNORE, NEW_LINE + DOT_ENV_FILE);
    this.ui.writeLine(MESSAGE);
  }
};
