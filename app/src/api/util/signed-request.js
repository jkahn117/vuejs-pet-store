/**
 * SignedRequest class builds requests signed with AWS SigV4.
 */

import AWS from 'aws-sdk'
import aws4 from 'aws4'
import querystring from 'querystring'

import Config from '../../config'

/**
 * Builds a signed SigV4 request.
 *
 * @param  {String} method  HTTP type, e.g. GET, POST
 * @param  {String} path    Path to resource, e.g. /pets or /items/foo
 * @param  {Hash} qs        Hash of key-value pairs of query string parameters
 * @param  {Hash} data      JSON body for PUT and POST requests
 * @return {Hash}           Signed request ready for axios
 */
const build = (method, path, qs, data) => {
  path = path.startsWith('/') ? path : `/${path}`

  // TODO add a test for empty
  if (qs) {
    path = `${path}?${querystring.stringify(qs)}`
  }

  let request = {
    host: Config.petApiHost,
    method: method,
    url: `https://${Config.petApiHost}${path}`,
    path: path
  }

  if (method === 'PUT' || method === 'POST') {
    request['body'] = JSON.stringify(data)
    request['data'] = data
    request['headers'] = {
      'content-type': 'application/json'
    }
  }

  let signedRequest = aws4.sign(request,
    {
      secretAccessKey: AWS.config.credentials.secretAccessKey,
      accessKeyId: AWS.config.credentials.accessKeyId,
      sessionToken: AWS.config.credentials.sessionToken
    })

  delete signedRequest.headers['Host']
  delete signedRequest.headers['Content-Length']

  return signedRequest
}

export default {
  build
}
