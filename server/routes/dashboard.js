const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

// Custom imports
const Settings = require('../db/models/settings')
const User = require('../db/models/user')

const { isUserAuthenticated } = require('../middlewares/auth')
const backend = require('../../backend')

const config = require('../config')

const secretKey = config.secretKey

router.get('/', isUserAuthenticated, (req, res) => {
  // Render the file if they don't have one.
  const username = req.session.user.username

  // Process job if one doesn't exist, this means the user is new.
  if (!fs.existsSync(path.resolve(__dirname, '..', 'cdn', 'js', username + '.js')) ||
      !fs.existsSync(path.resolve(__dirname, '..', 'cdn', 'css', username + '.css'))) {
    queueScriptUpdate(username)
  }

  res.render(path.resolve(__dirname, '..', 'templates', 'dashboard.ejs'), {
    username
  })
})

router.get('/mascot', isUserAuthenticated, (req, res) => {
  // Render the file if they don't have one.
  const username = req.session.user.username

  Settings.findOne({ _id: username }, (err, q) => {
    let config = {
      tooltipColor: '#800099',
      mascotURL: 'http://localhost:3000/static/assets/mascot.png',
      mascotInactiveInMs: 1500,
      mascotMoveDelayInMs: 300,
      mascotMoveTimeInMs: 400
    }

    if (err) {
      res.render(path.resolve(__dirname, '..', 'templates', 'dashboard', 'mascot.ejs'), {
        message: 'Whoops! There was an error getting to your settings. Please try again!',
        config
      })

      return console.log(err)
    }

    if (q) {
      config = Object.assign({}, config, {
        tooltipColor: q.tooltipColor,
        mascotURL: q.mascotURL,
        mascotInactiveInMs: q.mascotInactiveInMs,
        mascotMoveDelayInMs: q.mascotMoveDelayInMs,
        mascotMoveTimeInMs: q.mascotMoveTimeInMs
      })
    }

    res.render(path.resolve(__dirname, '..', 'templates', 'dashboard', 'mascot.ejs'), {
      message: '', config
    })
  })
})

router.post('/mascot', isUserAuthenticated, (req, res) => {
  const username = req.session.user.username
  const config = {
    tooltipColor: req.body.tooltipColor,
    mascotURL: req.body.mascotURL,
    mascotInactiveInMs: req.body.mascotInactiveInMs,
    mascotMoveDelayInMs: req.body.mascotMoveDelayInMs,
    mascotMoveTimeInMs: req.body.mascotMoveTimeInMs
  }

  Settings.findOneAndUpdate({ _id: username }, {
    tooltipColor: config.tooltipColor,
    mascotURL: config.mascotURL,
    mascotInactiveInMs: config.mascotInactiveInMs,
    mascotMoveDelayInMs: config.mascotMoveDelayInMs,
    mascotMoveTimeInMs: config.mascotMoveTimeInMs

  }, { new: true, upsert: true }).exec((err, q) => {
    if (err) return console.log(err)
    res.render(path.resolve(__dirname, '..', 'templates', 'dashboard', 'mascot.ejs'), {
      message: 'Your settings have been updated! Your script will take a few moments to update.',
      config
    })

    // Update scripts.
    queueScriptUpdate(username, config)
  })
})

router.get('/account', isUserAuthenticated, (req, res) => {
  res.render(path.resolve(__dirname, '..', 'templates', 'dashboard', 'account.ejs'), {
    message: ''
  })
})

router.post('/account', isUserAuthenticated, (req, res) => {
  const username = req.session.user.username

  if (req.body.password !== req.body.passwordAgain) {
    res.render(path.resolve(__dirname, '..', 'templates', 'dashboard', 'account.ejs'), {
      message: 'Passwords did not match.'
    })
  }

  User.findOneAndUpdate({ username: username }, { password: sha256(req.body.password + secretKey) }).exec((err, q) => {
    if (err) return console.log(err)
    res.render(path.resolve(__dirname, '..', 'templates', 'dashboard', 'account.ejs'), {
      message: 'Your password have been updated!'
    })
  })
})

router.get('/analytics', isUserAuthenticated, (req, res) => {
  res.render(path.resolve(__dirname, '..', 'templates', 'dashboard', 'analytics.ejs'))
})

function queueScriptUpdate(username, config = {}) {
  const job = backend.createJob({ username, config }).save()
  job.on('progress', progress => {
    console.log('Now processing job ' + progress + '.')
  })
}

module.exports = router
