var Promise = require('ember-cli/lib/ext/promise');
var API = require('ember-cli-deploy-pagefront/lib/api');
var prompt = require('prompt');
var fs = require('fs');
var chalk = require('chalk');

var CLIENT = 'CLI';
var GITIGNORE = '.gitignore';
var DOT_ENV_FILE = '.env.deploy.*';
var ENVIRONMENTS = ['production', 'staging', 'development'];
var NEW_LINE = '\n';
var SUCCESS_MESSAGE = chalk.green('Success! You are now logged in.');
var FAILURE_MESSAGE = chalk.red('Whoops! Something went wrong. Try again?');
var SCHEMA = {
  properties: {
    email: {
      required: true
    },
    password: {
      hidden: true,
      required: true
    }
  }
};

prompt.message = null;
prompt.delimiter = '';

function contentsFor(key) {
  return 'PAGEFRONT_KEY=' + key + NEW_LINE;
}

function isIgnored(pattern) {
  var gitignore = fs.readFileSync(GITIGNORE);

  return gitignore.toString().indexOf(pattern) > -1;
}

function collectCredentials() {
  return new Promise(function(resolve, reject) {
    prompt.start();

    prompt.get(SCHEMA, function (error, credentials) {
      if (error) {
        reject(error);
      } else {
        resolve(credentials)
      }
    });
  });
}

function fetchKey(credentials) {
  var api = new API();

  credentials.client = CLIENT;

  return api.exchangeCredentials(credentials);
}

function writeFiles(payload) {
  var contents = contentsFor(payload.id);

  if (!isIgnored(DOT_ENV_FILE)) {
    fs.appendFileSync(GITIGNORE, NEW_LINE + DOT_ENV_FILE + NEW_LINE);
  }

  ENVIRONMENTS.forEach(function(environment) {
    fs.writeFileSync('.env.deploy.' + environment, contents);
  });
}

module.exports = {
  name: 'login',
  description: 'Log in to Pagefront',
  works: 'insideProject',

  run: function() {
    return collectCredentials()
      .then(fetchKey)
      .then(writeFiles)
      .then(this.didSucceed.bind(this))
      .catch(this.didFail.bind(this));
  },

  didSucceed: function() {
    this.ui.writeLine(SUCCESS_MESSAGE);
  },

  didFail: function() {
    this.ui.writeLine(FAILURE_MESSAGE);
  }
};
