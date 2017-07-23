const _ = require('fauxdash')
module.exports = function keyResource (etcd) {
  return {
    name: 'key',
    actions: {
      self: {
        method: 'get',
        url: [ '', ':prefix', ':prefix/:id' ],
        handle: (envelope, data, next) => {
          try {
            const prefix = data.prefix
            const key = data.id
            if (prefix && key) {
              return etcd.getKey(prefix, key)
                .then(
                  v => ({ data: v }),
                  e => ({ status: 500, data: e.message })
                )
            } else if (prefix) {
              return etcd.fetchConfig(prefix)
                .then(
                  v => ({ data: v }),
                  e => ({ status: 500, data: e.message })
                )
            } else {
              return etcd.listPrefixes()
                .then(
                  keys => ({ data: keys }),
                  e => ({ status: 500, data: e.message })
                )
            }
          } catch (err) {
            console.log(err)
            return { status: 500, data: err.message }
          }
        }
      },
      'delete': {
        method: 'delete',
        url: [ ':prefix', ':prefix/:id' ],
        handle: (envelope, data, next) => {
          try {
            const prefix = data.prefix
            const key = data.id
            console.log(prefix, key)
            if (prefix && key) {
              return etcd.deleteKey(prefix, key)
                .then(
                  v => ({ status: 204 }),
                  e => ({ status: 500, data: e.message })
                )
            } else if (prefix) {
              return etcd.deletePrefix(prefix)
                .then(
                  v => ({ status: 204 }),
                  e => ({ status: 500, data: e.message })
                )
            } else {
              return { status: 400, data: 'Invalid request' }
            }
          } catch (err) {
            console.log(err)
            return { status: 500, data: err.message }
          }
        }
      },
      write: {
        method: 'put',
        url: [ ':prefix', ':prefix/:id' ],
        handle: [
          {
            when: { headers: { 'content-type': 'text/plain' } },
            then: (envelope, data, next) => {
              try {
                const prefix = envelope.params.prefix
                const key = envelope.params.id
                if (prefix && key) {
                  const value = data
                  return etcd.setKey(prefix, key, value)
                    .then(
                      v => ({ status: 201 }),
                      e => ({ status: 500, data: e.message })
                    )
                } else if (prefix) {
                  return etcd.addPrefix(prefix)
                    .then(
                      v => ({ status: 201 }),
                      e => ({ status: 500, data: e.message })
                    )
                } else {
                  return { status: 400, data: 'Invalid request' }
                }
              } catch (err) {
                console.log(err)
                return { status: 500, data: err.message }
              }
            }
          },
          {
            when: true,
            then: (envelope, data, next) => {
              try {
                const prefix = data.prefix
                const key = data.id
                if (prefix && key) {
                  const value = _.clone(data)
                  delete value.prefix
                  delete value.id
                  const json = JSON.stringify(value)
                  return etcd.setKey(prefix, key, json)
                    .then(
                      v => ({ status: 201 }),
                      e => ({ status: 500, data: e.message })
                    )
                } else if (prefix) {
                  return etcd.addPrefix(prefix)
                    .then(
                      v => ({ status: 201 }),
                      e => ({ status: 500, data: e.message })
                    )
                } else {
                  return { status: 400, data: 'Invalid request' }
                }
              } catch (err) {
                console.log(err)
                return { status: 500, data: err.message }
              }
            }
          }
        ]
      }
    }
  }
}
