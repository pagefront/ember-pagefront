var chalk = require('chalk');
var appendFileSync = require('fs').appendFileSync;

var green = chalk.green;
var white = chalk.white;

var DEPLOY = 'ember deploy';
var NEW_LINE = '\n';
var MESSAGE = NEW_LINE + green('Success! Now deploy your app: ') + white(DEPLOY) + NEW_LINE;
var GITIGNORE = '.gitignore';
var DOT_ENV_FILE = '.env.deploy.production';

module.exports = {
  normalizeEntityName: function() {},

  beforeInstall: function() {
    return this.addPackageToProject('ember-cli-deploy', '0.5.0');
  },

  afterInstall: function() {
    appendFileSync(GITIGNORE, NEW_LINE + DOT_ENV_FILE);
    this.ui.writeLine(MESSAGE);
  },

  locals: function(options) {
    return {
      app: options.app,
      key: options.key
    };
  }
}
