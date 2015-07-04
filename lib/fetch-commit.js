var fs = require('fs');
var join = require('path').join;
var findFile = require('./find-file');

var GIT = '.git';
var HEAD = 'HEAD';
var UTF8 = 'utf8';
var MESSAGE = 'COMMIT_EDITMSG';
var FILE_OPTIONS = { encoding: UTF8 };

function fetchSha(git) {
  var head = fs.readFileSync(join(git, HEAD), FILE_OPTIONS);
  var ref = join(git, head.split(' ')[1].trim());

  return fs.readFileSync(ref, FILE_OPTIONS).trim();
}

function fetchMessage(git) {
  return fs.readFileSync(join(git, MESSAGE), FILE_OPTIONS).trim();
}

module.exports = function() {
  var git = findFile(GIT);

  return {
    sha: fetchSha(git),
    message: fetchMessage(git)
  };
};
