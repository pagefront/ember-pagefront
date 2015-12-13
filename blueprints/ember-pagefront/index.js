var Promise = require('ember-cli/lib/ext/promise');
var chalk = require('chalk');
var appendFileSync = require('fs').appendFileSync;

var API = require('ember-cli-deploy-pagefront/lib/api');

var green = chalk.green;
var white = chalk.white;

var DEPLOY = 'ember deploy production';
var NEW_LINE = '\n';
var SUCCESS = NEW_LINE + green('Success! Now deploy your app: ') + white(DEPLOY) + NEW_LINE;
var COMMAND= '`ember g ember-pagefront --app=YOUR_APP_NAME`';
var MISSING_APP = 'No app was specified. Please run ' + COMMAND + ' to finish setting up.';
var APP_TAKEN = 'Darn. That app name has already been taken. Try again with a new name: ' + COMMAND;
var BOOTSTRAP_FAILED = 'Whoops. Something went wrong. Try again: ' + COMMAND;
var GITIGNORE = '.gitignore';
var DOT_ENV_FILE = '.env.deploy.*';
var ECD = 'ember-cli-deploy';
var ECD_VERSION = '0.5.1';
var UNPROCESSABLE = 422;

function bootstrap(app) {
  var api = new API();

  return api.bootstrapApp({ app: app });
}

module.exports = {
  availableOptions: [
    {
      name: 'app',
      type: String
    },
    {
      name: 'key',
      type: String
    }
  ],

  normalizeEntityName: function() {},

  locals: function(options) {
    return {
      app: options.app,
      key: options.key
    };
  },

  beforeInstall: function(options, locals) {
    if (!options.app) {
      return Promise.reject(MISSING_APP);
    }

    if (!options.key) {
      return bootstrap(options.app).then(function(response) {
        locals.key = response.key;
      }, function(response) {
        if (response.statusCode === UNPROCESSABLE) {
          throw APP_TAKEN;
        } else {
          throw BOOTSTRAP_FAILED
        }
      });
    }
  },

  afterInstall: function() {
    var success = this.didSucceed.bind(this);

    appendFileSync(GITIGNORE, NEW_LINE + DOT_ENV_FILE + NEW_LINE);

    return this.addPackageToProject(ECD, ECD_VERSION).then(success);
  },

  didSucceed: function() {
    this.ui.writeLine(SUCCESS);
  }
}
