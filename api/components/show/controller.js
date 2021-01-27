/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

[code index]

  1.- CONTROLLER FUNCTIONS

    1.1 [getLocationPost] - SEARCH POSTS LOCATIONS
    2.2 [getTopLocation] - SHOW POSTS LOCATIONS TOP 2 POST OF MEXICO AND 2 POSTS OF COLOMBIA

  2.- [MODULE EXPORTS]

*/

const store = require('./store')

//------------------------------------------------------------------------------------------------
// 1.1 [getLocationPost] - SEARCH POSTS LOCATIONS
//------------------------------------------------------------------------------------------------

const getLocationPost = async (location) => {
  const result = await store.getLocation(location)
  return result
}

//------------------------------------------------------------------------------------------------
// 2.2 [getTopLocation] - SHOW POSTS LOCATIONS TOP 2 POST OF MEXICO AND 2 POSTS OF COLOMBIA
//------------------------------------------------------------------------------------------------

  const getTopLocation = async () => {
    const resultado = await store.getLocationTop()
    return resultado
  }

//------------------------------------------------------------------------------------------------
// [MODULE EXPORTS]
//------------------------------------------------------------------------------------------------

module.exports = {
  getLocationPost,
  getTopLocation
}