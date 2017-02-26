const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'templates', 'index.html'))
})

router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
