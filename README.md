# Mascot

## Client
* Built with Webpack
* Doesn't use jQuery for compatibility, supports browsers from IE7 to modern.
* Served through "CDN"

TODO:
* Spawn a mascot on the page
* Converts all title tags to data-title to remove default behavior
* Make the mascot move to title'd elements on page when they are hovered
* Stretch Goals:
  * Make custom fields

## Server
* Built with Node, Express, Mongo

### Web Dashboard
* Login/Register
* Provide the user with the script CDN
* Access to user analytics
  * See what elements are used the most
  * Stretch Goals:
    * A/B testing
* Change settings to script
  * They should just modify the script tbh

### Backend
* Receives data from clients
* Puts into database
* Sets up script for users to use for their site


HTML
CSS
Webpack
jQuery
Node
Bootstrap
Express
MongoDB
Mongoose
EJS
Redis
Bee Queue
Heroku
