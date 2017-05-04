/**
 * SignedRequest class builds requests signed with AWS SigV4.
 */

import AWS from 'aws-sdk'
import aws4 from 'aws4'

import Config from '../config'

const build = (method, path, data) => {
  path = path.startsWith('/') ? path : `/${path}`

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
