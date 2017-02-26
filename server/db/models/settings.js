// Library imports
const mongoose = require('mongoose')

// Custom imports
const schema = require('../schemas/settings')

const model = mongoose.model('Settings', schema)

module.exports = model
