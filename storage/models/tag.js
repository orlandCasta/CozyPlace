/*
  Tags model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
  tagname: String,
})
const postsModel = mongoose.model('Tag', mySchema)

module.exports = postsModel