/**
 * 
 * Simple Express-based backend for pet shop application.
 * 
 */

'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const compression = require('compression')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express()

// app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(awsServerlessExpressMiddleware.eventContext())

//--- routes
var pets  = require('./routes/pets')


//---
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    console.log(err.message)
    console.log(err)
    res.status(err.code || 500)
      .json({
        success: false,
        results: null,
        message: err
      })
  })
}

app.use(function (err, req, res, next) {
  console.error(err.message)
  res.status(err.code || 500)
    .json({
      success: false,
      results: null,
      message: err.message
    })
})

// pet routes
app.get('/pets',        pets.list)     // list pets
app.get('/pets/:id',    pets.get)      // find pet by 
app.post('/pets',       pets.update)   // create new pet
app.put('/pets/:id',    pets.update)   // update existing pet
app.delete('/pets/:id', pets.delete)   // delete existing pet


module.exports = app
