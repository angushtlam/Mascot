// Library imports
const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const session = require('express-session')

// Custom imports
const db = require('./db')
const config = require('./config')

const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))

// Sessions
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.secretKey,
  cookie: { maxAge: 60000, secure: false },
  resave: false,
  saveUninitialized: true
}))

app.set('view engine', 'ejs')

app.use('/static', express.static(path.resolve(__dirname, 'static')))
app.use('/cdn', express.static(path.resolve(__dirname, 'cdn')))
app.use('/', require('./routes'))

// Connect to database.
const database = db.connect(config.databaseURI)
database.once('open', () => {
  app.listen(config.port, () => {
    console.log('Starting MascotJS webserver at port ' + config.port + '.')
  })
})
