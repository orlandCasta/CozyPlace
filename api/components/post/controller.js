/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

[code index]

  1.- CONTROLLER FUNCTIONS

    1.1 [addPost] - CREATE POST
    2.2 [updatePost] - UPDATE POST
    3.3 [deletePost] - DELETE POST
    4.4 [getAllPost] - SHOW ALL POSTS
    5.5 [getPost] - SHOW POSTS FOR ID
    6.6 [favoritePost] - ADD FAVOTITE POSTS
    7.7 [delete] - DELETE FAVOTITE POSTS

  2.- [MODULE EXPORTS]

*/

const store = require('./store')

//------------------------------------------------------------------------------------------------
// 1.1 [addPost] - CREATE POST
//------------------------------------------------------------------------------------------------

const addPost = async (title, user, date, duration, country, location, description, rating, tags, image) => {
    try {
      if (!title || !user || !date || !duration || !country || !location || !description || !rating || !tags) {
        console.log('[CONTROLLER] invalid data form.')
        throw new Error('Missin Data')
      }
      
      
      let fileUrl = ''
      if (image) {
        fileUrl = `https://cozyplace.herokuapp.com/app/files/${image.filename}`
      }
      

      const post = {
        title,
        user,
        date,
        duration,
        country,
        location,
        description,
        rating,
        tags,
        image: fileUrl,
      }
      const newPost = await store.add(post)
  
      finalResponse = {
        newPost,
        'System message': 'Post successfully created'
      }
  
      return (finalResponse)
    } catch (error) {
      throw new Error(error)
    }
  }

//------------------------------------------------------------------------------------------------
// 2.2 [updatePost] - UPDATE POST
//------------------------------------------------------------------------------------------------

const updatePost = (id, title, user, date, duration, country, location, description, rating, tags, image) => {
  return new Promise((resolve, reject) => {
    if (!id || !title || !user || !date || !duration || !country || !location || !description || !rating || !tags) {
      reject('Missing data')
    }

    let fileUrl = ''
    if (image) {
      fileUrl = `https://cozyplace.herokuapp.com/app/files/${image.filename}`
    }

    const post = {
      title,
      user,
      date,
      duration,
      country,
      location,
      description,
      rating,
      tags,
      image: fileUrl,
    }

    const result = store.update(id, post)

    const finalResponse = {
      post,
      'System Message': 'Post succesfully updated'
    }
    resolve(finalResponse)
  })
}

//------------------------------------------------------------------------------------------------
// 3.3 [deletePost] - DELETE POST
//------------------------------------------------------------------------------------------------

const deletePost = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject('Missing data')
    }

    store.remove(id)
      .then(() => {
        resolve('Post deleted')
      })
      .catch(error => {
        reject(error)
      })
  })
}

//------------------------------------------------------------------------------------------------
// 4.4 [getAllPost] - SHOW ALL POSTS
//------------------------------------------------------------------------------------------------

  const getAllPost = async (country, location, tags, title) => {
    const result = await store.get(country, location, tags, title)
    return result
  }

//------------------------------------------------------------------------------------------------
// 5.5 [getPost] - SHOW POSTS FOR ID
//------------------------------------------------------------------------------------------------

const getPost = async (id) => {
  const result = await store.getFilter(id)
  return result
}

//------------------------------------------------------------------------------------------------
// 6.6 [favoritePost] - ADD FAVOTITE POSTS
//------------------------------------------------------------------------------------------------

const favoritePost = async (id, idPost) => {
  if (!id || !idPost) {
    throw new Error('falta informacion')
  } else {
    const data = await store.addFavorite(id, idPost)
    return data
  }
}

//------------------------------------------------------------------------------------------------
// 7.7 [delete] - DELETE FAVOTITE POSTS
//------------------------------------------------------------------------------------------------

const deleteFavoritePost = async (id, idPost) => {
  if (!id || !idPost) {
    throw new Error('falta informacion')
  } else {
    const data = await store.deleteFavorite(id, idPost)
    return data
  }
}

//------------------------------------------------------------------------------------------------
// [MODULE EXPORTS]
//------------------------------------------------------------------------------------------------

  module.exports = {
    addPost,
    getAllPost,
    getPost,
    updatePost,
    deletePost,
    favoritePost,
    deleteFavoritePost
  }