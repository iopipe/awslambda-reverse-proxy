# Serverless reverse proxy

[![Greenkeeper badge](https://badges.greenkeeper.io/iopipe/awslambda-reverse-proxy.svg)](https://greenkeeper.io/)

Provides a reverse proxy into VPC resources on AWS. Can optionally sign requests
by setting the `AWS_SIGN_REQUESTS` environment variable.

## Installation

Edit `config.yml` and edit the URL variable to point to your backend
URL. Optionally set `AWS_SIGN_REQUESTS` if requests should be signed to the
backend services.

Run `sls deploy`.

 
## Requirements

* Serverless Framework 1.0+
* NodeJS

## License

Apache-2.0 see LICENSE
