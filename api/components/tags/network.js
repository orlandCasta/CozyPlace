/*

In this file is where we put all the routes, here we put the endpoints and the information that has to do with the http protocol,
specifically this route is not productive, it is only to create the tags

  [code index]

  1.- ROUTES

    1. [POST] - CREATE TAG
    4. [GET] - SHOW ALL TAGS

  2.- HTTP methods information

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

*/

const express = require('express');
const response = require('../../../network/response.js');
const controller = require('./controller');
const router = express.Router();

//------------------------------------------------------------------------------------------------
// 1. [POST] - CREATE TAG
//------------------------------------------------------------------------------------------------

router.post('/createtag', async (req, res) => {
    const { tagname} = req.body
    try {
      const user = await controller.addTag(tagname)
      response.success(req, res, user, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
  })

//------------------------------------------------------------------------------------------------
// 4. [GET] - SHOW ALL TAGS
//------------------------------------------------------------------------------------------------

router.get('/', async (req, res) => {
  try {
    const data = await controller.getAllTags()
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, 'Something wrong happend', 500, error)
  }
})

module.exports = router;