// Library imports.
const mongoose = require('mongoose');

// Constants
const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now },
  isAdmin: Boolean
});

module.exports = schema;
