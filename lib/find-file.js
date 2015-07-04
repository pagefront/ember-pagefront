var path = require('path');
var fs = require('fs');

var PARENT = '..';

module.exports = function(filename) {
  var current = process.cwd();
  var last;
  var fullPath;

  do {
    fullPath = path.join(current, filename);

    if (fs.existsSync(fullPath)) {
      return fullPath;
    } else {
      last = current;
      current = path.resolve(current, PARENT);
    }
  } while (last !== current);

  return null;
};
