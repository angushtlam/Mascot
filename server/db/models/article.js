// Library imports
const mongoose = require('mongoose');

// Custom imports
const schema = require('../schemas/articles');

const model = mongoose.model('Article', schema);

module.exports = model;
