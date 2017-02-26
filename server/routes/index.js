var express = require('express')
var app = express()

app.use(require('./landing'))
app.use(require('./auth'))
app.use(require('./dashboard'))

module.exports = app
