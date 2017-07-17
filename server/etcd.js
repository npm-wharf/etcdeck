const _ = require('fauxdash')
const Etcd = require('node-etcd')
const DEFAULT_URL = 'http://localhost:2379'

function addPrefix (client, prefix) {
  const add = _.lift(client.mkdir.bind(client))
  return add(prefix)
}

function deleteKey (client, prefix, key) {
  const del = _.lift(client.delete.bind(client))
  return del(`${prefix}/${key}`)
}

function deletePrefix (client, prefix) {
  const del = _.lift(client.rmDir.bind(client))
  return del(prefix)
}

function fetchConfig (client, prefix) {
  const get = _.lift(client.get.bind(client))
  return get(prefix)
    .catch({ errorCode: 100 }, () => {
      // 'Key not found' error.
      return {}
    })
    .then((response) => {
      if (response.node.nodes) {
        return response.node.nodes.reduce((acc, node) => {
          acc[node.key.split('/')[2]] = node.value
          return acc
        }, {})
      } else {
        return {}
      }
    })
}

function getKey (client, prefix, key) {
  const get = _.lift(client.get.bind(client))
  return get(`${prefix}/${key}`)
    .catch({ errorCode: 100 }, () => {
      // 'Key not found' error.
      return {}
    })
    .then((response) => response.node.value)
}

function listPrefixes (client) {
  const get = _.lift(client.get.bind(client))
  return get('/')
    .then(x => x.node.nodes.map(n => n.key))
}

function setKey (client, prefix, key, value) {
  const set = _.lift(client.set.bind(client))
  return set(`${prefix}/${key}`, value)
}

function watch (client, config, onChange) {
  const watcher = client.watcher(config.prefix, null, {recursive: true})
  watcher.on('change', (change) => {
    if (applyChange(config, change) === false) {
      change.action = 'ignore'
    }
    onChange(change)
  })
  config.watcher = watcher
}

module.exports = function (config = { etcd: { url: DEFAULT_URL } }) {
  const client = new Etcd(config.etcd.url)
  return {
    addPrefix: addPrefix.bind(null, client),
    deleteKey: deleteKey.bind(null, client),
    deletePrefix: deletePrefix.bind(null, client),
    fetchConfig: fetchConfig.bind(null, client),
    getKey: getKey.bind(null, client),
    listPrefixes: listPrefixes.bind(null, client),
    setKey: setKey.bind(null, client),
    watch: watch.bind(null, client)
  }
}
