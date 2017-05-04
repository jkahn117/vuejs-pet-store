//
// Authentication Service -- Cognito
//

import * as AWS from 'aws-sdk'
import {
  AuthenticationDetails,
  // CognitoIdentityServiceProvider,
  // CognitoUserPool,
  // CognitoUserAttribute,
  // CognitoUserSession,
  CognitoUser
} from 'amazon-cognito-identity-js'
import CognitoHelper from './util/cognito-helper'

const SUCCESS = 'authSuccess'
const FAILURE = 'authFailure'
const NEW_PASSWORD = 'newPasswordRequired'

let cognitoUser = null

//
// Authenticate
//
const authenticate = (username, password) => {
  console.log('AuthService: Login / Authenticate')
  // setting the stage... need to set the accessKeyId and secretAccessKey to something...
  AWS.config.update({
    region: CognitoHelper.region,
    accessKeyId: 'initial',
    secretAccessKey: 'initial'
  })

  let authDetails = new AuthenticationDetails({
    Username: username,
    Password: password
  })

  cognitoUser = new CognitoUser({
    Username: username,
    Pool: CognitoHelper.getUserPool()
  })

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (session) => {
        resolve(_onSuccess(session))
      },
      onFailure: (error) => {
        console.error('[ERROR] Authentication failed: ' + error.message)
        let result = { code: FAILURE, payload: error.message }
        reject(result)
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        // TODO: in reality, should merge attributes and have user fill in any missing...
        let result = { code: NEW_PASSWORD, payload: userAttributes }
        resolve(result)
      }
    })
  })
}

//
// Logout
//
const logout = () => {
  console.log('AuthService: Logout')
  CognitoHelper.getCurrentUser().signOut()
}

/**
 * Refreshes the AWS credentials based on the login map. Retrieves the temporary
 * credentials for the currently logged in user, refreshing if needed.
 */
const refreshAWSCredentials = () => {
  let logins = {}

  return new Promise((resolve, reject) => {
    CognitoHelper.getCurrentUser().getSession((error, session) => {
      if (error) {
        reject(error)
        return
      }

      logins[`cognito-idp.${CognitoHelper.region}.amazonaws.com/${CognitoHelper.userPoolId}`] =
        session.getIdToken().getJwtToken()

      // Add the user's token to the credential map
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: CognitoHelper.identityPoolId,
        Logins: logins
      })

      // TODO: add referesh required...
      // https://github.com/awslabs/aws-serverless-auth-reference-app/blob/4f93a602188a58fbe06387f2d86d538082251bb7/app/src/services/account-management.service.ts
      AWS.config.credentials.get((error) => {
        if (error) {
          reject(error)
          return
        }

        resolve()
      })
    })
  })
}

/**
 * Success handler for authenticate and compeltePasswordChallenge methods.
 * Stores the current user in Cognito.
 *
 * @param session
 */
const _onSuccess = (session) => {
  return refreshAWSCredentials()
    .then(() => {
      return new Promise((resolve, reject) => {
        // return a user payload
        let user = {
          username: cognitoUser.getUsername(),
          session: session,
          credentials: AWS.config.credentials
        }

        cognitoUser = null
        resolve({ code: SUCCESS, payload: user })
      })
    })
}

export default {
  SUCCESS,
  FAILURE,
  NEW_PASSWORD,
  authenticate,
  refreshAWSCredentials,
  logout
}
