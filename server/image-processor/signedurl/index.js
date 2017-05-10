/**
 * Returns a signed url to allow a 'putObject' operation on the S3
 * Bucket designated via Environment Variable.
 */

const AWS = require('aws-sdk')

const buildResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      // In aws_proxy mode, Lambda function must return its own access control
      // header to enable CORS.
      // TODO: update with real origin
      'Access-Control-Allow-Origin': 'http://localhost:8080'
    }
  };
};

exports.handler = (event, context, callback) => {
  let fileData = event.queryStringParameters

  let params = {
    Bucket: process.env.UPLOAD_BUCKET,
    Key: decodeURIComponent(fileData.name),
    // Expires: process.env.EXPIRATION_TIME,
    ContentType: decodeURIComponent(fileData.type),
    ACL: 'public-read'
  }

  let s3 = new AWS.S3()
  s3.getSignedUrl('putObject', params, (error, data) => {
    if (error) {
      console.error(error)
      callback(error, null)
    } else {
      callback(null, buildResponse( 200, { "url": data } ))
    }
  })
}
