'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = {
  url: null
};

exports.default = {
  setUrl: function setUrl(url) {
    settings.url = url;
  },
  call: function call(method, params) {
    (0, _requestPromise2.default)({
      method: 'POST',
      body: {
        id: _uuid2.default.v4(),
        jsonrpc: '2.0',
        method: method,
        params: params
      }
    });
  }
};
