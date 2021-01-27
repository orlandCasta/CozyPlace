/*

It is in charge of managing the database, here it is specified, where and when the information is saved

[code index]

  1.- STORE FUNCTIONS

    1.1.1 [add] - CREATE POST
    2.2.2 [update] - UPDATE POST
    3.3.3 [remove] - DELETE POST
    4.4.4 [get] - SHOW ALL POSTS
    5.5.5 [getFilter] - SHOW POSTS FOR ID
    6.6.x [addFavorite] - ADD FAVOTITE POSTS
    7.7.7 [deleteFavorite] - DELETE FAVOTITE POSTS

  2.- [MODULE EXPORTS]

*/

const Model = require('../../../storage/models/post')
const userModel = require('../../../storage/models/user')

//------------------------------------------------------------------------------------------------
// 1.1.1 [add] - CREATE POST
//------------------------------------------------------------------------------------------------

const add = (post) => {
    const newPost = new Model(post)
    return newPost.save()
  }

//------------------------------------------------------------------------------------------------
// 2.2.2 [update] - UPDATE POST
//------------------------------------------------------------------------------------------------

const update = async (id, post) => {
  let retrievedPost = await Model.findOne({
    _id: id
  })

  let entrie = Object.entries(retrievedPost)
  entrie = Object.entries(post)

  retrievedPost = Object.fromEntries(entrie)

  console.log(retrievedPost)
  const newdPost = await Model.findByIdAndUpdate(id, retrievedPost)
  return newdPost
}

//------------------------------------------------------------------------------------------------
// 3.3.3 [remove] - DELETE POST
//------------------------------------------------------------------------------------------------

const remove = (id) => {
  return Model.deleteOne({
    _id: id
  })
}

//------------------------------------------------------------------------------------------------
// 4.4.4 [get] - SHOW ALL POSTS
//------------------------------------------------------------------------------------------------

const get = async (fCountry, flocation, ftags, ftitle) => {
  return new Promise((resolve, reject) => {

  filter = {}

  if (fCountry !== null) {
    filter = {
      country: fCountry
    }
  } else if (flocation !== null) {
    filter = {
      location: flocation
    }
  } else if (ftags !== null) {
    filter = {
      tags: ftags
    }
  } else if (ftitle !== null) {
    filter = {
      title: ftitle
    }
  }

  Model.find(filter)
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
// 5.5.5 [getFilter] - SHOW POSTS FOR ID
//------------------------------------------------------------------------------------------------

const getFilter = async (id) => {
  return new Promise((resolve, reject) => {

  Model.findOne({ _id: id })
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
// 6.6.x [addFavorite] - ADD FAVOTITE POSTS
//------------------------------------------------------------------------------------------------

const addFavorite = async (id, idPost) => {
  const data = await userModel.findById(id)
  data.favorite.push(idPost)
  data.save()
  userModel.update()
}

//------------------------------------------------------------------------------------------------
// 7.7.7 [deleteFavorite] - DELETE FAVOTITE POSTS
//------------------------------------------------------------------------------------------------
const deleteFavorite = async (id, idPost) => {
  const data = await userModel.findById(id)
  data.favorite.remove({
    _id: idPost
  })
  data.save()
  userModel.update()
}

//------------------------------------------------------------------------------------------------
// [MODULE EXPORTS]
//------------------------------------------------------------------------------------------------

  module.exports = {
    add,
    get,
    getFilter,
    update,
    remove,
    addFavorite,
    deleteFavorite
  }