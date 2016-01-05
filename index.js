var Promise = require('bluebird'),
    Request = require('request-promise'),
    UUID = require('uuid')

var settings = {
  url: null,
  useCookies: false
}
var cookieJar = null

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

  setUseCookies: function(useCookies) {
    settings.useCookies = true
    cookieJar = Request.jar()
  },

  setCookie: function(cookieString) {
    if(!cookieJar) {
      console.warn('setCookie can only be called, if setUseCookies(true) has been called before!')
      return null
    }
    cookieJar.setCookie(cookieString, settings.url)
  },

  getCookie: function() {
    if(!cookieJar) {
      console.warn('getCookie can only be called, if setUseCookies(true) has been called before!')
      return null
    }
    return cookieJar.getCookieString(settings.url)
  },

  call: function(method, params, useCookies) {
    if((useCookies || settings.useCookies) && !cookieJar) {
      cookieJar = Request.jar()
    }

    return new Promise(function(resolve, reject) {
      Request({
        method: 'POST',
        uri: settings.url,
        json: true,
        headers: {
          'Content-Type': 'application/json'
        },
        jar: (useCookies || settings.useCookies ? cookieJar : null),
        body: {
          id: UUID.v4(),
          jsonrpc: '2.0',
          method: method,
          params: params,
        },
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
