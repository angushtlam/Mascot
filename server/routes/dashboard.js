const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

// Custom imports
const { isUserAuthenticated } = require('../middlewares/auth')
const backend = require('../../backend')

router.get('/dashboard', isUserAuthenticated, (req, res) => {
  // Render the file if they don't have one.
  const username = req.session.user.username

  if (!fs.existsSync(path.resolve(__dirname, '..', 'cdn', 'js', username + '.js')) ||
      !fs.existsSync(path.resolve(__dirname, '..', 'cdn', 'css', username + '.css'))) {
    const job = backend.createJob({ username }).save()
    job.on('progress', progress => {
      console.log('Now processing job ' + progress + '.')
    })
  }

  res.render(path.resolve(__dirname, '..', 'templates', 'dashboard.ejs'), {
    username
  })
})

module.exports = router
