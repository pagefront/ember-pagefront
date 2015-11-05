var chalk = require('chalk');
var appendFileSync = require('fs').appendFileSync;

var green = chalk.green;
var white = chalk.white;

var DEPLOY = 'ember deploy';
var NEW_LINE = '\n';
var MESSAGE = NEW_LINE + green('Success! Now deploy your app: ') + white(DEPLOY) + NEW_LINE;
var GITIGNORE = '.gitignore';
var PAGEFRONT_CONFIG = '.pagefrontrc';

module.exports = {
  normalizeEntityName: function() {},

  beforeInstall: function() {
    return this.addAddonToProject({
      name: 'ember-cli-deploy',
      target: '0.5.0'
    });
  },

  afterInstall: function() {
    appendFileSync(GITIGNORE, NEW_LINE + PAGEFRONT_CONFIG);
    this.ui.writeLine(MESSAGE);
  },

  locals: function(options) {
    return {
      app: options.app,
      key: options.key
    };
  }
}
