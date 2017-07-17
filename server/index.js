const deftly = require('deftly')
const fount = require('fount')

const dependencies = {
  fount: fount,
  auth: {},
  etcd: require('./etcd'),
  express: require('./express'),
  config: require('./config')
}

fount({
  default: dependencies,
  resources: dependencies
})

fount.inject(startService)

function startService (config) {
  deftly
    .init(config)
    .then((service) => {
      const transport = service.transports[ 'deftly-express' ]
      const Server = require('socket.io')
      const io = new Server(transport.http)
      fount.register('io', io)
      service.metrics.useLocalAdapter()
      service.metrics.recordUtilization(1000)
      service.start()
    })
}
