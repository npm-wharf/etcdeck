module.exports = function (fount, express) {
  return {
    transports: [ 'deftly-express', './server/transports/*.js' ],
    resources: [ './server/resources/*.js' ],
    plugins: [ './server/plugins/*.js' ],
    middleware: [ './server/middleware/*.js' ],
    fount: fount,
    logging: {
      level: 4
    },
    http: {
      configure: express.configure,
      postRouting: express.postRouting,
      port: 8028,
      apiPrefix: 'api',
      auth: {
      }
    },
    etcd: {
      url: process.env.ETCD_URL || 'http://localhost:2379'
    }
  }
}
