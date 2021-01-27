//------------------------------------------------------------------------------------------------
// [Database configuration]
//------------------------------------------------------------------------------------------------

require('dotenv').config()
const db = require('mongoose')

db.Promise = global.Promise

const connect = async () => {
  try {
    await db.connect('mongodb+srv://admin:admin@cluster0.ycewz.mongodb.net/<dbname>?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log('[ Database Conecction Success ]')
  } catch (error) {
    console.log(error)
  }
}

module.exports = connect