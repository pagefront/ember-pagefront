var fs = require('fs');
var path = require('path');

var GIT = '.git';
var PARENT = '..';
var HEAD = 'HEAD';
var UTF8 = 'utf8';
var MESSAGE = 'COMMIT_EDITMSG';
var FILE_OPTIONS = { encoding: UTF8 };

function findGit() {
  var current = process.cwd();
  var last;
  var git;

  do {
    git = path.join(current, GIT);

    if (fs.existsSync(git)) {
      return git;
    } else {
      last = current;
      current = path.resolve(current, PARENT);
    }
  } while (last !== current);
}

function fetchSha(git) {
  var head = fs.readFileSync(path.join(git, HEAD), FILE_OPTIONS);
  var ref = path.join(git, head.split(' ')[1].trim());

  return fs.readFileSync(ref, FILE_OPTIONS).trim();
}

function fetchMessage(git) {
  return fs.readFileSync(path.join(git, MESSAGE), FILE_OPTIONS).trim();
}

module.exports = function() {
  var git = findGit();

  return {
    sha: fetchSha(git),
    message: fetchMessage(git)
  };
};
