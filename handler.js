'use strict';
const http = require('http')
const url = require('url')

if (process.env.AWS_SIGN_REQUESTS) {
  const signRequest = require('aws4').sign
} else {
  const signRequest = (requestOptions) => { return requestOptions }
}

const httpAgent = http.Agent({
  keepAlive: true,
  keepAliveMsecs: 300000
})

module.exports.proxy = (event, context, callback) => {
  var req = http.request(signRequest({
    hostname: process.env.URL,
    method: event.httpMethod,
    headers: event.headers,
    path: event.path,
    agent: httpAgent,
    timeout: 30 /* maximum time for api gateway invoked Lambda */
  }))

  var resBody = ""
  res.on('data', (chunk) => {
    resBody += chunk
  })
  .on('end', () => {
    var response = {
      statusCode: res.statusCode,
      headers: res.headers,
      body: resBody
    }
    console.log(response)
    callback(null, response)
  })
};
