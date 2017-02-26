// Library imports
const express = require('express')
const path = require('path')

// Custom imports
const db = require('./db')

const app = express()

app.use('/static', express.static(path.resolve(__dirname, 'static')))
app.use(require('./routes/landing'))

const PORT = 3000
const MONGO_DB_URI = 'mongodb://localhost/mascotjs'

// Connect to database.
db.connect(MONGO_DB_URI)
db.once('open', () => {
  app.listen(PORT, () => {
    console.log('Starting Mascot webserver at port ' + PORT + '.')
  })
})
