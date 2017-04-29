//
// Cognito Helper
//

import Config from '../config'

import * as AWS from 'aws-sdk'
import { CognitoUserPool } from 'amazon-cognito-identity-js'

const region = Config.cognitoUserPoolRegion
const userPoolId = Config.cognitoUserPoolId
const identityPoolId = Config.cognitoIdentityPoolId
const appClientId = Config.cognitoUserPoolAppClientId

const poolData = {
  UserPoolId: userPoolId,
  ClientId: appClientId
}

const getUserPool = () => {
  return new CognitoUserPool(poolData)
}

const getCurrentUser = () => {
  return getUserPool().getCurrentUser()
}

const getCognitoIdentityId = () => {
  return AWS.config.credentials.identityId
}

export default {
  region,
  userPoolId,
  identityPoolId,
  appClientId,
  poolData,
  getUserPool,
  getCurrentUser,
  getCognitoIdentityId
}
