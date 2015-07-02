var Promise = require('ember-cli/lib/ext/promise');
var mime = require('mime');
var join = require('path').join;
var put = require('request').put;
var readFile = Promise.denodeify(require('fs').readFile);

var ROOT = 'tmp/assets-sync/assets';
var GZIP = 'gzip';
var ERROR_THRESHOLD = 400;

module.exports = function(asset) {
  var fullPath = join(ROOT, asset.name);

  return readFile(fullPath).then(function(file) {
    return new Promise(function(resolve, reject) {
      put({
        url: asset.upload_url,
        body: file,
        headers: {
          'Content-Encoding': GZIP,
          'Content-Type': mime.lookup(fullPath)
        }
      }, function(error, response, body) {
        if (error) {
          reject(error);
        } else if (response.statusCode >= ERROR_THRESHOLD) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  });
};
