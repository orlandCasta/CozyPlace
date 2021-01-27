/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

[code index]

  1.- CONTROLLER FUNCTIONS

    1.1 [POST] - CREATE TAG
    4.4 [getAllTags] - SHOW ALL TAGS

  2.- [MODULE EXPORTS]

*/

const storage = require('./store')

//------------------------------------------------------------------------------------------------
// 1.1 [addUser] - CREATE USER
//------------------------------------------------------------------------------------------------

const addTag = async (tagname) => {
  if (!tagname) {
    throw new Error('Missing data')
  }

  const tag = {
    tagname
  }
  
    return storage.addTagStorage(tag)
}

//------------------------------------------------------------------------------------------------
// 4.4 [getAllTags] - SHOW ALL TAGS
//------------------------------------------------------------------------------------------------

const getAllTags = () => {
  return storage.getAllTagsStorage()
}

module.exports = {
  addTag,
  getAllTags
}
