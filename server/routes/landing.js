const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', function (req, res) {
  res.render(path.resolve(__dirname, '..', 'templates', 'index.ejs'))
})

router.get('/about', function (req, res) {
  res.send('About birds')
})

router.get('/start', function (req, res) {
  res.send('About birds')
})

router.get('/docs', function (req, res) {
  res.send('About birds')
})

module.exports = router
