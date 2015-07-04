var CoreObject = require('core-object');
var Promise = require('ember-cli/lib/ext/promise');
var request = require('request');
var Config = require('./config');

var HOST = 'https://api.pagefronthq.com';
var BODYLESS = ['HEAD', 'GET', 'DELETE'];
var MEDIA_TYPE = 'application/json';
var ERROR_THRESHOLD = 400;
var HEAD = 'HEAD';
var GET = 'GET';
var POST = 'POST';
var PUT = 'PUT';
var PATCH = 'PATCH';
var DELETE = 'DELETE';
var PAGEFRONT_CONFIG = '.pagefrontrc';

module.exports = CoreObject.extend({
  init: function(key) {
    this.config = new Config(PAGEFRONT_CONFIG);
    this.key = key || this.config.get('key');
  },

  createDifference: function(app, params) {
    var path = ['apps', app, 'differences'].join('/');

    return this.request(POST, path, params);
  },

  createRelease: function(app, params) {
    var path = ['apps', app, 'releases'].join('/');

    return this.request(POST, path, params);
  },

  listReleases: function(app) {
    var path = ['apps', app, 'releases'].join('/');

    return this.request(GET, path);
  },

  request: function(method, path, params) {
    var options = {
      method: method,
      url: this.urlFor(path),
      headers: {
        'Authorization': 'Token token="' + this.key + '"',
        'Content-Type': MEDIA_TYPE,
        'Accept': MEDIA_TYPE
      }
    };

    if (params) {
      if (BODYLESS.indexOf(method) === -1) {
        options.body = JSON.stringify(params);
      } else {
        options.qs = params;
      }
    }

    return new Promise(function(resolve, reject) {
      request(options, function (error, response, body) {
        if (error) {
          reject(error);
        } else if (response.statusCode >= ERROR_THRESHOLD) {
          reject(response);
        } else {
          resolve(body && JSON.parse(body).data);
        }
      });
    });
  },

  urlFor: function(path) {
    return [HOST, path].join('/');
  }
});
