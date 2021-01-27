/*

It is in charge of managing the database, here it is specified, where and when the information is saved

[code index]

  1.- STORE FUNCTIONS

    1.1.1 [getLocation] - SEARCH POSTS LOCATIONS
    2.2.2 [getLocationTop] - SHOW POSTS LOCATIONS TOP 2 POST OF MEXICO AND 2 POSTS OF COLOMBIA

  2.- [MODULE EXPORTS]

*/

const Model = require('../../../storage/models/post')
const userModel = require('../../../storage/models/user')

//------------------------------------------------------------------------------------------------
// 1.1.1 [getLocation] - SEARCH POSTS LOCATIONS
//------------------------------------------------------------------------------------------------

const getLocation = async (location) => {
  return new Promise((resolve, reject) => {

  Model.find({location: location}).limit(10)
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
// 2.2.2 [getLocationTop] - SHOW POSTS LOCATIONS TOP 2 POST OF MEXICO AND 2 POSTS OF COLOMBIA
//------------------------------------------------------------------------------------------------

  const getLocationTop = async () => {
    const mexico = await Model.find({ location: {$exists:true}, country: "Mexico", image: {$exists:true}}, {location:1, country:1, image:1}).limit(2)
    const colombia = await Model.find({ location: {$exists:true}, country: "Colombia", image: {$exists:true}}, {location:1, country:1, image:1}).limit(2)

    return  {
      mexico,
      colombia
    }
  }

//------------------------------------------------------------------------------------------------
// [MODULE EXPORTS]
//------------------------------------------------------------------------------------------------

module.exports = {
  getLocation,
  getLocationTop
}