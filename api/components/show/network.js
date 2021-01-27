/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  [code index]

  1.- ROUTES

    1. [GET] - SEARCH POSTS LOCATIONS
    2. [GET] - SHOW POSTS LOCATIONS TOP 2 POST OF MEXICO AND 2 POSTS OF COLOMBIA


  2.- HTTP methods information

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

*/

const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../../network/response')

//------------------------------------------------------------------------------------------------
// 1. [GET] - SEARCH POSTS LOCATIONS
//------------------------------------------------------------------------------------------------

router.post('/home', async (req, res) => {
  const {location} = req.body
  try {
    const result = await controller.getLocationPost(location)
    if (result === false) {
      response.status(400).json({
        message: 'Posts not found'
      })
    }
    response.success(req, res, result, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
// 2. [GET] - SHOW POSTS LOCATIONS TOP 2 POST OF MEXICO AND 2 POSTS OF COLOMBIA
//------------------------------------------------------------------------------------------------

router.get('/topLocations', async (req, res) => {
  try {
    const result = await controller.getTopLocation()
    if (result === false) {
      response.status(400).json({
        message: 'Posts not found'
      })
    }
    response.success(req, res, result, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

module.exports = router
