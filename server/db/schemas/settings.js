// Library imports.
const mongoose = require('mongoose')

// Constants
const Schema = mongoose.Schema

const schema = new Schema({
  _id: { type: String, index: true },
  tooltipColor: String,
  mascotURL: String,
  mascotInactiveInMs: Number,
  mascotMoveDelayInMs: Number,
  mascotMoveTimeInMs: Number
})

module.exports = schema
