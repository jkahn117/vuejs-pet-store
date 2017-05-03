/**

 Handler functions for Pets routes.

 https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example

 */

'use strict'

const AWS  = require('aws-sdk')
const uuid = require('uuid/v1')

// @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const ddb = new AWS.DynamoDB.DocumentClient()
const petTable = process.env.TABLE_NAME

/**

 LIST

 */
exports.list = function(req, res) {
  let params = {
    TableName: process.env.TABLE_NAME
  }

  ddb.scan(params).promise()
    .then((data) => {
      res.status(200)
        .json({
          success: true,
          results: data.Items,
          message: null
        })
    })
}

/**

 GET

 */
exports.get = function(req, res) {
  let params = {
    Key: {
      uuid: req.params.id
    },
    TableName: petTable
  }

  ddb.get(params).promise()
    .then((data) => {
      res.status(200)
        .json({
          success: true,
          result:  data.Item,
          message: null
        })
    })
}

/**
  
 CREATE / UPDATE

 */
exports.update = function(req, res) {
  let uuid = req.body.uuid || uuid()
  let params = {
    Item: {
      uuid:        uuid,
      name:        req.body.name,
      category:    req.body.category,
      breed:       req.body.breed,
      gender:      req.body.gender,
      age:         req.body.age,
      available:   req.body.available,
      description: req.body.description
    },
    TableName: petTable
  }

  let newPet = !req.body.uuid
  if (newPet) {
    res.append('Location', `${req.url}/${uuid}`)
  }

  ddb.put(params).promise()
    .then((data) => {
      res.status(newPet ? 201 : 200).json({})
    })
}

/**

 DELETE

 */
exports.delete = function(req, res) {
  let params = {
    Key: {
      uuid: req.params.id
    },
    TableName: process.env.TABLE_NAME
  }

  ddb.delete(params)
    .then((data) => {
      res.status(200)
        .json({
          success: true,
          data:    {},
          message: null
        })
    })
}
