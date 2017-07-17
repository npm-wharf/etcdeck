const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const path = require('path')
const info = require('../package.json')

function configure (auth, state) {
  const app = state.express
  app.use(infoHeaders)

  app.use(cookieParser())
  app.use('/', bodyParser.urlencoded({ extended: false }))
  app.use('/', bodyParser.json())
  app.use('/', bodyParser.json({ type: 'application/vnd.api+json' }))
  app.use('/', bodyParser.text({ type: 'text/plain' }))
  app.use(compression())
  return Promise.resolve()
}

function postRouting (state) {
  // this exists to get around browser behavior related to browserHistory
  // need to add a check to this so it only applies in situations where
  // a user agent is making the request
  state.express.get('*', function (req, res) {
    res.sendFile(path.resolve('./public/index.html'))
  })
}

function infoHeaders (req, res, next) {
  res.set('X-App-Version', info.version)
  next()
}

module.exports = function (auth) {
  return {
    configure: configure.bind(null, auth),
    postRouting: postRouting
  }
}
