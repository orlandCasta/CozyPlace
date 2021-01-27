/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

[code index]

  1.- CONTROLLER FUNCTIONS

    1.1 [addUser] - CREATE USER
    2.2 [updateUser] - UPDATE USER
    3.3 [deleteUserController] - DELETE USER
    4.4 [getAll] - SHOW ALL USERS
    5.5 [getOne] - SHOW USER FOR ID
    6.6 [loginController] - USER LOGIN
    7.7 [getUserPosts] - USER POSTS
    8.8 [getAllFavorites] - SHOW FAVORITE POSTS OF USER

  2.- [MODULE EXPORTS]

*/

const storage = require('./store')
const bcrypt = require('bcrypt')
const auth = require('../../../auth/index')

//------------------------------------------------------------------------------------------------
// 1.1 [addUser] - CREATE USER
//------------------------------------------------------------------------------------------------

const addUser = async (fullname, email, username, password, description, image) => {
  if (!fullname || !email || !username || !password) {
    throw new Error('Missing data')
  }

  let fileUrl = ''
  if (image) {
    fileUrl = `https://cozyplace.herokuapp.com/app/files/${image.filename}`
  }

  const emailExists = await storage.getOneByFilter({ email })

  if (emailExists.length >= 1) {
    throw new Error('Email used')
  } else {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, async (err, hashed) => {
        if (err) {
          reject(err)
        } else {
          resolve(hashed)
        }
      })
    })

    const user = {
      fullname,
      email,
      username,
      image: fileUrl,
      description,
      password: hashedPassword
    }

    return storage.add(user)
  }
}

//------------------------------------------------------------------------------------------------
// 2.2 [updateUser] - UPDATE USER
//------------------------------------------------------------------------------------------------

const updateUser = async (userUpdate) => {
  if (userUpdate) {
    if (userUpdate.password) {
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(userUpdate.password, 10, async (err, hashed) => {
          if (err) {
            reject(err)
          } else {
            resolve(hashed)
          }
        })
      })

      userUpdate.password = hashedPassword
    }
    const filter = {
      _id: userUpdate._id
    }
    const userUpdated = await storage.updateUser(filter, userUpdate)
    if (userUpdated) {
      return userUpdated
    } else {
      throw new Error('User not found')
    }
  } else {
    throw new Error('Error updating user')
  }
}

//------------------------------------------------------------------------------------------------
// 3.3 [deleteUserController] - DELETE USER
//------------------------------------------------------------------------------------------------

const deleteUserController = async (id) => {
  if (id) {
    const filter = {
      _id: id
    }
    return await storage.deleteUser(filter)
  } else {
    throw new Error('Id needed')
  }
}

//------------------------------------------------------------------------------------------------
// 4.4 [getAll] - SHOW ALL USERS
//------------------------------------------------------------------------------------------------

const getAll = () => {
  return storage.getAllUsers()
}

//------------------------------------------------------------------------------------------------
// 5.5 [getOne] - SHOW USER FOR ID
//------------------------------------------------------------------------------------------------

const getOne = async (id) => {
  if (!id) {
    throw new Error('id needed')
  } else {
    const data = await storage.getOneUser(id)
    return data
  }
}

//------------------------------------------------------------------------------------------------
// 6.6 [loginController] - USER LOGIN
//------------------------------------------------------------------------------------------------

const loginController = async (email, password) => {
  const user = await storage.getOneByFilter({ email })

  if (user.length < 1) {
    throw new Error('Login failed')
  }
  const isCorrect = bcrypt.compareSync(password, user[0].password)
  if (isCorrect === true) {
    const token = auth.createToken(user[0]._id, user[0].email, user[0].username)
    return token
  }
}

//------------------------------------------------------------------------------------------------
// 7.7 [getUserPosts] - USER POSTS
//------------------------------------------------------------------------------------------------

const getUserPosts = async (id) => {
  console.log('CONTROLLER', id)
  const result = await storage.postsOfUser(id)
  return result
}

//------------------------------------------------------------------------------------------------
// 8.8 [getAllFavorites] - SHOW FAVORITE POSTS OF USER
//------------------------------------------------------------------------------------------------

const getAllFavorites = async (id) => {
  if (!id) {
    throw new Error('id needed')
  } else {
    const data = await storage.getFavPostStore(id)
    return data
  }
}

//------------------------------------------------------------------------------------------------
// [MODULE EXPORTS]
//------------------------------------------------------------------------------------------------

module.exports = {
  add: addUser,
  loginController,
  getAll,
  getOne,
  deleteUserController,
  updateUser,
  getUserPosts,
  getAllFavorites
}
