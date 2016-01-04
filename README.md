# jsonrpc-client

A really, really simple JSON-RPC 2.0 client.

## Installation

```shell
npm install --save jsonrpc-client
```

## Usage

```javascript
var jsonRpc = require('jsonrpc-client')

// Our API server is at http://example.org/api
jsonRpc.setUrl('http://example.org/api')
// Let's call the 'saySomething' method that takes two parameters, 'to' and 'message'
jsonRpc.call('saySomething', {to: 'Alice', message: 'Hi, Bob!'})
.then(function success(result) {
  // The 'saySomething' method has a field 'output'
  console.log('output', result.output)
}, function failure(err) {
  // oops, something went wrong!
  console.error('Oops! Error code ' + err.code + ': ' + err.message)
  // additional data might be in 'err.data'
})
```
