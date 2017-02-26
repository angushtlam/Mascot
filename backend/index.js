const fs = require('fs')
const path = require('path')

var Queue = require('bee-queue')
var queue = new Queue('mascotBuilder')

// var job = queue.createJob({x: 2, y: 3}).save()
// job.on('succeeded', function (result) {
//   console.log('Received result for job ' + job.id + ': ' + result)
// })

// Process jobs from as many servers or processes as you like
queue.process(function (job, done) {
  console.log('Processing job ' + job.id)

  return done(null, compileMascot(job.data.username, job.data.config))
})

function compileMascot(username, config) {
  compileMascotStyles(username, config)
  compileMascotScript(username, config)
}

function compileMascotScript(username, config) {
  console.log('Compiling Mascot Script for ' + username)
  fs.readFile(path.resolve(__dirname, '..', 'dist', 'mascot.js'), 'utf8', function (err, data) {
    if (err) {
      console.log(err)
    }

    // Sorry for ghetto updating, not sorry
    if (config !== {}) {
      data = data.replace('var customConfig={}',
        `var customConfig={
          mascotURL: '` + config.mascotURL + `',
          mascotInactiveInMs: ` + config.mascotInactiveInMs + `,
          mascotMoveTimeInMs: '` + config.mascotMoveTimeInMs + `',
          mascotMoveDelayInMs: '` + config.mascotMoveDelayInMs + `'
        }`)
    }

    fs.writeFile(path.resolve(__dirname, '../server/cdn/js/' + username + '.js'), data, { flag: 'w+' }, (err) => {
      if (err) return console.log(err)
      console.log('Mascot Script compiled for ' + username)
    })
  })
}

function compileMascotStyles(username, config) {
  console.log('Compiling Mascot Styles for ' + username)
  fs.readFile(path.resolve(__dirname, '..', 'dist', 'mascot.css'), 'utf8', function (err, data) {
    if (err) {
      console.log(err)
    }

    if (config !== {}) {
      data = data.replace('#800099', config.tooltipColor)
    }

    // console.log(data)
    fs.writeFile(path.resolve(__dirname, '../server/cdn/css/' + username + '.css'), data, { flag: 'w+' }, (err) => {
      if (err) return console.log(err)
      console.log('Mascot Styles compiled for ' + username)
    })
  })
}

module.exports = queue
