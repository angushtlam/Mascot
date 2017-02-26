// Library imports
const mongoose = require('mongoose');

// Custom imports
const schema = require('../schemas/users');

const model = mongoose.model('User', schema);

module.exports = model;
