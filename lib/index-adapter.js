var CoreObject  = require('core-object');
var chalk = require('chalk');
var API = require('./api');
var collectFiles = require('./collect-files');
var fetchCommit = require('./fetch-commit');

var green = chalk.green;
var white = chalk.white;

var ROOT = 'tmp/assets-sync/assets';

module.exports = CoreObject.extend({
  init: function() {
    this._super.apply(this, arguments);
    this.api = new API(this.config.key);
  },

  upload: function(index) {
    var commit = fetchCommit();
    var didRelease = this.didRelease.bind(this);
    var params = {
      index: index.toString(),
      commit_sha: commit.sha,
      commit_message: commit.message,
      manifest: collectFiles(ROOT)
    };

    return this.api.createRelease(this.config.app, params).then(didRelease);
  },

  activate: function(revision) {
    var version = Number(revision.slice(1));
    var didRelease = this.didRelease.bind(this);
    var params = { release: version };

    return this.api.createRelease(this.config.app, params).then(didRelease);
  },

  list: function() {
    var didFetchReleases = this.didFetchReleases.bind(this);

    return this.api.listReleases(this.config.app).then(didFetchReleases);
  },

  didRelease: function(release) {
    var message = green('Success! v' + release.version + ' has been released.');

    return this.printMessage(message);
  },

  didFetchReleases: function(releases) {
    var header = 'Previous Releases:\n\n';
    var list = releases.map(function(release) {
      return 'v' + release.version + ': ' + release.commit_message;
    }).join('\n\n');
    var footer = '\n\nTo rollback to a previous release: ember deploy:activate --revision vX';
    var message = green(header) + white(list) + green(footer)

    return this.printMessage(message)
  },

  printMessage: function(message) {
    this.ui.writeLine(message);
  }
});
