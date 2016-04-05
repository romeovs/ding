#!/usr/bin/env node
var spawn = require('child_process').spawn

var bell = /\007/g

var opts = process.argv.splice(2)
var cmd  = opts.splice(0, 1)[0]
var args = opts

process.stdin.on('data', function (data) {
  var str = data.toString()
  var rep = str.replace(bell, function () {
    spawn(cmd, args)
    return ''
  })
  process.stdout.write(rep)
})

process.stdout.on('error', function (err) {
  if ( err.code === 'EPIPE' ) {
    return process.exit()
  } else {
    process.emit('error', err)
  }
})

process.stdin.resume()
