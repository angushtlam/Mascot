// Library imports.
const mongoose = require('mongoose');

// Constants
const Schema = mongoose.Schema;

const schema = new Schema({
  _id: String,
  title: String,
  subtitle: String,
  author: String,
  body: String,
  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now, index: true },
  isPublished: Boolean
});

module.exports = schema;
