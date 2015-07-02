var fs = require('fs');
var join = require('path').join;

function isDir(path) {
  return fs.statSync(path).isDirectory();
}

module.exports = function collectFiles(path, files, prefix) {
  return fs.readdirSync(path).reduce(function(acc, name) {
    var fullPath = join(path, name);
    var fullName = join(prefix || '', name);

    if (isDir(fullPath)) {
      return collectFiles(fullPath, acc, fullName)
    } else {
      return acc.concat(fullName);
    }
  }, files || []);
};
