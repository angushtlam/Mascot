// Library imports.
const mongoose = require('mongoose')

exports.connect = function (databaseURI) {
  mongoose.connect(databaseURI)
  const db = mongoose.connection

  console.log('Initiating database connection...')
  db.on('error', console.error.bind(console, 'Database Connection Error:'))

  return db
}
