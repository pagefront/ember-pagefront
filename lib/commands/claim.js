var fs = require('fs');
var open = require('open');
var chalk = require('chalk');

var DOT_ENV_FILE = '.env.deploy.production';
var KEY_REGEX = /PAGEFRONT_KEY=(.+)/;
var FAILURE_MESSAGE = chalk.red('Whoops! Unable to find Pagefront API key.');
var URL = 'https://dashboard.pagefronthq.com/claim';

function fetchKey() {
  var key;

  try {
    var dotEnv = fs.readFileSync(DOT_ENV_FILE);
    var matches = KEY_REGEX.exec(dotEnv)

    key = matches[1];
  } catch (e) {}

  return key;
}

module.exports = {
  name: 'claim',
  description: 'Claim an app on Pagefront',
  works: 'insideProject',

  run: function() {
    var key = fetchKey();

    if (key) {
      open([URL, key].join('/'));
    } else {
      this.ui.writeLine(FAILURE_MESSAGE);
    }
  }
};
