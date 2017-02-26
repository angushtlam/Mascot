function isURLWorking(url) {
  var http = new XMLHttpRequest()
  http.open('HEAD', url, false)
  http.send()
  return http.status != 404
}

var checkInterval = null
$(document).ready(function () {
  var fileCheckHelper = function () {
    if (isURLWorking('/cdn/js/' + $('#profile-username').html() + '.js') &&
        isURLWorking('/cdn/css/' + $('#profile-username').html() + '.css')) {
          console.log('It is ready!')
      $('#mascot-status').html('Ready for Use')
      $('#mascot-status-detail').html('Your MascotJS script can be used now!')
      clearInterval(checkInterval)
      return
    }

    console.log('CDN file not available yet.')
    $('#mascot-status').html('Building')
    $('#mascot-status-detail').html('Your MascotJS script is currently building. Please give us a little bit of time!')
  }

  fileCheckHelper()
  checkInterval = setInterval(fileCheckHelper, 3000)
})
