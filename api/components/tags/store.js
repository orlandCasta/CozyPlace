/*

It is in charge of managing the database, here it is specified, where and when the information is saved

[code index]

  1.- STORE FUNCTIONS

    1.1.1 [addTagStorage] - CREATE TAG
    4.4.4 [getAllTagsStorage] - SHOW ALL TAGS

  2.- [MODULE EXPORTS]

*/

const tagModels = require('../../../storage/models/tag')

//------------------------------------------------------------------------------------------------
// 1.1.1 [addTagStorage] - CREATE TAG
//------------------------------------------------------------------------------------------------

const addTagStorage = async (tag) => {
  const newTag = new tagModels(tag)
  return newTag.save()
}

//------------------------------------------------------------------------------------------------
// 4.4.4 [getAllTagsStorage] - SHOW ALL TAGS
//------------------------------------------------------------------------------------------------

const getAllTagsStorage = () => {
  return tagModels.find({})
}

module.exports = {
  addTagStorage,
  getAllTagsStorage
}