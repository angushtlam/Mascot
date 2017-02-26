// Library imports
const mongoose = require('mongoose');

// Custom imports
const schema = require('../schemas/sessions');

const model = mongoose.model('Session', schema);

module.exports = model;
