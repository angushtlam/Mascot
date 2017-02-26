// Library imports.
const mongoose = require('mongoose');

// Constants
const Schema = mongoose.Schema;

const schema = new Schema({
  accessKey: { type: String, index: true },
  username: { type: String, unique: true },
  expiry: Date,
  isAdmin: Boolean
});

module.exports = schema;
