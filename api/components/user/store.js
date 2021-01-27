/*

It is in charge of managing the database, here it is specified, where and when the information is saved

[code index]

  1.- STORE FUNCTIONS

    1.1.1 [addUser] - CREATE USER
    2.2.2 [updateUser] - UPDATE USER
    3.3.3 [deleteUser] - DELETE USER
    4.4.4 [getAllUsers] - SHOW ALL USERS
    5.5.5 [getOneUser] - SHOW USER FOR ID
    6.6.x [getOneByFilter] - USER LOGIN
    7.7.7 [postsOfUser] - USER POSTS
    8.8.8 [getFavPostStore] - SHOW FAVORITE POSTS OF USER

  2.- [MODULE EXPORTS]

*/

const Model = require('../../../storage/models/user')
const postModel = require('../../../storage/models/post')

//------------------------------------------------------------------------------------------------
// 1.1.1 [addUser] - CREATE USER
//------------------------------------------------------------------------------------------------

const addUser = async (user) => {
    const myUser = new Model(user)
    try {
      return await myUser.save()
    } catch (error) {
      throw new Error(error)
    }
  }

//------------------------------------------------------------------------------------------------
// 2.2.2 [updateUser] - UPDATE USER
//------------------------------------------------------------------------------------------------

const updateUser = async (filter, update) => {
  return await Model.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
// 3.3.3 [deleteUser] - DELETE USER
//------------------------------------------------------------------------------------------------

  const deleteUser = async (id) => {
    const data = await Model.findByIdAndRemove(id)
    if (!data) {
      throw new Error('User not found')
    }
  }

//------------------------------------------------------------------------------------------------
// 4.4.4 [getAllUsers] - SHOW ALL USERS
//------------------------------------------------------------------------------------------------

const getAllUsers = () => {
  return Model.find({})
}

//------------------------------------------------------------------------------------------------
// 5.5.5 [getOneUser] - SHOW USER FOR ID
//------------------------------------------------------------------------------------------------

const getOneUser = async (id) => {
  const data = await Model.findById(id).exec()

  if (data) {
    return data
  } else {
    throw new Error('User not found')
  }
}

//------------------------------------------------------------------------------------------------
// 6.6.x [getOneByFilter] - USER LOGIN
//------------------------------------------------------------------------------------------------

const getOneByFilter = async (filter) => {
  const data = await Model.find(filter)
  return data
}

//------------------------------------------------------------------------------------------------
// 7.7.7 [postsOfUser] - USER POSTS
//------------------------------------------------------------------------------------------------

const postsOfUser = async (id) => {
  return new Promise((resolve, reject) => {

  postModel.find({ user: id })
  .populate('user')
  .populate('tags')
  .exec((error, data) => {
    if (error) {
      reject(error)
    }
    resolve(data)
  })
})
}

//------------------------------------------------------------------------------------------------
// 8.8 [getFavPostStore] - SHOW FAVORITE POSTS OF USER
//------------------------------------------------------------------------------------------------

const getFavPostStore = async (id) => {
  return new Promise((resolve, reject) => {
    Model
      .findById(id)
      .populate({
        path: 'favorite',
        populate: { path: 'favorite' }
      })
      .exec((error, data) => {
        if (error) {
          reject(error)
        }
        resolve(data)
      })
  })
}

//------------------------------------------------------------------------------------------------
// [MODULE EXPORTS]
//------------------------------------------------------------------------------------------------

  module.exports = {
    add: addUser,
    getOneByFilter,
    getAllUsers,
    deleteUser,
    getOneUser,
    updateUser,
    postsOfUser,
    getFavPostStore
  }