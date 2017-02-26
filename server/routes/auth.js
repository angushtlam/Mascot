// Library imports.
const express = require('express')
const path = require('path')
const sha256 = require('js-sha256')

const router = express.Router()

// Custom Imports
const User = require('../db/models/user')

const config = require('../config')
// const { isUserAuthenticated } = require('../middlewares/auth')

const secretKey = config.secretKey

router.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/dashboard')
  }

  res.render(path.resolve(__dirname, '..', 'templates', 'auth.ejs'), { message: '' })
})

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

router.post('/login', (req, res) => {
  // Fields must exist
  if (!req.body.username || !req.body.password) {
    res.render(path.resolve(__dirname, '..', 'templates', 'auth.ejs'), {
      message: 'Please enter all fields.'
    })
  }

  const username = req.body.username
  const password = req.body.password

  User.findOne({ username: username }, (err, q) => {
    if (err) {
      res.render(path.resolve(__dirname, '..', 'templates', 'auth.ejs'), {
        message: 'An internal error occurred while logging in...'
      })

      console.log(err)
      return
    }

    const hashedPassword = sha256(password + secretKey)
    if (!q || q.password !== hashedPassword) {
      res.render(path.resolve(__dirname, '..', 'templates', 'auth.ejs'), {
        message: 'Incorrect username or password.'
      })
      return
    }

    // Set User session
    req.session.user = {
      username
    }

    res.redirect('/dashboard')
  })
})

router.post('/register', (req, res) => {
  // Fields must exist
  if (!req.body.username || !req.body.password) {
    res.render(path.resolve(__dirname, '..', 'templates', 'auth.ejs'), {
      message: 'Please enter all fields.'
    })
    return
  }

  // Passwords need to match
  if (req.body.password !== req.body.passwordAgain) {
    res.render(path.resolve(__dirname, '..', 'templates', 'auth.ejs'), {
      message: 'Passwords do not match.'
    })
    return
  }

  new User({
    username: req.body.username,
    password: sha256(req.body.password + secretKey)
  }).save((err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        res.render(path.resolve(__dirname, '..', 'templates', 'auth.ejs'), {
          message: 'Username already exists. Please try a different username.'
        })
      } else {
        res.render(path.resolve(__dirname, '..', 'templates', 'auth.ejs'), {
          message: 'Unknown database error: ' + err.code + '.'
        })
      }
    } else {
      res.render(path.resolve(__dirname, '..', 'templates', 'auth.ejs'), {
        message: 'Account created. Please log in.'
      })
    }
  })
})

module.exports = router
