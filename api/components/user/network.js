/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  [code index]

  1.- ROUTES

   - [Multer configuration]
    1. [POST] - CREATE USER
    2. [PUT] - UPDATE USER
    3. [DELETE] - DELETE USER
    4. [GET] - SHOW ALL USERS
    5. [GET] - SHOW USER FOR ID
    6. [POST] - USER LOGIN
    7. [GET] - USER POSTS
    8. [GET] - SHOW FAVORITE POSTS OF USER

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
const multer = require('multer')
const path = require('path')
//const cloudinary = require('cloudinary')
const checkAuth = require('../../../auth/check-auth');
/*
cloudinary.config({
  cloud_name: 'cozyplace',
  api_key: '837153421924575',
  api_secret: 'EVifAhGls69qpUOfL8J3tetVm4Q'
})
*/
//------------------------------------------------------------------------------------------------
// [Multer configuration]
//------------------------------------------------------------------------------------------------

const storage = multer.diskStorage({
  destination: 'public/files',
  filename: function (req, file, cb) {
    cb(null, file.filename + '-' + Date.now() +
        path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

//------------------------------------------------------------------------------------------------
// 1. [POST] - CREATE USER
//------------------------------------------------------------------------------------------------

router.post('/signup', upload.single('image'), async (req, res) => {
    const { fullname, email, username, password, description } = req.body
    try {
      //const resultImage = await cloudinary.v2.uploader.upload(req.file.path)
      const user = await controller.add(fullname, email, username, password, description, req.file)
      response.success(req, res, user, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
  })

//------------------------------------------------------------------------------------------------
// 2. [PUT] - UPDATE USER
//------------------------------------------------------------------------------------------------

router.put('/:id', checkAuth, async (req, res) => {
  const { id } = req.params
  const { body: user } = req
  user._id = id
  try {
    const data = await controller.updateUser(user)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
// 3. [DELETE] - DELETE USER
//------------------------------------------------------------------------------------------------

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await controller.deleteUserController(id)

    response.success(req, res, `User ${id} deleted`, 200)
  } catch (err) {
    response.error(req, res, err.message, 500, err)
  }
})

//------------------------------------------------------------------------------------------------
// 4. [GET] - SHOW ALL USERS
//------------------------------------------------------------------------------------------------

  router.get('/', async (req, res) => {
    try {
      const data = await controller.getAll()
      response.success(req, res, data, 200)
    } catch (error) {
      response.error(req, res, 'Something wrong happend', 500, error)
    }
  })

//------------------------------------------------------------------------------------------------
// 5. [GET] - SHOW USER FOR ID
//------------------------------------------------------------------------------------------------

  router.get('/:id', async (req, res) => {
    const { id } = req.params
  
    try {
      const data = await controller.getOne(id)
      response.success(req, res, data, 200)
    } catch (error) {
      response.error(req, res, error.message, 400)
    }
  })

//------------------------------------------------------------------------------------------------
// 6. [POST] - USER LOGIN
//------------------------------------------------------------------------------------------------

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  try {
    const token = await controller.loginController(email, password)
    const finalResponse = {
      Message: 'Auth success',
      token
    }
    if (token) {
      response.success(req, res, finalResponse, 200)
    } else {
      throw new Error('Login failed')
    }
  } catch (error) {
    response.error(req, res, error.message, 401, error)
  }
})

//------------------------------------------------------------------------------------------------
// 7. [GET] - USER POSTS
//------------------------------------------------------------------------------------------------

router.get('/postsuser/:id', checkAuth, async (req, res) => {
  const {id} = req.params
  try {
    const data = await controller.getUserPosts(id)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400)
  }
})

//------------------------------------------------------------------------------------------------
// 8. [GET] - SHOW FAVORITE POSTS OF USER
//------------------------------------------------------------------------------------------------

router.get('/favorites/:id', async (req, res) => {
  const { id } = req.params

  try {
    const data = await controller.getAllFavorites(id)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400)
  }
})

module.exports = router;