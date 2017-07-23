var processes = require('processhost')()
var filewatcher = require('filewatcher')

processes.start('server', { command: 'node', args: [ './server/index.js' ] })
var watcher = filewatcher()
watcher.add('./server')
watcher.add('./package.json')

watcher.on('change', function () {
  processes.restart('server')
})

processes.start('client', { command: 'npm', args: [ 'start' ] })
