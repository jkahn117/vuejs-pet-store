/**
 * BLAH
 *
 * Prerequisites:
 *  - S3 CORS configuration is required on the bucket to which we are going
 *    to write (see configuration below)
 *  - Lambda function generating the signed URL must have putObject permission
 *    for the bucket. The signed URL allows the user to act on behalf of the
 *    signer, in this case the role under which this function is running.
 *  - API Gateway must have CORS enabled for OPTIONS and Lambda function must
 *    also return CORS Origin header if in AWS_PROXY mode.
 */

/**
 * CORS Configuration
 *
 * <?xml version="1.0" encoding="UTF-8"?>
 * <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
 *  <CORSRule>
 *    <AllowedOrigin>http://localhost:8080</AllowedOrigin>
 *    <AllowedMethod>PUT</AllowedMethod>
 *    <AllowedHeader>*</AllowedHeader>
 *  </CORSRule>
 * </CORSConfiguration>
 */

/**
 * Lambda - S3 Policy
 *
 * {
 *   "Version": "2012-10-17",
 *   "Statement": [
 *       {
 *           "Sid": "Stmt1493958654000",
 *           "Effect": "Allow",
 *           "Action": [
 *               "s3:Put*"
 *           ],
 *           "Resource": [
 *               "arn:aws:s3:::jkahn-my-pet-shop-image-upload/*"
 *           ]
 *       }
 *   ]
 * }
 */

import axios from 'axios'

import SignedRequest from './util/signed-request'

const upload = (file) => {
  let getSignedUrlPromise = new Promise((resolve, reject) => {
    let signedRequest = SignedRequest.build('GET',
      '/Prod/images/signedurl',
      { name: file.name, type: file.type },
      null)

    axios(signedRequest)
      .then((response) => resolve(response.data.url))
      .catch((error) => reject(error))
  })

  return getSignedUrlPromise
    .then((signedurl) => {
      // Why use jQuery here and not axios?
      // axios only seemed to allow for file uploads via FormData. This
      // caused a signing issue in which the generated signature did not
      // match that was expected by AWS (I suspect due to content-type).
      // jQuery allowed the data to be the file itself, not just FormData.
      return $.ajax({
        url: signedurl,
        type: 'PUT',
        data: file,
        processData: false,
        contentType: file.type
      }).fail((error) => console.error(error))
    })
}

export default {
  upload
}
