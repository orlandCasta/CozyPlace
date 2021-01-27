/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  [code index]

  1.- ROUTES

  - [Multer configuration]
    1. [POST] - CREATE POST
    2. [PUT] - UPDATE POST
    3. [DELETE] - DELETE POST
    4. [GET] - SHOW ALL POSTS
    5. [POST] - SHOW POSTS FOR ID
    6. [POST] - ADD FAVOTITE POSTS
    7. [DELETE] - DELETE FAVOTITE POSTS

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
// 1. [POST] - CREATE POST
//------------------------------------------------------------------------------------------------

router.post('/create', checkAuth, upload.single('image'), async (req, res) => {
    try {
      const { title, user, date, duration, country, location, description, rating, tags} = req.body
      //const resultImage = await cloudinary.v2.uploader.upload(req.file.path)
      const post = await controller.addPost(title, user, date, duration, country, location, description, rating, tags, req.file)
  
      response.success(req, res, post, 200)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
  })

  //------------------------------------------------------------------------------------------------
// 2. [PUT] - UPDATE POST
//------------------------------------------------------------------------------------------------

router.put('/:id', checkAuth, upload.single('image'), (req, res) => {
  const { title, user, date, duration, country, location, description, rating, tags } = req.body

  controller.updatePost(req.params.id, title, user, date, duration, country, location, description, rating, tags, req.file)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(error => {
      response.success(req, res, error.message, 400, error)
    })
})

//------------------------------------------------------------------------------------------------
// 3. [DELETE] - DELETE POST
//------------------------------------------------------------------------------------------------

router.delete('/:id', checkAuth, (req, res) => {
  controller.deletePost(req.params.id)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(error => {
      response.error(req, res, error.message, 400, error)
    })
})

//------------------------------------------------------------------------------------------------
// 4. [GET] - SHOW ALL POSTS
//------------------------------------------------------------------------------------------------

  router.get('/', async (req, res) => {
  const country = req.query.country || null
  const location = req.query.location || null
  const tags = req.query.tags || null
  const title = req.query.title || null

  try {
    const result = await controller.getAllPost(country, location, tags, title)
    if (result === false) {
      response.status(400).json({
        message: 'Post not found'
      })
    }
    response.success(req, res, result, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
// 5. [POST] - SHOW POSTS FOR ID
//------------------------------------------------------------------------------------------------

router.get('/:id', async (req, res) => {
  try {
    const result = await controller.getPost(req.params.id)
    if (result === false) {
      response.status(400).json({
        message: 'Post not found'
      })
    }
    response.success(req, res, result, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
// 6. [POST] - ADD FAVOTITE POSTS
//------------------------------------------------------------------------------------------------

router.post('/favorite/:idPost', checkAuth, async (req, res) => {
  //const {idUser} = req.body
  const {idPost} = req.params
  try {
    //const data = await controller.favoritePost(req.params.idPost, req.userData.id)
    const data = await controller.favoritePost(req.userData.id, idPost)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
// 7. [delete] - DELETE FAVOTITE POSTS
//------------------------------------------------------------------------------------------------

router.delete('/favorite/:idPost', checkAuth, async (req, res) => {
  //const {idUser} = req.body
  const {idPost} = req.params
  try {
    const data = await controller.deleteFavoritePost(req.userData.id, idPost)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

module.exports = router;
