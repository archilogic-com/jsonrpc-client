var Promise = require('bluebird'),
    Request = require('request-promise'),
    UUID = require('uuid')

var settings = {
  url: null
}

function JsonRpcError(message, code, data) {
  this.name = 'JsonRpcError';
  this.message = message || 'Server returned an error response';
  this.stack = (new Error()).stack;
}
JsonRpcError.prototype = Object.create(Error.prototype);
JsonRpcError.prototype.constructor = JsonRpcError;

module.exports = {
  JsonRpcError: JsonRpcError,

  setUrl: function(url) {
    settings.url = url
  },

  call: function(method, params) {
    return new Promise(function(resolve, reject) {
      Request({
        method: 'POST',
        uri: settings.url,
        json: true,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          id: UUID.v4(),
          jsonrpc: '2.0',
          method: method,
          params: params
        }
      })
      .then(function(response) {
        resolve(response.result)
      })
      .catch(function(err) {
        var actualError = err.error.error
        reject({
          message: actualError.message,
          code: actualError.code,
          data: actualError.data
        })
      })
    })
  }
}
