/*
  Post model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
  title: String,
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  date: String,
  duration: String,
  country: String,
  location: String,
  description: String,
  image: {
    type: [String],
    default: undefined
  },
  rating: {
    type: [String],
    default: undefined
  },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
})
const postsModel = mongoose.model('Post', mySchema)

module.exports = postsModel