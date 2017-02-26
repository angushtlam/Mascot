// Library imports
const mongoose = require('mongoose');

// Custom imports
const schema = require('../schemas/pages');

const model = mongoose.model('Page', schema);

module.exports = model;
