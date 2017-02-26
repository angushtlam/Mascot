// Library imports.
const mongoose = require('mongoose')

// Constants
const Schema = mongoose.Schema

const schema = new Schema({
  username: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = schema
