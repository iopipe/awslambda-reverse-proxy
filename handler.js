'use strict';
const http = require('http')
const url = require('url')
const ioProfiler = require('lambda-profiler')({})

var signRequest = (requestOptions) => { return requestOptions }
if (process.env.AWS_SIGN_REQUESTS) {
  signRequest = require('aws4').sign
}

var profiler = (func) => { return func }
if (process.env.TRACE_REQUESTS) {
  profiler = ioProfiler
}

const httpAgent = http.Agent({
  keepAlive: true,
  keepAliveMsecs: 300000
})

module.exports.proxy = profiler((event, context, callback) => {
  var res = http.request(signRequest({
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
})
